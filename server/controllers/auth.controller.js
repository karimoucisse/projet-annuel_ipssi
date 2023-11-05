const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Subscription = require('../models/subscription.model');
const File = require('../models/file.model');
const { conn } = require('../services/gridfs/gfs.service');
const sendEmail = require('../services/sendInBlue/sendEmail');
const accountDeletedTemplate = require('../services/sendInBlue/templates/accountDeleted.template');
const accountDeletedAdminTemplate = require('../services/sendInBlue/templates/accountDeletedAdmin.template');
const { checkParams, deleteFiles } = require('../services/auth.service');
require('dotenv').config();

const signup = async (req, res) => {
    // TODO: AJOUTER DE LA SECURITE
    const {
        email,
        password,
        firstname,
        lastname,
        phone,
        wayType,
        number,
        addressName,
        postalCode,
        state,
        city,
        country,
    } = req.body;

    if (req.foundUser) {
        const ans = await User.findOneAndUpdate(
            { email },
            {
                firstname,
                lastname,
                phone,
            }
        );

        await Address.findOneAndUpdate(
            { userId: ans._id },
            {
                wayType,
                number,
                addressName,
                postalCode,
                state,
                city,
                country,
            }
        );
    } else {
        const saltRounds = 10; // TODO: METTRE DANS .ENV
        const hash = await bcrypt.hash(password, saltRounds);
        const ans = await User.create({
            email,
            password: hash,
            firstname,
            lastname,
            phone,
        });

        await Address.create({
            userId: ans._id,
            wayType,
            number,
            addressName,
            postalCode,
            state,
            city,
            country,
        });
    }

    res.status(201).json({
        message: 'user created',
        user: {
            id: ans._id,
            email,
        },
    });
};

const getStorage = async (req, res) => {
    try {
        const storage = await Subscription.findOne({ userId: req.user.userId });
        return res.status(200).json({ storage, sum: storage.storage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    res.status(200).json(
        {
            userId: req.foundUser._id.toString(),
            isActive: req.foundUser.active,
            token: jwt.sign(
                { userId: req.foundUser._id.toString(), email: req.foundUser.email },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '10h',
                }
            ),
        }
    );
};

const deleteUser = async (req, res) => {
    try {
        const gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
        const files = await File.find({ userId: req.user.userId });

        if (files) {
            await deleteFiles(gfs, files);
            const filesDeleted = await File.deleteMany({
                userId: req.user.userId,
            });
            // TODO: Utiliser filesDeleted.deletedCount pour connaitre le nombre de fichiers supprimés
        }   // Utiliser filesDeletedCount dans les mails à envoyer

        await Address.findOneAndDelete({ userId: req.user.userId });
        await Subscription.deleteMany({ userId: req.user.userId });
        const user = await User.findByIdAndDelete(req.user.userId);
        // TODO: Utiliser user.firstname + user.lastname dans les emails à envoyer
        // TODO: Reactiver l'API email
        await sendEmail(
            user.email,
            accountDeletedTemplate
        );
        await sendEmail(
            process.env.ADMIN_EMAIL, // TODO: Creer email admin
            accountDeletedAdminTemplate
        );

        return res.status(202).json({ message: 'User deleted !' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUsers = async (req, res) => {
    const users = await User.find();
    return res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    return res.status(200).json(user);
};

const getUserInfoById = async (req, res) => {
    const user = await User.findById(req.params.userId);
    const address = await Address.findOne({ userId: req.params.userId });
    const subscription = await Subscription.findOne({
        userId: req.params.userId,
    });
    return res.status(200).json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        wayType: address.wayType,
        number: address.number,
        addressName: address.addressName,
        postalCode: address.postalCode,
        state: address.state,
        city: address.city,
        country: address.country,
        subscription: subscription.storage.toString(),
    });
};

const updateUserAndAddress = async (req, res) => {
    try {
        const { userId } = req.user;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const {
            email,
            firstname,
            lastname,
            phone,
            wayType,
            number,
            addressName,
            postalCode,
            state,
            city,
            country,
        } = req.body;

        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;

        const userAddress = await Address.findOne({ userId });
        // TODO: l'utilisateur devrait avoir son adresse ici quoi qu'il arrive ??
        if (!userAddress) {
            userAddress = new Address({
                userId,
                wayType,
                number,
                addressName,
                postalCode,
                state,
                city,
                country,
            });
        } else {
            userAddress.wayType = wayType;
            userAddress.number = number;
            userAddress.addressName = addressName;
            userAddress.postalCode = postalCode;
            userAddress.state = state;
            userAddress.city = city;
            userAddress.country = country;
        }

        await userAddress.save();
        user.address = userAddress._id; // Associer l'adresse à l'utilisateur

        await user.save();

        res.status(200).json({ message: 'User updated', user, userAddress });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports.updateUserAndAddress = updateUserAndAddress;
module.exports.signup = signup;
module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserInfoById = getUserInfoById;
module.exports.getStorage = getStorage;
