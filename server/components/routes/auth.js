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

    passport.authenticate("local", (err, user, info) => {
        console.log("AUTHENTICATION")
        if (err) throw err
        if (!user) return res.send("User does not exist")
        else {
            console.log(user)
            req.logIn(user, err => {
                if (err) throw err
                res.send(req.user)
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