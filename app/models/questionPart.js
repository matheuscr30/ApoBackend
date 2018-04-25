const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionPartSchema = new Schema({
    questionPartId: {type: String, required: true},
    roomId: {type: String, required: true},
    attributeId: {type: String, required: true},
    qualifierGroupId: {type: String, required: true}
});

var QuestionPart = mongoose.model('QuestionPartSchema', questionPartSchema);

module.exports = QuestionPart;