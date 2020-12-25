export function setLocale(locale) {
  this.$i18n.locale = locale;
  localStorage.setItem('language', locale);
}