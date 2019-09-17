$(function(){
	var dialog = top.dialog.get(window);
	$("#formSubmit").one('click',function(){
        confirmDialog("提示","确定提交?",submitForm);
    });
    $("#pageclose").click(function () {
    	dialog.remove();
    });

    $("#auditNote").keyup(function () {
        var length = 500;
        var currlength = $("#auditNote").val().length;
        if(currlength < 500){
            $("#count_length").html('已输入'+currlength +'字,剩余'+(length - currlength)+'字');
        }else {
            $("#count_length").html('<span style="color: red">已输入'+currlength +'字,超出'+(currlength -length)+'字</span>');
        }
    });
	function submitForm(){
		var auditNote = $("#auditNote").val();
		var paperNoList = {};
		var reg = /^[0-9a-zA-Z]+$/;
		var paperProNos = "";

		$("#input").find(".paperNo").each(function(i){
         	if($(this).val() == '' || $(this).val()== null){
         		paperProNos = "";
                return false;
         	}else{
         		paperProNos +=$(this).val() +",";
         	}
         });
       	 var special = specialVal(paperProNos);
       	 if(special){
       		 btn_alertDialog("提示","请填写正确的纸质件编号!");
           	 return false;
       	 }
		if(paperProNos.length>0){
			paperProNos = paperProNos.substring(0, paperProNos.lastIndexOf(','));
		};
		if(auditNote.length>500){
			btn_alertDialog("提示","备注字数超出500，请修改");
			return false;
		}else if(auditNote.replace(/(^s*)|(s*$)/g, "").length ==0){
			btn_alertDialog("提示","备注不能为空!");
			return false;
		}
		
		var obj = {};
		obj.paperProNos = paperProNos;
		obj.auditNote = auditNote;
		
		//父dialog
		var dialog = parent.dialog.get(window);
		dialog.close(obj).remove();

	};
	
	
	 /**
	 * 增加
	 */
    $("#input").on("click",".addDic",function(){
    	var length = $("#input").find("div").length;
    	if(length<5){
    		var Html = '<div class="input-group"><label class="input-group-addon"  id="inputt">纸质件编号</label>'+
        	'<input type="text" maxlength="20" id="paperProNo" class="paperNo" autocomplete="off" name="paperProNo" data-toggle="tooltip"  data-placement="bottom"/>'+
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