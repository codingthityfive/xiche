function autoValidate(form) {
	$form = $(form);
	// $form.find('input[type="submit"]').bind('click', function() {
	// 	var textareaObj = $('textarea');
	// 	var tempVal = '';
	// 	if (textareaObj) {
	// 		textareaObj.each(function(i) {
	// 			tempVal = $(this).val();
	// 			$(this).val(tempVal.replace(/(<script.*?>|<\/script>)/ig, '').replace(/(&lt;script.*?&gt;|&lt;\/script&gt;)/ig, ''))
	// 		})
	// 	}
	// })
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
		}
	});

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
    console.log($(choosetable).parent('.ui-jqgrid-view'))
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
/**
新增数据异步提交
*/

function ajaxSubmit(option, data) {
		var url = option.url;
		var data_arr = option.formdata;
		var method = option.method;
		console.log(data);

	//遍历data
	var data_str_arr = [],
		data_obj = {};
	//console.log(data_arr,'23456789............');

	for (var i = 0; i < data_arr.length; i++) {
		var _obj = data_arr[i];
		if (data_obj[_obj.name]) {
			var val = null;
			if (data_obj[_obj.name].push) {
				val = data_obj[_obj.name]
			} else {
				val = [data_obj[_obj.name]]
			}
			data_obj[_obj.name] = val.concat([_obj.value.trim()]);
		} else {
			data_obj[_obj.name] = _obj.value.trim();
		}
	}
	var loading = dialog({
		title: '加载中',
		fixed: true,
		width: 200,
		quickClose: false,
		cancel: false
	}).showModal();
	$('.ui-dialog-title').css('textAlign', 'center');
	//var dataFormat = $(obj).data('format') || 'json';
	$.ajax({
		url: url,
		data: {
			formData:$.param(data_obj, true),
			tableData:data
		},
		type: method,
		dataType: 'json',
		success: function(data) {
			//console.log(loading);
			loading.close();
		}
	})
}

// 表单异步提交

function formAjaxSubmit(obj, data, method) {

	if (obj.length && obj.length == 1 && obj[0].tagName == "FORM") {
		url = obj.attr('action');
		data_arr = obj.serializeArray();
		method = obj.attr('method');
	} else {
		url = obj;
	}

	//遍历data
	var data_str_arr = [],
		data_obj = {};

	for (var i = 0; i < data_arr.length; i++) {
		var _obj = data_arr[i];
		if (data_obj[_obj.name]) {
			var val = null;
			if (data_obj[_obj.name].push) {
				val = data_obj[_obj.name]
			} else {
				val = [data_obj[_obj.name]]
			}
			data_obj[_obj.name] = val.concat([_obj.value]);
		} else {
			data_obj[_obj.name] = _obj.value;
		}
	}
	var loading = dialog({
		fixed: true
	});
	loading.showModal();

	$.ajax({
		url: url,
		data: $.param(data_obj, true),
		type: method,
		dataType: 'json',
		success: function(data) {
			loading.close();
			if (data.flag === true) {
				var win;
				if (window.location == top.window.location) {
					win = window;
				} else {
					win = top.window;
				}
				if (!data.url) {
					data.url = win.location;
				}
				win.location = data.url;
			} else {
				var msg = data.msg || data.errorData,
					str = '';
				if (typeof(msg) == 'object') {
					for (var v in msg) {
						var title = $('input[name="' + v + '"]').parents('.form-group').find('label:first-child').text();
						str += title;
						str += msg[v] + '<br>';
					}
				} else {
					str = msg;
				}
				dialog({
					title: '消息',
					fixed: true,
					quickClose: true,
					content: dialog_change(data.flag, str)
				}).showModal();
			}
		}
	})
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
	    $('.jqgrow.ui-row-ltr').hide()
	      .filter(":contains('" +($(this).val()) + "')").show();
	}).keyup();
}
function showColumnDialog(element) { 
	element.click(function(){
		$("#grid-table").jqGrid('setColumns', { modal: true, saveicon: false, closeicon: false, left: "220", top: "-5", colnameview: false}); 
	})
}

function editData(btn){
	btn.click(function(){
		var hrefAttr=$(this).attr("href");
		if(hrefAttr.indexOf("javascript")> -1){
			alert("请选择需要编辑的记录");
		}
	})
}
function deleteData(btn){
	btn.click(function(){
		var dataType=$(this).attr("dataType");
		if(dataType == ''){
			alert("请选择需要删除的记录");
		}
	})
}

function updatePagerIcons(table) {
	var replacement = {
	'ui-icon-seek-first' : 'ui-icon ace-icon fa fa-angle-double-left bigger-140',
	'ui-icon-seek-prev' : ' ui-icon ace-icon fa fa-angle-left bigger-140',
	'ui-icon-seek-next' : 'ui-icon ace-icon fa fa-angle-right bigger-140',
	'ui-icon-seek-end' : 'ui-icon ace-icon fa fa-angle-double-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
	var icon = $(this);
	var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
	if ($class in replacement)
	icon.attr('class', 'ui-icon ' + replacement[$class]);
	});
}
$(function(){

	var form=$("form.validate"),
		form1=$("form.commonValidate"),
		tablechecked=$(".tableChecked"),
		choosetable=$(".choosetable"),
		filtInput=$("#filterName"),
		filtrkolumn=$("#filtrkolumn"),
		editBtn=$(".btnEdit"),
		deleteBtn=$(".btnDelete"),
		linkDialog = $('.dialog');
	if (form.length) {
		form.each(function() {
			autoValidate(this);
		})
	}
	if (form1.length) {
		form1.each(function() {
			commonValidate(this);
		})
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
	if (filtrkolumn.length) {
		showColumnDialog(filtrkolumn);
	};
	if (editBtn) {
		editData(editBtn);
	};
	if (deleteBtn) {
		deleteData(deleteBtn);
	};

	$("#goback").click(function(){
		window.history.go(-1);
	})

	//多标签tab
	//计算内容区域高度
	// var calcHeight = function(){
	// 	var browserHeight = $(window).innerHeight();
	// 	var topHeight = $('#mainFrameHeadBar').outerHeight(true);
	// 	var tabMarginTop = parseInt($('#mainFrameTabs').css('margin-top'));//获取间距
	// 	var tabHeadHeight = $('ul.nav-tabs',$('#mainFrameTabs')).outerHeight(true) + tabMarginTop;
	// 	var contentMarginTop = parseInt($('div.tab-content',$('#mainFrameTabs')).css('margin-top'));//获取内容区间距
	// 	var contentHeight = browserHeight - topHeight - tabHeadHeight - contentMarginTop;
	// 	$('div.tab-content',$('#mainFrameTabs')).height(contentHeight);
	// };
	//菜单点击
	$('.btabs',$('#menuSideBar')).on('click', function(e) {
		e.stopPropagation();
		var li = $(this).closest('li');
		var menuId = $(li).attr('mid');
		var url = $(li).attr('funurl');
		var title = $(this).text();
		$('#mainFrameTabs').bTabsAdd(menuId,title,url);
		
		//计算Tab可用区域高度
		//calcHeight();
	});
	
	//初始化
	$('#mainFrameTabs').bTabs();
});

// 日期格式化
function formatDateym(datevalue, flag) {
	var date = new Date(datevalue),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds();
	var str = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ?
		'0' + day : day);
	if (flag) {
		str += ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' +
			minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
	}
	return str;
}
function current() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '-'; //获取当前年份 
	str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
	str += d.getDate() + '-';
	str += d.getHours() + ':';
	str += d.getMinutes() + ':';
	str += d.getSeconds();
	return str;
}
setInterval(function() {
	$("#pos_date").html(current)
}, 1000);

//alertDialog
function btn_alertDialog(theme,msg){
	var d = dialog({
		title: theme, // 警告
		width:300,
		height:80,
		zIndex: 9999,
		quickClose: true, // 点击空白处关闭弹窗
		content: msg // 提示信息
	});
	d.show();
	setTimeout(function () {
		d.close().remove();
	}, 3000);
}
//confirm 提示
function confirmDialog(theme,msg,okevent,ele){
	var d = dialog({
		title: theme,
		content: msg,
		width:300,
		height:30,
		okValue: '确定',
		ok: function () {
			okevent(ele);
			d.close().remove();
			return false;
		},
		cancelValue: '取消',
		cancel: function () {}
	});
	d.show();
}

//阻止输入框中 回车默认提交表单
$(function () { 
	$("body").on('keydown', function (event) { 
		var e = event || window.event;
		var tagName = $(e.target)[0].tagName;
		if (tagName.toUpperCase() == 'INPUT' && e.keyCode=='13'){
			//暂时注释,觉得分页组件,输入目标页码后不能跳转的bug
//			e.preventDefault();
		}
	 });
 });

function callAjax(url,object) {
    var result;
    $.ajax({
        url: url,
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: JSON.stringify(object),
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        contentType: "application/json",
        beforeSend: function (xhr) {
            //console.log(xhr)
            //console.log('发送前');
        },
        success: function (data, xtStatus, jqXHR) {
            result = data;
        },
        error: function (xhr, textStatus) {
        },
        complete: function () {
            //console.log('结束')
        }
    });
    return result;
}
function reload(){
    $("#grid-table").jqGrid('setGridParam', {
        postData: {

        },page:1
    }).trigger('reloadGrid');
}