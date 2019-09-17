

$(document).ready(function () {
    var dialog = top.dialog.get(window);
    var isupdae = dialog.data;
    $("#model_cofirm_btn").click(function () {
        var factoryCode =$("input[name='factroyCode']").val();
        var factoryName = $("input[name='factroyName']").val();

        if(factoryCode == null || factoryCode == ''){
            btn_alertDialog("提示","厂家编号错误！");
            return false;
        }
        if(factoryName == null || factoryName == ''){
            btn_alertDialog("提示","厂家名称不能为空！");
            return false;
        }else {
            factoryName =$.trim(factoryName);
            if(factoryName.length > 20){
                btn_alertDialog("提示","厂家名称不能超出20个字！");
                return false;
            }
        }
        var ziDingYiChangJia={};
        ziDingYiChangJia.factoryName = factoryName;
        ziDingYiChangJia.factoryCode = factoryCode;
        var datas = JSON.stringify(ziDingYiChangJia);
        var currurl = "";
        if(isupdae ==1){
            currurl = "add";
        }else {
            currurl = "update";
        }
        $.ajax({
            url: currurl,
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: datas,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data ) {
                if(data.code == 0){
                    if(isupdae == 1){
                        btn_alertDialog("提示","新增自定义厂家成功！");
                    }else {
                        btn_alertDialog("提示","修改自定义厂家成功！");
                    }
                    dialog.close();
                    dialog.remove();
                }else {
                    btn_alertDialog("提示",data.msg);
                    return false;
                }
            },
            error: function (data) {
                if(isupdae == 1){
                    btn_alertDialog("提示","新增厂家失败！");
                }else{
                    btn_alertDialog("提示","修改厂家失败！");
                }
                return false;
            }
        });
    });


    $("#model_close_btn").click(function () {
        dialog.close();
        dialog.remove();
    })
});