var dialog = top.dialog.get(window);
$("#proId").val(dialog.data.proId);
var adjustAmount = dialog.data.rebateAdjustAmount;
var adjustNote = dialog.data.rebateAdjustNote;
if (adjustAmount > 0) {
	$("#rebateAdjustAmount").val(adjustAmount);
}

if (adjustNote && adjustNote != '') {
	$("#rebateAdjustNote").val(adjustNote);
}
$("#submitBtn").click(function(){
	var rebateAdjustAmount = $("#rebateAdjustAmount").val();
	if (!rebateAdjustAmount) {
		$("#megInfo").text('提示：返利核算金额不能为空');
		return ;
	}
	
	var rebateAdjustNote = $("#rebateAdjustNote").val();
	if (!rebateAdjustNote || $.trim(rebateAdjustNote) == '') {
		$("#megInfo").text('提示：返利核算备注不能为空');
		return ;
	}
	rebateAdjustNote = $.trim(rebateAdjustNote);
	if (rebateAdjustNote.length > 200) {
		$("#megInfo").text('提示：返利核算备注不能超过200个字符');
		return ;
	}
	$("#megInfo").text('');
	//提交修改
	$.post("updateRebateAdjustById", $("#adjustForm").serialize(), function(data) {
		  if (data.code == 0) {
			  var dialog = top.dialog.get(window);
			  dialog.close({code:0,rebateAdjustAmount:rebateAdjustAmount,rebateAdjustNote:rebateAdjustNote});
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示',data.msg);
		  }
	});
	
})

//取消
$('.btn_modalClose').click(function(){
	var dialog = top.dialog.get(window);
    dialog.close().remove()
})