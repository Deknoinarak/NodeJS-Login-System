// Import Modules
import userModel from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import consola from "consola"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Register User Function
const regisUser = async (userInfo, res) => {
    try {
        // Username Valid
        if (!await usernameValid(userInfo.username, userInfo.email)) {
            // Inform Error
            consola.error({
                message: `Username or email already register`,
                badge: true
            })

            return (
                //  Send Back JSON Status
                res.json({
                    message: `That Username or email already register`,
                    success: false
                })
            )
        }

        // Hash Password
        const pwdHash = await bcrypt.hash(userInfo.pwd, 12)

        // Store User Info
        const newUser = new userModel({
            user_id: uuidv4(),
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            password: pwdHash
        })

        // Adding User To The Database
        await newUser.save()

        // Inform Success
        consola.success({
            message: `Successfully Add New User To The Database!`,
            badge: true
        })

        //  Send Back JSON Status
        res.status(200).json({
            message: `Successfully Add New User To The Database!`,
            success: true
        })
    }
    catch (err) {
        // Inform Error
        consola.error({
            message: `Error While Adding New User To The Database. Info: ${err}`,
            badge: true
        })

        //  Send Back JSON Status
        res.json({
            message: `Error While Registering User! Info: ${err}`,
            success: false
        })
    }
}

// Login User Function
const loginUser = async (userInfo, res) => {
    try {
        const findUserByEmail = await userModel.findOne({ email: userInfo.username })
        const findUser = await userModel.findOne({ username: userInfo.username })

        if (findUser) {
            consola.success({
                message: `Successfully Find User By Username`,
                badge: true
            })

            login(userInfo, findUser, res)
        }
        else if (findUserByEmail) {
            consola.success({
                message: `Successfully Find User By Email`,
                badge: true
            })

            login(userInfo, findUserByEmail, res)
        }
        else {
            consola.error({
                message: `No User Found With That Email/Username`,
                badge: true
            })

            return res.json({
                message: `Password Or Username Does Not Match!`,
                success: false
            })
        }
    }
    catch (err) {
        consola.error({
            message: `Error While Logging In. Info: ${err}`,
            badge: true
        })

        return res.status(503).json({
            message: `Error While Logging In. Info: ${err}`,
            success: false
        })
    }
}

// Login Function
const login = async (userInfo, fromDB, res) => {
    consola.info({
        message: `Login Function Started!`,
        badge: true
    })

    if (await bcrypt.compare(userInfo.pwd, fromDB.password)) {
        const jwtToken = jwt.sign({
            id: fromDB.user_id,
            firstName: fromDB.firstName,
            lastName: fromDB.lastName,
            username: fromDB.username,
            email: fromDB.email,
        }, process.env.SECRET)

        consola.info("JWT Token:", jwtToken)

        return res.status(200).json({
            message: `Login Successfully!`,
            token: jwtToken,
            success: true
        })
    }

    consola.info(`Password Does Not Match`)

    return res.json({
        message: `Password Or Username Does Not Match!`,
        success: false
    })
}

// Username/Email Validation
const usernameValid = async (username, email) => {
    try {
        // Find If there were username or email with this input
        const validUsername = await userModel.findOne({ username: username })
        const validEmail = await userModel.findOne({ email: email })

        if (validEmail || validUsername) {
            // If there were user with this username or password
            return false
        }
        else {
            // If there were no
            return true
        }
    }
    catch (err) {
        // Return Back Error
        return err
    }
}

export {
    regisUser,
    loginUser
}