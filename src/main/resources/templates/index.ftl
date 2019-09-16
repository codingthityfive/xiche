<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link rel="icon" href="${request.contextPath}/static/imgs/favicon.ico" type="image/x-icon"/>
		<title>洗车</title>
		<style>
		.main-container #sidebar .submenu .btabs:focus{background: #2698FA !important;}
		</style>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<#include "/common/top-common.ftl"/>
		<link rel="stylesheet" href="${basePath}/static/assets/css/index.css" />
	</head>
	<body>
		<body style="background: #2e363f">
		<div class="body_inner_div">
			<div id="navbar" class="navbar navbar-default ace-save-state">
				<div class="navbar-container ace-save-state" id="navbar-container"> 
					<div class="navbar-header pull-left" id="logo">
						<div class="navbar-brand" style="line-height: 30px;">
							<!--<img src="/static/assets/images/gongduoduo_white@1x.png">-->
							洗车管理平台
						</div>
					</div>
					<div id="user-nav">
						<a href="#">
							欢迎您，
							<em>${sysUser.userName}</em> ~~
							<#if sysUser.company??>
								<em>${(sysUser.company.companyName)!}</em>
							</#if>
						</a>
						<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
							<li>
								<a href="javascript:void(0)" onclick="userInfo()" >
									个人信息
								</a>
							</li>
							<li>
								<a id="editPassword" href="javascript:void(0)" onclick="editPassword()">
									修改密码
								</a>
							</li>
							<li>
								<a href="javascript:void(0)" id="exit">
									退出登录
								</a>
							</li>
						</ul>
					</div>
					<div class="navbar-buttons navbar-header pull-right" role="navigation">
					</div>
				</div>
				<!-- /.navbar-container -->
			</div>
			<div class="main-container ace-save-state" id="main-container">

				<div id="sidebar" class="sidebar ace-save-state">
					<#if menuList?? && menuList?size gt 0>
						<ul id="menuSideBar" class="nav nav-list submenu">
							<#list menuList as menu>
								<li <#if menu_index == 0>class="open"</#if>>
									<a href="javascript:void(0);" class="dropdown-toggle">
										<span class="menu-text">
											${menu.menuName}
										</span>
			
										<b class="arrow fa fa-angle-down"></b>
									</a>
									<b class="arrow"></b>
									<#if menu.childList?? && menu.childList?size gt 0>
										<ul class="submenu">
											<#list menu.childList as child>
												<#if !(child.code == 'pro_add' && sysUser.company.id == 1)><!--集团公司不显示协议新建的菜单-->
													<li mid="tab${menu_index}${child_index}" id="messageCenter" data-href="${basePath}${child.url}">
														<a class="btabs" tabindex="-1" href="javascript:void(0);">
															${child.menuName}
														</a>
													</li>
												</#if>
											</#list>
										</ul>
									</#if>
								</li>
							</#list>
						</ul>
					</#if>
					<!-- /.nav-list -->
					<div class="sidebar-toggle sidebar-collapse" style="display: none" id="fake_toggle"></div>
				</div>
				<div class="main-content">
					<div class="main-content-inner">
						<div id="mainFrameTabs">
							 <!--Nav tabs-->
							<ul class="nav nav-tabs" role="tablist" id="nav-tab">
								<!-- 设置默认的首页标签页，设置noclose样式，则不会被关闭 -->
								
							</ul>
							 <!--Tab panes-->
							<div class="tab-content">
								<!-- 默认标签页（首页）的内容区域 -->
								<div class="tab-pane active" id="bTabs_navTabsMainPage">
									<div class="panel panel-default publicPanel">
										<div class="dataTables_wrapper form-inline no-footer saasTableWrap">
											<table id="grid-table"></table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="jqContextMenu" class="contextMenu">
			<ul>
				<li id="item_1" >重新加载</li>
				<li id="item_2" title=''  url=''>关闭标签</li>
				<li id="item_3">关闭全部标签</li>
				<li id="item_4">关闭其它标签</li>
				<li id="item_5">新标签页打开</li>
			</ul>
		</div>
	</body>
    <script src="${basePath}/static/js/index.js"></script>
</html>

