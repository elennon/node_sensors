var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/Measurements';	

router.get('/count', function(req, res) {
    MongoClient.connect(url, function (err, db) {	
        var collection = db.collection('Hflux');
        collection.count({}, function(error, numOfDocs){
            if(error) return callback(err);
            db.close();
            res.json(numOfDocs);    
        }); 
    });
});

/* GET form. */
router.get('/', function(req, res) {
    var request = require('request');
    var arr = [];
    MongoClient.connect(url, function (err, db) {	
        var collection = db.collection('Hflux');
        collection('Hflux').find().limit(1).toArray(function(err, results_from_mongo) {
        	for ( index in results_from_mongo){
				var doc = results_from_mongo[index];
				var temp = doc['val'];
				if(temp !== 'collstick'){
					temps.push(temp);
				}
		    }
            var doc = results_from_mongo[0];
	    	console.log(temps);
        	res.render('index', {"time": results_from_mongo[index] });
		});  
    });  
});

/* POST form. */
router.post('/', function(req, res) {
  console.log(req.body.comment);
  res.redirect('index');
});

module.exports = router;
