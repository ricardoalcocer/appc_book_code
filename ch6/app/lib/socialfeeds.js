var Codebird  = require("codebird");  // library to access Twitter
var cb        = new Codebird();

var getFeed=function(args){
  switch (args.type){
    case 'YOUTUBE':
      var _url1 ='https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=#PLAYLIST#&key=#APIKEY#';
      var url1=_url1;

      url1=url1.replace('#PLAYLIST#',args.youtubePlaylist);
      url1=url1.replace('#APIKEY#',args.youtubeAPIKey);
      
      var http=Ti.Network.createHTTPClient({
        onload  : args.success,
        onerror : args.error
      })

      http.open('GET',url1);
      http.send();

      break;

    case 'TWITTER':
      cb.setConsumerKey(args.consumerKey, args.consumerSecret);
      var bearerToken = Ti.App.Properties.getString('TwitterBearerToken', null);
      if(bearerToken == null){
        cb.__call(
            'oauth2_token',
            {},
            function (reply) {
                var bearer_token = reply.access_token;
                cb.setBearerToken(bearer_token);
                Ti.App.Properties.setString('TwitterBearerToken', bearer_token);
                fetchTwitter(args.action,args.searchstring,args.max,args.success);
            }
        );
      } else {
        cb.setBearerToken(bearerToken);
        fetchTwitter(args.action,args.searchstring,args.max,args.success);
      }
      break;

  }
}

// private function
function fetchTwitter(action,searchstring,max,success){
  var params = {
      q     :   Ti.Network.encodeURIComponent(searchstring),
      count   :   max
  };
  cb.__call(
      action,
      params,
      function (reply) {
          success(JSON.stringify(reply.statuses)); // I'm stringifying only to maintain consistency with others responses
      },
      true // this parameter required
  )
}

exports.getFeed=getFeed;