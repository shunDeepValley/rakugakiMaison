const coModal = {
	CONFIRM_MESSAGE_FOOT : {
		INS : "登録しますか？",
		UPD : "更新しますか？",
		DEL : "削除しますか？"
	},
	NOT_CHEACKED_MESSAGE : {
		INS : "登録対象を選択して下さい。",
		UPD : "更新対象を選択して下さい。",
		DEL : "削除対象を選択して下さい。"
	},

	progModalVm : {},
	updModalVm : {},

	createProgModal : function (){
		debugger;
		coModal.progModalVm = new Vue({
			el: '#progModal',
			data () {
			    return {
			    	isShow : false,
			    	progVal: 0,
			    	style : {width : 0 + '%'}
			    }
			},
			mounted : function(){
				 $('#progModal').modal({
					backdrop : "static",
					keyboard : false,
					show : false
				 });
			},
			methods : {
				show() {
					this.$set(this, 'isShow', true);
					$('#progModal').modal('show');
				},
				hide() {
					let cnt = 0;
					const timer = setInterval(
						function(){
							coModal.progModalVm.$nextTick(function() {
								while (100 >= cnt) {
									coModal.progModalVm.$set(coModal.progModalVm.$data, 'progVal', cnt++);
									coModal.progModalVm.$set(coModal.progModalVm.$data.style, 'width', cnt + '%');
								}
							});
							if (100 <= cnt) {
								$('body').removeClass('modal-open');
								$('.modal-backdrop').remove();
								coModal.progModalVm.$set(coModal.progModalVm.$data, 'progVal', 0);
								coModal.progModalVm.$set(coModal.progModalVm.$data.style, 'width', 0 + '%');
								$('#progModal').modal('hide');
								coModal.progModalVm.$set(coModal.progModalVm.$data, 'isShow', false);
								clearInterval(timer);
								$('#main').removeClass('hide');
							}
						}
						,500
					);
				}
			}
		});
	},
	createUpdModal : function(confirmMessageHead, confirmMessageFoot, notCheckedMessage, warningMessageHead, notCheckedFunc, isWarningFunc){
		coModal.updModalVm = new Vue({
			el: '#updModal',
			data () {
			    return {
			    	notChecked : true,
			    	isWarning : false,
			    	confirmTitle : '確認',
			    	warningTitle : '警告',
			    	confirmMessageHead : confirmMessageHead,
			    	confirmMessageFoot : confirmMessageFoot,
			    	notCheckedMessage : notCheckedMessage,
			    	warningMessageHead : warningMessageHead,
			    	warningMessageFoot : "エラーがあります。"
			    }
			},
			methods : {
				checkChecked: function(){
					this.$set(this, 'notChecked', notCheckedFunc());
				},
				checkWarning: function(){
					this.$set(this, 'isWarning', isWarningFunc());
				}
			}
		});
	}
}