$("#btn_submit").click(function(){
	var accountNumber = $("#accountNumber").val();
	if (accountNumber==null || $.trim(accountNumber) == "") {
		$("#resultMsg").text("用户名不能为空");
		return ;
	}
	
	var password = $("#password").val();
	if (password==null || $.trim(password) == "") {
		$("#resultMsg").text("密码不能为空");
		return ;
	}

	/*var companyId = $("#companyId").val();
	if (companyId==null || $.trim(companyId) == "") {
		$("#resultMsg").text("请选择分公司");
		return ;
	}*/
	
	$.post("login/doLogin", $("#loginForm").serialize(), function(data) {
		  if (data.code == 0) {
			  window.location = "index";
		  } else {
			  refreshCaptcha();
			  $("#resultMsg").text(data.msg);
		  }
	});
	
});


function refreshCaptcha() {  
	$("#kaptcha").attr("src","/manage/images/kaptcha.jpg?t=" + Math.random());    
} 

//获得用户的组织机构
$("#accountNumber").blur(function(){
	//loadCompany();
});

