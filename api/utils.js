exports.checkExtension = function(extension, extensionsList) {
  for (let i = 0; i < extensionsList.length; i++) {
    if (extension === extensionsList[i]) return true;
  }
  return false;
}