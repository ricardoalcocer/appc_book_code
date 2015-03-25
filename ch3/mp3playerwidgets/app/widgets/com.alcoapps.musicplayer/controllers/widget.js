var songs,songLabel=null;
var currentSong=0;
var audioPlayer = Ti.Media.createSound();

function prevdown(evt){
	evt.source.opacity=.5;
}

function prevup(evt){
	evt.source.opacity=1;
	moveback();
}

function nextdown(evt){
	evt.source.opacity=.5;
}

function nextup(evt){
	evt.source.opacity=1;
	moveforward();
}

function playdown(evt){
	evt.source.opacity=.5;
}

function playup(evt){
	evt.source.opacity=1;
	if (!audioPlayer.isPlaying()){
		// start
		evt.source.image=WPATH('btnstop.png');
		playsong();
	}else{
		// stop
		evt.source.image=WPATH('btnplay.png');
		stopplayer();
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

function updateScreen(){
	songLabel.text=songs[currentSong].filetitle;
}

exports.setSongs=function(args){
	songs=args;
}

exports.setSongLabel=function(args){
	songLabel=args;
}

exports.updateScreen=updateScreen;

