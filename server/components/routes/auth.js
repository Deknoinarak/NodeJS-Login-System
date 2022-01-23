// Import Modules
import express from "express";
import consola from "consola";
import {
    regisUser,
    // loginUser
} from "../utils/auth.js"
import passport from "passport";

// Variables
const router = express.Router();

// POST /register
router.post('/register', (req, res) => {
    consola.info({
        message: `Get 'POST': '/api/auth/register'`,
        badge: true
    })

    regisUser(req.body, res)
})

// POST /login
router.post('/login', (req, res, next) => {
    consola.info({
        message: `Get 'POST': '/api/auth/login'`,
        badge: true
    })

    // loginUser(req.body, res)
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err
        if (!user) {
            res.json({
                message: "User Not Exist",
                success: false
            })
        }
        else {
            req.logIn(user, (err) => {
                if (err) throw err
                res.json({
                    message: "Successfully Authenticated",
                    data: req.user,
                    success: true
                })
                console.log(req.user)
            })
        }
    })(req, res, next)
})

// GET /get-user
router.get('/get-user', (req, res) => {
    consola.info({
        message: `Get 'GET': '/api/auth/get-user'`,
        badge: true
    })

    res.send(req.user)
    console.log(req.user)
})

// Export
export default router