var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('Bmp180');
    collection.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Bmp180');
    collection.insert({
        title: req.body.title,
        ok:req.body.ok,
	message:req.body.message,
	sensor: req.body.sensor,
	ip: req.body.ip,
	createdAt: req.body.createdAt,
	id: req.body.id,
	pressure: req.body.pressure,
	altitude: req.body.altitude,
	temp: req.body.temp
    }, function(err, bmp180){
        if (err) throw err;

        res.json(bmp180);
    });
});

module.exports = router;
