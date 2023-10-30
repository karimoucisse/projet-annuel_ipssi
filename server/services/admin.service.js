const moment = require('moment');

const getParams = (req) => {
    if(req.query.extension != undefined) { // TODO: Checker les paramètres pour éviter les erreurs
        return {
            params :
            {
                userId: req.params.userId,
                fileExtension: req.query.extension
            },
            sortObject : {}
        }
    }
    else if (req.query.param != undefined) {
        const sortParam = req.query.param;
        const sortDirection = parseInt(req.query.direction);
        const sortObject = {};
        sortObject[sortParam] = sortDirection;
        return {
            params :
            {
                userId: req.params.userId,
            },
            sortObject
        }
    }
    else {
        return {
            params : {
                userId: req.params.userId,
            },
            sortObject: {}
        }
    }
}

const filesByUserQuery = [
    {
        $group: {
            _id: '$userId',
            count: { $sum: 1 },
        },
    },
    {
        $lookup: {
            from: 'users', // Nom de la collection d'utilisateurs
            localField: '_id', // Champ local pour la jointure (ici, _id de l'utilisateur)
            foreignField: '_id', // Champ de la collection d'utilisateurs à associer (ici, _id)
            as: 'user', // Le nom du champ dans le résultat de la jointure
        },
    },
    {
        $unwind: '$user', // Décompose le tableau résultant de la jointure en un objet unique
    },
    {
        $project: {
            _id: 1,
            count: 1,
            firstname: '$user.firstname', // Champ name de la collection d'utilisateurs
            lastname: '$user.lastname', // Champ lastName de la collection d'utilisateurs
        },
    },
];

const createdTodayQuery = () => {
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();
    return {
        createdAt: {
            $gte: todayStart,
            $lte: todayEnd,
        },
    }
}

module.exports.getParams = getParams;
module.exports.filesByUserQuery = filesByUserQuery;
module.exports.createdTodayQuery = createdTodayQuery;