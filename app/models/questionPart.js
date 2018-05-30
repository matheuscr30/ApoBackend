const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionPartSchema = new Schema({
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true},
    attributeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', required: true},
    qualifierGroupId: {type: mongoose.Schema.Types.ObjectId, ref: 'QualifierGroup', required: true}
});

var QuestionPart = mongoose.model('QuestionPart', questionPartSchema);

module.exports = function () {
    return QuestionPart;
};