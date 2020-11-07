var express = require("express");
var router = express.Router();
var uuid = require("node-uuid");
const use12 = require("../sql/use1");
// GET home Page
router.get("/", function(req, res, next) {
    //先请求数据，将数据渲染到页面
    use12.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('user', {
                index: 2,
                data: data
            })
            // res.render("user", {
            //     index: 2,
            //     data: [{
            //         userName: "小樱",
            //         password: "搜索",
            //     }]
            // });
    });
    router.get("/add", function(req, res, next) {
        res.render("userAdd", {
            index: 2,
        });
    });
    router.post("/addAction", function(req, res, next) {
        let obj = req.body;
        obj.password = Number(obj.password);
        use12.insertMany(obj, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.redirect("/user");
        })
    });
    //删除操作
    router.get("/delete", function(req, res, next) {
        const id = req.query.id
        use12.deleteOne({ '_id': req.query._id }, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.redirect("/user");
        })

    });
    //修改操作
    router.get("/update", function(req, res, next) {
        //get来的数据在req.query.id
        console.log(req.query)
        const _id = req.query._id;
        console.log("_id", _id);
        use12.findById({ "_id": _id }, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log('我现在到了/update修改数据路由')
            console.log(data)
            console.log(data._id)
            res.render('userUpdate', {
                index: 1,
                data: data
            })
        })


    });
    //修改操作-更新操作
    router.post("/updateAction", function(req, res, next) {
        const obj = req.body;
        obj.password = Number(obj.password);
        use12.findByIdAndUpdate(obj._id, obj, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.redirect('/user');
        })
    });

    // 用户搜索
    router.get("/search", (req, res, next) => {
        const obj = req.query;
        let reg = new RegExp(obj.search);
        use12.find({ userName: reg }, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
            res.render("user", {
                index: 2,
                data,
            });
        })
    });


})
module.exports = router