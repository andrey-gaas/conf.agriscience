export default function ({ app, redirect }) {
  console.log('hello');
  if(app.store.getters.getReportInd == undefined) return redirect('/personArea')
  if(app.store.getters.getReportInd == -1) return redirect('/personArea')
}
