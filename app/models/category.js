const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

var Category = mongoose.model('Category', categorySchema);

module.exports = function () {
    return Category;
};