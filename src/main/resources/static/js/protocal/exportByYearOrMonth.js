var proDetailManage=new Object();   
var btnMonth = 0;
var btnYear = 0;

$(function(){
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		confirmDialog("提示","确定提交?",submitForm);
	});
	$("#pageclose").click(function () {
		dialog.remove();
	});
	
	monthOrYear();
	
	$("#Month").click(function(){
    	btnMonth=1;
    	if(btnYear == 1){
    		btnYear=0;
    	}
    });
    $("#Year").click(function(){
    	btnYear=1;
    	if(btnMonth == 1){
    		btnMonth=0;
    	}
    });
});
    
function monthOrYear(){
	debugger;
	var effectiveStartDateStr = $("#effectiveStartDate").val();
	var effectiveEndDateStr = $("#effectiveEndDate").val();
	/*月度展示+年度展示*/
	if(effectiveStartDateStr == "" && effectiveEndDateStr == ""){
		var date=new Date();   
		var year=date.getFullYear(); //获取当前年份   
		var newStartDateStr = year+"-01-01";
		var newEndDateStr = year+"-12-31";
		document.getElementById("Month").disabled = false;
		document.getElementById("Month").style.background="blue";
		proDetailManage.effectiveStartDateStr=newStartDateStr;
		proDetailManage.effectiveEndDateStr=newEndDateStr;
	}else if(effectiveStartDateStr!= "" && effectiveEndDateStr!= ""){
		//两个日期
		var StartDate = effectiveStartDateStr;
		var EndDate = effectiveEndDateStr;
		// 拆分年月日
		StartDate = StartDate.split('-');
		EndDate = EndDate.split('-');
		// 得到月数
		StartDate = parseInt(StartDate[0]) * 12 + parseInt(StartDate[1]);
		EndDate = parseInt(EndDate[0]) * 12 + parseInt(EndDate[1]);
	
		var cha = Math.abs(StartDate - EndDate);
		if(cha >= 1&&cha<12){
			document.getElementById("Month").disabled = false;
			document.getElementById("Month").style.background="blue";
		}else if(cha>=12){
			document.getElementById("Month").disabled = true;
//			document.getElementById("Month").style.background="blue";
			document.getElementById("Year").disabled = false;
			document.getElementById("Year").style.background="blue";
		}
		var effectiveStartDateStr = $("#effectiveStartDate").val();
		var effectiveEndDateStr = $("#effectiveEndDate").val();
		proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
		proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
	}
	
}

function queryConditions(){
	var effectiveStartDateStr = $("#effectiveStartDate").val();
	var effectiveEndDateStr = $("#effectiveEndDate").val();
	var createTimeStartStr = $("#createTimeStart").val();
	var createTimeEndStr = $("#createTimeEnd").val();
    var proNo =$("#proNo").val();//协议编号
    var proLeaderName = $("#proLeaderName").val();//协议负责人
    var proType =$("#proType").val();//协议类型
    var firstPartyName =$("#firstPartyName").val();//甲方
    var whetherActivity = $("#whetherActivity").val();//是否活动协议
    var businessSignName =$("#businessSignName").val();//经手人
    var purchaseChannel = $("#purchaseChannel").val();//购进渠道
    var purchaseChannelName = $("#purchaseChannelName").val();//指定商业公司
    var secondPartyName =$("#secondPartyName").val();//乙方
    //新增加的几个查询参数
    var branchCompany =$("#branchCompany").val();//分公司
    var taskStandard =$("#taskStandard").val();//任务量标准
    var proTaskStatus =$("#proTaskStatus").val();//协议任务状态
    var rebateStandard =$("#rebateStandard").val();//返利标准
    var goodsCode =$("#goodsCode").val();//商品编码
    var btnFlag =$("#btnFlag").val()
    var btnMonth =$("#btnMonth").val();
    var btnYear =$("#btnYear").val();
	var date = getCurrentTime();
	
	if(effectiveStartDateStr == "" && effectiveEndDateStr == ""){
		var date=new Date();   
		var year=date.getFullYear(); //获取当btnFlag前年份   
		var newStartDateStr = year+"-01-01";
		var newEndDateStr = year+"-12-31";
		proDetailManage.effectiveStartDateStr=newStartDateStr;
		proDetailManage.effectiveEndDateStr=newEndDateStr;
	}else if(effectiveStartDateStr!= "" && effectiveEndDateStr!= ""){
		proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
		proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
	}
	
    if(purchaseChannel==3 && purchaseChannelName==''){
    	btn_alertDialog("提示","请输入指定商业公司!");
		return false;
    }
    
 	if(effectiveStartDateStr == '' && effectiveEndDateStr != ''){
		btn_alertDialog("提示","请选择生效日期起始日期!");
		return false;
	}
	if(createTimeStartStr == '' && createTimeEndStr != ''){
		btn_alertDialog("提示","请选择创建日期的起始日期!");
		return false;
	}
	if(effectiveStartDateStr != '' && effectiveEndDateStr == ''){
		if(effectiveStartDateStr>date){
			btn_alertDialog("提示","生效日期起始日期大于当前日期，请选择结束日期!");
			return false;
		}
	}   
	   	
	if(effectiveStartDateStr != '' && effectiveEndDateStr != ''){
		if(effectiveStartDateStr > effectiveEndDateStr){
			btn_alertDialog("提示","生效日期中起始日期不能大于结束日期!");
    		return false;
		}
	}
	if(createTimeStartStr != '' && createTimeEndStr != ''){
		if(createTimeStartStr > createTimeEndStr){
			btn_alertDialog("提示","创建日期中起始日期不能大于结束日期!");
    		return false;
		}
	} 
	
	if(createTimeStartStr != '' && createTimeEndStr == ''){
		if(createTimeStartStr>date){
			btn_alertDialog("提示","创建日期中开始日期大于当前日期，请选择结束日期!");
			return false;
		}
	}   

	proDetailManage.createTimeStartStr=createTimeStartStr;
	proDetailManage.createTimeEndStr=createTimeEndStr;
	proDetailManage.proNo=proNo;
	proDetailManage.proLeaderName=proLeaderName;
	proDetailManage.proType=proType;
	proDetailManage.firstPartyName=firstPartyName;
	proDetailManage.whetherActivity=whetherActivity;
	proDetailManage.businessSignName=businessSignName;
	proDetailManage.purchaseChannel=purchaseChannel;
	proDetailManage.purchaseChannelName=purchaseChannelName;
	proDetailManage.secondPartyName=secondPartyName;
	proDetailManage.btnMonth=btnMonth;
	proDetailManage.btnYear=btnYear;
	
	proDetailManage.taskStandard=taskStandard;
	proDetailManage.proTaskStatus=proTaskStatus;
	proDetailManage.rebateStandard=rebateStandard;
	proDetailManage.goodsCode=goodsCode;
	proDetailManage.btnFlag=btnFlag;
	proDetailManage.btnMonth=btnMonth;
	proDetailManage.btnYear=btnYear;
	return proDetailManage;
};
    
function getCurrentTime(){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	if (month < 10) {
	    month = "0" + month;
	}
	if (day < 10) {
	    day = "0" + day;
	}
	var nowDate = year + "-" + month + "-" + day;
	return nowDate;
}

function submitForm(){
	var proDetailManage = queryConditions();
	window.location.href=basePath+"/pro/export?proNo="+proDetailManage.proNo+"&firstPartyName="+proDetailManage.firstPartyName+"&whetherActivity="+proDetailManage.whetherActivity+"&businessSignName=" +proDetailManage.businessSignName+ 
	"&purchaseChannel="+proDetailManage.purchaseChannel + "&secondPartyName="+proDetailManage.secondPartyName+"&effectiveStartDateStr="+proDetailManage.effectiveStartDateStr+"&proType="+proDetailManage.proType+
	"&effectiveEndDateStr="+proDetailManage.effectiveEndDateStr+"&createTimeStartStr=" + proDetailManage.createTimeStartStr + "&createTimeEndStr="+proDetailManage.createTimeEndStr+"&btnFlag="+proDetailManage.btnFlag+
	"&taskStandard="+proDetailManage.taskStandard+"&proTaskStatus="+proDetailManage.proTaskStatus+"&rebateStandard="+proDetailManage.rebateStandard+"&goodsCode="+proDetailManage.goodsCode+"&btnMonth="+btnMonth+"&btnYear="+btnYear; 
	
}
