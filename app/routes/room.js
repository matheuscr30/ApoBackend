module.exports = function (application) {
    application.get('/api/rooms', function (req, res) {
        application.app.controllers.room.get(application, req, res);
    });

    application.get('/api/rooms/:id', function (req, res) {
        application.app.controllers.room.getById(application, req, res);
    });

    application.post('/api/rooms', function (req, res) {
        application.app.controllers.room.post(application, req, res);
    });

    application.put('/api/rooms/:id', function (req, res) {
        application.app.controllers.room.put(application, req, res);
    });
};