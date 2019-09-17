
$(document).ready(function () {
    $("#cencelbtn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });

    $("#confirmbtn").click(function(){
        var firstPartyName = $("#dls").val();
        var regEn = /[`~!@#$%^&*_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥——：；“”‘、，|《。》？、【】[\]]/im;
        if(firstPartyName != '' && firstPartyName.length <= 30){
            if(regEn.test(firstPartyName) || regCn.test(firstPartyName)) {
                btn_alertDialog(" 提示","名称不能包含特殊字符.");
                return false;
            }
        }else {
            btn_alertDialog(" 提示","甲方名称不能为空，且长度不能超过30位.");
            return false;
        }
        var dialog = parent.dialog.get(window);
        dialog.close(firstPartyName);
    });

});

