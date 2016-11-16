var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/Measurements';	

/* GET home page. */
router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
		var collection = db.collection('Hflux');
		var cursor     = collection.find().sort({ "createdAt" : -1 }).limit(1);

		cursor.toArray(function(err, results) {
			if (err) throw err;
			console.log('%j', results);
			db.close();
			var a = new Date(results[0].createdAt * 1000);
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
			res.render('index', {"time": "time" });
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
