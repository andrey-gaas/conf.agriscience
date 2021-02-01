const { Router } = require('express');
const axios = require('axios');
const router = Router();

function getArrayFields(fields) {
  const array = [];

  for(key in fields) {
    array.push({ 'text': fields[key] })
  }

  return array;
}

router.post('/', (req, res) => {
  const { language, fields } = req.body;
  
  axios({
    baseURL: 'https://api.cognitive.microsofttranslator.com',
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': '80e01ed4d2a44c39a546580ce3f16720',
      'Content-type': 'application/json',
    },
    params: {
      'api-version': '3.0',
      'from': language.from,
      'to': [language.to],
    },
    data: getArrayFields(fields),
    responseType: 'json',
  })
    .then(response => {
      res.send(response.data.map(field => field.translations[0].text));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Server Error');
    });
});

module.exports = router;