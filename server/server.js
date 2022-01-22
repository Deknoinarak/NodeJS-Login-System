// Import Modules
import express from "express";
import mongoose from "mongoose";
import consola from "consola";
import dotenv from "dotenv";

// DotENV
dotenv.config();

// Variables
const app = express();

const { PORT, DB_CONNECTION } = process.env;

// Create HTTP Server
app.listen(8561, () => {
    consola.success({ message: `Express Is Listening To Port ${PORT}`, badge: true })
});

// Connect To Database Function
const DBconnect = async () => {
    try {
        // Connect To The Database
        await mongoose.connect(DB_CONNECTION, {
            dbName: "loginUser"
        })

        // Inform Success!
        consola.success({ message: `Successfully Connect To The Database!`, badge: true })
    }
    catch (err) {
        // Inform Error
        consola.error({ message: `Error While Connecting To The Database. Info: ${err}`, badge: true })
    }
};

// Connect To DB
DBconnect()