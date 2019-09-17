	var w_width = $(window).width() * 0.8;
var w_height = $(window).height() * 0.75;

/**
 * 所有内容提交及验证
 */
$(function(){
    $("#firstPartyType").change(function(){
        var opt=$("#firstPartyType").val();
        if (opt==1||opt==2) {
            $("#protocalType option[value='1']").remove();
            $("#protocalType option[value='2']").remove();
            $("#protocalType option[value='3']").remove();
            $("#protocalType option[value='4']").remove();
            $("#protocalType").append("<option value='1'>一级协议</option>");
            $("#protocalType").append("<option value='2'>二级协议</option>");
            $("#protocalType").append("<option value='3'>临时协议</option>");
        }else if(opt == 4){
            $("#protocalType option[value='1']").remove();
            $("#protocalType option[value='2']").remove();
            $("#protocalType option[value='3']").remove();
            $("#protocalType option[value='4']").remove();
            $("#protocalType").append("<option value='2'>二级协议</option>");
            $("#protocalType").append("<option value='3'>临时协议</option>");
		}else {
            $("#protocalType option[value='1']").remove();
            $("#protocalType option[value='2']").remove();
            $("#protocalType option[value='3']").remove();
            $("#protocalType option[value='4']").remove();
            $("#protocalType").append("<option value='1'>一级协议</option>");
            $("#protocalType").append("<option value='2'>二级协议</option>");
            $("#protocalType").append("<option value='3'>临时协议</option>");
            $("#protocalType").append("<option value='4'>商业供货协议</option>");
        }
        
        //供销协议间谍start
    	setPurchaseChannel(opt);
    	var firstPartyName = $("#firstPartyName").val();
    	resetGoodsCountForAll(firstPartyName);
    	//清空返利表单
    	$("#setType").val("");
		$("#rebateDiv").html("");
		//供销协议间谍代码 end
		
		$("#firstPartyName").val("");
		$("#firstPartyId").val("");
    });
 
    /**
     * 提交预览,
     * 校验数据并生成预览界面
     */
    $("#viewSub").click(function(){
    	var checkRes = false;
        var protocalType = $("#protocalType").val();
    	//主协议验证
    	if (!priProtocalCheck()) {
    		return;
    	}
    	//如果选择的协议类型不是供货协议,将不校验该页面
        if(protocalType==4 && !businCheck()){
            return;//在这里校验
        }
        //供销协议校验
        if (!valiSupplySaleFinish()) {
        	return;
        }
        //协议返利校验
        if (!checkRebateForm()) {
        	return;
        }
    	//协议附件校验
        if(!fileCheck(this)){
        	return;
        }

        var ssView = buildViewDataForSS();
        var primary = buildProtocalHeadData();
        setPriProtocalView(primary);
        $("#supplySale").html(ssView);
        //协议附件
        var flieData = fileView();
        var filetypeData = fileTypeView();
        var sonDiv = document.getElementById("son");
        var fileTypes = document.getElementById("fileTypes");
        console.info(filetypeData);
        sonDiv.innerHTML = flieData.innerHTML;
        fileTypes.innerHTML = filetypeData.innerHTML;
        //去掉图片上关闭图标
        $("#son").find(".imgbox").each(function(){
          	 var btn = $(this).find(".imgbox_zoom");
      		 btn.remove();
        });
        
        var typefile = $("input[name='proFileVo.filetype']").val();
        $(":radio[name='filetype'][value='" + typefile + "']").prop("checked", true);
        $("input[name='filetype']").attr("disabled",true);
        if(protocalType==4){
        	var bs = List();
        	$("#businSupply").html(bs);
        }
	    
	    //返利编辑页面的数据
	    $("#proRebateVo").val(JSON.stringify(proRebate));
	    
	    //预览页面弹框
    	//加截协议模块的预览子页面
	    $("#proDetailRebate").load("proDetailRebate.ftl&random="+Math.random(), {proRebateVo: JSON.stringify(proRebate),firstPartyName:$("#firstPartyName").val()});
	    $("#viewModal").modal("show");
	    //协议修改放入预览页面隐藏域的值
	    var auditType = $("#auditType").val();
	    var lastProNo = $("#lastProNo").val();
	    $("#auditType").val(auditType);
	    $("#lastProNo").val(lastProNo);
    });
    
    // tabs 切换
    $('.nav-tabs>li').on(
    		'click',
    		function() {
    			var firstInfo=$("#firstPartyName").val();

                var proType = $("#protocalType").val();
    			
    			if(firstInfo==""||firstInfo==null||firstInfo==undefined||proType==""||proType==null||proType==undefined){
    				btn_alertDialog("提示","请完善表头信息");
    				return;
    			}else{
    				var isBusiness = $("#protocalType").val();
    				if ($(this).text().trim()=="商业供货协议条款"&&isBusiness!=4) {
    					btn_alertDialog("提示","协议类型为非商业供货协议，不能填写该条款信息");
    					return;
    				}
    				if($(this).text().trim()=="协议主条款"){
    					// $("#firstPartyType").removeAttrs("readonly");
    					// $("#protocalType").removeAttrs("readonly");
    					// $("#proLeaderName").removeAttrs("readonly");
    					// $("#firstPartyName").removeAttrs("readonly");

    					$("#firstPartyType").removeAttrs("disabled");
    					$("#protocalType").removeAttrs("disabled");
    					$("#proLeaderName").removeAttrs("disabled");
    					$("#firstPartyName").removeAttrs("disabled");
    				}else{
    					$("#firstPartyType").attr("disabled","disabled");
    					$("#firstPartyType").attr("readonly","readonly");
    					$("#protocalType").attr("disabled","disabled");
    					$("#protocalType").attr("readonly","readonly");
                        $("#proLeaderName").attr("readonly","readonly");
                        $("#proLeaderName").attr("disabled","disabled");
                        $("#firstPartyName").attr("readonly","readonly");
                        $("#firstPartyName").attr("disabled","disabled");
    				}
                    if ($(this).text().trim()=="协议供销条款") {
                        var firstPartyType = $("#firstPartyType").val();
                        if(firstPartyType == 4){
                            var val = $(this).prop("checked");
                            if(val){
                                $("#whole").removeAttr("checked");
                                btn_alertDialog("提示","代理商供销协议不能为全品!")
							}
                            $("#whole").attr('disabled',true);

                        }else {
                            $("#whole").attr('disabled', false);
                        }
                    }
    				if ($(this).text().trim()=="协议返利条款") {
    					//全品的厂家品牌名称显示
    					if ($("#rebateAllProductName")) {
    						$("#rebateAllProductName").text($("#firstPartyName").val());
    					}
    					//全品的商品数量显示
    					if ($("#rebateAllProductNum")) {
    						//如果供销条款是取的全品
    						if ($("#whole").prop('checked')) {
    							$("#rebateAllProductNum").text($("#ssgn").text());
    						} else {
    							$("#rebateAllProductNum").text($(".goodsId").length);
    						}
    					}
    					//当“商业供货协议条款”中“付款方式返利设置”或“结算方式返利设置”，无值时（0或者空），“是否底价供货”不做判断；有值时（非空且不为0），“是否底价供货”的值为默认值，且不可编辑
    					//返利方式设置总和
    					var fkForm = document.getElementById('fkForm');
    					var payAmount = Number(fkForm.rebateScale[0].value)+Number(fkForm.rebateScale[1].value)+
    				    Number(fkForm.rebateScale[2].value)+Number(fkForm.rebateScale[3].value)+
    				    Number(fkForm.rebateScale[4].value);
    					//结算方试设置总和
    					var jsForm = document.getElementById('jsForm');
    				    var jsAmount = Number(jsForm.rebateScale[0].value)+Number(jsForm.rebateScale[1].value)+
    				    Number(jsForm.rebateScale[2].value)+Number(jsForm.rebateScale[3].value)+
    				    Number(jsForm.rebateScale[4].value)+Number(jsForm.rebateScale[5].value);
    				    if (payAmount > 0 || jsAmount > 0) {
    				    	$("#weatherFloor1").prop('checked',true);
    				    	$("input[name='weatherFloor']").attr('disabled', true);
    				    }else{
    				    	$("input[name='weatherFloor']").removeAttr('disabled');
    				    }
    				}
    				
    				var $this = $(this), $nav_content = $('.nav-content');
    				$this.addClass('active').siblings().removeClass('active');
    				$nav_content.children('div').eq($this.index()).show()
    				.siblings().hide();
    			}
    		});
    // $("#importPro").on("click",function () {
    //     importPro();
    // });
    
    $("#businessSignName").on("click",function () {
    	var flag=$("#whetherActivity:checked").val();
    	
    	if (flag==0||flag==undefined) {
    		btn_alertDialog("提示","只有活动协议才能填写该内容");
    	}
    });
    $("#depositAmount").on("click",function () {
    	var flag=$("#whetherDeposit:checked").val();
    	
    	if (flag==0||flag==undefined) {
    		btn_alertDialog("提示","只有交了保证金才能填写此项");
    		$("#depositAmount").attr("readonly", "readonly");
            $("#depositAmount").val("");
    	}else{
    		$("#depositAmount").removeAttrs("readonly");
    	}
    });
    $("#depositBack").on("click",function () {
    	var flag=$("#whetherDeposit:checked").val();
    	
    	if (flag==0||flag==undefined) {
    		btn_alertDialog("提示","只有交了保证金才能填写此项");
    		$("#depositBack").prop("checked", false);
    	}
    });
    $("input[type=radio][name=whetherDeposit]").change(function () {
        var flag=$("#whetherDeposit:checked").val();

        if (flag==0||flag==undefined) {
            // btn_alertDialog("提示","只有交了保证金才能填写此项");
            // $("#depositBack").prop("checked", false);
            $("#depositAmount").val("");
            $("#depositAmount").attr("readonly","readonly");
            $("#depositBack").prop("checked", false);
            $("#depositBackDateStr").val("");
            $("#payCompanyId").val("");
            $("#payCompanyName").val("");
        }
    });


    $("#depositBackDateStr").on("click",function () {
    	var flag=$("#whetherDeposit:checked").val();
    	
    	if (flag==0||flag==undefined) {
    		btn_alertDialog("提示","只有交了保证金才能填写此项");
    		$("#depositBackDateStr").blur();
    	}
    });
    
    $("#firstPartyName").on("dblclick", function () {
    	var firstPartyType = $("#firstPartyType").val();
    	
    	if(firstPartyType==""||firstPartyType==null||firstPartyType==undefined){
    		btn_alertDialog("提示","请选择甲方类型!");
    		return;
    	}
        firstPartListMain(firstPartyType,this);
    });
    $("#proLeaderName").on("dblclick", function () {
    	proLeaderFlow();
    });
    $("#firstSignName").on("dblclick", function () {
    	firstSignerFlow();
        // firstPartListMain();
    });
    $("#payCompanyName").on("dblclick", function () {
    	var flag=$("#depositPayType:checked").val();
    	
    	if (flag==2) {
    		payCompanyNameFlow();
    	}else {
    		btn_alertDialog("提示", "选取商业公司才能填写该数据");
    	}
    });

    $("#depositPayType").change(function (){
        var flag=$("#depositPayType:checked").val();
        if(flag==1){
            $("#payCompanyId").val("");
            $("#payCompanyName").val("");
        }
    });
    $("#depositBack").change(function (){
        var flag=$("#depositBack").is(':checked');
        if(flag){
            $("#depositBackDateStr").attr("disabled","disabled");
            $("#depositBackDateStr").val("");
        }else{
            $("#depositBackDateStr").removeAttrs("disabled","disabled");
        }
    });

    $("input[name=whetherActivity]").change(function (){
        var flag=$("#whetherActivity:checked").val();

        if (flag==1) {
            if ($("#protocalType").val()!=3) {
                btn_alertDialog("提示","只有协议类型为临时协议的时候才能选择活动协议!");
                $("input[name=whetherActivity][value='0']").prop("checked",true);
                return;
            }
        }else{
            $("#businessSignName").find("option:contains('选择商家运营')").attr("selected",true);
        }
    });

    // $("#protocalType").change(function(){
    //     var protocalType = $("#protocalType").val();
    //     if(protocalType==3){
    //
    //         $("#whetherActivity").removeAttrs("disabled", "disabled");
    //     }else{
    //         $("#whetherActivity").attr("disabled", "disabled");
    //
    //     }
    // });


   $("#formSubmit").click(function () {
        var proProtocol = getProProtocol();
        callAjax("mainSaveOrUpdate", proProtocol);
    });

    /**
     * 主条款提交前检测
     */
    function priProtocalCheck() {
    	var proNo = $("#protocalCode").val();
    	// if (proNo==""||proNo==null) {
    	// 	btn_alertDialog("提示","协议编号不能为空");
    	// 	return false;
    	// }
    	var firstPartyType = $("#firstPartyType").val();
    	if (firstPartyType==""||firstPartyType==null) {
    		btn_alertDialog("提示","请选择甲方类型");
    		return false;
    	}
    	var proType = $("#protocalType").val();
    	if (proType==""||proType==null) {
    		btn_alertDialog("提示","请选择协议类型");
    		return false;
    	}
    	var proLeaderId = $("#proLeaderId").val();
    	var proLeaderName = $("#proLeaderName").val();
    	if (proLeaderName==""||proLeaderName==null) {
    		btn_alertDialog("提示","请选择一个协议负责人");
    		return false;
    	}
    	var firstPartyId = $("#firstPartyId").val();
    	var firstPartyName = $("#firstPartyName").val();
    	if (firstPartyName==""||firstPartyName==null) {
    		btn_alertDialog("提示","请选择一个甲方");
    		return false;
    	}
    	var secondPartyName = $("#secondPartyName").val();
    	if (secondPartyName==""||secondPartyName==null) {
    		btn_alertDialog("提示","请填写一个乙方");
    		return false;
    	}
    	var startTimeStr = $("#startTimeStr").val();
    	if (startTimeStr==""||startTimeStr==null) {
    		btn_alertDialog("提示","请选择生效日期");
    		return false;
    	}
    	var endTimeStr = $("#endTimeStr").val();
    	if (endTimeStr==""||endTimeStr==null) {
    		btn_alertDialog("提示","请选择生效截止日期");
    		return false;
    	}
    	var signDateStr = $("#signDateStr").val();
    	if (signDateStr==""||signDateStr==null) {
    		btn_alertDialog("提示","请选择签订日期");
    		return false;
    	}
    	var firstSignId = $("#firstSignId").val();
    	var firstSignName = $("#firstSignName").val();
    	var contractphone = $("#contractphone").val();
    	var position = $("#position").val();
    	if (firstSignName==""||firstSignName==null) {
    		btn_alertDialog("提示","请选择一个甲方签订人");
    		return false;
    	}
    	var whetherFlow=$("#whetherFlow:checked").val();
    	if(whetherFlow==null){
    		btn_alertDialog("提示","请选择是否提供流向");
    		return false;
    	}
    	var whetherActivity=$("#whetherActivity:checked").val();
    	var businessSignName = $("#businessSignName").val();
    	if (whetherActivity==null) {
    		btn_alertDialog("提示","请选择是否是活动协议");
    		return;
    	}else if(whetherActivity==1){
    		if(businessSignName==""||businessSignName==null){
    			btn_alertDialog("提示","请选择商家运营签订人");
    			return false;
    		}
    	}
    	var whetherDeposit=$("#whetherDeposit:checked").val();
    	var depositAmount = $("#depositAmount").val();
    	var depositBack=$("#depositBack").is(':checked');
    	var depositBackDateStr = $("#depositBackDateStr").val();
        var depositPayType=$("#depositPayType:checked").val();
        var payCompanyId = $("#payCompanyId").val();
        var payCompanyName = $("#payCompanyName").val();
    	if (whetherDeposit==null) {
    		btn_alertDialog("提示","请选择是否支付保证金");
    		return false;
    	}else if (whetherDeposit==1) {
    		if (depositAmount==""||depositAmount==null) {
    			btn_alertDialog("提示"," 请填写保证金");
    			return false;
    		}else if(depositAmount != null && depositAmount != "" && depositAmount>1000000){
    			btn_alertDialog("提示","保证金金额不能大于1000000！");
    			return false;
    		}else{
//                // var reg = /^((([1-9]\d*)|(0)))([.]\d{0,2})?$/;
//                var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
//                // alert(depositAmount)
//                if(!reg.test(depositAmount)){
//                    btn_alertDialog("提示","保证金为正数！");
//                    return false;
//                }
            }
    		if(!depositBack&&(depositBackDateStr==""||depositBackDateStr==null)){
    			btn_alertDialog("提示","请填写保证金归还时间");
    			return false;
    		}
            if (depositPayType==null) {
                btn_alertDialog("提示","请选择保证金支付方");
                return false;
            }else if(depositPayType==2){
                if (payCompanyName==""||payCompanyName==null) {
                    btn_alertDialog("提示","请选择保证金返还商业公司");
                    return false;
                }
            }
    	}

    	return true;
    }
    
    function getProProtocolOri() {
    	var protocal={};
    	var proNo = $("#protocalCode").val();
    	if (proNo==""||proNo==null) {
            btn_alertDialog("提示","协议编号不能为空");
    		return;
    	}
    	protocal.proNo = proNo;
    	var firstPartyType = $("#firstPartyType").val();
    	if (firstPartyType==""||firstPartyType==null) {
            btn_alertDialog("提示","请选择甲方类型");
    		return;
    	}
    	protocal.firstPartyType=firstPartyType;
    	var proType = $("#protocalType").val();
    	if (proType==""||proType==null) {
            btn_alertDialog("提示","请选择协议类型");
    		return;
    	}
    	protocal.proType=proType;
    	var proLeaderId = $("#proLeaderId").val();
    	var proLeaderName = $("#proLeaderName").val();
    	if (proLeaderName==""||proLeaderName==null) {
            btn_alertDialog("提示","请选择一个协议负责人");
    		return;
    	}
    	protocal.proLeaderId=proLeaderId;
    	protocal.proLeaderName = proLeaderName;
    	var firstPartyId = $("#firstPartyId").val();
    	var firstPartyName = $("#firstPartyName").val();
    	if (firstPartyName==""||firstPartyName==null) {
            btn_alertDialog("提示","请选择一个甲方");
    		return;
    	}
    	protocal.firstPartyId=firstPartyId;
    	protocal.firstPartyName=firstPartyName;
    	var secondPartyName = $("#secondPartyName").val();
    	if (secondPartyName==""||secondPartyName==null) {
            btn_alertDialog("提示","请填写一个乙方");
    		return;
    	}
    	protocal.secondPartyName=secondPartyName;
    	var startTimeStr = $("#startTimeStr").val();
    	if (startTimeStr==""||startTimeStr==null) {
            btn_alertDialog("提示","请选择生效日期");
    		return;
    	}
    	protocal.startTimeStr = startTimeStr;
    	var endTimeStr = $("#endTimeStr").val();
    	if (endTimeStr==""||endTimeStr==null) {
            btn_alertDialog("提示","请选择生效截止日期");
    		return;
    	}
    	protocal.endTimeStr = endTimeStr;
    	var signDateStr = $("#signDateStr").val();
    	if (signDateStr==""||signDateStr==null) {
            btn_alertDialog("提示","请选择签订日期");
    		return;
    	}
    	protocal.signDateStr = signDateStr;
    	var firstSignId = $("#firstSignId").val();
    	var firstSignName = $("#firstSignName").val();
    	var contractphone = $("#contractphone").val();
    	var position = $("#position").val();
    	if (firstSignName==""||firstSignName==null) {
            btn_alertDialog("提示","请选择一个甲方签订人");
    		return;
    	}
    	protocal.firstSignId = firstSignId;
    	protocal.firstSignName=firstSignName;
    	// protocal.contractphone=contractphone;
    	// protocal.position=position;
    	var whetherFlow=$("#whetherFlow:checked").val();
    	if(whetherFlow==null){
            btn_alertDialog("提示","请选择是否提供流向");
    		return;
    	}
    	protocal.whetherFlow=whetherFlow;
    	var whetherActivity=$("#whetherActivity:checked").val();
    	var businessSignName = $("#businessSignName").val();
    	if (whetherActivity==null) {
            btn_alertDialog("提示","请选择是否是活动协议");
    		return;
    	}else if(whetherActivity==1){
    		if(businessSignName==""||businessSignName==null){
                btn_alertDialog("提示","请选择商家运营签订人");
    			return;
    		}
    	}
    	protocal.whetherActivity=whetherActivity;
    	protocal.businessSignName=businessSignName;
    	var whetherDeposit=$("#whetherDeposit:checked").val();
    	var depositAmount = $("#depositAmount").val();
    	var depositBack=$("#depositBack").is(':checked');
    	var depositBackDateStr = $("#depositBackDateStr").val();
    	if (whetherDeposit==null) {
            btn_alertDialog("提示","请选择是否支付保证金");
    		return;
    	}else if (whetherDeposit==1) {
    		if (depositAmount==""||depositAmount==null) {
                btn_alertDialog("提示"," 请填写保证金");
    			return;
    		}
    		if(depositAmount != null && depositAmount != "" && depositAmount>1000000){
                btn_alertDialog("提示","保证金金额不能大于1000000！");
    			return;
    		}
    		if(!depositBack||depositBackDateStr==""||depositBackDateStr==null){
                btn_alertDialog("提示","请填写保证金归还时间");
    			return;
    		}
    	}
    	
    	protocal.whetherDeposit=whetherDeposit;
    	protocal.depositAmount=depositAmount;
    	if(depositBack){
    		protocal.depositBack=1;
    	}else{
    		protocal.depositBack=0;
    	}
    	protocal.depositBackDateStr=depositBackDateStr
    	var depositPayType=$("#depositPayType:checked").val();
    	var payCompanyId = $("#payCompanyId").val();
    	var payCompanyName = $("#payCompanyName").val();
    	if (depositPayType==null) {
            btn_alertDialog("提示","请选择保证金支付方");
    		return;
    	}else if(depositPayType==2){
    		if (payCompanyName==""||payCompanyName==null) {
                btn_alertDialog("提示","请选择保证金返还商业公司");
    			return;
    		}
    	}
    	protocal.depositPayType=depositPayType;
    	protocal.payCompanyId=payCompanyId;
    	protocal.payCompanyName=payCompanyName;
    	
    	return protocal;
    }
    
    // $("#tab").on("click","li",function(){      //只需要找到你点击的是哪个ul里面的就行
    //
    //     alert($(this).text());
    // });
    
    $("#rebateSub").click(function(){
    	checkRebateForm();
    });
});

/**
 * 设置主条款提交数据
 * @param buildProtocalHeadData
 * @returns
 */
function setPriProtocalView(data){
	//头部信息
	$("#dis_createTime").val(data.createTime);//创建日期
	$("#dis_proNo").val(data.protocalCode);//协议编号
	$("#dis_createUserName").val(data.name);//录入人
	$("#dis_username").val(data.username);//所属公司
	$("#dis_firstPartyTypeName").val(data.firstPartyTypeText);//甲方类型文本
	$("#hid_firstPartyType").val(data.firstPartyType);//甲方类型
	$("#dis_proTypeName").val(data.protocalTypeText);//协议类型文本
	$("#hid_proType").val(data.protocalType);//协议类型
	$("#dis_proLeaderName").val(data.proLeaderName);//协议负责人名称
	$("#hid_proLeaderId").val(data.proLeaderId);//协议负责人Id
	$("#dis_firstPartyName").val(data.firstPartyName);//甲方名称
	$("#hid_firstPartyId").val(data.firstPartyId);//甲方Id
	$("#dis_secondPartyName").val(data.secondPartyName);//乙方名称

	//主条款
	$("#dis_startTimeStr").val(data.startTimeStr);//生效开始时间
	$("#dis_endTimeStr").val(data.endTimeStr);//生效结束时间
	$("#dis_signDateStr").val(data.signDateStr);//签订时间
	$("#dis_firstSignName").val(data.firstSignName);//甲方签订人
	$("#hid_firstSignId").val(data.firstSignId);//甲方签订人ID
	$("#dis_contractphone").val(data.contractphone);//联系电话
	$("#dis_position").val(data.position);//甲方签订人职位
	//是否提供流向
	$("#hid_whetherFlow").val(data.whetherFlow);
	var flow = "";
	if(data.whetherFlow==0){
		flow+="<option>否</option>";
	}else if(data.whetherFlow==1){
		flow+="<option>是</option>";
	}	
	$("#dis_whetherFlow").html(flow);
	//是否活动协议
	$("#hid_whetherActivity").val(data.whetherActivity);
	var activ = "";
	if(data.whetherActivity==0){
		activ+="<option>否</option>";
	}else if(data.whetherActivity==1){
		activ+="<option>是</option>";
	}
	$("#dis_whetherActivity").html(activ);
	//商家运营签订人
	$("#hid_businessSignId").val(data.businessSignId);
	$("#hid_businessSignName").val(data.businessSignName);
	var signName = "<option>"+data.businessSignName+"</option>";
	$("#dis_businessSignName").html(signName);
	//是否交保证金
	$("#hid_whetherDeposit").val(data.whetherDeposit);
	var deposit = "";
	if(data.whetherDeposit == 0){
		deposit += "<option>否</option>";
	}else if(data.whetherDeposit == 1){
		deposit += "<option>是</option>";
	}
	$("#dis_whetherDeposit").html(deposit);
	
	$("#dis_depositAmount").val(data.depositAmount);//金额
	//协议后返还
	$("#hid_depositBack").val(data.depositBack);
	if(data.depositBack == 1){
		$("#dis_depositBack").prop("checked",true);
	}else{
		$("#dis_depositBack").prop("checked",false);
	}
	$("#dis_depositBackDateStr").val(data.depositBackDateStr);//返还日期
	//保证金支付方
	if(data.depositPayType==1){
		$("#dis_depositPayType1").prop("checked",true);
	}else if(data.depositPayType==2){
		$("#dis_depositPayType2").prop("checked",true);
	}
	$("#hid_payCompanyId").val(data.payCompanyId);//指定购进公司Id
	$("#dis_payCompanyName").val(data.payCompanyName);//指定购进公司
}


/**
 * 获取协议头部信息
 * @returns
 */
function buildProtocalHeadData(){
	//头部信息
	var createTime = $("#createTimeStr").val();//创建时间
	var protocalCode = $("#protocalCode").val();//协议编号
	var name = $("#name").val();//录入人
	var username = $("#username").val();//所属公司
	var firstPartyType = $("#firstPartyType").val();//甲方类型
	var firstPartyTypeText = $("#firstPartyType :selected").text();//甲方类型文本
	var protocalType = $("#protocalType").val();//协议类型
	var protocalTypeText = $("#protocalType :selected").text();//协议类型文本
	var proLeaderId = $("#proLeaderId").val();//协议负责人
	var proLeaderName = $("#proLeaderName").val();//协议负责人名称
	var firstPartyName = $("#firstPartyName").val();//甲方名称
	var firstPartyId = $("#firstPartyId").val();//甲方Id
	var secondPartyName = $("#secondPartyName").val();//乙方名称
	
	//主条款
	var startTimeStr = $("#startTimeStr").val();//生效开始时间
	var endTimeStr = $("#endTimeStr").val();//生效结束时间
	var signDateStr = $("#signDateStr").val();//签订时间
	var firstSignName = $("#firstSignName").val();//甲方协议签订人名称
	var firstSignId = $("#firstSignId").val();//甲方签订人Id
	var contractphone = $("#contractphone").val();//联系电话
	var position = $("#position").val();//甲方签订人职位
	var whetherFlow = $("input[name='whetherFlow']:checked").val();//是否提供流向
	var whetherActivity = $("input[name='whetherActivity']:checked").val();//是否活动协议
	var businessSignName = $("#businessSignName :selected").text();//商家运营签订人
	var businessSignId = $("#businessSignName :selected").val();//商家运营签订人Id
	var whetherDeposit = $("input[name='whetherDeposit']:checked").val();//是否交保证金
	var depositAmount = $("#depositAmount").val();//金额
	var depositBack = 0;//协议结束后返还
    if($("#depositBack").prop('checked')){
        depositBack=1;
    }
	var depositBackDateStr = $("#depositBackDateStr").val();//返还日期
	var depositPayType = $("input[name='depositPayType']:checked").val();//保证金支付方
	var payCompanyId = $("#payCompanyId").val();//指定商业公司Id
	var payCompanyName = $("#payCompanyName").val();//指定商业公司名称
	
	var head={};
	//头部
	head.createTime = createTime;
	head.protocalCode = protocalCode;
	head.name = name;
	head.username = username;
	head.firstPartyType = firstPartyType;
	head.firstPartyTypeText = firstPartyTypeText;
	head.protocalType = protocalType;
	head.protocalTypeText = protocalTypeText;
	head.proLeaderId = proLeaderId;
	head.proLeaderName = proLeaderName;
	head.firstPartyName = firstPartyName;
	head.firstPartyId = firstPartyId;
	head.secondPartyName = secondPartyName;
	
	//主条款
	head.startTimeStr = startTimeStr;
	head.endTimeStr = endTimeStr;
	head.signDateStr = signDateStr;
	head.firstSignName = firstSignName;
	head.firstSignId = firstSignId;
	head.contractphone = contractphone;
	head.position = position;
	head.whetherFlow = whetherFlow;
	head.whetherActivity = whetherActivity;
	head.businessSignId = businessSignId;
	head.businessSignName = businessSignName;
	head.whetherDeposit = whetherDeposit;
	head.depositAmount = depositAmount;
	head.depositBack = depositBack;
	head.depositBackDateStr = depositBackDateStr;
	head.depositPayType = depositPayType;
	head.payCompanyId = payCompanyId;
	head.payCompanyName = payCompanyName;
	return head;
}

function importPro() {
    top.dialog({
        url:basePath+ '/pro/toImportPro',
        title:'协议信息查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                var proNo=data.proNo;
                var auditType = 0//0表示协议导入，1表示协议修改
                window.location.href=basePath+ '/pro/getProInfo?proNo='+proNo+'&auditType='+auditType;
                // $('#payCompanyName').val( data.supplyName);
                // $('#payCompanyId').val( data.supplyCode);

            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function firstPartListMain(firstPartyType,obj) {
    // var firstPartyType = $("#firstPartyType").val();
    var proType = $("#protocalType").val();

    if(proType==null||proType==''){
        btn_alertDialog("提示","请选择协议类型");
        return;
    }
    if(firstPartyType == 4){
        w_width = $(window).width() * 0.8;
        w_height = $(window).height() * 0.75;
	}else {
        w_width = $(window).width() * 0.8;
        w_height = $(window).height() * 0.75;
	}
    top.dialog({
        url: basePath+'/pro/getFirstParty?type='+firstPartyType,
        title:'甲方信息查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            if(this.returnValue) {
                var data1=this.returnValue;
                // providerInfo(data);
                $('#remark').focus();
                // console.log(data);
                //甲方名称
                var firstPartyName = "";
                if(firstPartyType == 4){
                    $("#firstPartyName").val(data1);
				}else
                if(firstPartyType==3&&proType==4){
                    var factoryId='';
                    var factoryName='';
                    if(firstPartyType==3){
                        factoryId=data1.supplyCode;
                        factoryName=data1.supplyName;
                    }else{
                        factoryId=data1.id;
                        if(firstPartyType==1){
                            factoryName=data1.pinpaichangjia;
                        }else{
                            factoryName=data1.shengchanchangjia;
                        }
                    }
                    firstPartyName = factoryName;
                    $("#firstPartyId").val(data1.supplyCode);
                    $("#firstPartyName").val(data1.supplyName);
                    $.post(basePath+'/pro/isGysExist',{id:factoryId},function (data) {
                        if(data=='fail'){
                            // $('#fkForm').reset();
                            // clearForm($('#fkForm'));
                            // clearForm($('#jsForm'));
                            // clearForm($('#qtForm'));
                            $(".whetherTax").attr("checked",true);

                            // $(':input','#fkForm')
                            //     .not(':button, :submit, :reset, :hidden , :checkbox')
                            //     .val('')
                            //     .removeAttr('checked')
                            //     .removeAttr('selected');
                        }else{
                        	//重新加载商业供货协议
                            $("#businessSupplyDiv").load("pro_businessSupply",{"id":data});
                        }
                    });
                }else{
                    if(firstPartyType==3){
                        $("#firstPartyId").val(data1.supplyCode);
                        firstPartyName = data1.supplyName;
                        $("#firstPartyName").val(data1.supplyName);
                    }else {
                        $("#firstPartyId").val(data1.id);
                        if (firstPartyType == 1) {
                        	firstPartyName = data1.shengchanchangjia;
                            $("#firstPartyName").val(data1.shengchanchangjia);
                        } else {
                        	firstPartyName = data1.pinpaichangjia;
                            $("#firstPartyName").val(data1.pinpaichangjia);
                        }
                    }
                    $(".whetherTax").attr("checked",true);
                }

                //重置供销协议商品相关
                resetGoodsCountForAll(firstPartyName);
                //清空返利表单
                $("#setType").val("");
				$("#rebateDiv").html("");
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}
function clearForm(form) {
    // iterate over all of the inputs for the form
    // element that was passed in
    $(':input', form).each(function() {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
		var name = this.name;
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = "";
        // checkboxes and radios need to have their checked state cleared
        // but should *not* have their 'value' changed
        else if (type == 'checkbox' || type == 'radio')
        	if(name == 'whetherTax' || name == 'includeTax'){
                this.checked = true;
			}else {
                this.checked = false;
			}
        // select elements need to have their 'selectedIndex' property set to -1
        // (this works for both single and multiple select elements)
        else if (tag == 'select')
            this.selectedIndex = 1;
    });

}
    function isExistFirst(enddate) {
        // alert(1111);
        var opt=$("#firstPartyType").val();
        var type = $("#protocalType").val();
        if(opt == 4){
            type = 0;
		}
        var start = $('#startTimeStr').val();
        var url=basePath+ '/pro/isExistFirstPro';
        $.post(url,{ start:start,end:enddate,firstPartyId:$("#firstPartyId").val(),secondName:$("#secondPartyName").val(),type:type},function (data) {
            if(data==1){
                $('#endTimeStr').blur();
                btn_alertDialog(" 提示","该“生效日期”内，存在同类型协议，请仔细核对协议信息，谢谢！");
            }
        });
    }