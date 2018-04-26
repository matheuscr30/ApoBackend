const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    answerParts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnswerPart'
    }]
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = function () {
    return Answer;
};