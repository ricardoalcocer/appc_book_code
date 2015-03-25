
// configure the music player widget
$.musicplayer.setSongs([
            {filename:'/songs/file1.mp3',filetitle:'This is song 1'},
            {filename:'/songs/file2.mp3',filetitle:'This is song 2'},
            {filename:'/songs/file3.mp3',filetitle:'This is song 3'}
        ]
);
$.musicplayer.setSongLabel($.songtitle);
//

var thisWin=$.index;
var winTitle='Media Player';

function doopen(evt){
    if (OS_ANDROID){
        thisWin.title = winTitle;
    }else{
        $.windowtitle.text=winTitle;
    }
    $.musicplayer.updateScreen();
}

$.index.open();