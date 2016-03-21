var SabreDevStudio = require('sabre-dev-studio');
var sabre_dev_studio = new SabreDevStudio({
  client_id:     'V1:en9q4agampnnihdz:DEVCENTER:EXT',
  client_secret: 'H9tjv9YR',
  uri:           'https://api.test.sabre.com'
});
var options = {};
var callback = function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(JSON.parse(data)));
  }
};
// sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
sabre_dev_studio.get('/v1/shop/flights/fares?origin=NYC&departuredate=2016-05-25&returndate=2016-05-30&maxfare=200', options, callback);