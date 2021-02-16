const { Router } = require('express');
const Mongo = require('../db/Mongo');
const router = Router();

router.get('/', (req, res) => {
  let filter = req.query
  for(let key in filter){

    if(filter[key] === 'false'){
      filter[key] = false
    }

    if(filter[key] === 'true'){
      filter[key] = true
    }
  }
  console.log(filter);

  Mongo.database
    .db('bibcongress')
    .collection('users')
    .find(filter)
    .toArray((err, users) => {
      res.send(users);
    });
});


module.exports = router;