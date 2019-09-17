var w_width = $(window).width() * 0.8;
var w_height = $(window).height() * 0.75;

$(function() {
	// tabs 切换
	$('.nav-tabs>li').on(
			'click',
			function() {
				var $this = $(this), $nav_content = $('.nav-content');
				$this.addClass('active').siblings().removeClass('active');
				$nav_content.children('div').eq($this.index()).show()
						.siblings().hide();
			})
	var dialog = top.dialog.get(window);
	
    $("#firstPartyName").on("dblclick", function () {
    	proFirstPartyName();
    });
    $("#proLeaderName").on("dblclick", function () {
    	proLeaderFlowMore();
    });
    $("#firstSignName").on("dblclick", function () {
        firstSignerFlow();
    });
    $("#secondPartyName").on("dblclick", function () {
    	proSecondPartyName();
    });
    $("#purchaseChannelName").on("dblclick", function () {
    	proPurchaseChannel();
    });
    $("#proNo").on("dblclick", function () {
    	proNoSearch($("#proLeaderName").val());
    });    
    $("#goodsCode").on("dblclick", function () {
    	goodsCodeSearch();
    });
});

$("#auditBtn").click(function(){
    top.dialog({
  	url:basePath + '/pro/auditProtocal',
  	title: '提交审批',
	width:900,
	height:800,
	data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
	onclose: function() {
	  var data = this.returnValue;
	  if (data == "success") {
		 $('#grid-table').jqGrid().trigger('reloadGrid');				
		 $('#value').html("这里是modal 返回的值  " + this.returnValue);
	  } 
	}
  }).showModal();	
});
var btnFlag = 0 ;//用来判断按什么展现查询数据
$("#queryByProtocal").click(function(){
	var proDetailManage = queryConditions();	
	if(proDetailManage){		
		var this_id=$(this).attr("data-id");		
		if(this_id == 1){			
			btnFlag = this_id;
			proDetailManage.btnFlag = btnFlag;
			queryByProtocal(proDetailManage);
		}
	}		
});
$("#queryByProduct").click(function(){
	var proDetailManage = queryConditions();
	if(proDetailManage){		
		var this_id=$(this).attr("data-id");		
		if(this_id == 2){			
			btnFlag = this_id;
			proDetailManage.btnFlag = btnFlag;
			queryByProduct(proDetailManage);
		}
	}
});
$("#queryByProtocalAndProduct").click(function(){
	var proDetailManage = queryConditions();
	if(proDetailManage){		
		var this_id=$(this).attr("data-id");		
		if(this_id == 3){			
			btnFlag = this_id;
			proDetailManage.btnFlag = btnFlag;
			queryByProtocalAndProduct(proDetailManage);
		}
	}
});

/**
 * 选择了指定商业公司类型，才会显示指定商业公司输入框
 */
$("#purchaseChannel").on("change",function(){
	var channel = $(this).val();
	if(channel == 3){
		$("#pointCompany").show();
	}else{
		$("#pointCompany").hide();
	}
});
var btnMonth = 0;
var btnYear = 0;
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

function queryConditions(){
	proDetailManage=new Object();
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
	var date = getCurrentTime();
	var protocalStatus =$("#protocalStatus").val();//审批状态
	
	/*if(effectiveStartDateStr == "" && effectiveEndDateStr == ""){
		var date=new Date();   
		var year=date.getFullYear(); //获取当前年份   
		var newStartDateStr = year+"-01-01";
		var newEndDateStr = year+"-12-31";
		proDetailManage.effectiveStartDateStr=newStartDateStr;
		proDetailManage.effectiveEndDateStr=newEndDateStr;
	}else if(effectiveStartDateStr!= "" && effectiveEndDateStr!= ""){
		proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
		proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
	}*/
	proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
	proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
	
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
	
	//proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
	//proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
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
	
	proDetailManage.branchCompany=branchCompany;
	proDetailManage.taskStandard=taskStandard;
	proDetailManage.proTaskStatus=proTaskStatus;
	proDetailManage.rebateStandard=rebateStandard;
	proDetailManage.goodsCode=goodsCode;
	proDetailManage.btnFlag=btnFlag;
	proDetailManage.proLeaderName=$("#proLeaderName").val();
	if(protocalStatus != ''){
		proDetailManage.status=protocalStatus;
	}
	return proDetailManage;
};
$("#resetBtn").click(function(){	
	$("#effectiveStartDate").val("");
	$("#effectiveEndDate").val("");
	$("#createTimeStart").val("");
	$("#createTimeEnd").val("");
    $("#proNo").val("");//协议编号
//    $("#proLeaderName").val("");//协议负责人
    $("#proType").val("");//协议类型
    $("#firstPartyName").val("");//甲方
    $("#whetherActivity").val("");//是否活动协议
    $("#businessSignName").val("");//经手人
    $("#purchaseChannel").val("");//购进渠道
    $("#purchaseChannelName").val("");//指定商业公司
    $("#secondPartyName").val("");//乙方
    $("#taskStandard").val("");//任务量标准
    $("#protocalStatus").val(101);//协议任务状态
    $("#rebateStandard").val("");//返利标准
    $("#goodsCode").val("");//商品编码
    $("#butMonth").val("");
    $("#butYear").val("");
	proDetailManage=new Object();
	var proLeaderName = $("#proLeaderName").val();//协议负责人
	proDetailManage.proLeaderName=proLeaderName;
	proDetailManage.status=101;
	if(btnFlag ==1){		
		queryByProtocal(proDetailManage);
	}else if(btnFlag ==2){
		queryByProduct(proDetailManage);
	}else if(btnFlag ==3){
		queryByProtocalAndProduct(proDetailManage);
	}
});

function queryByProtocal(proDetailManage){		
	$("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ "/pro/detail/manage/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:proDetailManage,
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['id','协议编号','协议甲方','创建日期','生效日期','结束日期', '甲方类型 ','协议类型 ','付款方式', '结算方式', 
                    '购进渠道 ','是否活动协议','是否底价供货','返利兑付时间 ','备注','协议责任人','审批状态','审批备注','操作'],
        colModel: [
        	{
        		name: 'id',
    		    index: 'id',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    hidden:true,
        	},{
        		name: 'proNo',
    		    index: 'proNo',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",	
    		    align:'center',
    		    formatter:function(cellvalue){
                    var str='<a href="javascript:void(0);" class="proCode">'+cellvalue+'</a>';
                    return str;
                }
        	},{
        		name: 'firstPartyName',
    		    index: 'firstPartyName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'createTime',
    		    index: 'createTime',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'effectiveStartDate',
    		    index: 'effectiveStartDate',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    editoptions: {
            		size: "20",
            		maxlength: "30"
            	},        	
            	formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'effectiveEndDate',
    		    index: 'effectiveEndDate',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    editoptions: {
            		size: "20",
            		maxlength: "30"
            	},        	
            	formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'firstPartyTypeName',
    		    index: 'firstPartyTypeName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'proTypeName',
    		    index: 'proTypeName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'payTypeName',
    		    index: 'payTypeName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'balanceTypeName',
    		    index: 'balanceTypeName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'purchaseChannelName',
    		    index: 'purchaseChannelName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
            },{
        		name: 'whetherActivity',//是否活动协议
    		    index: 'whetherActivity',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(value,options,row){
    		    	if(value == 1){
    		    		return "是";
    		    	}else if(value == 0){
    		    		return "否";
    		    	}else{
    		    		return "";
    		    	}
    		    }
            },{
        		name: 'weatherFloor',//是否底价供货
    		    index: 'weatherFloor',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(cellvalue,options,row){
    		    	var str = '';
    		    	if(cellvalue=="1"){
    		    		str+='是';
    		    	}
    		    	if(cellvalue=="0"){
    		    		str+='否';
    		    	}
                    return str;
                }
        	},{
        		name: 'cashTimeName',
    		    index: 'cashTimeName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
            },{
        		name: 'note',//备注
    		    index: 'note',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
                name: 'proLeaderName',//协议责任人
                index: 'proLeaderName',
                width: 200,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',  
            },{
        		name: 'status',
    		    index: 'status',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(cellvalue,options,row){
    		    	var status = cellvalue;
    		    	var str = "";
    		    	if(status=="2"){
    		    		str+='一审驳回';
    		    	}
                    if(status=="5"){
                        str+='二审驳回';
                    }
    		    	if(status=="1"){
    		    		str+='一审通过';
    		    	}
    		    	if(status=="4"){
    		    		str+='二审通过';
    		    	}
    		    	if(status=="0"){
    		    		str+='待审核';
    		    	}if(status=="7"){
                        str+='已归档';
                    }
                    return str;
                }
        	},{
                name: 'auditNote',//备注
                index: 'auditNote',
                width: 150,//宽度
                editable: false,//是否可编辑
                align:'center',
            },{
        		name: 'proNo',
    		    index: 'edit',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",	
    		    align:'center',
    		    formatter:function(cellvalue,options,row){
    		    	var status = row.status;
    		    	var str = "";
    		    	if(status=="2"||status=="5"){
    		    		str+='<a href="javascript:void(0);" class="edit" value='+cellvalue+'>编辑</a>';
    		    	}
                    return str;
                }
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
	
    
    
    $("#grid-table").on("click",".proCode",function(){
    	var proId = $(this).parent().prev().text();
    	var proCode = $(this).text();    	
    	var auditBtnType = 2;//表示为协议列表点击查看详情，需要显示修改按钮
    	window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+proCode,"协议详情",basePath+'/pro/proDetailShow?proId='+ proId+"&auditBtnType="+auditBtnType);
//    	$.ajax({
//			url:basePath + '/pro/findStatusByProNo',
//            type: 'POST', //GET
//            async: false,    //或false,是否异步
//            data: proCode,
//            timeout: 60000,    //超时时间
//            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
//            contentType: "application/json",
//            success: function (data) {console.log(data)
//                if(data.code == 0){          
//                	window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+proCode,"协议详情",basePath+'/pro/proDetailShow?proCode='+ proCode+"&auditBtnType="+auditBtnType);
//                }else {
//                    btn_alertDialog("提示","该协议正在被审核，重新刷新页面！");
//					setTimeout(function(){
//						location.reload();
//                    }, 1000);
//                }
//            }
//		});
    	
    });
    $("#grid-table").on("click",".proNum",function(){
    	
    	var proNo = $(this).parent().parent().children().first().next().text();
    	
        top.dialog({
          	url:basePath + '/pro/proNumberColumns?proNo='+proNo,
          	title: '协议商品数展现列表单',
        	width:900,
        	height:500,
        	data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        	onclose: function() {
        	  var data = this.returnValue;
        	  if (data == "success") {
        		 $('#grid-table').jqGrid().trigger('reloadGrid');				
        		 $('#value').html("这里是modal 返回的值  " + this.returnValue);
        	  } 
        	}
          }).showModal();	
    	
    });
    
    $("#grid-table").on("click",".adjustRebateAmount",function(){
    	var adjustRebateAmount = $(this).parent().prev().text();
    	var proNo = $(this).parent().parent().children().first().next().text();
        top.dialog({
          	url:basePath + '/pro/adjustRebateAmount?adjustRebateAmount='+adjustRebateAmount+"&proNo="+proNo,
          	title: '返利金额调整',
        	width:800,
        	height:400,
        	data: '', 
        	onclose: function() {
        	  var data = this.returnValue;
        	  if (data == "success") {
        		 $('#grid-table').jqGrid().trigger('reloadGrid');				
        		 $('#value').html("这里是modal 返回的值  " + this.returnValue);
        	  } 
        	}
          }).showModal();
    });
    $("#grid-table").on("click",".edit",function(){ 
    	var proNo = $(this).attr("value");  
    	var auditType = 1;
    	var auditBtnType = 1;//表示为协议列表点击查看详情，需要显示修改按钮
    	window.parent.$('#mainFrameTabs').bTabsAdd("protocalAdd"+proNo,"协议详情",basePath+'/pro/getProInfo?proNo='+ proNo+"&auditType="+auditType);
    });
}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}  
//導出
$("#Exprot").click(function(){
	confirmDialog("提示","确定下载?",exportData);

});
function exportData(){
	var proDetailManage = queryConditions();
	window.location.href=basePath+"/pro/exportMyPro?proNo="+proDetailManage.proNo+"&firstPartyName="+proDetailManage.firstPartyName+"&whetherActivity="+proDetailManage.whetherActivity+
	"&purchaseChannel="+proDetailManage.purchaseChannel + "&secondPartyName="+proDetailManage.secondPartyName+"&effectiveStartDateStr="+proDetailManage.effectiveStartDateStr+"&proType="+proDetailManage.proType+
	"&effectiveEndDateStr="+proDetailManage.effectiveEndDateStr+"&createTimeStartStr=" + proDetailManage.createTimeStartStr + "&createTimeEndStr="+proDetailManage.createTimeEndStr+"&btnFlag="+proDetailManage.btnFlag+
	"&btnMonth="+btnMonth+"&btnYear="+btnYear+"&proLeaderName="+proDetailManage.proLeaderName+"&status="+proDetailManage.status; 
}

function updatePagerIcons(table) {
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
};
//更新分页按钮
function updatePagerIcons(table) {
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    var replacement =
    {
        'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
        'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
        'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
        'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
    };
  $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
      var icon = $(this);
      var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
      if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
  })
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

function queryByProduct(proDetailManage){	
	
	$("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ "/pro/detail/manage/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:proDetailManage,
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['商品id','商品编号','商品名称','商品规格','商品厂家','商品品牌厂家', '商品供应商 ','商品协议数 ','返利金额', '计提返利金额', '应收返利金额'],
        colModel: [
        	{
        		name: 'productId',//商品编号
    		    index: 'productId',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",		
    		    hidden:false,
        	},{
        		name: 'goodsCode',//商品编号
    		    index: 'goodsCode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",		
    		    key:true,
        	},{
        		name: 'goodsName',//商品名称
    		    index: 'goodsName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsSpec',//商品规格
    		    index: 'goodsSpec',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'manufacturer',//商品厂家
    		    index: 'manufacturer',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'pinpaichangjia',//商品品牌厂家
    		    index: 'pinpaichangjia',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'pinpaichangjia',//商品供应商
    		    index: 'pinpaichangjia',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'productProNum',//商品协议数
    		    index: 'productProNum',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    formatter:function(value,options,row){
    		    	if(value>0){    		    		
    		    		var str='<a href="javascript:void(0);" class="productProNum">'+value+'</a>';
    		    		return str;
    		    	}
                }
        	},{
        		name: 'rebateAmount',//返利金额
    		    index: 'rebateAmount',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'provisionRebateAmount',//计提返利金额
    		    index: 'provisionRebateAmount',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'receivableRebateAmount',//应收返利金额
    		    index: 'receivableRebateAmount',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        width:"100%",
        autowidth:true,
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
	
    
    
    $("#grid-table").on("click",".productProNum",function(){
    	
    	var productId = $(this).parent().parent().children().first().next().text();  
    	var manufacturer = $(this).parent().prev().prev().prev().text();
    	var goodsCode = $(this).parent().parent().children().first().next().next().text();
    	var productProNum = $(this).text();   	
    	var proProductDetail = new Object();
    	proProductDetail.productId = productId,
    	proProductDetail.manufacturer = manufacturer,
    	proProductDetail.goodsCode = goodsCode,
    	proProductDetail.productProNum = productProNum,
    	top.dialog({
          	url:basePath + '/pro/findProductProNumDetail?productId='+productId+"&manufacturer="+manufacturer+"&goodsCode="+goodsCode+"&productProNum="+productProNum,
          	title: '商品协议数列展现表单',
        	width:900,
        	height:500,
        	data: '',
        	sortable: true,
            autowidth:true,
            rownumbers: true,//自动显示行
        	onclose: function() {
        	  var data = this.returnValue;
        	  if (data == "success") {
        		 $('#grid-table').jqGrid().trigger('reloadGrid');				
        		 $('#value').html("这里是modal 返回的值  " + this.returnValue);
        	  } 
        	}
          }).showModal();
    	
    });   
}
function queryByProtocalAndProduct(proDetailManage){	
	
	$("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ "/pro/detail/manage/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:proDetailManage,
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['协议编号','商品编码','商品名称','商品规格','商品厂家','商品品牌厂家','协议甲方',
        	'购进渠道','控销类型','是否独家','零售价维价','出库价维价','出库含税单价','供货含税单价','零售价含税单价','黑白名单','控销设置','是否控销区域','是否控销客户类型'],
        colModel: [
        	{
        		name: 'proNo',//
    		    index: 'proNo',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",	
    		    align:'center',
    		    formatter:function(cellvalue){
                    var str='<a href="javascript:void(0);" class="proCode">'+cellvalue+'</a>';
                    return str;
                }
        	},{
        		name: 'goodsCode',//商品编码
    		    index: 'goodsCode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'goodsName',//商品名称
    		    index: 'goodsName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'goodsSpec',//商品规格
    		    index: 'goodsSpec',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'manufacturer',//商品厂家
    		    index: 'manufacturer',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'pinpaichangjia',//商品品牌厂家
    		    index: 'pinpaichangjia',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'firstPartyName',//协议甲方
    		    index: 'firstPartyName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'purchaseChannelName',//购进渠道
    		    index: 'purchaseChannelName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//控销类型
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(cellvalue,options,row){
    		    	var whetherArea = row.whetherArea;
    		    	var whetherCustomerType = row.whetherCustomerType;
    		    	var str = "";
    		    	if(whetherArea=="1"){
    		    		str+='区域 ';
    		    	}
    		    	if(whetherCustomerType=="1"){
    		    		str+=' 客户类型';
    		    	}
                    return str;
                }
        	},{
        		name: '',//是否独家
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//零售价是否维价
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//出库价维价
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//出库含税单价
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//供货含税单价
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: '',//零售价含税单价
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
        		name: 'listType',//黑白名单
    		    index: 'listType',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
    		    formatter:function(cellvalue,options,row){
    		    	var str = '';
    		    	if(cellvalue=="1"){
    		    		str+='黑名单';
    		    	}else if(cellvalue=="2"){
    		    		str+='白名单';
    		    	}else{
    		    		str+='无';
    		    	}
                    return str;
                }
        	},{
        		name: '',//控销设置
    		    index: '',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
    		    align:'center',
        	},{
	    		name: 'whetherArea',//
			    index: 'whetherArea',
			    width: 150,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",			
			    key:true,
			    hidden:true,
        	},{
	    		name: 'whetherCustomerType',//
			    index: 'whetherCustomerType',
			    width: 150,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",			
			    key:true,
			    hidden:true,
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 0,//每页显示记录数
//        rowList: [10, 20, 70],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
	
    
    
    $("#grid-table").on("click",".proCode",function(){
    	var proCode = $(this).text();    	
    	var auditBtnType = 1;//表示为协议列表点击查看详情，需要显示修改按钮
    	
    	$.ajax({
			url:basePath + '/pro/findStatusByProNo',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: proCode,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if(data.code == 0){          
                	window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+proCode,"协议详情",basePath+'/pro/proDetailShow?proCode='+ proCode+"&auditBtnType="+auditBtnType);
                }else {
                    btn_alertDialog("提示","该协议正在被审核，重新刷新页面！");
					setTimeout(function(){
						location.reload();
                    }, 1000);
                }
            }
		});
    	
    });
	$("#grid-table").on("click",".rebateAmount",function(){
	    	var proNo = $(this).parent().parent().children().first().next().text();
	    	var goodsCode = $(this).parent().parent().children().first().next().next().text();
	    	var firstPartyName = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().text();
	    	var firstPartyType = $(this).parent().parent().children().first().next().next().next().next().next().next().next().next().next().text();
	    	//拿到传的值
	    	var startTime = $(this).text();
	    	var endTime = $(this).text(); 
	    	//要点击的列    =$(this).text();
	    	var rebateStandard = firstPartyType; 
	    	 
	        top.dialog({
	          	url:basePath + '/pro/rebateAmount?proNo='+proNo+'&rebateStandard='+rebateStandard+'&goodsCode='+goodsCode+"&startTime="+startTime+"&endTime="+endTime+"&firstPartyName="+firstPartyName+"&firstPartyType="+firstPartyType,
	          	title: '返利金额明细',
	        	width:1200,
	        	height:400,
	        	data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
	        	onclose: function() {
	        	  var data = this.returnValue;
	        	  if (data == "success") {
	        		 $('#grid-table').jqGrid().trigger('reloadGrid');				
	        		 $('#value').html("这里是modal 返回的值  " + this.returnValue);
	        	  } 
	        	}
	          }).showModal();	
	    	
	    });

     
}

