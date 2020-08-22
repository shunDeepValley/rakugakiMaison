$(function(){
});

const common = {
	SELECTED_NONE : "none",

	categoryVm : {},
	titleVm : {},

	getThumbnailImg : function (vm, thumbnailId, setObj){
		axios.get('/getThumbnailImg?thumbnailId=' + thumbnailId,{responseType: "blob"})
	    .then(response => {
	    	vm.$set(setObj, 'thumbnailImg', response.data);
	    	vm.$set(setObj, 'thumbnailImgBlob', URL.createObjectURL(new Blob([response.data], {type: response.data.type})));
	    });
	},
	getMainImg : function (vm, mainId, mainBranchId, setObj){
		axios.get('/getMainImg?mainId=' + mainId + '&mainBranchId=' + mainBranchId,{responseType: "blob"})
		.then(response => {
			vm.$set(setObj, 'mainImg', response.data);
			vm.$set(setObj, 'mainImgBlob', URL.createObjectURL(new Blob([response.data], {type: response.data.type})));
		});
	},
	createCategory : function (categoryList, changeFunc){
		common.categoryVm = new Vue({
			el: '#category',
			data () {
				return {
					isError : false,
					massage : "",
				    selectedCatgoryId : common.SELECTED_NONE,
				    categoryList : categoryList
				 }
			},
			computed : {
				orderedCategory: function (){
					return this.categoryList.sort(function(a,b){return a.sortNo - b.sortNo;});
				}
			},
			methods : {
				change: function(){
					changeFunc();
				}
			}
		});
	},
	createTitle : function (titleList, changeFunc){
		common.titleVm = new Vue({
			el: '#title',
			data () {
				return {
					isError : false,
					massage : "",
					selectedTitleId : common.SELECTED_NONE,
				    titleList : titleList
				}
			},
			computed : {
				orderedtitle: function (){
					return this.titleList.sort(function(a,b){return a.sortNo - b.sortNo;});
				}
			},
			methods : {
				change: function(){
					changeFunc();
				}
			}
		})
	}
}
