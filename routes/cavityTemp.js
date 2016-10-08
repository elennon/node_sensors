var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('CavityTemp');
    collection.find({}, function(err, cavityTemp){
        if (err) throw err;
      	res.json(cavityTemp);
    });
});

router.post('/', function(req, res){
    var collection = db.get('CavityTemp');
    collection.insert({
        title: req.body.title,
        ok:req.body.ok,
	message:req.body.message,
	sensor: req.body.sensor,
	ip: req.body.ip,
	createdAt: req.body.createdAt,
	id: req.body.id,
	val: req.body.val
    }, function(err, cavityTemp){
        if (err) throw err;

        res.json(cavityTemp);
    });
});

module.exports = router;
