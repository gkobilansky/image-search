var express = require('express');
var app = express();
//var Promise = require('promise');
var giphy = require('giphy-api')();


app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/gifsearch/*', function(req, res) {
    
    var searchResults;
    
    giphy.search('pokemon', function(err, res) {
    // Res contains gif data!
    if (err) return res(err);
    
    searchResults = res;
    
    console.log(res);
    });
    
    res.send(searchResults);
});

app.listen(8080, function() {
    console.log('Hello world listening on port 8080');
});