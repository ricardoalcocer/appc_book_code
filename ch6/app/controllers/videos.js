var args = arguments[0] || {};

function dorefresh(evt){
    loadVideos();
}

function loadVideos(){
    if (Ti.Network.online){
        if ($.videolist.sections[0].items.length===0){
            $.videolist.sections[0].insertItemsAt(0,[{
                template: 'loadingtemplate',
                loading:{text:L('refreshing')}
            }])

            require('videomod').refreshList($.videolist);
        }
    }else{
        alert(L('offline_error'));
    }
}

function doclick(evt){
    var section = $.videolist.sections[evt.sectionIndex];
    var item = section.getItemAt(evt.itemIndex);

    openApp({
        appUrl: item.properties.url,
        webUrl: item.properties.url
    });
}

function openApp(args){
    if (OS_ANDROID){
        Ti.Platform.openURL(args.webUrl);
    }else{
        if(Titanium.Platform.canOpenURL(args.appUrl)){
            Ti.Platform.openURL(args.appUrl);
        } else {
            Ti.Platform.openURL(args.webUrl);
        }
    }
};

loadVideos();