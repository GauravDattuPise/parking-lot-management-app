const parkLotModel = require("../models/parkLotModel");
const vehicleModel = require("../models/vehicleModel");
const moment = require("moment")


// create vehicle controller
const createVehicle = async (req, res) => {
    try {

        const data = req.body;
        const { vehicleName, vehicleNumber } = data;

        // validations
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "all vehicle details are required" })
        }

        if (!vehicleName) { return res.status(400).send({ status: false, message: " vehicleName is required" }) }
        if (!vehicleNumber) { return res.status(400).send({ status: false, message: " vehicleNumber is required" }) }

        // if vehicleName is not in enum
        if (vehicleName !== "Two_Wheeler" && vehicleName !== "Hatchback_Car" && vehicleName !== "SUV_Car") {
            return res.status(400).send({ status: false, message: "vehicle name should be Two_Wheeler or Hatchback_Car or SUV_Car " })
        }

        // checking vehicle number already exists or not
        const existingVehicle = await vehicleModel.findOne({ vehicleNumber })
        if (existingVehicle) {
            return res.status(409).send({ status: false, message: "vehicle number already exists, choose another" })
        }

        // creating vehicle in db
        const vehicle = await vehicleModel.create(data);
        return res.status(201).send({ status: true, message: "vehicle created successfully", vehicle })

    } catch (error) {
        res.status(500).send({ status: false, message: "server error in create vehicle", error })
    }
}


// vehicle parking controller

const vehicleParking = async (req, res) => {
    try {

        const data = req.body;
        const { parkName, vehicleNumber } = data;

        if (!parkName) { return res.status(400).send({ status: false, message: " parkName is required" }) }
        if (!vehicleNumber) { return res.status(400).send({ status: false, message: " vehicleNumber is required" }) }

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "all vehicle parking details are required" })
        }

        // park exists or not
        const existingPark = await parkLotModel.findOne({ parkName });
        if (!existingPark) {
            return res.status(404).send({ status: false, message: "parkLot not found" })
        }

        // vehicle exists or not
        const existingVehicle = await vehicleModel.findOne({ vehicleNumber })
        if (!existingVehicle) {
            return res.status(404).send({ status: false, message: "vehicle not found" })
        }

        // if vehicle already in parking
        if (existingVehicle.isParked === true) {
            return res.status(400).send({ status: false, message: "vehicle already parked in parking" })
        }

        // checking parking space for particular vehicle
        const vehicleName = existingVehicle.vehicleName;
        let spaceAvailble;

        if (vehicleName === "Hatchback_Car") {
            spaceAvailble = existingPark.capacity.Hatchback_Car

            if (spaceAvailble < 1) {
                return res.status(400).send({ status: false, message: `sorry space is not available for ${vehicleName}` })
            }

            // decreasing capacity & saving
            existingPark.capacity.Hatchback_Car--;
            await existingPark.save();
        }
        else if (vehicleName === "SUV_Car") {
            spaceAvailble = existingPark.capacity.SUV_Car

            if (spaceAvailble < 1) {
                return res.status(400).send({ status: false, message: `sorry space is not available for ${vehicleName}` })
            }

            // decreasing capacity & saving
            existingPark.capacity.SUV_Car--;
            await existingPark.save();
        }
        else {
            spaceAvailble = existingPark.capacity.Two_Wheeler

            if (spaceAvailble < 1) {
                return res.status(400).send({ status: false, message: `sorry space is not available for ${vehicleName}` })
            }

            // decreasing capacity & saving
            existingPark.capacity.Two_Wheeler--;
            await existingPark.save();
        }

        // current time 
        const currDate = new Date()
        const formatedDate = moment(currDate).format("lll")

        const vehichleParkingData = {
            parkName: existingPark.parkName,
            parkLocation: existingPark.location,
            parkedAt: formatedDate
        }

        // pushing vehicle parking data
        existingVehicle.parkingHistory.push(vehichleParkingData);

        // if vehicle is parked
        existingVehicle.isParked = true;
        existingVehicle.save();

        return res.status(200).send({ status: true, message: "vehicle parked successfully", parkCapacity: existingPark.capacity })

    } catch (error) {
        res.status(500).send({ status: false, message: "server error in parking vehicle", error })
    }
}


// vehicle exit controller

const vehicleExit = async (req, res) => {
    try {

        const data = req.body;
        const { parkName, vehicleNumber } = data;

        if (!parkName) { return res.status(400).send({ status: false, message: " parkName is required" }) }
        if (!vehicleNumber) { return res.status(400).send({ status: false, message: " vehicleNumber is required" }) }

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "all vehicle exit details are required" })
        }

        // park exists or not
        const existingPark = await parkLotModel.findOne({ parkName });
        if (!existingPark) {
            return res.status(404).send({ status: false, message: "parkLot not found" })
        }

        // vehicle exists or not
        const existingVehicle = await vehicleModel.findOne({ vehicleNumber })
        if (!existingVehicle) {
            return res.status(404).send({ status: false, message: "vehicle not found" })
        }

        // if vehicle not present in parking
        if (existingVehicle.isParked === false) {
            return res.status(400).send({ status: false, message: "exit is cant happen beacuse vehicle is not present in park" })
        }

        // checking parking space for this particular vehicle
        const vehicleName = existingVehicle.vehicleName;
        let vehichleParkingAmount;
        if (vehicleName === "Hatchback_Car") {
            existingPark.capacity.Hatchback_Car++;
            await existingPark.save();

            vehichleParkingAmount = existingPark.rentPerMinute.Hatchback_Car

        }
        else if (vehicleName === "SUV_Car") {
            existingPark.capacity.SUV_Car++;
            await existingPark.save();

            vehichleParkingAmount = existingPark.rentPerMinute.SUV_Car

        }
        else {
            existingPark.capacity.Two_Wheeler++;
            await existingPark.save();

            vehichleParkingAmount = existingPark.rentPerMinute.Two_Wheeler

        }

        // when vehicle was parked
        const vehicleWasParkedAt = existingVehicle.parkingHistory[existingVehicle.parkingHistory.length - 1].parkedAt

        const currDate = new Date()
        const formatedDate = moment(currDate).format("lll")

        // Parse the timestamps
        const time1 = moment(vehicleWasParkedAt, "MMM D, YYYY h:mm A");
        const time2 = moment(formatedDate, "MMM D, YYYY h:mm A");

        // difference in milliseconds
        const differenceInMilliseconds = time2.diff(time1);

        // different in minutes
        const duration = moment.duration(differenceInMilliseconds);
        const minutes = duration.minutes();
        console.log(minutes);


        const vehichleExitData = {
            parkName: existingPark.parkName,
            parkLocation: existingPark.location,
            ExitedAt: formatedDate,
            parkedDurationInMinutes: minutes,
            amountPaid: minutes * vehichleParkingAmount
        }

        // pushing vehicle exit data
        existingVehicle.parkingHistory.push(vehichleExitData);

        // if vehicle is exit from park
        existingVehicle.isParked = false;
        existingVehicle.save();

        return res.status(200).send({ status: true, message: "vehicle exited successfully", parkCapacity: existingPark.capacity, vehichleExitData })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: "server error in exit vehicle", error })
    }
}

// get vehicle parking history 

const getVehicleParkingHistory = async (req, res) => {
    try {
        const { vehicleNumber } = req.params

        // vehicle exists or not
        const existingVehicle = await vehicleModel.findOne({ vehicleNumber }).select({ _id: 0, __v: 0 })
        if (!existingVehicle) {
            return res.status(404).send({ status: false, message: "vehicle not found" })
        }

        // if parking history is not available
        if (existingVehicle.parkingHistory.length === 0) {
            return res.status(400).send({ status: false, message: "vehicle parking history not available" })
        }

        return res.status(200).send({ status: true, message: "vehicle parking history", existingVehicle })
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: "server error in get vehicle history", error })
    }
}
module.exports = { createVehicle, vehicleParking, vehicleExit, getVehicleParkingHistory }