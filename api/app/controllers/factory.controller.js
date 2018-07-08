const Factory = require('../models/factory.model.js');
const rn = require('random-number');
const escape = require('escape-html');

// Create and Save a new factory
exports.create = (req, res) => {
    let valuesGen = [];
    for (let i = 0; i < req.body.number_of_children; i++) {
        valuesGen.push(rn({min:100, max:999, integer:true}));
    }

    const factory = new Factory({
        name: escape(req.body.name),
        number_of_children: req.body.number_of_children,
        values: valuesGen
    });

    factory.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the factory."
        });
    });
};

// Retrieve and return all factories from the database.
exports.findAll = (req, res) => {
    Factory.find()
    .then(factory => {
        res.send(factory);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the factories."
        });
    });
};

// Find a single factory with a factoryId
exports.findOne = (req, res) => {
    let escapedFactoryId = escape(req.params.factoryId);

    Factory.findById(escapedFactoryId)
    .then(factory => {
        if (!factory) {
            return res.status(404).send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        res.send(factory);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        return res.status(500).send({
            message: err.message || "Error retrieving factory with id " + escapedFactoryId
        });
    });
};

// Update a factory identified by the factoryId in the request
exports.update = (req, res) => {
    let escapedFactoryId = escape(req.params.factoryId);

    let valuesGen = [];
    for (let i = 0; i < req.body.number_of_children; i++) {
        valuesGen.push(rn({min:100, max:999, integer:true}));
    }

    Factory.findByIdAndUpdate(escapedFactoryId, {
        name: escape(req.body.name) || "Untitled Factory",
        number_of_children: req.body.number_of_children,
        values: valuesGen
    }, {new: true})
    .then(factory => {
        if (!factory) {
            return res.status.send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        res.send(factory)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        return res.status(500).send({
            message: "Error updating factory with id " + escapedFactoryId
        });
    });
};

// Delete a factory with the specified factoryId in the request
exports.delete = (req, res) => {
    let escapedFactoryId = escape(req.params.factoryId);

    Factory.findByIdAndRemove(escapedFactoryId)
    .then(factory => {
        if (!factory) {
            return res.status.send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        res.send({message: "Successfully deleted factory!"});
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Factory not found with id " + escapedFactoryId
            });
        }
        return res.status(500).send({
            message: "Error updating factory with id " + escapedFactoryId
        });
    });
};