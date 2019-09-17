var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
var dialog = top.dialog.get(window);
$(document).ready(function () {
    var lastsel;
    var id = $("#id").val();
   // alert(id);
    var cjuser_id_name = $("#cjuser_id_name").val();
    var phone = $("#phone").val();
    var factory = $("#factory").val();
    var factoryName = $("#factoryName").val();
    var heading = $("#heading").val();
    var dispose = $("#dispose").val();
    var content = $("#content").val();
   // var status = $("#status").val();
   // var createtime = $("#createtime").val();
   // alert("createtime:"+createtime);
    $("#grid-table").jqGrid({
        url: "/feedback/toSeeList?id="+id,
        jsonReader : {                      
            root:"result",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames: ['id','反馈人','手机号码','厂家','提交时间','标题','内容','处理结果','处理意见','厂家名称'],
        colModel: [
			{
			    name: 'id',
			    index: 'id',
			    width: 100,//宽度
			    editable: false,//是否可编辑
			    edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
			    hidden:true,
			},
            {
        	name: 'cjuser_id_name',
            index: 'cjuser_id_name',
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            width: 100,
            editable: false,
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        }, {
            name: 'phone',
            index: 'phone',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        }, {
            name: 'factory',
            index: 'factory',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'cl_datetime',
            index: 'cl_datetime',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'heading',
            index: 'heading',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            status
        },{
            name: 'content',
            index: 'content',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'status',
            index: 'status',
            width: 200,//宽度
            //editable: false,//是否可编辑
            //edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            formatter:function(cellvalue, options, rowObject){
                var str='';
                if(cellvalue == 1 ){
                    str='已处理';
                }else{
                    str='未处理';
                }
                return str;
            }
        },{
            name: 'dispose',
            index: 'dispose',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },
        {
            name: 'factoryName',
            index: 'factoryName',
            width: 200,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },

        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

    });
    $(".btnEdit").click(function() {
        var gr = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
        console.log(gr);
        if (gr != null) {
            window.location.href = "toUpdate?id=" + gr;
        } else {
            alert("请选择需要编辑的记录");
        }
    });
     
    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "cjuser_id_name": $("#cjuser_id_name").val(),//标签名
                "phone": $("#phone").val(),//标签名
                "factory": $("#factory").val(),//标签名
                "cl_datetime": $("#cl_datetime").val(),//标签名
                "heading": $("#heading").val(),//标签名
                "content": $("#content").val(),//标签名
                "status": $("#status").val(),//标签名
                "dispose": $("#dispose").val(),//标签名
                 
            },page:1
        }).trigger('reloadGrid');
    });
    $("#exportBtn").click(function(){
    	var createtime= $("#createtime").val();
        var cjuser_id= $("#cjuser_id").val();
        var factory=$("#factory").val();
        var phone=$("#phone").val();
        var heading=$("#heading").val();
        var status=$("#status").val();
        var content=$("#content").val();
        window.location.href="exportExcel";
    });
    $("#updateBtn").click(function(){
    	dispose = $("#dispose").val();
    	id = $("#id").val();
    	//alert(id);
    	$.ajax({
    		url: 'feedbackUpdate?id='+id+'&dispose='+dispose,
            data: '',
            dataType: "json",
            success: function(data){
            	if(data==1){
            		var dialog = top.dialog.get(window);
	   	  			dialog.close("success");
	   	  			dialog.remove();
            	}else{
            		var dialog = top.dialog.get(window);
     	  			dialog.close("erry");
     	  			dialog.remove();
            	}
	           
                }
    		});  
         
    });

    $("#model_close_btn").click(function () {
        dialog.close().remove();
    })
    
 
});