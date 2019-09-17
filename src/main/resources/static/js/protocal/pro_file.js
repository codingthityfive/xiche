	//上传图片
     $(function() {
    	 function isLoad(){
    		 $(".isonLoad").css('display','block');
    	 }
    	 function noLoad(){
	     	$(".isonLoad").css('display','none');
    	 }
    var imgList=[];//图片路径集合
    $("#file").change(function() {
    	var stamp = document.getElementById("viewSub");//设置盖章按钮为不可用
    	stamp.disabled=true;
    	//        var length = document.getElementsByTagName("img").length-1;
    	var length = $(".imgcontain").find(".upImg").length;
        if(length>9){
        	btn_alertDialog("提示", "上传文件不能超过10个！");
        	stamp.disabled=false;
            return;
        }
        var file = document.getElementById("file").files;
        if(file.length > 10){
        	btn_alertDialog("提示", "上传文件不能超过10个！");
            return;
        }
        var result=document.getElementById("result");
        //多图预览
         for(i = 0; i< file.length; i ++) {
        	var index =  file[i].name.lastIndexOf(".");
        	var suffix =  file[i].name.substring(index + 1, file[i].name.length);//后缀名
    		var fileName =  file[i].name.substring( file[i].name.lastIndexOf("\\")+1);
    		var size = file[i].size;
    	        size = parseInt(size/1024);
            var formData = new FormData();
            formData.append("file", file[i]);
			formData.append("name", file[i].name);
			 var reader  = new FileReader();
             reader.readAsDataURL(file[i]);
           $.ajax({
				url : 'uploadFile',
				type : 'POST',
				data : formData,
				// 告诉jQuery不要去处理发送的数据
				processData : false,
				// 告诉jQuery不要去设置Content-Type请求头
				contentType : false,
				async: false,
				beforeSend : function() {
//					btn_alertDialog("提示", "正在进行，请稍候");
				},
				success : function(responseStr) {
					if (responseStr.length == 0) {
						btn_alertDialog("提示", "上传失败");
						return;
					}
	                reader.onload=function(e){
	                	var lengthNew = document.getElementsByTagName("img").length-1;
	                	lengthNew++;
	                	imgList.push(this.result); 
	                    	if(suffix == 'PDF' || suffix == 'pdf'){
		                    	 result.innerHTML = result.innerHTML + '<div class="imgbox"><div class="imgbox_zoom"><i class="fa fa-trash-o fa-lg closeBtn"></i></div><img class="Img upImg" src="'+basePath+'/static/assets/images/timg.jpg" alt="" />' +
				                    '<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].fileName" value="'+fileName+'"/>&nbsp;&nbsp;'
				                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].url" value="'+responseStr+'"/>&nbsp;&nbsp;'
				                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].suffix" value="'+suffix+'"/>&nbsp;&nbsp;'
				                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].fileSize" value="'+size+'"/>&nbsp;&nbsp;'
				                    +'</div>';
		                    }else{
		                    	result.innerHTML = result.innerHTML + '<div class="imgbox" style="margin:20px 20px 0 0;"><div class="imgbox_zoom"><i class="openBtn fa fa-search"></i> | <i class="fa fa-trash-o fa-lg closeBtn"></i></div><img class="Img upImg" src="' + this.result +'" alt="" /><div style="display:none;" class="imgs"><img  src="' + this.result +'" alt="" /></div>' +
			                    '<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].fileName" value="'+fileName+'"/>&nbsp;&nbsp;'
			                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].url" value="'+responseStr+'"/>&nbsp;&nbsp;'
			                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].suffix" value="'+suffix+'"/>&nbsp;&nbsp;'
			                    +'<input type="hidden"  name="proFileVo.file['+ lengthNew+ '].fileSize" value="'+size+'"/>&nbsp;&nbsp;'
			                    +'</div>';
		                    }
	                }
	                btn_alertDialog("提示", "上传成功")
	                stamp.disabled=false;
				},
				error : function(responseStr) {
					btn_alertDialog("提示", "上传失败");
					console.log("error");
				}
			});
        }
    })
	//删除按钮
	$(document).on("click",".closeBtn", function () {
	    document.getElementById("file").value = "";
        $(this).parents(".imgbox").remove();
        console.log($(this).parent().siblings(".Img")[0].src)
	    var delSrc=$(this).parent().siblings(".Img")[0].src;
	    for(var i=0 ;i<imgList.length;i++){
	        if(imgList[i]==delSrc){
	            imgList.splice(i,1)
	        }
	    }
	})
	
	// $(document).on("mouseover",".Img", function () {
	//
	//     $(this).parent().find(".imgs").css("display","block");
	// });
    //
    // $(document).on("mouseout",".Img", function () {
  	//
	//     $(this).parent().find(".imgs").css("display","none");
	// })
	$(document).on("click",".openBtn", function () {
		$("#imgModal").modal('toggle')
        $("#imgModalimgShow").get(0).src = $(this).parent().siblings(".Img")[0].src
	})
	
	
  });
     
function fileCheck(context){
	//console.log(context)
	if($(context).parents(".panel").find("#result .Img").length
        <=0){  // $(".Img").length
 		 btn_alertDialog("提示", "请上传附件");
 		 return false;
 	}else{
 		return true; 
 	}
}

function fileView(){
  var flieData = document.getElementById("result");
  return flieData;
}

function fileTypeView(){
	 var purCh = $("input[name='filetype']:checked").val();
	 $("#filetypes").val(purCh);
	  var filetypeData = document.getElementById("fileType");
	  return filetypeData;
	}
