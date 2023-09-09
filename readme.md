# Parking Lot Management Application

## Features
- **Multiple Parking Lots:** The platform should support multiple parking lots, each with its own capacity and rate cards.
- **Vehicle Types:** Support different types of vehicles, such as Two-Wheelers, Hatchback Cars, and SUV Cars.
- **Capacity Management:** Each parking lot should have separate capacity for each type of vehicle.
- **Rate Cards:** Define different hourly rate cards for each type of vehicle.

## Technologies
- **Backend:** Node.js with Express.js
- **Database:** MongoDB

## API URLS

- **POST api url to create parking-lots:**
https://parking-lot-service.onrender.com/create-parkingLot

{
    "parkName": "park4",
    "location":"location4",
    "capacity": {
        "Two_Wheeler":5,
        "Hatchback_Car": 5,
        "SUV_Car":5
    },
    "rentPerMinute": {
        "Two_Wheeler": 10,
        "Hatchback_Car": 11,
        "SUV_Car": 12
    }
}
- **POST api url to create vehicle :**
https://parking-lot-service.onrender.com/create-vehicle

{
    "vehicleName" : "Two_Wheeler",
    "vehicleNumber" : 1008
}

- **POST api url to park vehicle :**
https://parking-lot-service.onrender.com/parking-vehicle

{
     "parkName": "park2",
    "vehicleNumber": 1004
}

 - **POST api url to exit vehicle :**
https://parking-lot-service.onrender.com/exit-vehicle

{
     "parkName": "park2",
    "vehicleNumber": 1002
}

- **GET api url to get parking history of vehicle :**

https://parking-lot-service.onrender.com/get-vehicle-parking-history/1001
(vehicleNumber is 1001)
