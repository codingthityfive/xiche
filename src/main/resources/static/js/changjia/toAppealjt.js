$(function() {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		var result=getChangjia();
		var shengchanchangjia = $("#shengchanchangjia").val();
		var pinpaichangjia = $("#pinpaichangjia").val();
		var companyid = $("#companyid").val();
		if (result){
			$.ajax({
	            url: basePath+'/newChangjia/getAppeal?shengchanchangjia='+shengchanchangjia+"&pinpaichangjia="+pinpaichangjia+"&companyid="+companyid,     
	            type: 'POST', //GET
	            async: false,    //或false,是否异步
	            data: {
	            	        
	            	  },
	            timeout: 60000,    //超时时间
	            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	            contentType: "application/json",
	            success: function (data) {
	            	if(data==2){
	            		btn_alertDialog("提示","该生产厂家和品牌厂家不存在，请及时发邮件联系运营添加！");
	            	}else{
	            	   console.log(data);
	                   if (data) {
		                	if(data.code != 0){
		                        btn_alertDialog("提示","申诉成功！");
			                    dialog.close("success");
			      			  	dialog.remove();
			                }else{
			                    btn_alertDialog("提示","申诉失败！");
			                }
		                }
	                   
	            	}
	            },
	             
	        }); 
		};
		
		/*alert(shangpinbianhao);
		alert(shengchanchangjia);
		alert(pinpaichangjia);*/
        
	});

	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
	
	 
});

/**
 * 返回厂家对象
 * @returns
 */
function getChangjia(){
	var pinpai= {};
	var shangpinbianhao = $("#shangpinbianhao").val();
	var tongyongmingcheng = $("#tongyongmingcheng").val();
	var guige = $("#guige").val();
	var shengchanchangjia = $("#shengchanchangjia").val();
	var pinpaichangjia = $("#pinpaichangjia").val();
	/*var shangpinbianhao = $("input[name='shangpinbianhao']").val();
	var tongyongmingcheng = $("input[name='tongyongmingcheng']").val();
	var guige = $("input[name='guige']").val();
	var shengchanchangjia = $("input[name='shengchanchangjia']").val();
	var pinpaichangjia = $("input[name='pinpaichangjia']").val();*/
	 
	if(shengchanchangjia == '' || shengchanchangjia == null){
        btn_alertDialog("提示","请填写生产厂家！");
		return false;
	}
	
	if(pinpaichangjia == '' || pinpaichangjia == null){
        btn_alertDialog("提示","请填写品牌厂家！");
		return false;
	}
	 
	pinpai.shangpinbianhao = shangpinbianhao;
	pinpai.tongyongmingcheng = tongyongmingcheng;
	pinpai.guige = guige;
	pinpai.shengchanchangjia = shengchanchangjia;
	pinpai.pinpaichangjia = pinpaichangjia;
	 
	return pinpai;
}
 


$(function() {
    //分公司
    $('#companyName').dblclick(function () {
    	checkCompany();
    })
})


$(function(){
	var words;
    /**
     * 当键盘键被松开时发送Ajax获取数据
     */
    $('#shengchanchangjia').keyup(function(){
        //sc厂家
    	var pinpaichangjia = $("#pinpaichangjia").val();
        $.ajax({
        	url: basePath+'/newChangjia/findchangjia?pinpaichangjia='+ pinpaichangjia,
            dataType: 'json',
            contentType: "application/json",
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend:function(){
                $('#word').append('<div>正在加载。。。</div>');
            },
            success:function(data){
                $('#word').empty().show();
                if (data.code==1)
                {
                    $('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
                }
                /*if (data.result.list.length > 0) {*/
                if (data.result.length > 0) {
                	var facType = $("#factorytype").val();
                	$.each(data.result, function(k,v){
                			$('#word').append('<div class="click_work">'+v.shengchanchangjia+'</div>');
                    })
                }
            },
            error:function(){
                $('#word').empty().show();
                $('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
            }
        })
    })
    //点击搜索数据复制给搜索框
    $(document).on('click','.click_work',function(){
        var word = $(this).text();
        	$('#shengchanchangjia').val(word);
        $('#word').hide();
    })
})


$(function(){
	var wordspp;
    /**
     * 当键盘键被松开时发送Ajax获取数据
     */
    $('#pinpaichangjia').keyup(function(){
        //品牌厂家
        var pinpaichangjia = $("#pinpaichangjia").val();
        $.ajax({
        	url: basePath+'/newChangjia/findBrandBychangjia?pinpaichangjia='+ pinpaichangjia,
            dataType: 'json',
            contentType: "application/json",
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend:function(){
                $('#wordpp').append('<div>正在加载。。。</div>');
            },
            success:function(data){
                $('#wordpp').empty().show();
                if (data.s=='')
                {
                    $('#wordpp').append('<div class="error">Not find  "' + keywordspp + '"</div>');
                }
                if (data.result.length > 0) {
                	var facType = $("#factorytype").val();
                	$.each(data.result, function(k,v){
                			$('#wordpp').append('<div class="click_workpp">'+v.pinpaichangjia+'</div>');
                    })
                }
            },
            error:function(){
                $('#wordpp').empty().show();
                $('#wordpp').append('<div class="click_workpp">Fail "' + keywordspp + '"</div>');
            }
        })
    })
    //点击搜索数据复制给搜索框
    $(document).on('click','.click_workpp',function(){
        var wordpp = $(this).text();
        	$('#pinpaichangjia').val(wordpp);
        $('#wordpp').hide();
    })
})






















 