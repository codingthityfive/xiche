//右键菜单
// $('#nav-tab').on('contextmenu', 'li', function() {
// 	if($(this).find(".navTabsCloseBtn").length == 0) return;
// 	$(this).contextMenu('jqContextMenu', {
// 		//菜单样式
// 		menuStyle: {
// 		    listStyle: 'none',
// 		    padding: '0px',
// 		    margin: '0px',
// 		    backgroundColor: 'rgb(255, 255, 255)',
// 		    border: '1px solid rgb(153, 153, 153)',
// 		    width: '100px'
// 		},
// 		//菜单项样式
// 		itemStyle: {
// 			margin: '0px',
// 		    color: 'rgb(0, 0, 0)',
// 		    display: 'block',
// 		    cursor: 'default',
// 		    padding: '3px',
// 		    border: '1px solid rgb(255, 255, 255)',
// 		    backgroundColor: 'transparent'
// 		},
// 		//菜单项鼠标放在上面样式
// 		itemHoverStyle: {
// 			backgroundColor: 'rgb(182,189,210)',
// 			borderColor: 'rgb(10,36,106)'
// 		},
// 		//事件
// 		bindings: {
// 			'item_1': function(t) { // 从新加载
// 				var curHref = $(t).find('a').attr('href');
//                 curHref = curHref.replace('#', '');
//                 var _src = $("#"+curHref+" iframe").attr('src');
//                 $("#"+curHref+" iframe").attr('src', _src);
// 			},
// 			'item_2': function(t) { // 关闭标签
// 				var curHref = $(t).find('a').attr('href');
// 				curHref = curHref.replace('#','');
// 				$('#mainFrameTabs').bTabsClose(curHref);
// 			},
// 			'item_3': function(t) { //  关闭全部 标签
// 				var nav_li = $('#nav-tab>li')
// 				var a=confirm("确定关闭全部标签？");
// 				if(a){
// 					for(var i = 0; i< nav_li.length; i++){
// 						var _href = $(nav_li[i]).find('a').attr('href');
// 						_href = _href.replace('#','');
// 						$('#mainFrameTabs').bTabsClose(_href);
// 					}
// 				}
// 			},
// 			'item_4': function(t) { // 关闭 其它 标签
// 				var curHref = $(t).find('a').attr('href');
// 				curHref = curHref.replace('#',''); //  当前tab  的链接
// 				var nav_li = $('#nav-tab>li') // 获取所有的tab
// 				var a=confirm("确定关闭全部标签？");
// 				if(a){
// 					for (var i = 0 ; i<nav_li.length ; i++) {
// 						var _href = $(nav_li[i]).find('a').attr('href');
// 						_href = _href.replace('#','');
// 						if(curHref != _href){
// 							$('#mainFrameTabs').bTabsClose(_href);
// 						}
// 					}
// 				}
//
// 			},
// 			'item_5': function(t) { // 新标签打开
// 				var getHref = $(t).find('a').attr('href');
// 				getHref = getHref.replace('#bTabs_','')
// 				var  linkUrl = '';
// 				var liArr = $('.submenu>li');
// 				for (var i = 0; i<liArr.length; i++ ) {
// 					if(getHref == $(liArr[i]).attr('mid')){
// 						linkUrl = $(liArr[i]).attr('data-href');
// 					}
// 				}
// 				window.open(linkUrl, "_blank");
// 			}
// 		}
// 	})
// })

/**
         *初始页面
         */
        function getfirsttab(){
            var href_id = $('.submenu>li>.firstbtabs').parent().attr('mid');
            var href_title = $('.submenu>li>.firstbtabs').text();
            var href_url = $('.submenu>li>.firstbtabs').parent().attr('data-href');
            setTimeout(function(){
                $('#mainFrameTabs').bTabsAdd(href_id, href_title, href_url,initData);
			},0)
        }
        getfirsttab()

$(function(){
	//打开新标签
	$('.submenu>li>a').on('click',function(){
		 $('.submenu>li>.firstbtabs').removeClass("activeted")
		 $('.btabs').removeClass("activeted");
         $(this).addClass("activeted");
		var href_id = $(this).parent().attr('mid');
		var href_title = $(this).text();
		var href_url = $(this).parent().attr('data-href');
		$('#mainFrameTabs').bTabsAdd(href_id, href_title, href_url+'?bTabsId='+ href_id);
	})
})
        
 //点击页面标签事件
$('#mainFrameTabs').on('click', function(e) {
    console.log(e)
    var active_href = e.target.getAttribute('href');
    console.log(active_href)
    if(active_href) {
        var active = active_href.split('_')[1];
        var active_ele = $('#menuSideBar li[mid=' + active + ']');
        var parentOpen = active_ele.parent().parent().hasClass('open');
        if(!parentOpen) {
            active_ele.parent().prevAll('a.dropdown-toggle').trigger('click');
        }
//                active_ele.children('a').trigger('focus');
        $('.btabs').removeClass("activeted");
        $(active_ele.children('a')).addClass("activeted");
    }
});

//开关事件
var real_toggle = $('#real_toggle');
real_toggle.on('click', function() {
	var flag = real_toggle.attr('data-flag');
	if(flag == 'open') {
		real_toggle.attr('data-flag', 'close');
		$('.main-content').css('margin-left', '0');
		$('#sidebar').css('display', 'none');
		$('#real_toggle img').attr('src', "assets/images/btn_close.png");
	} else {
		real_toggle.attr('data-flag', 'open');
		$('.main-content').css('margin-left', '190px');
		$('#sidebar').css('display', 'block');
		$('#real_toggle img').attr('src', "assets/images/btn_open.png");
	}
	//$('#fake_toggle').trigger('click');
});
//退出登录
$('#exit').on('click', function() {
	if(confirm('确定注销吗?')) {
		window.location="login/out";
	}
});

//修改密码
function editPassword(){
	top.dialog({
		url: 'login/editPassword',
		title: '修改密码',
		width:400,
    	height:340,
		data: 'val值', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data == "success") {
				btn_alertDialog('提示','修改成功，请重新登录');
				setTimeout("window.location='login'",2000);
			}
			
		},
		oniframeload: function() {
		}
	})
	.showModal();
	return false;
}

//个人信息
function userInfo(){
	top.dialog({
		url: 'login/userInfo',
		title: '个人资料',
		width:400,
    	height:250,
		data: 'val值', // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data == "success") {
				btn_alertDialog('提示','修改成功');
			}
			
		},
		oniframeload: function() {
		}
	})
	.showModal();
	return false;
}