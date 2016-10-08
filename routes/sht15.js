var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('Sht15');
    collection.find({}, function(err, sht15){
        if (err) throw err;
      	res.json(sht15);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Sht15');
    collection.insert({
        title: req.body.title,
        ok:req.body.ok,
	message:req.body.message,
	sensor: req.body.sensor,
	ip: req.body.ip,
	createdAt: req.body.createdAt,
	id: req.body.id,
	temp: req.body.temp,
	rh: req.body.rh,
	dew: req.body.dew
    }, function(err, sht15){
        if (err) throw err;

        res.json(sht15);
    });
});

module.exports = router;
