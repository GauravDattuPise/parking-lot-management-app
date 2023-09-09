
const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    parkName: {
        type: String,
        required: true,
        unique : true
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        Two_Wheeler: {
            type: Number,
            required: true,
        },
        Hatchback_Car: {
            type: Number,
            required: true,
        },
        SUV_Car: {
            type: Number,
            required: true,
        }
    },
    rentPerMinute: {
        Two_Wheeler: {
            type: Number,
            required: true,
        },
        Hatchback_Car: {
            type: Number,
            required: true,
        },
        SUV_Car: {
            type: Number,
            required: true,
        }
    }
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
