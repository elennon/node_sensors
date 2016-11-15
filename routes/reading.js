var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/Measurements';	
var http = require('http');
var request = require('request');

var options = {
  host: 'http://139.59.172.240',
  path: '/api/hflux'
};

router.get('/getCount', function(req, res) {
    var request = require('request');
    request('http://139.59.172.240/api/hflux', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Show the HTML for the Google homepage.
        }
    })
    //var ft = getHflux();
    res.send(600);
});

function getHflux() {
        return http.get({
            host: 'http://139.59.172.240',
            path: '/api/hflux'
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {
                // Data reception is done, do whatever with it!
                return JSON.parse(body);                
            });
        });
    }

/* GET form. */
router.get('/', function(req, res) {
  
    var results_from_mongo = [];
    var temps = [];
    var afrr = [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8];

    MongoClient.connect(url, function (err, db) {
        var str = db.collection('Bmp180').find({}, {'temp' : true}).toArray(function(err, results_from_mongo) {
            for ( index in results_from_mongo){
                var doc = results_from_mongo[index];				
                var temp = doc['temp'];			
                temps.push(temp);
            }
            console.log(afrr);
            res.render('reading', {"results": afrr });
        });  
    });  
});

/* POST form. */
router.post('/', function(req, res) {
  console.log(req.body.comment);
  res.redirect('index');
});

module.exports = router;
