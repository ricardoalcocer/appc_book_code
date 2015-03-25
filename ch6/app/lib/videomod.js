function refreshList(tableObject,youtubeUser){
  console.log('loading videos');

    require('socialfeeds').getFeed({
        type:           'YOUTUBE',
        user:           Alloy.CFG.youtubeUser,
        max: 20,
        success: function(e){
            fillTable(this.responseText,tableObject);
        },
        error: function(e){
            console.log(this.responseText);
        }
    })
}

function fillTable(response,tableObject){
  try{
    var data=[];
    var parsed=JSON.parse(response);
    console.log('videos');
    parsed.feed.entry.forEach(function(video){
        var link      = video.link[0].href;
      var summary     = video.title.$t;
      var author      = video.author[0].name.$t;
      var duration    = video.media$group.yt$duration.seconds;
      var thumb       = video.media$group.media$thumbnail[0].url;

      var row={
        link      : link,
        summary     : summary,
        author      : author,
        duration    : convertMS(duration*1000),
        thumb       : thumb
      }

      data.push(row);
    })

    var listItems = _.map(data, function(item) {
      return {
        thumb       : { image: item.thumb },
        summary     : { text : item.summary },
        author      : { text : item.author },
        duration    : { text : item.duration.h + ":" + item.duration.m + ":" + item.duration.s },
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