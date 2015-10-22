function refreshList(tableObject,youtubeUser){
  console.log('loading videos');

    require('socialfeeds').getFeed({
        type                 : 'YOUTUBE',
        youtubePlaylist      : Alloy.CFG.youtubePlaylist,
        youtubeAPIKey        : Alloy.CFG.youtubeAPIKey,
        success: function(e){
            fillTable(this.responseText,tableObject);
        },
        error: function(e){
            console.log(this.responseText);
        }
    })
}

function fillTable(response,tableObject){

  // var parsedResponse = JSON.parse(this.responseText);
  // parsedResponse.items.forEach(function(item){
  //   var title = item.snippet.title;
  //   var description = item.snippet.description;
  //   var thumb = item.snippet.thumbnails.default.url;
  //   var videoId = item.snippet.resourceId.videoId;
  //   var videoURL = 'https://www.youtube.com/watch?v=' + videoId;

  //   console.log(title);
  //   console.log(description);
  //   console.log(thumb);
  //   console.log(videoId);
  //   console.log(videoURL);
  // })
        
  try{
    var data=[];
    var parsed=JSON.parse(response);
    
    console.log('videos');
    parsed.items.forEach(function(video){
      var videoId     = video.snippet.resourceId.videoId;
      var link        = 'https://www.youtube.com/watch?v=' + videoId;
      var summary     = video.snippet.description;
      var thumb       = video.snippet.thumbnails.default.url;

      var row={
        link        : link,
        summary     : summary,
        thumb       : thumb
      }

      data.push(row);
    })

    var listItems = _.map(data, function(item) {
      return {
        thumb       : { image: item.thumb },
        summary     : { text : item.summary },
        properties    : { url : item.link }
      };});

    tableObject.sections[1].setItems(listItems);
    if (tableObject.sections[0].items.length>0){
      tableObject.sections[0].deleteItemsAt(0,1);
    }
  }catch(e){
    alert(L('offline_error'));
  }
}

function convertMS (ms) {
  var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  if (parseInt(s) <10) s='0' + s;
  h = Math.floor(m / 60);
  m = m % 60;
  if (parseInt(m)<10) m='0' + m;
  d = Math.floor(h / 24);
  h = h % 24;
  return {
    d : d,
    h : h,
    m : m,
    s : s
  };
};

exports.refreshList=refreshList;