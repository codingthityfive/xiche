$(function(){
	var words;
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
                $('#word').append('<div>正在加载。。。</div>');
            },
            success:function(data){
                $('#word').empty().show();
                if (data.s=='')
                {
                    $('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
                }
                if (data.result && data.result.length > 0) {
                	var facType = $("#factorytype").val();
                	$.each(data.result, function(k,v){
                			$('#word').append('<div class="click_work">'+v.pinpaichangjia+'</div>');
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
        	$('#pinpaichangjia').val(word);
        $('#word').hide();
    })
})
$(function() {
	var dialog = top.dialog.get(window);
	
	$("#formSubmit").click(function(){
		var pinpaichangjia = $("#pinpaichangjia").val();
		pingpaiList(pinpaichangjia);
		
		dialog.remove();
		window.location.href="pageList";
	});
	
	//取消
	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
});
//查询品牌厂家是否已存在
function pingpaiList(pinpaichangjia){
	 $.ajax({
		 url: basePath+'/newChangjia/findPinpaichangjia?pinpaichangjia='+ pinpaichangjia,
	        dataType: 'json',
	        contentType: "application/json",
	        jsonp: 'cb', //回调函数的参数名(键值)key
	        async: false,
	        success:function(data){
	        	 if (data.result.length > 0) {
	        		 updatePinpaiChangJia();
	        		 
	        	 }else{
	            	   alert("该厂家不存在，请选择已存在厂家或给运维发邮件添加新厂家");
	               }
	        }

	 });
} 
//更新品牌厂家
function updatePinpaiChangJia(){
	var id = $("#id").val();
	var result=getChangjia();
	var shengchanchangjia = $("#shengchanchangjia").val();
	var pinpaichangjia = $("#pinpaichangjia").val();
	if (result){ 
	 $.ajax({
        url: basePath+'/newChangjia/updatePinpaiChangJia?id='+id+"&shengchanchangjia="+shengchanchangjia+"&pinpaichangjia="+pinpaichangjia,
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: {
        	    
        	  },
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        contentType: "application/json",
        success: function (data) {
               if (data) {
                	if(data.code != 0){
                        //btn_alertDialog("提示","保存成功！");
                        alert("保存成功！");
                        window.location.reload();
	                }else{
	                    //btn_alertDialog("提示","保存失败！");
	                	alert("保存失败！");
	                	window.location.reload();
	                }
                }	
             
        },
    }); 
	 }
}


/**
 * 返回厂家对象
 * @returns
 */
function getChangjia(){
	var pinpai= {};
	var id = $("#id").val();
	var shangpinbianhao = $("#shangpinbianhao").val();
	var tongyongmingcheng = $("#tongyongmingcheng").val();
	var guige = $("#guige").val();
	var shengchanchangjia = $("#shengchanchangjia").val();
	var pinpaichangjia = $("#pinpaichangjia").val();
	 
	if(shengchanchangjia == '' || shengchanchangjia == null){
        btn_alertDialog("提示","请填写生产厂家！");
		return false;
	}
	
	if(pinpaichangjia == '' || pinpaichangjia == null){
        btn_alertDialog("提示","请填写品牌厂家！");
		return false;
	}
	pinpai.id = id;
	pinpai.shangpinbianhao = shangpinbianhao;
	pinpai.tongyongmingcheng = tongyongmingcheng;
	pinpai.guige = guige;
	pinpai.shengchanchangjia = shengchanchangjia;
	pinpai.pinpaichangjia = pinpaichangjia;
	 
	return pinpai;
}











 