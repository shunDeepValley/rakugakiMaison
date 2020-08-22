let categoryListVm = {}
let titleListVm = {}

$(function(){
	debugger;
	$("progModal").load("progModal",function() {
		coModal.createProgModal();
		coModal.progModalVm.show();
		$("updModal").load("updModal");

	    axios.get('./manager/init',{})
	    .then(response => {
	    	createCategoryList(response.data['categoryList']);
	    	createTitleList(response.data['titleList']);
	    	coModal.createUpdModal(
	    		"選択したカテゴリと作品を"
	    		,coModal.CONFIRM_MESSAGE_FOOT.UPD
	    		,coModal.NOT_CHEACKED_MESSAGE.UPD
	    		,"選択したカテゴリ又は作品に"
	    		,function(){return (categoryListVm.notChecked() && titleListVm.notChecked());}
	    		,function(){return (categoryListVm.existsErrorRow() || titleListVm.existsErrorRow());}
	    	);

	    	$('#caegoryPill').on('click', function (e) {
	    		$(this).tab('show');
				$('#category').addClass("show");
				$('#title').removeClass("show");
				categoryListVm.$set(categoryListVm.$data, 'isShow', true);
				titleListVm.$set(titleListVm.$data, 'isShow', false);
			});

			$('#titlePill').on('click', function (e) {
				$(this).tab('show');
				$('#category').removeClass("show");
				$('#title').addClass("show");
				categoryListVm.$set(categoryListVm.$data, 'isShow', false);
				titleListVm.$set(titleListVm.$data, 'isShow', true);
			})

			coModal.progModalVm.hide();
	    });
	});
});

function createCategoryList(categoryList){

	coRowEditer.setDefaultProp(categoryList);

	categoryListVm = new Vue({
		  el: '#category',
		  data () {
		    return {
		    		isShow : true,
		    		require : true,
		    		maxLength : 12,
		    		categoryList : categoryList,
		    		categoryIdMax : 0
		    	}
		  },
		  computed : {
			  orderedCategory : function (){
				  this.categoryList.sort(function(a,b){
					  return a.categoryId - b.categoryId;
				  });
				  if (this.categoryList.length > 0) {
					  this.$set(this, 'categoryIdMax', this.categoryList[this.categoryList.length - 1]['categoryId']);
				  }
				  return this.categoryList;
			  }
		  },
		  methods : {
			  addRow: function(){
				  const categoryIdMaxTemp = this.categoryIdMax + 1;
				  this.categoryList.push(
					{
						categoryId : categoryIdMaxTemp,
						categoryName : '',
						storyCnt : 0,
						rowStatus : coRowEditer.ROW_STATUS.INS,
						checked : true
					}
				  );
				  this.$set(this, 'categoryIdMax', categoryIdMaxTemp);
			  },
			  updateRow: function(e){
				 coRowEditer.updRow(this, this.categoryList, 'categoryId', 'categoryName', e);
			  },
			  deleteRow: function(){
				 coRowEditer.delRow(this, this.categoryList);
			  },
			  notChecked: function(){
				 return coRowEditer.notChecked(this.categoryList);
			  },
			  existsErrorRow: function(){
				 return coRowEditer.existsErrRow(this.categoryList);
			  },
			  onClickStoryCnt: function(categoryId){
				  window.location.href = './mngStoryList?categoryId=' + categoryId;
			  }
		  }
		});
}

function createTitleList(titleList){

	coRowEditer.setDefaultProp(titleList);

	titleListVm = new Vue({
		  el: '#title',
		  data () {
		    return {
		    		isShow : false,
		    		require : true,
		    		maxLength : 12,
		    		titleList : titleList,
		    		titleIdMax : 0,
		    	}
		  },
		  computed : {
			  orderedtitle: function (){
				  this.titleList.sort(function(a,b){
					  return a.titleId - b.titleId;
				  });
				  if (this.titleList.length > 0) {
					  this.$set(this, 'titleIdMax', this.titleList[this.titleList.length - 1]['titleId']);
				  }
				  return this.titleList;
			  }
		  },
		  methods : {
			  addRow: function(){
				  const titleIdMaxTemp = this.titleIdMax + 1;
				  this.titleList.push(
					{
						titleId : titleIdMaxTemp,
						titleName : '',
						storyCnt : 0,
						rowStatus : coRowEditer.ROW_STATUS.INS,
						checked : true
					}
				  );
				  this.$set(this, 'titleIdMax', titleIdMaxTemp);
			  },
			  updateRow: function(e){
				  coRowEditer.updRow(this, this.titleList, 'titleId', 'titleName', e);
			  },
			  deleteRow: function(){
				  coRowEditer.delRow(this, this.titleList);
			  },
			  notChecked: function(){
				  return coRowEditer.notChecked(this.titleList);
			  },
			  existsErrorRow: function(){
				  return coRowEditer.existsErrRow(this.titleList);
			  },
			  onClickStoryCnt: function(titleId){
				  window.location.href = './mngStoryList?titleId=' + titleId;
			  }
		  }
		});
}

function onClickAddRow(){
	if(categoryListVm.$data.isShow) {
		categoryListVm.addRow();
	}else {
		titleListVm.addRow();
	}
}

function onClickDeleteRow(){
	if (categoryListVm.$data.isShow) {
		categoryListVm.deleteRow();
	}else {
		titleListVm.deleteRow();
	}
}

function onClickUpdate(){
	for(idx in categoryListVm.$data.categoryList){
		coRowEditer.validate(
			categoryListVm
			,categoryListVm.$data.categoryList[idx]
			,categoryListVm.$data.categoryList[idx]['categoryName']
		);
	}
	for(idx in titleListVm.$data.titleList){
		coRowEditer.validate(
			titleListVm
			,titleListVm.$data.titleList[idx]
			,titleListVm.$data.titleList[idx]['titleName']
		);
	}
	coModal.updModalVm.checkChecked();
	coModal.updModalVm.checkWarning();
}

function onClickConfirm(){
	coModal.progModalVm.show();

    axios.post('./manager/update'
    	,{
        	categoryList : coRowEditer.createCheckedList(categoryListVm.$data.categoryList),
    		titleList : coRowEditer.createCheckedList(titleListVm.$data.titleList)
        }
	)
	.then(response => {
	    axios.get('./manager/init',{})
	    .then(response => {
	    	coRowEditer.setDefaultProp(response.data['categoryList']);
	    	coRowEditer.setDefaultProp(response.data['titleList']);
	    	categoryListVm.$set(categoryListVm.$data, 'categoryList', response.data['categoryList']);
	    	titleListVm.$set(titleListVm.$data, 'titleList', response.data['titleList']);
	    	coModal.progModalVm.hide();
	    });
    });
}