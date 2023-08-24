const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

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
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(202).json({ message: 'User deleted !' });
};

module.exports = {
    signup,
    login,
    deleteUser,
};
