const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var evaluationSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    techniques: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technique'
    }]
});

var Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = function () {
    return Evaluation;
};