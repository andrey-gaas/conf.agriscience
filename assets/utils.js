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
  let rus = "щ     ш  ч  ц  ю  я  ё  ж кс  ъ  ы е  а б в г д е з и й к л м н о п р с т у ф ь".split(/ +/g),
      eng = "shch sh ch cz yu ya yo zh  x  `` y e  a b v g d e z i j k l m n o p r s t u f `".split(/ +/g)
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

export function yTransliterate(word, loc){
  let key = "trnsl.1.1.20171107T104812Z.1ee6df05ac9998cb.05df77ba4c4714521cd9b7f2a72d8c097bddc418",
      lang = loc == 'ru' ? 'ru-en' : 'en-ru';

  async function getJSONAsync(url) {
      let response = await fetch(url);
      if (response.ok) {
          let json = await response.json();
          return json;
      }
      else throw new Error(`${response.status}: ${response.statusText}`);
  }

  async function translateWords(words) {
      words = encodeURIComponent(words);
      console.log(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&key=${key}&text=${words}`)
      return (await getJSONAsync(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=${lang}&key=${key}&text=${words}`))
          .text.join(" ");
          
  }

  return async function main() {
    let result = await translateWords(word);
    return result
  }; 
}
  
  