//var dialog = top.dialog.get(window);
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
//function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {  //这里一个js只能写一个
    var trowid;
    var dialog = top.dialog.get(window);
    $("#grid-table").jqGrid({    	
    	url: "/manage/actDocuments/queryProduct?activId=" + $("#id").text(),
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
        colNames: [ '活动商品','库存','活动价格（元）', '活动总量（最小单位）','活动开始时间','活动结束时间'],
        colModel: [{
        	 name: 'goodsCode',
             index: 'goodsCode',
         }, {
             name: 'inventory',
             index: 'inventory',
         }, {
             name: 'activPrice',
             index: 'activPrice',
         }, {
             name: 'activNum',
             index: 'activNum',
         },{
             name: 'startDate',
             index: 'startDate',
             formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
         },{
             name: 'endDate',
             index: 'endDate',
             formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
         }],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
//        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: false,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

//        onSelectRow:function(rowId){
//            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
//            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
//            console.log(ids) // 当前 选中行 的ids
//            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
//                $('#cb_grid-table').click();
//            }
//            trowid=rowId;
//        },       
    
    });
    //表格渲染这里结束 
    //所有方法都要写在这个入口函数里面  建议你格式化代码 方法折叠起来
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    $(".btnEdit").click(function() {
        var gr = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
        console.log(gr);
        if (gr != null) {
            window.location.href = "toUpdate?id=" + gr;
        } else {
            alert("请选择需要编辑的记录");
        }
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
    $("#reason_counts").keyup(function () {
        var length = 100;
        var currlength = $("#reason_counts").val().length;
        if(currlength < 100){
            $("#count_length").html('已输入'+currlength +'字,剩余'+(length - currlength)+'字');
        }else {
            $("#count_length").html('<span style="color: red">已输入'+currlength +'字,超出'+(currlength -length)+'字</span>');
        }
    });
	//提交按钮
	$("#add_message_new_btn").click(function () {
		var status = $("input[name='status']:checked ").val();
		var manager = $("#manager").val();
		var managerMobile = $("#managerMobile").val();
		var reason = $("#reason_counts").val();
		var id = $("#id").text();
		if(manager == "" || manager == null){
			btn_alertDialog("提示","商务经理不能为空");
			return;
		}
		if(managerMobile == "" || managerMobile == null){
			btn_alertDialog("提示","电话号码不能为空");
			return;
		}
	    var flag = isPhoneAvailable(managerMobile);//校验手机号码
	    if (!flag){
	        return;
	    }
	    if(reason.length > 100){
	    	btn_alertDialog("提示","审核原因不能超过100字");
	        return;
	    }
		var auditMessage = {};
		auditMessage.status = status;
		auditMessage.manager = manager;
		auditMessage.managerMobile = managerMobile;
		auditMessage.reason = reason;
		auditMessage.id = id;
		if(auditMessage == undefined){
		    return;
	    }
		var result = callAjax("/manage/actDocuments/saveAuditMessage",auditMessage);			
		if(result.code == 0){
	        btn_alertDialog("提示",result.msg);
	        dialog.close("success");
	        dialog.remove();
		}else{
	        btn_alertDialog("提示",result.msg);
		}
	});
	$(".model_close_btn").click(function () {
		dialog.close().remove();
	});
	
	//这里后面接着写方法
	
	function callAjax(url,object) {
	    var result;
	    $.ajax({
	        url: url,
	        type: 'POST', //GET
	        async: false,    //或false,是否异步
	        data: JSON.stringify(object),
	        timeout: 60000,    //超时时间
	        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	        contentType: "application/json",
	        beforeSend: function (xhr) {
	            //console.log(xhr)
	            //console.log('发送前');
	        },
	        success: function (data, xtStatus, jqXHR) {
	            result = data;
	        },
	        error: function (xhr, textStatus) {
	            btn_alertDialog("提示",textStatus);
	        },
	        complete: function () {
	            //console.log('结束')
	        }
	    });
	    return result;
	}
	/**
	 * 验证手机号码
	 * @param str
	 * @returns
	 */
	function isPhoneAvailable(str) {  
	    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
	    if (!myreg.test(str)) {
	        btn_alertDialog("提示",'请输入有效的手机号码！');
	        return false;  
	    } else {  
	        return true;  
	    }  
	}  
});



