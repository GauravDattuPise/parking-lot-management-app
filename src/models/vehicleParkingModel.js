
const mongoose = require('mongoose');

const vehicleParkingSchema = new mongoose.Schema({

    parkName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('vehicleParking', vehicleParkingSchema);
