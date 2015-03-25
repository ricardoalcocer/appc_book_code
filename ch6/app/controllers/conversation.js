var args = arguments[0] || {};

function dorefresh(evt){
    loadTweets();
}

function loadTweets(){
    if (Ti.Network.online){
        if ($.tweetlist.sections[0].items.length===0){
            $.tweetlist.sections[0].insertItemsAt(0,[{
                template: 'loadingtemplate',
                loading:{text:L('refreshing')}
            }])
            require('conversationmod').refreshList($.tweetlist);
        }
    }else{
        alert(L('offline_error'));
    }
}

function doclick(evt){
  var section = $.tweetlist.sections[evt.sectionIndex];
  var item = section.getItemAt(evt.itemIndex);

  openApp({
    appUrl:'twitter://status?id=' + item.properties.id,
    webUrl: item.properties.url
  });
}

function openApp(obj){
  if (OS_ANDROID){
        Ti.Platform.openURL(obj.webUrl);
    }else{
        if(Titanium.Platform.canOpenURL(obj.appUrl)){
            Ti.Platform.openURL(obj.appUrl);
        } else {
            Ti.Platform.openURL(obj.webUrl);
        }
    }
};

loadTweets();