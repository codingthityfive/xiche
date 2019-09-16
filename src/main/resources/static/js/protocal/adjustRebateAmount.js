$(function(){
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
        confirmDialog("提示","确定提交?",submitForm);
    });
    $("#pageclose").click(function () {
    	dialog.remove();
    });
    

    $("#adjustAmountNotes").keyup(function () {
        var length = 500;
        var currlength = $("#adjustAmountNotes").val().length;
        if(currlength < 500){
            $("#count_length").html('已输入'+currlength +'字,剩余'+(length - currlength)+'字');
        }else {
            $("#count_length").html('<span style="color: red">已输入'+currlength +'字,超出'+(currlength -length)+'字</span>');
        }
    });
	function submitForm(){
		var adjustRebateAmount = $("#adjustRebateAmount").val();
		var adjustAmountNotes = $("#adjustAmountNotes").val();
		var proNo = $("#proNo").val();
       	 if(adjustRebateAmount.replace(/(^s*)|(s*$)/g, "").length ==0){
       		 btn_alertDialog("提示","调整后的金额不能为空!");
           	 return false;
       	 }
		
		if(adjustAmountNotes.length>500){
			btn_alertDialog("提示","备注字数超出500，请修改");
			return false;
		}else if(adjustAmountNotes.replace(/(^s*)|(s*$)/g, "").length ==0){
			btn_alertDialog("提示","备注不能为空!");
			return false;
		}
		
		//父dialog
//		var dialog = parent.dialog.get(window);
//		dialog.close(obj).remove();
		//将页面获取的纸质编号和备注放到预览，也就是修改的页面，以便提交
		$.ajax({
			url: basePath + '/pro/saveAdjustRebateAmount',
			async:false,
			data:{"adjustRebateAmount":adjustRebateAmount,"adjustAmountNotes":adjustAmountNotes,"proNo":proNo},
			timeout:6000,
			dataType:'json',
			contentType:"application/json",
	        beforeSend: function (xhr) {
	           
	        },
	        success: function (data) {
	          if(data.code == 0){
	          	  dialog.close();
	              dialog.remove();
	              btn_alertDialog("提示","修改成功!");
	          }else {
	              btn_alertDialog("提示","修改失败");
	          }
	        },
	        error: function (data) {
	          btn_alertDialog("提示",textStatus);
	        },
		});
	};		
});