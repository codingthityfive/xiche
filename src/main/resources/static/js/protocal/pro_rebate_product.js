//克隆div内的内容用于扩展
var taskItemDivHTML = $($("div[name='taskItem']")[0]).prop("outerHTML");
$("#addTaskItem").click(function() {
	var len = $('div[name="taskItem"]').length;
	if (len >=6) {
		btn_alertDialog("提示","阶梯返利规则最多配置6条");
		return;
	} 
	$("#taskDiv").append(taskItemDivHTML);
	if($("#rebateId").val()) {
		//如果是修改，清空所有元素的值
		var newDiv = $('div[name="taskItem"]')[len];
		$(newDiv).find("input[name='taskAmount']").val(0);
		$(newDiv).find("select[name='taskUnit']").val("2");
		$(newDiv).find("input[name='surpassAmount']").val(0);
		$(newDiv).find("input[name='surpassAmount']").attr("readonly","readonly");
		$(newDiv).find("select[name='surpassUnit']").val("2");
	}
	$("#subTaskItem").show();
});
//任务量规递减
$("#subTaskItem").click(function(){
	var len = $('div[name="taskItem"]').length;
	$('div[name="taskItem"]')[len-1].remove();
	if ($('div[name="taskItem"]').length <=1) {
		$("#subTaskItem").hide();
	}
});

//返利规则设置
//克隆div内的内容用于扩展
var productRebateSetItemDivHTML = $('div[name="productRebateSetItemDiv"]').html();
//如果是修改页面，只取第一个内容
if($("#rebateId").val()) {
	productRebateSetItemDivHTML = $($('div[name="productRebateSetItem"]')[0]).prop("outerHTML");
}
//全品返利规递加
$("#productWholeDiv").on("click",'div[name="addProductRebateSetItem"]',function(){
	//找查其所在的div
	var productRebateSetItemDiv = $(this).parents('div[name="top"]').find('div[name="productRebateSetItemDiv"]'); 
	var len = $(productRebateSetItemDiv).children('div[name="productRebateSetItem"]').length;

	if (len >=6) {
		btn_alertDialog("提示","阶梯返利规则最多配置6条");
		return;
	}
	$(productRebateSetItemDiv).append(productRebateSetItemDivHTML);
	//如果是修改页面，清除一些内容
	if($("#rebateId").val()) {
		var newDiv = $(productRebateSetItemDiv).find('div[name="productRebateSetItem"]')[len];
		//清空设置项
		$(newDiv).find("input[name='setAmount']").val("");
		$(newDiv).find("input[select='setUnit']").val("1");
		$(newDiv).find("input[name='rebateAmount']").val("");
		$(newDiv).find("input[select='rebateUnit']").val("1");
	}
	$(this).next().children('span[name="subProductRebateSetItem"]').show();


});
//全品返利规递减
$("#productWholeDiv").on("click",'span[name="subProductRebateSetItem"]',function(){  
	//找查其所在的div
	var productRebateSetItemDiv = $(this).parents('div[name="top"]').find('div[name="productRebateSetItemDiv"]'); 
	var len = productRebateSetItemDiv.children('div[name="productRebateSetItem"]').length;
	productRebateSetItemDiv.children('div[name="productRebateSetItem"]')[len-1].remove();
	if (productRebateSetItemDiv.children('div[name="productRebateSetItem"]').length <=1) {
		$(this).hide();
	}
});

//克隆表单区域所有内容
var productWholeDivHTML = $($("div[name='productSetItemDiv']")[0]).prop("outerHTML"); 
//商品表单增加
$("#productWholeDiv").on("click","span[name='addForm']",function(){
	var len = $("#productWholeDiv").children('div[name="productSetItemDiv"]').length; 
	//修改单选按钮的名称
	var appendHtml = productWholeDivHTML.replace(/ladderComputeType0/ig,"ladderComputeType"+len)
	appendHtml = appendHtml.replace(/listType0/ig,"listType"+len)
	$("#productWholeDiv").append(appendHtml);
	//修改所有序号
	$("span[name='sort']").each(function(index,val) {
		$(val).html(index+1);
	});
	
	//如果是修改页面，清除一些内容
	var newDiv = $("#productWholeDiv").children('div[name="productSetItemDiv"]')[len];
	if($("#rebateId").val()) {
		//清空一些设置
		$(newDiv).find("select[name='rebateStandard']").val("");
		//商品清空、区域选择清空
		$(newDiv).find("table tbody").html("");
		//清空设置项
		$(newDiv).find("div[name='productRebateSetItemDiv']").html(productRebateSetItemDivHTML);
		$(newDiv).find("input[name='setAmount']").val("");
		$(newDiv).find("input[select='setUnit']").val("2");
		$(newDiv).find("input[name='rebateAmount']").val("");
		$(newDiv).find("input[select='rebateUnit']").val("2");
		//隐藏删除减号
		$(newDiv).find("span[name='subProductRebateSetItem']").hide();
		//默认设置默认黑名单
		$("input[name^='listType'][value='2']").attr("checked",true);
		$(newDiv).find("input[name='whetherArea']").attr("checked",false);
		$(newDiv).find("input[name='whetherCustomerType']").attr("checked",false);
		$(newDiv).find("div[name='customSet']").hide();
		$(newDiv).find("div[name='dicSet']").hide();
	}
	//返利标准和返利计算单价设置为不可读，并且设置成和表单一的值一致
	$(newDiv).find("select[name='rebateStandard']").val($($("select[name='rebateStandard']")[0]).val());
	$(newDiv).find("select[name='rebatePrice']").val($($("select[name='rebatePrice']")[0]).val());
	$(newDiv).find("select[name='rebateStandard']").attr('disabled', true);
	$(newDiv).find("select[name='rebatePrice']").attr('disabled', true);
	//如果是付款金额，设置返利计算单价为隐藏
	if ($($("select[name='rebateStandard']")[0]).val() == 3) {
		$(newDiv).find("div[name='rebatePriceDiv']").css("visibility","hidden");
	}
});


//同步修改所有返利标准
$("#productWholeDiv").on("change","select[name='rebateStandard']",function(){
	 var val = $(this).val();
	 $("select[name='rebateStandard']").each(function(idx,obj){
		 $(obj).val(val);
	 });
	 if (val == 1 || val == 2) {
		 $("div[name='rebatePriceDiv']").each(function(idx,obj){
			 $(obj).css("visibility","visible");
		 });
	 } else {
		 $("div[name='rebatePriceDiv']").each(function(idx,obj){
			 $(obj).css("visibility","hidden");
		 });
	 }
	 
	 //同步修改所有返利计算规则
	 if (val != 2) {
		 $("select[name='rebateComputeRule']").each(function(idx,obj){
			 $(obj).val(1);
		 });
	 }
});

$("#productWholeDiv").on("change","select[name='rebateComputeRule']",function(){
	var val = $(this).val();
	var rebateStandard = $(this).parents("div[name='productSetItemDiv']").find("select[name='rebateStandard']").val();
	if (rebateStandard != 1 && val != 1) {
		btn_alertDialog("提示","返利标准选择购进或付款金额，返利计算规则只能汇总计算");
		$(this).val(1);
	}
});

//同步修改所有返利计算单价
$("#productWholeDiv").on("change","select[name='rebatePrice']",function(){
	var val = $(this).val();
	$("select[name='rebatePrice']").each(function(idx,obj){
		 $(obj).val(val);
	 });
});

//商品表单减
$("#productWholeDiv").on("click","span[name='delForm']",function(){
	var len = $("#productWholeDiv").children('div[name="productSetItemDiv"]').length; 
	if(len <=1 ){
		 btn_alertDialog("提示","仅剩一个商品表单不能删除!");
		 return;
	}
	$(this).parents("div[name='productSetItemDiv']").remove();
	//修改所有序号
	$("span[name='sort']").each(function(index,val) {
		$(val).html(index+1);
	});
	
	//修改黑白名单类型name属性
	$("div[name='listTypeDiv']").each(function(index,div) {
		$(div).find("input[name^='listType']").attr("name","listType"+index);
	});
	//修改阶梯条件计算方式的name属性
	$("div[name='ladderComputeTypeDiv']").each(function(index,div) {
		$(div).find("input[name^='ladderComputeType']").attr("name","ladderComputeType"+index);
	});
});


//控销区域设置的显示和隐藏
$("#productWholeDiv").on("click","input[name='whetherArea']",function(){ 
	var val = $(this).prop("checked"); 
	var dicSet = $(this).parents('div[name="top"]').find('div[name="dicSet"]'); 
	if(val){
		dicSet.show();
	}else{
		dicSet.hide();
	}
});
//客户类型的显示和隐藏 
$("#productWholeDiv").on("click","input[name='whetherCustomerType']",function(){ 
	var val = $(this).prop("checked"); 
	var dicSet = $(this).parents('div[name="top"]').find('div[name="customSet"]'); 
	if(val){
		dicSet.show();
		//显示
		var len = dicSet.find(".custypes tbody tr").length;
		if(len == 0){
			var cus = getCustomTypes();
			//先清空
			dicSet.find(".custable tbody").html("");
			dicSet.find(".custable tbody").append(cus);
		}
	}else{
		dicSet.hide();
	}
});


/**
 * 添加商品弹框
 * 获取商品
 */
//记录当前操作的表单
var currProductFormDiv;
//已存在的商品编号
$("#productWholeDiv").on("click","input[name='addProducts']",function(){
	//先获取所有供销的商品id
	var goodsLen = 0;
	//如果是全品
	if ($("#whole").prop('checked')) {
		goodsLen = 1;
	} else {
		if ($(".goodsId") && $(".goodsId").length>0) {
			goodsLen = 1;
		}
	}
	if (goodsLen == 0) {
		btn_alertDialog('提示','请先配置协议供销条款的商品表单');
		return;
	}
	//收集所有已选择的商品productId+code，用于去重验证
	var checkedProductId = [];
	if($('tr[id^="rebateP_"]') && $('tr[id^="rebateP_"]').length>0) {
		for (var i=0;i<$('tr[id^="rebateP_"]').length;i++) {
			var tr = $('tr[id^="rebateP_"]')[i];
			checkedProductId.push($.trim($(tr).find(".rebateProductId").text())+$.trim($(tr).find(".rebateProductNo").text()));
		}
	}
	//确定当前操作的div
	currProductFormDiv = $(this).parents("div[name='productFormDiv']");
	//如果供销协议是非全类商品，则去查后台商品
	if ($("#whole").prop('checked')) {
		top.dialog({
			url: basePath+'/currency/rebateProduct?firstPartyType='+$("#firstPartyType").val(),
			title: '商品列表',
			width:900,
	    	height:600,
			data: {firstPartyType:$("#firstPartyType").val(),manufacturer:$("#firstPartyName").val()}, // 给modal 要传递的 的数据
			onclose: function() {
				var data = this.returnValue;
				if (data) {
					if (data.code == "success") {
						//拼接商品
						var products = data.products;
						var tbody = $(currProductFormDiv).find("table tbody");
						for (var i=0; i<products.length;i++) {
							var product = products[i];
							//重复判断
							if($.inArray(product.productId+product.goodsCode,checkedProductId)>=0) {
						　　　	btn_alertDialog('提示','【'+product.goodsName+'】同款商品已经存在，请勿重复选择');
								continue;
						　　   }
							checkedProductId.push(product.productId+product.goodsCode);
							var sort = $(tbody).find("tr").length+1;
							var tr = '<tr id="rebateP_'+product.productId+'"><td><input type="checkbox" class="choose"/><span class="sortCode">'
							+sort+'</span></td><td class="rebateProductId">'+product.productId+ '</td><td class="rebateProductNo">'+product.goodsCode+'</td><td>'+product.goodsName+'</td><td>'
							+product.goodsSpec+'</td><td>'+product.manufacturer+'</td><td>'
							+product.pinpaichangjia+'</td></tr>';
							tbody.append(tr);
						}
					} else {
						btn_alertDialog('提示',data.msg);
					}
				}
			},
			oniframeload: function() {
			}
		}).showModal();
	}else{//如果供销协议是分类设置，直接取页面上商品数据
		var supplyProductList = [];
		var supplyGoodsTrList = $(".supplyGoodsTr");
		for (var i=0;i<supplyGoodsTrList.length;i++) {
			var supplyProduct = {};
			var tr = $(supplyGoodsTrList[i]);
			supplyProduct.productId = $(tr).find(".goodsId").val();
			supplyProduct.goodsCode = $.trim($(tr).find(".goodsCode").text());
			supplyProduct.productKey = supplyProduct.productId + supplyProduct.goodsCode;
			supplyProduct.goodsName = $.trim($(tr).find(".goodsName").text());
			supplyProduct.goodsSpec  = $.trim($(tr).find(".goodsSpec").text());
			supplyProduct.manufacturer = $.trim($(tr).find(".goodsProduce").text());
			supplyProduct.pinpaichangjia = $(tr).find(".pinpaichangjia").val();
			supplyProductList.push(supplyProduct);
		}
		top.dialog({
			url: basePath+'/currency/rebateProductNoPage',
			title: '商品列表',
			width:900,
	    	height:600,
			data: {supplyProductList:supplyProductList}, // 给modal 要传递的 的数据
			onclose: function() {
				var data = this.returnValue;
				if (data) {
					if (data.code == "success") {
						//拼接商品
						var products = data.products;
						var tbody = $(currProductFormDiv).find("table tbody");
						for (var i=0; i<products.length;i++) {
							var product = products[i];
							//重复判断
							if($.inArray(product.productId+product.goodsCode,checkedProductId)>=0) {
						　　　	btn_alertDialog('提示','【'+product.goodsName+'】同款商品已经存在，请勿重复选择');
								continue;
						　　   }
							checkedProductId.push(product.productId+product.goodsCode);
							var sort = $(tbody).find("tr").length+1;
							var tr = '<tr id="rebateP_'+product.productId+'"><td><input type="checkbox" class="choose"/><span class="sortCode">'
							+sort+'</span></td><td class="rebateProductId">'+product.productId+ '</td><td class="rebateProductNo">'+product.goodsCode+'</td><td>'+product.goodsName+'</td><td>'
							+product.goodsSpec+'</td><td>'+product.manufacturer+'</td><td>'
							+product.pinpaichangjia+'</td></tr>';
							tbody.append(tr);
						}
					} else {
						btn_alertDialog('提示',data.msg);
					}
				}
			},
			oniframeload: function() {
			}
		}).showModal();
		
	}
	
	
});

 //删除商品
$("#productWholeDiv").on("click","input[name='delProducts']",function(){
	//确定当前操作的div
	currProductFormDiv = $(this).parents("div[name='productFormDiv']");
	var len = 0;
	currProductFormDiv.find("table tbody tr").each(function(){
		var check = $(this).children().find(".choose").prop("checked");
		if(check){
			len = len + 1;
			$(this).remove();
		}
	});
	
	if (len == 0) {
		btn_alertDialog("提示","请选择删除的商品!");
		return;
	}
	
	//商品序号重排序
	currProductFormDiv.find("table tbody tr").each(function(i){
		$(this).find(".sortCode").text(i+1);
	});
	
	//如果当前表单都删除完了,则就将表头的几个复选框都置为不选
	lenth = currProductFormDiv.find("tbody tr").length;
	if(lenth == 0){
		currProductFormDiv.find(".topChoose").prop("checked",false); 
	}
});

/**
 * 全部选中(取消选中)
 */
$("#productWholeDiv").on("click",".topChoose",function(){
	var val = $(this).prop("checked");
	$(this).parents(".resTable").find("tbody tr").each(function(){
		$(this).find(".choose").prop("checked",val);
	});
});
/**
 * 添加新的控销区域条目
 */
$("#productWholeDiv").on("click",".addRebateDic",function(){
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
					'<option value="0">请选择</option>'+
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
$("#productWholeDiv").on("change",".city",function(){
	var val = $(this).val();
	if (val && val>0) {
		var areas = getNextDic(val);
		$(this).parents(".dicLine").find(".area").html(areas);
	}
	
});

$("#productWholeDiv").on("click",".city",function(){
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
$("#productWholeDiv").on("change",".area",function(){
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
$("#productWholeDiv").on("click",".area",function(){
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
$("#productWholeDiv").on("click",".delRebateDic",function(){
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



//返利规则输入验证
function clearSetAmount(obj) {
	var setUnit = $(obj).parents("div[name='productRebateSetItem']").find("select[name='setUnit']").val();
	if (setUnit == 2) {
		clearNoNum(obj,5);
	} else {
		clearNoNum(obj);
	}
}
$("#productWholeDiv").on("change","select[name='setUnit']",function(){
	//返利标准
	var rebateStandard = $(this).parents("div[name='productSetItemDiv']").find("select[name='rebateStandard']").val();
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
	var setAmount = $(this).parents("div[name='productRebateSetItem']").find("input[name='setAmount']");
	if ($(setAmount).val()) {
		clearSetAmount($(setAmount)[0]);
	}
});

function clearRebateAmount(obj) {
	var rebateUnit = $(obj).parents("div[name='productRebateSetItem']").find("select[name='rebateUnit']").val();
	if (rebateUnit == 2) {
		clearNoNum(obj,5);
	} else if (rebateUnit == 1) {
		clearNoNum(obj);
	} else if (rebateUnit == 3) {
		clearNoNum(obj,3);
	}
}
$("#productWholeDiv").on("change","select[name='rebateUnit']",function () {
	var setUnit = $(this).parents("div[name='productRebateSetItem']").find("select[name='setUnit']").val();
	var rebateUnit = $(this).val();
	if (setUnit == 3 && rebateUnit !=2) {
		btn_alertDialog("提示","当返利规则为铺点时，返利单位只能是元");
		$(this).val(2);
		return;
	}
	var rebateAmount = $(this).parents("div[name='productRebateSetItem']").find("input[name='rebateAmount']");
	if ($(rebateAmount).val()) {
		clearRebateAmount($(rebateAmount)[0]);
	}
})

//任务量输入限制
function cleaTaskAmount(obj) {
	var taskUnit = $(obj).parents("div[name='taskItem']").find("select[name='taskUnit']").val();
	if (taskUnit == 2) {
		clearNoNum(obj,5);
	} else {
		clearNoNum(obj);
	}
	
	//当“任务量”值为空或是0.该字段无法编辑
	var taskAmount = $(obj).val();
	if (!taskAmount || taskAmount==0) {
		$(obj).parents("div[name='taskItem']").find("input[name='surpassAmount']").attr("readonly","readonly");
	}else{
		$(obj).parents("div[name='taskItem']").find("input[name='surpassAmount']").removeAttr("readonly");
	}
}

$("#taskDiv").on("change","select[name='taskUnit']",function() {
	var taskAmount = $(this).parents("div[name='taskItem']").find("input[name='taskAmount']");
	if ($(taskAmount).val()) {
		cleaTaskAmount($(taskAmount)[0])
	}
})

function cleaSurpassAmount(obj) {
	var surpassUnit = $(obj).parents("div[name='taskItem']").find("select[name='surpassUnit']").val();
	if (surpassUnit == 1) {
		clearNoNum(obj);
	} else if (surpassUnit == 2) {
		clearNoNum(obj,5);
	} else if(surpassUnit == 3) {
		clearNoNum(obj,3);
	}
}

$("#taskDiv").on("change","select[name='surpassUnit']",function() {
	var surpassAmount = $(this).parents("div[name='taskItem']").find("input[name='surpassAmount']");
	if ($(surpassAmount).val()) {
		cleaSurpassAmount($(surpassAmount)[0])
	}
})
