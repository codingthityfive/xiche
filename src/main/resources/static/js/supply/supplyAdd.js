
$(function () {
    var dialog = top.dialog.get(window);

//提交
    $("#formSubmit").click(function(){
        confirmDialog("提示","确定提交?",submitForm);
    });

    function submitForm() {
        var paramData = {};
        var status = $("input[name='status']:checked").val();
        var manager = $("#manager").val();
        var telephone = $("#telephone").val();
        var examineRemark = $("#examineRemark").val();
        console.log(examineRemark);
        var allStock = $("#allStock").val();
        //表单校验
        if(status == '' || status == null){
            btn_alertDialog("提示","请填写审核结果!");
            return;
        }else{
            if(status == 1){
                //审核通过
                if(manager == '' || manager == null){
                    btn_alertDialog("提示","请填写商务经理!");
                    return;
                }
                if(telephone == '' || telephone == null){
                    btn_alertDialog("提示","请填写联系电话！");
                    return;
                }else{
                    if(!isPhoneAvailable(telephone)){
                        btn_alertDialog("提示","联系电话格式不正确！");
                        return;
                    }
                }
                paramData.telephone = telephone;
                paramData.manager = manager;
            }

            if(status == 2){
                //审核不通过
                if(examineRemark == '' || examineRemark == null){
                    btn_alertDialog("提示","请填写审核原因！");
                    return;
                }
                paramData.examineRemark = examineRemark;
            }
        }
        //格式化数字
        if(allStock != '' & allStock != undefined){
            allStock = allStock.replace(",","");
        };
        paramData.allStock = allStock;
        paramData.billId = $("#billId").val();
        paramData.status = status;

        var datas = JSON.stringify(paramData);

        $.ajax({
            url: "auditAndUpdate",
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: datas,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            beforeSend: function (xhr) {
                //console.log(xhr)
                //console.log('发送前');
            },
            success: function (data, xtStatus, jqXHR) {
                if(data.code == 0){
                    btn_alertDialog("提示","新增成功!");
                    dialog.close();
                    dialog.remove();
                }else {
                    btn_alertDialog("提示","新增失败");
                }
            },
            error: function (xhr, textStatus) {
                btn_alertDialog("提示",textStatus);
            },
            complete: function () {
                //console.log('结束')
            }
        });
    };

    $("#model_close_btn").click(function () {
        confirmDialog("提示","确定退出编辑?",closeModel,dialog);

    });

    //模态窗口关闭
    function closeModel(dialog) {
        dialog.close().remove();
    }

    //审核通过
    $("#passRadio").click(function () {
        $("#examineRemark").val("");//置空
        $("#examineRemark").attr("disabled",true);
        $("#telephone").attr("disabled",false);
        $("#manager").attr("disabled",false);
    });

    //审核不通过
    $("#noPassRadio").click(function () {
        $("#manager").val("");//置空
        $("#telephone").val("");//置空

        $("#telephone").attr("disabled",true);
        $("#manager").attr("disabled",true);
        $("#examineRemark").attr("disabled",false);
    });



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
});


