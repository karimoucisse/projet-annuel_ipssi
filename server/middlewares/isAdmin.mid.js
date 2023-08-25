const User = require('../models/user.model');

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({ message: 'user not found' });
        }
        if (user.role !== 'ADMIN') {
            // On vient vérifier que l'utilisateur est bien un admin
            return res.status(401).json({
                message: 'You are not authorized to access this page',
            });
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = isAdmin;
