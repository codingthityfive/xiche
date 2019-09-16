
$("#submitBtn").click(function(){
	var phone = $("#phone").val();
	if (phone==null || $.trim(phone) == "") {
		btn_alertDialog('提示','手机号必填')
		return ;
	}
	
	//验证手机合法性
	var eg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
	if (!eg.test(phone)) {
		btn_alertDialog('提示','手机号格式不正确');
		return ;
	}
	
	//提交修改
	$.post("updateUserInfo", $("#editForm").serialize(), function(data) {
		  if (data.code == 0) {
			  btn_alertDialog('提示','修改成功，请重新登录');
			  var dialog = top.dialog.get(window);
			  dialog.close("success");
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示',data.msg);
		  }
	});
})