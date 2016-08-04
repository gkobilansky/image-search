var express = require('express');
var app = express();
//var Promise = require('promise');
var giphy = require('giphy-api')();


app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/latest/gifsearch', function(req, res) {
    res.send('Latest searches');
});

app.get('/api/gifsearch/:search', function(req, res) {
    
    var search = req.params.search,
        offset = req.query.offset,
        searchResults;
        
    
    giphy.search({
        q: search,
        offset: offset
    }, function(err, res) {
    // Res contains gif data!
    if (err) return res(err);
    searchResults = res;
    console.log(offset, searchResults);
    });
    
    res.send('search complete');
});

app.listen(8080, function() {
    console.log('Hello world listening on port 8080');
});