var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "findAllSpSysUser",
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
        colNames: ['ID','分公司','部门','姓名', '账号','角色','账号状态','创建人','开通时间','操作'],
        colModel: [
        {
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:"center"
        },
        {
            name: 'companyName',
            index: 'companyName',
            align:'center',
            width: 250
        },
        {
            name: 'department',
            align:'center',
            index: 'department'
        },
        {
        	name: 'userName',
            align:'center',
        	index: 'userName'
        }, 
        {
        	name: 'accountNumber',
            align:'center',
        	index: 'accountNumber'
        },{
        	name: 'roles',
            align:'center',
        	index: 'roles'
        },{
            name: 'state',
            index: 'state',
            align:"center",
            formatter: "select",
            editoptions: {
                value: "0:<span style='color: red'>冻结</span>; 1:正常"
            }
        },
        {
        	name: 'creator',
            align:'center',
        	index: 'creator'
        },
        {
        	name: 'createTimeStr',
            align:'center',
        	index: 'createTimeStr'
        },

        {name: 'operate', index: 'operate',
            width: 300,//宽度
            align:'center',
            formatter: function (value, grid, rows, state) {
	            var btn = '';
	            if ($("#sysuser_edit").val()){//权限控制
	            	btn = btn + '<button class="btn btn-white" onclick="toUpdate(\''+ rows.id+ '\');">编辑</button>';
	            }
	            if ($("#sysuser_status").val()){//权限控制
	            	if(rows.state == 1){
		            	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">冻结</button>';
		            }else {
		            	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">启用</button>';
		            }
	            }
	            if ($("#sysuser_password").val()){//权限控制
	            	btn = btn + '<button class="btn btn-white" data-toggle="modal" data-target="#myModal" >重置密码</button>';
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
        autowidth: true,//自动宽
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
 *  重置
 */
$("#clear").click(function(){
    $("#userName").val("");
    $("#mobile").val("");
    $("#isuse").val("");
    if ($("#companyId")) {
    	$("#companyId").val("");
    	$("#companyName").val("");
    }
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "userName": $("#userName").val(),//姓名
            "mobile": $("#mobile").val(),//手机号码
            "state": $("#state").val(),//状态
            "companyId":""
        },page:1
    }).trigger('reloadGrid');
    
});

/**
 * 跳转到新增页面
 */
$("#toAdd").click(function() {
      top.dialog({
        url: 'authority/authorityAdd',
        title: '新增账号',
         width:420,
        height:350,
        data: 'val值', // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            reload();//重新刷新页面
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    })
    .showModal();
    return false;
});
    
    
    /**
     * 导出
     */
   /* $("#exportExcel").click(function() {
    	var changjia = $("#changjia").val();
    	var username = $("#username").val();
    	var phone = $("#phone").val();
    	var isuseFlag = $("#isuse").val();
    	var isuse;
    	if(isuseFlag==1){
    		isuse = true;
    	}else{
    		isuse = false;
    	}
    	var user= {};
    	user.changjia = changjia;
    	user.username = username;
    	user.phone = phone;
    	user.isuse = isuse;
    	$.ajax({
            url: 'exportExcel',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: JSON.stringify(user),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                console.log(data);
            },
            complete: function () {
                console.log('结束')
            }
        });
    });*/
    /**
     * 查询
     */
    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "userName": $("#userName").val(),//姓名
                "mobile": $("#mobile").val(),//手机号码
                "state": $("#state").val(),//状态
                "companyId": $("#companyId").val()
            },page:1
        }).trigger('reloadGrid');
    });
    
    
    
  //pc导出
    $("#exportPcExcel").click(function(){   //
        top.dialog({
            url:'authority/tosysExportPcList',
            title: '导出',
            width:500,
            height:200,
            data: null, // 给modal 要传递的 的数据
            onclose: function() {
//                loderPage();
            }
        }).showModal();
        return false;
    });
    //app导出
    $("#exportAppExcel").click(function(){   //
        top.dialog({
            url: 'authority/toExportAppList',
            title: '导出',
            width:500,
            height:200,
            data: null, // 给modal 要传递的 的数据
            onclose: function() {
//                loderPage();
            }
        }).showModal();
        return false;
    });
});

/**
 * 重新加载的方法
 */
function  reload() {
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "userName": $("#userName").val(),
            "mobile": $("#mobile").val(),
            "state": $("#state").val(),
            "companyId": $("#companyId").val()
        },page:1
    }).trigger('reloadGrid');
}

function toUpdate(id) {
    top.dialog({
        url: 'authority/toUpdate?id='+id,
        title: '编辑厂家',
        width:420,
        height:350,
        data: {id:id}, // 给modal 要传递的 的数据
        onclose: function() {
            reload();
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
        var state=0;
        if(rowData.state==0){
            state=1;
        }
        var object ={
            id:rowData.id,
            state:state
        }
        $.ajax({
            url: 'updateState',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: JSON.stringify(object),
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if (data.code == 0) {
                    btn_alertDialog("提示","修改成功!");
                    $("#grid-table").jqGrid('setGridParam', {
                        postData: {
                            "name": $("#name").val()//标签名
                        },page:1
                    }).trigger('reloadGrid');
                } else if (data.code == 1) {
                    var error = JSON.parse(data.error);
                    alert(error[0].message + "，错误代码：" + error[0].errNo);
                }
                else {
                    btn_alertDialog("提示","转换出现未知错误");
                }
            },
            complete: function () {
                //console.log('结束')
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
    
    var reg=/^[\u2E80-\u9FFF]+$/;
    
    if(newpwd==""){
        $("#resultMsg").text("新密码不能为空");
        return ;
     }
    if(pwd==""){
       $("#resultMsg").text("请再次输入密码");
       return ;          
    }else{
    	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    	if(reg.test(newpwd)){
    		$("#resultMsg").text("密码格式不正确，必须由6到16位字母和数字组成");
    		return ;
    	}
    	if(newpwd.match(/^[0-9]*$/) || newpwd.match(/^[A-Za-z]+$/)) {
    		 
    		$("#resultMsg").text("密码格式不正确，必须由6到16位字母和数字组成");
    		return ;
    	}  
    }
    if(newpwd!=pwd){
        $("#resultMsg").text("密码不一致请重新输入密码");
        return ;
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
                    btn_alertDialog("提示",data.msg);
                    $('#myModal').modal('hide');
                    $("#grid-table").jqGrid('setGridParam', {
                        postData: {
                            "name": $("#name").val()//标签名
                        },page:1
                    }).trigger('reloadGrid');
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

function cleanMsg(){
	$("#resultMsg").text("");
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
/**
 * 导出
 */
$("#exportBtn").click(function() {
	confirmDialog("提示","是否确认导出表单内容?",exportData);
});
function exportData(){
	$("#searchForm").attr('action',"exportExcel"); 
	$("#searchForm").submit();
}

$(function () {
            $('#newpwd').keyup(function () {
                var len = $('#newpwd').val().length;
                if (len < 7) {
	                $('#spinfo').css('color','red')
                    $('#spinfo').text('密码太弱');
                }
                else if (len >= 7 && len < 11) {
                    $('#spinfo').css('color','blue')
                    $('#spinfo').text('密码强度一般');
                }
                else {
	                $('#spinfo').css('color','green')
                    $('#spinfo').text('密码强度强');
                }
            })
  })
