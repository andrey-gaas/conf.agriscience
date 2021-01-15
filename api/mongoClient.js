const { MongoClient } = require('mongodb');

module.exports = new MongoClient(
  'mongodb://svc:hf^gjhd7jas@mongodb:27017/bibcongress',
  {useNewUrlParser: true, useUnifiedTopology: true }
);


