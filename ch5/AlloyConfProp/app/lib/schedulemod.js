function loadSchedule(day) {
  if (!Ti.App.Properties.getBool(day+'-loaded', false)){
    var filename = '/data/' + day + '.json';
    var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
    var contents = f.read();
    Ti.App.Properties.setObject(day, JSON.parse(contents));
    Ti.App.Properties.setBool(day+'-loaded', true);
  }
}

function getTalkDetails(day,row){
  return Ti.App.Properties.getObject(day)[row];
}

function loadTable(tableObject,dayTag){
  var tableData=[];
  Ti.App.Properties.getObject(dayTag).forEach(function(item, index){
    item.index=index; // add the index to the object
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

exports.tableClick=tableClick;
exports.getTalkDetails = getTalkDetails;
exports.loadSchedule = loadSchedule;
exports.loadTable = loadTable;