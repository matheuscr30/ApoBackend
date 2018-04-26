const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerPartSchema = new Schema({
    text: {type: String, required: true}
});

var AnswerPart = mongoose.model('AnswerPart', answerPartSchema);

module.exports = function () {
    return AnswerPart;
};