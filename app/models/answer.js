const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    questionId: {type: String, required: true},
    answerParts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AnswerPart'
    }]
});

var Answer = mongoose.model('AnswerPart', answerSchema);

module.exports = Answer;