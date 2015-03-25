var songs=[
    {filename:'/songs/file1.mp3',filetitle:'This is song 1'},
    {filename:'/songs/file2.mp3',filetitle:'This is song 2'},
    {filename:'/songs/file3.mp3',filetitle:'This is song 3'}
];

var thisWin=$.index;
var winTitle='Media Player';
var currentSong=0;
var audioPlayer = Ti.Media.createSound();

function doopen(evt){
  if (OS_ANDROID){
    thisWin.title=winTitle;
  }else{
    $.windowtitle.text=winTitle;
  }
  updateScreen();
}

function prevdown(evt){
	evt.source.opacity=.5;
}

function prevup(evt){
	evt.source.opacity=1;
	moveback();
}

function playdown(evt){
	evt.source.opacity=.5;
}

function playup(evt){
	evt.source.opacity=1;
	if (!audioPlayer.isPlaying()){
		// start
		evt.source.image='/btnstop.png';
		playsong();
	}else{
		// stop
		evt.source.image='/btnplay.png';
		stopplayer();
	}
}

function nextdown(evt){
	evt.source.opacity=.5;
}

function nextup(evt){
	evt.source.opacity=1;
	moveforward();
}

function updateScreen(){
	$.songtitle.text=songs[currentSong].filetitle;
}

function moveback(){
    if (currentSong > 0){
        currentSong--;
        if (audioPlayer.isPlaying()){
            stopplayer();
            playsong();
        }
        updateScreen();
    }
}

function playsong(evt){
    audioPlayer.url=songs[currentSong].filename;
    audioPlayer.play();
}

function stopplayer(){
    audioPlayer.stop();
    audioPlayer.release();
}

function moveforward(){
    if (currentSong < songs.length-1){
        currentSong++;
        if (audioPlayer.isPlaying()){
            stopplayer();
            playsong();
        }
        updateScreen();
    }
}

$.index.open();