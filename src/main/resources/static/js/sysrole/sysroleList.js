var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
    	url: "query",
    	postData: {
             "roleName": $.trim($("#roleName").val())//角色名称
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
        colNames: ['角色ID','角色名称', '创建时间', '角色权限', '角色人员','操作'],
        colModel: [
		{
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
			align:'center',
            key: true//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
        }, {
            name: 'roleName',
                align:'center',
            index: 'roleName',
        }, {
            name: 'createTimeStr',
                align:'center',
            index: 'createTimeStr',
        }, {
            name: 'rolePermission',
                align:'center',
            index: 'rolePermission',
            formatter: function (value, grid, rows, state) {
            	var html = '';
            	if ($("#sysrole_perm").val()) { //权限控制
            		html = '<button class="btn btn-white" onclick="rolePermissionManage(\''+ rows.id+ '\');">权限管理</button>';
            	}
                return html;
            }
        }, {
            name: 'roleUser',
                align:'center',
            index: 'roleUser',
            formatter: function (value, grid, rows, state) {
            	var html = '';
            	if ($("#sysrole_user").val()) { //权限控制
            		html = '<button class="btn btn-white" onclick="roleUserManage(\''+ rows.id+ '\');">人员管理</button>';
            	}
                return html;
            }
        }, {
        	width:300,
        	name: 'operate',
                align:'center',
        	index: 'operate',
            formatter: function (value, grid, rows, state) {
            	var html = '';
            	if ($("#sysrole_update").val()) { //权限控制
            		html = html+'<button class="btn btn-white" onclick="toUpdate(\''+ rows.id+ '\');">修改</button>';
            	}
				if ($("#sysrole_del").val()) { //权限控制
					html = html+'<button class="btn btn-white" onclick="toDel(\''+ rows.id+ '\');">删除</button>';
				}
                return html;
            }
        }],
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
});


$("#queryBtn").click(function(){
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
        	"roleName": $.trim($("#roleName").val())//角色名称
        },page:1
    }).trigger('reloadGrid');
});

$("#clear").click(function(){
	$("#searchForm")[0].reset();
	$("#grid-table").jqGrid('setGridParam', {
        postData: {
        	"roleName": null//角色名称
        },page:1
	}).trigger('reloadGrid');
});

//新增
$("#addBtn").click(function(){
	top.dialog({
		url: basePath+'/sysrole/toAdd',
		title: '新增',
		width:400,
    	height:180,
		data: '', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				if (data.code == 0) {
					btn_alertDialog('提示','添加成功');
					//刷新列表
					$("#grid-table").jqGrid('setGridParam', {
						page:1
				    }).trigger('reloadGrid');
				} else {
					btn_alertDialog('提示',data.msg);
				}
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
});

//修改
function toUpdate(id) {
	top.dialog({
		url: basePath+'/sysrole/toUpdate?id='+id,
		title: '修改',
		width:400,
    	height:180,
		data: '', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				if (data.code == 0) {
					btn_alertDialog('提示','修改成功');
					//刷新列表
					$("#grid-table").jqGrid('setGridParam', {
						page:1
				    }).trigger('reloadGrid');
				} else {
					btn_alertDialog('提示',data.msg);
				}
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}

//删除
function toDel(id) {
	confirmDialog("确认信息","确定删除该角色？",deleteRole,id);
}

function deleteRole(id) {
	$.post(basePath+"/sysrole/delete?id="+id, '', function(data) {
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

//角色权限管理
function rolePermissionManage(id) {
	top.dialog({
		url: basePath+'/sysrole/rolePermissionManage?id='+id,
		title: '角色权限管理',
		width:800,
    	height:470,
		data: '', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				if (data.code == 0) {
					btn_alertDialog('提示','保存成功');
				} else {
					btn_alertDialog('提示',data.msg);
				}
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}

//角色人员管理
function roleUserManage(id) {
	top.dialog({
		url: basePath+'/sysrole/roleUserManage?id='+id,
		title: '角色人员管理',
		width:700,
    	height:470,
		data: '', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				if (data.code == 0) {
					btn_alertDialog('提示','保存成功');
				} else {
					btn_alertDialog('提示',data.msg);
				}
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}