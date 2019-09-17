
var cityIds=[];
var listIds = [];
$(function () {
    var dialog = top.dialog.get(window);
    var datas = dialog.data;
    var msgId="";
    if(datas){
        if(datas.list){
            cityIds = datas.list;
        }
        var data = datas.messageToo;
        if(datas.isupdate){
            $("input").attr("disabled","disabled");
            $("#Range_id").attr("disabled","disabled");
            $("#searchProvider").attr("disabled","disabled");
            $("#changjia_btn").attr("disabled","disabled");
            $("textarea").attr("disabled","disabled");
            $("#model_close_btn_hide").show();
            $("#model_close_btn").hide();
            $("#add_message_new_btn").hide();
        }else {
            $("input").attr("disabled",false);
            $("#Range_id").attr("disabled",false);
            $("#changjia_btn").attr("disabled",false);
            $("#searchProvider").attr("disabled",false);
            $("textarea").attr("disabled",false);
            $("#model_close_btn_hide").hide();
            $("#model_close_btn").show();
            $("#add_message_new_btn").show();
        }
        var usefullife = data.usefullife;
        var usetime = [];
        usetime = usefullife.split('至');
        var targetScope = data.targetscope;
        var accessory1 = data.accessory1;
        var accessory2 = data.accessory2;
        var accessory3 = data.accessory3;
        msgId = data.id;
        $("#message_title").val(data.title);
        $("#ent_id").val(data.title);
        $("#companyId").val(data.companyId);
        $("#direct_name").val(data.companyName);
        if(targetScope == 1){
            $("#Range_id").find("option[value='1']").attr("selected",true);
            $("#changjia_btn").show();
        }else {
            $("#Range_id").find("option[value='0']").attr("selected",true);
            $("#changjia_btn").hide();
        }

        $("#message_counts").val(data.messagecontent);

        $("#startDate").val(usetime[0]);
        $("#endDate").val(usetime[1]);
        $("#count_length").html('已输入'+data.messagecontent.length +'字,剩余'+(200 - data.messagecontent.length)+'字');
        if(accessory1 != null && accessory1 != ""){
            var html='<input readonly type="text" maxlength="20"  style="width: 400px" value="'+accessory1+'" />'
            $("#accessory11").append(html)
        }
        if(accessory2 != null && accessory2 != ""){
            var html='<input readonly type="text" maxlength="20"  style="width: 400px" value="'+accessory2+'" />'
            $("#accessory22").append(html)
        }
        if(accessory3 != null && accessory3 != ""){
            var html='<input readonly type="text" maxlength="20"  style="width: 400px" value="'+accessory3+'" />'
            $("#accessory33").append(html)
        }
    }

    //提交按钮
    $("#add_message_new_btn").click(function () {


        var messageName = $("#message_title").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var vebder = $("#Range_id").val();
        var messageCount = $("#message_counts").val();
        var usefullife = startDate+"至"+endDate;
        var entId = $("#ent_id").val();
        var companyId = $("#companyId").val();
        var companyName =$("#direct_name").val();

        if(messageName == "" || messageName == null){
            btn_alertDialog("提示","标题不能为空");
            return false;
        }else {
            if(messageName.length > 20){
                btn_alertDialog("提示","标题不能超过20字");
                return false;
            }
        }

//        if(entId == "" || entId == null){
//            btn_alertDialog("提示","分公司信息不能为空");
//            return false;
//        }
        if(companyId == "" || companyId == null){
            btn_alertDialog("提示","分公司信息不能为空");
            return false;
        }
        if(companyName == "" || companyName == null){
            btn_alertDialog("提示","分公司信息不能为空");
            return false;
        }
        if(startDate == "" || startDate == null){
            btn_alertDialog("提示","开始时间不能为空");
            return false;
        }
        if(endDate == "" || endDate == null){
            btn_alertDialog("提示","结束时间不能为空");
            return false;
        }
        var startTime = new Date(startDate).getTime();
        var endTime = new Date(endDate).getTime();
        var  nowTime = new Date().getTime();
        if(startTime <= endTime){

        }else {
            btn_alertDialog("提示","发布日期有误");
            return false;
        }
        if(nowTime > endTime){
            btn_alertDialog("提示","结束日期有误");
            return false;
        }

        if(messageCount == "" || messageCount == null){
            btn_alertDialog("提示","内容不能为空");
            return false;
        }else {
            if(messageCount.length > 200){
                btn_alertDialog("提示","内容不能超过200字");
                return false;
            }
        }
//        if(entId == "" || entId == null){
//            btn_alertDialog("提示","请指定分公司");
//            return false;
//        }
        var messageAndSupplier ={};

        if(vebder != null && vebder!= ''){
            if(vebder == 1){
                if(cityIds.length < 1){
                    btn_alertDialog("提示","请选择关联厂家");
                    return false;
                }
            }
        }else {
            btn_alertDialog("提示","请选择目标范围");
            return false;
        }

        var mss = {"title":messageName,"messagecontent":messageCount,"startDate":startDate,"endDate":endDate,"targetscope":vebder,"usefullife":usefullife,"entId":entId,"companyName":companyName,"companyId":companyId};

        var accessory1 =  $("#upload_file1_btn").attr("data-url");
        var accessory2 =  $("#upload_file2_btn").attr("data-url");
        var accessory3 =  $("#upload_file3_btn").attr("data-url");
        if(accessory1 != undefined && accessory1 != ""){
            accessory1 = accessory1;
            mss.accessory1=accessory1;
        }
        if(accessory2 != undefined && accessory2 != ""){
            accessory2 = accessory2;
            mss.accessory2=accessory2;
        }
        if(accessory3 != undefined && accessory3 != ""){
            accessory3 = accessory3;
            mss.accessory3=accessory3;
        }
        if(msgId != ""){
            mss.id=msgId;
        }


        if(vebder == 1){
            messageAndSupplier.list=cityIds;
            messageAndSupplier.messageToo=mss;
        }else {
            messageAndSupplier.messageToo=mss;
        }
        var datas = JSON.stringify(messageAndSupplier);
        if(msgId != ""){
            $.ajax({
                type: "POST",
                url: "update" ,
                data: datas,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(datas){
                    if(datas.code == 0){
                        btn_alertDialog("提示","修改成功");
                        cityIds.splice(0,cityIds.length);
                        dialog.close();
                        dialog.remove();
                    }else {
                        btn_alertDialog("提示","修改失败");
                        cityIds.splice(0,cityIds.length);
                    }

                },
                error : function(responseStr) {
                    btn_alertDialog("提示","发布失败");
                }
            });
        }else {
            $.ajax({
                type: "POST",
                url: "add" ,
                data: datas,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(datas){
                    if(datas.code == 0){
                        btn_alertDialog("提示","发布成功");
                        cityIds.splice(0,cityIds.length);
                        dialog.close();
                        dialog.remove();
                    }else {
                        btn_alertDialog("提示","发布失败");
                    }

                },
                error : function(responseStr) {
                    btn_alertDialog("提示","发布失败");
                }
            });
        }

    });
    $("#Range_id").change(function () {
        var rangeValue = $("#Range_id").val();
        if(rangeValue == 1){
            $("#changjia_btn").show();
        }else {
            cityIds.splice(0,cityIds.length);
            $("#changjia_btn").hide();

        }
    });
    $("#changjia_btn").click(function () {
        var companyId = $("#companyId").val();
        if(companyId == "" || companyId == null){
            btn_alertDialog("提示","请指定分公司");
            return false;
        }
        var rangeValue = $("#Range_id").val();
        if (rangeValue != 1){
            return false;
        }
        if(datas == '' || datas == null){
            var data={"companyId":companyId}
            datas=data;
        }else {
            datas.companyId=companyId;
        }

        top.dialog({
            url: 'message/toVender',
            title: '指定厂家',
            width:900,
            height:500,
            data: datas, // 给modal 要传递的 的数据
            onclose: function() {
                if(this.returnValue) {
                    var data=this.returnValue;
                    cityIds = data;
                }
            }
        })
            .showModal();
        return false;
    });
    $(".model_close_btn").click(function () {
        dialog.close().remove()
    });
    
    
    //上传功能开始============= 
//    $("#upload_file3_btn").on('click',function () {
//
//        var formData = new FormData();
//        var name = $("#accessory3").val();
//        formData.append("file",$("#accessory3")[0].files[0]);
//        formData.append("name",name);
//        $.ajax({
//            url : 'testuploadimg',
//            type : 'POST',
//            data : formData,
//            // 告诉jQuery不要去处理发送的数据
//            processData : false,
//            // 告诉jQuery不要去设置Content-Type请求头
//            contentType : false,
//            beforeSend:function(){
//                console.log("正在进行，请稍候");
//            },
//            success : function(responseStr) {
//                    $("#upload_file3_btn").attr("data-url",responseStr);
//                btn_alertDialog("提示","上传成功");
//            },
//            error : function(responseStr) {
//                btn_alertDialog("提示","上传失败");
//                console.log("error");
//            }
//        });
//    });
//    $("#upload_file2_btn").on('click',function () {
//
//        var formData = new FormData();
//        var name = $("#accessory2").val();
//        formData.append("file",$("#accessory2")[0].files[0]);
//        formData.append("name",name);
//        $.ajax({
//            url : 'testuploadimg',
//            type : 'POST',
//            data : formData,
//            // 告诉jQuery不要去处理发送的数据
//            processData : false,
//            // 告诉jQuery不要去设置Content-Type请求头
//            contentType : false,
//            beforeSend:function(){
//                console.log("正在进行，请稍候");
//            },
//            success : function(responseStr) {
//                $("#upload_file2_btn").attr("data-url",responseStr);
//                btn_alertDialog("提示","上传成功");
//            },
//            error : function(responseStr) {
//                btn_alertDialog("提示","上传失败");
//                console.log("error");
//            }
//        });
//    });
//    $("#upload_file1_btn").on('click',function () {
//
//        var formData = new FormData();
//        var name = $("#accessory1").val();
//        formData.append("file",$("#accessory1")[0].files[0]);
//        formData.append("name",name);
//        $.ajax({
//            url : 'testuploadimg',
//            type : 'POST',
//            data : formData,
//            // 告诉jQuery不要去处理发送的数据
//            processData : false,
//            // 告诉jQuery不要去设置Content-Type请求头
//            contentType : false,
//            beforeSend:function(){
//                console.log("正在进行，请稍候");
//            },
//            success : function(responseStr) {
//                $("#upload_file1_btn").attr("data-url",responseStr);
//                btn_alertDialog("提示","上传成功");
//            },
//            error : function(responseStr) {
//                btn_alertDialog("提示","上传失败");
//                console.log("error");
//            }
//        });
//    });
    
    $("#upload_file3_btn").on('click',function () {
        var formData = new FormData();
        var name = $("#accessory3").val();
        formData.append("file",$("#accessory3")[0].files[0]);
        formData.append("name",name);
        $.ajax({
            url : 'uploadFile',
            type : 'POST',
            data : formData,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(responseStr) {
                    $("#upload_file3_btn").attr("data-url",responseStr);
                btn_alertDialog("提示","上传成功");
            },
            error : function(responseStr) {
                btn_alertDialog("提示","上传失败");
                console.log("error");
            }
        });
    });
    
    $("#upload_file2_btn").on('click',function () {
        var formData = new FormData();
        var name = $("#accessory2").val();
        formData.append("file",$("#accessory2")[0].files[0]);
        formData.append("name",name);
        $.ajax({
            url : 'uploadFile',
            type : 'POST',
            data : formData,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(responseStr) {
                $("#upload_file2_btn").attr("data-url",responseStr);
                btn_alertDialog("提示","上传成功");
            },
            error : function(responseStr) {
                btn_alertDialog("提示","上传失败");
                console.log("error");
            }
        });
    });
    
    $("#upload_file1_btn").on('click',function () {
        var formData = new FormData();
        var name = $("#accessory1").val();
        formData.append("file",$("#accessory1")[0].files[0]);
        formData.append("name",name);
        $.ajax({
            url : 'uploadFile',
            type : 'POST',
            data : formData,
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(responseStr) {
                $("#upload_file1_btn").attr("data-url",responseStr);
                btn_alertDialog("提示","上传成功");
            },
            error : function(responseStr) {
                btn_alertDialog("提示","上传失败");
                console.log("error");
            }
        });
    });
    
    //上传功能结束========================
    
    $("#message_counts").keyup(function () {
        var length = 200;
        var currlength = $("#message_counts").val().length;
        if(currlength < 200){
            $("#count_length").html('已输入'+currlength +'字,剩余'+(length - currlength)+'字');
        }else {
            $("#count_length").html('<span style="color: red">已输入'+currlength +'字,超出'+(currlength -length)+'字</span>');
        }
    });

    $("#searchProvider").on("click", function () {
        selectDirectName();
    });
    function selectDirectName() {
        top.dialog({
            url: basePath+'/message/aadCompany',
            title:'分公司表单',
            width:500,
            height:500,
            // data: "1", // 给modal 要传递的 的数据
            onclose: function() {
                if(this.returnValue) {
                    var data=this.returnValue;

                    $('#remark').focus();

                    $('#ent_id').val( data.entId);
                    $('#companyId').val( data.id);
                    $('#direct_name').val( data.companyName);

                }
            },
            oniframeload: function() {
                //console.log('iframe ready')
            }
        }).showModal();
    }
});
