var allowToCreate = 0;
$(function() {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		var user = getChangjia();
		if(user){
	        var result = '';
	        $.ajax({
	            type: "POST",
	            url: "isOnly?phone="+ $.trim(user.phone) ,
	            //data: datas,
	            dataType: "json",
	            contentType: "application/json; charset=utf-8",
	            success: function(datas){
	            	console.log(datas);
	                if(user.id != '' && user.id != null){
	                	if(datas == 1 || datas == 0){
	                    	var used = judgeFactoryNameIsUsed();
	                		if(used){
	                			btn_alertDialog("提示","该厂家已经被占用！");
	                		}else{
	                			result = callAjax("saveOrUpdate",user);
	                		}
	                    }else {
	                        btn_alertDialog("提示","手机号码重复");
	                    }
	                }else {
	                    if(datas == 0){
	                    	var used = judgeFactoryNameIsUsed();
	                		if(used){
	                			btn_alertDialog("提示","该厂家已经被占用！");
	                		}else{
	                			result = callAjax("saveOrUpdate",user);
	                		}
	                    }else {
	                        btn_alertDialog("提示","手机号码重复");
	                    }
	                }
	                if (result) {
	                	if(result.code == 0){
	                        btn_alertDialog("提示","保存成功！");
		                    dialog.close("success");
		      			  	dialog.remove();
		                }else{
		                    btn_alertDialog("提示",result.msg);
		                }
	                }
	            }
	        });
		}
	});

	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
	
	//指定商品
	$("#toPoint").click(function(){
		var facName = $("#changjia").val();
        var entId = $("#entId").val();
        var companyId = $("#companyId").val();
		if(facName.trim().length<=0){
			btn_alertDialog("提示","必须选择厂家");
		}else if(entId == '' || entId ==null) {
            btn_alertDialog("提示","必须选择分公司");
        }else {
			var state = $("#searchState").val();
			if(state == '0'){
				btn_alertDialog("提示","该厂家不存在");
			}else{
				$("#myModal").modal("show");
				$("#modal_entId").val(entId);
				/*var state = judgeFactoryNameBeUsed(facName,companyId);
				if(parseInt(state)==0){
					$("#myModal").modal("show");
                    $("#modal_entId").val(entId);
				}else{
				    var id = 	$("#id").val();
				    if(parseInt(id)>0){//修改的时候,允许再次修改商品
				    	$("#myModal").modal("show");
                        $("#modal_entId").val(entId);
				    }else{
				    	btn_alertDialog("提示","该厂家已经被占用");
				    }
				}*/
			}
		}
	});
	
	/**
	 * 校验厂家是否使用
	 * state 0 无占用 1 被占用
	 */	
	function	judgeFactoryNameIsUsed(){
		var facName = $("#changjia").val();
	    var companyId = $("#companyId").val();
		var state = judgeFactoryNameBeUsed(facName,companyId);
		var id = 	$("#id").val();
		if(parseInt(id)>0){
			state = 0;//如果是修改状态,就忽略占用情况
		}
		return state > 0 ? true : false;
	}
	
/**
 * 校验厂家是否使用
 * state 0 无占用 1 被占用
 */	
function	judgeFactoryNameIsUsed(){
	var facName = $("#changjia").val();
    var companyId = $("#companyId").val();
	var state = judgeFactoryNameBeUsed(facName,companyId);
	var id = 	$("#id").val();
	if(parseInt(id)>0){
		state = 0;//如果是修改状态,就忽略占用情况
	}
	return state > 0 ? true : false;
}


	/**
	 * 查询厂家是否存在（切仓的分公司才检验）
	 * 暂时废弃
	 */
//	function judgeFactoryNameIsExist(){
//		var result = true;
//		//分公司
//		var scFactory = $("#companyName").val();
//		//厂家类型
//		var facType = $('#factorytype').val();;
//		//厂家名称
//		var facName = $("#changjia").val();
//		
//		$.ajax({
//	        type: "POST",
//	        url: "judgeFactoryIsExists?scFactory="+scFactory+"&facType="+facType+"&facName="+facName,
//	        dataType: "json",
//	        contentType: "application/json; charset=utf-8",
//	        async: false,
//	        success: function(data){
//	            if(data == 1){//当前分公司（切仓），厂家不存在，不能继续操作了
//	            	result = false;
//	            }
//	        }
//	    });
//		return result;
//	}
});
function updateTitleLabel(table) {
    $("#goods-table").jqGrid('setLabel','rn', '序号', {'text-align':'center'},'');
};
/**
 * 查询商品弹框
 * @returns
 */
function queryGoods(entId){
	var gCode = '';
	var pager_selector = "#com-pager";
	var lastsel;
	var facName = "";
	var facType = $("#factorytype").val();
	if(facType != 3){
		facName = $("#changjia").val();
	}
	$("#goods-table").jqGrid({
        url: "/manage/product/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        postData:{'changjia':facName,'factoryType':facType,'entId':entId},
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        colNames: ['商品编号','商品编号erp','商品名称', '规格','生产厂家', '品牌厂家','销售状态','库存'],
        colModel: [
            {
                name:'goodsCode',
                index:'goodsCode',
                width:90,
                formatter: function (cellvalue) {
                	gCode += cellvalue;
                	gCode += ","
                	return cellvalue;
                }
            }, {
                name:'erpGoodsCode',
                index:'erpGoodsCode',
                hidden:true,
                width:90,
            },
            {
                name: 'goodsName',
                index: 'goodsName',
                width:90, 
            }, {
                name: 'goodsSpec',
                index: 'goodsSpec',
            }, {
                name: 'manufacturer',
                index: 'manufacturer',
            }, {
                name: 'pinpaichangjia',
                index: 'pinpaichangjia',
            },{
                name: 'allStock',
                index: 'allStock',
                width:90,
                formatter: function (cellvalue) {
                    var str = '';
                    if (parseInt(cellvalue)>0) {
                        str = "在售";
                    }else{
                    	str = "售罄";
                    }
                    return str;
                }
            },{
                name: 'allStock',
                index: 'allStock',
                width:90,
            }
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
                updateTitleLabel(table);
            }, 0);
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10,20,30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        /*loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
            	updatePagerIcons(table);
            }, 0);
        },*/
        loadComplete:function(){ // 当表格加载完成之后获取所有 行的 数量值 相加 ，赋值给 应收 、 实收 、 合计数量
        	
        	var goodsCode = $("#goodsCode").val();
        	var boo = goodsCode.trim().length>0?true:false;
        	if(boo){
        		jqGridAllChoose("goods-table");
        	}
//        	checkGoodsCodes(goodsCode.trim(),gCode);
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
                updateTitleLabel(table);
                gCode = '';
            }, 0);
        }
    });
}
function checkGoodsCodes(search,ret){
	if(!search){
		return;
	}
	if(!ret){
		return;
	}
//	ret = ret.substr(0,ret.length-1)
	var strs= new Array(); //定义一数组 
	strs=search.split(" "); //字符分割 
	var unCodes = ''
	for (i=0;i<strs.length ;i++ ){ 
		if(ret.indexOf(strs[i]) == -1){//不包含
			unCodes += strs[i]
			unCodes += ' '
		}
	}
	if(unCodes!=''){
		alert("该厂家没有此商品："+unCodes);
	}
}



/**
 * jqGrid全选问题
 * @param tableName
 * @returns
 */
function jqGridAllChoose(tableName){
	$("#"+tableName).jqGrid('setSelection',false);
	var rowIds = jQuery("#"+tableName).jqGrid('getDataIDs');
    for(var k=0; k<rowIds.length; k++) {
         jQuery("#"+tableName).setSelection(rowIds[k], false); 
    }
}




$(function() {
    //客户编号双击
    $('.Customers').dblclick(function () {
    	quanxianDbclick();
    })
})

/**
 * 判断厂家名称是否被使用
 * @param factoryName
 * @returns
 */
function judgeFactoryNameBeUsed(factoryName,companyId){
	var facType = $("#factorytype").val();
	var res = 0;
	$.ajax({
        url: "judgeFactoryName",
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: {"factoryType":facType,"factoryName":factoryName,"companyId":companyId},
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            //console.log(xhr)
            //console.log('发送前');
        },
        success: function (data, xtStatus, jqXHR) {
            res = data;
        },
        error: function (xhr, textStatus) {
        },
        complete: function () {
            //console.log('结束')
        }
    });
	return res;
}


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
				var realList = data.realList;
				var array = $.parseJSON(data.areaList);
				var allJson = "";
				var sum=0;
				var zonglength = "";
				var allJsonStr = "";
				var allJsonStrSub = "";
				var dataJson = "";
				var shengJson = "";
				var shiJson = "";
				var nameLen = 0;
				var noCheck = 0;
				var total=0;
				//所有的节点遍历
				for(var i=0;i<array.length;i++){
					var node = array[i];
					var sheng=array[i].canviewareas;
					 allJson +=","+sheng;
					var shengid=array[i].areaId;
					//'alert("dataJson:"+dataJson);
					if(sheng=="全国"){
						dataJson="全国";		
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
						
						noCheck = node.noCheck;
						nameLen = node.nameLen;
						
					}else{
						shiJson +=","+sheng;
					}	 
						
					//长度定位
					var s = 0;
						
					if(sheng=="北京"){
						s =7;
						var beijingJson=parseInt(s);
					}else if(sheng=="天津"){
						s =7;
						var tianjingJson=parseInt(s);
					}else if(sheng=="河北省"){
						s =51;
						var hebeiJson=parseInt(s);
					}else if(sheng=="山西省"){
						s =48;
						var shanxiJson=parseInt(s);
					}else if(sheng=="内蒙古自治区"){
						s =68;
						var neimengJson=parseInt(s);
					}else if(sheng=="辽宁省"){
						s =61;
						var liaoningJson=parseInt(s);
					}else if(sheng=="吉林省"){
						s =45;
						var jilinJson=parseInt(s);
					}else if(sheng=="黑龙江省"){
						s =67;
						var heilongjiangJson=parseInt(s);
					}else if(sheng=="上海"){
						s =7;
						var shanghaiJson=parseInt(s);
					}else if(sheng=="江苏省"){
						s =57;
						var jiangsuJson=parseInt(s);
					}else if(sheng=="浙江省"){
						s =48;
						var zhejiangJson=parseInt(s);
					}else if(sheng=="安徽省"){
						s =69;
						var anhuiJson=parseInt(s);
					}else if(sheng=="福建省"){
						s =40;
						var fujianJson=parseInt(s);
					}else if(sheng=="江西省"){
						s =49;
						var jiangxiJson=parseInt(s);
					}else if(sheng=="山东省"){
						s =72;
						var shandongJson=parseInt(s);
					}else if(sheng=="河南省"){
						s =79;
						var henanJson=parseInt(s);
					}else if(sheng=="湖北省"){
						s =81;
						var hubeiJson=parseInt(s);
					}else if(sheng=="湖南省"){
						s =68;
						var hunanJson=parseInt(s);
					}else if(sheng=="广东省"){
						s =93;
						var guangdongJson=parseInt(s);
					}else if(sheng=="广西壮族自治区"){
						s =65;
						var guangxiJson=parseInt(s);
					}else if(sheng=="海南省"){
						s =109;
						var nainanJson=parseInt(s);
					}else if(sheng=="重庆"){
						s =7;
						var chongqingJson=parseInt(s);
					}else if(sheng=="四川省"){
						s =103;
						var sichuanJson=parseInt(s);
					}else if(sheng=="贵州省"){
						s =63;
						var guizhouJson=parseInt(s);
					}else if(sheng=="云南省"){
						s =111;
						var yunnanJson=parseInt(s);
					}else if(sheng=="西藏自治区"){
						s =41;
						var xizangJson=parseInt(s);
					}else if(sheng=="陕西省"){
						s =44;
						var shanxiJson=parseInt(s);
					}else if(sheng=="甘肃省"){
						s =69;
						var gansuJson=parseInt(s);
					}else if(sheng=="西藏自治区"){
						s =41;
						var xizangJson=parseInt(s);
					}else if(sheng=="陕西省"){
						s =44;
						var shanxisJson=parseInt(s);
					}else if(sheng=="甘肃省"){
						s =69;
						var gansuJson=parseInt(s);
					}else if(sheng=="青海省"){
						s =63;
						var qinghaiJson=parseInt(s);
					}else if(sheng=="宁夏回族自治区"){
						s =29;
						var ningxiaJson=parseInt(s);
					}else if(sheng=="新疆维吾尔自治区"){
						s =129;
						var xingjiangJson=parseInt(s);
					}else if(sheng=="台湾"){
						s =91;
						var taiwanJson=parseInt(s);
					}else if(sheng=="香港特别行政区"){
						s =18;
						var xianggangJson=parseInt(s);
					}else if(sheng=="澳门特别行政区"){
						s =16;
						var aomenJson=parseInt(s);
					}
//					else{
//						var s =0;
//					}
					 sum += s;
					 sum-=nameLen;
					 sum-=noCheck;
					}
//					total+=noCheck;
//					total+=nameLen;
					noCheck=0;
					nameLen=0;
			}
				var zonglength =sum;
				var allJsonLength = 0;  
			    for(var a in allJson){  
			    	allJsonLength++;  
			    }  
//			    allJsonLength+=total;
				allJsonStr=allJson.toString();   
				
				//这一行作用就是截取省名称,但是会把其他市误截
				//要截省份后面的其他市的子字符串,但是上一个省份少选一市的话,就会
				//在长度上,把其他市归入这个省份
				
				//思路:如果将未选的长度传入,则省份截取用目前省长-未选长度即可,
				//未选等0,则默认还是原来长度.
				
				
				allJsonStrSub =allJsonStr.substring(zonglength,allJsonLength);
//				alert("最终数据:"+allJsonStrSub);
				var zongJson =shengJson+allJsonStrSub;
				dataJson=zongJson;
				if(dataJson.length>0){
					dataJson = dataJson.substring(1);
				}
				$('#quanxian').val(dataJson);
				$('#quanxianJson').val(realList);
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
	var goodsCodes = "";
	var erpGoodsCodes = "";
	var goodsLength = $("input[name='goodsCodeMulti']").length;
	var effectiveEndDate = $("input[name='effectiveEndDate']").val();
	var proId = $("#proId").val();
	var proNo = $("#proNo").val();
	var proType = $("#proType").val();
	if(!proNo||!proId){
		btn_alertDialog("提示","账号必须绑定协议!");
		return false;
	}
	if(!proType){
		btn_alertDialog("提示","协议类型不合法!");
		return false;
	}
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
	
	var facType = $("#factorytype").val();
	if(facType == 3){
		if(goodsCodes.length<=0){
			btn_alertDialog("提示","自定义厂家必须指定品种!");
			return false;
		}
	}
	
	if(parseInt(facType)==0){
		btn_alertDialog("提示","请选择厂家类型！");
		return false;
	}
	
	var companyId = $("#companyId").val();
	if (companyId == null || $.trim(companyId) == '') {
		btn_alertDialog("提示","请选择分公司权限！");
		return false;
	}
	
	if(changjia == '' || changjia == null){
        btn_alertDialog("提示","请选择厂家！");
		return false;
	}
	
	if(username == '' || username == null){
        btn_alertDialog("提示","请填写姓名！");
		return false;
	}
	if(effectiveEndDate == '' || effectiveEndDate == null){
		btn_alertDialog("提示","请填写协议截止时间！");
		return false;
	}
    var myreg =/^[1][3,4,5,7,8,9][0-9]{9}$/;
	if(phone == '' || phone == null){
        btn_alertDialog("提示","请填写手机号码！");
		return false;
	}else {
        if(!myreg.test(phone)){
            btn_alertDialog("提示","请填写正确的手机号码！");
            return false;
		}

    }
	isPhoneAvailable($.trim(phone));

	if(email != ''  && email != null){
		var emailFlag = isEmailAvailable(email);
		if(!emailFlag){
			return false;
		}
	}
	if (roleIds == null || $.trim(roleIds) == '') {
		btn_alertDialog("提示","请至少选择一个角色！");
		return false;
	}
	
	//检测购进渠道
	var channelType = $("input[name='channelType']:checked").val();
	if(parseInt(channelType) == 3){
		var trs = $("#selectedComs").find(".table tbody tr");
		if(trs.length == 0){
			btn_alertDialog("提示","指定购进渠道,必须选择购进渠道！");
			return false;
		}
		
		//指定购进渠道
		var channels = new Array();
		var index = 0;
		var trs = $("#selectedComs").find(".table tbody tr");
		trs.each(function(index){
			var comId = $(this).find(".comId").val();
			var comName = $(this).find(".comName").text();
			var channel = {};
			
			channel.channelCode = comId;
			channel.channelName = comName;
			
			channels[index++] = channel;
		});
	}
	
	var channelType = $("input[name='channelType']:checked").val();
	
	user.changjia = changjia;
	user.channelType = channelType;
	user.id = id;
	user.changjiaId = changjiaId;
	user.username = username;
	user.zhiwu = zhiwu;
	user.phone = phone;
	user.email = email;
	user.beizhu = beizhu;
	user.roleIds = roleIds;
	user.goodsCodes = goodsCodes;
	user.erpGoodsCodes = erpGoodsCodes;
	user.factoryType = facType;
	user.companyId = companyId;
	user.channels = channels;
	user.effectiveEndDate = effectiveEndDate;
	user.proId = proId;
	user.proNo = proNo;
	user.proType = proType;
	return user;
}


/**
 * 验证手机号码
 * @param str
 * @returns
 */
function isPhoneAvailable(str) {  
    var myreg=/^[1][3,4,5,7,8,9][0-9]{9}$/;
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
    	var facType = $("#factorytype").val();
//    	if(facType == '3'){
//    		$("#searchState").val(1);
//    		return;
//    	}
		var companyId = $("#companyId").val();
    	if(words=='0'){
    		btn_alertDialog("提示","请选择厂家类型!");
    		return;
    	}
        if(companyId=='' || companyId == null){
            btn_alertDialog("提示","请选择分公司权限!");
            return;
        }

    	
        var keywords = $(this).val();
        if (keywords=='') { $('#word').hide();
        	$("#changjiaid").val("");
        return
        };
        
        //选择分公司
        var scFactory = $("#companyName").val();
        
        $.ajax({
        	url: basePath+'/newChangjia/factoryList?factoryName='+ keywords+'&factoryType='+words+"&scFactory="+scFactory+'&companyid='+$("#companyId").val(),
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
                			$('#word').append('<div class="click_work">'+v.changjiamingcheng+'<span>'+'-'+v.changjiaid+'</span>'+'</div>');  /* +'-'+v.changjiaid+'</span>'*/                    
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
        $("input[name='erpGoodsCode']").val("");
        $("input[name='goodsCodeMulti']").val("");
        $('#word').hide();
//        findProTime($("#changjia").val(),$("#companyName").val())  //选择完厂家后不在查询并回填协议截止时间
    })

})
function findProTime(changjia,companyName){
	if(changjia&&""!=changjia){
		   $.ajax({
			      type: "GET",      //data 传送数据类型。post 传递
			      dataType: 'json',  // 返回数据的数据类型text
			      url: "findProProtocolEffective",  // yii 控制器/方法
			      cache: false,      
			      data: {changjia:changjia,companyName:companyName},  //传送的数据
			      async: false,
			      error:function(){
			         alert("查询厂家协议失败");
			      },
			      success: function (ret) {
			    	  console.log(ret);
			    	  if(ret!=null){
			    		  if(ret.code=="0"){
			    			  if(ret.result){
			    				  $("#effectiveEndDate").val(ret.result.effectiveEndDate);
			    			  }else{
			    				  $("#effectiveEndDate").val("");
			    			  }
			    		  }else{
			    			  alert(ret.msg);
			    		  }
			    	  }
			      }
			})
	}
}
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
    	data: {companyIds:$("#companyId").val(),includeGroup:0}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				$("#companyId").val(data.companyId);
				$("#companyName").val(data.companyName);
                $("#entId").val(data.entId);
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}

/**
 * 离焦事件
 */
$("#phone").blur(function () {
	$("#account").val($("#phone").val());
});


/******************* 开始增加 ********************/

/**
 * 删除指定商业公司
 */
$("#selectedComs").on("click",".delCom",function(){
	$(this).parents("tr").remove();
	comsResort();
});

/**
* 重排序
* @returns
*/
function comsResort(){
var trs = $("#selectedComs").find(".table tbody tr");
trs.each(function(index){
	var sort = $(this).find(".comsSort");
	sort.text(index+1);
});
}

/**
 * 选择购进渠道类型
 * @returns
 */
$("input[name='channelType']").click(function(){
	var type = $(this).val();
	if(parseInt(type) != 3){
		var tbody = $("#comsTable").find("tbody");
		tbody.empty();
		$("#selectedComs").hide();
	}else{
		$("#selectedComs").show();
	}
});


/**
 * 供应渠道
 */
$("#toPointCom").click(function() {
	var ct = $("input[name='channelType']:checked").val();
	if(parseInt(ct) != 3){
		btn_alertDialog("提示","只有选择指定商业公司可以选择!");
	}else{
		$("#pointComModal").modal("show");
		queryComs();
	}
});

/**
 * 查询购进渠道
 * @returns
 */
$("#queryComBtn").click(function(){
	var supplyName = $("#gys").val();
	var com_table = "#com-table";
	$(com_table).jqGrid('setGridParam', {
        postData: {
        	"supplyName":supplyName
        },page:1
    }).trigger('reloadGrid');
});


/**
 * 确定购进渠道
 * @returns
 */
$("#comEnsure").click(function(){
	var ids = $("#com-table").jqGrid("getGridParam", "selarrrow");
	if(ids.length==0){
		btn_alertDialog("提示","请至少选择1个供应商");
		return;
	}
	
	var comTable = $("#selectedComs").find(".table");
	
	$(ids).each(function (index, id){
		var row = $("#com-table").jqGrid('getRowData', id);
		createComs(comTable,row);
	});
    $("#pointComModal").modal("hide");
});

/**
 * 创建指定商业公司
 * @param row
 * @returns
 */
function createComs(comTable,row){
	//去重
	var res = checkComRepeat(row);
	if(!res){
		var comsLen = comTable.find("tbody tr").length;
		var tbody = comTable.find("tbody");
		var tr = '<tr>'+
							'<td class="comsSort">'+(comsLen+1)+'</td>'+
							'<td class="comName">'+row.supplyName+'</td>'+
							'<td><input class="comId" value="'+row.supplyCode+'" type="hidden"/>'+
							'<input type="button" class="btn btn-primary delCom" value="清除"/></td>'+
						'</tr>';
		tbody.append(tr);
	}
}

function checkComRepeat(row){
	var trs = $("#selectedComs").find(".table tbody tr");
	if(trs.length == 0){
		return false;
	}
	
	var res = 0;
	trs.each(function(index){
		var comId = $(this).find(".comId").val();
		if(row.supplyCode == comId){
			res = 1;
			return false;
		}
	});
	
	if(res>0){
		return true;
	}
	return false;
}

/**
 * 指定商定购进公司
 * @param type
 * @returns
 */
function queryComs(){
	var companyName = $("#companyName").val();
	var entId =  $("#entId").val();
	if(companyName == "" || companyName == null){
		btn_alertDialog("提示","请选择分公司");
		return false;
	}
	var url = basePath+"/first/gys?companyName="+companyName+"&entId="+entId;
	var com_table = "#com-table";
	var com_selector="#com-pager";
	$(com_table).jqGrid({
        url:url,
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
        colNames: [ '编号','供应商', '供应商责任人','地区'],
        colModel: [{
            name: 'supplyCode',
            index: 'supplyCode',
            width:'200',
            key:true
        }, {
            name: 'supplyName',
            index: 'supplyName',
            width:'200',
        }, {
            name: 'people',
            index: 'people',
            width:'200',
        },{
        	name:'area',
        	index:'area',
            width:'210',
        }
        ],
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: com_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: false,//是否只能点击复选框多选
//        autowidth: true, //自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
    });
}

//$('#proNo').blur(function(){
$("#toFindPro").click(function(){
	var cjName = $("#changjia").val();
	var cyName = $("#companyName").val();
	var companyId = $("#companyId").val();
	var entId = $("#entId").val();
	var proNo = $("#proNo").val();
	if(proNo){
//		alert(cjName+" "+cyName);
		   $.ajax({
			      type: "GET",      //data 传送数据类型。post 传递
			      dataType: 'json',  // 返回数据的数据类型text
			      url:  basePath+'/newpro/findProInfoWithAcc',
			      cache: false,      
			      data: {
			    	     entId:entId,
			    	     proNo:proNo,
			    	     firstPartyName:cjName,
			    	     companyName:cyName,
			    	     companyId:companyId
			    	     },  //传送的数据
			      async: false,
			      error:function(){
			         alert("查询协议失败");
			      },
			      success: function (ret) {
			    	  console.log(ret);
			    	  if(ret!=null){
			    		  if(ret.code=="0"){
			    			  if(ret.result){
			    				  console.log("+++++++++++++");
			    				  var proProtocol = ret.result.proProtocol
			    				  var proSupplySales = ret.result.proSupplySalesVo
			    				  $("#effectiveEndDate").val(proProtocol.effectiveEndDate);
			    				  $("#factorytype").val(proProtocol.firstPartyType);
			    				  $("#changjiaid").val(proProtocol.firstPartyId);
			    				  $("#changjia").val(proProtocol.firstPartyName);
			    				  $("#proId").val(proProtocol.id);
			    				  $("#proType").val(proProtocol.proType);
			    				  var youVal = proSupplySales.purchaseChannel;
			    				  $("input[name='channelType']").each(function(index) {
			    					    if ($("input[name='channelType']").get(index).value == youVal) {
			    					        $("input[name='channelType']").get(index).checked = true;
			    					    }
			    				  });
			    				  var comTable = $("#selectedComs").find(".table");
			    				  var tbody_company = comTable.find("tbody");
			    				  tbody_company.html("");
			    				  if(parseInt(youVal) == 3){
		    						if(proSupplySales.proCompanyList){
		    		                	$.each(proSupplySales.proCompanyList, function(k,v){
		    		                		var comsLen = comTable.find("tbody tr").length;
		    		                		var tr = '<tr>'+
		    		                		'<td class="comsSort">'+(comsLen+1)+'</td>'+
		    		                		'<td class="comName">'+v.companyName+'</td>'+
		    		                		'<td><input class="comId" value="'+v.companyId+'" type="hidden"/>'+v.companyId+'</td>'+
		    		                		'</tr>';
		    		                		tbody_company.append(tr);
		    		                    })
		    						 }
			    					 $("#selectedComs").show();
			    				  }
			    				  var tbody_goods = $("#choose").children("tbody");	
			    				  tbody_goods.html("");
			    				  if(ret.result.supplyNoAllList&&ret.result.supplyNoAllList[0].formList){
			    						$.each(ret.result.supplyNoAllList[0].formList, function(k,v){
				    						var trlen = $("#choose tbody").find("tr").length;
				    						var data = "<tr class='record'>" 
				    						/*+"<td><input type='checkbox'/></td>"*/
				    						+"<td style='font-size: 11px;'>"+(trlen+1)+"</td>" //商品名称
				    						+"<td style='font-size: 11px;'>" 
				    						+"<input type='hidden' class='goodsCode' name='goodsCodeMulti' value='"+v.productNo+"'/>"+v.productNo
				    						+"<input type='hidden' class='erpGoodsCode' name='erpGoodsCode' value='"+v.productId+"'/></td>"//商品编号
				    						+"<td style='font-size: 11px;'>"+v.productName+"</td>" //商品名称
				    						+"<td style='font-size: 11px;'>"+v.goodsSpec+"</td>"//规格
				    						+"<td style='font-size: 11px;'>"+v.manufacturer+"</td>"//生产厂家
				    						/*+"<td style='font-size: 11px;'>"+v.pinpaichangjia+"</td>"//品牌厂家
				    						+"<td style='font-size: 11px;' class='stock'>"+v.exclusive + "</td>" //商品库存
*/				    						"</tr>";
				    						tbody_goods.append(data);
			    						})
			    				  }
			    			  }else{
			    				  alert("没有协议查询结果");
			    			  }
			    		  }else{
			    			  $("#proNo").val("");
			    			  alert(ret.msg);
			    		  }
			    	  }
			      }
			})
	}else{
		alert("输入协议编号");
	}
})
