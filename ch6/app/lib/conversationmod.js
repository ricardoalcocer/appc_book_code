function refreshList(tableObject){
	console.log('loading tweets');
	require('socialfeeds').getFeed({
    	type              : 			'TWITTER',
      action            :       'search_tweets',
    	searchstring      : 	    Alloy.CFG.twitterHashTag,
    	consumerKey       : 	    Alloy.CFG.twitterConsumerKey,
    	consumerSecret    :	      Alloy.CFG.twitterConsumerSecret,
    	success: function(response){
        	fillTable(response,tableObject);
        },
        error: function(response){
        	console.log(response.data);
        }
    })
}

function fillTable(response,tableObject){
	try{
		var data=[];
		var parsed=JSON.parse(response);
		parsed.forEach(function(tweet){
      var id 			    = tweet.id_str;
			var status 		  = tweet.text;
			var created_at 	= tweet.created_at;
			var name 		    = tweet.user.name;
			var screen_name = tweet.user.screen_name;
			var user_avatar = tweet.user.profile_image_url;
			var url         = "https://twitter.com/" + screen_name + '/status/' + id;

			var row = {
          id 				: id,
				  status 			: status,
				  created_at 		: created_at,
				  name 			: name.trim(),
				  screen_name 	: screen_name.trim(),
				  user_avatar		: user_avatar,
				  url 			: url
			}
			data.push(row);
		})

		var listItems = _.map(data, function(item) {
			return {
				avatar 			  : { image    : item.user_avatar },
				name 			    : { text     : item.name },
				screen_name 	: { text     : '@' + item.screen_name },
				tweet 			  : { text     : item.status },
				properties 		: { url	     : item.url, id	: item.id,  screen_name : item.screenname }
			};
    });


		tableObject.sections[1].setItems(listItems);
		if (tableObject.sections[0].items.length>0){
      tableObject.sections[0].deleteItemsAt(0,1);
		}
	}catch(e){
		alert(L('offline_error'));
	}
}
exports.refreshList=refreshList;