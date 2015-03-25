Alloy.Globals.tabGroup=$.index;
Alloy.Globals.currentTab=0;

$.index.addEventListener('open',function(evt){
  if (OS_ANDROID){
    var activity=evt.source.getActivity();
    var actionbar=activity.actionBar;
    actionbar.title=L('app_title');

    activity.onCreateOptionsMenu = function(e) {
      var item, menu;
      menu = e.menu;
      menu.clear();

      switch(Alloy.Globals.currentTab){
        case 2:
          item = e.menu.add({
            title       : L('refresh'),
            showAsAction  : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            icon      : '/images/refresh.png'
          });

          item.addEventListener("click", function(e) {
            if (Ti.Network.online){
              if ($.conversationTab.tweetlist.sections[0].items.length===0){
                $.conversationTab.tweetlist.sections[0].insertItemsAt(0,[{
                  template: 'loadingtemplate',
                  loading:{text:L('refreshing')}
                }])
                require('conversationmod').refreshList($.conversationTab.tweetlist);
              }
            }else{
              alert(L('offline_error'));
            }
          });

          break;
        case 3:
          item = e.menu.add({
            title       : L('refresh'),
            showAsAction  : Ti.Android.SHOW_AS_ACTION_ALWAYS,
            icon      : '/images/refresh.png'
          });

          item.addEventListener("click", function(e) {
            if (Ti.Network.online){
              if ($.videosTab.videolist.sections[0].items.length===0){
                $.videosTab.videolist.sections[0].insertItemsAt(0,[{
                  template: 'loadingtemplate',
                  loading:{text:L('refreshing')}
                }])
                require('videomod').refreshList($.videosTab.videolist);
              }
            }else{
              alert(L('offline_error'));
            }
          });

          break;
      }
    }
    Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
      if (typeof evt.index !== "undefined"){
        activity.invalidateOptionsMenu();
        Alloy.Globals.currentTab=evt.index;
      }
    });
  }
})

$.index.open();
