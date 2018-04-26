const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dwellerSchema = new Schema({
    name: {type: String, required: true},
    street: {type: String, required: true},
    addressNumber: {type: String, required: true},
    complement: {type: String, required: true},
    neighborhood: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
});

var Dweller = mongoose.model('Dweller', dwellerSchema);

module.exports = function () {
    return Dweller;
};