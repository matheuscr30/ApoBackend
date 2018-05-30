const Evaluation = require('../models/evaluation')();

module.exports.getSingleChoiceQuestionsReport = function (application, req, res) {
   Evaluation.find({})
        .populate({
            path: 'techniques',
            populate: {
                path: 'categories',
                populate: {
                    path: 'questions'
                }
            }
        })
        .exec(function (err, evaluations) {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "There was a problem finding the evaluations."});
            }
            res.status(200).json({evaluations: evaluations});
        });
};