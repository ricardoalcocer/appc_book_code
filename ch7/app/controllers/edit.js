var args    = arguments[0] || {};
var thisWin = $.edit;

$.byline.text     = Alloy.Globals.byline;
$.thephoto.image  = args.image;

function edittop(evt){
  require('editdialog').show({
    hint        : L('enter_text'),
    closeButton : L('close_btn'),
    callback    : function(text){
                    $.memetoptext.text=text;
                  }
  });
}

function editbottom(evt){
  require('editdialog').show({
    hint        : L('enter_text'),
    closeButton : L('close_btn'),
    callback    : function(text){
                    $.memebottomtext.text=text;
                   }
  });
}


function doclose(){
  thisWin.close();
}

function btnshare(evt){
	var meme = fileToShare = null;

	if (OS_ANDROID){
		$.progressIndicator.show();
	}else{
		Alloy.Globals.loading.show(L('generating'), false);
	}

  // give some time for the progress bar to appear before executing synchronous operation
	setTimeout(function(){
		if (OS_ANDROID){
			meme = $.meme.toImage().media;
      fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,'tmpmeme.jpg');
		}else{
			meme = $.meme.toImage();
      fileToShare = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'tmpmeme.jpg');
		}
		fileToShare.write(meme);

    // show the share dialog
    require('com.alcoapps.socialshare').share({
        status                  : L('signature'),
        image                   : fileToShare.nativePath,
        androidDialogTitle      : L('android_share_dialog')
    })

    // hide the progress bar
    if (OS_ANDROID){
      $.progressIndicator.hide();
    }else{
      Alloy.Globals.loading.hide();
    }
    //
	},200)
}