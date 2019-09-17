/*$(function() {
	var dialog = parent.dialog.get(window);
	var data = dialog.data; // 获取对话框传递过来的数据
	$('#member_code').val(data);

	$('.btn_submit').on('click', function() {
		var val = $('#member_code').val();
		dialog.close(val);
		dialog.remove();
	});
});*/
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var providerInfo=1;
    $("#grid-table").jqGrid({
        url: basePath+"/pro/proList",
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
        colNames: ['协议编号','协议甲方','创建日期','生效日期','结束日期','甲方类型','协议类型','返利兑付方式','返利兑付时间','购进渠道','商品数','协议负责人'],
        colModel: [{
            name: 'proNo',
            index: 'proNo',
            key:true,
            // width:70,
        },{
            name: 'firstPartyName',
            index: 'firstPartyName',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        }, {
            name: 'createTime',
            index: 'createTime',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        }, {
            name: 'effectiveStartDate',
            index: 'effectiveStartDate',
            formatter: function (cellValue, options, rowdata, action) {
                return rowdata.effectiveStartDate.substring(0,10);
            },
            // width:150,
        }, {
            name: 'effectiveEndDate',
            index: 'effectiveEndDate',
            formatter: function (cellValue, options, rowdata, action) {
                return rowdata.effectiveEndDate.substring(0,10);
            },
            // width:150,
        }, {
            name: 'firstPartyType',
            index: 'firstPartyType',
            formatter: firstPartyType,
            // width:150,
        }, {
            name: 'proType',
            index: 'proType',
            formatter: formarType,
            // width:150,
        }, {//
            name: 'cashType',
            index: 'cashType',
            // width:150,
        }, {//购进渠道
            name: 'cashTime',
            index: 'cashTime',
            // width:150,
        }, {//购进渠道
            name: 'purchaseChannel',
            index: 'purchaseChannel',
            // width:150,
        }, {//商品数
            name: 'productCount',
            index: 'productCount',
            // width:150,
        }
        // , {//任务量
        //     name: 'rewuCount',
        //     index: 'rewuCount',
        //     // width:150,
        // }
        , {//协议负责人
            name: 'proLeaderName',
            index: 'proLeaderName',
            // width:150,
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
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30, 40,50],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true//自动宽
    });
    $("#queryBtn").click(function(){
        // console.log($("#provider").val());
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "supplyName": $("#gys").val(),
            },page:1
        }).trigger('reloadGrid');
    });

    $('#queryBtn').keyup(function(e) {
        if (e.keyCode == 13) {
            $("#grid-table").jqGrid('setGridParam', {
                postData: {
                    "supplyName": $("#gys").val(),
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
function formarType(cellValue, options, rowdata, action) {
    if(rowdata.proType==1){
        return "一级协议";
    }else if(rowdata.proType==2){
        return "二级协议";
    }else if(rowdata.proType==3){
        return "临时协议";
    }else if(rowdata.proType==4){
        return "商业供货协议";
    }else if(rowdata.proType==5){
        return "代理商协议";
    }
}

function firstPartyType(cellValue, options, rowdata, action) {
    if(rowdata.firstPartyType==1){
        return "工业-生产厂家";
    }else if(rowdata.firstPartyType==2){
        return "工业-品牌厂家";
    }else if(rowdata.firstPartyType==3){
        return "商业-供应商";
    }
}

