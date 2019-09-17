/**
 * 提交预览
 * @returns
 */
$(function(){
	var dialog = top.dialog.get(window);
	//提交预览
//	$("#subCheck").one("click",function(){
	$("#subCheck").click(function(){
		//收集form上传的参数,以便于逮住bug
		var formData = $("#viewForm").serialize();
		console.log("表单提交数据:"+formData);
		var auditType = $("#auditType").val();
		var lastProNo = $("#lastProNo").val();
		if(auditType==1){
			top.dialog({
			  	url:basePath + '/pro/auditProtocal',
			  	//title: '提交审批',
			      width:900,
			      height:800,
			      data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
			      onclose: function() {
			    	  var data = this.returnValue;
					  $("#paperProNos").val(data.paperProNos);
					  $("#auditNotes").val(data.auditNote);
					  $("#auditTypeA").val(auditType);
					  $("#lastProNoA").val(lastProNo);
					  var paramData = {};
					  paramData.proNo = lastProNo;
			          var datas = JSON.stringify(paramData);
			    	  $.ajax({
							url: "findProtocolByProNo",
				            type: 'POST', //GET
				            async: false,    //或false,是否异步
				            data: datas,
				            timeout: 60000,    //超时时间
				            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
				            contentType: "application/json",
				            beforeSend: function () {
				                // 禁用按钮防止重复提交
				                $("#subCheck").attr({ disabled: "disabled" });
				            },
				            success: function (data) {
				                if(data.code == 0){
				                	var action = basePath+"/pro/publishAudit";
									$("#viewForm").attr("action",action).submit();
									

//									var curHref = $(this).parents().find('a').attr('href');
//									var tagId = 'bTabs_proDetail'+lastProNo;
									//window.parent.$('#mainFrameTabs').bTabsClose('bTabs_tab41');
									//window.parent.$('#mainFrameTabs').bTabsAdd('bTabs_tab41','协议明细管理','/manage/pro/detail/manage');
									window.parent.$("#bTabs_tab41"+" iframe").attr('src',  basePath+"/pro/detail/manage");
									btn_alertDialog("提示","上传中……");
									setTimeout(function(){
										//window.parent.$('#mainFrameTabs').bTabsClose(tagId,curHref);
										var tagId = '#bTabs_proDetail'+lastProNo;
										var targetLi=$(window.parent.document).find("#nav-tab li.active");
										targetLi.find("button").trigger("click");
                                    }, 800);

					                }else {
					                    btn_alertDialog("提示","该协议已被其他用户修改，请勿再次修改！");
					                }
					            },
				            complete: function () {
				                $("#subCheck").removeAttr("disabled");
				            }
						});
			      },
				oniframeload: function() {
				}
			  }).showModal();
			return false;
		}else if(auditType==0){	
			$("#subCheck").attr({ disabled: "disabled" });
			$("#auditTypeA").val(auditType);
			$("#paperProNos").val("");
			$("#auditNotes").val("");
			$("#lastProNoA").val("");
			var action = basePath+"/pro/publish";
			$("#viewForm").attr("action",action).submit();
		}
	});
});