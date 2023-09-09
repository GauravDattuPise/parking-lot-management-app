
const mongoose = require('mongoose');

const vehicleExitSchema = new mongoose.Schema({

    parkName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('vehicleExit', vehicleExitSchema);
