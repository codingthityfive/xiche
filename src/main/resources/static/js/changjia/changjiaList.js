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
        colNames: ['ID','厂家','厂家类型','分公司权限','姓名', '职务','手机号码','开通时间','账号状态',"操作"],
        colModel: [
        {
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            align:"center"
        },
        {
        	name: 'changjia',
        	index: 'changjia',
            width: 250
        }, 
        {
        	name: 'factoryType',
        	index: 'factoryType',
            align:"center",
        	formatter: function (cellvalue) {
                var str = '';
                if (cellvalue == '1') {
                    str = "生产厂家";
                }else if(cellvalue == "2"){
                	str = "品牌厂家";
                }else if(cellvalue=='3'){
                	str = "自定义厂家";
                }
                return str;
            }
        },
        {
        	name: 'companyName',
        	index: 'companyName',
        	width:250,
            align:"center",
        },
        {
        	name: 'username',
        	index: 'username',
            align:"center",
        },
        {
        	name: 'zhiwu',
        	index: 'zhiwu',
            align:"center",
        },
        {
        	name: 'phone',
        	index: 'phone',
            align:"center",
        },
        {
        	name: 'createTime',
        	index: 'createTime',
        	width: 200,
            align:"center",
        },
        {
            name: 'isuse',
            index: 'isuse',
            editable: false,//是否可编辑
            align:"center",
            formatter: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            editoptions: {
                value: "false:<span style='color: red'>冻结</span>; true:正常"
            }
        },
            {name: 'operate', index: 'operate',
                width: 300,
                align:"center",
                formatter: function (value, grid, rows, state) {
                	var btn= '';
                	if ($("#changjia_edit").val()) {//权限控制
                		btn = btn + '<button class="btn btn-white" onclick="toUpdate(\''+ rows.id+ '\');">编辑</button>';
                	}
                	/*if ($("#changjia_frozen").val()) {//权限控制
                		if(rows.isuse == true){
    	                	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">冻结</button>';
    	                }else {
    	                	btn = btn + '<button class="btn btn-white" onclick="toFrozen(\''+ rows.id+ '\');">启用</button>';
    	                }
                	}*/
                	if ($("#changjia_edit_password").val()) {//权限控制
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
	  		url: basePath+'/changjia/toAdd',
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
     * 导出
     */
    $("#exportExcel").click(function() {
    	var changjia = $("#changjia").val();
    	var username = $("#username").val();
    	var phone = $("#phone").val();
    	var isuseFlag = $("#isuse").val();
        var companyId = $("#companyId").val();
        var companyName = $("#companyName").val();
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
        user.companyId = companyId;
        user.companyName = companyName;
        window.location="exportExcel?changjia="+changjia+"&username="+username+"&phone="+phone+"&isuse="+isuseFlag+"&companyId="+companyId;
        // $.ajax({
        //     url: 'exportExcel',
        //     type: 'POST', //GET
        //     async: false,    //或false,是否异步
        //     data: JSON.stringify(user),
        //     timeout: 60000,    //超时时间
        //     dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        //     contentType: "application/json",
        //     success: function (data) {
        //         console.log(data);
        //     },
        //     complete: function () {
        //         console.log('结束')
        //     }
        // });
    });
    /**
     *  重置
     */
    $("#clear").click(function(){
        $("#changjia").val("");
        $("#username").val("");
        $("#phone").val("");
        $("#isuse").val("");
        $("#facType").val("");
        if ($("#companyId")) {
        	$("#companyId").val("");
        	$("#companyName").val("");
        }
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "changjia": $("#changjia").val(),//厂家名
                "username": $("#username").val(),//姓名
                "phone": $("#phone").val(),//手机号码asd
                "isuse": $("#isuse").val(),//状态
                "factoryType":$("#facType").val(),//厂家类型
                "companyId":""
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
	var changjia = $("#changjia").val();
	changjia = $.trim(changjia)
	/*changjia = changjia.replace(/\s+/g,"");*/
	var userName = $("#username").val();
	userName = userName.replace(/\s+/g,"");
	var phone = $("#phone").val();
	phone = phone.replace(/\s+/g,"");
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "changjia": changjia,//厂家名
            "factoryType":$("#facType").val(),//厂家类型
            "username": userName,//姓名
            "phone": phone,//手机号码
            "isuse": $("#isuse").val(),//状态
            "companyId" : $("#companyId").val()//分公司
        },page:1
    }).trigger('reloadGrid');
}
function toUpdate(id) {
    top.dialog({
        url: basePath+'/changjia/toUpdate?id='+id,
        title: '编辑厂家',
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
$(function () {
	     $('#newpwd').keyup(function () {
	         var len = $('#newpwd').val().length;
	         if (len < 7) {
		         $('#spinfo').css('color','red')
	             $('#spinfo').text('密码太弱');
	         }else if (len >= 7 && len < 11) {
	             $('#spinfo').css('color','blue')
	             $('#spinfo').text('密码强度一般');
	         }else {
		         $('#spinfo').css('color','green')
	             $('#spinfo').text('密码强度强');
	         }
	      })
	})