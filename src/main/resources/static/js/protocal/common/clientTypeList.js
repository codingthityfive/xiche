
var grid_selector = "#grid-table";
$(document).ready(function () {
    var providerInfo=1;
    $("#grid-table").jqGrid({
        url: basePath+"/currency/queryClientTypeList",
        jsonReader : {
            root:"result"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        sortable: false, 
        colNames: ['编号','客户类型'],
        colModel: [{
            name: 'value',
            index: 'value',
            key: true, 
        },{
            name: 'name',
            index: 'name',
            sort:false
        }
        ], onSelectRow:function(){
            var id = $("#grid-table").jqGrid('getGridParam', 'selrow'); //根据点击行获得点击行的id（id为jsonReader: {id: "id" },）
            var selectRowData = $("#grid-table").jqGrid("getRowData", id); //根据上面的id获得本行的所有数据
            providerInfo=selectRowData;
        },  
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true//自动宽
    });
}); 


$(function() {
    var dialog = top.dialog.get(window);
    var data = dialog.data; // 获取对话框传递过来的数据
    $('#date_start_inp').val(data);

    $('.btn_submit').on('click', function() {
    	var ids = $("#grid-table").jqGrid('getGridParam','selarrrow');
    	if (!ids || ids.length==0) {
    		btn_alertDialog('提示','请选择数据')
    		return ;
    	}  
    	var clientTypeNames = "";
    	for(var i=0;i<ids.length;i++) {
    		clientTypeNames =clientTypeNames + "," + $("#grid-table").jqGrid('getRowData', ids[i]).name;
    	}
        dialog.close({"code":"success",cilentTypeIds:ids,clientTypeNames:clientTypeNames.substring(1)});
        dialog.remove();
    });

    //modal  关闭
    $('.btn_modalClose').click(function(){
        dialog.close().remove()
    })
});
