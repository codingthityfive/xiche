$(function() {
	var grid_selector = "#grid-table";
	var pager_selector = "#grid-pager";
	var dialog = top.dialog.get(window);
	var data = dialog.data; // 获取对话框传递过来的数据
	var companyIds = data.companyIds;
	var includeGroup = data.includeGroup;
	var url = "pageList";
	if (includeGroup == 0) {//includeGroup=0表示不查集团公司
		url = "pageList?includeGroup=0";
	}
	 $("#grid-table").jqGrid({
    	url: url,
    	jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        colNames: ['分公司ID','分公司标准名称', '地区','entId编码'],
        colModel: [
		{
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,
            hidden:true
        }, {
            name: 'companyName',
            index: 'companyName',
        }, {
            name: 'provinceName',
            index: 'provinceName',
        }, {
                name: 'entId',
                index: 'entId',
                hidden: true,
                editable:false
            }
        ],
        //shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum:10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
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
	 

	//modal  关闭
	$('.btn_modalClose').click(function(){
	    dialog.close().remove()
	})

	$(".btn_submit").click(function(){
		var id = $('#grid-table').jqGrid('getGridParam','selrow');
	    if(!id){
	    	btn_alertDialog('提示','请选择分公司');
	    }else{
	    	var rowData = $("#grid-table").jqGrid('getRowData',id);
	    	dialog.close({companyId:rowData.id,companyName:rowData.companyName,entId:rowData.entId});
	    	dialog.remove();
	    }
	});

	$("#queryBtn").click(function(){
	    $("#grid-table").jqGrid('setGridParam', {
	        postData: {
	            companyName: $.trim($("#companyName").val()),
	        	provinceName: $.trim($("#provinceName").val())
	        },page:1
	    }).trigger('reloadGrid');
	});

	$("#clear").click(function(){
		$("#searchForm")[0].reset();
		$("#grid-table").jqGrid('setGridParam', {
	        postData: {
	        	companyName: null,
	        	provinceName: null
	        },page:1
		}).trigger('reloadGrid');
	});

})
