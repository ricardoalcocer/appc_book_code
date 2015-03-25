Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

var cb_success=function(img){
  Alloy.createController('edit',{image:img}).getView().open();
}

var cb_fail=function(err){
  if (err.code == Titanium.Media.NO_CAMERA) {
    console.log('No Camera');
  }else{
    console.log('Fail');
  }
}

function doClick(e) {
  require('photomod').takePhoto(cb_success,cb_fail);
}

function showinfo(evt){
	var dialog = Ti.UI.createAlertDialog({
    	message: String.format(L('about'),Alloy.Globals.bookurl),
    	cancel: 1,
    	buttonNames: [L('book_btn'), L('close_btn')],
    	title: L('about_title')
  	})

	dialog.addEventListener('click', function(e){
		if (e.index === 0){
			Ti.Platform.openURL(Alloy.Globals.bookurl);
		}
	});
  	dialog.show();
}

$.index.open();
