const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionType = require('../models/questionType')();

var questionSchema = new Schema({
    text: {type: String, required: true},
    ordering: {type: Number, required: true},
    questionType: {
        type: String,
        enum: QuestionType,
        required: true
    },
    colorScale: {type: Boolean, required: true},
    questionParts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPart'
    }]
});

var Question = mongoose.model('Question', questionSchema);

module.exports = function () {
    return Question;
};