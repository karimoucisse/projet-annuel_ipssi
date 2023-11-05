const Subscription = require('../models/subscription.model');
const File = require('../models/file.model');

const checkStorage = async (req, res, next) => {
  try {
    const userStorage = await Subscription.findOne({ userId: req.user.userId });
    const sumFileSizes = await File.find({ userId: req.user.userId }, { fileSize: 1, _id: 0 });
    let totalSize = 0;

    sumFileSizes.forEach(file => {
      totalSize += parseFloat(file.fileSize.toString());
    });
    if(totalSize >= parseInt(userStorage.storage) * 1000000000){
      return res.status(401).json({'message': 'Augmenter votre capacité de stockage'})
    }
    next();
  } catch (error){
    next(error);
  }
}

module.exports = checkStorage;