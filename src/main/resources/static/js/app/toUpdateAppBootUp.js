var newFileName
 
$(function() {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
		var result=getApp();
		var id = $("#id").val();
		var picturePath = newFileName;
		var bootUpName = $("#bootUpName").val();
		var bootUpYesOrNo = $("input[name='bootUpYesOrNo']:checked").val();
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		var operationState = $("input[name='operationState']:checked").val();
		if (result){
			$.ajax({
	            url: basePath+'/app/updateAppBootUp?bootUpName='+bootUpName+"&picturePath="+picturePath+"&bootUpYesOrNo="+bootUpYesOrNo
	            +"&startTimeStr="+startTime+"&endTimeStr="+endTime+"&operationState="+operationState+"&id="+id,
	            type: 'POST', //GET
	            async: false,    //或false,是否异步
	            data: {
	            	        
	            	  },
	            timeout: 60000,    //超时时间
	            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
	            contentType: "application/json",
	            success: function (data) {
	            	
	                if (data==1) {
	      			  	dialog.close();
	                }
	                
	            },
	            
	            complete: function () {
	                console.log('结束')
	            }
	             
	        }); 
			 
		};
		
	});

	$("#model_close_btn").click(function () {
	    dialog.close().remove();
	})
 	
	 
});
/**
 * 返回厂家对象
 * @returns
 */
function getApp(){
	var appVal= {};
	var id = $("#id").val();
	var file = $("#accessory1").val();
	var picturePath = $("#picturePath").val();
	var bootUpName = $("#bootUpName").val();
	var bootUpYesOrNoYes = $("#bootUpYesOrNoYes").val();
	var bootUpYesOrNoNo = $("#bootUpYesOrNoNo").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var operationStateYes = $("#operationStateYes").val();
	var operationStateNo = $("#operationStateNo").val();
	var bootUpNameNumber=isNumber(bootUpName);
	var bootUpNameChinese=isChinese(bootUpName);	
	/** 
	 * 校验是否是数字 
	 * @param value 
	 * @return 
	 */  
	function isNumber(value)     
	{            
	    if (/^\d+$/.test(value))     
	    {     
	       return true;     
	    }      
	    else      
	    {       
	       return false;     
	    }     
	}  
	  
	/** 
	 * 判断是否为汉字 
	 * @param value 
	 * @return 
	 */  
	function isChinese(value)  
	{  
	    var reg = /[^\u4E00-\u9FA5]+/g;  
	    if(reg.test(value))  
	    {  
	        return false;  
	    }  
	    return true;  
	}  
/*	if(file == '' || file == null){
        btn_alertDialog("提示","请选择图片！");
		return false;
	}*/
	
	if(bootUpName == '' || bootUpName == null){
        btn_alertDialog("提示","请填写开机图片名称！");
		return false;
	}
	if(bootUpNameNumber== false || bootUpNameChinese== false){
    	if(bootUpNameNumber== true || bootUpNameChinese== true){
 
    		if(startTime == '' || startTime == null){
    	        btn_alertDialog("提示","请填写开始时间！");
    			return false;
    		}
    		
    		if(endTime == '' || endTime == null){
    	        btn_alertDialog("提示","请填写结束时间！");
    			return false;
    		}
    		
    		if(startTime > endTime){
    	        btn_alertDialog("提示","开始时间必须小于结束时间！");
    			return false;
    		}
 
    	}else{
        	btn_alertDialog("提示","请以汉字或数字命名！");
    		return false;
    	}

	}	

	 
	appVal.id = id;
	appVal.picturePath = picturePath;
	appVal.bootUpName = bootUpName;
	appVal.bootUpYesOrNoYes = bootUpYesOrNoYes;
	appVal.bootUpYesOrNoNo = bootUpYesOrNoNo;
	appVal.startTime = startTime;
	appVal.endTime = endTime;
	appVal.operationStateYes = operationStateYes;
	appVal.operationStateNo = operationStateNo;
	return appVal;
}
//上传图片
$("#upload_file1_btn").click(function () {
    var formData = new FormData();
    var name = $("#accessory1").val();
    var index1=name.lastIndexOf(".");
    var index2=name.length;
    var suffix=name.substring(index1+1,index2);//后缀名
    if (suffix!="jpg") {
        btn_alertDialog("提示","app开机页广告图片需为jpg格式！");
		return false;
    }
    formData.append("file",$("#accessory1")[0].files[0]);
    formData.append("name",name);
    if(name != null && name != ""){
    	$.ajax({
            url : basePath+'/activ/common/uploadImg',
            type : 'POST',
            data : formData,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(data) {
            	var code = data.code;
            	var fileName=data.result.fileName;
            	newFileName=fileName;
            	if(code == 0){
            		btn_alertDialog("提示","上传成功");
            	}
            	
            	if(code == 1){
            		btn_alertDialog("提示",data.msg);
            	}
            },
            error : function(data) {
            	btn_alertDialog("提示","上传失败");
                console.log("error");
            }
        });
    }else{
    	btn_alertDialog("提示","请选择文件后点击上传！");
    }
});
function  reload() { 
	var id = $("#id").val();
	var startTimeStr = $("#startTimeStr").val();
	var endTimeStr = $("#endTimeStr").val();
	var state = $("#state").val();
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "id": id,//id
            "startTimeStr": startTimeStr, 
            "endTimeStr": endTimeStr,
            "state": state
        },page:1
    }).trigger('reloadGrid');
}





