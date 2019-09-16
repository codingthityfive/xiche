//客户类型选择器
$("input[name='clientTypeName']").on("dblclick", function () {
    selectClientType(this);
});

$("input[name='weatherFloor']").click(function () {
	//当“是否底价供货”的值为是时:“返利支付方”、“返利兑付方式”、“返利兑付时间”、“隔XX月兑付”、“其他（非商品）返利”、“其他（非商品）返利方式”、“商品返利规则设置方式”均为不可编辑；
	if ($("#setType").val()) {
		if(confirm('确定放弃当前返利条款编辑内容？')){
		}else{
			$("#weatherFloor1").prop('checked',true);
			return;
		}
	}
	if ($("input[name='weatherFloor']:checked").val()==1) {
		//清空并设置为不可编辑
		$("input[name='payer']").attr('disabled', true);
		$("input[name='payer']").removeAttr('checked');
		$("#assignCompanyName").attr('disabled', true);
		$("#cashType").attr('disabled', true);
		$("#cashNote").attr('disabled', true);
		$("#cashTime").attr('disabled', true);
		$("#cashInterval").attr('disabled', true);
		$("select[name='otherRebateType']").attr('disabled', true);
		$("select[name='otherRebateMethod']").attr('disabled', true);
		$("input[name='amount']").attr('disabled', true);
		$("input[name='includeTax']").attr('disabled', true);
		$("#setType").val("");
		$("#setType").attr('disabled', true);
		$("#otherRebateOperate").hide();
		$("#rebateDiv").html("");
		
	}else{
		$("input[name='payer']").removeAttr('disabled');
		$("#assignCompanyName").removeAttr('disabled', true);
		$("#cashType").removeAttr('disabled');
		$("#cashNote").removeAttr('disabled');
		$("#cashTime").removeAttr('disabled');
		$("#cashInterval").removeAttr('disabled');
		$("select[name='otherRebateType']").removeAttr('disabled');
		$("select[name='otherRebateMethod']").removeAttr('disabled');
		$("input[name='amount']").removeAttr('disabled');
		//$("input[name='includeTax']").removeAttr('disabled');
		$("#otherRebateOperate").show();
		$("#setType").removeAttr('disabled');
	}
});

//指定商业公司
$("#assignCompanyName").on("dblclick", function () { 
	if ($("input[name='payer']:checked").val()!=2) {
		btn_alertDialog("提示","返利支付方要为指定商业公司才能选择");
        return;
	}
    firstPartList("3",this);
});

$("#otherRebateDiv").on("change","select[name='otherRebateMethod']",function () {
	var otherRebateMethod = $(this).val();
	var amountRate = $(this).parents("div[name='otherRebateItem']").find("span[name='amountRate']");
	if (otherRebateMethod == "3") {
		$(amountRate).text("");
	}else{
		$(amountRate).text("%");
	}
	var amount = $(this).parents("div[name='otherRebateItem']").find("input[name='amount']");
	valOtherRebateMethod($(amount)[0]);
});

//验证其他（非商品）返利方式的金额或百分比
function valOtherRebateMethod(obj) {
	var otherRebateMethod = $(obj).parents("div[name='otherRebateItem']").find("select[name='otherRebateMethod']").val();
	if (otherRebateMethod == "3") {
		clearNoNum(obj,5);
	}else{
		clearNoNum(obj,3);
	}
}

//克隆一个模子放这用于追加
var otherRebateDiv = $($("div[name='otherRebateItem']")[0]).prop("outerHTML");
//增加其他（非商品）返利
$("#addOtherRebate").click(function(){
	var len = $('div[name="otherRebateItem"]').length;
	if (len >=3) {
		btn_alertDialog("提示","其他（非商品）返利最多配置3条");
		return;
	}
	$("#otherRebateDiv").append(otherRebateDiv);
	if($("#rebateId").val()) {
		//如果是修改，清空所有元素的值
		var newItem = $('div[name="otherRebateItem"]')[len];
		$(newItem).find("select[name='otherRebateType']").val("1");
		$(newItem).find("select[name='otherRebateMethod']").val("1");
		$(newItem).find("input[name='amount']").val("");
		$(newItem).find("input[name='includeTax']").checked;
	}
	$("#subOtherRebate").show();
});
//删除
$("#subOtherRebate").click(function(){
	var len = $('div[name="otherRebateItem"]').length;
	$('div[name="otherRebateItem"]')[len-1].remove();
	if ($('div[name="otherRebateItem"]').length <=1) {
		$("#subOtherRebate").hide();
	}
});

//返利规则阶梯追加 
//商品返利规则设置方式
var setType = $("#setType").val();
$('#setType').change(function(){
	if (!$("#whole").prop('checked') && $(".goodsId").length==0) {
		btn_alertDialog('提示','请完善“协议供销条款”中的“协议商品”');
		$("#setType").val("");
		return;
	}
	
	if ($.trim($("#rebateDiv").text()) != "") {
		if(confirm('确定放弃当前返利条款编辑内容？')){
			changeSetType();
		}else{
			$("#setType").val(setType);
		}
	}else{
		changeSetType();
	}
}); 

function changeSetType() {
	setType = $("#setType").val();
	//如果是全品设置
	if (setType == 1) {  
		$.ajaxSetup ({ cache: true });
		$("#rebateDiv").load("pro_rebate_all.ftl",function(){
			//厂家/品牌厂家/供应商 名称、设置全品商品数
			setChangJiaAndProductNum();
            $("#addTaskItem").show();
		});
	}else if(setType == 2) {//分类设置  
		$.ajaxSetup ({ cache: true });
		$("#rebateDiv").load("pro_rebate_product.ftl",function(){
			//厂家/品牌厂家/供应商 名称、设置全品商品数
			setChangJiaAndProductNum();
            $("#addTaskItem").hide();
		});
	} else {
		$("#rebateDiv").html("");
	}
}
function setChangJiaAndProductNum() {
	//厂家/品牌厂家/供应商 名称
	$("#rebateAllProductName").text($("#firstPartyName").val());
	//设置全品商品数
	//如果供销条款是取的全品
	if ($("#whole").prop('checked')) {
		$("#rebateAllProductNum").text($("#ssgn").text());
	} else {
		$("#rebateAllProductNum").text($(".goodsId").length);
	}
}
//商品表单备份，不要删除，在子页面有用。
var productFormDiv;

/**
 * 添加商品弹框加搜索
 * 获取商品
 */
$('input[name="addGoods"]').click(function(){ 
	//确定当前操作的id
	var currId = $(this).parents(".top").attr("id");
	currForm = currId;
	var count = qryGoodsCount();
	$("#goodsModal").modal("show");
	if(count > 0){//普通商品
		goodsFlag = 1;
		queryGoods(goodsFlag);
	}else{ 
		//无首营商品
		goodsFlag = 2;
		queryGoods(goodsFlag);
	}
});

//返利支付方
$('input[name="payer"]').click(function(){
	var payer = $("input[name='payer']:checked").val();
	if (payer == 1) {
		//清除指定商业公司
		$("#assignCompanyId").val("");
		$("#assignCompanyName").val("");
	}
});

//协议返利条款提交验证，组装数据
var proRebate = {};
function checkRebateForm(){
	//清空所有数据
	proRebate = {};
	var weatherFloor =  $("input[name='weatherFloor']:checked").val();
	proRebate.weatherFloor = weatherFloor;
	//当“是否底价供货”的值为否时:“返利支付方”、“返利兑付方式”、“返利兑付时间”、“隔XX月兑付”为必选项
	//当“是否底价供货”的值为是时:“返利支付方”、“返利兑付方式”、“返利兑付时间”、“隔XX月兑付”、“其他（非商品）返利”、“其他（非商品）返利方式”、“商品返利规则设置方式”均为不可编辑；
	//综上如果值不为是的时候，“返利支付方”、“返利兑付方式”、“返利兑付时间”、“隔XX月兑付”、“其他（非商品）返利”、“其他（非商品）返利方式”、“商品返利规则设置方式” 才设置值。
	if (weatherFloor && weatherFloor == 1) {
		return proRebate;
	}
	var payer = $("input[name='payer']:checked").val();
	//如果商业供销条款付款方式返利设置、结算方式返利设置部分填了，就必须填返利支付方了，否则可以不填
	//返利方式设置总和
	var fkForm = document.getElementById('fkForm');
	var payAmount = Number(fkForm.rebateScale[0].value)+Number(fkForm.rebateScale[1].value)+
    Number(fkForm.rebateScale[2].value)+Number(fkForm.rebateScale[3].value)+
    Number(fkForm.rebateScale[4].value);
	//结算方试设置总和
	var jsForm = document.getElementById('jsForm');
    var jsAmount = Number(jsForm.rebateScale[0].value)+Number(jsForm.rebateScale[1].value)+
    Number(jsForm.rebateScale[2].value)+Number(jsForm.rebateScale[3].value)+
    Number(jsForm.rebateScale[4].value)+Number(jsForm.rebateScale[5].value);
    if (payAmount > 0 || jsAmount > 0) {
    	if (!payer) {
    		btn_alertDialog("提示","存在商业供货返利，请完善返利条款");
			return false;
    	}
    	//当“商业供货协议条款”中“付款方式返利设置”或“结算方式返利设置”，无值时（0或者空），“是否底价供货”不做判断；有值时（非空且不为0），“是否底价供货”的值为默认值，且不可编辑
    	proRebate.weatherFloor = 0;
    }
    
    if (weatherFloor == 0) {
    	if (!payer) {
    		btn_alertDialog("提示","“是否底价供货”为否，请维护返利条款");
			return false;
    	}
    }
	if (payer) {
		proRebate.payer = payer;
		if(payer == 2 && !$("#assignCompanyId").val()) {
			btn_alertDialog("提示","请选择返利条款的指定商业公司");
			return false;
		}
	}
	proRebate.assignCompanyId = $("#assignCompanyId").val();
	proRebate.assignCompanyName = $("#assignCompanyName").val();
	
	var cashType = $("#cashType").val();
	proRebate.cashType = cashType;
	if (cashType == '6' && ($("#cashNote").val() == null || $.trim($("#cashNote").val())) == '') {
		btn_alertDialog("提示","返利条款的返利兑付方式为其他，必须填写备注");
		return false;
	}
	
	proRebate.cashNote = $.trim($("#cashNote").val());
	if (proRebate.cashNote.length > 20) {
		btn_alertDialog("提示","返利兑付方式备注超过20");
		return false;
	}
	
	//特殊字符
	if (specialVal(proRebate.cashNote)) {
		btn_alertDialog("提示","返利兑付方式备注有非法字符");
		return false;
	}

	proRebate.cashTime = $("#cashTime").val();
	var cashInterval = $("#cashInterval").val();
	//如果“返利支付方”配置了，隔月兑付必填
	if (payer && !cashInterval) {
		btn_alertDialog("提示","已选择返利支付方，必须填写隔月兑付月份");
		return false;
	}
	if (cashInterval && (cashInterval<=0 || cashInterval>12)) {
		btn_alertDialog("提示","返利隔月兑付月份必须大于0小于12的整数");
		return false;
	}
	proRebate.cashInterval = cashInterval;
	
	//其他（非商品）返利  start
	var rebateOtherList = [];
	var amountPercent = 0;//百分比总和
	for (var i=0;i<$("div[name='otherRebateItem']").length;i++) {
		var item = $("div[name='otherRebateItem']")[i];
		var rebateOther = {};
		rebateOther.sortNo = i+1;
		rebateOther.otherRebateType = $(item).find("select[name='otherRebateType']").val();
		rebateOther.otherRebateMethod = $(item).find("select[name='otherRebateMethod']").val();
		var amount = $(item).find("input[name='amount']").val(); 
		if (!amount) {
			continue; 
		}
		if (amount <=0 ) {
			btn_alertDialog("提示","其他（非商品）返利方式金额必须大于0");
			return false;
		}
		rebateOther.amount = amount;
		//如果不是固定金额，则是百分比，百分比的累加和就不能大于100
		if (rebateOther.otherRebateMethod != '3') {
			amountPercent = amountPercent + Number(amount);
		}
		//含税
		var includeTax = $(item).find("input[name='includeTax']").prop('checked');
		if (includeTax) {
			rebateOther.includeTax = 1;
		} else {
			rebateOther.includeTax = 0;
		}
		rebateOtherList.push(rebateOther);
	}
	if (amountPercent > 100) {
		btn_alertDialog("提示","其他返利方式为非固定金额方式的比例合大于100");
		return false;
	}
	proRebate.rebateOtherList = rebateOtherList;
	//其他（非商品）返利  end
	
	var setType = $("#setType").val();
	//如果没有设置商品返利规则方式，则不用填下面内容
	if (!setType) {
		proRebate.proNum = 0;
		return true;
	}
	proRebate.setType = setType;
	proRebate.proNum = parseInt($("#rebateAllProductNum").text());//商品数量
	//返利规则条款设置
	var rebateSetList = [];
	//返利规则任务量设置
	var setTaskList = [];
	if (setType == 1) {//全品设置
		//设置规则
		var rebateSet = {};
		rebateSet.sortNo = 1;
		var rebateStandard = $("#rebateStandard").val();
		if (!rebateStandard) {
			btn_alertDialog("提示","请选择返利规则的返利标准");
			return false;
		}
		rebateSet.rebateStandard = rebateStandard;
		var wetherSame = $("#wetherSame").prop("checked");
		if (wetherSame) {
			rebateSet.wetherSame = 1;
			proRebate.taskStandard = rebateStandard;
		} else {
			rebateSet.wetherSame = 0;
			var taskStandard = $("#taskStandard").val();
			if (!taskStandard) {
				btn_alertDialog("提示","请选择返利规则的任务量标准");
				return false;
			}
			proRebate.taskStandard = taskStandard;
		}
		if (rebateSet.rebateStandard != 3) {
			rebateSet.rebatePrice = $("#rebatePrice").val();
		}
		
		//返利规则、任务量设置项start --
		var setItemsList = [];//返利规则条款设置项
		for (var i=0;i<$("div[name='rebateSetItem']").length;i++) {
			var item = $("div[name='rebateSetItem']")[i];
			//规则项
			var setItem = {};
			setItem.sortNo = i+1;
			var setAmount = $(item).find("input[name='setAmount']").val();
			if (!setAmount) {
				setAmount = 0;
			}
			setItem.setAmount = setAmount;
			var setUnit = $(item).find("select[name='setUnit']").val();
			//返利标准选择付款金额时，返利规则第一个单位选元；选购进，只能是盒、元；选销售，三个都行
			if (rebateSet.rebateStandard == 3 && setUnit != 2) {
				btn_alertDialog("提示","返利标准选择付款金额时，返利规则单位只能是元");
				return false;
			} else if (rebateSet.rebateStandard == 2 && setUnit == 3){
				btn_alertDialog("提示","当返利标准选择购进时，返利规则或任务量单位不能为铺点");
				return false;
			}
			setItem.setUnit = setUnit;
			var rebateAmount = $(item).find("input[name='rebateAmount']").val();
			if (!rebateAmount) {
				btn_alertDialog("提示","返利规则的返还设置不能为空");
				return false;
			}
			setItem.rebateAmount = rebateAmount;
			var rebateUnit = $(item).find("select[name='rebateUnit']").val();
			if (setItem.setUnit == 3 &&  rebateUnit !=2) {
				btn_alertDialog("提示","当返利规则为铺点时，返利单位只能是元");
				return false;
			}
			setItem.rebateUnit = rebateUnit;
			setItemsList.push(setItem);
			
			//任务量
			var setTask = {};
			setTask.sortNo = i+1;
			var taskAmount = $(item).find("input[name='taskAmount']").val();
			if (!taskAmount) {
				btn_alertDialog("提示","任务量不能为空");
				return false;
			}
			setTask.taskAmount = taskAmount;
			var taskUnit = $(item).find("select[name='taskUnit']").val();
			if (rebateSet.rebateStandard == 2 && taskUnit == 3) {
				btn_alertDialog("提示","当返利标准选择购进时，返利规则或任务量单位不能为铺点");
				return false;
			}
			setTask.taskUnit = taskUnit;
			var surpassAmount =  $(item).find("input[name='surpassAmount']").val();
			if (surpassAmount) {
				setTask.surpassAmount = surpassAmount;
				setTask.surpassUnit = $(item).find("select[name='surpassUnit']").val();
			}
			setTaskList.push(setTask);
			
		}
		rebateSet.setItemsList = setItemsList; 
		//返利规则、任务量设置项end --
		rebateSet.ladderComputeType = $('input[name="ladderComputeType"]:checked').val();
		var rebateComputeRule = $("select[name='rebateComputeRule']").val();
		if (rebateSet.rebateStandard != 1 && rebateComputeRule != 1) {
			btn_alertDialog("提示","返利标准选择购进或付款金额，返利计算规则只能汇总计算");
			return false;
		}
		rebateSet.rebateComputeRule = rebateComputeRule;
		var rebateIncludeTax = $("input[name='rebateIncludeTax']").prop('checked'); 
		if (rebateIncludeTax) {
			rebateSet.includeTax = 1;
		} else {
			rebateSet.includeTax = 0;
		}
		
		rebateSet.listType = $('input[name="listType"]:checked').val();
		
		var setScopeList = [];//返利范围
		//区域
		var whetherArea = $("input[name='whetherArea']").prop('checked');
		if (whetherArea) {
			var setScopeCityList = [];//所有设置整个市的数据
			var setScopeAllCityList = [];//所有包含的城市
			rebateSet.whetherArea = 1;
			var len = $("#dicSet").find(".dictable tbody tr").length;
			//区域不能为空
			if(len == 0){
				btn_alertDialog("提示","请设置区域");
				return false;
			}
			
			//保存区域
			for (var k=0;k<$("#dicSet").find(".dictable tbody tr").length;k++) {
				var tr = $("#dicSet").find(".dictable tbody tr")[k];
				var scope = {};
				var cityVal = $(tr).find(".city").val();
				if(!cityVal || cityVal == "" || cityVal == 0) {
					btn_alertDialog("提示","返利表单区域设置城市不能为空");
					return false;
				}
				//如果有城市没设置区，则代表包括全市所有区域，不再能设置该市下的任何区域
				if($.inArray(cityVal,setScopeCityList)>=0) {
			　　　	btn_alertDialog('提示','返利表单区域设置不能重复');
					return;
			　　   }
				var areaVal = $(tr).find(".area").val();
				if (!areaVal || areaVal == "" || areaVal == 0) {
					setScopeCityList.push(cityVal);
					if($.inArray(cityVal,setScopeAllCityList)>=0) {
				　　　	btn_alertDialog('提示','返利表单区域设置不能重复');
						return;
				　　   }
				}
				setScopeAllCityList.push(cityVal);
				scope.item = $(tr).find(".province").val()+"|"+$(tr).find(".city").val();
				if (areaVal && areaVal !=0) {
					scope.item = scope.item + "|"+$(tr).find(".area").val(); 
				}
				var province = $(tr).find(".province").text();
				var city = $(tr).find(".city :selected").text();
				var area = $(tr).find(".area :selected").text();
				scope.content = $.trim(province) +"|"+ $.trim(city);
				if (areaVal && areaVal !=0) {
					scope.content = scope.content + "|"+ $.trim(area);
				}
				
				scope.dataType = 1;//客户类型
				setScopeList.push(scope)
			}
		}else{
			rebateSet.whetherArea = 0
		}
		//客户类型
		var whetherCustomerType = $("input[name='whetherCustomerType']").prop('checked');
		if (whetherCustomerType) {
			rebateSet.whetherCustomerType = 1;
			//客户类型不能为空
			var cusLenth = 0;
			$("#rebateAllClientTable").find("tbody tr").each(function(){
				var ch = $(this).find(".cusCh").prop("checked");
				if(ch){
					cusLenth++;
					var scope = {};
					scope.item = $(this).find(".cusVal").val();
					scope.content = $(this).find(".cusName").text();
					scope.dataType = 2;//客户类型
					setScopeList.push(scope)
				}
			});
			if(cusLenth==0){
				btn_alertDialog("提示","请选择客户类型");
				return false;
			} 
		}else{
			rebateSet.whetherCustomerType = 0;
		}
		//返利范围
		rebateSet.setScopeList = setScopeList;
		rebateSetList.push(rebateSet);
	}
	
	if (setType == 2) {//分类设置
		var taskStandard = $("#taskStandard").val();
		if (!taskStandard) {
			btn_alertDialog("提示","请选择返利规则的任务量标准");
			return false;
		}
		proRebate.taskStandard = taskStandard;
		//任务量设置项start --
		for (var i=0;i<$("div[name='taskItem']").length;i++) { 
			var item = $("div[name='taskItem']")[i];
			//任务量
			var setTask = {};
			setTask.sortNo = i+1;
			var taskAmount = $(item).find("input[name='taskAmount']").val();
			if (!taskAmount) {
				btn_alertDialog("提示","任务量不能为空");
				return false;
			}
			setTask.taskAmount = taskAmount;
			setTask.taskUnit = $(item).find("select[name='taskUnit']").val();
			var surpassAmount =  $(item).find("input[name='surpassAmount']").val();
			if (surpassAmount) {
				setTask.surpassAmount = surpassAmount;
				setTask.surpassUnit = $(item).find("select[name='surpassUnit']").val();
			}
			setTaskList.push(setTask);
		}
		//任务量设置项end --
		
		//表单设置 start --
		for (var i=0;i<$("div[name='productSetItemDiv']").length;i++) { 
			var formItem = $("div[name='productSetItemDiv']")[i];
			var productFormDiv = $(formItem).find("div[name='productFormDiv']")
			//设置规则
			var rebateSet = {};
			rebateSet.sortNo = i+1;
			// 商品 table start -- 
			formList = [];//商品列表
			if ($(productFormDiv).find("table tbody tr").length==0) {
				btn_alertDialog("提示","请设置分类表单"+(i+1)+"的商品");
				return false;
			}
			$(productFormDiv).find("table tbody tr").each(function(index){
				var tds = $(this).find("td");
				var rebateForm = {}; 
				rebateForm.sortNo = index + 1; 
				rebateForm.productId = $(tds[1]).text();
				rebateForm.productNo = $(tds[2]).text();
				rebateForm.productName = $(tds[3]).text();
				rebateForm.goodsSpec = $(tds[4]).text();
				rebateForm.manufacturer = $(tds[5]).text();
				rebateForm.pinpaichangjia = $(tds[6]).text();
				formList.push(rebateForm);
			});
			rebateSet.formList = formList;
			// 商品 table end --
			
			// 规则 start --
			var rebateStandard = $(formItem).find("select[name='rebateStandard']").val(); 
			if (!rebateStandard) {
				btn_alertDialog("提示","请设置分类表单"+(i+1)+"的返利标准");
				return false;
			}
			rebateSet.rebateStandard = rebateStandard;
			if (rebateSet.rebateStandard != 3) {
				rebateSet.rebatePrice = $(formItem).find("select[name='rebatePrice']").val();
			}
			// 返利规则项 start --
			var setItemsList = [];//返利规则条款设置项
			for (var k=0;k<$(formItem).find("div[name='productRebateSetItem']").length;k++) {
				var item = $(formItem).find("div[name='productRebateSetItem']")[k];
				//规则项
				var setItem = {};
				setItem.sortNo = k+1;
				var setAmount = $(item).find("input[name='setAmount']").val();
				if (!setAmount) {
					setAmount = 0;
				}
				setItem.setAmount = setAmount;
				
				var setUnit = $(item).find("select[name='setUnit']").val();
				//返利标准选择付款金额时，返利规则第一个单位选元；选购进，只能是盒、元；选销售，三个都行
				if (rebateSet.rebateStandard == 3 && setUnit != 2) {
					btn_alertDialog("提示","返利标准选择付款金额时，返利规则单位只能是元");
					return false;
				} else if (rebateSet.rebateStandard == 2 && setUnit == 3){
					btn_alertDialog("提示","返利标准选择购进时，返利规则单位不能为铺点");
					return false;
				}
				setItem.setUnit = setUnit;
				var rebateAmount = $(item).find("input[name='rebateAmount']").val();
				if (!rebateAmount) {
					btn_alertDialog("提示","分类表单"+(i+1)+"的返利规则的返还设置不能为空");
					return false;
				}
				setItem.rebateAmount = rebateAmount;
				var rebateUnit = $(item).find("select[name='rebateUnit']").val();
				if (setItem.setUnit == 3 &&  rebateUnit !=2) {
					btn_alertDialog("提示","当返利规则为铺点时，返利单位只能是元");
					return false;
				}
				setItem.rebateUnit = rebateUnit;
				setItemsList.push(setItem); 
			}
			rebateSet.setItemsList = setItemsList; 
			// 返利规则项 end --
			rebateSet.ladderComputeType = $(formItem).find('input[name^="ladderComputeType"]:checked').val();
			var rebateComputeRule = $(formItem).find("select[name='rebateComputeRule']").val();
			if (rebateSet.rebateStandard != 1 && rebateComputeRule != 1) {
				btn_alertDialog("提示","返利标准选择购进或付款金额，返利计算规则只能汇总计算");
				return false;
			}
			rebateSet.rebateComputeRule = rebateComputeRule;
			var rebateIncludeTax = $(formItem).find("input[name='rebateIncludeTax']").prop('checked'); 
			if (rebateIncludeTax) {
				rebateSet.includeTax = 1;
			} else {
				rebateSet.includeTax = 0;
			}
			rebateSet.listType = $(formItem).find('input[name^="listType"]:checked').val();
			
			//返利范围
			var setScopeList = [];
			//区域
			var whetherArea = $(formItem).find("input[name='whetherArea']").prop('checked');
			if (whetherArea) {
				var setScopeCityList = [];//所有设置整个市的数据
				var setScopeAllCityList = [];//所有包含的城市
				rebateSet.whetherArea = 1;
				var len = $(formItem).find(".dictable tbody tr").length;
				//区域不能为空
				if(len == 0){
					btn_alertDialog("提示","分类表单"+(i+1)+"请设置区域");
					return false;
				}
				
				//保存区域
				for (var k=0;k<$(formItem).find(".dictable tbody tr").length;k++) {
					var tr = $(formItem).find(".dictable tbody tr")[k];
					var scope = {};
					var cityVal = $(tr).find(".city").val();
					if(!cityVal || cityVal == "" || cityVal == "0") {
						btn_alertDialog("提示","返利设置分类表单"+(i+1)+"区域设置城市不能为空");
						return false;
					}
					//如果有城市没设置区，则代表包括全市所有区域，不再能设置该市下的任何区域
					if($.inArray(cityVal,setScopeCityList)>=0) {
				　　　	btn_alertDialog("提示","返利设置分类表单"+(i+1)+"区域设置不能重复");
						return;
				　　   }
					var areaVal = $(tr).find(".area").val();
					if (!areaVal || areaVal == "" || areaVal == 0) {
						setScopeCityList.push(cityVal);
						if($.inArray(cityVal,setScopeAllCityList)>=0) {
					　　　	btn_alertDialog('提示','返利设置分类表单'+(i+1)+'区域设置不能重复');
							return;
					　　   }
					}
					setScopeAllCityList.push(cityVal);
					scope.item = $(tr).find(".province").val()+"|"+$(tr).find(".city").val();
					if (areaVal && areaVal !=0) {
						scope.item = scope.item +"|"+$(tr).find(".area").val();
					}
					var province = $(tr).find(".province").text();
					var city = $(tr).find(".city :selected").text();
					var area = $(tr).find(".area :selected").text();
					scope.content = $.trim(province) +"|"+ $.trim(city);
					if (areaVal && areaVal !=0) {
						scope.content = scope.content +"|"+ $.trim(area);
					}
					scope.dataType = 1;//客户类型
					setScopeList.push(scope)
				} 
			}else{
				rebateSet.whetherArea = 0
			}
			//客户类型
			var whetherCustomerType = $(formItem).find("input[name='whetherCustomerType']").prop('checked');
			if (whetherCustomerType) {
				rebateSet.whetherCustomerType = 1;
				//客户类型不能为空
				var cusLenth = 0;
				$(formItem).find(".custable").find("tbody tr").each(function(){
					var ch = $(this).find(".cusCh").prop("checked");
					if(ch){
						cusLenth++;
						var scope = {};
						scope.item = $(this).find(".cusVal").val();
						scope.content = $(this).find(".cusName").text();
						scope.dataType = 2;//客户类型
						setScopeList.push(scope)
					}
				});
				if(cusLenth==0){
					btn_alertDialog("提示","分类表单"+(i+1)+"请选择客户类型");
					return false;
				} 
			}else{
				rebateSet.whetherCustomerType = 0;
			}
			//返利范围
			rebateSet.setScopeList = setScopeList;
			// 规则 end --
			rebateSetList.push(rebateSet);
		}
		//表单设置 end --
	}
	//保存所有规则
	proRebate.rebateSetList = rebateSetList;
	//保存所有任务量
	proRebate.setTaskList = setTaskList;
	console.log(proRebate);
	return true;
}

