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
		<!-- 工具栏
		<div id="dictionary_tools" class="toolbox">
			<button id="goback" onclick="history.go(-1);" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-remove-circle"></i>返回</button>
			<button id="formSubmit" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-floppy-saved"></i>提交</button>
			<button class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-import"></i>导出Excel</button>
		</div> -->
		<div class="panel panel-default">
			<div class="container">
				<form id="saveForm" class="validate"  >
					<input id="id" name="id" value="${(accountFlow.id)!}"  type="hidden">
					<div class="form-group">
						<div class="col-sm-3 marginTop5">
							<div class="input-group">
								<label class="input-group-addon"><span class="danger">*</span>客户</label>
								<input type="text" name="customerId" class="form-control" required="required" value="${(accountFlow.customerId)!}" data-msg-required='该字段为必填项'>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-3 marginTop5">
							<div class="input-group">
								<label class="input-group-addon"><span class="danger">*</span>项目</label>
								<input type="text" name="projectId" class="form-control" required="required" value="${(accountFlow.projectId)!}" data-msg-required='该字段为必填项'>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-3 marginTop5">
							<div class="input-group">
								<label class="input-group-addon"><span class="danger">*</span>扣款类型</label>
								<input type="text" name="type" class="form-control" required="required" value="${(accountFlow.type)!}" data-msg-required='该字段为必填项'>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-3 marginTop5">
							<div class="input-group">
								<label class="input-group-addon"><span class="danger">*</span>价格</label>
								<input type="text" name="balance" class="form-control" required="required" value="${(accountFlow.balance)!}" data-msg-required='该字段为必填项'>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div id="" class="text-right " style="background:#fff;">
		    <button id="formSubmit" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-floppy-saved"></i>提交</button>
		</div>
	</body>
    <script src="/static/js/xiche/accountflowAdd.js"></script>
</html>