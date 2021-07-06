const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');

//connection URL
const url = 'mongodb://localhost:27017';

//Database name
const dbName = 'fruitsDB';

//create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

//use connect method to connect to the server
client.connect(function (err) {
      assert.equal(null, err);
      console.log("connected successfully to the server");
      const db = client.db(dbName);
      // insertDocuments(db, function () {
      //       client.close();
      // });
      findDocuments(db, function () {
            client.close();
      });


});
const insertDocuments = function (db, callback) {
      //get the document collection
      const collection = db.collection('fruits');
      // insert some document
      collection.insertMany([
            { name: "Apple", score: 8, review: "great fruit" },
            { name: "Mango", score: 6, review: "Awesome fruit" },
            { name: "banana", score: 9, review: "great stuff" },
      ], function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("inserted 3 document into the collection");
            callback(result);
      }
      );
};
const findDocuments = function (db, callback) {
      //get the documents collection
      const collection = db.collection('fruits');
      //find some documents
      collection.find({}).toArray(function (err, fruits) {
            assert.equal(err, null);
            console.log('found the following records');
            console.log(fruits);
            callback(fruits);
      });
}