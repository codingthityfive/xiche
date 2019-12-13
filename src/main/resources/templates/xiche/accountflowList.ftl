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
			<a id ="toAdd" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-plus-sign"></i>新增</a>
			<a id ="toEdit" class="btn btn-white btn-default btn-round btnEdit"><i class="glyphicon glyphicon-edit"></i>编辑</a>
		</div>
		<div class="panel panel-default publicPanel">
			<h4 class="publicPanelTitle">查询面板</h4>
			<form class="row form-inline">
				<div class="col-sm-3 marginTop5">
                    <div class="input-group">
                        <label class="input-group-addon">车牌号</label>
                        <input type="text" id="carNumber" class="form-control">
                    </div>
				</div>

                <div class="marginTop5">
                    <div class="col-sm-3 input-group">
                        <label class="input-group-addon">日期范围</label>
                        <input type="text" name="start" readonly id="startDate" class="Wdate form-control"  onclick="WdatePicker({skin:'whyGreen',minDate: '%y-01-01', maxDate: '%y-12-31' })" data-init="${(productFlow.startDate)!}" value="${(productFlow.startDate)!}">
                    </div>

                    <div class="col-sm-3 input-group">
                        <label class="input-group-addon center">-</label>
                        <input type="text" name="end" readonly id="endDate" class="Wdate form-control" onclick="WdatePicker({skin:'whyGreen',minDate: '%y-01-01', maxDate: '%y-12-31' })"  data-init="${(productFlow.endDate)!}"  value="${(productFlow.endDate)!}">
                    </div>
                </div>
                <div class="marginTop5">
                    <div class="col-sm-3 input-group" style="text-align: right;">
                        <div class="btn btn-primary" id="queryBtn"><i class="ace-icon fa fa-search nav-search-icon" ></i>查询</div>
<#--                        <div class="btn btn-warning" id="resetBtn"><i class="ace-icon glyphicon glyphicon-refresh" ></i>重置</div>-->
                    </div>
                </div>

            </form>
		</div>
		<div class="panel panel-default publicPanel">
			<h4 class="publicPanelTitle">查询展示面板</h4>
			<div class="dataTables_wrapper form-inline no-footer saasTableWrap">
                <table id="grid-table"></table>
                <div id="grid-pager"></div>
			</div>
		</div>
		
	</body>
    <script src="/static/js/xiche/accountflowList.js"></script>
</html>