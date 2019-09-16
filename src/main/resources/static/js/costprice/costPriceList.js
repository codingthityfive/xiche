var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "queryReportsByCondition",
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
        colNames: ['序号','所属分公司','商品编码', '商品名称','商品规格','生厂厂家','购进渠道','购进价','销售价','单品返利','成本价','创建时间','计算时间'],
        colModel: [
        {
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            editable: false,
            align:'center',
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        },

        {
        	name: 'companyName',
        	index: 'companyName',//索引。其和后台交互的参数为sidx
        	//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        	width: 200,
        	editable: false,
            align:'center',
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	},
            //formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
        },

        {
        	name: 'goodsCode',
        	index: 'goodsCode',//索引。其和后台交互的参数为sidx
        	//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        	editable: false,
            align:'center',
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
            name: 'goodsName',
            index: 'goodsName',
            align:'center',
            editable: false,//是否可编辑
           // formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            editoptions: {
            	size: "20",
        		maxlength: "30"
            }
        },

        {
        	name: 'goodsSpec',
        	index: 'goodsSpec',
            align:'center',
        	width: 300,//宽度
        	editable: false,//是否可编辑
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },
        
        {
        	name: 'manufacture',
        	index: 'manufacture',
            align:'center',
        	width: 300,//宽度
        	editable: false,//是否可编辑
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
        	name: 'purChannelName',
        	index: 'purChannelName',
            align:'center',
        	width: 300,//宽度
        	editable: false,//是否可编辑
//        	edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
        	name: 'purPrice',
        	index: 'purPrice',
            align:'center',
        	editable: false,//是否可编辑
        	//formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	//editoptions: {
        	//	value: "0:未生效 ;1:有效 ;2:已失效"
        	//}
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
        	name: 'salePrice',
        	index: 'salePrice',
            align:'center',
        	editable: false,//是否可编辑
        	//formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
                name: 'rebate',
                index: 'rebate',
                align:'center',
                editable: false,//是否可编辑
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
            
            {
                name: 'costPrice',
                index: 'costPrice',
                align:'center',
                editable: false,//是否可编辑
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
        
            {
                name: 'createTime',
                index: 'createTime',
                align:'center',
                editable: false,//是否可编辑
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
       {
            name: 'computeTime',
            index: 'computeTime',
            align:'center',
            editable: false,//是否可编辑
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        }

        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        ondblClickRow:function(rows){  //  双击行时触发  id:  当前行id
            var rowdata=$("#grid-table").getCell(rows,"id");
        },
        onSelectRow:function(id){
            var allRowIds = $("#grid-table_product").jqGrid('getDataIDs'); //  获取表格共有多少行数据
            var ids = $("#grid-table_product").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
            //console.log(ids) // 当前 选中行 的ids
            // if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
            //     $('#cb_grid-table').click();
            // }
        },
        onSelectAll:function(rowids,statue){ // 全选获取所有行的ID
            console.log(rowids)
        },
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

    });
    
    /**
     * 导出商品
     * @returns
     */
    $("#exportGoods").click(function(){
    	//公司Id
    	var companyId = $("#companyId").val();
    	//查询类型
    	var queryType = $("input[name='queryType']:checked").val();
    	//开始时间
        var startTime = $("#startComputeTime").val();
        //结束时间
        var endTime = $("#endComputeTime").val();
    	if(parseInt(companyId)>0){
    		window.location.href=basePath+"/costprice/exportGoods?companyId="+companyId
    		+"&queryType="+queryType
    		+"&startTime="+startTime
    		+"&endTime="+endTime;
    	}else{
    		btn_alertDialog("提示","请选择分公司!");
    	}
    });
});
$("#queryBtn").click(function(){
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "companyId": $("#companyId").val(),//标签名
            "goodsCode": $("#goodsCode").val(),
            "startComputeTime":$("#startComputeTime").val(),
            "endComputeTime":$("#endComputeTime").val(),
            "queryType":$("input[name='queryType']:checked").val()
        },page:1
    }).trigger('reloadGrid');

});

//$("#resetBtn").click(function(){
//    $("#biaoti").val('');
//    $("#date").val('');
//    $("#status").val('');
//    $("#companyName").val('');
//    $("#companyId").val('');
//    $("input[name='queryType']").first().attr("checked");
//    $("#grid-table").jqGrid('setGridParam', {
//        postData: {
//            "title": '',//标签名
//            "currentDate":'',
//            "status":'',
//            "companyId":'',
//            "queryType":1
//        },page:1
//    }).trigger('reloadGrid');
//
//});

$("#addToMessage").click(function(){   //
    top.dialog({
        url: 'message/toAdd',
        title: '发布消息',
        width:900,
        height:600,
        data: null, // 给modal 要传递的 的数据
        onclose: function() {
            loderPage();
        }
    }).showModal();
    return false;
});
$("#searchCompany").on("click", function () {
    selectDirectName();
});
function selectDirectName() {
    top.dialog({
        url: basePath+'/message/aadCompany',
        title:'分公司表单',
        width:500,
        height:500,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            if(this.returnValue) {
                var data=this.returnValue;

                $('#remark').focus();

                $('#entId').val( data.entId);
                $('#companyId').val( data.id);
                $('#companyName').val( data.companyName);
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}
function updateStatus(rowid) {

    if(rowid != null){

        //var data={"id":rowid};
        $.ajax({
            url: 'updateStatus?id=' +rowid,
            type: 'POST', //GET
            async: false,    //或false,是否异步
            //data: JSON.stringify(data),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                btn_alertDialog("提示","修改成功!");
                loderPage();
            },
            complete: function () {

            }
        });
    }

}
function deleteMsg(id) {
    if(id != null){
        $.ajax({
            url: 'deleteMsg?id='+id,
            type: 'POST', //GET
            async: false,    //或false,是否异步
            //data: JSON.stringify(data),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                    loderPage();
                    btn_alertDialog("提示","删除成功");
            },

        });
    }
}

function detilDatas(id) {
    var sussData="";
    if(id != null){
        $.ajax({
            url: 'selectMsg?id='+id,
            type: 'POST', //GET
            async: false,    //或false,是否异步
            //data: JSON.stringify(data),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                sussData = data;
            },
        });

        if(sussData != "" || sussData != null){
            top.dialog({
                url: 'message/toAdd',
                title: '发布消息',
                width:900,
                height:800,
                data: sussData, // 给modal 要传递的 的数据
                onclose: function() {
                    loderPage();
                    if(this.returnValue) {
                        //alert(this.returnValue)
                    }
                }
            }).showModal();
            return false;
        }
    }
}

function loderPage(){
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "title": $("#biaoti").val(),//标签名
            "currentDate": $("#date").val(),
            "status":$("#status").val()
        },page:1
    }).trigger('reloadGrid');
}

$("#upload_file1_btn").on('click',function () {
    var formData = new FormData();
    var name = $("#accessory1").val();
    formData.append("file",$("#accessory1")[0].files[0]);
    formData.append("name",name);
    if(name != null && name != ""){
    	$.ajax({
            url : basePath+'/costprice/importGoods',
            type : 'POST',
            data : formData,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(data) {
            	var code = data.code;
            	if(code == 0){
            		btn_alertDialog("提示","上传成功");
            	}
            	
            	if(code == 1){
            		btn_alertDialog("提示",data.msg);
            	}
            },
            error : function(data) {
            	btn_alertDialog("提示","上传失败");
                console.log("error");
            }
        });
    }else{
    	btn_alertDialog("提示","请选择文件后点击上传！");
    }
});