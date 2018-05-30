const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var qualifierSchema = new Schema({
    name: {type: String, required: true, unique: true},
    intervalBegin: {type: Number, required: true},
    intervalEnd: {type: Number, required: true}
});

var Qualifier = mongoose.model('Qualifier', qualifierSchema);

module.exports = function () {
    return Qualifier;
};

