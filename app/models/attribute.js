const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var attributeSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
});

var Attribute = mongoose.model('Attribute', attributeSchema);

module.exports = Attribute;