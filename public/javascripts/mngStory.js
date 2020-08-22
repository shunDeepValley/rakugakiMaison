let thumbnailVm = {};
let mainImgListVm = {};

$(function(){
	$("progModal").load("progModal",function() {
		coModal.createProgModal();
		coModal.progModalVm.show();
		$("updModal").load("updModal");

		let url = './mngStory/init';
		if (location.search != "") {
			url = url + "Upd?storyId=" + location.search.split('=')[1];
		}

	    axios.get(url,{})
	    .then(response => {
	    	createThumbnail(response.data['story'], response.data['thumbnailImg']);
	    	common.createCategory(response.data['categoryList'], categoryValidate);
			common.createTitle(response.data['titleList'], titleValidate);
	    	createMainImgList(response.data['mainImgList']);
	    	coModal.createUpdModal(
		    	"話を"
	    		,coModal.CONFIRM_MESSAGE_FOOT.INS
	    		,coModal.NOT_CHEACKED_MESSAGE.INS
	    		,"カテゴリ,作品名,漫画画像/文章の"
		    	,function(){
	    			return (
	    				categoryValidate()
	    				|| titleValidate()
	    				|| thumbnailVm.validateStory()
	    				|| thumbnailVm.validateThumbnail()
	    				|| mainImgListVm.validate()
	    			);
	    		}
		    	,function(){return false;}
		    );

	    	if (location.search != "") {
	    		common.categoryVm.$set(common.categoryVm.$data, 'selectedCatgoryId', response.data['story']['categoryId']);
		    	common.titleVm.$set(common.titleVm.$data, 'selectedTitleId', response.data['story']['titleId']);
	    	}

	    	coModal.progModalVm.hide();
	    });
	});
});
function categoryValidate(){
	if (common.categoryVm.$data.selectedCatgoryId == common.SELECTED_NONE) {
		common.categoryVm.$set(common.categoryVm.$data, 'massage', coInputValidation.MESSAGE.REQUIRE);
		common.categoryVm.$set(common.categoryVm.$data, 'isError', true);
		return true;
	} else {
		common.categoryVm.$set(common.categoryVm.$data, 'massage', "");
		common.categoryVm.$set(common.categoryVm.$data, 'isError', false);
		return false;
	}
}
function titleValidate(){
	if (common.titleVm.$data.selectedTitleId == common.SELECTED_NONE) {
		common.titleVm.$set(common.titleVm.$data, 'massage', coInputValidation.MESSAGE.REQUIRE);
		common.titleVm.$set(common.titleVm.$data, 'isError', true);
		return true;
	} else {
		common.titleVm.$set(common.titleVm.$data, 'massage', "");
		common.titleVm.$set(common.titleVm.$data, 'isError', false);
		return false;
	}
}
function createThumbnail(story, thumbnail){
	thumbnailVm = new Vue({
		el: '#thumbnailI',
		data () {
			return {
				st : {
					require : true,
					isError : false,
					massage : "",
					maxLength : 12,
					story : story
				},
				th : {
					require : true,
					isError : false,
					massage : "",
					thumbnail : thumbnail
				}
		    }
		},
		created : function() {
			if (this.st.story.storyUpdDate != null) {
				common.getThumbnailImg(this, this.th.thumbnail.thumbnailId, this.th.thumbnail);
			}
		},
		methods : {
			setImg: function(thumbnailImg){
				this.$set(this.th.thumbnail, "thumbnailImg", thumbnailImg);
				this.$set(this.th.thumbnail, "thumbnailImgBlob", URL.createObjectURL(new Blob([thumbnailImg], {type: "blob"})));
			},
			validateStory: function(){
				if (coInputValidation.notSetVal(this.st.story.storyName)) {
					this.$set(this.st, 'isError', true);
					this.$set(this.st, 'massage', coInputValidation.MESSAGE.REQUIRE);
					return true;
				}else if (coInputValidation.exceededMaxLength(this.st.story.storyName, this.st.maxLength)) {
					this.$set(this.st, 'isError', true);
					this.$set(this.st, 'massage', coInputValidation.MESSAGE.MAX_LENGTH_HEAD + this.st.maxLength + coInputValidation.MESSAGE.MAX_LENGTH_FOOT);
					return true;
				}else {
					this.$set(this.st, 'isError', false);
					this.$set(this.st, 'massage', "");
					return false;
				}
			},
			validateThumbnail: function(){
				if (coInputValidation.notSetVal(this.th.thumbnail.thumbnailImg)) {
					this.$set(this.th, 'isError', true);
					this.$set(this.th, 'massage', coInputValidation.MESSAGE.REQUIRE);
					return true;
				}else {
					this.$set(this.th, 'isError', false);
					this.$set(this.th, 'massage', "");
					return false;
				}
			}
		}
	});
}

function onClickThumbnail(){
	document.getElementById("thumbnailImg").click();
	document.getElementById("thumbnailImg").value = "";
}

function onChangeThumbnail(){
	const files = document.getElementById('thumbnailImg').files;
	thumbnailVm.setImg(files[0]);
}

function createMainImgList(mainImgList){
	for(idx in mainImgList){
		mainImgList[idx]["isImg"] = (mainImgList[idx]['fontSize'] == "");
	}

	const draggable = window['vuedraggable'];

	mainImgListVm = new Vue({
		el: '#mainImg',
		components : {
			draggable : draggable
		},
		data () {
			return {
				isError : false,
				massage : "",
				mainImgList : mainImgList
		    }
		},
		created : function() {
			for(idx in this.mainImgList){
				if (this.mainImgList[idx]["isImg"]) {
					common.getMainImg(this, this.mainImgList[idx]["mainId"], this.mainImgList[idx]["mainBranchId"], this.mainImgList[idx]);
				}
			}
			if (this.mainImgList.length != 0) {
				this.$set(this, 'mainImgList', this.mainImgList.sort(function(a,b){return a.mainBranchId - b.mainBranchId;}));
			}
		},
		methods : {
			addCommentRow: function(){
				let mainId = null;
				if (this.mainImgList.length != 0) {
					mainId = this.mainImgList[0].mainId;
				}

				this.mainImgList.push(
					{
						mainId : mainId,
						mainBranchId : this.mainImgList.length + 1,
						mainImg : {},
						mainImgBlob : {},
						comment : "",
						fontColor : "",
						fontSize : "medium",
						isImg : false
					}
				);
			},
			addImgRow: function(mainImg){
				let mainId = null;
				if (this.mainImgList.length != 0) {
					mainId = this.mainImgList[0].mainId;
				}

				this.mainImgList.push(
					{
						mainId : mainId,
						mainBranchId : this.mainImgList.length + 1,
						mainImg : mainImg,
						mainImgBlob : URL.createObjectURL(new Blob([mainImg], {type: "blob"})),
						comment : "",
						fontColor : "",
						fontSize : "",
						isImg : true
					}
				);
			},
			onClickDelete: function(mainBranchId){
				for(idx in this.mainImgList){
					if (this.mainImgList[idx]['mainBranchId'] == mainBranchId) {
						this.mainImgList.splice(idx, 1);
					}
				}
			},
			validate: function(){
				if (this.mainImgList.length == 0) {
					this.$set(this, 'isError', true);
					this.$set(this, 'massage', coInputValidation.MESSAGE.REQUIRE);
					return true;
				}else {
					this.$set(this, 'isError', false);
					this.$set(this, 'massage', "");
					return false;
				}
			}
		}
	});
}

function onClickAddComment(){
	mainImgListVm.addCommentRow();
}

function onClickAddImg(){
	document.getElementById("addImg").click();
	document.getElementById("addImg").value = "";
}

function onChangeAddImg(){
	const files = document.getElementById('addImg').files;

	for(let idx = 0; idx < files.length; idx++){
		mainImgListVm.addImgRow(files[idx]);
	}
}

function onClickInsert(){
	coModal.updModalVm.checkChecked();
}

function onClickConfirm(){
	coModal.progModalVm.show();

	thumbnailVm.st.story['categoryId'] = common.categoryVm.selectedCatgoryId;
	thumbnailVm.st.story['titleId'] = common.titleVm.selectedTitleId;

	let formData = new FormData();
	formData.append("story", new Blob([JSON.stringify(thumbnailVm.st.story)], { type: 'application/json'}));
	formData.append("thumbnailId", new Blob([JSON.stringify(thumbnailVm.th.thumbnail.thumbnailId)], { type: 'application/json'}));
	formData.append("thumbnailImg", thumbnailVm.th.thumbnail.thumbnailImg);

	for(idx in mainImgListVm.mainImgList){
		mainImgListVm.mainImgList[idx]['mainBranchId'] = idx;
		formData.append("mainImg", mainImgListVm.mainImgList[idx].mainImg);
		mainImgListVm.mainImgList[idx]['mainImg'] = null; //json変換時に{}だとエラーになるため
		formData.append("main", new Blob([JSON.stringify(mainImgListVm.mainImgList[idx])], { type: 'application/json'}));
	}

    axios.post('./mngStory/insert',formData,{'Content-Type' : 'multipart/form-data'})
	.then(response => {
		coModal.progModalVm.hide();
		alert("登録しました。前画面に戻ります。")
		window.location.href = './mngStoryList?titleId=' + common.titleVm.selectedTitleId;
    });
}