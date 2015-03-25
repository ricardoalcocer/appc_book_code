/*
  args
    hint
    closeButton
    callback
*/

function show(args){
  if (OS_IOS){
    var dialog = Ti.UI.createAlertDialog({
        title               : args.hint,
        style               : Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
        buttonNames         : [args.closeButton,'OK'],
        cancel              : 0
    });
    dialog.addEventListener('click', function(e){
      if (e.index !== e.source.cancel){
        console.log(JSON.stringify(e));
        Ti.API.info('e.text: ' + e.text);
          args.callback(e.text);
      }
    });
    dialog.show();
  }else{
    var textfield = Ti.UI.createTextField({
      height  : Ti.UI.FILL,
      width   : Ti.UI.FILL
    });
    var dialog = Ti.UI.createAlertDialog({
        title         : args.hint,
        androidView   : textfield,
        buttonNames   : ['OK', args.closeButton],
        cancel        : 1
    });
    dialog.addEventListener('click', function(e){
        if (e.index !== e.source.cancel){
          args.callback(e.source.androidView.value);
      }
    });
    dialog.show();
  }
}

exports.show = show;