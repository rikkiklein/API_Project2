var express     = require('express');
var cors        = require('cors');
var bodyParser  = require('body-parser');
var mongodb     = require('mongodb');
var request     = require('request');
var app         = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
var MongoClient = mongodb.MongoClient;
var mongoUrl = 'mongodb://localhost:27017/weather';

app.get('/', function(request, response){
  response.json({"description":"Welcome to this AWESOME WEATHER API!"});
});


app.get('/places', function(req, response) {
  response.json({ "description" : "WEATHER ENDPOINT"});
  console.log("places");
});

app.get('/images', function(req, response) {
  response.json({ "description" : "IMAGES ENDPOINT"});
  console.log("images");
});



/* places search weather*/
app.post('/places/search', function(req, res) {
  var baseUrl = "http://api.openweathermap.org/data/2.5/weather";
  var tsQueryString = '?q=';
  var apiKeyQueryString = "&appid=";
  var WEATHER_KEY=process.env.WEATHER_KEY;
  console.log(WEATHER_KEY, "weather");
  var queryString = req.body.queryString;
  var metric = "&units=metric";

  var fullQuery = baseUrl + tsQueryString + queryString + metric + apiKeyQueryString + WEATHER_KEY;

  console.log("fullQuery:", fullQuery); // prints to terminal

  request({
    url: fullQuery,
    method: 'GET',
    callback: function(error, response, body) {
      res.send(body);
    }
  })

});

//image search
app.post('/images/search', function(req, res){
  var baseURL = "https://pixabay.com/api/"
  console.log("IN POST IMAGES");
  console.log("BURL", baseURL);
  var key = "?key=";
  var PIX_KEY=process.env.PIX_KEY;
  console.log(PIX_KEY, "pixkey");
  var qString = "&q=";
  var queryString = req.body.queryString;
  console.log(queryString, "QS");
  var image_type = "&image_type=photo&pretty=true";
  var cat = "&category=places";

  var fullQuery = baseURL + key + PIX_KEY + qString + queryString + image_type + cat;
  console.log("FQ", fullQuery);
  request({
    url: fullQuery,
    method: 'GET',
    callback: function(error, response, body){
        res.send(body);
    }
  })
});



/* tell our app where to listen */
app.listen(3000, function(){
  console.log('listen to events on a "port".')
});
