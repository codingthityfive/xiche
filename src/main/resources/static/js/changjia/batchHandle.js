$(function() {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		var user = getChangjia();
		if(user){
	        var result = callAjax("batchUpdate",user);
            if (result) {
            	if(result.code == 0){
                    btn_alertDialog("提示","保存成功！");
                    dialog.close("success");
      			  	dialog.remove();
                }else{
                    btn_alertDialog("提示","保存失败！");
                }
            }
         }
	});

	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
	
	//指定商品
	$("#toPoint").click(function(){
		var facName = $("#changjia").val();
		if(facName.trim().length<=0){
			btn_alertDialog("提示","必须选择厂家");
		}else{
			var state = $("#searchState").val();
//			alert(state);
			if(state == '0'){
				btn_alertDialog("提示","该厂家不存在");
			}else{
				$("#myModal").modal("show");
			}
		}
	});
});



$(function() {
    //客户编号双击
    $('.Customers').dblclick(function () {
    	quanxianDbclick();
    })
})

function quanxianDbclick(){
	top.dialog({
		url: 'changjia/toTree',
		title: '权限范围',
		 width:550,
    	height:300,
		data: $('#quanxianJson').val(), // 给modal 要传递的 的数据
		onclose: function() {
			 
			if(this.returnValue) {
				var data = this.returnValue;
				var array = $.parseJSON(data);
				var allJson = "";
				var sum=0;
				var zonglength = "";
				var allJsonStr = "";
				var allJsonStrSub = "";
				var dataJson = "";
				var shengJson = "";
				var shiJson = "";
				for(var i=0;i<array.length;i++){
					var sheng=array[i].canviewareas;
					 allJson +=","+sheng;
					var shengid=array[i].areaId;
					//'alert("dataJson:"+dataJson);
					if(sheng=="全国"){
						dataJson="全国"		
						$('#quanxian').val(dataJson);
						break;
					}else{
						if(sheng=="北京" || sheng=="天津"|| sheng=="河北省"|| sheng=="山西省"
						    || sheng=="内蒙古自治区"
							|| sheng=="辽宁省" || sheng=="吉林省" || sheng=="黑龙江省"
							|| sheng=="上海" || sheng=="江苏省" || sheng=="浙江省"
							|| sheng=="安徽省" || sheng=="福建省" || sheng=="江西省"
							|| sheng=="山东省" || sheng=="河南省" || sheng=="湖北省"
							|| sheng=="湖南省" || sheng=="广东省" || sheng=="广西壮族自治区"
							|| sheng=="海南省" || sheng=="重庆" || sheng=="四川省"
							|| sheng=="贵州省" || sheng=="云南省" || sheng=="西藏自治区"
							|| sheng=="陕西省" || sheng=="甘肃省" || sheng=="青海省"
							|| sheng=="宁夏回族自治区" || sheng=="新疆维吾尔自治区" || sheng=="台湾"
							|| sheng=="香港特别行政区" || sheng=="澳门特别行政区"){
						shengJson +=","+sheng;
					}else{
						shiJson +=","+sheng;
					}	 
					if(sheng=="北京"){
						var s =7;
						var beijingJson=parseInt(s);
					}else if(sheng=="天津"){
						var s =7;
						var tianjingJson=parseInt(s);
					}else if(sheng=="河北省"){
						var s =51;
						var hebeiJson=parseInt(s);
					}else if(sheng=="山西省"){
						var s =48;
						var shanxiJson=parseInt(s);
					}else if(sheng=="内蒙古自治区"){
						var s =68;
						var neimengJson=parseInt(s);
					}else if(sheng=="辽宁省"){
						var s =61;
						var liaoningJson=parseInt(s);
					}else if(sheng=="吉林省"){
						var s =45;
						var jilinJson=parseInt(s);
					}else if(sheng=="黑龙江省"){
						var s =67;
						var heilongjiangJson=parseInt(s);
					}else if(sheng=="上海"){
						var s =7;
						var shanghaiJson=parseInt(s);
					}else if(sheng=="江苏省"){
						var s =57;
						var jiangsuJson=parseInt(s);
					}else if(sheng=="浙江省"){
						var s =48;
						var zhejiangJson=parseInt(s);
					}else if(sheng=="安徽省"){
						var s =69;
						var anhuiJson=parseInt(s);
					}else if(sheng=="福建省"){
						var s =40;
						var fujianJson=parseInt(s);
					}else if(sheng=="江西省"){
						var s =49;
						var jiangxiJson=parseInt(s);
					}else if(sheng=="山东省"){
						var s =72;
						var shandongJson=parseInt(s);
					}else if(sheng=="河南省"){
						var s =79;
						var henanJson=parseInt(s);
					}else if(sheng=="湖北省"){
						var s =81;
						var hubeiJson=parseInt(s);
					}else if(sheng=="湖南省"){
						var s =68;
						var hunanJson=parseInt(s);
					}else if(sheng=="广东省"){
						var s =93;
						var guangdongJson=parseInt(s);
					}else if(sheng=="广西壮族自治区"){
						var s =65;
						var guangxiJson=parseInt(s);
					}else if(sheng=="海南省"){
						var s =109;
						var nainanJson=parseInt(s);
					}else if(sheng=="重庆"){
						var s =7;
						var chongqingJson=parseInt(s);
					}else if(sheng=="四川省"){
						var s =103;
						var sichuanJson=parseInt(s);
					}else if(sheng=="贵州省"){
						var s =63;
						var guizhouJson=parseInt(s);
					}else if(sheng=="云南省"){
						var s =111;
						var yunnanJson=parseInt(s);
					}else if(sheng=="西藏自治区"){
						var s =41;
						var xizangJson=parseInt(s);
					}else if(sheng=="陕西省"){
						var s =44;
						var shanxiJson=parseInt(s);
					}else if(sheng=="甘肃省"){
						var s =69;
						var gansuJson=parseInt(s);
					}else if(sheng=="西藏自治区"){
						var s =41;
						var xizangJson=parseInt(s);
					}else if(sheng=="陕西省"){
						var s =44;
						var shanxisJson=parseInt(s);
					}else if(sheng=="甘肃省"){
						var s =69;
						var gansuJson=parseInt(s);
					}else if(sheng=="青海省"){
						var s =63;
						var qinghaiJson=parseInt(s);
					}else if(sheng=="宁夏回族自治区"){
						var s =29;
						var ningxiaJson=parseInt(s);
					}else if(sheng=="新疆维吾尔自治区"){
						var s =129;
						var xingjiangJson=parseInt(s);
					}else if(sheng=="台湾"){
						var s =91;
						var taiwanJson=parseInt(s);
					}else if(sheng=="香港特别行政区"){
						var s =18;
						var xianggangJson=parseInt(s);
					}else if(sheng=="澳门特别行政区"){
						var s =16;
						var aomenJson=parseInt(s);
					}else{
						var s =0;
					}

					 sum += s;
					}
			}
				var zonglength =sum;
				var allJsonLength = 0;  
			    for(var a in allJson){  
			    	allJsonLength++;  
			    }  
				allJsonStr=allJson.toString();   
				allJsonStrSub =allJsonStr.substring(zonglength,allJsonLength);
//				alert("最终数据:"+allJsonStrSub);
				var zongJson =shengJson+allJsonStrSub;
				dataJson=zongJson
				if(dataJson.length>0){
					dataJson = dataJson.substring(1);
				}
				$('#quanxian').val(dataJson);
				$('#quanxianJson').val(data);
			}
		},
		oniframeload: function() {
			//console.log('iframe ready')
		}
	})
	.showModal();
	return false;
}


/**
 * 返回厂家对象
 * @returns
 */
function getChangjia(){
	var user = {};
	var changjia = $("#changjia").val();
	var id = $("#id").val();
	var changjiaId = $('#changjiaid').val();
	var username = $("input[name='username']").val();
	var zhiwu = $("input[name='zhiwu']").val();
	var phone = $("input[name='phone']").val();
	var email = $("input[name='email']").val();
	var beizhu = $("input[name='beizhu']").val();
	var facType = $("#factorytype").val();
	var quanxianJson = $('#quanxianJson').val();
	var roleIds = $("#roleIds").val();
	var userIds = $("#userIds").val();
	var goodsCodes = "";
	var erpGoodsCodes = "";
	var isuse = $("#isuse").val();
	if(isuse=='0'){
		isuse = false;
	}else if(isuse == '1'){
		isuse = true;
	}
	var companyId = $("#companyId").val();
	var goodsLength = $("input[name='goodsCodeMulti']").length;
	$("input[name='goodsCodeMulti']").each(function(i){
		goodsCodes+=$(this).val();
		if(i < (goodsLength-1)){
			goodsCodes+=",";
		}
	});
	
	var erpgoodsLength = $("input[name='erpGoodsCode']").length;
	$("input[name='erpGoodsCode']").each(function(i){
		erpGoodsCodes+=$(this).val();
		if(i < (erpgoodsLength-1)){
			erpGoodsCodes+=",";
		}
	});
//	if(parseInt(facType)==0){
//		btn_alertDialog("提示","请选择厂家类型！");
//		return false;
//	}
//	
//	if(changjia == '' || changjia == null){
//        btn_alertDialog("提示","请选择厂家！");
//		return false;
//	}
//    if(changjiaId == '' || changjiaId == null){
//        btn_alertDialog("提示","请选择厂家！");
//        return false;
//    }
//	if(username == '' || username == null){
//        btn_alertDialog("提示","请填写姓名！");
//		return false;
//	}
//    var myreg =/^[1][3,4,5,7,8][0-9]{9}$/;
//	if(phone == '' || phone == null){
//        btn_alertDialog("提示","请填写手机号码！");
//		return false;
//	}else {
//        if(!myreg.test(phone)){
//            btn_alertDialog("提示","请填写正确的手机号码！");
//            return false;
//		}
//    }
//	isPhoneAvailable($.trim(phone));

//	if(email != ''  && email != null){
//		var emailFlag = isEmailAvailable(email);
//		if(!emailFlag){
//			return false;
//		}
//	}
//	if(quanxianJson == '' || quanxianJson == null){
//        btn_alertDialog("提示","请双击选择权限！");
//		return false;
//	}
//	if (roleIds == null || $.trim(roleIds) == '') {
//		btn_alertDialog("提示","请至少选择一个角色！");
//		return false;
//	}
	
	/**
	 * 批量处理,不校验表单的值
	 * 后台拿到什么数据就保存什么数据
	 */
	user.changjia = changjia;
	user.id = id;
	user.changjiaId = changjiaId;
	user.username = username;
	user.zhiwu = zhiwu;
	user.phone = phone;
	user.email = email;
	user.beizhu = beizhu;
	user.quanxianJson = quanxianJson;
	user.roleIds = roleIds;
	user.goodsCodes = goodsCodes;
	user.erpGoodsCodes = erpGoodsCodes;
	user.factoryType = facType;
	user.userIds = userIds;
	user.isuse = isuse;
	user.companyId = companyId;
	return user;
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


/**
 * 验证邮箱
 * @param str
 * @returns
 */
function isEmailAvailable(str) {  
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(str)){
        btn_alertDialog("提示",'请输入有效的E_mail！');
         return false;
    }else {  
		return true;  
	}  
}  

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
        },
        complete: function () {
            //console.log('结束')
        }
    });
    return result;
};


$(window).on('load', function () {

    $('.selectpicker').selectpicker({
        'selectedText': 'cat'
    });

    // $('.selectpicker').selectpicker('hide');
});

$(function(){
	var words;
    $("#changjia").focus(function(){
        words = $('#factorytype').val();
    })
    
    /**
     * 当键盘键被松开时发送Ajax获取数据
     */
    $('#changjia').keyup(function(){
    	$("#searchState").val(0);
    	if(words=='0'){
    		btn_alertDialog("提示","请选择厂家类型!");
    		return;
    	}
        var keywords = $(this).val();
        if (keywords=='') { $('#word').hide();
        	$("#changjiaid").val("");
        return
        };
        $.ajax({
        	url: basePath+'/newChangjia/factoryList?factoryName='+ keywords+'&factoryType='+words,
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
                	$("#searchState").val(1);
                	var facType = $("#factorytype").val();
                	$.each(data.result, function(k,v){
                		if(facType == '1' || facType == '3'){
                			$('#word').append('<div class="click_work">'+v.changjiamingcheng+'<span>'+'-'+v.changjiaid+'</span>'+'</div>');
                		}else if(facType == '2'){
                			$('#word').append('<div class="click_work">'+v.changjiamingcheng+'</div>');
                		}
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
        var facType = $("#factorytype").val();
        if(facType == '1' || facType == '3'){
        	if(word.indexOf("-")!=-1){
        		$('#changjiaid').val(word.split("-")[1]);
        		$('#changjia').val(word.split("-")[0]);
        	}
        }else if(facType == '2'){
        	$('#changjia').val(word);
        }
        $('#word').hide();
    })
})

$(function() {
    //角色
    $('#roles').dblclick(function () {
    	roleDbclick();
    })
})

//选择角色
function roleDbclick() {
	top.dialog({
		url: basePath+'/xtrole/userRolesManage',
		title: '角色',
		width:700,
    	height:470,
    	data: {roleIds:$("#roleIds").val()},
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#roleIds").val(data.roleIds);
				$("#roles").val(data.roleName);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
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
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}