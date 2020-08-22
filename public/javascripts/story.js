$(function(){
	$("progModal").load("progModal",function() {
		coModal.createProgModal();
		coModal.progModalVm.show();
	    axios.get('./story/init?mainId=' + location.search.split('=')[1],{
	    })
	    .then(response => {
	    	createStory(response.data);
	    	coModal.progModalVm.hide();
	    })
	});
});

function createStory(mainImgList){
	for(idx in mainImgList){
		mainImgList[idx]["isImg"] = (mainImgList[idx]['fontSize'] == "");
	}

	new Vue({
		el: '#story',
		data () {
			return {mainImgList : mainImgList}
		},
		created : function() {
			  for(idx in this.mainImgList){
				  if (this.mainImgList[idx]["isImg"]) {
					  common.getMainImg(this, this.mainImgList[idx]["mainId"], this.mainImgList[idx]["mainBranchId"], this.mainImgList[idx]);
				  }
			  }
			  this.$set(this, 'mainImgList', this.mainImgList.sort(function(a,b){return a.mainBranchId - b.mainBranchId;}));
		}
	});
}