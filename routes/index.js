var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/Measurements';	

/* GET home page. */
router.get('/', function(req, res, next) {
    var results_from_mongo = [];
    var temps = [];
    var afrr = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];

    MongoClient.connect(url, function (err, db) {	
        var str = db.collection('Hflux').find().limit(5).toArray(function(err, results_from_mongo) {
        	for ( index in results_from_mongo){
				var doc = results_from_mongo[index];
				var temp = doc['val'];
				if(temp !== 'collstick'){
					temps.push(temp);
				}
		    }
	    	console.log(temps);
        	res.render('index', {"results": afrr });
		});  
    });  
});

router.post("/download",function(req,res){
	var fromdate=req.body.Fromdate;
	var todate = req.body.Todate
	var Senor = req.body.Senor
	var Format = req.body.Format 
	var request = require('request');
    request('http://139.59.172.240/api/hflux', function (error, response, body) {
        if (!error && response.statusCode == 200) {
			var noqs = body.replace(/\"/g, "")
			jsonfile.writeFile("tester.json", noqs, function (err) {
				console.error(err);
				res.download("tester.json");
			})			
        }
    }) 
});


module.exports = router;
