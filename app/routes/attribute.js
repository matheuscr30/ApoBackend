module.exports = function (application) {
    application.get('/api/attributes', function (req, res) {
        application.app.controllers.attribute.get(application, req, res);
    });

    application.get('/api/attributes/:id', function (req, res) {
        application.app.controllers.attribute.getById(application, req, res);
    });

    application.post('/api/attributes', function (req, res) {
        application.app.controllers.attribute.post(application, req, res);
    });

    application.put('/api/attributes/:id', function (req, res) {
        application.app.controllers.attribute.put(application, req, res);
    });
};