$(function() {
	var roleIds = top.dialog.get(window).data.roleIds;
	if (roleIds && $.trim(roleIds) != '') {
		var idList = roleIds.split(',');
		for (var i=0;i<idList.length;i++) {
			$("#roleId_"+idList[i]).attr("checked",true);
		}
	}
})

$(".btn_submit").click(function(){
	var list=[];
	var roleName = "";
	if($('input[type=checkbox]:checked').length<=0){
	    btn_alertDialog('提示','至少选择一个角色');
	}else{
		$.each($('input:checkbox'),function(){
            if(this.checked){
                list.push($(this).val());
                roleName =roleName + "," + $("#roleName_"+$(this).val()).text();
            }
        });
    	var dialog = top.dialog.get(window);
    	dialog.close({roleIds:list,roleName:roleName.substring(1)});
    	dialog.remove();
    }

});

$(".btn_modalClose").click(function(){
	var dialog = top.dialog.get(window);
    dialog.close().remove()
});
