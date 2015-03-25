function takePhoto(success,fail){
  var img = null;
  Titanium.Media.showCamera({
    success : function(event) {
      if (OS_ANDROID){
        // if we're running on android we want to resize and rotate the image
        // because of TIMOB-3887 : https://jira.appcelerator.org/browse/TIMOB-3887
        // and because Android images are huge in size, which could make the device
        // run out-of-memory
        img = require('imgfix').rotateAndResize(event.media,640,80);
      }else{
        img = event.media;
      }
      success(img);
    },
    error : function(error) {
      // called when there's an error
      fail(error);
    },
    mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO] // allow only photos
  });
}

exports.takePhoto = takePhoto;