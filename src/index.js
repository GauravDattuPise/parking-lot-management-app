
const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")

// making mongo_url secure
const dotenv = require("dotenv")
dotenv.config();

const app = express();
app.use(express.json());

// connecting to database
mongoose.connect(process.env.DB_URL)
.then(()=> console.log("DB is connected"))
.catch((err)=> console.log("error in connection", err));

app.use("/", route)

// server running
app.listen(process.env.PORT, ()=>{
    console.log("Server is running on", process.env.PORT);
})
