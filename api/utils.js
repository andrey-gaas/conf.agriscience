const Mongo = require('./db/Mongo');

exports.checkExtension = function(extension, extensionsList) {
  for (let i = 0; i < extensionsList.length; i++) {
    if (extension === extensionsList[i]) return true;
  }
  return false;
};

exports.setLog = function(id, actionTitle) {
  const action = {
    id,
    action: actionTitle,
    timestamp: Date.now(),
  };
  Mongo.database
    .db('bibcongress')
    .collection('actions')
    .insertOne(action, error => {
      if (error) {
        console.log(`Ошибка сохранения действия: ${actionTitle}`);
        console.log(error);
      }
    });
};
