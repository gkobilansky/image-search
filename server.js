var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;
var url = 'mongodb://localhost:27017/mydatabase';
var searchResults;
var giphy = require('giphy-api')();



app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/api/latest/gifsearch', function(req, res) {
        db.collection('searches').find().toArray(function(err, results) {
            if (err) throw err
             console.log(results)
        });
        
        res.redirect('/');
});

app.get('/api/gifsearch/:search', function(req, res, next) {
    
    var search = req.params.search,
        offset = req.query.offset;
        
    db.collection('searches').insert({"term":search,"when": new Date()});    
        
    giphy.search({
        q: search,
        offset: offset,
        limit: 10
    }, function(err, res) {
      // Res contains gif data!
        if (err) return res(err);
        searchResults = res;
        console.log(offset, typeof searchResults);
        next(); 
    });
    }, function (req, res) {    
         console.log(typeof searchResults);
         res.send(searchResults);
    });

MongoClient.connect(url, function(err, database) {
      if (err) throw err;
      db = database;    
      app.listen(8080, function () {
        console.log('Gif Search API listening on port 8080!');
      });
});

