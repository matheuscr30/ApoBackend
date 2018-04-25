const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerPartSchema = new Schema({
    questionPartId: {type: String, required: true},
    text: {type: String, required: true}
});

var AnswerPart = mongoose.model('AnswerPart', answerPartSchema);

module.exports = AnswerPart;