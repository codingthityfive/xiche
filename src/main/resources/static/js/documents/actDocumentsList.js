var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
//function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    var trowid;
    var yijian;
    
    $("#grid-table").jqGrid({
        url: "query",
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
        colNames: ['id','申报日期','单据编号','活动类型id','活动类型','申报人','归属厂家','分公司','联系电话','单据状态','操作'],
        colModel: [
        	{
        		name: 'id',
			    index: 'id',
			    width: 100,//宽度
			    editable: false,//是否可编辑
                align:'center',
			    edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
			    key:true,
			    hidden:true,
        	},{
            name: 'createTime',//申报日期
            index: 'createTime',
            width: 100,//宽度
                align:'center',
            editable: false,//是否可编辑
            editoptions: {
        		size: "20",
        		maxlength: "30"
        	},        	
        	formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
        },{
        	name: 'billCode',//单据编号
            index: 'billCode',
            width: 100,
                align:'center',
            editable: false,
//            key:true,
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        },{
        	name: 'actType',//活动类型id
            index: 'actType',
                align:'center',
            hidden:true,
        },{
            name: 'actType',//活动类型
            index: 'actType',
            width: 200,//宽度
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            formatter:function(cellvalue, options, rowObject){
                var str='';
                if(cellvalue==1){
                    str='秒杀';
                }else if(cellvalue==2){
                    str='特价';
                }else if(cellvalue==3){
                	str='单品满减';
                }else if(cellvalue==4){
                	str='品牌满减';
                }else if(cellvalue==5){
                	str='单品满赠';
                }else if(cellvalue==6){
                	str='品牌满赠';
                }else if(cellvalue==7){
                	str='返利';
                }else {
                	str='套餐';
                }
                return str;
            }
            
        },{
            name: 'createUser',//申报人
            index: 'createUser',
            width: 200,//宽度
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'factory',//归属厂家
            index: 'factory',
            width: 200,//宽度
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
             
        }, {
            name: 'companyName',
            index: 'companyName',
            align:"center"
        },{
	    	name: 'phone',//联系电话
	        index: 'phone',
	        width: 200,//宽度
                align:'center',
	        editable: false,//是否可编辑
	        edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        },{
            name: 'status',
            index: 'status',
                align:'center',
            formatter:function(cellvalue, options, rowObject){
                var str='';
                
                if(cellvalue==1){
                	str='<span style="color: red">未审核</span>';
                }else if(cellvalue==2){
                    str='<span style="color: green">审核通过</span>';
                }else{
                	str='<span style="color: blue">审核不通过</span>';
                }
                return str;
            }
        },
        {	name: 'status', 
        	index: 'status',
            width: 200,//宽度
            align:'center',
            formatter:function(cellvalue, options, rowObject){
                var str='';
                if ($("#document_see").val()) {//权限控制
                	str = str + '<button class="btn btn-white" onclick="toSee(\''+rowObject.id+ '\',\''+rowObject.actType+'\');">查看</button>';
                }
                if(rowObject.status==1){ 
                	if ($("#document_audit").val()) {//权限控制
                		//str = str + '<button class="btn btn-white" onclick="toAudit(\''+rowObject.id+ '\',\''+rowObject.billCode+ '\',\''+rowObject.actType+'\',\''+rowObject.createTime+'\',\''+rowObject.status+'\',\''+rowObject.createUser+'\',\''+rowObject.phone+'\');">审核</button>';
                		str = str + '<button class="btn btn-white" onclick="toAudit(\''+rowObject.id+ '\',\''+rowObject.actType+'\');">审核</button>';
                    }
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
        ondblClickRow:function(rows){  //  双击行时触发  id:  当前行id
            var rowdata_id=$("#grid-table").getCell(rows,"id");
//            var rowdata_phone=$("#grid-table").getCell(rows,"id");
            var rowdata_actType=$("#grid-table").getCell(rows,"actType");
            isDetaiMessage(rowdata_id,rowdata_actType);
        },
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
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    $(".btnEdit").click(function() {
        var gr = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
        console.log(gr);
        if (gr != null) {
            window.location.href = "toUpdate?id=" + gr;
        } else {
            alert("请选择需要编辑的记录");
        }
    });
    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "createTimeStr": $("#createTimeStr").val(),//申报日期
                "factory": $("#factory").val(),//归属厂家
                "billCode": $("#billCode").val(),//单据编号
                "goodsName": $("#productName").val(),//商品名称
                "status": $("#status").val(),//单据状态
                "companyId": $("#companyId").val()//分公司
            },page:1
        }).trigger('reloadGrid');
    });

    $("#resetBtn").click(function(){
        $("#createTimeStr").val('');
        $("#factory").val('');
        $("#billCode").val('');
        $("#status").val('');
        $("#goodsName").val('');
        $("#status").val('');
        if ($("#companyId")) {
        	$("#companyId").val("");
        	$("#companyName").val("");
        }
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "createTimeStr": '',//标签名
                "factory": '',//标签名
                "billCode": '',//标签名
                "status": '',//标签名
                "goodsName": '',//标签名
                "status":'',//标签名
                "companyId":''
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
//function toAudit(id,billCode,actType,createTime,status,createUser,phone) {
function toAudit(id,actType) {
	var objectType = 1;
    top.dialog({
//        url: 'actDocuments/toAuditDocument?id='+id+'&billCode='+billCode+'&actType='+actType+"&createTime="+createTime+'&status='+status+'&createUser='+createUser+'&phone='+phone,
    	//url: 'actDocuments/toAudit?id='+id+'&phone='+phone,
    	url: 'actDocuments/toStockList?id='+id+'&actType='+actType+'&objectType='+objectType,
    	title: '单据详情',
        width:900,
        height:800,
        data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        onclose: function() {
        	var data = this.returnValue;
			if (data == "success") {
				$('#grid-table').jqGrid().trigger('reloadGrid');
				//window.location="toList";
				$('#value').html("这里是modal 返回的值  " + this.returnValue);
			} 
        }
    }).showModal();
}
function toSee(id,actType){
	var objectType = 2;
	top.dialog({
//        url: 'actDocuments/toSee?id='+id+'&phone='+phone,
		url: 'actDocuments/toStockList?id='+id+'&actType='+actType+'&objectType='+objectType,
        title: '单据详情',
        width:900,
        height:800,
        data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        onclose: function() {
        	var data = this.returnValue;
			if (data == "success") {
				//window.location="toList";
			} 
        }
    }).showModal();
};
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
function isDetaiMessage(id,actType) {
	var objectType = 2;
	top.dialog({
//        url: 'actDocuments/toSee?id='+id+'&phone='+phone,
		url: 'actDocuments/toStockList?id='+id+'&actType='+actType+'&objectType='+objectType,
        title: '单据详情',
        width:900,
        height:800,
        data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        onclose: function() {
        	var data = this.returnValue;
			if (data == "success") {
				//window.location="toList";
			} 
        }
    }).showModal();
}

$(function() {
    //选择分公司
    $('#companyName').dblclick(function () {
    	checkCompany();
    })
})

//选择分公司
function checkCompany() {
	top.dialog({
		url: basePath+'/company/checkCompany',
		title: '选择分公司',
		width:800,
    	height:600,
    	data: {companyIds:$("#companyId").val()}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#companyId").val(data.companyId);
				$("#companyName").val(data.companyName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}