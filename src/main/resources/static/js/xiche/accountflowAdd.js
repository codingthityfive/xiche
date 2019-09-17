
$(function() {
    var dialog = top.dialog.get(window);
    $('.Customers').dblclick(function () {
        quanxianDbclick();
    });
    $("#formSubmit").click(function(){
//        var companyName = $.trim($("#companyName").val());
//        if (companyName==null || $.trim(companyName) == "") {
//            btn_alertDialog("提示","公司名称不能为空");
//            return ;
//        }else {
//            if(companyName.length > 20){
//                btn_alertDialog("提示","公司名称长度不能超过20个汉字");
//                return ;
//            }
//        }
//
//
//        var status = $("#status").val();
//        if (status==null || $.trim(status) == "") {
//            btn_alertDialog("提示","状态不能为空");
//            return ;
//        }
//
//        var provinceId = $("#provinceId").val();
//        if (provinceId==null || $.trim(provinceId) == "") {
//            btn_alertDialog("提示","权限不能为空");
//            return ;
//        }
//        var entId = $.trim($("#entId").val());
//        if(entId != "" || entId != null){
//            if(entId.length > 20){
//                btn_alertDialog("提示","公司时空ID长度不能超过20");
//                return false;
//            }
//        }
//

        $.post("/xiche/saveOrUpdateAccountFlow", $("#saveForm").serialize(), function(result) {
            if (result) {
                if(result.code == 0){
                    alert("保存成功！");
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
    
    $("#projectid").change(function(){
		var projectId = $("#projectid").val();
		if(projectId){
		   $.ajax({
			      type: "GET",      //data 传送数据类型。post 传递
			      dataType: 'json',  // 返回数据的数据类型text
			      url:  '/xiche/getOneProjectById',
			      cache: false,      
			      data: {
			    	     id:projectId
			    	     },  //传送的数据
			      async: false,
			      error:function(){
			         alert("查询失败");
			      },
			      success: function (ret) {
			    	  console.log(ret);
			    	  if(ret!=null){
			    		  if(ret.code=="0"){
			    			  if(ret.result){
			    				  console.log("+++++++++++++");
			    				  var type = ret.result.type
			    				  if(type == 2){//积分取积分
			    					  $("#balance").val(ret.result.point);
			    				  }else{
			    					  $("#balance").val(ret.result.price);
			    				  }
			    			  }else{
			    				  alert("没有查询结果");
			    			  }
			    		  }else{
			    			  $("#balance").val("");
			    			  alert(ret.msg);
			    		  }
			    	  }
			      }
			})
		}else{
			alert("选择项目");
		}
	})
});