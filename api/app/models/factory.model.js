const mongoose = require('mongoose');

const FactorySchema = mongoose.Schema({
    name: String,
    number_of_children: { type: Number, min: 0, max: 15},
    values: Array
});

module.exports = mongoose.model('Factory', FactorySchema);