const EvaluationAnswer = require('../models/evaluationAnswer')();
const RespondentType = require('../models/respondentType')();
const QuestionType = require('../models/questionType')();
const Evaluation = require('../models/evaluation')();

module.exports.get = function (application, req, res) {
    Evaluation.find({})
        .populate('techniques')
        .exec(function (err, evaluations) {
            if (err) {
                console.log(err);
                return res.status(500).json({message: "There was a problem finding the evaluations."});
            }
            res.status(200).json({evaluations: evaluations});
        });
};

module.exports.getById = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Evaluation.findById(id)
        .populate('techniques')
        .exec(function (err, evaluation) {
            if (err) {
                return res.status(500).json({message: "There was a problem finding the evaluation."});
            }

            if (evaluation)
                res.status(200).json({evaluation: evaluation});
            else
                res.status(404).json({message: "The object you are looking for was not found"});
        });
};

module.exports.getByIdRaw = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Evaluation.findById(id, function (err, evaluation) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the evaluation."});
        }

        if (evaluation)
            res.status(200).json({evaluation: evaluation});
        else
            res.status(404).json({message: "The object you are looking for was not found"});
    });
};

module.exports.post = function (application, req, res) {
    let body = req.body;
    req.check('name').exists().withMessage("Name is Required");
    req.check('description').exists().withMessage("Description is Required");
    req.check('zipCode').exists().withMessage("ZipCode is Required");
    req.check('city').exists().withMessage("City is Required");
    req.check('state').exists().withMessage("State is Required");
    req.check('country').exists().withMessage("Country is Required");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    let evaluation = new Evaluation({
        name: body['name'],
        description: body['description'],
        zipCode: body['zipCode'],
        city: body['city'],
        state: body['state'],
        country: body['country'],
        techniques: body['techniques']
    });

    evaluation.save(function (err, result) {
        if (err) {
            console.log(err);
            if (err.code === 11000)
                return res.status(409).json({message: "Evaluation already exists"});
            return res.status(500).json({message: "There was a problem creating the evaluation."});
        }

        res.status(200).json({evaluation: result});
    });
};

module.exports.put = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    let body = req.body;
    if (body === "") return res.status(500).json({message: "You need pass something"});
    req.check('name').not().exists().withMessage("Can't change name");
    req.check('name').exists().withMessage("Name is Required");
    req.check('description').exists().withMessage("Description is Required");
    req.check('zipCode').exists().withMessage("ZipCode is Required");
    req.check('city').exists().withMessage("City is Required");
    req.check('state').exists().withMessage("State is Required");
    req.check('country').exists().withMessage("Country is Required");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    Evaluation.findByIdAndUpdate(id, {
        description: body['description'],
        zipCode: body['zipCode'],
        city: body['city'],
        state: body['state'],
        country: body['country'],
        techniques: body['techniques']
    }, {}, function (err, evaluation) {
        if (err) {
            return res.status(500).send("There was a problem updating the evaluation.");
        } else {
            res.status(200).send({evaluation: evaluation});
        }
    });
};

/* Is it correct? */
module.exports.clone = function (application, req, res) {
    let id = req.params.id;
    if (id === '') return res.status(404).json({message: "The object you are looking for was not found"});

    Evaluation.findById(id, function (err, evaluation) {
        if (err) {
            return res.status(500).json({message: "There was a problem finding the evaluation."});
        }

        if (!evaluation)
            return res.status(404).json({message: "The object you are looking for was not found"});

        let cloneEvaluation = new Evaluation({
            name: evaluation['name'] + '-clone',
            description: evaluation['description'],
            zipCode: evaluation['zipCode'],
            city: evaluation['city'],
            state: evaluation['state'],
            country: evaluation['country'],
            techniques: evaluation['techniques']
        });

        cloneEvaluation.save(function (err, result) {
            if (err) {
                console.log(err);
                if (err.code === 11000)
                    return res.status(409).json({message: "Evaluation already exists"});
                return res.status(500).json({message: "There was a problem creating the evaluation."});
            }

            res.status(200).json({evaluation: result});
        });
    });
};

module.exports.apply = function (application, req, res) {
    let body = req.body;
    req.check('dwellerId').exists().withMessage("Dweller's Id is Required");
    req.check('evaluationId').exists().withMessage("Evaluation's Id is Required");
    req.check('answers').exists().withMessage("Answers are Required");

    let errors = req.validationErrors();

    if (errors) {
        let errorText = errors[0].msg;
        return res.status(503).json({message: errorText});
    }

    let evaluationAnswer = new EvaluationAnswer({
        dwellerId: body['dwellerId'],
        evaluationId: body['evaluationId'],
        answers: body['answers']
    });

    evaluationAnswer.save(function (err, result) {
        if (err) {
            console.log(err);
            if (err.code === 11000)
                return res.status(409).json({message: "Evaluation Answer already exists"});
            return res.status(500).json({message: "There was a problem creating the evaluation answer."});
        }

        res.status(200).json({evaluationAnswer: result});
    });
};

module.exports.getRespondentType = function (application, req, res) {
    res.status(200).json({respondentTypes: RespondentType});
};

module.exports.getQuestionType = function (application, req, res) {
    res.status(200).json({questionTypes: QuestionType});
};