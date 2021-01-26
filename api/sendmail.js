const mailer = require('nodemailer');

const transporter = mailer.createTransport({
  host: 'webproxy.gpntbsib.ru',
  port: 25,
});

module.exports = function(data) {
  return new Promise((resolve, reject) => {
    const mailConfig = {
      from: { name: 'Оргкомитет Библиографического Конгресса', address: 'info@bibcongress.ru' },
      to: data.email,
      subject: data.subject,
      text: data.text,
      html: `<p>${data.text}</p>`,
    };

    transporter.sendMail(mailConfig, function(err, info) {
      if(err) reject(err);
      if(info) {
        if(info.rejected.length > 0) {
          reject('bad email');
        } else {
          resolve(info.messageId);
        }
      }
    });
  });
};
