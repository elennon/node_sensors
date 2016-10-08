var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('Sdp610');
    collection.find({}, function(err, sdp610){
        if (err) throw err;
      	res.json(sdp610);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Sdp610');
    collection.insert({
        title: req.body.title,
        ok:req.body.ok,
	message:req.body.message,
	sensor: req.body.sensor,
	ip: req.body.ip,
	createdAt: req.body.createdAt,
	id: req.body.id,
	val: req.body.val
    }, function(err, sdp610){
        if (err) throw err;

        res.json(sdp610);
    });
});

module.exports = router;
