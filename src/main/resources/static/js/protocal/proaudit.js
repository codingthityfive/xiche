$(function () {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
        confirmDialog("提示","确定提交?",submitForm);
    });

    function submitForm() {
    	//驳回复选
	    obj = document.getElementsByName("category");
	    check_val = [];
	    for(k in obj){
	        if(obj[k].checked)
	            check_val.push(obj[k].value);
	    }
    	
        var paramData = {};
        var status = $("input[name='status']:checked").val();
        var id = $("#id").val();
        var check_valLength = check_val.length
        var check_valStr = check_val.toString();
        if($("#otherNote").val()){
        	if(check_valStr){
        		check_valStr = check_valStr +','+$("#otherNote").val()
        	}else{
        		check_valStr = $("#otherNote").val()
        	}
        }
        var auditNote = check_valStr;
        if(status == 1||status == 4){
        	auditNote = $("#auditNote").val()
        }
        //alert(check_valLength);
        //alert(check_val);
        //表单校验
        if(status == '' || status == null){
            btn_alertDialog("提示","请填写审核结果!");
            return;
        }else{
        	 var paperNo = "";
             $("#input").find(".paperNo").each(function(i){
             	if($(this).val() == '' || $(this).val()== null){
             		paperNo = "";
                    return false;
             	}else{
             		paperNo +=$(this).val() +",";
             	}
             });
             if($("#step").val() == 0 ){
            	 if(paperNo == '' || paperNo == null){
                	 btn_alertDialog("提示","请填写完整纸质件编号!");
                	 return;
                 }else{
                	 var special = specialVal(paperNo);
                	 if(special){
                		 btn_alertDialog("提示","请填写正确的纸质件编号!");
                    	 return;
                	 }
                 }
                 paramData.paperNo = paperNo;
             }
             //驳回
             if(status == 2 || status == 5){
            	 if(!check_valStr){
                     btn_alertDialog("提示","请选择驳回理由!");
                     return;
                 }
             }
             
              
        }

        paramData.status = status;
        paramData.id = id;
        paramData.auditNote=auditNote
        var datas = JSON.stringify(paramData);
        $.ajax({
            url: "audit",
            type: 'POST', //GET audit
            async: false,    //或false,是否异步
            data: datas,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if(data.code == 0){
                	 dialog.close();
                     dialog.remove();
                	btn_alertDialog("提示","审核成功!");
                }else if(data.code == 2){
                	btn_alertDialog("提示","该数据已经审核完成，请刷新界面!");
                }else {
                    btn_alertDialog("提示","审核失败");
                }
                
            }
//        	,
//            error: function (xhr, textStatus) {
//                btn_alertDialog("提示",textStatus);
//            },
//            complete: function () {
//                //console.log('结束')
//            }
            
        });
    };
    $('input[type=radio][name=status]').change(function() {
        if (this.value == 2 || this.value == 5) {
            $("#auditNote_select").show();
            $("#auditNote_text").hide();
            $("#otherNote").hide();
        }else {
            $("#auditNote_select").hide();
            $("#auditNote_text").show();
        }
    });
    $("#province").change(function () {
        $("#city option")
        if(this.value == 1){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='协议甲乙方信息'>协议甲乙方信息</option>");
            $("#city").append("<option value='物流配送信息'>物流配送信息</option>");
            $("#city").append("<option value='协议签订日期及生效日期'>协议签订日期及生效日期</option>");
            $("#city").append("<option value='返利政策及违约政策'>返利政策及违约政策</option>");
            $("#city").append("<option value='协议甲乙方落款缺少负责人签字'>协议甲乙方落款缺少负责人签字</option>");
            $("#city").append("<option value='无商品明细'>无商品明细</option>");
        }else if(this.value == 2){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='甲方名称与协议不一致'>甲方名称与协议不一致</option>");
            $("#city").append("<option value='扫描件模糊/不清晰'>扫描件模糊/不清晰</option>");
            $("#city").append("<option value='协议上传不完整/缺页'>协议上传不完整/缺页</option>");
            $("#city").append("<option value='扫描件格式有误'>扫描件格式有误</option>");
        }else if(this.value == 3){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='返利标准与协议不符'>返利标准与协议不符</option>");
            $("#city").append("<option value='任务量设置与协议不符'>任务量设置与协议不符</option>");
            $("#city").append("<option value='返利设置有误'>返利设置有误</option>");
            $("#city").append("<option value='返利政策模糊/无法核实'>返利政策模糊/无法核实</option>");
            $("#city").append("<option value='协议政策有歧义'>协议政策有歧义</option>");
            $("#city").append("<option value='阶梯条件设置方式有误'>阶梯条件设置方式有误</option>");
        }else if(this.value == 4){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='系统录入商品明细与协议不符'>系统录入商品明细与协议不符</option>");
            $("#city").append("<option value='系统录入商品明细错误'>系统录入商品明细错误</option>");
        }else if(this.value == 5){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='疑似一级协议'>疑似一级协议</option>");
            $("#city").append("<option value='疑似二级协议'>疑似二级协议</option>");
            $("#city").append("<option value='疑似商业供货协议'>疑似商业供货协议</option>");
            $("#city").append("<option value='疑似活动协议'>疑似活动协议</option>");
            $("#city").append("<option value='疑似临时协议'>疑似临时协议</option>");
        }else if(this.value == 6){
            $("#city").show();
            $("#auditNote_text").hide();
            $("#city").find("option").remove();
            $("#city").append("<option value='请备注重复签约的原因'>请备注重复签约的原因</option>");
        }else if(this.value == 7){
            $("#city").hide();
            $("#auditNote_text").hide();
        }else if(this.value == 8){
            $("#city").hide();
            $("#auditNote_text").hide();
        }else if(this.value == 9){
            $("#city").hide();
            $("#auditNote_text").show();
        }
    });
    $(".model_close_btn").click(function () {
        dialog.close().remove()
    });
    $("#proIdSubmit").click(function(){
    	var proId = $("#proId").val();
    	var auditBtnType = 2;
//    	window.parent.$('#mainFrameTabs').bTabsAdd("proAudit"+proId,"协议详情",basePath+'/pro/proDetailShow?proId='+ proId+'&auditBtnType='+auditBtnType);
    	top.dialog({
          	url: basePath+'/pro/proDetailShow?proId='+ proId +'&auditBtnType='+auditBtnType,
          	title: '协议明细',
              width:1400,
              height:800,
              autowidth: true,//自动宽
              data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
              onclose: function() {
              	var data = this.returnValue;
      			if (data == "success") {
      				$('#grid-table').jqGrid().trigger('reloadGrid');
      				//window.location="toList";
      				$('#value').html("这里是modal 返回的值  " + this.returnValue);
      			} 
              }
          }).showModal();
    });

        
    
//    $("#message_counts").keyup(function () {
//        var length = 200;
//        var currlength = $("#message_counts").val().length;
//        if(currlength < 200){
//            $("#count_length").html('已输入'+currlength +'字,剩余'+(length - currlength)+'字');
//        }else {
//            $("#count_length").html('<span style="color: red">已输入'+currlength +'字,超出'+(currlength -length)+'字</span>');
//        }
//    });
    
    
    
    /**
	 * 增加
	 */
    $("#input").on("click",".addDic",function(){
    	var length = $("#input").find("div").length;
    	if(length<5){
    		var Html = '<div class="input-group"><label class="input-group-addon"  id="inputt"><span style="color: red">*</span>纸质件编号</label>'+
        	'<input type="text" maxlength="20" id="paperNo" class="paperNo" autocomplete="off" name="paperNo" data-toggle="tooltip"  data-placement="bottom"/>'+
        	'       <a ="jhrefavascript:void(0);" class="addDic">    <label style="font-weight: bolder;font-size:30px;cursor:pointer;">+</label>     </a> '+
        	'      <a ="jhrefavascript:void(0);" class="delDic">     <label style="font-weight: bolder;font-size:30px;cursor:pointer;">-</label>     </a> </div>';
        	var dae = $("#input");
        	dae.append(Html);
    	}else{
    		btn_alertDialog("提示","只能添加5个纸质件编号!");
    	}
    });
    //shanchu
    $("#input").on("click",".delDic",function(){
    	$(this).parent().remove();
    });
});
$(function () {
	var pro_no = $("#pro_no").val();
	if(pro_no){
		$.ajax({
			url: "findAuditRecord",
			type: 'GET', //GET audit
			data: {proNo:pro_no},
            async: false,    //或false,是否异步
			dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
			contentType: "application/json",
			success: function (data) {
				if(data.code == 0){
					var datalist = data.result
					var html = ""
						if(datalist&&datalist.length>0){
							 $.each(datalist,function(index,value){
								 var status = ''
							     if(value.status==0){
							    	 status = '待审核'
							     }else if(value.status==1){
							    	 status = '一审通过'
							     }else if(value.status==2){
							    	 status = '一审驳回'
							     }else if(value.status==4){
							    	 status = '二审通过'
							     }else if(value.status==5){
							    	 status = '二审驳回'
							     }else if(value.status==3){
							    	 status = '已作废'
							     }
								 html+= "<tr><td>"+status+"</td>"
								 html+= "<td>"+value.auditTime+"</td>"
								 html+= "<td>"+value.auditNote+"</td>"
								 html+= "<td>"+value.secondAuditTime+"</td>"
								 html+= "<td>"+value.secondAuditNote+"</td></tr>"
							 })
							 $("#record_tbody").html(html);
							 $("#pro_record").show();
						}else{
							$("#pro_record").hide();
						}
				}else{
					$("#pro_record").hide();
				}
				
			}
		})
	}
});


function checkboxOnclick(checkbox){
    if ( checkbox.checked == true){
        //Action for checked
    	$("#otherNote").val("");
    	$("#otherNote").show();
    }else{
    	//Action for not checked
    	$("#otherNote").val("");
        $("#otherNote").hide();
    }
}
 
