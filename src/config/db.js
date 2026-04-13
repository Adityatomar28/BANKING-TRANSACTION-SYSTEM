const mongoose = require("mongoose")

function connectToDB(){
    //Before using this Mongo_uri we have to go to server.js there we have to go and use  
    //require("dotenv").config() then only we can use MONGO_URI
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("server is connected to DB")
    })
    .catch(err => {
        console.log("Error connecting to DB")
        process.exit(1) // it means we are failed to connect Database we are going to close the server
    })

}

module.exports = connectToDB