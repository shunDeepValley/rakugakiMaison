const coInputValidation = {
	MESSAGE : {
		REQUIRE         : "必須入力です。",
		MAX_LENGTH_HEAD : "最大桁数:",
		MAX_LENGTH_FOOT : "を超過しています。"
	},
	inputValidation : function (vue, checkTarget){

		let result = {
			isError : false,
			massage : ""
		};

		if ('require' in vue && vue.require) {
			if (coInputValidation.notSetVal(checkTarget)) {
				return result = {
						isError : true,
						massage : coInputValidation.MESSAGE.REQUIRE
				};
			}
		}

		if ('maxLength' in vue && vue.maxLength > 0) {
			if (coInputValidation.exceededMaxLength(checkTarget, vue.maxLength)) {
				return result = {
						isError : true,
						massage : coInputValidation.MESSAGE.MAX_LENGTH_HEAD + vue.maxLength + coInputValidation.MESSAGE.MAX_LENGTH_FOOT
				};
			}
		}

		return result;
	},
	notSetVal : function  (checkTarget){
		return (typeof checkTarget === 'undefined' || checkTarget === null || checkTarget === "");
	},
	exceededMaxLength : function (checkTarget, maxLength){
		return (!coInputValidation.notSetVal(checkTarget) && maxLength < checkTarget.length)
	}
}