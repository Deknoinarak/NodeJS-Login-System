// Import Modules
import mongoose from 'mongoose'

// String Required
const strRequire = {
    type: String,
    required: true
}

// Schema
const userModel = mongoose.Schema({
    user_id: strRequire,
    email: strRequire,
    firstName: strRequire,
    lastName: strRequire,
    username: strRequire,
    password: strRequire
})

// Model
const user = mongoose.model('users', userModel)

// Export model
export default user