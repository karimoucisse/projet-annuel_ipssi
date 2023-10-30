const User = require('../models/user.model');

const subscriptionIsValid = async (req, res, next) => {
    try{
        if (!(
            'email'         in req.body && 
            'password'      in req.body &&
            'firstname'     in req.body &&
            'lastname'      in req.body &&
            'phone'         in req.body &&
            'wayType'       in req.body &&
            'number'        in req.body &&
            'addressName'   in req.body &&
            'postalCode'    in req.body &&
            'state'         in req.body &&
            'city'          in req.body &&
            'country'       in req.body
        )) {
            return res
                .status(422)
                .json({ message: 'need keys' });
        }
        // const regAlphaNum = new RegExp('^[A-Za-z0-9 ]+$');
    //    !regAlphaNum.test(req.body.email) ||
        if (
            req.body.email          === '' ||
            req.body.email          === null ||
            req.body.password       === '' ||
            req.body.password       === null ||
            req.body.firstname      === '' ||
            req.body.firstname      === null ||
            req.body.lastname       === '' ||
            req.body.lastname       === null ||
            req.body.phone          === '' ||
            req.body.phone          === null ||
            req.body.wayType        === '' ||
            req.body.wayType        === null ||
            req.body.number         === '' ||
            req.body.number         === null ||
            req.body.addressName    === '' ||
            req.body.addressName    === null ||
            req.body.postalCode     === '' ||
            req.body.postalCode     === null ||
            req.body.state          === '' ||
            req.body.state          === null ||
            req.body.city           === '' ||
            req.body.city           === null ||
            req.body.country        === '' ||
            req.body.country        === null
        ) {
            return res.status(422).json({ message: 'Format is not correct' });
        }
        const foundUser = await User.findOne({ email });
        if (foundUser && foundUser.active) {
            return res.status(409).json({ message: 'email already used' });
        }
        if(foundUser){
            req.foundUser = foundUser;
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = subscriptionIsValid;