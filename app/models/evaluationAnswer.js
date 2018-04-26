const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var evaluationAnswerSchema = new Schema({
    dwellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Dweller'},
    evaluationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation'},
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }]
});

var EvaluationAnswer = mongoose.model('EvaluationAnswer', evaluationAnswerSchema);

module.exports = EvaluationAnswer;

