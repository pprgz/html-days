var express = require("express");
var router = express.Router();
const use1 = require("../sql/use1");


router.get("/", function(req, res, next) {
    console.log('进入了');
    res.render('login');
})

router.post("/in", function(req, res, next) {
    console.log("处理数据");
    let obj = req.body;
    console.log(obj);
    console.log(obj.userName);
    console.log(obj.password);

    use1.findOne(obj, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            req.session.islogin = 'ok';
            console.log('我在login 路由  /in里面');
            res.redirect('/user')
        } else {
            res.redirect("/register");
        }
    })
})
module.exports = router;