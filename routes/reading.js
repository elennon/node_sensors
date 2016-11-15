var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://139.59.172.240:27017/Measurements';	

/* GET form. */
router.get('/', function(req, res) {
  
    var results_from_mongo = [];
    var temps = [];
    var afrr = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];

    MongoClient.connect(url, function (err, db) {
        var str = db.collection('Bmp180').find({}, {'temp' : true}).toArray(function(err, results_from_mongo) {
            for ( index in results_from_mongo){
                var doc = results_from_mongo[index];				
                var temp = doc['temp'];			
                temps.push(temp);
            }
            console.log(afrr);
            res.render('reading', {"results": afrr });
        });  
    });  
});

router.get('/getCount', function(req, res) {
    var resu;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var collection = db.collection('Bmp180');
        collection.find({}, function(err, cursor){
            resu = cursor.toArray(function(err, items) {
                 console.log(items.length);
                 res.send(items.length);
             });
        });
   });      
   res.json(resu)
});

/* POST form. */
router.post('/', function(req, res) {
  console.log(req.body.comment);
  res.redirect('index');
});

module.exports = router;
