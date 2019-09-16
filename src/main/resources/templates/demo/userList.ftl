<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>Dashboard - Ace Admin</title>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<#include "/common/top-common.ftl"/>
	</head>
	<body id="innerBody">
		<!-- 工具栏 -->
		<div id="toolbox" class="toolbox">
			<a href="toAdd" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-plus-sign"></i>新增</a>
			<a class="btn btn-white btn-default btn-round btnEdit"><i class="glyphicon glyphicon-edit"></i>编辑</a>
		</div>
		<div class="panel panel-default publicPanel">
			<h4 class="publicPanelTitle">查询面板</h4>
			<form class="row form-inline">
				<div class="col-sm-3 marginTop5">
					<div class="input-group">
						<label class="input-group-addon">用户名</label>
						<input type="text" id="name" class="form-control">
					</div>
				</div>
				
				<div class="col-sm-3 marginTop5">
					<div class="input-group">
						<button id="queryBtn" type="button" class="btn btn-primary"><i class="ace-icon fa fa-search nav-search-icon"></i>查询</button>
					</div>
				</div>

			</form>
		</div>
		<div class="panel panel-default publicPanel">
			<h4 class="publicPanelTitle">查询展示面板</h4>
			<div class="dataTables_wrapper form-inline no-footer saasTableWrap">
				<div class="dataTables_filter">
					<label class="tableFilter">
						过滤：
						<input type="search" id="filterName" class="form-control input-sm">
					</label>
					<div class="tableChoose">
                        <button class="btn btn-primary" onclick="showColumnDialog()">筛选列</button>
						<div class="ChooseCheckbox"></div>
					</div>
				</div>
                <table id="grid-table"></table>
                <div id="grid-pager"></div>
			</div>
		</div>

		
	</body>
    <script src="/static/js/demo/userList.js"></script>

</html>

