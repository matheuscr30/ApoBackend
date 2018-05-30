const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RespondentType = require('../models/respondentType')();

var techniqueSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    respondentType: {
        type: String,
        enum: RespondentType,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

var Technique = mongoose.model('Technique', techniqueSchema);

module.exports = function () {
    return Technique;
};