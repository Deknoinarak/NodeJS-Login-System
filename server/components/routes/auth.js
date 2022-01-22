// Import Modules
import express from "express";
import consola from "consola";
import {
    regisUser
} from "../utils/auth.js"

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

// Export
export default router