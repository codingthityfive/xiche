var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "query",
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
        colNames: ['ID','姓名','创建人','创建时间',"操作"],
        colModel: [
        {
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:"center"
        },
        {
        	name: 'name',
        	index: 'name',
            width: 250
        }, 
        {
        	name: 'creator',
        	index: 'creator',
            align:"center",
        },
        {
        	name: 'createtime',
        	index: 'createtime',
        	width:250,
            align:"center",
        },{
        	name: 'operate',
        	index: 'operate',
			width:300,
			align:'center',
            formatter: function (value, grid, rows, state) {
                var html = '<button class="btn btn-white" onclick="toDel(\''+ rows.id+ '\');">删除</button>';
                return html;
            }
        }
        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        onSelectRow:function(id){
        	if(id){
        		var cellValue=$("#grid-table").getCell(id,"status");//获取某个单元格的值
        		$("#toEdit").attr("href","addProduct.shtml?id="+id);
        		$("#toEdit").attr("data-status",cellValue);
        	}else{
        		$(".toEdit").attr("href","javascript:;");
        	}
        },
        autowidth: true, //自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
    });

    
  $("#toAdd").click(function() {
		  top.dialog({
	  		url: basePath+'/proBusinessOperator/toAdd',
	  		title: '新增厂家',
            width:500,
            height:300,
	  		data: 'val值', // 给modal 要传递的 的数据
	  		onclose: function() {
                reload();
	  		},
	  		oniframeload: function() {
	  		}
	  	})
	  	.showModal();
	  	return false;
	});
    
    /**
     *  重置
     */
    $("#clear").click(function(){
    	$("#name").val('');
    	$("#grid-table").jqGrid('setGridParam', {
            postData: {
            	"name": $("#name").val()//标签名
            },page:1
        }).trigger('reloadGrid');
    });

    $("#queryBtn").click(function(){
        reload();
    });
    
    function  reload() {
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
            	"name": $("#name").val()//标签名
            },page:1
        }).trigger('reloadGrid');
    }
    
})

  
  //删除
    function toDel(id) {
    	confirmDialog("确认信息","确定删除该商家运营签订人？",deleteRole,id);
    }

    function deleteRole(id) {
    	$.post(basePath+"/proBusinessOperator/delete?id="+id, '', function(data) {
    		  if (data.code == 0) {
    			  btn_alertDialog('提示','删除成功');
    			  //刷新列表
    			  $("#grid-table").jqGrid('setGridParam', {
    				  page:1
    			  }).trigger('reloadGrid');
    		  } else {
    			  btn_alertDialog('提示',data.msg);
    		  }
    	});
    }

