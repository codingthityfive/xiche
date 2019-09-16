
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var dialog = top.dialog.get(window);
    var datas = dialog.data;
    $("#grid-table").jqGrid({
        url: "selectPriceFactory",
        jsonReader : {
            root:"result",
            // page: "result.pageNum",
            // total: "result.pages",
            // records: "result.total"
        },
        postData :{
            companyId : datas,
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: ['序号','甲方名称',"类型","地区"],
        colModel: [{
            name: 'id',
            index: 'id',
            key:true,
            width:70,
            align:'center',
        },{
            name: 'changjia',
            index: 'changjia',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        },{
            name: 'factoryType',
            index: 'factoryType',//索引。其和后台交互的参数为sidx
            width:100,
            align:'center',
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            editable: false,//是否可编辑
            formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            editoptions: {
                value: "1:生产厂家 ;2:品牌厂家 ;3:自定义厂家 "
            }
        },{

            name: 'provinceName',
            index: 'provinceName',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:'center',
        }
        ], onSelectRow:function(){

        },

        viewrecords: true,//是否在浏览导航栏显示记录总数
        // rowNum: 10,//每页显示记录数
        // rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        // pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
    });

    $("#model_close_btn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });

    $("#submit_factory_btn").click(function(){
        var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");
        if(ids.length <= 0){
            btn_alertDialog("提示",'请至少选择1个厂家！');
            return false;
        }
        dialog.close(ids).remove();
    });

    $("#queryBtn").click(function(){
        var factroyName = $("#price_factroy_Name").val();

        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "changjia": factroyName,
            },page:1
        }).trigger('reloadGrid');

    });

});

