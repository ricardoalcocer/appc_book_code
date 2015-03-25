var args = arguments[0] || {};

function changeday(evt){
	$.scrollableView.currentPage=evt.source.index;
}

function pageChange(evt){
		$.dayoptions.index=evt.source.currentPage;		
}
