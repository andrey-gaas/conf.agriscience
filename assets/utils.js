export function setLocale(locale) {
  console.log( this.$i18n.locale);
  this.$i18n.locale = locale;
  localStorage.setItem('language', locale);
}

export function localeRout(path){
  if(this.$i18n.locale == 'ru') return path
  return ('/' + this.$i18n.locale + path)
}