const coStoryList = {
	storyVm : {},

	createStory : function (storyList){
		for(idx in storyList){
			storyList[idx]['isShow'] = true;
		}

		coStoryList.storyVm = new Vue({
			el: '#story',
			data () {
				return {
					orderedStoryDesc : true,
					storyList : storyList
				}
			},
			computed : {
				orderedStoryList : function (){
					return this.storyList.sort((a,b) => coStoryList.sortStoryList(a,b));
				}
			},
			created : function() {
				for(idx in this.storyList){
					common.getThumbnailImg(this, this.storyList[idx]['thumbnailId'], this.storyList[idx]);
					this.$set(this.storyList[idx], 'storyUpdDateStr', this.storyList[idx]['storyUpdDate'].substring(0,10));
				}
			},
			methods : {
				orderedStory: function (){
					if (this.orderedStoryDesc) {
						this.$set(
							this
							,'storyList'
							,this.storyList.sort((a,b) => coStoryList.sortStoryList(a,b))
						);
						this.orderedStoryDesc = false;
					}else {
						this.$set(
							this
							,'storyList'
							,this.storyList.sort((a,b) => coStoryList.sortStoryList(a,b))
						);
						this.orderedStoryDesc = true;
					}
				}
			}
		});
	},
	sortStoryList: function(a,b){
		let r1 = 1;
		let r2 = -1;

		if (coStoryList.storyVm.orderedStoryDesc) {
			r1 = -1;
			r2 = 1;
		}

		if (new Date(a.storyUpdDate) < new Date(b.storyUpdDate)) {return r1;}
		if (new Date(a.storyUpdDate) > new Date(b.storyUpdDate)) {return r2;}

		if (a.storyCnt < b.storyCnt) {return r1;}
		if (a.storyCnt > b.storyCnt) {return r2;}

		if (a.storyId < b.storyId) {return r1;}
		if (a.storyId > b.storyId) {return r2;}

		return 0;
	},
	showStory : function (categoryId, titleId){
		if (categoryId != common.SELECTED_NONE && titleId != common.SELECTED_NONE) {
			for(idx in coStoryList.storyVm.$data.storyList){
				 coStoryList.storyVm.$set(
					coStoryList.storyVm.$data.storyList[idx]
					,'isShow'
					,(categoryId == coStoryList.storyVm.$data.storyList[idx].categoryId && titleId == coStoryList.storyVm.$data.storyList[idx].titleId)
				 );
			}
		}else if (categoryId != common.SELECTED_NONE && titleId == common.SELECTED_NONE){
			for(idx in coStoryList.storyVm.$data.storyList){
				coStoryList.storyVm.$set(coStoryList.storyVm.$data.storyList[idx], 'isShow', (categoryId == coStoryList.storyVm.$data.storyList[idx].categoryId));
			}
		}else if (categoryId == common.SELECTED_NONE && titleId != common.SELECTED_NONE){
			for(idx in coStoryList.storyVm.$data.storyList){
				coStoryList.storyVm.$set(coStoryList.storyVm.$data.storyList[idx], 'isShow', (titleId == coStoryList.storyVm.$data.storyList[idx].titleId));
			}
		}else {
			for(idx in coStoryList.storyVm.$data.storyList){
				coStoryList.storyVm.$set(coStoryList.storyVm.$data.storyList[idx], 'isShow', true);
			}
		}
	},
	changeFunc: function(){
		coStoryList.showStory(common.categoryVm.$data.selectedCatgoryId, common.titleVm.$data.selectedTitleId);
	}
}
