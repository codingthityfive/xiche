var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
var w_width = $(window).width() * 0.8;
var w_height = $(window).height() * 0.75;
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", // 数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",// 高度，表格高度。可为数值、百分比或'auto'
        // mtype:"GET",//提交方式
        colNames: ['step','id', '单据类型','创建日期','协议编号','甲方','协议类型','甲方类型','生效日期','结束日期','公司（乙方）','协议责任人','审批状态','归档编号','归档备注','操作'],
        colModel: [
            {
                name: 'step',
                index: 'step',
                hidden:true
            },
    	{
        	name: 'id',
        	index: 'id',
        	hidden:true
        },
            {
                name: 'auditType',
                index: 'auditType',
                align:'center',
                width: 150,
                formatter: function(value,options,row){if(value == 1){return '协议新建'};if(value == 2){return '协议修改'};if(value == 3){return '协议返利下账/调整'};if(value == 4){return '返利预存新建'};}
            },
        {
        	name: 'createTime',
        	index: 'createTime',
        	width: 150,
        	align:'center',
            formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm');}
        },
        {
            name: 'proNo',
            index: 'proNo',
            align:'center',
            width: 200
        },
            {
                name: 'firstPartyName',
                index: 'firstPartyName',
                align:'center',
                width: 200
            },
            {
                name: 'proType',
                index: 'proType',
                align:'center',
                width: 200,
                formatter: function(value,options,row){if(value == 1){return '一级协议'};if(value == 2){return '二级协议'}else if(value == 3){return '临时协议'}else if(value == 4){return '商业供货协议'}else if(value == 5){return '代理商协议'}else{return ''};}
            },

        {
            name: 'firstPartyType',
            index: 'firstPartyType',
            align:'center',
            width: 150,
            formatter: function(value,options,row){if(value == 1){return '工业-生产厂家'};if(value == 2){return '工业-品牌厂家'};if(value == 3){return '商业-供应商'};if(value == 4){return '代理商'};}
        },
            {
                name: 'effectiveStartDate',
                index: 'effectiveStartDate',
                width: 150,
                align:'center',
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },
            {
                name: 'effectiveEndDate',
                index: 'effectiveEndDate',
                width: 150,
                align:'center',
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            }, { name: 'secondPartyName',
                index: 'secondPartyName',
                align:'center',
                width: 200
            },
            {
                name: 'proLeaderName',
                index: 'proLeaderName',
                align:'center',
                width: 150
            },{ name: 'status',
                index: 'status',
                align:'center',
                width: 100,
                formatter: function(value,options,row){
                if(value == 0){
                        return '待审核'
                }else if(value == 1){
                        return '一审通过'
                }else if(value == 2){
                    return '一审驳回'
                }else if(value == 4){
                    return '二审通过'
                }else if(value == 5){
                    return '二审驳回'
                }else if(value == 7){
                    return '已归档'
                };
                 }
            },
            { name: 'archivesCode',
                index: 'archivesCode',
                align:'center',
                width: 200
            },
            { name: 'archivesNote',
                index: 'archivesNote',
                align:'center',
                width: 200
            },
            {  name: 'operate',
			 index: 'operate',
			 width: 200,// 宽度
			 align:'center',
			 formatter: function (value, grid, rows, state) {
			 var btn = '';
				 if ($("#pro_audit_see").val()) { //权限控制
					 btn = btn + '<button class="btn btn-white" onclick="ViewdetilDatas(\''+rows.id+'\');" >查看</button>';
				 }
				 if(rows.status == 0 && $("#pro_audit_audit").val() || rows.status == 1 && $("#pro_audit_secondaudit").val()){ //权限控制
					 btn = btn + '<button class="btn btn-white" onclick="AuditdetilDatas(\''+rows.id+'\');">审核</button>';
				 }
                 if(rows.status == 4 && $("#pro_audit_archive").val() && $("#pro_audit_audit").val() ){ //权限控制
                     btn = btn + '<button class="btn btn-white" onclick="AuditdetilArchive(\''+rows.id+'\');">归档</button>';
                 }
			 	return btn;
			 }
		 }
        ],
        rownumbers: true,
        viewrecords: true,// 是否在浏览导航栏显示记录总数
        rowNum: 10,// 每页显示记录数
        rowList: [10, 20, 30],// 用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,// 分页、按钮所在的浏览导航栏
        altRows: true,// 设置为交替行表格,默认为false
        multiselect: false,// 是否多选
        multiboxonly: true,// 是否只能点击复选框多选
        autowidth: true,// 自动宽
        onSelectRow:function(id){
            var allRowIds = $("#grid-table_product").jqGrid('getDataIDs'); // 获取表格共有多少行数据
            var ids = $("#grid-table_product").jqGrid("getGridParam", "selarrrow"); // 当前
        },
        onSelectAll:function(rowids,statue){ // 全选获取所有行的ID
            console.log(rowids)
        },
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

    });
    jQuery("#grid-table").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("你enter了一行， id为:"+rowid)} } );
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    Date.prototype.Format = function (fmt) { // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "H+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
});
	
	$("#queryBtn").click(function(){
    	var createTimeStr = $("#createTimeStr").val();
    	var createTimeEnd = $("#createTimeEnd").val();
//    	if(createTimeStr == '' && createTimeEnd != ''){
//    		btn_alertDialog("提示","请选择单据提交起始日期!");
//    		return
//    	}
    	if(createTimeStr != '' && createTimeEnd != ''){
    		if(createTimeStr > createTimeEnd){
    			btn_alertDialog("提示","单据提交日期起始日期不能大于结束日期!");
        		return
    		}
    	}
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "createTimeStr": createTimeStr,//开始日期
                "createTimeEnd": createTimeEnd,//截止日期    
                "proNo": $("#proNo").val(),//协议编号
                "proLeaderName": $("#proLeaderName").val(),//协议负责人
                "auditType": $("#auditType").val(),//单据类型
                "status": $("#status").val(),//审批状态
                "proType": $("#proType").val(),//协议类型
                "auditNo": $("#auditNo").val(),//单据编号
                "isInitition" : 0,//是否草签协议 默认0否
                "firstPartyName": $("#firstPartyName").val(),//甲方
                "secondPartyName": $("#secondPartyName").val()//乙方
            },page:1
        }).trigger('reloadGrid');
    });
	
	$("#resetBtn").click(function(){
	    $("#createTimeStr").val('');
	    $("#createTimeEnd").val('');
	    $("#proNo").val('');
	    $("#proLeaderName").val('');
	    $("#auditType").val('');
	    $("#status").val('');
	    $("#proType").val('');
	    $("#auditNo").val('');
	    $("#firstPartyName").val('');
	    $("#secondPartyName").val('')
	    $("#grid-table").jqGrid('setGridParam', {
	        postData: {
	        	"createTimeStr": '',//开始日期
                "createTimeEnd": '',//截止日期    
                "proNo": '',//协议编号
                "proLeaderName": '',//协议负责人
                "auditType": '',//单据类型
                "status": '',//审批状态
                "proType": '',//协议类型
                "auditNo": '',//单据编号
                "firstPartyName": '',//甲方
                "secondPartyName": ''//乙方
	        },page:1
	    }).trigger('reloadGrid');

	});
	
	$("#firstPartyName").on("dblclick", function () {
    	proFirstPartyName();
    });
	
	$("#secondPartyName").on("dblclick", function () {
    	proSecondPartyName();
    });
	
	$("#proLeaderName").on("dblclick", function () {
		proLeaderFlowMore();
    });
	$("#proNo").on("dblclick", function () {
    	proNoSearch();
    });

    $("#exportBtn").click(function(){
        confirmDialog("提示","是否确认导出表单内容?",exportProtocalData);
    });

    function exportProtocalData(){
        var createTimeStr = $("#createTimeStr").val();
        var createTimeEnd = $("#createTimeEnd").val();
        if(createTimeStr != '' && createTimeEnd != ''){
            if(createTimeStr > createTimeEnd){
                btn_alertDialog("提示","单据提交日期起始日期不能大于结束日期!");
                return
            }
        }
        var  proNo = $("#proNo").val();//协议编号
        var  proLeaderName = $("#proLeaderName").val();//协议负责人
        var  auditType = $("#auditType").val();//单据类型
        var  status = $("#status").val();//审批状态
        var  proType = $("#proType").val();//协议类型
        var  auditNo = $("#auditNo").val();//单据编号
        var  firstPartyName = $("#firstPartyName").val();//甲方
        var  secondPartyName = $("#secondPartyName").val();//乙方

        window.location.href = basePath + '/proAudit/protocalExport?createTimeStr='+ createTimeStr + '&createTimeEnd=' + createTimeEnd + '&proNo=' + proNo + '&proLeaderName=' + proLeaderName + '&auditType=' + auditType + '&status=' + status + '&proType=' + proType + '&auditNo=' + auditNo + '&firstPartyName=' + firstPartyName + '&secondPartyName=' + secondPartyName;
    }
//	 $("#AuditdetilDatas").click(function(){ //
//		 top.dialog({
//		 url: 'newproAudit/toAudit',
//		 title: '审核',
//		 width:900,
//		 height:600,
//		 data: null, // 给modal 要传递的 的数据
//		 onclose: function() {
//			 loderPage();
//			 }
//		 }).showModal();
//		 return false;
//	 });
	
	
	
	 function AuditdetilDatas(id) {
		 top.dialog({
			 url: 'newproAudit/toAudit?id='+id,
			 title: '审核',
			 width:900,
			 height:700,
			 autoheigh: true,//自动高
			 data: null, // 给modal 要传递的 的数据
			 onclose: function() {
				 loderPage();
				 }
			 }).showModal();
			 return false;
	}
    function AuditdetilArchive(id) {
        top.dialog({
            url: 'newproAudit/toArchive?id='+id,
            title: '',
            width:900,
            height:400,
            data: null, // 给modal 要传递的 的数据
            onclose: function() {
                loderPage();
            }
        }).showModal();
        return false;
    }
	 function ViewdetilDatas(id) {
		 window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+id,"查看",basePath+'/proAudit/toView?id='+ id);
//		 top.dialog({
//			 url: 'newproAudit/toView?id='+id,
//			 title: '查看',
//			 width:900,
//			 height:800,
//			 data: null, // 给modal 要传递的 的数据
//			 onclose: function() {
////				 loderPage();
//				 }
//			 }).showModal();
//			 return false;
	}
	 
	function loderPage(){
	    $("#grid-table").jqGrid('setGridParam', {
	        postData: {
	// "title": $("#biaoti").val(),//标签名
	// "currentDate": $("#date").val(),
	// "status":$("#status").val()
	        },page:1
	    }).trigger('reloadGrid');
	}

