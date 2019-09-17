$(function(){

//全选函数
$('.checkbox-all').click(function(){
    if($(this).prop('checked')){
        $(this).parent().next().find('.checkboxs').prop('checked',true);
    }else{
        $(this).parent().next().find('.checkboxs').prop('checked',false);
    }
})

//单个checkbox与全选的关系函数
$('.select-content').on('click','.checkboxs',function(e){

    var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
    var checkboxs = $(this).prop('checked');
    if(!checkboxs&&checkedAll.prop('checked')){
        checkedAll.prop('checked',false);
    }else if(checkboxs&&!checkedAll.prop('checked')){
        var lis = $(this).parents('ul').children();
        for(var i=0;i<lis.length;i++){
            if($(lis[i]).find('.checkboxs').prop('checked')){
                if(i==lis.length-1){
                    checkedAll.prop('checked',true)
                }
            }else{
                break;
            }
        }
    }
    stopFunc(e);
});
$('.select-content').on('click','li',function(){
    $(this).children('.checkboxs').click();
})

//左右移按钮点击事件
$('.arrow-btn').click(function(){
    var checkboxs,origin,target,num=0;
    if($(this).hasClass('right')){
        origin = $('.unselect-ul');
        target = $('.selected-ul');
    }else{
        origin = $('.selected-ul');
        target = $('.unselect-ul');
    }
    checkboxs = origin.find('.checkboxs');
    for(var i=0;i<checkboxs.length;i++){
        if($(checkboxs[i]).prop('checked')){
        	var isClone = true;
            var that = $(checkboxs[i]).parent().clone();
            that.children('input').prop('checked',false);
            //在这里判断，如果右边已经存在，则不加，不存在就追加，但是左边始终要移除
            var userId = that.children('input').val();
            var targetCheckList = target.find('.checkboxs');
            if (targetCheckList.length > 0) {
            	for (var k=0;k<targetCheckList.length;k++) {
                	var targetId = $(targetCheckList[k]).val();
                	if (userId == targetId) {
                		isClone = false;
                		break;
                	}
                }
            }
            if (isClone) {
            	target.append(that);
            }
            $(checkboxs[i]).parent().remove();
        }else{
            num++;
        }
    }
    if(checkboxs.length == num){
        btn_alertDialog('提示','请选择用户');
    }else{
        origin.parent().prev().find('.checkbox-all').prop('checked',false);
        }
    })

})


function stopFunc(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}

//搜索
$("#queryBtn").click(function(){
	$("#unCheckUL").html("");
	$.post("findNotBlongUserListByName", $("#searchForm").serialize(), function(data) {
		  if (data.result && data.result.length > 0) {
			  var userList = data.result;
			  var ulHtml = '';
			  for (var i=0;i<userList.length;i++) {
				  ulHtml = ulHtml + '<li>';
				  ulHtml = ulHtml + '<input name="userId" value="'+userList[i].id+'" type="checkbox" class="checkboxs" />';
				  ulHtml = ulHtml + '<span>'+userList[i].username+'</span>';
				  ulHtml = ulHtml + '</li>';
			  }
			  $("#unCheckUL").html(ulHtml);
		  }
	});
})

//确定
$("#subBtn").click(function(){
	var checkboxs = $('.selected-ul').find('.checkboxs');
	var userIds = [];
	for (var i=0; i<checkboxs.length; i++) {
		var userId = $(checkboxs[i]).val();
		userIds[i] = userId;
	}
	if (userIds.length==0) {
		confirmDialog("确认信息","确定清空该角色下所有用户？",saveRoleUsers,userIds);
	}else{
		saveRoleUsers(userIds);
	}
})

function saveRoleUsers(userIds) {
	//提交修改
	$.post("saveRoleUsers", {userIds:userIds,roleId:$("#roleId").val()}, function(data) {
		  if (data.code == 0) {
			  var dialog = top.dialog.get(window);
			  dialog.close(data);
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示',data.msg);
		  }
	});
}
//取消
$("#cancelBtn").click(function(){
	var dialog = top.dialog.get(window);
    dialog.close().remove()
})