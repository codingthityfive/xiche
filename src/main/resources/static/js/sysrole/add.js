$("#submitBtn").click(function(){
	if (!checkRoleName()){
		return ;
	};
	if (roleName.length > 20) {
		$("#megInfo").text('提示：角色名称不能超过20个字');
		return ;
	}
	$("#megInfo").text('');
	//提交修改
	$.post("save", $("#roleForm").serialize(), function(data) {
		  if (data.code == 0) {
			  var dialog = top.dialog.get(window);
			  dialog.close(data);
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示',data.msg);
		  }
	});
})

function checkRoleName(){
	var roleName = $("#roleName").val();
	if (roleName==null || $.trim(roleName) == "") {
		$("#megInfo").text('提示：角色名称不能为空');
		return false;
	}
	$("#megInfo").text('');
	return true;
}
//取消
$('.btn_modalClose').click(function(){
	var dialog = top.dialog.get(window);
    dialog.close().remove()
})