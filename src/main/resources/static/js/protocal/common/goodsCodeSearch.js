var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var providerInfo=1;
    var entId = $("#entId").val();
    $("#grid-table").jqGrid({
        url: basePath+"/pro/goodsCodeSearch",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total",
        },
        postData:{"entId":entId},
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        sortable: false,
        // mtype:"GET",//提交方式
        colNames: ['old商品编号','商品编号','商品名称','规格','生产厂家'],
        colModel: [
            {
                name: 'oldGoodsCode',
                index: 'oldGoodsCode',
                key: false,
                align:'center',
                hidden:true
            },
        	{
	            name: 'goodsCode',
	            index: 'goodsCode',
	            key: false,
	            align:'center',
                formatter: function(value,options,row){
	                var old = row.oldGoodsCode;
	                if(old){
	                    return old;
                    }else {
	                    return value;
                    }
                }
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
	        }
        ], onSelectRow:function(){
            var id = $("#grid-table").jqGrid('getGridParam', 'selrow'); //根据点击行获得点击行的id（id为jsonReader: {id: "id" },）
            var selectRowData = $("#grid-table").jqGrid("getRowData", id); //根据上面的id获得本行的所有数据
            providerInfo=selectRowData;
        },
        loadComplete: function() {
            var table = $(this);
            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); // 表格默认第一行 选中状态
//            $("#grid-table").setSelection(allRowIds[0]);
//            var ta = $('#grid-table>tbody>tr')[1];
            setTimeout(function(){
                updatePagerIcons(table);
               // $(ta).trigger('focus')
            }, 0);

        },ondblClickRow:function(rowId){
            var dialog = parent.dialog.get(window);
            dialog.close(providerInfo).remove();
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30, 40,50],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
       autowidth: true,//自动宽
       rownumbers: true,//自动显示行
    });
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'center'},'');
    $("#queryBtn").click(function(){
        console.log($("#provider").val());
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "goodsCode": $("#goodsCode").val(),
                "goodsName": $("#goodsName").val(),
                "manufacturer": $("#manufacturer").val(),
            },page:1
        }).trigger('reloadGrid');
    });

    $('#queryBtn').keyup(function(e) {
        if (e.keyCode == 13) {
            $("#grid-table").jqGrid('setGridParam', {
                postData: {
                    "goodsCode": $("#goodsCode").val(),
                    "goodsName": $("#goodsName").val(),
                    "manufacturer": $("#manufacturer").val(),
                },page:1
            }).trigger('reloadGrid');
        }
    });
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

});
$('input[lit=seach]').keyup(function(e) {
    if (e.keyCode == 13) {
        $("#queryBtn").click();
    }
});
//指定商业公司
$("#comEnsure").click(function(){
    var id = $("#grid-table").jqGrid('getGridParam', 'selrow'); //根据点击行获得点击行的id（id为jsonReader: {id: "id" },）
    var selectRowData = $("#grid-table").jqGrid("getRowData", id); //根据上面的id获得本行的所有数据
    providerInfo=selectRowData;
    if(selectRowData.goodsCode == undefined){
    	btn_alertDialog("提示","请选择商品!");
    	return false;
    }
	var dialog = parent.dialog.get(window);
	dialog.close(providerInfo).remove();
	
});
