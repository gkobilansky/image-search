var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var db;
var url = 'mongodb://localhost:27017/mydatabase';
var searchResults;
var giphy = require('giphy-api')();


//Just a place to land
app.get('/', function(req, res) {
    res.send('Hello World!');
});

//See the latest search result, pulled fresh from the db
app.get('/api/latest/gifsearch', function(req, res) {
        db.collection('searches').find().toArray(function(err, results) {
            if (err) throw err;
             res.send(results);
        });
});

//New search
app.get('/api/gifsearch/:search', function(req, res, next) {
    var search = req.params.search,
        offset = req.query.offset;

    //store search results and times in DB
    db.collection('searches').insert({"term":search,"when": new Date()});    
        
    //Use Giphy API to search, offset and return a litmit of ten gifs
    giphy.search({
        q: search,
        offset: offset,
        limit: 10
    }, function(err, res) {
    // res contains gif data
        if (err) return res(err);
        searchResults = res;
        console.log(offset, typeof searchResults);
        next(); 
    });
    // abstract search results to something simpler
    }, function (req, res) {    
        var abstractSearchResults = searchResults.data;
        var userResults = [];
        for (var i = 0; i < abstractSearchResults.length; i++) {
           var obj = {
               "slug": abstractSearchResults[i].slug,
               "url": abstractSearchResults[i].url,
               "source": abstractSearchResults[i].source,
               "rating": abstractSearchResults[i].rating,
            };
        userResults.push(obj);
        }
          res.send(userResults);
    });

MongoClient.connect(url, function(err, database) {
      if (err) throw err;
      db = database;    
      app.listen(8080, function () {
        console.log('Gif Search API listening on port 8080!');
      });
});

