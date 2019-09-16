var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var providerInfo=1;
    var productId = $("#productId").val();
    var manufacturer = $("#manufacturer").val();
    var productProNum = $("#productProNum").val();
    var goodsCode = $("#goodsCode").val();
    $("#grid-table").jqGrid({
        url: basePath+"/pro/findProductProNumColumns",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total",
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        postData: {
        	"productId":productId,
        	"manufacturer":manufacturer,
        	"goodsCode":goodsCode,
        	"productProNum":productProNum,
        	},
        // mtype:"GET",//提交方式
        colNames: ['商品编号','协议编号','协议甲方','创建日期','生效日期','结束日期','客户类型','协议类型','返利兑付方式','返利兑付时间',
        	'购进渠道','协议任务状态','协议返利兑付状态','返利金额','应收返利金额','返利下账金额','协议责任人'],
        colModel: [
        	{
	            name: 'goodsCode',//商品编号
	            index: 'goodsCode',
//	            key: true,
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'proNo',//协议甲方
	            index: 'proNo',
	            align:'center',
	            key:true,
	            width: 150,//宽度
	        },{
	            name: 'firstPartyName',//协议甲方
	            index: 'firstPartyName',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'createTime',//创建日期
	            index: 'createTime',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'effectiveStartDate',//生效日期
	            index: 'effectiveStartDate',
	            align:'center',
	            width: 150,//宽度
	            formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
	        },{
	            name: 'effectiveEndDate',//结束日期
	            index: 'effectiveEndDate',
	            align:'center',
	            width: 150,//宽度
	            formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
	        },{
	            name: '',//客户类型
	            index: '',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'proTypeName',//协议类型
	            index: 'proTypeName',
	            align:'center',
	            width: 150,//宽度	           
	        },{
	            name: 'cashTypeName',//返利兑付方式
	            index: 'cashTypeName',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'cashTimeName',//返利兑付时间
	            index: 'cashTimeName',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'purchaseChannelName',//购进渠道
	            index: 'purchaseChannelName',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'proTaskStatusStr',//协议任务状态
	            index: 'proTaskStatusStr',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: '',//协议返利兑付状态
	            index: '',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'rebateAmount',//返利金额
	            index: 'rebateAmount',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'receivableRebateAmount',//应收返利金额
	            index: 'receivableRebateAmount',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: '',//返利下账金额
	            index: '',
	            align:'center',
	            width: 150,//宽度
	        },{
	            name: 'proLeaderName',//协议责任人
	            index: 'proLeaderName',
	            align:'center',
	            width: 150,//宽度
	        },
        ], onSelectRow:function(){
            var id = $("#grid-table").jqGrid('getGridParam', 'selrow'); //根据点击行获得点击行的id（id为jsonReader: {id: "id" },）
            var selectRowData = $("#grid-table").jqGrid("getRowData", id); //根据上面的id获得本行的所有数据
            providerInfo=selectRowData;
        },
        loadComplete: function() {
            var table = $(this);
            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); // 表格默认第一行 选中状态
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);

        },ondblClickRow:function(rowId){
            var dialog = parent.dialog.get(window);
            dialog.close(providerInfo).remove();
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30, 40,50],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
//        autowidth: true,//自动宽shrinkToFit:false,
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
        rownumbers: true,//自动显示行
    });
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'center'},'');
    
    $("#cencelbtn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });

    $("#confirmbtn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close(providerInfo).remove();
    });


    $("#grid-table").jqGrid('bindKeys', {"onEnter":function( rowid ) {
        var dialog = parent.dialog.get(window);
        var rowData = $("#grid-table").jqGrid('getRowData',rowid);
        dialog.close(rowData);
    }});

    $("#export").click(function(){
    	window.location.href=basePath+"/pro/productProNumExport?productId="+productId+"&manufacturer="+manufacturer+
    		"&productProNum="+productProNum+"&goodsCode="+goodsCode;
    });
});
$('input[lit=seach]').keyup(function(e) {
    if (e.keyCode == 13) {
        $("#queryBtn").click();
    }
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
