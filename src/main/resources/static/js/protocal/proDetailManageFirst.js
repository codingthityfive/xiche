var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
$(document).ready(function () {
    var trowid;
    
    $("#grid-table").jqGrid({
        url: basePath+ "/pro/detail/manage/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames: ['协议编号','协议甲方','创建日期','生效日期','结束日期', '甲方类型 ','协议类型 ','付款方式', '结算方式','返利兑付方式', 
        	'返利兑付时间 ','购进渠道 ','协议商品数','协议状态','协议返利兑付状态','协议责任人'],
        colModel: [
        	{
        		name: 'proNo',
			    index: 'proNo',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",		
			    formatter:function(cellvalue){
	                var str='<a href="javascript:void(0);" class="proCode">'+cellvalue+'</a>';
	                return str;
	            }
        	},{
        		name: 'firstPartyName',
			    index: 'firstPartyName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	},{
        		name: 'createTime',
			    index: 'createTime',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
			    formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'effectiveStartDate',
			    index: 'effectiveStartDate',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
			    editoptions: {
	        		size: "20",
	        		maxlength: "30"
	        	},        	
	        	formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'effectiveEndDate',
			    index: 'effectiveEndDate',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
			    editoptions: {
	        		size: "20",
	        		maxlength: "30"
	        	},        	
	        	formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
        	},{
        		name: 'firstPartyTypeName',
			    index: 'firstPartyTypeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	},{
        		name: 'proTypeName',
			    index: 'proTypeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	},{
        		name: 'payTypeName',
			    index: 'payTypeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	},{
        		name: 'balanceTypeName',
			    index: 'balanceTypeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	}, {
        		name: 'cashTypeName',
			    index: 'cashTypeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
        	},{
        		name: 'cashTimeName',
			    index: 'cashTimeName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
	        },{
	    		name: 'purchaseChannelName',
			    index: 'purchaseChannelName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
	        },{
	    		name: 'proNum',
			    index: 'proNum',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
	        },{
	    		name: 'statusName',//协议任务状态
			    index: 'statusName',
			    width: auto,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",
			    //hidden:true
	        },{
	            name: '',//协议返利兑付状态
	            index: '',
	            width: auto,//宽度
	            editable: false,//是否可编辑
	            edittype: "select",
	            hidden:true
	        },{
	            name: 'proLeaderName',//协议责任人
	            index: 'proLeaderName',
	            width: auto,//宽度
	            editable: false,//是否可编辑
	            edittype: "select",
	             
	        }
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
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

        onSelectRow:function(rowId){
            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
            console.log(ids) // 当前 选中行 的ids
            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
                $('#cb_grid-table').click();
            }
            trowid=rowId;
        },       
    
    });
    
    $("#grid-table").on("click",".proCode",function(){
    	var proCode = $(this).text(); 
    	var auditBtnType = 1;//表示为协议列表点击查看详情，需要显示修改按钮
    	window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+proCode,"协议详情",basePath+'/pro/proDetailShow?proCode='+ proCode+"&auditBtnType="+auditBtnType);
    });
       
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    $("#Exprot").click(function(){
    	var obj = new Object();
    	obj = timeJudge(obj);
        var proNo =$("#proNo").val();
        var proLeaderName = $("#proLeaderName").val();
        var proType =$("#proType").val();
        var firstPartyName =$("#firstPartyName").val();
        var whetherActivity = $("#whetherActivity").val();
        var businessSignName =$("#businessSignName").val();
        var purchaseChannel = $("#purchaseChannel").val();
        var secondPartyName =$("#secondPartyName").val();
        window.location.href=basePath+"/pro/export?proNo="+proNo+"&firstPartyName="+firstPartyName+"&whetherActivity="+whetherActivity+"&businessSignName=" +businessSignName+ 
        	"&purchaseChannel="+purchaseChannel + "&secondPartyName="+secondPartyName+"&effectiveStartDateStr="+obj.effectiveStartDateStr+
        	"&effectiveEndDateStr="+obj.effectiveEndDateStr+"&createTimeStartStr=" + obj.createTimeStartStr + "&createTimeEndStr="+obj.createTimeEndStr;
    });
    $("#queryBtn").click(function(){
    	var obj = new Object();
    	obj = timeJudge(obj);
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "effectiveStartDateStr": obj.effectiveStartDateStr,//生效日期
                "effectiveEndDateStr": obj.effectiveEndDateStr,//截止日期    
                "proNo": $("#proNo").val(),//协议编号
                "proLeaderName": $("#proLeaderName").val(),//协议负责人
                "createTimeStartStr": obj.createTimeStartStr,//创建日期
                "createTimeEndStr": obj.createTimeEndStr,//创建日期
                "proType": $("#proType").val(),//协议类型
                "firstPartyName": $("#firstPartyName").val(),//甲方
                "whetherActivity": $("#whetherActivity").val(),//是否活动协议
                "businessSignName": $("#businessSignName").val(),//经手人
                "purchaseChannelName": $("#purchaseChannelName").val(),//购进渠道
                "secondPartyName": $("#secondPartyName").val(),//乙方
            },page:1
        }).trigger('reloadGrid');
    });
    
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
    
});

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

function timeJudge(obj){
	debugger;
	var effectiveStartDateStr = $("#effectiveStartDate").val();
	var effectiveEndDateStr = $("#effectiveEndDate").val();
	var createTimeStartStr = $("#createTimeStart").val();
	var createTimeEndStr = $("#createTimeEnd").val();
	obj.effectiveStartDateStr = effectiveStartDateStr;
	obj.effectiveEndDateStr = effectiveEndDateStr;
	obj.createTimeStartStr = createTimeStartStr;
	obj.createTimeEndStr = createTimeEndStr;
	var date=new Date;
	if(effectiveStartDateStr == '' && effectiveEndDateStr != ''){
		btn_alertDialog("提示","请选择生效日期起始日期!");
		return false;
	}
	if(createTimeStartStr == '' && createTimeEndStr != ''){
		btn_alertDialog("提示","请选择创建日期!");
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
			btn_alertDialog("提示","生效日期中开始日期不能大于结束日期!");
    		return false;
		}
	}
	if(createTimeStartStr != '' && createTimeEndStr != ''){
		if(createTimeStartStr > createTimeEndStr){
			btn_alertDialog("提示","创建日期中开始日期不能大于结束日期!");
    		return false;
		}
	}
	
	if(createTimeStartStr != '' && createTimeEndStr == ''){
		if(createTimeStartStr>date){
			btn_alertDialog("提示","创建日期中开始日期大于当前日期，请选择结束日期!");
			return false;
		}
	}   
	return obj;
}