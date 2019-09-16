var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
    	url: basePath+'/app/appBootUp',    
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
        /*colNames: ['ID','商品编号','通用名称','规格','生产厂家', '品牌厂家',"操作"],*/
        colNames: ['序号', '图片预览','开机页名称','默认开机页',"状态","开始时间","结束时间","变更时间","操作人","操作"],
        colModel: [      
                
        {
        	name: 'id',
        	index: 'id',
            align:"center",
        },
        {
        	name: 'picturePath',
        	index: 'picturePath',
            align:"center",
        	formatter: function (cellvalue) {
        		return '<img src="'+cellvalue+ '"  style="width:80px;height:100px;" />';
            }            
            
        },
        {
        	name: 'bootUpName',
        	index: 'bootUpName',
            align:"center",
        },
        {
        	name: 'bootUpYesOrNo',
        	index: 'bootUpYesOrNo',
            align:"center",
        	formatter: function (cellvalue) {
                var str = '';
                if (cellvalue == 1) {
                    str = "是";
                }else if(cellvalue == 0){
                	str = "否";
                } 
                return str;
            }
        },
        {
        	name: 'state',
        	index: 'state',
            align:"center",
        	formatter: function (cellvalue) {
                var str = '';
                if (cellvalue == 1) {
                    str = "排期中";
                }else if(cellvalue == 2){
                	str = "进行中";
                }else if(cellvalue == 3){
                	str = "已过期";
                }else if(cellvalue == 4){
                	str = "已暂停";
                } 
                return str;
            }
        },
        {
        	name: 'startTime',
        	index: 'startTime',
            align:"center",
        },
        {
        	name: 'endTime',
        	index: 'endTime',
            align:"center",
        },
        {
        	name: 'updateTime',
        	index: 'updateTime',
            align:"center",
        },
        {
        	name: 'updateName',
        	index: 'updateName',
            align:"center",
        },
        
        {name: 'operationState', index: 'operationState',
            width: 300,//宽度
            align:'center',
            formatter: function (value, grid, rows, state) {
	            var btn = '';
	            if ($("#operationState").val()){//权限控制
	            	if(rows.state == 2 || rows.state == 4){//操作状态为进行中和已暂停的有启用停用状态按钮
		            	if(rows.operationState == 1){//操作状态为启用状态的展示停用按钮
			            	btn = btn + '<button class="btn btn-white" onclick="operationState(\''+ rows.id+ '\');">停用</button>';
			            }else {
			            	btn = btn + '<button class="btn btn-white" onclick="operationState(\''+ rows.id+ '\');">启用</button>';
			            }
	            	}
	            }
	            if ($("#edit").val()){//权限控制
	            	if(rows.state == 1){//只有排期中和暂停状态下的开机页面才可以编辑
	            		btn = btn + '<button class="btn btn-white" onclick="editAapp(\''+ rows.id+ '\');">编辑</button>';
		            }else if(rows.state == 4){
		            	btn = btn + '<button class="btn btn-white" onclick="editAapp(\''+ rows.id+ '\');">编辑</button>';
		            }else {
		            	btn = btn + '<button class="btn btn-white" onclick="listApp(\''+ rows.id+ '\');">查看</button>';
		            }
	            }
	            if ($("#delete").val()){//权限控制
	            	if(rows.state == 1){//只有排期中的开机图片可以删除
	            		btn = btn + '<button class="btn btn-white" onclick="deleteAapp(\''+ rows.id+ '\');">删除</button>';
		            } 	            	
	            }
	            return btn;
            }
        }
        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
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
	  		url: basePath+'/app/toAddAppBootUp',
	  		title: '新增app开机图片',
            width:1100,
            height:600,
	  		data: 'val值', // 给modal 要传递的 的数据
	  		onclose: function() {
                reload();
	  		},
	  		oniframeload: function() {
	  			//console.log('iframe ready')
	  		}
	  	})
	  	.showModal();
	  	return false;
	});
    
   
    /**
     *  重置
     */
    $("#clear").click(function(){
        $("#startTimeStr").val("");
        $("#endTimeStr").val("");
        $("#state").val("");
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "id": id, 
                "endTimeStr": endTimeStr, 
                "startTimeStr": startTimeStr, 
                "state":state
            },page:1
        }).trigger('reloadGrid');
    });

    $("#queryBtn").click(function(){
        reload();
    });
 

}); 
function  reload() { 
	var id = $("#id").val();
	var startTimeStr = $("#startTimeStr").val();
	var endTimeStr = $("#endTimeStr").val();
	var state = $("#state").val();
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "id": id,//id
            "startTimeStr": startTimeStr, 
            "endTimeStr": endTimeStr,
            "state": state
        },page:1
    }).trigger('reloadGrid');
}
function operationState(id) {
    $.ajax({
    	url: basePath+'/app/updateAppBootUpState?id='+id,
        type: 'POST', //GET
        async: false, //或false,是否异步
        data: {id:id}, // 给modal 要传递的 的数据
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xmlml/script/jsonp/text

        success: function (data) {
            if (data && data== 1) {
                window.location.reload();
            }
        },
        complete: function () {
            console.log('结束')
        }
    });
}
function deleteAapp(id) {
	var txt;
	  if (confirm("确认删除吗？")) {
		    $.ajax({
		    	url: basePath+'/app/delete?id='+id,
		        type: 'POST', //GET
		        async: false, //或false,是否异步
		        data: {id:id}, // 给modal 要传递的 的数据
		        timeout: 60000,    //超时时间
		        dataType: 'json',    //返回的数据格式：json/xmlml/script/jsonp/text

		        success: function (data) {
		            if (data && data== 1) {
		                window.location.reload();
		            }
		        },
		        complete: function () {
		            console.log('结束')
		        }
		    });
	  } else {
	    txt = "您取消了删除";
	  }

}
 
function editAapp(id) {
    top.dialog({
    	url: basePath+'/app/toUpdateAppBootUp?id='+id,
        title: '编辑app端开机页面',
        width:1100,
        height:600,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {
        	reload();
        	
        },
        oniframeload: function() {

        }
    }).showModal();
    return false;
}

function listApp(id) {
    top.dialog({
    	url: basePath+'/app/toListAppBootUp?id='+id,
        title: '查看app端开机页面',
        width:1100,
        height:600,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {
        	var result = this.returnValue;
        	if (result) {
        	}
        },
        oniframeload: function() {

        }
    }).showModal();
    return false;
}












