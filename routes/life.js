var express = require('express');
var router = express.Router();
var LifeArticle = require('../modules/api/lifeArticle');
var p = new LifeArticle()




router.get('/', function (req, res, next) {
    res.end('life article api:"/all" is all artcile;  ')
})
router.get('/all', function (req, res, next) {
    // debugger
    // res.header("Access-Control-Allow-Origin", "*")

    p.getIntroduce((err, r) => {
        if (err) {
            res.json({
                "code": 500,
                result: []
           })
        } else {
            var result = {
                result: r,
                "code": 200
          }
            res.json(result)
        }

    })

});
router.get('/detail',function (req, res, next) {
    var id=req.query.id
    p.getDetail(id,(err, r) => {
        if (err) {
            res.json({
                "code": 500,
                result: []
            })
        } else {
            var result = {
                result: r,
                "code": 200
            }
            res.json(result)
        }
    })
})
module.exports = router;
