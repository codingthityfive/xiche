//添加框弹出事件 新增

$(function(){
	$("#exportExcel").click(function () {
		if($("#startDate").val() != null && $("#startDate").val() != ''&& $("#endDate").val() != null && $("#endDate").val() != ''){
			console.info($("#startDate").val());
			var startTime = new Date($("#startDate").val() ).getTime();
			var endTime = new Date($("#endDate").val()).getTime();
			if(startTime > endTime){
				btn_alertDialog("提示","开始时间不能大于结束时间");
				return false;
			}
			window.location.href= basePath+"/changjia/export?strDate="+$("#startDate").val()+"&endDate="+$("#endDate").val()+"&type="+$("#type").val();
		}else{
			btn_alertDialog("提示","日期不能为空");
		}
	});
	var dialog = top.dialog.get(window);
});
	