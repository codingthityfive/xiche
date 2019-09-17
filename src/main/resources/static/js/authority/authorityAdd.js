$(function() {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		var user = getChangjia();
		if(user == undefined){
		    return ;
	    }
		var result = callAjax("saveOrUpdateSpSysUser",user);
		if(result.code == 0){
	        btn_alertDialog("提示",result.msg);
			dialog.close().remove();
	        // window.parent.location.reload();
		}else{
	        btn_alertDialog("提示",result.msg);
		}
	});

	/**
	 * 返回user对象
	 * @returns
	 */
	function getChangjia(){
		var user = {};
	    var id = $("#id").val();
		var userName = $.trim($("input[name='userName']").val());
		var department = $.trim($("input[name='department']").val());
		var mobile = $.trim($("input[name='mobile']").val());
		var accountNumber = $.trim($("input[name='accountNumber']").val());
		var isManager = $.trim($("input[name='isManager']:checked ").val());
		var roleIds = $.trim($("#roleIds").val());

	    if(userName == '' || userName == null){
	        btn_alertDialog("提示","请填写姓名！");
	        return;
	    }
	    if(department == '' || department == null){
	        btn_alertDialog("提示","请填写部门！");
	        return;
	    }
		if(mobile == '' || mobile == null){
	        btn_alertDialog("提示","请填写手机号码！");
			return;
		}
	    var flag = isPhoneAvailable(mobile);//校验手机号码
	    if (!flag){
	        return ;
	    }
	    if (roleIds == null || roleIds == '') {
	    	btn_alertDialog("提示","请选择角色！");
			return;
	    }
	    var companyId = $("#companyId").val();
		if (companyId == null ||  companyId == '') {
			btn_alertDialog("提示","请选择分公司！");
			return;
		}
	    user.id = id;
		user.userName = userName;
		user.department = department;
		user.mobile = mobile;
		user.accountNumber = accountNumber;
		user.isManager = isManager;
		user.roleIds = roleIds;
		user.companyId = companyId;
		return user;
	}

	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
});




function callAjax(url,object) {
    var result;
    $.ajax({
        url: url,
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: JSON.stringify(object),
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        contentType: "application/json",
        beforeSend: function (xhr) {
            //console.log(xhr)
            //console.log('发送前');
        },
        success: function (data, xtStatus, jqXHR) {
            result = data;
        },
        error: function (xhr, textStatus) {
            btn_alertDialog("提示",textStatus);
        },
        complete: function () {
            //console.log('结束')
        }
    });
    return result;
};

/**
 * 离焦事件
 */
$("#mobile").blur(function () {
	$("#accountNumber").val($("#mobile").val());
});





/**
 * 验证手机号码
 * @param str
 * @returns
 */
function isPhoneAvailable(str) {  
    var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
        btn_alertDialog("提示",'请输入有效的手机号码！');
        return false;  
    } else {  
        return true;  
    }  
}  

/**
 * 验证邮箱
 * @param str
 * @returns
 */
function isEmailAvailable(str) {  
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(str)){
        btn_alertDialog("提示",'请输入有效的E_mail！');
         return false;
    }else {  
		return true;  
	}  
}  


$(function() {
    //角色
    $('#roles').dblclick(function () {
    	roleDbclick();
    })
})

//选择角色
function roleDbclick() {
	top.dialog({
		url: basePath+'/sysrole/userRolesManage',
		title: '角色',
		width:700,
    	height:470,
    	data: {roleIds:$("#roleIds").val()}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#roleIds").val(data.roleIds);
				$("#roles").val(data.roleName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}



$(function() {
    //选择分公司
    $('#companyName').dblclick(function () {
    	checkCompany();
    })
})

//选择分公司
function checkCompany() {
	top.dialog({
		url: basePath+'/company/checkCompany',
		title: '选择分公司',
		width:800,
    	height:600,
    	data: {companyIds:$("#companyId").val()}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#companyId").val(data.companyId);
				$("#companyName").val(data.companyName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}