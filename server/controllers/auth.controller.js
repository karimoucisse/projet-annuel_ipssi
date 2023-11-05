const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Invoice = require('../models/invoice.model');
const Address = require('../models/address.model');
const Subscription = require('../models/subscription.model');
const Basket = require('../models/basket.model');
const File = require('../models/file.model');
const { conn } = require('../services/gridfs/gfs.service');
const sendEmail = require('../services/sendInBlue/sendEmail');
const accountDeletedTemplate = require('../services/sendInBlue/templates/accountDeleted.template');
const accountDeletedAdminTemplate = require('../services/sendInBlue/templates/accountDeletedAdmin.template');

const signup = async (req, res) => {
    // TODO: AJOUTER DE LA SECURITE
    if (
        !(
            'email' in req.body &&
            'password' in req.body &&
            'firstname' in req.body &&
            'lastname' in req.body &&
            'phone' in req.body &&
            'wayType' in req.body &&
            'number' in req.body &&
            'addressName' in req.body &&
            'postalCode' in req.body &&
            'state' in req.body &&
            'city' in req.body &&
            'country' in req.body
        )
    ) {
        return res.status(422).json({ message: 'need keys' });
    }
    // const regAlphaNum = new RegExp('^[A-Za-z0-9 ]+$');
    //    !regAlphaNum.test(req.body.email) ||
    if (
        req.body.email === '' ||
        req.body.email === null ||
        req.body.password === '' ||
        req.body.password === null ||
        req.body.firstname === '' ||
        req.body.firstname === null ||
        req.body.lastname === '' ||
        req.body.lastname === null ||
        req.body.phone === '' ||
        req.body.phone === null ||
        req.body.wayType === '' ||
        req.body.wayType === null ||
        req.body.number === '' ||
        req.body.number === null ||
        req.body.addressName === '' ||
        req.body.addressName === null ||
        req.body.postalCode === '' ||
        req.body.postalCode === null ||
        req.body.state === '' ||
        req.body.state === null ||
        req.body.city === '' ||
        req.body.city === null ||
        req.body.country === '' ||
        req.body.country === null
    ) {
        return res.status(422).json({ message: 'Format is not correct' });
    }
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
    const foundUser = await User.findOne({ email });
    if (foundUser && foundUser.active) {
        return res.status(409).json({ message: 'email already used' });
    }
    let ans;
    if (foundUser) {
        ans = await User.findOneAndUpdate(
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
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        ans = await User.create({
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
        // const sumStorage = storage.reduce((acc, curr) => acc + curr.storage, 0);
        console.log('storage ===> ', storage);
        return res.status(200).json({ storage, sum: storage.storage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
// const getInvoice = async (req, res) => {
//     try {
//         // Récupérez les factures pour l'utilisateur actuellement authentifié (req.user.userId)
//         const invoices = await Invoice.find({ userId: req.user.userId });

//         if (!invoices) {
//             return res.status(404).json({ error: 'Aucune facture trouvée.' });
//         }
//         console.log('invoices ==> ', invoices);
//         return res.status(200).json(invoices);
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const login = async (req, res) => {
    if (!('email' in req.body && 'password' in req.body)) {
        return res
            .status(422)
            .json({ message: 'need 2 keys : email, password' });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        return res.status(409).json({ message: 'wrong email or password' });
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
        return res.status(409).json({ message: 'wrong email or password' });
    }
    const dataToSend = {
        userId: foundUser._id.toString(),
        isActive: foundUser.active,
        token: jwt.sign(
            { userId: foundUser._id.toString(), email: foundUser.email },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '10h',
            }
        ),
    };
    res.status(200).json(dataToSend);
};

const deleteFiles = async (gfs, files) => {
    files.map(async (file) => {
        const fileToDelete = await gfs.files.findOne({ filename: file.fileId });
        console.log(fileToDelete);
        const gsfb = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'uploads',
        });
        gsfb.delete(fileToDelete._id, (err, gridStore) => {
            if (err) return next(err);
        });
    });
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
            console.log(filesDeleted); // TODO: Utiliser filesDeleted.deletedCount pour connaitre le nombre de fichiers supprimés
        } // Utiliser filesDeletedCount dans les mails à envoyer

        await Address.findOneAndDelete({ userId: req.user.userId });
        await Basket.findOneAndDelete({ userId: req.user.userId });
        await Subscription.deleteMany({ userId: req.user.userId });
        const user = await User.findByIdAndDelete(req.user.userId);
        console.log(user);
        // TODO: Utiliser user.firstname + user.lastname dans les emails à envoyer
        // TODO: Reactiver l'API email
        // await sendEmail(user.email, accountDeletedTemplate);
        // await sendEmail(
        //     adminEmail, // TODO: Creer email admin
        //     accountDeletedAdminTemplate
        // );

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
    // console.log(req.params.userId);
    const user = await User.findOne({ _id: req.params.userId });
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

const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Récupérer les données mises à jour depuis le corps de la requête
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
            subscription,
        } = req.body;

        // Mettre à jour les informations de l'utilisateur
        user.email = email;
        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.wayType = wayType;
        user.addressName = addressName;
        user.number = number;
        user.postalCode = postalCode;
        user.state = state;
        user.city = city;
        user.country = country;
        user.subscription = subscription;

        await user.save(); // Enregistrer les modifications dans la base de données

        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateUserAndAdress = async (req, res) => {
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

        let userAddress = await Address.findOne({ userId });

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
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports.updateUser = updateUser;
module.exports.updateUserAndAdress = updateUserAndAdress;
module.exports.signup = signup;
module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserInfoById = getUserInfoById;
module.exports.getStorage = getStorage;
// module.exports.getInvoice = getInvoice;
