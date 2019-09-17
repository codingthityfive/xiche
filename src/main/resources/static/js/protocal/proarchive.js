$(function () {
	var dialog = top.dialog.get(window);
	$("#formSubmit").click(function(){
        confirmDialog("提示","确定归档?",submitForm);
    });

    function submitForm() {
        var record = {};
        var id = $("#proId").val();
        var code = $("#pro_audit_archive").val();
        var note = $("#pro_audit_archive_note").val();
        //表单校验
       if(code){
           if(code.length>10){
               btn_alertDialog("提示","归档编号长度在10个字符以内!");
               return false;
           }else if(code.match(/^[\u4e00-\u9fa5]+$/)){
               btn_alertDialog("提示","归档编号由数字和字母组成!");
               return false;
           }
       }else {
           btn_alertDialog("提示","归档编号不能为空!");
           return false;
       }
       if(note){
           if(note.length>200){
               btn_alertDialog("提示","归档备注长度不能大于200字!");
               return false;
           }
       }else {
           btn_alertDialog("提示","归档备注不能为空!");
           return false;
       }
        record.id = id;
        record.archivesCode = code;
        record.archivesNote = note;
        var datas = JSON.stringify(record);
        $.ajax({
            url: "archive",
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: datas,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if(data.code == 0){
                	 dialog.close();
                     dialog.remove();
                	btn_alertDialog("提示","归档成功!");
                }else {
                    btn_alertDialog("提示","归档失败");
                }
                
            }

        });
    };
	
    $(".model_close_btn").click(function () {
        dialog.close().remove()
    });

});
