$.index.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		actionbar.title="The Alloy Conference";
	}
})

$.index.open();
