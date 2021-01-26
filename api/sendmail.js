const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: 'webproxy.gpntbsib.ru',
  port: 25,
});

module.exports = function(message) {
  console.log(message);
};
