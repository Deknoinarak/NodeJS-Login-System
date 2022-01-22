// Import Modules
import mongoose from "mongoose"
import userModel from "../models/user.model.js"
import { v4 as uuidv4 } from "uuid"
import consola from "consola"
import bcrypt from "bcrypt"

// Register User Function
const regisUser = async (userInfo, res) => {
    try {
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
        res.status(503).json({
            message: `Error While Adding New User To The Database. Info: ${err}`,
            success: false
        })
    }
}

export {
    regisUser
}