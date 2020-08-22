$(function(){});

function onClickLogin(){
	axios.post('./login/login',{password : $('#pw').val()})
	.then(response => {
		if (response.data == "OK") {
			window.location.href = './manager';
			return;
		}
		alert("パスワードが不正です。");
	});
}