
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$(document).ready(function () {
    var dialog = top.dialog.get(window);
    var datas = dialog.data;
    $("#grid-table").jqGrid({
        url: "findAllGoods",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData :{
            entId : datas,
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: ['序号','商品编号',"商品名称","规格","生产厂家"],
        colModel: [{
            name: 'goodsId',
            index: 'goodsId',
            key:true,
            width:70,
            align:'center',
        },{
            name: 'goodsCode',
            index: 'goodsCode',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            width:100,
        },{
            name: 'goodsName',
            index: 'goodsName',//索引。其和后台交互的参数为sidx

            align:'center',
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略

        },{

            name: 'goodsSpec',
            index: 'goodsSpec',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:'center',
        },{

            name: 'manufacturer',
            index: 'manufacturer',//索引。其和后台交互的参数为sidx
            key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            //align:'center',
        }
        ], onSelectRow:function(){

        },

        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: true,//是否多选
        multiboxonly: false,//是否只能点击复选框多选
        autowidth: true,//自动宽
    });

    $("#model_close_btn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });

    $("#submit_goods_btn").click(function(){
        var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");
        if(ids.length <= 0){
            btn_alertDialog("提示",'请至少选择1个商品！');
            return false;
        }
        dialog.close(ids).remove();
    });

    $("#queryBtn").click(function(){
        var goods_code = $("#goods_code").val();
        var goods_Name = $("#goods_Name").val();
        var factoryName = $("#factory_Name").val();
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "goodsCode": goods_code,
                "goodsName": goods_Name,
                "factoryName":factoryName,
            },page:1
        }).trigger('reloadGrid');

    });

});

