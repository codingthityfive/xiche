var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
    	url: basePath+'/newChangjia/pinpaiList',    
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
        colNames: ['生产厂家', '品牌厂家','分公司权限','审核状态',"操作"],
        colModel: [      
                
        {
        	name: 'shengchanchangjia',
        	index: 'shengchanchangjia',
            align:"center",
        },
        {
        	name: 'pinpaichangjia',
        	index: 'pinpaichangjia',
            align:"center",
        },
        {
        	name: 'companyName',
        	index: 'companyName',
            align:"center",
        },
        {
        	name: 'state',
        	index: 'state',
            align:"center",
        	formatter: function (cellvalue) {
                var str = '';
                if (cellvalue == 1) {
                    str = "待审核";
                }else if(cellvalue == 0){
                	str = "审核通过";
                }else if(cellvalue==2){
                	str = "审核未通过";
                }
                return str;
            }
        },
            {name: 'operate', index: 'operate',
                align:"center",
                formatter: function (value, grid, rows, state) {
                	var btn= '';
                	if ($("#changjia_shengchan").val()) {//权限控制
                		btn = btn + '<button class="btn btn-white" onclick="toUpdateShengchan(\''+ rows.id+ '\');">更新生产厂家</button>';
                	}
                  	if ($("#changjia_pinpai").val()) {//权限控制
                		btn = btn + '<button class="btn btn-white" onclick="toUpdatePinpai(\''+ rows.id+ '\');">更新品牌厂家</button>';
                	}
                  	 
                	/*if ($("#changjia_frozen").val()) {//权限控制
                		if(rows.isuse == true){
    	                	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">冻结</button>';
    	                }else {
    	                	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">启用</button>';
    	                }
                	}*/
                	/*if ($("#changjia_edit_password").val()) {//权限控制
                		btn = btn + '<button class="btn btn-white" data-toggle="modal" data-target="#myModal" >重置密码</button>';
                	}*/
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

    /**
     * 编辑
     */
//    $("#toEdit").click(function() {
//        var gr = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
//        console.log(gr);
//        if (gr != null) {
//            window.location.href = "toUpdate?id=" + gr;
//        } else {
//            alert("请选择需要编辑的记录");
//        }
//    });
    
    /**
     * 跳转到新增页面
     */
//    $(function() {
//        //客户编号双击
//        $('#toAdd').dblclick(function () {
//        	toAddChangjia();
//        })
//    })
    
  $("#toAdd").click(function() {
		  top.dialog({
	  		url: basePath+'/newChangjia/toChangJiaAdd',
	  		title: '新增厂家',
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
        $("#shengchanchangjia").val("");
        $("#pinpaichangjia").val("");
        var companyId = "";
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "id": id, 
                "shengchanchangjia": shengchanchangjia, 
                "pinpaichangjia": pinpaichangjia, 
                "companyid":companyId
            },page:1
        }).trigger('reloadGrid');
    });

    $("#queryBtn").click(function(){
        reload();
    });
    
    /**
     * 批量操作
     * @returns
     */
    $("#batchHandle").click(function(){
    	var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");  
    	if(ids.length<=0){
    		btn_alertDialog("提示","请选择批处理条目");
    	}else{
    		//弹出批量处理弹框
    		top.dialog({
    	  		url: basePath+'/changjia/toBatch?userIds='+ids,
    	  		title: '批量操作',
                width:1100,
                height:550,
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
    	}
    });
});
function  reload() { 
	var id = $("#id").val();
 
	var shengchanchangjia = $("#shengchanchangjia").val();
	/*shengchanchangjia = shengchanchangjia.replace(/\s+/g,"");*/
	shengchanchangjia = $.trim(shengchanchangjia)
	var pinpaichangjia = $("#pinpaichangjia").val();
	/*pinpaichangjia = pinpaichangjia.replace(/\s+/g,"");*/
	pinpaichangjia = $.trim(pinpaichangjia)
	var companyId = $("#companyId").val();
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "id": id,//id
           /* "shangpinbianhao":$("#shangpinbianhao").val(), 
            "tongyongmingcheng": tongyongmingcheng, */
            "shengchanchangjia": shengchanchangjia, 
            "pinpaichangjia": pinpaichangjia, 
            "companyid":companyId
        },page:1
    }).trigger('reloadGrid');
}
function toUpdateShengchan(id) {
    top.dialog({
        url: basePath+'/newChangjia/toUpdateShengchan?id='+id,
        title: '更新生产厂家',
        width:1100,
        height:600,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {
        	var result = this.returnValue;
        	if (result) {
                reload();
        	}
        },
        oniframeload: function() {

        }
    }).showModal();
    return false;
}
function toUpdatePinpai(id) {
    top.dialog({
        url: basePath+'/newChangjia/toUpdatePinpai?id='+id,
        title: '更新品牌厂家',
        width:1100,
        height:600,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {
        	var result = this.returnValue;
        	if (result) {
                reload();
        	}
        },
        oniframeload: function() {

        }
    }).showModal();
    return false;
}
/**
 * 冻结/解冻
 */
function toFrozen(rowid){
    if (rowid != null) {
        var rowData = $("#grid-table").jqGrid('getRowData',rowid);
        var isuse=true;
        if(rowData.isuse){
            isuse=false;
        }
        var object ={
            id:rowData.id,
            isuse:isuse
        }
        $.ajax({
            url: 'editIsuse',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: JSON.stringify(object),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if (data.code == 0) {
                    btn_alertDialog("提示","修改成功!");
                    reload();
                } else if (data.code == 1) {
                    var error = JSON.parse(data.error);
                    btn_alertDialog("提示",error[0].message + "，错误代码：" + error[0].errNo);
                }
                else {
                    btn_alertDialog("提示","转换出现未知错误");
                }
            },
            complete: function () {
                reload();
            }
        });
    } else {
        btn_alertDialog("提示","请选择需要编辑的记录");
    }
}
/**
 *  重置密码
 */
function changPwd(){
    var rowid=$("#grid-table").jqGrid("getGridParam","selrow")
    var newpwd=$("#newpwd").val();
    var pwd=$("#pwd").val();

    var st = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/i;
    //中文
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    
    var ist = st.test(newpwd);
    if(newpwd=="" || pwd==""){
        dialog({
            title: '提示',
            content:"请输入密码!!",
            zIndex:"1051"
        }).show();
        return false;
    }else if(newpwd!=pwd){
        dialog({
            title: '提示',
            content:"输入的密码不一致，请重新输入!!",
            zIndex:"1051"
        }).show();
        return false;
    }

    if(reg.test(newpwd)){
       dialog({
            title: '提示',
            content:"请确认密码为6-15位数字和字母组合!!",
            zIndex:"1051"
        }).show();
        //btn_alertDialog("提示","请确认密码为6-15位数字和字母组合!!")
        return false;
    }
    var istp = st.test(pwd);
    if(newpwd.match(/^[0-9]*$/) || newpwd.match(/^[A-Za-z]+$/)){
        dialog({
            title: '提示',
            content:"请确认密码为6-15位数字和字母组合!!",
            zIndex:"1051"
        }).show();
       // btn_alertDialog("提示","请确认密码为6-15位数字和字母组合!!")
        return false;
    }
    

        var user={
            id:rowid,
            password:pwd
        };
        $.ajax({
            url: 'editPassword',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: JSON.stringify(user),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if (data.code == 0) {
                    $('#myModal').modal('hide');
                    reload();
                } else if (data.code == 1) {
                    var error = JSON.parse(data.error);

                    btn_alertDialog("提示",error[0].message + "，错误代码：" + error[0].errNo);
                }
                else {
                    btn_alertDialog("提示","转换出现未知错误");
                }
            },
            complete: function () {
                //console.log('结束')
            }
        });
}


$(function() {
    //分公司
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
				$("#companyName").attr("title",data.companyName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}