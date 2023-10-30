const User = require('../models/user.model');

const login = async (req, res, next) => {
    try{
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
        req.foundUser = foundUser;
        next();
    } catch {
        next(error);
    }
}

module.exports = login;