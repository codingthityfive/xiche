var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "queryMessageManageList",
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
        colNames: ['序号','发布时间','发布人', '消息类型','标题','有效期','状态','目标范围','点击数','操作'],
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
        	name: 'releasetime',
        	index: 'releasetime',//索引。其和后台交互的参数为sidx
        	//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        	width: 200,
        	editable: false,
            align:'center',
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	},
            formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
        },

        {
        	name: 'releasename',
        	index: 'releasename',//索引。其和后台交互的参数为sidx
        	//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        	editable: false,
            align:'center',
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
            name: 'messagetype',
            index: 'messagetype',
            align:'center',
            editable: false,//是否可编辑
            formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            editoptions: {
                value: "0:手动发布;1:自动发布"
            }
        },

        {
        	name: 'title',
        	index: 'title',
            align:'center',
        	width: 300,//宽度
        	editable: false,//是否可编辑
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },

        {
        	name: 'usefullife',
        	index: 'usefullife',
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
        	name: 'status',
        	index: 'status',
            align:'center',
        	editable: false,//是否可编辑
        	formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	editoptions: {
        		value: "0:未生效 ;1:有效 ;2:已失效"
        	}
        },

        {
        	name: 'targetscope',
        	index: 'targetscope',
            align:'center',
        	editable: false,//是否可编辑
        	formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	editoptions: {
        		value: "0:所有厂家 ;1:指定厂家 "
        	}
        },

        {
                name: 'hits',
                index: 'hits',
                align:'center',
                editable: false,//是否可编辑
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },

            {	name: 'operate',
                index: 'operate',
                align:'center',
                width: 300,//宽度
                formatter: function (value, grid, rows, state) {
                    if(rows.status == 0){
                    	var btn = '';
                    	if ($("#msg_update").val()) {//权限控制
                    		btn = btn + '<button class="btn btn-white" onclick="detilDatas(\''+rows.id+'\');" >修改</button>';
                    	}
                    	if ($("#msg_del").val()) {//权限控制
                    		btn = btn + '<button class="btn btn-white" onclick="deleteMsg(\''+rows.id+'\');">删除</button>';
                    	}
                        return btn;
                    }else if(rows.status == 1){
                    	if ($("#msg_lose").val()) {//权限控制
                    		return '<button class="btn btn-white qiangzhi_shixiao" onclick="updateStatus(\''+rows.id+'\');">强制失效</button>';
                    	}else{
                    		return '';
                    	}
                    }else {
                        return '';
                    }
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
            isDetaiMessage(rowdata);
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
    jQuery("#grid-table_product").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("你enter了一行， id为:"+rowid)} } );
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
});
$("#queryBtn").click(function(){
    var release = $("#date").val();

    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "title": $("#biaoti").val(),//标签名
            "currentDate": $("#date").val(),
            "status":$("#status").val(),
            "companyId":$("#companyId").val(),
        },page:1
    }).trigger('reloadGrid');

});

$("#resetBtn").click(function(){
    $("#biaoti").val('');
    $("#date").val('');
    $("#status").val('')
    $("#companyName").val(''),
    $("#companyId").val('')
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "title": '',//标签名
            "currentDate":'',
            "status":'',
            "companyId":'',
        },page:1
    }).trigger('reloadGrid');

});

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

function isDetaiMessage(id) {
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
                sussData.isupdate = 11;
            }
        });
        if(sussData != "" || sussData != null){
            top.dialog({
                url: 'message/toAdd',
                title: '查看消息',
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