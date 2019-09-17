var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    // var lastsel;
    $("#grid-table").jqGrid({
        url: "query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        // data: grid_data,//当 datatype 为"local" 时需填写
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: [ '申请日期','单据编号','商品名称', '申请人','归属厂家','分公司','联系电话','审核状态','操作'],
        colModel: [ {
            name: 'createTime',
            index: 'createTime',
            align:"center",
        },{
            name: 'billId',
            index: 'billId',
            align:"center",
        }, {
            name: 'goodsName',
            align:'center',
            index: 'goodsName',
        }, {
            name: 'createName',
            index: 'createName',
            align:"center"
        }, {
            name: 'factory',
            index: 'factory',
            align:"center"
        }, {
            name: 'companyName',
            index: 'companyName',
            align:"center"
        },{
            name: 'createTel',
            index: 'createTel',
            align:"center"
        },{
            name: 'status',
            index: 'status',
            align:"center",
            formatter:function(cellvalue, options, rowObject){
                var str ='';
                if(cellvalue == 0){
                    str='未审核';
                }else if(cellvalue == 1){
                    str='审核通过';
                }else{
                    str='审核不通过';
                }
                return str;
            },
            cellattr: addCellAttr
        },{
            name: 'operate',
            index: 'operate',
            width: 200,//宽度,
            align:"center",
            formatter: function (value, grid, rows, status) {
            	var btn = '';
            	if ($("#supply_see").val()) { //权限控制
            		btn = btn + '<button class="btn btn-white" onclick="toFind(\''+ rows.billId+ '\');">查看</button>';
            	}
                if(rows.status == 0){//未审核
                	if ($("#supply_audit").val()) { //权限控制
                		btn = btn + '<button class="btn btn-white" onclick="toAudit(\''+ rows.billId+ '\');">审核</button>';
                	}
                }
                return btn;
            }
        }],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        rownumbers: true,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        ondblClickRow:function(rowId){
            var billId = $("#grid-table").getCell(rowId, "billId");
            top.dialog({
                url: basePath+'/supply/toFind?billId='+billId,
                title: '补货详情',
                width:900,
                height:550,
                data: billId, // 给modal 要传递的 的数据
                onclose: function() {
                    if(this.returnValue) {
                        $('#value').html("这里是modal 返回的值  " + this.returnValue);
                    }
                }
            }).showModal();
            return false;
        },
        onSelectRow:function(rowId){
           /* var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
            console.log(ids) // 当前 选中行 的ids
            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
                $('#cb_grid-table').click();
            }
            alert(rowId);*/
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

    // jQuery("#grid-table").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("你enter了一行， id为:"+rowid)} } );
    // jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');

    //查询事件
    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "createTimeStr": $("#createTimeStr").val(),
                "factory": $("#factory").val(),
                "billId" : $("#billId").val(),
                "goodsName" : $("#goodsName").val(),
                "status" : $("#status").val(),
                "companyId": $("#companyId").val()//分公司
            },page:1
        }).trigger('reloadGrid');
    });

    //重置事件
    $("#resetBtn").click(function(){
        window.location.href=basePath+"/supply/toList";
    });


    function addCellAttr(rowId, val, rawObject, cm, rdata) {

        if (val=='未审核') {
            return "style='color:red'";
        }
        if (val=='审核通过') {
            return "style='color:green'";
        }
        if (val=='审核不通过') {
            return "style='color:blue'";
        }
    }

});

//reload事件
function reload(){
    /*$("#grid-table").jqGrid('setGridParam', {
        postData: {
            "createTimeStr":$("#createTimeStr").val(),
            "factory":$("#factory").val(),
            "billId":$("#billId").val(),
            "goodsName":$("#goodsName").val(),
            // "status":$("#status").val("")
        },page:1
    }).trigger('reloadGrid');*/
    window.location.href=basePath+"/supply/toList";
};

//查看
function toFind(billId) {
    top.dialog({
        url: basePath+'/supply/toFind?billId='+billId,
        title: '单据详情',
        width:900,
        height:600,
        data: {billId:billId}, // 给modal 要传递的 的数据
        onclose: function() {

        },
        oniframeload: function() {

        }
    }).showModal();
    return false;
};

//审核
function toAudit(billId) {
    top.dialog({
        url: basePath+'/supply/toAudit?billId='+billId,
        title: '单据详情',
        width:900,
        height:600,
        data: null, // 给modal 要传递的 的数据
        onclose: function() {
            reload();
        }
    }).showModal();
    return false;
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

