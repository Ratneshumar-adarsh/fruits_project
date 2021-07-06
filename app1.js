// const MongoClient = require("mongodb").MongoClient;
// const assert = require('assert');
const { Logger } = require("mongodb");
const mongoose = require("mongoose");
// //connection URL
// const url = 'mongodb://localhost:27017';

// //Database name
// const dbName = 'fruitsDB';

//create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });



//use connect method to connect to the server
// client.connect(function (err) {
//       assert.equal(null, err);
//       console.log("connected successfully to the server");
//       const db = client.db(dbName);
//       // insertDocuments(db, function () {
//       //       client.close();
//       // });
//       findDocuments(db, function () {
//             client.close();
//       });


// });
mongoose.connect('mongodb://localhost:27017/fruitdb', { useNewUrlParser: true, useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "please check ur data entry,name is not specified"]
      },
      rating: {
            type: Number,
            min: 1,
            max: 10
      },
      review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);
const pineapple = new Fruit({
      name: "pineapple",
      rating: 9,
      review: 'pineapple are  a solid stuff',
});
const graphes = new Fruit({
      name: "graphes",
      rating: 8,
      review: "better"
});

//graphes.save();


const peopleSchema = new mongoose.Schema({
      name: String,
      age: Number,
      favouritefruit: fruitSchema
});
const People = new mongoose.model("People", peopleSchema);

const firstPerson = new People({
      name: "amy",
      age: 25,
      favouritefruit: pineapple
});
//firstPerson.save();


const orange = new Fruit({
      name: "orange", rating: 5, review: "sour"
});
const mango = new Fruit({
      name: "mango", rating: 8, review: "sweet"
});
const banana = new Fruit({
      name: "banana", rating: 6, review: "avg"
});
// Fruit.insertMany([orange, mango, banana], function (err) {
//       if (err) {
//             console.log(err);
//       }
//       else {
//             console.log("successfully saved!");
//       }
// });
// const insertDocuments = function (db, callback) {
//       //get the document collection
//       const collection = db.collection('fruits');
//       // insert some document
//       collection.insertMany([
//             { name: "Apple", score: 8, review: "great fruit" },
//             { name: "Mango", score: 6, review: "Awesome fruit" },
//             { name: "banana", score: 9, review: "great stuff" },
//       ], function (err, result) {
//             assert.equal(err, null);
//             assert.equal(3, result.result.n);
//             assert.equal(3, result.ops.length);
//             console.log("inserted 3 document into the collection");
//             callback(result);
//       }
//       );
// };




// const findDocuments = function (db, callback) {
//       //get the documents collection
//       const collection = db.collection('fruits');
//       //find some documents
//       collection.find({}).toArray(function (err, fruits) {
//             assert.equal(err, null);
//             console.log('found the following records');
//             console.log(fruits);
//             callback(fruits);
//       });
// }

Fruit.find(function (err, fruits) {
      if (err) {
            console.log(err);
      } else {
            // console.log(fruits);
            mongoose.connection.close();
            for (i = 0; i < fruits.length; i++) {
                  console.log(fruits[i].name);
            }
      }
});

// Fruit.updateOne({ _id: "60cd38f42d9ca723c420ef61" }, { name: "Peach" }, function (err) {
//       if (err) {
//             console.log(err);
//       } else {
//             console.log("successfully updated");
//       }
// });

// Fruit.deleteOne({ name: "Peach" }, function (err) {
//       if (err) {
//             console.log(err);
//       }
//       else {
//             console.log("deleted successfully");
//       }
// });
// People.deleteMany({ name: "john" }, function (err) {
//       if (err) {
//             console.log(err);
//       } else {
//             console.log("successfully deleted");
//       }
// });
People.updateMany({ name: "john" }, { favouritefruit: graphes }, function (err) {
      if (err) {
            console.log(err);
      } else {
            console.log("successfully updated");
      }
});