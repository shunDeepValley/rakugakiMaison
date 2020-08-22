$(function(){
	debugger;
	$("progModal").load("progModal",function() {
		coModal.createProgModal();
		coModal.progModalVm.show();
		$("updModal").load("updModal");

	    axios.get('./mngStoryList/init',{})
	    .then(response => {
	    	coRowEditer.setDefaultProp(response.data['storyList']);
	    	coStoryList.createStory(response.data['storyList']);
	    	common.createCategory(
		    	response.data['categoryList']
		    	,coStoryList.changeFunc
		    );
		    common.createTitle(
		    	response.data['titleList']
		    	,coStoryList.changeFunc
		    );
	    	coModal.createUpdModal(
		    	"選択した話を"
	    		,coModal.CONFIRM_MESSAGE_FOOT.DEL
	    		,coModal.NOT_CHEACKED_MESSAGE.DEL
	    		,"選択した話に"
		    	,function(){return coRowEditer.notChecked(coStoryList.storyVm.$data.storyList);}
		    	,function(){return false;}
		    );

	    	const transitionId = location.search.split('?')[1].split('=')[0];
			const transitionVal = location.search.split('=')[1];

			if ("categoryId" == transitionId) {
				common.categoryVm.$set(common.categoryVm.$data, 'selectedCatgoryId', transitionVal);
				coStoryList.showStory(transitionVal, common.SELECTED_NONE);
			}else {
				common.titleVm.$set(common.titleVm.$data, 'selectedTitleId', transitionVal);
				coStoryList.showStory(common.SELECTED_NONE, transitionVal);
			}

	    	coModal.progModalVm.hide();
	    });
	});
});

function onClickAddStory(){
	window.location.href = './mngStory';
}

function onClickDelete(){
	coModal.updModalVm.checkChecked();
}

function onClickConfirm(){
	coModal.progModalVm.show();

    axios.post('./mngStoryList/delete'
    	,{
    		storyList : coRowEditer.createCheckedList(coStoryList.storyVm.$data.storyList)
        }
	)
	.then(response => {
	    axios.get('./mngStoryList/init',{})
	    .then(response => {
	    	coRowEditer.setDefaultProp(response.data['storyList']);
	    	coStoryList.storyVm.$set(coStoryList.storyVm.$data, 'storyList', response.data['storyList']);
	    	coModal.progModalVm.hide();
	    });
    });
}