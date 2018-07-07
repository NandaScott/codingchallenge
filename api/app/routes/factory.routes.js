module.exports = (app) => {
    const factory = require('../controllers/factory.controller.js');

    // Creates a new factory
    app.post('/factory', factory.create);

    // Retrieves all factories
    app.get('/factory', factory.findAll);

    // Retrieves a factory with a factoryId
    app.get('/factory/:factoryId', factory.findOne);

    // Updates a factory with factoryId
    app.put('/factory/:factoryId', factory.update);

    // Deletes a factory with factoryId
    app.delete('/factory/:factoryId', factory.delete);
}