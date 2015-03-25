var args = arguments[0] || {};
var talkDetails=args.talkDetails;

$.talktitle.text    = talkDetails.title;
$.time.text       = talkDetails.time;
$.room.text       = talkDetails.room;
$.description.text    = talkDetails.description;

if (talkDetails.speaker !== '' && talkDetails.speaker !== null){
  $.speaker.text = String.format(L('about'),talkDetails.speaker);
}else{
  $.speaker.text = '';
}

if (talkDetails.speakerbio !== '' && talkDetails.speakerbio !== null){
  $.speakerbio.text = talkDetails.speakerbio;
}else{
  $.speakerbio.text = '';
}

function closewindow(evt){
  $.talkdetails.close();
}