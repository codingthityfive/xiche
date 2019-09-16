var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "pageList",
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
        colNames: ['ID','厂家编号','厂家名称', '创建时间','创建人','关联商品',"操作"],
        colModel: [
        {
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:"center",
            width: 60,
            editable: false,
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        },
        {
        	name: 'factoryCode',
        	index: 'factoryCode',//索引。其和后台交互的参数为sidx
        	editable: false,
            width: 200,
            align:"center",
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	},
        }, 
        {
        	name: 'factoryName',
        	index: 'factoryName',//索引。其和后台交互的参数为sidx
        	editable: false,
            width: 300,
            align:"center",
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },
        {
        	name: 'createTime',
        	index: 'createTime',
            width: 250,
            align:"center",
        	editable: false,//是否可编辑
//        	edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	},
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
        },{
        	name: 'createName',
                align:"center",
        	index: 'createName',//索引。其和后台交互的参数为sidx
        	editable: false,
        	editoptions: {
        		size: "20",
        		maxlength: "30"
        	}
        },
            {name: 'operate', index: 'operate',
                align:"center",
                formatter: function (value, grid, rows, state) {
                    var btn= '';
                    if ($("#custom_product").val()) {//权限控制
                    	btn=  '<button class="btn btn-white" onclick="addGoods(\''+ rows.factoryCode+ '\');">关联商品</button>';
                    }
                    return btn;
                }
        },
//            {name: 'operate', index: 'operate',
//                formatter: function (value, grid, rows, state) {
//                    var btn= '';
//                    if ($("#custom_user").val()) {//权限控制
//                    	btn=  '<button class="btn btn-white" onclick="manageUser(\''+ rows.factoryCode+ '\');">关联人员</button>';
//                    }
//                    return btn;
//                }
//            },
            {name: 'operate', index: 'operate',
                width: 300,//宽度
                align:"center",
                formatter: function (value, grid, rows, state) {
                    var btn= '';
					if ($("#custom_edit").val()) {//权限控制
						btn = btn + '<button class="btn btn-white" onclick="toUpdate(\''+ rows.factoryCode+ '\');">编辑</button>';
					}
					if ($("#custom_del").val()) {//权限控制
						btn = btn + '<button class="btn btn-white" onclick="toDelete(\''+ rows.factoryCode+ '\');" >删除</button>';
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
	  		url: basePath+'/custom/toAdd?isUpdate='+0,
	  		title: '新增厂家',
            width:800,
            height:470,
	  		data: '1', // 给modal 要传递的 的数据
	  		onclose: function() {
                var result = this.returnValue;
//                if (result) {
                    reload();
//                }
	  		}
	  	})
	  	.showModal();
	  	return false;
	});

    /**
     *  重置
     */
    $("#clear").click(function(){
        $("#factoryCode").val('');
        $("#factoryName").val('');
        reload();
    });

    $("#queryBtn").click(function(){
        reload();
    });

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
function  reload() {
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "factoryCode": $("#factoryCode").val(),
            "factoryName": $("#factoryName").val()
        },page:1
    }).trigger('reloadGrid');
}

/**
 * 修改编辑
 * @param id
 * @returns {boolean}
 */
function toUpdate(id) {
    top.dialog({
        url: basePath+'/custom/toAdd?isUpdate='+1+"&id="+id,
        title: '编辑厂家',
        width:800,
        height:470,
        data: '2', // 给modal 要传递的 的数据
        onclose: function() {
            reload();
        }
    }).showModal();
    return false;
}


/**
 * 删除
 * @param id
 * @returns {boolean}      onclick="confirmDialog('确认信息', '确定删除？',okevent)"
 */
function toDelete(id) {
    confirmDialog('确认信息', '确定删除？',doDelete,id);
}

function doDelete(id){
    if(id){
        $.ajax({
            url: basePath+'/custom/editIsuse?id='+id,
            type: 'GET', //GET
            data: '',
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
            	console.log(data);
                if (data.code == 0) {
                    btn_alertDialog("提示","删除成功!");
                    reload();
                } else {
                	 btn_alertDialog("提示",data.msg);
                }
            }
        });
    }

}

/**
 * 关联商品
 */
function addGoods(factoryCode){
    top.dialog({
        url:basePath+'/custom/addOrUpdateGoods?factoryCode='+factoryCode,
        title: '关联商品',
        width:1000,
        height:450,
        data: factoryCode, // 给modal 要传递的 的数据
        onclose: function() {
            var result = this.returnValue;
            if (result) {
                reload();
            }
        }
    }).showModal();
    return false;
}
/**
 *  关联人员
 */
//function manageUser(factoryCode){
//    top.dialog({
//        url:basePath+ '/custom/toManageUser?factoryCode='+factoryCode,
//        title: '关联人员',
//        width:800,
//        height:470,
//        data: factoryCode, // 给modal 要传递的 的数据
//        onclose: function() {
//            var result = this.returnValue;
//            if (result) {
//                reload();
//            }
//        }
//    }).showModal();
//    return false;
//}

/**
 *  关联人员
 */
function manageUser(factoryCode) {
	top.dialog({
		url: basePath+'/custom/toManageUser?factoryCode='+factoryCode,
		title: '关联人员',
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




