var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/count', function(req, res) {
    //let result;
    var collection = db.get('Hflux');
    collection.count({}, function(error, numOfDocs){
        if(error) return callback(err);
        db.close();
        res.json(numOfDocs);    
    }); 
});

/* GET form. */
router.get('/', function(req, res) {
    var request = require('request');
    var arr = [];
    res.render('reading', {"results": arr });
    // request('http://139.59.172.240/api/hflux', function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //        // var parsed = JSON.parse(body);
    //        consol.log(body);
    //         var arr = [];
    //         for(var x in body){
    //             arr.push(body[x]);
    //         }
    //         res.render('reading', {"results": arr });
    //     }
    // }) 
});

/* POST form. */
router.post('/', function(req, res) {
  console.log(req.body.comment);
  res.redirect('index');
});

module.exports = router;
