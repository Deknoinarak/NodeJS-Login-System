// Import Modules
import express from "express";
import mongoose from "mongoose";
import consola from "consola";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session"
import cookieParser from "cookie-parser"
import passport from "passport"

// DotENV
dotenv.config();

// Variables
const app = express();

const { PORT, DB_CONNECTION, SECRET } = process.env;

// Use CORS
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

// Body JSON Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session
app.use(
    session({
        secret: 'SECRET',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(cookieParser('SECRET'))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// import passportConfig from "./components/middlewares/passport-config.js"
// passportConfig(passport)

// Create HTTP Server
app.listen(8561, () => {
    consola.success({ message: `Express Is Listening To Port ${PORT}`, badge: true })
});

// Import API/AUTH Route
import authRoute from "./components/routes/auth.js"

// GET /api/auth
app.use('/api/auth', authRoute)

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