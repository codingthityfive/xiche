var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    var trowid;
    var yijian;
    
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
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames: ['id','反馈日期','反馈人','分公司','厂家','手机号码','标题','处理状态','操作','内容','处理意见','提交时间'],
        colModel: [
			{
			    name: 'id',
			    index: 'id',
			    editable: false,//是否可编辑
			    edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
			    hidden:true,
                align:'center',
			},{
            name: 'createtime',
            index: 'createtime',
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
        	name: 'cjuser_id_name',
            index: 'cjuser_id_name',
                align:'center',
            editable: false,
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        },{
            name: 'companyName',
            index: 'companyName',
                align:'center',
            width: 300,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'factoryName',
            index: 'factoryName',
                align:'center',
            width: 300,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'phone',
            index: 'phone',
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            
        },{
            name: 'heading',
            index: 'heading',
            width: 300,//宽度
                align:'center',
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
             
        },{
            name: 'status',
            index: 'status',
                align:'center',
            formatter:function(cellvalue, options, rowObject){
                var str='';
                
                if(cellvalue==1){
                    str='已处理';
                }else{
                    str='未处理';
                }
                return str;
            }
        },
        {	name: 'status', 
        	index: 'status',
            align:'center',
            width: 300,//宽度
            formatter:function(cellvalue, options, rowObject){
                var str='';
                if(rowObject.status==1){ 
                	if ($("#feed_see").val()) {//权限控制
                		 str='<button class="btn btn-white" onclick="toSeeNew(\''+rowObject.id+ '\');">查看</button>';
                	}
                }else{
                	if ($("#feed_edit").val()) {//权限控制
                		str='<button class="btn btn-white" onclick="toupdateNew(\''+rowObject.id+ '\',\''+rowObject.cjuser_id_name+ '\',\''+rowObject.phone+ '\',\''+rowObject.factoryName+ '\',\''+rowObject.createtime+ '\',\''+rowObject.heading+ '\',\''+rowObject.status+ '\');">编辑</button>';
                	}
                }
                return str;
            }
        },
        {
		    name: 'content',
		    index: 'content',
		    hidden:true,
            align:'center',
		},{
		    name: 'dispose',
		    index: 'dispose',
		    hidden:true,
                align:'center',
		},
		{
		    name: 'factoryName',
		    index: 'factoryName',
		    hidden:true,
            align:'center',
		},
        
        
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
//                updatePagerIcons(table);
            }, 0);
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: false,//是否只能点击复选框多选
        autowidth: true,//自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

        onSelectRow:function(rowId){
            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
            console.log(ids) // 当前 选中行 的ids
            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
                $('#cb_grid-table').click();
            }
            trowid=rowId;
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
                "cjuser_id_name": $("#cjuser_id_name").val(),//标签名resetBtn
                "phone": $("#phone").val(),//标签名
                "factoryName": $("#factoryName").val(),//标签名
                "status": $("#status").val(),//标签名
                "starttimeStr": $("#starttimeStr").val(),//标签名
                "endtimeStr": $("#endtimeStr").val(),//标签名
                "companyId" : $("#companyId").val(),//标签名
            },page:1
        }).trigger('reloadGrid');
    });

    $("#resetBtn").click(function(){
        $("#cjuser_id_name").val('');
        $("#endtimeStr").val('');
        $("#starttimeStr").val('');
        $("#status").val('');
        $("#factoryName").val('');
        $("#phone").val('');
        $("#companyId").val('');
        $("#companyName").val('');
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "cjuser_id_name": '',//标签名
                "phone": '',//标签名
                "factoryName": '',//标签名
                "status": '',//标签名
                "starttimeStr": '',//标签名
                "endtimeStr":'',//标签名
                "companyId" :'',	
            },page:1
        }).trigger('reloadGrid');
    });

    
    /**
     * 导出
     */
    $("#exportBtn").click(function() {
    	$("#searchForm").attr('action',"exportExcel"); 
    	$("#searchForm").submit();
    });
    
/*    $("#toupdateBtn").click(function(){
    	if(trowid==null){
      		 alert("请先选择一条需处理数据");
      	 }else{
      		 
    	var id=$("#grid-table").getCell(trowid,"id")
    	var cjuser_id_name=$("#grid-table").getCell(trowid,"cjuser_id_name")
        var phone=$("#grid-table").getCell(trowid,"phone")
        var factory=$("#grid-table").getCell(trowid,"factory")
        var factoryName=$("#grid-table").getCell(trowid,"factoryName")
        var createtime=$("#grid-table").getCell(trowid,"createtime")
        var heading=$("#grid-table").getCell(trowid,"heading")
        var status=$("#grid-table").getCell(trowid,"status")
        var content=$("#grid-table").getCell(trowid,"content")
    	if(status=="未处理"){
     		var status = 0;
     		//alert("status:"+status);
     	}else{
     		var status = 1;
     		//alert("status:"+status);
     	}
    	var createTimeStr = createtime;
        top.dialog({
            url: 'feedback/toUpdate?id='+id+'&cjuser_id_name='+cjuser_id_name+'&phone='+phone+'&factoryName='+factoryName+'&createTimeStr='+createTimeStr+'&heading='+heading+'&content='+content+'&status='+status,
            title: '处理',
            width:900,
            height:400,
            data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
            onclose: function() {
            	var data = this.returnValue;
    			if (data == "success") {
    				//window.location="toList";
    			} 
            }
        }).showModal();
    	}
    });*/
    
    

});
function toSeeNew(id) {
       top.dialog({
       	url: 'feedback/toSee?id='+id,
        title: '查看',
        width:1100,
        height:550,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {

        },
        oniframeload: function() {

        }
    })
        .showModal();
    return false;
}
function toupdateNew(id,cjuser_id_name,phone,factoryName,createtime,heading,status) {
var createTimeStr = createtime;

	/*if(status=="未处理"){
 		var status = 0;
 		//alert("status:"+status);
 	}else{
 		var status = 1;
 		//alert("status:"+status);
 	}*/
	
    top.dialog({
        url: 'feedback/toUpdate?id='+id+'&cjuser_id_name='+cjuser_id_name+'&phone='+phone+'&factoryName='+factoryName+'&createTimeStr='+createTimeStr+'&heading='+heading+'&status='+status,
        title: '处理',
        width:900,
        height:600,
        data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        onclose: function() {
        	var data = this.returnValue;
			if (data == "success") {
                $("#grid-table").jqGrid('setGridParam', {
                    postData: {
                        "cjuser_id_name": $("#cjuser_id_name").val(),//标签名resetBtn
                        "phone": $("#phone").val(),//标签名
                        "factoryName": $("#factoryName").val(),//标签名
                        "status": $("#status").val(),//标签名
                        "starttimeStr": $("#starttimeStr").val(),//标签名
                        "endtimeStr": $("#endtimeStr").val(),//标签名
                        "companyId" : $("#companyId").val(),//标签名
                    },page:1
                }).trigger('reloadGrid');
			} 
        }
    }).showModal();
};

$(function() {
    //选择分公司
    $('#companyName').dblclick(function () {
    	checkCompany();
    })
})

//选择分公司
function checkCompany() {
	top.dialog({
		url: basePath+'/company/checkCompany',
		title: '选择分公司',
		width:800,
    	height:600,
    	data: {companyIds:$("#companyId").val()}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#companyId").val(data.companyId);
				$("#companyName").val(data.companyName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}