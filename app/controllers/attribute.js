const Attribute = require('../models/attribute')();

module.exports.get = function (application, req, res) {
    Attribute.find({}, function (err, attributes) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the attributes."});
        }
        res.status(200).json({attributes: attributes});
    });
};

module.exports.getById = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Attribute.findById(id, function (err, attribute) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the attribute."});
        }

        if (attribute)
            res.status(200).json({attribute: attribute});
        else
            res.status(404).json({message: "The object you are looking for was not found"});
    });
};

module.exports.post = function (application, req, res) {
    let body = req.body;
    req.check('name').exists().withMessage("Name is Required");
    req.check('description').exists().withMessage("Description is Required");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    let attribute = new Attribute({
        name: body['name'],
        description: body['description']
    });

    attribute.save(function (err, result) {
        if (err) {
            if (err.code === 11000)
                return res.status(409).json({message: "Attribute already exists"});
            return res.status(500).json({message: "There was a problem creating the attribute."});
        }

        res.status(200).json({attribute: result});
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

    Attribute.findByIdAndUpdate(id, {
        description : body['description']
    }, {}, function (err, attribute) {
        if (err) {
            return res.status(500).send("There was a problem updating the attribute.");
        } else {
            res.status(200).send({attribute: attribute});
        }
    });
};