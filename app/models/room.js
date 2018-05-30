const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
});

var Room = mongoose.model('Room', roomSchema);

module.exports = function () {
    return Room;
};