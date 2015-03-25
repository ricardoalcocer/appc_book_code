var args = arguments[0] || {};
var dayTag="day1";

require('schedulemod').loadTable($.day1table,dayTag);

function tableclick(evt){
  var talkDetails=require('schedulemod').getTalkDetails(dayTag,evt.row.rowId);
  require('schedulemod').tableClick(evt,talkDetails,dayTag);
}

function tablescroll(evt){
  evt.cancelBubble=true;
}
