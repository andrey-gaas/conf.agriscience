export default function ({ app, redirect }) {
  if(app.store.getters.getReportInd == undefined) return redirect('/personArea')
  if(app.store.getters.getReportInd == -1) return redirect('/personArea')
}
