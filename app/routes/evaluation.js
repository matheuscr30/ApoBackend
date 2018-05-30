module.exports = function (application) {
    application.get('/api/evaluations', function (req, res) {
        application.app.controllers.evaluation.get(application, req, res);
    });

    application.get('/api/evaluations/:id', function (req, res) {
        application.app.controllers.evaluation.getById(application, req, res);
    });

    application.get('/api/evaluations/:id/raw', function (req, res) {
        application.app.controllers.evaluation.getByIdRaw(application, req, res);
    });

    application.post('/api/evaluations', function (req, res) {
        application.app.controllers.evaluation.post(application, req, res);
    });

    application.put('/api/evaluations/:id', function (req, res) {
        application.app.controllers.evaluation.put(application, req, res);
    });

    application.post('/api/evaluations/clone/:id', function (req, res) {
        application.app.controllers.evaluation.clone(application, req, res);
    });

    application.post('/api/evaluations/apply', function (req, res) {
        application.app.controllers.evaluation.apply(application, req, res);
    });

    application.get('/api/evaluations/respondent', function (req, res) {
        application.app.controllers.evaluation.getRespondentType(application, req, res);
    });

    application.get('/api/evaluations/question', function (req, res) {
        application.app.controllers.evaluation.getQuestionType(application, req, res);
    });
};