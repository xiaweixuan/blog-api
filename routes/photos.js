var express = require('express');
var router = express.Router();
var PhotosList=require('../modules/api/photo')


var p= new PhotosList()

router.get('/', function (req, res, next) {
    res.end('photos api:"/all" is all artcile;  ')
})
router.get('/all', function (req, res, next) {
    p.getAll((err, r) => {
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

module.exports = router;
