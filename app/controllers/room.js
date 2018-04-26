const Room = require('../models/room')();

module.exports.get = function (application, req, res) {
    Room.find({}, function (err, rooms) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the rooms."});
        }
        res.status(200).json({rooms: rooms});
    });
};

module.exports.getById = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Room.findById(id, function (err, room) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the room."});
        }

        if (room)
            res.status(200).json({room: room});
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

    let room = new Room({
        name: body['name'],
        description: body['description']
    });

    room.save(function (err, result) {
        if (err) {
            if (err.code === 11000)
                return res.status(409).json({message: "Room already exists"});
            return res.status(500).json({message: "There was a problem creating the rooms."});
        }

        res.status(200).json({room: result});
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

    Room.findByIdAndUpdate(id, {
        description : body['description']
    }, {}, function (err, room) {
        if (err) {
            return res.status(500).send("There was a problem updating the room.");
        } else {
            res.status(200).send({room: room});
        }
    });
};