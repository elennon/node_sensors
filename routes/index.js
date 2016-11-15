var express = require('express');
var router = express.Router();
// var path = require('path');
// var mime = require('mime');
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
	
	// var file = '~/tester.txt;

	// var filename = path.basename(file);
	// var mimetype = mime.lookup(file);

	// res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	// res.setHeader('Content-type', mimetype);

	// var filestream = fs.createReadStream(file);
	// filestream.pipe(res);
	res.download("tester.txt");
})


module.exports = router;
