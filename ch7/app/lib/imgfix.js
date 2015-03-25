// private function that uses ImageUtility module to resize and rotate the Android image
function rotateAndResize (media, width, quality) {
  var moment          = require('alloy/moment');
  var utilsModule     = require('com.alcoapps.imageutility');

  // Create file to store photo.
  var dataDirectory   = Ti.Filesystem.getApplicationDataDirectory();
  var fileName        = String.format('Company_Photo_%s.jpg', moment().format('YYYY-MM-DD-HH-mm-ss-SSS-ZZ'));
  var file            = Ti.Filesystem.getFile(dataDirectory, fileName);
  var fileNativePath  = file.nativePath;

  // Write media to file.
  file.write(media);
  file = null;

  // Rotate photo in file, resize, and adjust quality.
  utilsModule.rotateResizeImage(fileNativePath, width || 640, quality || 80);

  // Get new and improved media out of file.
  media = Ti.Filesystem.getFile(fileNativePath);

  return media;
}

exports.rotateAndResize = rotateAndResize;