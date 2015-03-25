var Codebird  = require("codebird");  // library to access Twitter
var cb      = new Codebird();

var getFeed=function(args){
  switch (args.type){
    case 'YOUTUBE':
      var _url='https://gdata.youtube.com/feeds/api/users/#USER#/uploads?max-results=#MAX#&alt=json';
      var url=_url;

      url=url.replace('#USER#',Ti.Network.encodeURIComponent(args.user));
      if (args.max >0){
        url=url.replace('#MAX#',args.max);
      }else{
        url=url.replace('#MAX#','20'); // default to 20
      }

      var http=Ti.Network.createHTTPClient({
        onload  : args.success,
        onerror : args.error
      })

      http.open('GET',url);
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