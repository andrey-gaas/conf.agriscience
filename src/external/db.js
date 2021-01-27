const { MongoClient } = require('mongodb');

class Mongo {
  static database = null;

  static connect() {
    const mongoClient = new MongoClient(
      'mongodb://svc:hf^gjhd7jas@mongodb:27017/bibcongress',
      {useNewUrlParser: true, useUnifiedTopology: true }
    );

    mongoClient.connect((err, database) => {
      if (err) return console.log('Error connection to database');

      Mongo.database = database;
    });

  }
}

module.exports = Mongo;
