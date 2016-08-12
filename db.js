var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null
};

exports.connect = function(url) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    state.db = db;
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function() {
  if (state.db) {
    state.db.close(function(err, result) {
      if (err) throw err;
      state.db = null;
      state.mode = null;
    });
  };
};
