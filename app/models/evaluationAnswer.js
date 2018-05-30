const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var evaluationAnswerSchema = new Schema({
    dwellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Dweller', require: true},
    evaluationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', require: true},
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }]
});

var EvaluationAnswer = mongoose.model('EvaluationAnswer', evaluationAnswerSchema);

module.exports = function () {
    return EvaluationAnswer;
};

