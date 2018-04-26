const QualifierGroup = require('../models/qualifierGroup')();

module.exports.get = function (application, req, res) {
    QualifierGroup.find({})
        .populate('qualifiers')
        .exec(function (err, qualifierGroups) {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "There was a problem finding the qualifier groups."});
            }
            res.status(200).json({qualifierGroups: qualifierGroups});
        });
};

module.exports.getById = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    QualifierGroup.findById(id)
        .populate('qualifiers')
        .exec(function (err, qualifierGroup) {
            if (err) {
                return res.status(500).json({message: "There was a problem finding the qualifier group."});
            }

            if (qualifierGroup)
                res.status(200).json({qualifierGroup: qualifierGroup});
            else
                res.status(404).json({message: "The object you are looking for was not found"});
        });
};

module.exports.post = function (application, req, res) {
    let body = req.body;
    req.check('name').exists().withMessage("Name is Required");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    let qualifierGroup = new QualifierGroup({
        name: body['name'],
        description: body['description'],
        qualifiers: body['qualifiers']
    });

    qualifierGroup.save(function (err, result) {
        if (err) {
            console.log(err);
            if (err.code === 11000)
                return res.status(409).json({message: "Qualifier Group already exists"});
            return res.status(500).json({message: "There was a problem creating the qualifier groups."});
        }

        res.status(200).json({qualifierGroup: result});
    });
};

module.exports.put = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    let body = req.body;
    if (body === "") return res.status(500).json({message: "You need pass something"});
    req.check('name').not().exists().withMessage("Can't change name");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    QualifierGroup.findByIdAndUpdate(id, {
        description: body['description']
    }, {}, function (err, qualifierGroup) {
        if (err) {
            return res.status(500).send("There was a problem updating the qualifier group.");
        } else {
            res.status(200).send({qualifierGroup: qualifierGroup});
        }
    });
};