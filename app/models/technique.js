const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var techniqueSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    respondentType: {
        type: String,
        enum: ['MORADOR', 'PESQUISADOR'],
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

var Technique = mongoose.model('Technique', techniqueSchema);

module.exports = Technique;

//RespondentType is a enum