export function setLocale(locale) {
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

export function getCookie(){
  let cookieArr1 = document.cookie.split(/;/)
    let cookieArr2 = cookieArr1.map(el => {      
      return el.replace(/=/, ';')
    })
    let cookieArr3 = cookieArr2.map( el => {
      
      return el.split(/;/)
    })
    let cookieObj = {}
    for( let el of cookieArr3){
      let key = el[0].replace(/\s/g, '')
      let val = el[1].replace(/\s/g, '')
      cookieObj[key] = val
    }
    return cookieObj
}
export function deletCookieToken(){
  this.$cookies.remove('token')
  this.$cookies.remove('token', {path: '/en'})
  this.$cookies.remove('token', {path: '/personArea'})
  this.$cookies.remove('token', {path: '/personarea'})
  this.$cookies.remove('token', {path: '/en/personArea'})
  this.$cookies.remove('token', {path: '/en/personarea'})
}