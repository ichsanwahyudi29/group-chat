//livechat
function getChatTime(){
  var date = new Date
  var jam = date.getHours()
  var menit = date.getMinutes()
  var result = ("0" + jam).slice(-2)+"."+("0" + menit).slice(-2)
  return result
}