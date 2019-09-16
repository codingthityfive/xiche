<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<link rel="icon" href="/static/imgs/favicon.ico" type="image/x-icon"/>
		<title>洗车管理</title>
		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<#include "/common/top-common.ftl"/>
		<link rel="stylesheet" href="/static/assets/css/login/login.css" />
		<script> 
			if (window != top) 
			top.location.href = location.href; 
		</script>
	</head>
	<body>
    	<div class="title">雪鹰哥洗车管理</div>
		<div class="">
		    <div class="loginBox login-box">
		        <div class="box-con tran">
		            <form name="loginForm" id="loginForm" class="validate">
						<input name="accountNumber" id="accountNumber" type="text" placeholder="手机号" maxlength="11" autocomplete="off" required data-msg-required="">
						<input name="password" type="password" placeholder="密码" id="password" autocomplete="off" required data-msg-required="">
		                <#--<div class="form-group" style="display:none;">-->
		                    <#--<select id="companyId" name="companyId" style="border:none;background:#f2f2f2 !important;padding-top:8px;">-->
		                    	<#--<option value="">请选择分公司</option>-->
		                    <#--</select>-->
		                <#--</div>-->
		                <div class="form-group" style="background: none;height:5px;line-height:5px;">
		                <span id="resultMsg" style='color:red; margin-left: 102px;'></span>
		                </div>
						<button type="button" class="tran pr disabled" id="btn_submit">
							<span class="tran">登录</span>
						</button>
		            </form>
		        </div>
		    </div>
		</div>
        <h2></h2>
	</body>
    <script src="/static/js/login/login.js"></script>
</html>
