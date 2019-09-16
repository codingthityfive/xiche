$(function() {
    var dialog = top.dialog.get(window);
    var data = dialog.data; // 获取对话框传递过来的数据
    var firstPartyType = data.firstPartyType;
    var manufacturer = data.manufacturer;
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    $("#grid-table").jqGrid({
        url:basePath+"/currency/queryRebateProduct",
        postData: {
        	firstPartyType: firstPartyType,
        	manufacturer: manufacturer
        },   
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: ['商品Key','商品ID','商品编号','商品名称','规格','生产厂家','品牌厂家'],
        colModel: [{
            name: 'productKey',
            index: 'productKey',
            width:100,
            key:true,
            hidden:true
        }, {
            name: 'productId',
            index: 'productId',
            width:100
        }, {
            name: 'goodsCode',
            index: 'goodsCode',
            width:100
        }, {
            name: 'goodsName',
            index: 'goodsName',
            width:300
        }, {
            name: 'goodsSpec',
            index: 'goodsSpec',
            width:120
        }, {
            name: 'manufacturer',
            index: 'manufacturer',
            width:300
        }, {
            name: 'pinpaichangjia',
            index: 'pinpaichangjia',
            hidden:true
        }],
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum:0,//每页显示记录数
        rowList: [10],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: true,//是否多选 
        autowidth: true,//自动宽
        onSelectRow:function(id){
            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
                $('#cb_grid-table').click();
            }
        },
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }
    });

    $('.btn_submit').on('click', function() { 
    	var productNos = $("#grid-table").jqGrid('getGridParam','selarrrow');
    	if (!productNos || productNos.length==0) {
    		btn_alertDialog('提示','请选择商品')
    		return ;
    	}
    	var products = [];
    	for (var i=0;i<productNos.length;i++){
    		var product = $("#grid-table").jqGrid('getRowData',productNos[i]);
    		products.push(product)
    	}
        dialog.close({"code":"success",products:products});
        dialog.remove();
    });

    //modal  关闭
    $('.btn_modalClose').click(function(){
        dialog.close().remove()
    })
    
    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
            	goodsCode: $.trim($("#goodsCode").val()),//商品编号
                goodsName: $.trim($("#goodsName").val()),//商品名称
                shengchanchangjia : $.trim($("#shengchanchangjia").val()),//生产厂家
            	firstPartyType: firstPartyType,
            	manufacturer: manufacturer
                
            },page:1
        }).trigger('reloadGrid');
    });

    $("#clear").click(function(){
    	$("#searchForm")[0].reset();
    	$("#grid-table").jqGrid('setGridParam', {
            postData: {
            	firstPartyType: firstPartyType,
            	manufacturer: manufacturer,
            	goodsCode:"",
            	goodsName:"",
            	shengchanchangjia:"",
            },page:1
    	}).trigger('reloadGrid');
    });

});
