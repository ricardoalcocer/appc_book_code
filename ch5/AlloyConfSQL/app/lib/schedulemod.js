function loadTable(tableObject,dayTag){
  var DBH=require('com.alcoapps.dbhelper');
  var db=new DBH.dbhelper('/scheduledata.sqlite','scheduledata');
  var scheduleData=db.get({
    fields : '*',
    table : dayTag
  });

  var tableData=[];
  scheduleData.forEach(function(item, index){
    item.index=index; // add the index to the object
    var row=Alloy.createController('dayrow',item).getView();
    tableData.push(row);
  })
  tableObject.setData(tableData);
}

function getTalkDetails(day,row){
  var DBH=require('com.alcoapps.dbhelper');
  var db=new DBH.dbhelper('/scheduledata.sqlite','scheduledata');
  var rec=db.exec('SELECT * from ' + day + ' where rowid=' + parseInt(row+1));
  return rec[0];
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
exports.loadTable = loadTable;
exports.tableClick=tableClick;