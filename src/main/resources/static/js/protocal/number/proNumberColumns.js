var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var providerInfo=1;
    var proNo = $("#proNo").val();
    $("#grid-table").jqGrid({
        url: basePath+"/pro/proNumberColumnsList",
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
        postData:{"proNo":proNo},
        // mtype:"GET",//提交方式
        colNames: ['协议编号','商品编码','商品名称','商品规格','生产厂家','品牌厂家','返利金额','计提返利金额','应收返利金额','单品返利'],
        colModel: [
        	{
	            name: 'proNo',
	            index: 'proNo',
	            key: true,
	            align:'center',
	        },{
	            name: 'goodsCode',
	            index: 'goodsCode',
	            align:'center',
	        },{
	            name: 'goodsName',
	            index: 'goodsName',
	            align:'center',
	        },{
	            name: 'goodsSpec',
	            index: 'goodsSpec',
	            align:'center',
	        },{
	            name: 'manufacturer',
	            index: 'manufacturer',
	            align:'center',
	        },{
	            name: 'pinpaichangjia',
	            index: 'pinpaichangjia',
	            align:'center',
	        },{
	            name: 'rebateAmount',
	            index: 'rebateAmount',
	            align:'center',
	        },{
	            name: 'provisionRebateAmount',
	            index: 'provisionRebateAmount',
	            align:'center',
	        },{
	            name: 'receivableRebateAmount',
	            index: 'receivableRebateAmount',
	            align:'center',
	        },{
	            name: 'itemRebate',
	            index: 'itemRebate',
	            align:'center',
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
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
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
    	window.location.href=basePath+"/pro/proNumberExport?proNo="+proNo;
    });

});
$('input[lit=seach]').keyup(function(e) {
    if (e.keyCode == 13) {
        $("#queryBtn").click();
    }
});

