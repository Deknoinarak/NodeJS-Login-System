// Import Modules
import userModel from "../models/user.model.js";
import localPassport from "passport-local";
import bcrypt from "bcrypt";

// Variables
const localStrategy = localPassport.Strategy;

// Function
const passportConfig = (passport) => {
    passport.use(
        new localStrategy({ usernameField: 'username', passwordField: 'pwd' }, (username, password, done) => {
            userModel.findOne({ username: username }, (err, user) => {
                if (err) throw err
                if (!user) return done(null, false)
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err
                    if (result === true) {
                        return done(null, user)
                    }
                    else {
                        return done(null, false)
                    }
                })
            })
        })
    )

    passport.serializeUser((user, cb) => {
        cb(null, user.user_id)
    })

    passport.deserializeUser((id, cb) => {
        userModel.findOne({ user_id: id }, (err, user) => {
            console.log("DESERIALIZE!!!")
            cb(null, user)
        })
    })
}

export default passportConfig