export function setLocale(locale) {
  console.log( this.$i18n.locale);
  this.$i18n.locale = locale;
  localStorage.setItem('language', locale);
}