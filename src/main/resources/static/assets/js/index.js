function autoValidate(form) {
	$form = $(form);
	/*var reg = $form.find('input[pattern]');
	if (reg.length) {
		$.validator.addMethod("regex", function(value, input) {
			var re = eval("/"+$(input).attr('pattern')+"/");
			return re.test(value);
		}, '数据格式错误');
	}*/

	$(form).find('input[type="submit"]').bind('click', function() {

		var textareaObj = $('textarea');
		var tempVal = '';
		if (textareaObj) {
			textareaObj.each(function(i) {
				tempVal = $(this).val();
				$(this).val(tempVal.replace(/(<script.*?>|<\/script>)/ig, '').replace(/(&lt;script.*?&gt;|&lt;\/script&gt;)/ig, ''))
			})
		}

		if (window._editor) {
			$('textarea[data-item]').each(function(index, obj) {
				obj_val = window._editor[obj.id].html().replace(/(<script.*?>|<\/script>)/ig, '').replace(/(&lt;script.*?&gt;|&lt;\/script&gt;)/ig, '');
				$(obj).val(obj_val);
			})
		}
		if (window.Csseditor) {
			var obj = $('textarea[data-code]');
			obj.val(window.Csseditor.getValue());

		}
	})
	$form.validate({
		errorPlacement: function(error, element) {
			if (element.data('toggle') == "tooltip") {
				$(element).tooltip('destroy');
			}
			var placement = element.data('placement') ? element.data('placement') : 'bottom';
			element.data({
				title: '<span style="color:#d43f3a" class="glyphicon glyphicon-exclamation-sign"></span>' + error.html(),
				html: true,
				toggle: 'tooltip',
				placement: placement,
				container: 'body'
			});
			element.tooltip('show');
		},
		success: function(error, element) {
			if ($(element).data('toggle') == "tooltip") {
				$(element).tooltip('destroy');
			}
		},
		submitHandler: function(form) {
			ajaxSubmit($form);
			//return false;
		}
	});
	$form.bind('reset', function() {
		$form.find('.alert-danger').remove();
	})

}
function commonValidate(form1) {
	$form1 = $(form1);
	$form1.validate({
		errorPlacement: function(error, element) {
			if (element.data('toggle') == "tooltip") {
				$(element).tooltip('destroy');
			}
			var placement = element.data('placement') ? element.data('placement') : 'bottom';
			element.data({
				title: '<span style="color:#d43f3a" class="glyphicon glyphicon-xclamation-sign"></span>' + error.html(),
				html: true,
				toggle: 'tooltip',
				placement: placement,
				container: 'body'
			});
			element.tooltip('show');
		}
	})

}
function choosetable(element) {
	$(".tableChoose").hover(function(){
		$(this).children(".ChooseCheckbox").show();
	},function(){$(this).children(".ChooseCheckbox").hide()})
    //要绑定的表格类名
    var choosetable=element;
    var checkarray=[];
        //循环遍历table的th加入到筛选列表中
        $(choosetable+" th").each(function(){
        	//console.log($(this).children("#jqgh_grid-table_text").text());
            checkarray.push($(this).text());
        });
 for(var i=2;i<checkarray.length;i++) {
 	var checktext="";
 	checktext+="<label class='checkbox'><input type='checkbox' checked value='"+i+"'>"+checkarray[i]+"</label>";
 	$(".ChooseCheckbox").append(checktext);
 }

 $(".ChooseCheckbox .checkbox input").click(function(){
    var choosearr=[];
    $(".checkbox input").each(function(){
                if(!$(this).is(":checked")){
                    choosearr.push($(this).val());
                }
            })
            $(choosetable+" tr").each(function(){
               $(this).children().show();
           });
            for(var i=0;i<choosearr.length;i++){

                $(choosetable+" tr").each(function(){
                    $(this).children().eq(choosearr[i]).hide();
                });
                
            }
        });
}

/* 打开弹层窗口
使用方法<a href="打开页面地址（不能是跨域）" class="dialog" data-title="优先标题">标题</a>
*/

function openDialog(dialogs) {
	dialogs.bind('click', function() {
		var $this = $(this),
			title = $this.data('title') || $this.text(),
			fun = $this.data('callback'),
			url = $this.data('href');
		// if (url.indexOf('?') > 0) {
		// 	url += "&mini=true";
		// } else {
		// 	url += '?mini=true';
		// }
		dialog({
			id: 'dialog_win',
			title: title,
			url: url,
			lock: true,
			fixed: true,
			width: $(window).width() > 800 ? 800 : "96%",
			height:550,
			okValue:"确定",
			cancelValue:"取消",
			drag: true,
			esc: true,
			//quickClose: true,
			/*onshow: function () {
				////console.log('onshow');
				this.focus()
			}*/
			oniframeload: function() {
				////console.log('oniframeload');
			},
			onclose: function() {
				if (this.returnValue) {
					$('#value').html(this.returnValue);
				}
				////console.log('onclose');
			},
			onremove: function() {
				////console.log('onremove');
			}
		}).showModal();
		return false;
	})
}

function filtName(filtInput) {
	filtInput.keyup(function(){
	    $('table tbody tr').hide()
	      .filter(":contains('" +($(this).val()) + "')").show();
	}).keyup();
}
function showColumnDialog() { 
	$("#grid-table").jqGrid('setColumns', { modal: true }); 
}

$(function(){

	var form=$("form.validate"),
		tablechecked=$(".tableChecked"),
		choosetable=$(".choosetable"),
		filtInput=$("#filterName"),
		linkDialog = $('.dialog');
	if (form.length) {
		form.each(function() {
			autoValidate(this);
		})
		// var img = $('img#captcha')
		// if (img.length) {
		// 	$('#reloadCaptcha').bind('click', function() {
		// 		img.trigger('click')
		// 	})
		// 	img.bind('click', function() {
		// 		img.attr('src', img.attr('src') + '?' + new Date().valueOf())
		// 	})
		// }
	}
	// if(tablechecked.length){
	// 	tableChecked(tablechecked);
	// }
	// if(choosetable.length){
	// 	choosetable(".choosetable");
	// }

	if (linkDialog.length) {
		openDialog(linkDialog);
	}
	if (filtInput.length) {
		filtName(filtInput);
	}

	$("#goback").click(function(){
		window.history.go(-1);
	})

	//多标签tab
	//计算内容区域高度
	var calcHeight = function(){
		var browserHeight = $(window).innerHeight();
		var topHeight = $('#mainFrameHeadBar').outerHeight(true);
		var tabMarginTop = parseInt($('#mainFrameTabs').css('margin-top'));//获取间距
		var tabHeadHeight = $('ul.nav-tabs',$('#mainFrameTabs')).outerHeight(true) + tabMarginTop;
		var contentMarginTop = parseInt($('div.tab-content',$('#mainFrameTabs')).css('margin-top'));//获取内容区间距
		var contentHeight = browserHeight - topHeight - tabHeadHeight - contentMarginTop;
		$('div.tab-content',$('#mainFrameTabs')).height(contentHeight);
	};
	//菜单点击
	$('.btabs',$('#menuSideBar')).on('click', function(e) {
		e.stopPropagation();
		var li = $(this).closest('li');
		var menuId = $(li).attr('mid');
		var url = $(li).attr('funurl');
		var title = $(this).text();
		$('#mainFrameTabs').bTabsAdd(menuId,title,url);
		
		//计算Tab可用区域高度
		calcHeight();
	});
	
	//初始化
	$('#mainFrameTabs').bTabs();
});