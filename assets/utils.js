export function setLocale(locale) {
  console.log( this.$i18n.locale);
  this.$i18n.locale = locale;
  localStorage.setItem('language', locale);
}

export function localeRout(path){
  if(this.$i18n.locale == 'ru') return path
  return ('/' + this.$i18n.locale + path)
}

export function transliterate() {
  let rus = "щ     ш  ч  ц  ю  я  ё  ж кс  ъ  ы е  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
      eng = "shch sh ch cz yu ya yo zh  x  `` y e  a b v g d e z i j k l m n o p r s t u f h `".split(/ +/g)
  ;
  return function(text, engToRus) {
      var x;
      for(x = 0; x < rus.length; x++) {
          if(x == 'ъ') continue
          text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
          text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
      }
      return text;
  }
}
