const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;