var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
var name = GetQueryString("name");
$(document).ready(function () {

    $("#grid-table").jqGrid({
        url:basePath+ "/pro/proNoSearch",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total",
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        sortable: false,
        // mtype:"GET",//提交方式
        colNames: ['协议编号'],
        colModel: [
        	 {
	            name: 'proNo',
	            index: 'proNo',//索引。其和后台交互的参数为sidx
	            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
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
            $("#grid-table").setSelection(allRowIds[0]);
            var ta = $('#grid-table>tbody>tr')[1];
            setTimeout(function(){
                updatePagerIcons(table);
                $(ta).trigger('focus')
            }, 0);

        },ondblClickRow:function(rowId){
            var dialog = parent.dialog.get(window);
            dialog.close(providerInfo).remove();
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 5,//每页显示记录数
        rowList: [5, 10, 15],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
       autowidth: true,//自动宽
       rownumbers: true,//自动显示行
    });
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    $("#queryBtn").click(function(){
        console.log($("#proNo").val());
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "proNo": $("#proNo").val()
            },page:1
        }).trigger('reloadGrid');
    });

    $('#queryBtn').keyup(function(e) {
        if (e.keyCode == 13) {
            $("#grid-table").jqGrid('setGridParam', {
                postData: {
                    "proNo": $("#proNo").val(),
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

function GetQueryString(name)
{
     // 用该属性获取页面 URL 地址从问号 (?) 开始的 URL（查询部分）
     var url = window.location.search;
     // 正则筛选地址栏
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     // 匹配目标参数
     var result = url.substr(1).match(reg);
     //返回参数值
     return result ? decodeURIComponent(result[2]) : null;
}