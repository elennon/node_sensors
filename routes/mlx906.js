var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('Mlx906');
    collection.find({}, function(err, mlx906){
        if (err) throw err;
      	res.json(mlx906);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Mlx906');
    collection.insert({
        title: req.body.title,
        ok:req.body.ok,
	message:req.body.message,
	sensor: req.body.sensor,
	ip: req.body.ip,
	createdAt: req.body.createdAt,
	id: req.body.id,
	ambiTemp: req.body.ambiTemp,
	skyTemp: req.body.skyTemp
    }, function(err, mlx906){
        if (err) throw err;

        res.json(mlx906);
    });
});

module.exports = router;
