var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
$(document).ready(function () {
    var lastsel;
    var dialog = top.dialog.get(window);
    $("#grid-table").jqGrid({
        url: "/manage/activityGoods/query?activId="+$("#id").text(),
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
        colNames: [ '活动商品','商品名称','库存'],
        colModel: [{
            name: 'goodsCode',
            index: 'goodsCode',
        },{
            name: 'goodsName',
            index: 'goodsName',
        }, {
            name: 'allStock',
            index: 'allStock',
        }],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        // viewrecords: true,//是否在浏览导航栏显示记录总数
        // rowNum: 10,//每页显示记录数
        // rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        // pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        /*loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },*/

    });
    jQuery("#grid-table").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("你enter了一行， id为:"+rowid)} } );

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
	    if(status ==3){
	    	if(reason == "" || reason.length <= 0){
	    		btn_alertDialog("提示","审核不通过，审核原因必填");
		        return;
	    	}
	    	if(reason.match(/^[ ]+$/)){
	    		btn_alertDialog("提示","审核不通过，审核原因必填,不能为空格");
		        return;
	    	}
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


