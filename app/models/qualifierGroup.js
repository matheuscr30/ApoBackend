const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var qualifierGroupSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    qualifiers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qualifier"
    }]
});

var QualifierGroup = mongoose.model('QualifierGroup', qualifierGroupSchema);

module.exports = QualifierGroup;