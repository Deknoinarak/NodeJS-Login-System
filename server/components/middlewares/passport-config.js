// Import Modules
import localPassport from "passport-local"
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt"

// Variables
const localStrategy = localPassport.Strategy

// Strategy
const passportConfigLocal = (passport) => {
    passport.use(new localStrategy({ usernameField: 'username', passwordField: 'pwd' },
        (username, password, done) => {
            userModel.findOne({ username: username }, (err, user) => {
                if (err) throw err
                if (!user) return done(null, false, { message: `User Does Not Exist.` })
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err
                    if (result === true) {
                        return done(null, user)
                    }
                    else {
                        return done(null, false, { message: `Incorrect Password` })
                    }
                })
            })
        }
    ))

    passport.serializeUser((user, done) => {
        console.log("Serialize User")
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("Deserialize User")
        userModel.findOne({ _id: id }, (err, user) => {
            done(err, user);
        });
    });
}

export default passportConfigLocal