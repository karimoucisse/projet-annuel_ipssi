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

const getStorage = async (req, res) => {
<<<<<<< HEAD
    try {
        const storage = await Subscription.find({ userId: req.user.userId });
        const sumStorage = storage.reduce((acc, curr) => acc + curr.storage, 0);
        console.log('storage ===> ', sumStorage);
        return res.status(200).json({ storage, sum: sumStorage });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
=======
    const storage = await Subscription.find({ userId: req.user.userId });
    const sumStorage = storage.reduce((acc, curr) => console.log(acc), 0); // TODO: REVOIR CA
    return res.status(200).json({ message: 'sum' });
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
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

const deleteFilesForUser = (userId) => {
    const gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
<<<<<<< HEAD
=======
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
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179

    File.find({ userId }).then((files) => {
        if (files) {
            const deletePromises = files.map(
                (file) =>
                    new Promise((resolve, reject) => {
                        gfs.files.findOne(
                            { filename: file.fileId },
                            (err, fileToDelete) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    gfs.delete(
                                        fileToDelete._id,
                                        (deleteErr) => {
                                            if (deleteErr) {
                                                reject(deleteErr);
                                            } else {
                                                resolve();
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    })
            );

            Promise.all(deletePromises)
                .then(() => {
                    File.deleteMany({ userId }).then((filesDeleted) => {
                        console.log('filesDeleted ==>', filesDeleted);
                    });
                })
                .catch((err) => {
                    console.error(
                        `Erreur lors de la suppression des fichiers : ${err.message}`
                    );
                });
        }
    });
};

const sendConfirmationEmails = async (userEmail) => {
    // Envoyer un e-mail de confirmation à l'utilisateur
    await sendEmail(userEmail, accountDeletedTemplate);

    // Envoyer un e-mail de confirmation à l'administrateur
    await sendEmail(
        'cherif.bellahouel@hotmail.com',
        accountDeletedAdminTemplate
    );
};

const cleanupUserData = async (userId) => {
    await Address.findOneAndDelete({ userId });
    await Basket.findOneAndDelete({ userId });
    await Subscription.deleteMany({ userId });

    const user = await User.findByIdAndDelete(userId);

    // Envoyer des e-mails de confirmation
    await sendConfirmationEmails(user.email);
};

const deleteUser = async (req, res) => {
    try {
        // Supprimer les fichiers associés à l'utilisateur (s'ils existent)
        deleteFilesForUser(req.user.userId);

        // Supprimer les données de l'utilisateur et envoyer des e-mails
        cleanupUserData(req.user.userId);

        return res.status(202).json({ message: 'User deleted !' });
    } catch (error) {
        console.error(
            `Erreur lors de la suppression de l'utilisateur : ${error.message}`
        );
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
    console.log(req.params.userId);
    const user = await User.findOne({ _id: req.params.userId });
    const address = await Address.findOne({ userId: req.params.userId });
    const subscription = await Subscription.findOne({
        userId: req.params.userId,
    });
    console.log('userInfo ==> ', {
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

        // Vérifiez si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Récupérez les données mises à jour depuis le corps de la requête
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

        // Mettez à jour les informations de l'utilisateur
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

        await user.save(); // Enregistrez les modifications dans la base de données

        // Vous pouvez également mettre à jour les informations de l'adresse et de l'abonnement de la même manière

        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateUserAndAdress = async (req, res) => {
    try {
        const { userId } = req.user;

        // Vérifiez si l'utilisateur existe
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
        user.address = userAddress._id; // Associez l'adresse à l'utilisateur

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
module.exports.addStorage = addStorage;
module.exports.getStorage = getStorage;
// module.exports.getInvoice = getInvoice;
