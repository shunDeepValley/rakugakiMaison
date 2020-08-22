$(function(){
	debugger;
	$("progModal").load("progModal",function() {
		coModal.createProgModal();
		coModal.progModalVm.show();
	    axios.get('./storyList/init',{})
	    .then(response => {
	    	coStoryList.createStory(response.data['storyList']);
	    	common.createCategory(
	    		response.data['categoryList']
	    		,coStoryList.changeFunc
	    	);
	    	common.createTitle(
	    		response.data['titleList']
	    		,coStoryList.changeFunc
	    	);
	    	coModal.progModalVm.hide();
	    });
	});
});

function onClickOrderedStory(){
	coStoryList.storyVm.orderedStory();
}