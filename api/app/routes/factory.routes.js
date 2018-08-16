module.exports = (app) => {
    const factory = require('../controllers/factory.controller.js');
    const { celebrate, Joi, errors } = require('celebrate');

    // Creates a new factory
    app.post('/factory', celebrate({
        body: Joi.object().keys({
            name: Joi.string().alphanum(),
            number_of_children: Joi.number().min(0).max(15).required()
        })
    }), factory.create);

    // Retrieves all factories
    app.get('/factory', factory.findAll);

    // Retrieves a factory with a factoryId
    app.get('/factory/:factoryId', celebrate({
        params: Joi.object().keys({
            factoryId: Joi.string().alphanum().required()
        })
    }), factory.findOne);

    // Updates a factory with factoryId
    app.put('/factory/:factoryId', celebrate({
        params: Joi.object().keys({
            factoryId: Joi.string().alphanum().required()
        }),
        body: Joi.object().keys({
            name: Joi.string().alphanum(),
            number_of_children: Joi.number().min(0).max(15)
        })
    }), factory.update);

    // Deletes a factory with factoryId
    app.delete('/factory/:factoryId', celebrate({
        params: Joi.object().keys({
            factoryId: Joi.string().alphanum().required()
        })
    }), factory.delete);

    app.use(errors());
}