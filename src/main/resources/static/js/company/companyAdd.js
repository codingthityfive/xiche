





$(function() {
    var dialog = top.dialog.get(window);
    $('.Customers').dblclick(function () {
        quanxianDbclick();
    });
    $("#formSubmit").click(function(){
        var companyName = $.trim($("#companyName").val());
        if (companyName==null || $.trim(companyName) == "") {
            btn_alertDialog("提示","公司名称不能为空");
            return ;
        }else {
            if(companyName.length > 20){
                btn_alertDialog("提示","公司名称长度不能超过20个汉字");
                return ;
            }
        }


        var status = $("#status").val();
        if (status==null || $.trim(status) == "") {
            btn_alertDialog("提示","状态不能为空");
            return ;
        }

        var provinceId = $("#provinceId").val();
        if (provinceId==null || $.trim(provinceId) == "") {
            btn_alertDialog("提示","权限不能为空");
            return ;
        }
        var entId = $.trim($("#entId").val());
        if(entId != "" || entId != null){
            if(entId.length > 20){
                btn_alertDialog("提示","公司时空ID长度不能超过20");
                return false;
            }
        }


        $.post(basePath+"/company/saveOrUpdate", $("#saveForm").serialize(), function(result) {
            if (result) {
                if(result.code == 0){
                    btn_alertDialog("提示","保存成功！");
                    dialog.close("success");
                    dialog.remove();
                }else{
                    btn_alertDialog("提示",result.msg);
                }
            }
        });
    });
    $("#model_close_btn").click(function () {
        dialog.close().remove();
    })
});



function quanxianDbclick(){
	top.dialog({
		url: 'company/toTree',
		title: '权限范围',
		width:550,
    	height:350,
		data: $('#provinceId').val(), // 给modal 要传递的 的数据
		onclose: function() {
			if(this.returnValue) {
				$('#provinceName').val(this.returnValue.provinceName);
				$('#provinceId').val(this.returnValue.provinceId);
			}
		},
		oniframeload: function() {
			//console.log('iframe ready')
		}
	})
	.showModal();
	return false;
};
