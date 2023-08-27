const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Address = require('../models/address.model');
const Subscription = require('../models/subscription.model');
const Basket = require('../models/basket.model');
const File = require('../models/file.model');
const { conn } = require('../services/gridfs/gfs.service');
const sendEmail = require('../services/sendInBlue/sendEmail');
const accountDeletedTemplate = require('../services/sendInBlue/templates/accountDeleted.template');
const accountDeletedAdminTemplate = require('../services/sendInBlue/templates/accountDeletedAdmin.template');

<<<<<<< HEAD
const signup = async (req, res) => {
    // TODO: AJOUTER DE LA SECURITE
    if (!('email' in req.body && 'password' in req.body)) {
        return res
            .status(422)
            .json({ message: 'need 2 keys : email, password' });
    }
    // const regAlphaNum = new RegExp('^[A-Za-z0-9 ]+$');

    if (
        req.body.email === '' ||
        req.body.email === null ||
        //    !regAlphaNum.test(req.body.email) ||
        req.body.password === '' ||
        req.body.password === null
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
        subscription,
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

        await Subscription.findOneAndUpdate(
            { userId: ans._id },
            {
                storage: Number(subscription),
                price: Number(subscription) * 2000,
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

        const ansSubscription = await Subscription.create({
            userId: ans._id,
            storage: Number(subscription),
            price: Number(subscription) * 2000,
        });

        await Basket.create({
            userId: ans._id,
            subscriptionId: ansSubscription._id,
        });
    }

=======
const emailRegex =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const signup = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    // Vérifiez la présence des champs requis
    if (!email || !password || !firstname || !lastname) {
        return res.status(422).json({ message: 'All fields are required' });
    }

    // Vérifiez si l'email est déjà utilisé
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    // Vérifiez le format de l'email
    if (!emailRegex.test(email)) {
        return res.status(422).json({ message: 'Invalid email format' });
    }

    // Hash du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Création de l'utilisateur
    const newUser = await User.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
    });

    // Réponse JSON en cas de succès
>>>>>>> 8d652f6bca4389a4431ff9aa3a0e3f47efd10ebe
    res.status(201).json({
        message: 'User created',
        user: {
            id: newUser._id,
            email: newUser.email,
        },
    });
    // Redirection vers la page /login
    res.redirect('/login');
};

const addStorage = async (req, res) => {
    const { subscription } = req.body;

    const ansSubscription = await Subscription.create({
        userId: req.user.userId,
        storage: Number(subscription),
        price: Number(subscription) * 2000,
    });

    await Basket.create({
        userId: req.user.userId,
        subscriptionId: ansSubscription._id,
    });

    res.status(201).json({
        message: 'Add subscription',
    });
};

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
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
            {
                userId: foundUser._id.toString(),
                email: foundUser.email,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '10h' }
        ),
    };
    res.status(200).json(dataToSend);
};

const deleteUser = async (req, res) => {
<<<<<<< HEAD
    // TODO: SUPPRIMER TOUS LES FICHIERS DE L'UTILISATEUR
    // TODO: VOIR COMMENT TOUT SUPPRIMER
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    const files = await File.find({ userId: req.user.userId });
    console.log(files);
    if (files) {
        files.map(async (file) => {
            const fileToDelete = await gfs.files.findOne({
                filename: file.fileId,
            });
            const gsfb = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'uploads',
            });
            await gsfb.delete(fileToDelete._id, (err, gridStore) => {
                if (err) {
                    return res.status(404).json({ err });
                }
            });
        });
        const filesDeleted = await File.deleteMany({ userId: req.user.userId });
        console.log(filesDeleted);
    }

    await Address.findOneAndDelete({ userId: req.user.userId });
    await Basket.findOneAndDelete({ userId: req.user.userId });
    await Subscription.deleteMany({ userId: req.user.userId });
    const user = await User.findByIdAndDelete(req.user.userId);
    console.log(user);
    await sendEmail('cherif.bellahouel@hotmail.com', accountDeletedTemplate);
    await sendEmail(
        'cherif.bellahouel@hotmail.com',
        accountDeletedAdminTemplate
    ); // TODO: Envoyer le nombre de fichier supprimés + nom de l'utilisateur dans l'email pour admin
    return res.status(202).json({ message: 'User deleted !' });
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
    console.log(req.params.userId);
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

module.exports.signup = signup;
module.exports.login = login;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.getUserInfoById = getUserInfoById;
module.exports.addStorage = addStorage;
=======
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(202).json({ message: 'User deleted !' });
};

module.exports = {
    signup,
    login,
    deleteUser,
};
>>>>>>> 8d652f6bca4389a4431ff9aa3a0e3f47efd10ebe
