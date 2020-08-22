const coRowEditer = {
	ROW_STATUS : {
		NONE : "none",
		INS : "insert",
		UPD : "update",
		DEL : "delete"
	},

	setDefaultProp : function (list){
		for(idx in list){
			list[idx]['rowStatus'] = coRowEditer.ROW_STATUS.NONE;
			list[idx]['checked'] = false;
			list[idx]['isError'] = false;
			list[idx]['massage'] = "";
		}
	},
	updRow : function (vm, list, idStr, nameStr, event){
		 for(idx in list){
			 if (list[idx][idStr] == event.target.id) {
				 coRowEditer.validate(vm, list[idx], event.target.value);
				 vm.$set(list[idx], nameStr, event.target.value);
				 if (list[idx]['rowStatus'] != coRowEditer.ROW_STATUS.INS) {
					 vm.$set(list[idx], 'rowStatus', coRowEditer.ROW_STATUS.UPD);
					 vm.$set(list[idx], 'checked', true);
				 }
			 }
		 }
	},
	validate : function (vm, rowObj, val){
		result = coInputValidation.inputValidation(vm, val);
		vm.$set(rowObj, 'isError', result.isError);
		vm.$set(rowObj, 'massage', result.massage);
	},
	delRow : function (vm, list){
		let delIdxList = [];
		for(idx in list){
			if (list[idx]['checked']) {
				if (list[idx]['rowStatus'] == coRowEditer.ROW_STATUS.INS) {
					delIdxList.unshift(idx);
				} else {
					vm.$set(list[idx], 'rowStatus', coRowEditer.ROW_STATUS.DEL);
				}
			}
		 }
		 for(idx in delIdxList){
			 list.splice(delIdxList[idx], 1);
		 }
	},
	notChecked : function (list){
		let checkedCnt = 0;
		for(idx in list){
			if (list[idx]['checked']) {
				checkedCnt++;
			}
		 }
		return (checkedCnt == 0);
	},
	existsErrRow : function (list){
		for(idx in list){
			if (list[idx]['checked'] && list[idx]['isError']) {
				return true;
			}
		 }
		return false;
	},
	createCheckedList : function (list){
		let retList = [];
		for(idx in list){
			if (list[idx]['checked']) {
				retList.push(list[idx]);
			}
		}
		return retList;
	}
}


