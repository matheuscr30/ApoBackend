module.exports = function (application) {
    application.get('/api/qualifier-groups', function (req, res) {
        application.app.controllers.qualifierGroup.get(application, req, res);
    });

    application.get('/api/qualifier-groups/:id', function (req, res) {
        application.app.controllers.qualifierGroup.getById(application, req, res);
    });

    application.post('/api/qualifier-groups', function (req, res) {
        application.app.controllers.qualifierGroup.post(application, req, res);
    });

    application.put('/api/qualifier-groups/:id', function (req, res) {
        application.app.controllers.qualifierGroup.put(application, req, res);
    });
};