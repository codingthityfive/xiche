var newOpen =null;
$(function () {
	var data = [];
	//请求后台，得到所有对象
	$.post("findAllMenu", {roleId:$("#roleId").val()}, function(result) {
		  if (result.code == 0) {
			  var menuList = result.result.menuList;
			  var companyId = result.result.companyId;
			  if (menuList.length > 0) {
				  for (var i=0; i<menuList.length; i++) {
					  //如果是集团公司，不显示协议新建
					  if (companyId == 1 && menuList[i].code == "pro_add") {
						  continue;
					  }
					  var node = {};
					  node.id = menuList[i].id;
					  node.name = menuList[i].menuName;
					  node.pId = menuList[i].parentId;
					  node.title =  menuList[i].menuName;
					  if (menuList[i].btnList && menuList[i].btnList.length > 0) {
						  var btnList = [];
						  for (var j=0; j<menuList[i].btnList.length; j++) {
							  var btn = {};
							  btn.id = menuList[i].btnList[j].id;
							  btn.btnName = menuList[i].btnList[j].btnName;
							  btn.menuId = menuList[i].btnList[j].menuId;
							  btnList.push(btn);
						  }
						  node.btnList = btnList;
					  }
					  data.push(node);
				  }
			  }
			  //初始化
			  queryHandler(data);
			  //勾选已存在的值
			  var promessionList = result.result.promessionList;
			  if (promessionList && promessionList.length > 0) {
				  for (var i=0;i<promessionList.length;i++) {
					  var p = promessionList[i];
					  if (p.functionType == 0) {
						  var zTree = $.fn.zTree.getZTreeObj("dataTree");
						  var node = zTree.getNodeByParam("id",p.functionId);
						  if (node) {
							  node.checked = true;
							  zTree.updateNode(node); 
						  }
					  } else {
						  $("#btn_"+p.functionId).attr("checked",true);
					  }
					  
				  }
			  }
		  }
	});
});
var setting = {
    check: {
        enable: true,
        chkStyle: "checkbox",//复选框类型
        autoCheckTrigger: true
    },
    view: {
        showLine: false,
        addDiyDom: addDiyDom,
    },
    data: {
        simpleData: {
            enable: true
        }
    
    },
    callback: {
    	onCheck: zTreeOnClick
	}
};
/**
 * 自定义DOM节点
 */
function addDiyDom(treeId, treeNode) {
    var spaceWidth = 15;
    var liObj = $("#" + treeNode.tId);
    var aObj = $("#" + treeNode.tId + "_a");
    var switchObj = $("#" + treeNode.tId + "_switch");
    var checkObj=$("#" + treeNode.tId + "_check");
    var icoObj = $("#" + treeNode.tId + "_ico");
    var spanObj = $("#" + treeNode.tId + "_span");
    aObj.attr('title',treeNode.title );
    aObj.append('<div class="divTd swich fnt" name="menu" style="width:20%"></div>');
    var div = $(liObj).find('div').eq(0);
    //从默认的位置移除
    switchObj.remove();
    spanObj.remove();
    // checkObj.remove();
    icoObj.remove();
    //在指定的div中添加
    div.append(switchObj);
    div.append(spanObj);
    //隐藏了层次的span
    var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
    switchObj.before(spaceStr);
    //图标垂直居中
    icoObj.css("margin-top","9px");
    switchObj.after(icoObj);
    icoObj.after(checkObj);
    var editStr = '';
    //按钮拼接
    if(treeNode.btnList && treeNode.btnList.length > 0){
    	for (var i=0;i<treeNode.btnList.length;i++){
    		if(treeNode.btnList[i].btnName=="集采"){
    			editStr += '<div class="divTd" name="btnDiv_'+treeNode.id+'" style="width:15%">' + '<input id="btn_'+treeNode.btnList[i].id+'" type="checkbox" value="'+treeNode.btnList[i].id+'" name="btnId" pro_add="jc" onclick="checkBtn('+treeNode.btnList[i].id+','+treeNode.btnList[i].menuId+',\''+treeNode.btnList[i].btnName+'\')">'+ treeNode.btnList[i].btnName  + '</div>';
    		}else if(treeNode.btnList[i].btnName=="地采"){
    			editStr += '<div class="divTd" name="btnDiv_'+treeNode.id+'" style="width:15%">' + '<input id="btn_'+treeNode.btnList[i].id+'" type="checkbox" value="'+treeNode.btnList[i].id+'" name="btnId" pro_add="dc" onclick="checkBtn('+treeNode.btnList[i].id+','+treeNode.btnList[i].menuId+',\''+treeNode.btnList[i].btnName+'\')">'+ treeNode.btnList[i].btnName  + '</div>';
    		}else{
    		    editStr += '<div class="divTd" name="btnDiv_'+treeNode.id+'" style="width:15%">' + '<input id="btn_'+treeNode.btnList[i].id+'" type="checkbox" value="'+treeNode.btnList[i].id+'" name="btnId" onclick="checkBtn('+treeNode.btnList[i].id+','+treeNode.btnList[i].menuId+')">'+ treeNode.btnList[i].btnName  + '</div>';
    		}
    	}
    }else {
    	editStr = '<div class="divTd" style="width:100%">无</div>';
    }
    editStr += '<div class="divTd">' + '</div>';
    aObj.append(editStr);

}
//初始化列表
function queryHandler(zTreeNodes){
    //初始化树
    $.fn.zTree.init($("#dataTree"), setting, zTreeNodes);
    //添加表头
    var li_head = ' <li class="head"><a><div class="divTd" style="width:20%">菜单名称</div>' +
        '<div class="divTd" style="width:80%;">功能按钮</div>' +
        '</a></li>';
    var rows = $("#dataTree").find('li');
    if (rows.length > 0) {
        rows.eq(0).before(li_head)
    } else {
        $("#dataTree").append(li_head);
        $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
    }
    //展开全部节点
	$.fn.zTree.getZTreeObj("dataTree").expandAll(true);
}

$(".btn_submit").click(function(){
	var zTreeObj = $.fn.zTree.getZTreeObj("dataTree"); 
	var checkedNodes = zTreeObj.getCheckedNodes();
	if (!checkedNodes || checkedNodes.length == 0) {
		btn_alertDialog('提示','请选择至少一个菜单');
		return;
	}
	var menuIds = [];
	for(var i=0;i<checkedNodes.length;i++){
		menuIds.push(checkedNodes[i].id)
	}
	var btnIds = [];
	$('input[name="btnId"]:checked').each(function(){ 
		btnIds.push($(this).val());
	})
	$.post("saveRolePermission", {roleId:$("#roleId").val(),menuIds:menuIds,btnIds:btnIds}, function(data) {
		  if (data.code==0) {
			  var dialog = top.dialog.get(window);
			  dialog.close(data);
			  dialog.remove();
		  } else {
			  btn_alertDialog('提示','保存失败'); 
		  }
	});
})

//取消
$(".btn_modalClose").click(function(){
	var dialog = top.dialog.get(window);
    dialog.close().remove()
})

//选中按钮的时候，同时选中它的上级菜单节点，取消的时候不作处理
function checkBtn(id,menuId,btnName) {
	//查找父节点下面的
	var zTree = $.fn.zTree.getZTreeObj("dataTree");
	var node = zTree.getNodeByParam("id",menuId);
	if($('#btn_'+id).is(':checked')) {
		if(btnName=='集采'){
			$("input[pro_add=dc]").removeAttr("checked");
		}
		if(btnName=='地采'){
			$("input[pro_add=jc]").removeAttr("checked");
		}
		node.checked = true;
		zTree.updateNode(node,true); 
	}
}

//取消菜单的时候，要取消它的下级所有按钮
function zTreeOnClick(event, treeId, treeNode) {
	if (treeNode.checked == false) {
		var btn = $('div[name="btnDiv_'+treeNode.id+'"]');
		if (btn.length > 0) {
			//查找它下面的checkbox，并取消它
			for(var i=0;i<btn.length;i++) {
				btn.find("input[type='checkbox'][name='btnId']").removeAttr("checked");//取消
			}
		}
	}
}