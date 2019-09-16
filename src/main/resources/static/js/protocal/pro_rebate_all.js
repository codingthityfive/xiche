if ($('#wetherSame').prop('checked')) {
	$('#taskStandard').attr("disabled","disabled");
}

//克隆div内的内容用于扩展
var rebateSetItemDivHTML = $($("div[name='rebateSetItem']")[0]).prop("outerHTML");
//全品返利规递加
$("#addRebateSetItem").click(function() {
	var len = $('div[name="rebateSetItem"]').length;
	if (len >=6) {
		btn_alertDialog("提示","阶梯返利规则最多配置6条");
		return;
	} 
	$("#rebateSetItemDiv").append(rebateSetItemDivHTML);
	if($("#rebateId").val()) {
		//如果是修改，清空所有元素的值
		var newDiv = $('div[name="rebateSetItem"]')[len];
		$(newDiv).find('input[name="setAmount"]').val("");
		$(newDiv).find('select[name="setUnit"]').val("1");
		$(newDiv).find('input[name="rebateAmount"]').val("");
		$(newDiv).find('select[name="rebateUnit"]').val("1");
		$(newDiv).find('input[name="taskAmount"]').val(0);
		$(newDiv).find('select[name="taskUnit"]').val("2");
		$(newDiv).find('input[name="surpassAmount"]').val(0);
		$(newDiv).find('input[name="surpassAmount"]').attr("readonly","readonly");
		$(newDiv).find('select[name="surpassUnit"]').val("2");
	}
	$("#subRebateSetItem").show();
});
//全品返利规递减
$("#subRebateSetItem").click(function(){
	var len = $('div[name="rebateSetItem"]').length;
	$('div[name="rebateSetItem"]')[len-1].remove();
	if ($('div[name="rebateSetItem"]').length <=1) {
		$("#subRebateSetItem").hide();
	}
});


//控销区域设置的显示和隐藏
$("#whetherArea").click(function(){ 
	var val = $(this).prop("checked");  
	if(val){
		$("#dicSet").show();
	}else{
		$("#dicSet").hide();
	}
});

//客户类型的显示和隐藏 
$("#whetherCustomerType").click(function(){ 
	var val = $(this).prop("checked");  
	if(val){
		$("#customSet").show();
		//显示
		var len = $("#customSet").find("table table tbody tr").length;
		if(len == 0){
			var cus = getCustomTypes();
			//先清空
			$("#customSet").find(".custable tbody").html("");
			$("#customSet").find(".custable tbody").append(cus);
		}
	}else{
		$("#customSet").hide();
	}
});


/**
 * 添加新的控销区域条目
 */
$(".addRebateDic").click(function(){
	var dicId = currDicId;
	var dicName = currDicName;
	var citys = getNextDic(dicId);
	var len = $(this).parents("div[name='top']").find(".dictable tbody tr").length;
	var dicHtml = '<tr class="dicLine">'+
			'<td><span class="sortCode">'+(len+1)+'</span></td>'+
			'<td>返利范围</td>'+
			'<td>'+
				'<select class="province">'+
					'<option value="'+dicId+'">'+dicName+'</option>'+
				'</select>'+
			'</td>'+
			'<td>'+
				'<select class="city">'+
					citys + 
				'</select>'+
			'</td>'+
			'<td>'+
				'<select class="area">'+
					'<option value="">请选择区</option>'+
				'</select>'+
			'</td>'+
			'<td><input type="checkbox" class="scope"/></td>'+
			'</tr>';
	var body = $(this).parents("div[name='top']").find(".dictable tbody");
	body.append(dicHtml);
});

/**
 * 根据市,显示区
 */
$("#dicSet").on("change",".city",function(){
	var val = $(this).val();
	if (val && val>0) {
		var areas = getNextDic(val);
		$(this).parents(".dicLine").find(".area").html(areas);
	}
});

$("#dicSet").on("click",".city",function(){
	var city = $(this).val();
	//如果是修改的才执行
	if($("#rebateId").val() && city && city > 0) {
		//根据省份取市
		var province = $(this).parents(".dicLine").find(".province").val();
		var area = $(this).parents(".dicLine").find(".area").val();
		var citys = getNextDic(province);
		$(this).parents(".dicLine").find(".city").html(citys);
		$(this).parents(".dicLine").find(".city").val(city);
		var areas = getNextDic(city);
		$(this).parents(".dicLine").find(".area").html(areas);
		$(this).parents(".dicLine").find(".area").val(area);
	}
});

/**
 * 选择区
 */
$("#dicSet").on("change",".area",function(){
	var sortCode = $(this).parents(".dicLine").find(".sortCode").text();
	var area = this;
	var val = $(this).val();
	var dics = $(this).parents(".dictable").find("tbody tr").length;
	if(dics>1){
		$(this).parents(".dictable").find("tbody tr").each(function(){
			var currSortCode = $(this).find(".sortCode").text();
			if(sortCode != currSortCode){
				var dic = $(this).find(".area").val();
				if(val==dic){
					btn_alertDialog("提示","您选择的区域重复!");
					$(area).val("");
					return;
				}
			}
		});
	}
});

//修改触发
$("#dicSet").on("click",".area",function(){
	var area = $(this).val();
	var city = $(this).parents(".dicLine").find(".city").val();
	//如果是修改的才执行
	if($("#rebateId").val() && city && city > 0) {
		//根据省份取市
		var province = $(this).parents(".dicLine").find(".province").val();
		var citys = getNextDic(province);
		$(this).parents(".dicLine").find(".city").html(citys);
		$(this).parents(".dicLine").find(".city").val(city);
		var areas = getNextDic(city);
		$(this).parents(".dicLine").find(".area").html(areas);
		$(this).parents(".dicLine").find(".area").val(area);
	}
})
/**
 * 删除控销区域条目
 */
$(".delRebateDic").click(function(){
	var len = $(this).parents("div[name='top']").find(".dictable tbody tr").length; 
	if(len==0){
		btn_alertDialog("提示","没有要删除的区域!");
		return;
	}
	var checkedLen = 0;
	$(this).parents("div[name='top']").find(".dictable tbody tr").each(function(){
		var res = $(this).find(".scope").prop("checked");
		if(res){
			checkedLen = checkedLen + 1;
			$(this).remove();
		}
	});
	if(checkedLen == 0){
		btn_alertDialog("提示","没有要删除的区域!");
		return;
	}
	
	//重排序
	len = $(this).parents("div[name='top']").find(".dictable tbody tr").length;
	if(len>0){
		$(this).parents("div[name='top']").find(".dictable tbody tr").each(function(i){
			$(this).find(".sortCode").text(i+1);
		});
	}
});

//任务量标准同返利标准
$("#wetherSame").click(function(){
	if ($('#wetherSame').prop('checked')) {
		$("#taskStandard").val($("#rebateStandard").val());
		$('#taskStandard').attr("disabled","disabled");
	}else{
		$('#taskStandard').removeAttr("disabled");
	}
});

$("#rebateStandard").change(function(){
	if ($('#wetherSame').prop('checked')) {
		$("#taskStandard").val($("#rebateStandard").val());
	}
	var rebateStandard = $(this).val();
	if (rebateStandard == 1 || rebateStandard == 2) {
		$("#rebatePriceDiv").show();
	} else {
		$("#rebatePriceDiv").hide();
	}
	
	if (rebateStandard != 2) {
		$("#rebateComputeRule").val(1);
	}
});

$("#rebateComputeRule").change(function(){
	var rebateStandard = $("#rebateStandard").val();
	var val = $(this).val();
	if (rebateStandard != 1 && val != 1) {
		btn_alertDialog("提示","返利标准选择购进或付款金额，返利计算规则只能汇总计算");
		$(this).val(1);
	}
})


//返利规则输入验证
function clearSetAmount(obj) {
	var setUnit = $(obj).parents("div[name='rebateSetItem']").find("select[name='setUnit']").val();
	if (setUnit == 2) {
		clearNoNum(obj,5);
	} else {
		clearNoNum(obj);
	}
}
$("#rebateSetItemDiv").on("change","select[name='setUnit']",function(){
	//返利标准
	var rebateStandard = $("#rebateStandard").val();
	var setUnit = $(this).val();
	if (rebateStandard == 3 && setUnit != 2) {
		btn_alertDialog("提示","返利标准选择付款金额时，返利规则单位只能是元");
		$(this).val(2);
		return;
	} else if (rebateStandard == 2 && setUnit == 3){
		btn_alertDialog("提示","当返利标准选择购进时，返利规则或任务量单位不能为铺点");
		$(this).val(2);
		return;
	}
	var setAmount = $(this).parents("div[name='rebateSetItem']").find("input[name='setAmount']");
	if ($(setAmount).val()) {
		clearSetAmount($(setAmount)[0]);
	}
});

function clearRebateAmount(obj) {
	var rebateUnit = $(obj).parents("div[name='rebateSetItem']").find("select[name='rebateUnit']").val();
	if (rebateUnit == 2) {
		clearNoNum(obj,5);
	} else if (rebateUnit == 1) {
		clearNoNum(obj);
	} else if (rebateUnit == 3) {
		clearNoNum(obj,3);
	}
}
$("#rebateSetItemDiv").on("change","select[name='rebateUnit']",function () {
	var setUnit = $(this).parents("div[name='rebateSetItem']").find("select[name='setUnit']").val();
	var rebateUnit = $(this).val();
	if (setUnit == 3 && rebateUnit !=2) {
		btn_alertDialog("提示","当返利规则为铺点时，返利单位只能是元");
		$(this).val(2);
		return;
	}
	var rebateAmount = $(this).parents("div[name='rebateSetItem']").find("input[name='rebateAmount']");
	if ($(rebateAmount).val()) {
		clearRebateAmount($(rebateAmount)[0]);
	}
})

//任务量输入限制
function cleaTaskAmount(obj) {
	var taskUnit = $(obj).parents("div[name='rebateSetItem']").find("select[name='taskUnit']").val();
	if (taskUnit == 2) {
		clearNoNum(obj,5);
	} else {
		clearNoNum(obj);
	}
	
	//当“任务量”值为空或是0.该字段无法编辑
	var taskAmount = $(obj).val();
	if (!taskAmount || taskAmount==0) {
		$(obj).parents("div[name='rebateSetItem']").find("input[name='surpassAmount']").attr("readonly","readonly");
	}else{
		$(obj).parents("div[name='rebateSetItem']").find("input[name='surpassAmount']").removeAttr("readonly");
	}
}

$("#rebateSetItemDiv").on("change","select[name='taskUnit']",function() {
	var taskAmount = $(this).parents("div[name='rebateSetItem']").find("input[name='taskAmount']");
	if ($(taskAmount).val()) {
		cleaTaskAmount($(taskAmount)[0]);
	}
})

function cleaSurpassAmount(obj) {
	var surpassUnit = $(obj).parents("div[name='rebateSetItem']").find("select[name='surpassUnit']").val();
	if (surpassUnit == 1) {
		clearNoNum(obj);
	} else if (surpassUnit == 2) {
		clearNoNum(obj,5);
	} else if(surpassUnit == 3) {
		clearNoNum(obj,3);
	}
}

$("#rebateSetItemDiv").on("change","select[name='surpassUnit']",function() {
	var surpassAmount = $(this).parents("div[name='rebateSetItem']").find("input[name='surpassAmount']");
	if ($(surpassAmount).val()) {
		cleaSurpassAmount($(surpassAmount)[0]);
	}
})

