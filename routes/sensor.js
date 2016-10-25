var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/Measurements');

router.get('/', function(req, res) {
    var collection = db.get('Sensor');
    collection.find({}, function(err, sensor){
        if (err) throw err;
      	res.json(sensor);
    });
});

router.post('/', function(req, res){
    var collection = db.get('Sensor');
    collection.insert({
        id: req.body.Id,
        name: req.body.Name,
        description: req.body.Description
    }, function(err, sensor){
        if (err) throw err;
        res.json(sensor);
    });
});

module.exports = router;
