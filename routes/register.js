var express = require('express')
var router = express.Router();
const use1 = require("../sql/use1");
router.get("/", function(req, res, next) {
    console.log("进来了");
    res.render("register");

});
router.post("/in", function(req, res, next) {
    console.log("进入 in 处理");
    let obj = req.body;
    console.log(obj);
    console.log(obj.userName);
    console.log(obj.password);
    // use1.insertMany(obj, (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(data);
    //     if (data) {
    //         res.redirect('/login');
    //     } else {
    //         res.redirect('/register');
    //     }

    // })
    use1.findOne({ userName: obj.userName }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            res.redirect("/register");
        } else {
            use1.insertMany(obj, (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                if (data) {
                    res.redirect('/login');
                } else {
                    res.redirect("/register");
                }
            })
        }
    })
});
module.exports = router;