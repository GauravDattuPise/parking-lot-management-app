
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true,
        enum: ["Two_Wheeler", "Hatchback_Car", "SUV_Car"]
    },
    vehicleNumber: {
        type: Number,
        required: true
    },
    isParked : {
        type : Boolean,
        default : false
    },
    parkingHistory : []
});

module.exports = mongoose.model('vehicle', vehicleSchema);
