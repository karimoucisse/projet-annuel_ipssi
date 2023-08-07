const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signup = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    if (!email) {
        return res.status(422).json({ message: 'Email is required' });
    }

    if (!password) {
        return res.status(422).json({ message: 'Password is required' });
    }

    if (!firstname) {
        return res.status(422).json({ message: 'First name is required' });
    }

    if (!lastname) {
        return res.status(422).json({ message: 'Last name is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ message: 'Provide a valid email address' });
    }

    try {
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(409).json({ message: 'Email already used' });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const ans = await User.create({
            email,
            password: hash,
            firstname,
            lastname,
        });

        res.status(201).json({
            message: 'User created',
            user: {
                id: ans._id,
                email,
                firstname,
                lastname,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred' });
    }
};

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

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(202).json({ message: 'User deleted !' });
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.deleteUser = deleteUser;
