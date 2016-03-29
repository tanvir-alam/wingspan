var express = require('express');
var sabreDevStudio = require('sabre-dev-studio');
var sabreConfig = require('./config/sabre_config');
var sabre = new sabreDevStudio(sabreConfig);
var express = require('express');
var app = express();
var options = {};

function sabreCall(q, res) {
  sabre.get(q, options, function(err, data) {
    response(res, err, data);
  });
}

function response(res, err, data) {
  if (err) {
    res.status(200).send({
      'status': false,
      'message': 'Error',
      'info': err
    });
  } else {
    res.status(200).send({
      'status': true,
      'message': 'Success',
      'info': data
    });
  }
}

module.exports = function(app) {
    
    app.post('/v2/auth/token', function(req, res) {
        var opt = {
            'environment': 'https://api.test.sabre.com',
            'headers': {
                'Authorization': 'Basic{VmpFNlpXNDVjVFJoWjJGdGNHNXVhV2hrZWpwRVJWWkRSVTVVUlZJNlJWaFU6U0RsMGFuWTVXVkk9}',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'grant_type': 'client_credentials'
        };
        sabre.post('/v2/auth/token', opt, function(err, data) {
            response(res, err, data);
        })
    });
    
    app.use('/', express.static(__dirname + '/web'));
    
    app.get('/v1/lists/supported/shop/flights/origins-destinations', function(req, res) {
        sabreCall('/v1/lists/supported/shop/flights/origins-destinations', res);
    });
    
    app.get('/v1/shop/flights', function(req, res) {
       sabreCall('v1/shop/flights?origin=JFK' 
       + '&destination=LAX'
       + '&departuredate=2016-05-05'
       + '&returndate=2016-05-20'
       + '&pointofsalecountry=US'
       + '&passengercount=1', res); 
    });
    
    app.get('/api/v1/cities', function(req,res) {
        sabreCall('/v1/lists/supported/cities', res);
    });

    app.get('/api/v1/places', function(req,res) {
        sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
        '&departuredate=' + req.query.departuredate +
        '&returndate=' + req.query.returndate +
        '&maxfare=' + req.query.maxfare, res);
    });
};