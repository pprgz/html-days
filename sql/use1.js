//test是一个测试文件 不要在项目中使用  



const db = require('./db.js')


const use1Schema = new db.mongoose.Schema({
    // "userId": { type: String },
    "password": { type: Number },
    "userName": { type: String }
})


module.exports = db.mongoose.model("use1", use1Schema)