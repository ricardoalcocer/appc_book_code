function loadSchedule(day) {
  if (!Ti.App.Properties.getBool(day+'-loaded', false)){
    var filename = '/data/' + day + '.json';
    var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
    var contents = JSON.parse(f.read());
    contents.forEach(function(thisDay,index) {
       var model = Alloy.createModel(day, {
           "time"         :   thisDay.time,
           "room"         :   thisDay.room,
           "title"        :   thisDay.title,
           "speaker"      :   thisDay.speaker,
           "description"  :   thisDay.description,
           "speakerbio"   :   thisDay.speakerbio,
           "myindex"      : index
       });

      model.save();
    });
    contents = null;
    f = null;
    Ti.App.Properties.setBool(day+'-loaded', true);
  }
}

function getTalkDetails(day,row){
  var schedule = Alloy.Collections.instance(day);
  schedule.fetch({query:'SELECT * FROM ' + day + ' WHERE myindex = ' + row});
  return schedule.toJSON()[0];
}

function loadTable(tableObject,dayTag){
  var tableData=[];
  var day = Alloy.Collections.instance(dayTag);
  day.fetch();
  var dayJSON=day.toJSON();
  dayJSON.forEach(function(item, index){
    item.index=index;
    var row=Alloy.createController('dayrow',item).getView();
    tableData.push(row);
  })
  tableObject.setData(tableData);
}

function tableClick(evt,talkDetails,dayTag){
  var w=Alloy.createController('talkdetails',{
    rowId:evt.row.rowId,
    talkDetails:talkDetails,
    day: dayTag
  }).getView();

  w.addEventListener('open',function(evt){
    if (OS_ANDROID){
      var activity=evt.source.getActivity();
      var actionbar=activity.actionBar;
      actionbar.title=talkDetails.title;
      if (talkDetails.speaker !== '') {
        actionbar.subtitle=String.format(L('presented_by'), talkDetails.speaker);
      }
      actionbar.displayHomeAsUp=true;
      actionbar.onHomeIconItemSelected=function(){
        evt.source.close();
      }
    }
  })
  Alloy.Globals.tabGroup.activeTab.open(w,{animated:true});
}

exports.getTalkDetails = getTalkDetails;
exports.loadSchedule = loadSchedule;
exports.loadTable = loadTable;
exports.tableClick = tableClick;