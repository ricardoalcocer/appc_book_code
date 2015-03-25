var args = arguments[0] || {};
var dayTag="day3";

require('schedulemod').loadSchedule(dayTag);
require('schedulemod').loadTable($.day3table,dayTag);

function tableclick(evt){
  var talkDetails=require('schedulemod').getTalkDetails(dayTag,evt.row.rowId);
  require('schedulemod').tableClick(evt,talkDetails,dayTag);
}

function tablescroll(evt){
  evt.cancelBubble=true;
}