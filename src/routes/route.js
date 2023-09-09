
const express = require("express");
const { createParkingLot } = require("../controllers/parkingLotController");
const { createVehicle, vehicleParking, vehicleExit, getVehicleParkingHistory } = require("../controllers/vehicleController");
const router = express.Router();

// POST -- CREATE PARKING-LOT
router.post("/create-parkingLot", createParkingLot)

// POST -- Create Vehicle
router.post("/create-vehicle", createVehicle)

// POST -- Parking Vehicle
router.post("/parking-vehicle", vehicleParking);

// POST -- Exit Vehicle
router.post("/exit-vehicle", vehicleExit);

// GET -- Parking History of Vehicle
router.get("/get-vehicle-parking-history/:vehicleNumber", getVehicleParkingHistory)

module.exports = router;