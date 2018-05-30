module.exports = function (application) {
    application.get('/api/reports/singleChoiceQuestionsReport/:questionId', function (req, res) {
        application.app.controllers.report.getSingleChoiceQuestionsReport(application, req, res);
    });
};