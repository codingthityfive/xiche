

//$("#submitBtn").click(function(){
function commitData(){
	//提交修改
	$.post("updatePassword", $("#editForm").serialize(), function(data) {
		  if (data.code == 0) {
			  btn_alertDialog('提示','修改成功，请重新登录');
			  var dialog = top.dialog.get(window);
			  dialog.close("success");
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示',data.msg);
		  }
	});
}
//})
$(function () {
     $('#newpassword').keyup(function () {
         var len = $('#newpassword').val().length;
         if (len < 7) {
	         $('#spinfo').css('color','red')
             $('#spinfo').text('密码太弱');
         }else if (len >= 7 && len < 11) {
             $('#spinfo').css('color','blue')
             $('#spinfo').text('密码强度一般');
         }else {
	         $('#spinfo').css('color','green')
             $('#spinfo').text('密码强度强');
         }
      })
})
var countdown = 60;
function settime(obj) {
    if (countdown == 0 || countdown < 0) {
        obj.removeAttribute("disabled");
        obj.value="免费获取验证码";
        countdown = 60;
        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.value="重新发送(" + countdown + ")";
        countdown--;
    }
setTimeout(function() {
    settime(obj) }
    ,1000)
}
function sendMsgCode(obj){
    $.ajax({
        url: 'getMsgCode',
        type: 'post',
        dataType: 'json',
        async: false,
        success: function(result){
            if (result) {
            	if(result.code == 0){
            		settime(obj);
                    btn_alertDialog("提示","短信发送成功！");
                }else{
                    btn_alertDialog("提示",result.msg);
                }
            }else{
            	btn_alertDialog("提示","验证码发送失败");
            }
        },
        error: function(){

        }
    })
}
function checkMsgCode(){
	var password = $("#password").val();
	if (password==null || $.trim(password) == "") {
		btn_alertDialog('提示','请输入当前密码')
		return ;
	}
	
	var newpassword = $("#newpassword").val();
	if (newpassword==null || $.trim(newpassword) == "") {
		btn_alertDialog('提示','请输入新密码')
		return ;
	}
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(newpassword)){
		btn_alertDialog('提示','密码格式不正确，必须由6到16位字母和数字组成')
		return ;
	}
	if(newpassword.match(/^[0-9]*$/) || newpassword.match(/^[A-Za-z]+$/)) {
		btn_alertDialog('提示','密码格式不正确，必须由6到16位字母和数字组成')
		return ;
	}
	
	var repassword = $("#repassword").val();
	if (repassword==null || $.trim(repassword) == "") {
		btn_alertDialog('提示','请输入确认密码')
		return ;
	}
	
	if (repassword != newpassword) {
		btn_alertDialog('提示','密码不一致，请重新输入')
		return ;
	}
	
	var usercode = $("#usercode").val();
	var msgcode = $("#msgCode").val();
	$.ajax({
		url: 'checkMsgCode',
		type: 'post',
		dataType: 'json',
		async: true,
		data: {
			   usercode:usercode,
			   msgcode:msgcode
			   },
		success: function(result){
			if (result) {
            	if(result.code == 0){
            		commitData()
                }else if(result.code == 4){
                	btn_alertDialog("提示",result.msg);
            		countdown = 1;
                }else{
                    btn_alertDialog("提示",result.msg);
                }
			}else{
				btn_alertDialog("提示","验证码错误");
			}
		},
		error: function(){
		}
	})
}