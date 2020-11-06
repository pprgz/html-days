const db = require('./db.js')
const userSchema = new db.mongoose.Schema({
    // "userId": { type: String },
    "password": { type: Number || String },
    "userName": { type: String }
})

module.exports = db.mongoose.model("user", userSchema)