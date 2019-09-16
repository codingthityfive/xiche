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
		<div id="dictionary_tools" class="toolbox">
			<button id="goback" onclick="history.go(-1);" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-remove-circle"></i>返回</button>
			<button id="formSubmit" class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-floppy-saved"></i>提交</button>
			<button class="btn btn-white btn-default btn-round"><i class="glyphicon glyphicon-import"></i>导出Excel</button>
		</div>
		<div class="panel panel-default">
			<div class="container">
				<form class="validate" action="save" method="post">
					<div class="row">
						<div class="col-sm-3 marginTop5">
							<div class="input-group">
								<label class="input-group-addon"><span class="danger">*</span>用户名</label>
								<input type="text" name="name" class="form-control" required="required" data-msg-required='该字段为必填项'>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-3 marginTop5">
						</div>
					</div>
					<button class="hideSubmit" type="submit">提交</button> 
				</form>

			</div>
		</div>
	</body>
    <script src="/static/js/demo/userAdd.js"></script>
</html>