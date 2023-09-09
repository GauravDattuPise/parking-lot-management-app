const parkLotModel = require("../models/parkLotModel");

// controller for create park
const createParkingLot = async (req, res) => {
    try {

        const data = req.body;
        const { parkName, location, capacity, rentPerMinute } = data;

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "all vehicle exit details are required" })
        }

        // validations
        if (!parkName) { return res.status(400).send({ status: false, message: "parkname is required" }) }
        if (!location) { return res.status(400).send({ status: false, message: "location is required" }) }
        if (!capacity) { return res.status(400).send({ status: false, message: "capacity is required" }) }
        if (!rentPerMinute) { return res.status(400).send({ status: false, message: "rentPerMinute is required" }) }
       
        {
            const { Two_Wheeler, Hatchback_Car, SUV_Car } = capacity
            if (!Two_Wheeler) { return res.status(400).send({ status: false, message: "Two_Wheeler's capacity is required" }) }
            if (!Hatchback_Car) { return res.status(400).send({ status: false, message: "Hatchback_Car's capacity is required" }) }
            if (!SUV_Car) { return res.status(400).send({ status: false, message: "SUV_Car's capacity is required" }) }
        }

        {
            const { Two_Wheeler, Hatchback_Car, SUV_Car } = rentPerMinute
            if (!Two_Wheeler) { return res.status(400).send({ status: false, message: "Two_Wheeler's rent is required" }) }
            if (!Hatchback_Car) { return res.status(400).send({ status: false, message: "Hatchback_Car's rent is required" }) }
            if (!SUV_Car) { return res.status(400).send({ status: false, message: "SUV_Car's rent is required" }) }
        }

        // park name already exists or not
        const existingPark = await parkLotModel.findOne({ parkName })
        if (existingPark) {
            return res.status(409).send({ status: false, message: "this park name is already in database" })
        }

        // creating park
        const park = await parkLotModel.create(data);

        return res.status(201).send({ status: true, message: "parking lot created successfully", park })

    } catch (error) {
        res.status(500).send({ status: false, message: "server error in create parking lot", error })
    }
}

module.exports = { createParkingLot }