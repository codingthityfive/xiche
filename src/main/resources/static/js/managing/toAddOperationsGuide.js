//上传图片校验
function validateFile(file){
	
	var name = $("#accessory1").val();
    var startIndex=name.lastIndexOf(".");
    var suffix=name.substring(startIndex+1,name.length);//后缀名
    if (suffix!="pdf") {
        btn_alertDialog("提示","选择的文件类型不对");
		return false;
    }
	
}

//上传图片
$("#upload_file1_btn").click(function () {
	
	//判断是否选择附件
    var formData = new FormData();
    
    //判断是否选择文件
    var name = $("#accessory1").val();
    if(name == "" || name == null){
    	btn_alertDialog("提示","请选择一个文档");
 		return false;
    }
    
    //判断后缀名
    var index1=name.lastIndexOf(".");
    var index2=name.length;
    var suffix=name.substring(index1+1,index2).toLowerCase();
    if (suffix!="pdf") {
        btn_alertDialog("提示","选择的文件类型不对");
		return false;
    }
    
    formData.append("file",$("#accessory1")[0].files[0]);
    formData.append("name",name);
    if(name != null && name != ""){
    	var ret = callAjax(basePath+"/managing/validateFileExits","");
    	if(ret.code == 0){
    		if(ret.result == 1){
    			confirmDialog("提示","已经存在上传的文档，是否覆盖已上传的文档",uploadOperationsGuide,formData);
    			return false;
    		}
    		uploadOperationsGuide(formData);
    	}else{
    		btn_alertDialog("提示","网络延迟，请稍后再试！");	
    	}
    }
});


function uploadOperationsGuide(formData){

	$.ajax({
        url : basePath+'/managing/toUploadOperationsGuide',
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

}



