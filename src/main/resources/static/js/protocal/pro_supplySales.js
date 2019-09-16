/**
 * 供销协议条款js
 * @author baishaojun
 * @returns
 */
var modal = "#firstSaleModal";
//指定商业公司
var com_table = "#com-table";
var com_selector="#com-pager";
//其他变量
var currForm = "";//全局变量,操作的当前form
var currDicId = $("#currDicId").val();
var currDicName = $("#currDicName").val();

/**
 * 非全品商品表单新增
 * sort_index,id_index占位符
 * @returns
 */
var notAll = '<div class="nonWholeForm top" id="form_index">'+
	'<div class="row">'+
'<div class="col-sm-12 marginTop5">'+
	'<label>'+
		'<h4>'+
			'商品表单<span class="sort">sort_index</span>'+
		'</h4>'+
	'</label>'+
	'<a href="javascript:void(0);" class="addForm"><label style="font-weight: bolder;font-size:30px;cursor:pointer;">+</label></a>'+
	'&nbsp;'+
	'<a href="javascript:void(0);" class="delForm"><label style="font-weight: bolder;font-size:30px;cursor:pointer;">-</label></a>'+
	'<input type="button" value="新增行" class="addGoods"/>'+
	'<input type="button" value="删除行" class="delGoods"/>'+
'</div>'+
'</div>'+
'<div class="row">'+
'<div class="col-sm-12 marginTop5">'+
  '<table class="resTable table table-bordered">'+
        '<thead>'+
            '<tr>'+
                '<th><input type="checkbox" class="topChoose"/></th>'+
                '<th>商品ID</th>'+
                '<th>商品编号</th>'+
                '<th>商品名称</th>'+
                '<th>规格</th>'+
                '<th>生产厂家</th>'+
                '<th>供货含税单价</th>'+
                '<th>'+
                	'出库价维价'+
                	'<input type="checkbox" class="topOutKeep"/>'+
                '</th>'+
                '<th>出库价含税单价</th>'+
                '<th>'+
                	'零售价维价'+
                	'<input type="checkbox" class="topSaleKeep"/>'+
                '</th>'+
                '<th>零售价含税单价</th>'+
                '<th>'+
                	'是否独家'+
                	'<input type="checkbox" class="topAlone"/>'+
                '</th>'+
            '</tr>'+
        '</thead>'+
        '<tbody>'+
        '</tbody>'+
    '</table>'+
'</div>'+
'</div>'+
'<div class="row">'+
'<div class="col-sm-1 marginTop5">'+
    '<label><h4>控销设置</h4></label>'+
'</div>'+
'</div>'+
'<div class="row">'+
'<div class="col-sm-1 marginTop5">'+
 '<label>控销类型</label>'+
'</div>'+
'<div class="col-sm-2 marginTop5">'+
    '<input type="checkbox" class="ctrlDicSwitch"/>区域'+
    '&nbsp;'+
    '<input type="checkbox" class="ctrlCusSwitch"/>客户类型'+
'</div>'+
'<div class="col-sm-1 marginTop5">'+
    '<label>黑白名单</label>'+
'</div>'+
'<div class="col-sm-1 marginTop5">'+
    '<input type="radio" class="nl" name="nameList" value="0" checked/>无'+
    '<input type="radio" class="nl" name="nameList" value="1"/>黑名单'+
    '<input type="radio" class="nl" name="nameList" value="2"/>白名单'+
'</div>'+
'</div>'+
'<div class="dicSet" style="display:none;">'+	
'<div class="row">'+
    '<div class="col-sm-5 marginTop5">'+
        '<label>控销设置表单-区域设置(* "+"代表新增行,"-"代表删除行)</label>'+
    '</div>'+
'</div>'+
'<div class="row">'+
    '<div class="col-sm-12 marginTop5">'+
        '<table class="table table-bordered dictable">'+
            '<thead>'+
                '<tr>'+
                    '<th>序号</th>'+
                    '<th colspan="5">控销设置'+
                    '<a href="javascript:void(0);" class="delDic"><label style="font-weight: bolder;font-size:20px;cursor:pointer;">-</label></a>&nbsp;&nbsp;'+
                    '<a href="javascript:void(0);" class="addDic"><label style="font-weight: bolder;font-size:20px;cursor:pointer;">+</label></a></th>'+
                '</tr>'+
            '</thead>'+
            '<tbody>'+
            '</tbody>'+
        '</table>'+
    '</div>'+
'</div>'+
'</div>'+
'<div class="customSet" style="display:none;">'+
'<div class="col-sm-2 marginTop5">'+
    '<label>'+
        '控销设置表单-客户类型设置'+
    '</label>'+
'</div>'+
'<div class="row">'+
    '<div class="col-sm-12 marginTop5">'+
        '<table class="table table-bordered custable">'+
            '<thead>'+
            '<tr>'+
                '<th>编号</th>'+
                '<th>客户类型</th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '</tbody>'+
        '</table>'+
    '</div>'+
'</div>'+
'</div>'+
'</div>';


/**
 * 核心功能
 * @returns
 */
$(function(){
	/**
	 * 校验商品编码
	 */
	$("#examBtn").click(function(){
		var goodsCode = $("#goodsCode").val();
		var exsitCodes = "";
		var noExsitCodes = "";
		var code = 0;
		var msg = "";
		if(goodsCode.trim().length>0){
			$.ajax({
				url:basePath+"/currency/examateBatchCode",
				type:"POST",
				data:{"goodsCode":goodsCode},
				dataType:"json",
				async:false,
				success:function(data){
					code = data.code;
					msg = data.msg;
					exsitCodes = data.result.exsitCodes;
					noExsitCodes = data.result.noExsitCodes;
				}
			});
			
			if(code == 0){
				//逻辑判断
				if(noExsitCodes.length>0){
					btn_alertDialog("提示","不存在的商品编码："+noExsitCodes);
					if(exsitCodes.length>0){
						//只查找有数据的code
//						$("#goodsCode").val(exsitCodes);
						//点击查询
//						btn_alertDialog("提示","查询");
					}
				}
			}else{
				btn_alertDialog("提示",""+msg);
			}
		}else{
			btn_alertDialog("提示","请输入商品编码才可以检测！");
		}
	});
	
	/**
	 * 全系列品种开关
	 */
	$("#whole").click(function(){

		var val = $(this).prop("checked");

		//返利条款中的 返利规则设置方式
		var setType = $("#setType").val();
		//如果返利规则有表单设置，则要清空表单设置
		if (setType) {
			if(confirm('此处修改会清空协议返利条款的表单设置，确定修改？')){
				$("#setType").val("");
				$("#rebateDiv").html("");
			}else{
				if (val) {
					$("#whole").removeAttr("checked");
				} else {
					$("#whole").prop("checked","checked");
				}
				return;
			}
		}

		//供销表单类型切换
		if(val){
			//获取甲方类型
			var fp = $("#ssfp").text();
			if(fp==''){
				var fpv = $("#firstPartyName").val();
				$("#ssfp").text(fpv);
			}
			//获取商品数量
			var fg = $("#ssgn").text();
			if(fg==''){
				var count = qryGoodsCount();
				$("#ssgn").text(count);
			}
			$("#wholeForm").show();//全品显示
			$("#nonWholeParent").hide();//非全品隐藏
		}else{
			$("#wholeForm").hide();//全品隐藏
			$("#nonWholeParent").show();//非全品显示
		}
	});
	
	/**
	 * 控销区域弹出和隐藏
	 */
	$("#nonWholeParent").on("click",".ctrlDicSwitch",function(){
		var val = $(this).prop("checked");
		var dicSet = $(this).parents(".top").find(".dicSet");
		if(val){
			dicSet.show();
		}else{
			dicSet.hide();
		}
	});


	/**
	 * 控销客户类型弹出和隐藏
	 */
	$("#nonWholeParent").on("click",".ctrlCusSwitch",function(){
		var val = $(this).prop("checked");
		var cusSet = $(this).parents(".top").find(".customSet");
		if(val){
			//显示
			var len = cusSet.find(".custypes tbody tr").length;
			if(len == 0){
				var cus = getCustomTypes();
				//先清空
				cusSet.find(".custable tbody").html("");
				cusSet.find(".custable tbody").append(cus);
			}
			cusSet.show();
		}else{
			cusSet.hide();
		}
	});
	
	/**
	 * 添加商品弹框加搜索
	 * 获取商品 弹出首营商品
	 * 重构代码
	 */
	$("#nonWholeParent").on("click",".addGoods",function(){
	    var goodsNum = $(".supplyGoodsTr").length;
        var firstPartyType = $("#firstPartyType").val();
        if(firstPartyType == 4){
            if(goodsNum>50){
                btn_alertDialog("提示","代理商供销协议商品数小于等于50个!");
                return false;
            }
        }
		//确定当前操作的id
		var currId = $(this).parents(".top").attr("id");
		currForm = currId;
		
		//判断当前的甲方类型,觉得首营商品的搜索条件是否有生产厂家
		var fpt = $("#firstPartyType :selected").val();
		if(fpt==3){
			$("#producerDiv").show();
		}else{
			$("#producerDiv").hide();
		}
		//此处有bug,换了甲方之后没有重新查询商品
		queryGoods();
		$(modal).modal("show");
	});
	
	/**
	 * 确定选择首营商品
	 */
	$("#ensure").click(function(){
		if(currForm==''){
			btn_alertDialog("提示","请确定要操作的表单!")
			return;
		}
		var ids = $("#supp-grid-table").jqGrid("getGridParam", "selarrrow");
		if(ids.length==0){
			btn_alertDialog("提示","请至少选择一个商品!")
			return;
		}
        var goodsNum = $(".supplyGoodsTr").length;
        var firstPartyType = $("#firstPartyType").val();
        if(firstPartyType == 4){
            var g = goodsNum + ids.length;
            if( g>50){
                btn_alertDialog("提示","代理商供销协议商品数小于等于50个!");
                return false;
            }
        }
        $(ids).each(function (index, id){
            var row = $("#supp-grid-table").jqGrid('getRowData', id);
            var goodsCode = row.goodsCode;
            
            var goodsFlag = 0;
            //创建商品
            if(goodsCode.length>0){
            	goodsFlag = 1;
            }else{
            	goodsFlag = 2;
            }
            createGoods(row,goodsFlag);
        });
        $(modal).modal("hide");
	});
	
	/**
	 * 删除商品
	 */
	$("#nonWholeParent").on("click",".delGoods",function(){
		var gt = $(this).parents(".top").find(".resTable");
		var lenth = gt.find("tbody tr").length;
		if(lenth==0){
			btn_alertDialog("提示","请选择删除的商品!");
			return;
		}else{
			//没有选择也提醒
			var chLen = 0;
			gt.find("tbody tr").each(function(){
				var check = $(this).children().find(".choose").prop("checked");
				if(check){
					chLen++;
				}
			});
			
			if(chLen==0){
				btn_alertDialog("提示","请选择删除的商品!");
				return;
			}
		}
		
		//判断返利条款中是否有分类表单商品设置
		if($("tr[id^='rebateP_']").length > 0 && !confirm('删除商品会同时删除协议返利条款中存在的对应商品，确定删除？')){
			return;
		}
		
		gt.find("tbody tr").each(function(){
			var check = $(this).children().find(".choose").prop("checked");
			if(check){
				var goodsId = $(this).find(".goodsId").val();
				$(this).remove();
				//如果在返利协议的表单也设置了该商品，则要将该商品从返利协议的商品表单中删除
				if ($("#rebateP_"+goodsId)) {
					$("#rebateP_"+goodsId).remove();
				}
				
			}
		});
		
		//商品序号重排序
		gt.find("tbody tr").each(function(i){
			$(this).find(".sortCode").text(i+1);
		});
		
		//如果当前表单都删除完了,则就将表头的几个复选框都置为不选
		lenth = gt.find("tbody tr").length;
		if(lenth == 0){
			gt.find(".topChoose").prop("checked",false);
			gt.find(".topOutKeep").prop("checked",false);
			gt.find(".topSaleKeep").prop("checked",false);
			gt.find(".topAlone").prop("checked",false);
		}
	});
	
	/**
	 * 全部选中(取消选中)
	 */
	$("#nonWholeParent").on("click",".topChoose",function(){
		var val = $(this).prop("checked");
		$(this).parents(".resTable").find("tbody tr").each(function(){
			$(this).find(".choose").prop("checked",val);
		});
	});
	
	/**
	 * 增加非商品表单
	 */
	$("#nonWholeParent").on("click",".addForm",function(){
		var length = $("#nonWholeParent").children().length;
		//替代参数锚点
		var index = ++length;
		var code = notAll;
		code = code.replace(/sort_index/ig,index);
		code = code.replace(/nameList/ig,'nameList'+index);
		code = code.replace(/form_index/ig,"form"+index);
		$("#nonWholeParent").children().last().after(code);
	});
	
	/**
	 * 删除非商品表单
	 */
	$("#nonWholeParent").on("click",".delForm",function(){
		var length = $("#nonWholeParent").children().length;
		if(length==1){
			 btn_alertDialog("提示","仅剩一个商品表单不能删除!");
		}else{
			$(this).parents(".top").remove();
			//对剩余的商品重排序
			$("#nonWholeParent").children().each(function(i){
				resort($(this),i+1)
			});
		}
	});
	
	/**
	 * 出库价维价全选/全不选
	 */
	$("#nonWholeParent").on("click",".topOutKeep",function(){
		var val = $(this).prop("checked");
		$(this).parents(".resTable").find("tbody tr").each(function(){
			$(this).find(".outKeep").prop("checked",val);
		});
	});
	
	
	/**
	 * 零售价维价全选/全不选
	 */
	$("#nonWholeParent").on("click",".topSaleKeep",function(){
		var val = $(this).prop("checked");
		$(this).parents(".resTable").find("tbody tr").each(function(){
			$(this).find(".saleKeep").prop("checked",val);
		});
	});
	
	/**
	 * 是否独家全选/全不选
	 */
	$("#nonWholeParent").on("click",".topAlone",function(){
		var val = $(this).prop("checked");
		$(this).parents(".resTable").find("tbody tr").each(function(){
			$(this).find(".alone").prop("checked",val);
		});
	});
	
	/**
	 * 添加新的控销区域条目
	 */
	$("#nonWholeParent").on("click",".addDic",function(){
		var dicId = currDicId;
		var dicName = currDicName;
		var citys = getNextDic(dicId);
		var len = $(this).parents(".top").find(".dictable tbody tr").length;
		var dicHtml = '<tr class="dicLine">'+
				'<td><span class="sortCode">'+(len+1)+'</span></td>'+
				'<td>控销范围</td>'+
				'<td>'+
					'<select class="province">'+
						'<option value="'+dicId+'">'+dicName+'</option>'+
					'</select>'+
				'</td>'+
				'<td>'+
					'<select class="city">'+
						citys + 
					'</select>'+
				'</td>'+
				'<td>'+
					'<select class="area">'+
						'<option value="0">区</option>'+
					'</select>'+
				'</td>'+
				'<td><input type="checkbox" class="scope"/></td>'+
				'</tr>';
		var body = $(this).parents(".top").find(".dictable tbody");
		body.append(dicHtml);
	});
	
	/**
	 * 根据市,显示区
	 */
	$("#nonWholeParent").on("change",".city",function(){
		var val = $(this).val();
		var areas = getNextDic(val);
		$(this).parents(".dicLine").find(".area").html(areas);
	});
	
	/**
	 * 选择区
	 */
	$("#nonWholeParent").on("change",".area",function(){
		var sortCode = $(this).parents(".dicLine").find(".sortCode").text();
		var val = $(this).val();
		var dics = $(this).parents(".dictable").find("tbody tr").length;
		if(dics>1){
			$(this).parents(".dictable").find("tbody tr").each(function(){
				var currSortCode = $(this).find(".sortCode").text();
				if(sortCode != currSortCode){
					var dic = $(this).find(".area").val();
					if(val==dic){
						btn_alertDialog("提示","您选择的区域重复!");
						return;
					}
				}
			});
		}
	});
	
	/**
	 * 删除控销区域条目
	 */
	$("#nonWholeParent").on("click",".delDic",function(){
		var len = $(this).parents(".top").find(".dictable tbody tr").length;
		if(len==0){
			 btn_alertDialog("提示","请选择要删除的区域!");
			return;
		}
		
		$(this).parents(".top").find(".dictable tbody tr").each(function(){
			var res = $(this).find(".scope").prop("checked");
			if(res){
				$(this).remove();
			}
		});
		
		//重排序
		len = $(this).parents(".top").find(".dictable tbody tr").length;
		if(len>0){
			$(this).parents(".top").find(".dictable tbody tr").each(function(i){
				$(this).find(".sortCode").text(i+1);
			});
		}
	});
	
	/****全品种的js*****/
	
	/**
	 * 添加地区
	 */
	$("#wholeDicSwitch").click(function(){
		var val = $(this).prop("checked");
		var dicSet = $(this).parents(".top").find(".dicSet");
		if(val){
			dicSet.show();
		}else{
			dicSet.hide();
		}
	});
	
	/**
	 * 添加客户类型
	 */
	$("#wholeCusSwitch").click(function(){
		var val = $(this).prop("checked");
		var dicSet = $(this).parents(".top").find(".customSet");
		if(val){
			//显示
			var len = $("#custable").find("tbody tr").length;
			if(len == 0){
				var cus = getCustomTypes();
				//先清空
				$("#custable").find("tbody").html("");
				$("#custable").find("tbody").append(cus);
			}
			dicSet.show();
		}else{
			dicSet.hide();
		}
	});
	
	/**
	 * 删除地区
	 */
	$("#delDic").click(function(){
		$("#dicList").find("tbody tr").each(function(){
			var res = $(this).find(".scope").prop("checked");
			if(res){
				$(this).remove();
			}
		});
		
		//重排序
		var len = $("#dicList").find("tbody tr").length;
		if(len>0){
			$("#dicList").find("tbody tr").each(function(i){
				$(this).find(".sortCode").text(i+1);
			});
		}
	});
	
	/**
	 * 增加地区
	 */
	$("#addDic").click(function(){
		var dicId = currDicId;
		var dicName = currDicName;
		var citys = getNextDic(dicId);
		var len = $("#dicList").find("tbody tr").length;
		var dicHtml = '<tr class="dicLine">'+
				'<td><span class="sortCode">'+(len+1)+'</span></td>'+
				'<td>控销范围</td>'+
				'<td>'+
					'<select class="province">'+
						'<option value="'+dicId+'">'+dicName+'</option>'+
					'</select>'+
				'</td>'+
				'<td>'+
					'<select class="city">'+
						citys + 
					'</select>'+
				'</td>'+
				'<td>'+
					'<select class="area">'+
						'<option value="0">区</option>'+
					'</select>'+
				'</td>'+
				'<td><input type="checkbox" class="scope"/></td>'+
				'</tr>';
		var body = $("#dicList").find("tbody");
		body.append(dicHtml);
	});
	
	/**
	 * 根据市,选择区
	 */
	$("#dicList").on("change",".city",function(){
		var val = $(this).val();
		var areas = getNextDic(val);
		$(this).parents(".dicLine").find(".area").html(areas);
	});
	
	/**
	 * 选择区的时候去重,弹告
	 */
	$("#dicList").on("change",".area",function(){
		var sortCode = $(this).parents(".dicLine").find(".sortCode").text();
		var val = $(this).val();
		var dics = $("#dicList").find("tbody tr").length;
		if(dics>1){
			$("#dicList").find("tbody tr").each(function(){
				var currSortCode = $(this).find(".sortCode").text();
				if(sortCode != currSortCode){
					var dic = $(this).find(".area").val();
					if(val==dic){
						btn_alertDialog("提示","您选择的区域重复!");
						return;
					}
				}
			});
		}
	});
	/****全品种的JS*************/
	
	/**
	 * 最新指定商业公司按钮
	 */
	$("#pointComNew").click(function(){
		var channel =  $("input[name='purChannel']:checked").val();
		if(channel!=3){
			btn_alertDialog("提示","选择商业公司购进才可以选择!");
			return;
		}
		$("#pointComModal").modal("show");
		queryComs();
	});
	
	//最新指定商业公司
	$("#comEnsure").click(function(){
		var ids = $("#com-table").jqGrid("getGridParam", "selarrrow");
		if(ids.length==0){
			btn_alertDialog("提示","请至少选择1行数据!");
			return;
		}
		var comTable = $("#selectedComs").find(".table");
		var comsLen = comTable.find("tbody tr").length;
		if(comsLen>6){
			btn_alertDialog("提示","最多能选择6条商业公司!");
			return;
		}
		
		//如果目前是3条,然后用户选择了6条,将使用前三条,而舍弃后三条
		var num = 6 - comsLen==0?6:6 -comsLen;
		$(ids).each(function (index, id){
			if(index<num){
				var row = $("#com-table").jqGrid('getRowData', id);
				createComs(comTable,row);
			}
		});
        $("#pointComModal").modal("hide");
	});
	
	
	/**
	 * 首营商品查询
	 */
	$("#queryBtn").click(function(){
		
		var goodsCode = $("#goodsCode").val();
		var exsitCodes = "";
		var noExsitCodes = "";
		var code = 0;
		var msg = "";
		if(goodsCode.trim().length>0){
			$.ajax({
				url:basePath+"/currency/examateBatchCode",
				type:"POST",
				data:{"goodsCode":goodsCode},
				dataType:"json",
				async:false,
				success:function(data){
					code = data.code;
					msg = data.msg;
					exsitCodes = data.result.exsitCodes;
					noExsitCodes = data.result.noExsitCodes;
				}
			});
			
			if(code == 0){
				//逻辑判断
				if(noExsitCodes.length > 0){
					btn_alertDialog("提示","不存在的商品编码："+noExsitCodes);
					if(exsitCodes.length>0){
						//只查找有数据的code
						$("#goodsCode").val(exsitCodes);
					    //点击查询
						researchFirstSale();
					}
				}else{
					if(exsitCodes.length>0){
						//只查找有数据的code
						$("#goodsCode").val(exsitCodes);
					    //点击查询
						researchFirstSale();
					}
				}
			}else{
				btn_alertDialog("提示",""+msg);
			}
		}else{
			//点击查询
			researchFirstSale();
		}
	});
	
	/**
	 * 指定供应商
	 */
	$("#queryComBtn").click(function(){
		var supplyName = $("#gys").val();
		$(com_table).jqGrid('setGridParam', {
            postData: {
            	"supplyName":supplyName
            },page:1
        }).trigger('reloadGrid');
	});
	
	/**
	 * 清楚选择的指定商业公司
	 */
	$("#clearPointComs").click(function(){
		clearPointComs();
	});
	
	/**
	 * 供货含税单价
	 */
	$("#nonWholeParent").on("focusout",".suppTaxPrice",function(){
		var val = $(this).val();
		if(val.length==0){
			$(this).val("0.00");
			return;
		}
		
		//不是数字类型
		if(isNaN(val)){
			btn_alertDialog("提示","供货含税单价不是数字类型!\n");
			$(this).val("0.00");
		}else{
			//检测整数长度
			var index = val.indexOf(".");
			if(index>-1){
				var front = val.substring(0,index);
				if(front.length>10){
					btn_alertDialog("提示","供货含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}else{
				if(val.length>10){
					btn_alertDialog("提示","供货含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}

			var num = changeTwoDecimal_f(val);
			$(this).val(num);
		}
	});
	
	/**
	 * 出库价含税单价
	 */
	$("#nonWholeParent").on("focusout",".outPrice",function(){
		var outKeep = $(this).parents(".resTable").find(".outKeep").prop("checked");
		var val = $(this).val();
		if(val.length==0){
			$(this).val("0.00");
			return;
		}
		
		//不是数字类型
		if(isNaN(val)){
			btn_alertDialog("提示","出库价含税单价不是数字类型!\n");
			$(this).val("0.00");
		}else{
			//检测整数长度
			var index = val.indexOf(".");
			if(index>-1){
				var front = val.substring(0,index);
				if(front.length>10){
					btn_alertDialog("提示","出库价含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}else{
				if(val.length>10){
					btn_alertDialog("提示","出库价含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}
			
			var num = changeTwoDecimal_f(val);
			$(this).val(num);
		}
		
		if(outKeep){
			val = $(this).val();
			if(parseFloat(val)<=0){
				btn_alertDialog("提示","出库价含税单价必须大于0!\n");
			}
		}
	});
	
	/**
	 * 零售价含税单价
	 */
	$("#nonWholeParent").on("focusout",".salePrice",function(){
		var saleKeep = $(this).parents(".resTable").find(".saleKeep").prop("checked");
		var val = $(this).val();
		if(val.length==0){
			$(this).val("0.00");
			return;
		}
		
		//不是数字类型
		if(isNaN(val)){
			btn_alertDialog("提示","零售价含税单价不是数字类型!\n");
			$(this).val("0.00");
		}else{
			var index = val.indexOf(".");
			if(index>-1){
				var front = val.substring(0,index);
				if(front.length>10){
					btn_alertDialog("提示","零售价含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}else{
				if(val.length>10){
					btn_alertDialog("提示","零售价含税单价长度超长!\n");
					$(this).val("0.00");
					return;
				}
			}
			
			var num = changeTwoDecimal_f(val);
			$(this).val(num);
		}
		
		if(saleKeep){
			val = $(this).val();
			if(parseFloat(val)<=0){
				btn_alertDialog("提示","零售价含税单价必须大于0!\n");
			}
		}
	});
	
	/**
	 * 购进渠道点击事件
	 */
	$(".pch").click(function(){
		var val = $(this).val();
		if(val!=3){
			clearPointComs();
			$("#selectedComs").hide();
			$("#selectedComs").find(".table tbody").empty();
		}else{
			$("#selectedComs").show();
		}
	});
	
	/**
	 * 删除指定商业公司
	 */
	$("#selectedComs").on("click",".delCom",function(){
		$(this).parents("tr").remove();
		comsResort();
	});
	
	
	
//	$("#testBtn").click(function(){
//		var goodsCode = $("#goodsCode").val();
//		checkBatchCode(goodsCode,"supp-grid-table");
//	});
});

/**
 * 重排序
 * @returns
 */
function comsResort(){
	var trs = $("#selectedComs").find(".table tbody tr");
	trs.each(function(index){
		var sort = $(this).find(".comsSort");
		sort.text(index+1);
	});
}

/**
 * 创建指定商业公司
 * @param row
 * @returns
 */
function createComs(comTable,row){
	//去重
	var res = checkComRepeat(row);
	if(!res){
		var comsLen = comTable.find("tbody tr").length;
		var tbody = comTable.find("tbody");
		var tr = '<tr>'+
							'<td class="comsSort">'+(comsLen+1)+'</td>'+
							'<td class="comName">'+row.supplyName+'</td>'+
							'<td><input class="comId" value="'+row.supplyCode+'" type="hidden"/>'+
							'<input type="button" class="btn btn-primary delCom" value="清除"/></td>'+
						'</tr>';
		tbody.append(tr);
	}
}
	
/**
 * 检查商业公司重复
 */
function checkComRepeat(row){
	var trs = $("#selectedComs").find(".table tbody tr");
	if(trs.length == 0){
		return false;
	}
	
	var res = 0;
	trs.each(function(index){
		var comId = $(this).find(".comId").val();
		if(row.supplyCode == comId){
			res = 1;
			return false;
		}
	});
	
	if(res>0){
		return true;
	}
	return false;
}

/**
 * 清除指定购进公司和Id
 * @returns
 */
function clearPointComs(){
	$("#selectedComs").find(".table tbody").empty();
}

/**
 * 重新搜索首营商品
 * @returns
 */
function researchFirstSale(){
	var goodsCode=$("#goodsCode").val();
	var goodsName = $("#goodsName").val();
	var fpType=$("#firstPartyType").val();
	var manufacturer = $("#firstPartyName").val(); 
	var shengchanchangjia = "";
	
	//甲方类型为供应商类型的时候,用搜索条件的生产厂家
	if(fpType == 3){
		shengchanchangjia = $("#producer").val(); 
	}

	$("#supp-grid-table").jqGrid('setGridParam', {
        postData:{
        	"goodsCode":goodsCode,
    		"goodsName":goodsName,
    		"firstPartyType":fpType,
    		"manufacturer":manufacturer,
    		"shengchanchangjia":shengchanchangjia
        },
        page:1
    }).trigger('reloadGrid');
}

/**
 * 设置全品种类的厂家供应商的名字
 * @param comName
 * @returns
 */
function resetSuppSaleComName(comName){
	var whole = $("#whole").prop("checked");
	if(whole){
		$("#ssfp").text(comName);
	}
}

/**
 * 不再四舍五入,多于5个,不让再输入
 * @param x
 * @returns
 */
function changeTwoDecimal_f(x) {
	var str = x.toString();
	if(str.length>0){
		var len = str.indexOf(".");
		if(len>-1){
			var subStr = str.substring(len+1,str.length-1);
			if(subStr.length>=5){
				subStr = subStr.substring(0,5);
				str = str.substring(0,len+1);
				str+=subStr;
			}
		}
	}
	return str;
}

/**
 * 判断选择状态
 */
function judgeChecked(flag){
	var purCh = $("input[name='purChannel']:checked").val();
	if(purCh == flag){
		return "checked";
	}
	return "";
}

function judgePullOrder(){
	var po = $("#pullOrder").val();
	var res = "否";
	if(po == 1){
		res = "是";
	}
	return res;
}

function judgeDisSale(){
	var po = $("#disSale").val();
	var res = "否";
	if(po == 1){
		res = "是";
	}
	return res;
}

function judgeAll(){
	var all = $("#whole").prop("checked");
	var res = "";
	if(all){
		res = "checked";
	}
	return res;
}

/**
 * 分类表单的显示
 * @returns
 */
function nonAllGoods(){
	var formHtmls = "";
	$("#nonWholeParent").children().each(function(i){
		var dicSwitch = $(this).find(".ctrlDicSwitch").prop("checked");
		var cusSwitch = $(this).find(".ctrlCusSwitch").prop("checked");
		var nameType = 0;
		$(this).find(".nl").each(function(){
			var select = $(this).prop("checked");
			if(select){
				nameType = $(this).val();
				return false;
			}
		});
		var name = "";
		if(nameType==1){
			name = "黑名单";
		}else if(nameType==2){
			name = "白名单";
		}else if(nameType==0){
			name = "无";
		}
		
		var dicYN = dicSwitch?"是":"否";
		var cusYN = cusSwitch?"是":"否";
		
		var dicContent = "";
		if(dicSwitch){
			$(this).find(".dictable tbody tr").each(function(i){
				var province = $(this).find(".province").text();
				var city = $(this).find(".city :selected").text();
				var area = $(this).find(".area :selected").text();
				var link = province+city+(area=="请选择"?"":area);
				dicContent+=link+";";
			});
		}else{
			dicContent = "无";
		}
		
		var cusContent = "";
		if(cusSwitch){
			$(this).find(".custable tbody tr").each(function(i){
				var sel = $(this).find(".cusCh").prop("checked");
				if(sel){
					cusContent+=$(this).find(".cusName").text()+";";
				}
			});
		}else{
			cusContent = "无";
		}
		
		var goodsHtml = "";
		
		//遍历商品
		$(this).find(".resTable tbody tr").each(function(j){
			var alone=$(this).find(".alone").prop("checked");
			var aloneYN = alone?"checked":"";
			var outKeep = $(this).find(".outKeep").prop("checked");
			var okYN = outKeep?"checked":"";
			var saleKeep = $(this).find(".saleKeep").prop("checked");
			var skYN = saleKeep?"checked":"";
			var productId = $(this).find(".productId").text();
			var goodsCode = $(this).find(".goodsCode").text();
			var goodsName = $(this).find(".goodsName").text();
			var goodsSpec = $(this).find(".goodsSpec").text();
			var goodsPro = $(this).find(".goodsProduce").text();
			var taxPrice = $(this).find(".suppTaxPrice").val();
			var outPrice = $(this).find(".outPrice").val();
			var salePrice = $(this).find(".salePrice").val();
			
			goodsHtml+='<tr>';
			goodsHtml+='<td>'+productId+'</td>';
			goodsHtml+='<td>'+goodsCode+'</td>';
			goodsHtml+='<td>'+goodsName+'</td>';
			goodsHtml+='<td>'+goodsSpec+'</td>';
			goodsHtml+='<td>'+goodsPro+'</td>';
			goodsHtml+='<td>'+taxPrice+'</td>';
			goodsHtml+='<td><input type="checkbox" '+okYN+' /></td>';
			goodsHtml+='<td>'+outPrice+'</td>';
			goodsHtml+='<td><input type="checkbox" '+skYN+' /></td>';
			goodsHtml+='<td>'+salePrice+'</td>';
			goodsHtml+='<td>'+cusYN+'</td>';
			goodsHtml+='<td>'+dicYN+'</td>';
			goodsHtml+='<td>'+name+'</td>';
			goodsHtml+='<td>'+dicContent+'</td>';
			goodsHtml+='<td>'+cusContent+'</td>';
			goodsHtml+='<td><input type="checkbox" '+aloneYN+' /></td>';
			goodsHtml+='</tr>';
		});
			
		var formHtml = '<div class="row">'+
			'<div class="col-sm-12 marginTop5">'+
			'<label>'+
			'<h4>'+
			'商品表单'+(i+1)+
			'</h4>'+
			'</label>'+
			'</div>'+
			'</div>'+
			'<div class="row">'+
			'<div class="col-sm-12 marginTop5">'+
			'<table class="table table-bordered">'+
			'<thead>'+
			'<tr>'+
			'<th>商品ID</th>'+
			'<th>商品编号</th>'+
			'<th>商品名称</th>'+
			'<th>规格</th>'+
			'<th>生产厂家</th>'+
			'<th>供货含税单价</th>'+
			'<th>出库价维价</th>'+
			'<th>出库含税单价</th>'+
			'<th>零售价维价</th>'+
			'<th>零售价含税单价</th>'+
			'<th>是否控销客户</th>'+
			'<th>是否控销区域</th>'+
			'<th>白名单/黑名单</th>'+
			'<th>区域控销设置</th>'+
			'<th>客户类型控销设置</th>'+
			'<th>是否独家</th>'+
			'</tr>'+
			'</thead>'+
			'<tbody>'+
			goodsHtml+
			'</tbody>'+
			'</table>'+
			'</div>'+
			'</div>';
			//合并
			formHtmls+=formHtml;
	});
	return formHtmls;
}

/**
 * 全品商品
 */
function allGoods(){
	var firstParty = $("#ssfp").text();
	var goodsNum = $("#ssgn").text();
	var dicSwitch = $("#wholeDicSwitch").prop("checked");
	var cusSwitch = $("#wholeCusSwitch").prop("checked");
	var nameType = $("input[name='nameListAll']:checked").val();
	var name = "";
	if(nameType==1){
		name = "黑名单";
	}else if(nameType==2){
		name = "白名单";
	}else if(nameType==0){
		name = "无";
	}
	var alone=$("#allAlone").prop("checked");
	var dicYN = dicSwitch?"是":"否";
	var cusYN = cusSwitch?"是":"否";
	var aloneYN = alone?"checked":"";
	
	//区域,拼装省市区
	var dicContent = "";
	if(dicSwitch){
		$("#dicList").find("tbody tr").each(function(i){
			var province = $(this).find(".province").text();
			var city = $(this).find(".city :selected").text();
			var area = $(this).find(".area :selected").text();
			var link = province+city+(area=="请选择"?"":area);
			dicContent+=link+";";
		});
	}else{
		dicContent="无";
	}
	
	//客户类型,显示类型名称
	var cusContent = "";
	if(cusSwitch){
		$("#custable").find("tbody tr").each(function(i){
			var sel = $(this).find(".cusCh").prop("checked");
			if(sel){
				cusContent+=$(this).find(".cusName").text()+";";
			}
		});
	}else{
		cusContent="无";
	}

	 var html='<div class="row">'+
		'<div class="col-sm-12 marginTop5">'+
			'<label>'+
				'<h4>'+
					'全系列品种表单'+
				'</h4>'+
			'</label>'+
		'</div>'+
	'</div>'+
	'<div class="row">'+
		'<div class="col-sm-12 marginTop5">'+
			'<table class="resTable table table-bordered">'+
				'<thead>'+
					'<tr>'+									
						'<th>商品</th>'+
						'<th>厂家/供应商</th>'+
						'<th>当前商品数</th>'+
						'<th>是否区域</th>'+
						'<th>是否客户</th>'+
						'<th>白名单/黑名单</th>'+
						'<th>区域控销</th>'+
						'<th>客户类型控销</th>'+
						'<th>是否独家</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody>'+
					'<tr>'+
	 					'<td>全系列品种</td>'+
	 					'<td>'+firstParty+'</td>'+
	 					'<td>'+goodsNum+'</td>'+
	 					'<td>'+dicYN+'</td>'+
	 					'<td>'+cusYN+'</td>'+
	 					'<td>'+name+'</td>'+
	 					'<td>'+dicContent+'</td>'+
	 					'<td>'+cusContent+'</td>'+
	 					'<td><input type="checkbox" '+aloneYN+'/></td>'+
	 				'</tr>'+
				'</tbody>'+
			'</table>'+
		'</div>'+
	'</div>';
	return html;
}

 /**
  * 获取商品
  * @returns
  */
function getGoods(){
	var all = judgeAll();
	var html = "";
	if(all=="checked"){
		html = allGoods();
	}else{
		html = nonAllGoods();
	}
	return html;
}

/**
 * 创建供销协议显示内容
 */
function buildSupplySaleDisplay(){
	var comsTable = "";
	var purCh = $("input[name='purChannel']:checked").val();
	if(purCh == 3){
		var trs = "";
		var coms = $("#selectedComs").find(".table tbody tr");
		coms.each(function(index){
			var comName = $(this).find(".comName").text();
			var tr = '<tr>'+
			'<td>'+(index+1)+'</td>'+
			'<td>'+comName+'</td>'+
			'</tr>';
			trs+=tr;
		});
		
		comsTable = '<div class="row">'+
								'<div class="col-sm-12 marginTop5">'+
								'<table class="comsTable table table-bordered">'+
								'<thead>'+
								'<tr>'+
								'<th>序号</th>'+
								'<th>供应商名称</th>'+
								'</tr>'+
								'</thead>'+
								'<tbody>'+
									trs+
								'</tbody>'+
								'</table>'+
								'</div>'+
								'</div>';
	}
	
	var html = '<div class="panel panel-default publicPanel">'+
					    '<h4 class="" style="font-weight: bolder;">协议供销条款</h4>'+
					     '<div class="row">'+
					            '<div class="col-xs-12">'+
					                '<div class="row">'+
					                    '<div class="col-sm-1 marginTop5">'+
					                        '<label style="color:red;">*</label>'+
					                        '<label>购进渠道</label>'+
					                    '</div>'+
					                    '<div class="col-sm-1 marginTop5">'+
					                        '<label>'+
					                            '<input type="radio" name="purchaseChannel" value="1" '+
					                            judgeChecked(1)+
					                        ' disabled/>直供'+
					                        '</label>'+
					                    '</div>'+
					                    '<div class="col-sm-2 marginTop5">'+
					                        '<label>'+
					                            '<input type="radio" name="purchaseChannel" value="2" '+ 
					                            judgeChecked(2)+
					                        	' disabled/>所有商业公司购进'+
					                        '</label>'+
					                   '</div>'+
					                    '<div class="col-sm-2 marginTop5">'+
					                        '<label>'+
					                            '<input type="radio" name="purchaseChannel" value="3" '+
					                            judgeChecked(3)+
					                        	' disabled/>指定商业公司购进'+
					                        '</label>'+
					                    '</div>'+
					                '</div>'+
					                 comsTable+
					                '<div class="row">'+
					                    '<div class="col-sm-1 marginTop5">'+
					                        '<label style="color:red;">*</label>'+
					                        '<label>是否拉单支持</label>'+
					                    '</div>'+
					                    '<div class="col-sm-2 marginTop5">'+
					                        '<select>'+
					                            '<option readonly>'+judgePullOrder()+'</option>'+
					                        '</select>'+
					                    '</div>'+
					                    '<div class="col-sm-2 marginTop5">'+
					                        '<label style="color:red;">*</label>'+
					                        '<label>是否分销协议支持</label>'+
					                    '</div>'+
					                    '<div class="col-sm-2 marginTop5">'+
					                        '<select>'+
					                            '<option readonly>'+judgeDisSale()+'</option>'+
					                        '</select>'+
					                    '</div>'+
					                '</div>'+
					            '</div>'+
					        '</div>'+
					        '<div class="row">'+
					            '<div class="col-xs-12">'+
					                '<div class="row">'+
					                    '<div class="col-sm-1 marginTop5">'+
					                        '<label><h4>协议商品</h4></label>'+
					                    '</div>'+
					                '</div>'+
					            '</div>'+
					        '</div>'+
					        '<div class="row">'+
					                '<div class="col-sm-3 marginTop5">'+
					                '<label>'+
					                    '<input type="checkbox" value="1" '+judgeAll()+' disabled/>是否全系列品种'+
					                '</label>'+
					                '</div>'+
					        '</div>'+
					        '<div>'+
								'<div>'+
									getGoods()+
					          	'</div>'+
					      	'</div>'+
					'</div>';
	return html;
}

/**
 * 获取供销协议html
 * @returns
 */
function buildViewDataForSS(){
	var html = "";
	html+=buildSupplySaleDisplay();
	var purCh = $("input[name='purChannel']:checked").val();
	html += '<input type="hidden" name="suppSaleVo.purchaseChannel" value="'+purCh+'"/>';
	if(purCh == 3){
		var trs = $("#selectedComs").find(".table tbody tr");
		trs.each(function(index){
			var comId = $(this).find(".comId").val();
			var comName = $(this).find(".comName").text();
			html+='<input type="hidden" name="suppSaleVo.companyVos['+index+'].companyId" value="'+comId+'"/>';
			html+='<input type="hidden" name="suppSaleVo.companyVos['+index+'].companyName" value="'+comName+'"/>';
		});
	}
	
	//是否支持拉单
	var pullOrder = $("#pullOrder").val();
	html+='<input type="hidden" name="suppSaleVo.whetherPullOrder" value="'+pullOrder+'"/>';
	
	//是否分销
	var disSale = $("#disSale").val();
	html+='<input type="hidden" name="suppSaleVo.whetherDistribution" value="'+disSale+'"/>';
	
	//是否全品种
	var whetherAll = 0;
	var all = $("#whole").prop("checked");
	if(all){
		whetherAll = 1;
	}
	html+='<input type="hidden" name="suppSaleVo.whetherAll" value="'+whetherAll+'"/>';
	
	//协议设置
	//controlSets
	if(all){
		var dicSwitch = $("#wholeDicSwitch").prop("checked");
		var cusSwitch = $("#wholeCusSwitch").prop("checked");
		var dicSv = 0;
		var cusSv = 0;
		//区域
		if(dicSwitch){
			dicSv=1;
			var areas = "";
			var link = "";
			var itemTypes = "";
			$("#dicList").find("tbody tr").each(function(i){
				var province = $(this).find(".province :selected").text();
				var city = $(this).find(".city :selected").text();
				var area = $(this).find(".area :selected").text();
				var cityVal = $(this).find(".city").val();
				var areaVal = $(this).find(".area").val();
				link+=province+city+(area=="请选择"?"":area)+",";
				//末尾可能是城市(1),也有可能是地区(2)
				if(areaVal!="0"){
					itemTypes+="2"+",";
					areas+=areaVal+",";
				}else{
					if(cityVal!="0"){
						itemTypes+="1"+",";
						areas+=cityVal+",";
					}
				}
			});
			html+='<input type="hidden" name="suppSaleVo.controlSets[0].dicTypes" value="'+itemTypes+'"/>';
			html+='<input type="hidden" name="suppSaleVo.controlSets[0].dicContents" value="'+link+'"/>';
			html+='<input type="hidden" name="suppSaleVo.controlSets[0].dics" value="'+areas+'"/>';
		}
		html+='<input type="hidden" name="suppSaleVo.controlSets[0].whetherArea" value="'+dicSv+'"/>';
		
		//客户类型
		if(cusSwitch){
			cusSv = 1;
			var cuses = "";
			var link = "";
			$("#custable").find("tbody tr").each(function(i){
				var select = $(this).find(".cusCh").prop("checked");
				if(select){
					cuses += $(this).find(".cusVal").val()+",";
					link += $(this).find(".cusName").text()+",";
				}
			});
			html+='<input type="hidden" name="suppSaleVo.controlSets[0].cusContents" value="'+link+'"/>';
			html+='<input type="hidden" name="suppSaleVo.controlSets[0].customs" value="'+cuses+'"/>';
		}
		html+='<input type="hidden" name="suppSaleVo.controlSets[0].whetherCustomerType" value="'+cusSv+'"/>';
		//名单类型
		var nameType = $("input[name='nameListAll']:checked").val();
		html+='<input type="hidden" name="suppSaleVo.controlSets[0].listType" value="'+nameType+'"/>';
		
		//商品独一条
		var exclusive = 0;
		var alone = $("#allAlone").prop("checked");
		if(alone){
			exclusive = 1;
		}
		html+='<input type="hidden" name="suppSaleVo.controlSets[0].goods[0].productName" value="全系列品种"/>';
		html+='<input type="hidden" name="suppSaleVo.controlSets[0].goods[0].exclusive" value="'+exclusive+'"/>';
	}else{
		$("#nonWholeParent").children().each(function(i){
			//区域
			var dic = $(this).find(".ctrlDicSwitch").prop("checked");
			var dicVal = 0;
			if(dic){
				dicVal = 1;
				var areas = "";
				var link = "";
				var itemTypes = "";
				$(this).find(".dictable tbody tr").each(function(){
					var province = $(this).find(".province :selected").text();
					var city = $(this).find(".city :selected").text();
					var area = $(this).find(".area :selected").text();
					var cityVal = $(this).find(".city").val();
					var areaVal = $(this).find(".area").val();
					link+=province+city+(area=="请选择"?"":area)+",";
					
					//末尾可能是城市(1),也有可能是地区(2)
					if(areaVal!="0"){
						itemTypes+="2"+",";
						areas+=areaVal+",";
					}else{
						if(cityVal!="0"){
							itemTypes+="1"+",";
							areas+=cityVal+",";
						}
					}
				});
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].dicContents" value="'+link+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].dics" value="'+areas+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].dicTypes" value="'+itemTypes+'"/>';
			}
			html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].whetherArea" value="'+dicVal+'"/>';
			
			//客户类型
			var cus = $(this).find(".ctrlCusSwitch").prop("checked");
			var cusVal = 0;
			if(cus){
				cusVal = 1;
				var cuses = "";
				var link = "";
				$(this).find(".custable tbody tr").each(function(){
					var select = $(this).find(".cusCh").prop("checked");
					if(select){
						link+=$(this).find(".cusName").text()+",";
						cuses+=$(this).find(".cusVal").val()+",";
					}
				});
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].cusContents" value="'+link+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].customs" value="'+cuses+'"/>';
			}
			html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].whetherCustomerType" value="'+cusVal+'"/>';
			//黑白名单
			var nameType = 0;
			$(this).find(".nl").each(function(){
				var nt = $(this).prop("checked");
				if(nt){
					nameType = $(this).val();
				}
			});
			html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].listType" value="'+nameType+'"/>';
			//商品列表
			$(this).find(".resTable tbody tr").each(function(k){
				var goodsCode = $(this).find(".goodsCode").text();
				var goodsId = $(this).find(".goodsId").val();
				var goodsName = $(this).find(".goodsName").text();
				var taxPrice = $(this).find(".suppTaxPrice").val();
				var okv = 0;
				var outKeep = $(this).find(".outKeep").prop("checked");
				if(outKeep){
					okv = 1;
				}
				var outPrice = $(this).find(".outPrice").val();
				var skv = 0;
				var saleKeep = $(this).find(".saleKeep").prop("checked");
				if(saleKeep){
					skv=1;
				}
				var salePrice = $(this).find(".salePrice").val();
				var alv = 0;
				var alone = $(this).find(".alone").prop("checked");
				if(alone){
					alv = 1;
				}
				
				//是否是自有商品 1,自有 2,基本
				var goodsFlag = $(this).find(".goodsFlag").val();
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].flag" value="'+goodsFlag+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].productNo" value="'+goodsCode+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].productId" value="'+goodsId+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].productName" value="'+goodsName+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].supplyTaxPrice" value="'+taxPrice+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].outPriceKeep" value="'+okv+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].outTaxPrice" value="'+outPrice+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].retailPriceKeep" value="'+skv+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].retailTaxPrice" value="'+salePrice+'"/>';
				html+='<input type="hidden" name="suppSaleVo.controlSets['+i+'].goods['+k+'].exclusive" value="'+alv+'"/>';
			});
		});
	}
	return html;
}

/**
 * 供销协议填写完整性校验
 * 思路:
 * 	1,是全品的还是非全品的
 *     2,商品不可空
 *     3,勾选了区域,区域必选
 *     4,勾选了客户类型,客户类型必选
 *     5,选择了指定公司,则要校验
 *     
 *     在循环里的return false,只是结束循环,并不是做为方法的返回结果
 */
function valiSupplySaleFinish(){
	var desc = "供销协议_"
	var purCh = $("input[name='purChannel']:checked").val();
	if(purCh==3){
		var comsLen = $("#selectedComs").find(".table tbody tr").length;
		if(comsLen==0){
			btn_alertDialog("提示",desc+"请选择购进公司!");
			return false;
		}
	}
	var whole = $("#whole").prop("checked");
	//全品
	if(whole){
		desc+="全品_";
		var dicSwitch = $("#wholeDicSwitch").prop("checked");
		var cusSwitch = $("#wholeCusSwitch").prop("checked");
		if(dicSwitch){
			var dics = $("#dicList").find("tbody tr").length;
			if(dics == 0){
				btn_alertDialog("提示",desc+"请选择区域!");
				return false;//方法返回
			}else{
				//判断区域是否没有选择
				var jump = 0;
				$("#dicList").find("tbody tr").each(function(){
					var city = $(this).find(".city").val();
					if(city == "0"){
						jump = 1;
						btn_alertDialog("提示",desc+"请选择城市!");
						return false;//只是跳出循环
					}
				});
				
				//方法返回
				if(jump>=1){
					return false;
				}
				
				//判断城市重复
				var form = $(this);
				form.find(".dictable tbody tr").each(function(){
					var city = $(this).find(".city").val();
					var index = $(this).find(".sortCode").text();
					form.find(".dictable tbody tr").each(function(){
						var cirCity = $(this).find(".city").val();
						var cirIndex = $(this).find(".sortCode").text();
						if(index != cirIndex){
							if(city!="0" && cirCity!="0"){
								if(city == cirCity){
									jump=1;
									btn_alertDialog("提示",desc+"区重复了!");
									return false;//结束循环
								}
							}
						}
					});
					if(jump>=1){
						return false;//结束循环
					}
				});

				//判断区是否重复
				$("#dicList").find("tbody tr").each(function(){//第一层循环
					var area = $(this).find(".area").val();
					var index = $(this).find(".sortCode").text();
					$("#dicList").find("tbody tr").each(function(){//第二层循环
						var cirArea = $(this).find(".area").val();
						var cirIndex = $(this).find(".sortCode").text();
						if(index != cirIndex){
							if(area!="0" && cirArea!="0"){
								if(area == cirArea){
									jump=1;
									btn_alertDialog("提示",desc+"区重复了!");
									return false;//结束内层循环
								}
							}
						}
					});
					
					//结束外层循环
					if(jump>=1){
						return false;
					}
				});
				
				//方法返回
				if(jump>=1){
					return false;
				}
			}
		}
		
		if(cusSwitch){
			var cusLenth = 0;
			$("#custable").find("tbody tr").each(function(){
				var ch = $(this).find(".cusCh").prop("checked");
				if(ch){
					cusLenth++;
				}
			});
			
			if(cusLenth==0){
				btn_alertDialog("提示",desc+"必须选择客户类型!");
				return false;//方法返回
			}
		}
	}else{//非全品产品
		/**
		 * 商品,价格之间的校验
		 * 区域
		 * 客户类型
		 */
		desc+="非全品_";
		var jump = 0;
		$("#nonWholeParent").children().each(function(i){
			//商品相关
			var len = $(this).find(".resTable tbody tr").length;
			if(len==0){
				jump = 1;
				btn_alertDialog("提示",desc+"请添加商品!");
				return false;//结束循环
			}else{
				$(this).find(".resTable tbody tr").each(function(i){
					 var goods = $(this);
					 var outKeep = goods.find(".outKeep");
					 var outPrice = goods.find(".outPrice").val();
					 var saleKeep = goods.find(".saleKeep");
					 var salePrice = goods.find(".salePrice").val();
					 if(outKeep.prop("checked")){
						 if(parseFloat(outPrice) <= 0){
							 jump = 1;
							 btn_alertDialog("提示",desc+"出库价含税单价必须大于0!");
							 return false;//结束循环
						 }
					 }
					 
					 if(saleKeep.prop("checked")){
						 if(parseFloat(salePrice) <= 0){
							 jump = 1;	
							 btn_alertDialog("提示",desc+"零售价含税单价必须大于0!");
							 return false;//结束循环
						 }
					 }
				});
				
				if(jump>=1){
					return false;//结束循环
				}
			 }
			
			//区域
			var dicSwitch = $(this).find(".ctrlDicSwitch").prop("checked");
			if(dicSwitch){
				var dics = $(this).find(".dictable tbody tr").length;
				if(dics == 0){
					jump=1;
					btn_alertDialog("提示",desc+"请选择区域!");
					return false;//方法返回
				}else{
					//判断区域是否没有选择
					$(this).find(".dictable tbody tr").each(function(){
						var city = $(this).find(".city").val();
						if(city == "0"){
							jump = 1;
							btn_alertDialog("提示",desc+"请选择城市!");
							return false;//结束循环
						}
					});
					
					//方法返回
					if(jump>=1){
						return false;
					}
					
					//判断城市重复
					var form = $(this);
					form.find(".dictable tbody tr").each(function(){
						var city = $(this).find(".city").val();
						var index = $(this).find(".sortCode").text();
						form.find(".dictable tbody tr").each(function(){
							var cirCity = $(this).find(".city").val();
							var cirIndex = $(this).find(".sortCode").text();
							if(index != cirIndex){
								if(city!="0" && cirCity!="0"){
									if(city == cirCity){
										jump=1;
										btn_alertDialog("提示",desc+"区重复了!");
										return false;//结束循环
									}
								}
							}
						});
						if(jump>=1){
							return false;//结束循环
						}
					});
					
					
					
					//判断区是否重复
					var form = $(this);
					form.find(".dictable tbody tr").each(function(){
						var area = $(this).find(".area").val();
						var index = $(this).find(".sortCode").text();
						form.find(".dictable tbody tr").each(function(){
							var cirArea = $(this).find(".area").val();
							var cirIndex = $(this).find(".sortCode").text();
							if(index != cirIndex){
								if(area!="0" && cirArea!="0"){
									if(area == cirArea){
										jump=1;
										btn_alertDialog("提示",desc+"区重复了!");
										return false;//结束循环
									}
								}
							}
						});
						if(jump>=1){
							return false;//结束循环
						}
					});
					
					if(jump>=1){
						return false;//方法返回
					}
				}
			}
			//客户类型
			var cusSwitch = $(this).find(".ctrlCusSwitch").prop("checked");
			if(cusSwitch){
				var cusLenth = 0;
				$(this).find(".custable tbody tr").each(function(){
					var ch = $(this).find(".cusCh").prop("checked");
					if(ch){
						cusLenth++;
					}
				});
				
				if(cusLenth==0){
					jump=1;
					btn_alertDialog("提示",desc+"必须选择客户类型!");
					return false;//方法返回
				}
			}
		});
		
		if(jump>=1){
			return false;
		}
	}
	return true;
}

/**
 * 创建商品
 * @param goods 商品信息
 * @param goodsFlag 1是自有商品 2是基本商品
 * @returns
 */
function createGoods(goods,goodsFlag){
	var tbody = $("#"+currForm).find(".resTable tbody");
	//校验去重
	var link = goods.productKey;
	var rep = checkRepeat(link);
	if(rep){
		return false;
	}else{
		var len = $("#"+currForm).find(".resTable tbody tr").length;
		var tr ='<tr class="supplyGoodsTr">'+
		'<td><input type="checkbox" class="choose"/>'+
				'<span class="sortCode">'+(len+1)+'</span>'+
		'</td>'+
		'<td class="productId">'+goods.productId+'</td>'+
		'<td class="goodsCode">'+goods.goodsCode+'</td>'+
		'<td class="goodsName">'+goods.goodsName+'</td>'+
		'<td class="goodsSpec">'+goods.goodsSpec+'</td>'+
		'<td class="goodsProduce">'+goods.manufacturer+'</td>';
		
		if(goods.taxprice>0){
			tr+='<td><input type="text" value="'+goods.taxprice+'" class="suppTaxPrice"/></td>';
		}else{
			tr+='<td><input type="text" value="0.00" class="suppTaxPrice"/></td>';
		}
		
		var tr2 = '<td><input type="checkbox" class="outKeep"/></td>'+
		'<td><input type="text" value="0.00" class="outPrice"/></td>'+
		'<td><input type="checkbox" class="saleKeep"/></td>'+
		'<td><input type="text" value="0.00" class="salePrice"/></td>'+
		'<td><input type="checkbox" class="alone"/>'+
		'<input type="hidden" class="goodsFlag" value="'+goodsFlag+'"/>'+
		'<input type="hidden" class="goodsId" value="'+goods.productId+'"/>'+
		'<input type="hidden" class="pinpaichangjia" value="'+goods.pinpaichangjia+'"/>'+
		'<input type="hidden" class="productKey" value="'+goods.productKey+'"/>'+
		'</td>'+
		'</tr>';
		tbody.append(tr+tr2);
	}
	return true;
}

/**
 * 检查重复
 * @param link productId+""+goodsCode 联合值
 * @returns
 */
function checkRepeat(link){
	var flag = false;
	$("#nonWholeParent").children().each(function(i){
		var len = $(this).find(".resTable tbody tr").length;
		if(len > 0){
			$(this).find(".resTable tbody tr").each(function(j){
				var proKey = $(this).find(".productKey").val();
				if(link == proKey){
					flag = true;
					return;
				}
			});
		}
	});
	return flag;
}

/**
 * 表单重排序
	 *  表单序号
	 *  单选按钮
 * @returns
 */
function resort(form,len){
	form.attr("id","form"+len);
	var sort = form.find(".sort");
	sort.text(len);
	form.find(".nl").each(function(){
		$(this).attr("name","nameList"+len);
	});
}

/**
 * 设置购进渠道的可选择性
 * @returns
 */
function setPurchaseChannel(firstPartyType){
	//1和2,默认是全部购进商家 3是直供
	if(firstPartyType==1 || firstPartyType==2){
		$("#allCom").prop("checked",true);
		$("#direct").prop("disabled",true);
	}else{
		$("#direct").removeAttr("disabled");
		$("#allCom").prop("checked",false);
		$("#direct").prop("checked",true);
	}
	//清空指定商业购进公司
	clearPointComs();
}

/**
 * 根据是否是选择全品协议而设置商品数量
 * @returns
 */
function resetGoodsCountForAll(firstPartyName){
	//是否选全品
//	var all = $("#whole").prop("checked");
//	if(all){
//		var goodsCount = qryGoodsCount();
//		$("#ssgn").text(goodsCount);
//		$("#ssfp").text(firstPartyName);
//	}else{
//		//如果选择了分类表单,保留第一个表单,只删除商品,其余连表单商品全干掉
//		$(".nonWholeForm").each(function(i){
//			if(i==0){
//				$(this).find(".resTable tbody").empty();
//			}else{
//				$(this).remove();
//			}
//		});
//		console.log("更换甲方");
//		//重新查询首营商品
//		researchFirstSale();
//	}
	var goodsCount = qryGoodsCount();
	$("#ssgn").text(goodsCount);
	$("#ssfp").text(firstPartyName);
	$(".nonWholeForm").each(function(i){
		if(i==0){
			$(this).find(".resTable tbody").empty();
		}else{
			$(this).remove();
		}
	});
	console.log("更换甲方");
	//重新查询首营商品
	researchFirstSale();
}

/**
 * 获取商品数量
 * @returns
 */
function qryGoodsCount(){
	var fpType=$("#firstPartyType").val();
	var manufacturer = $("#firstPartyName").val();
	var count = 0;
	$.ajax({
		url:basePath+"/currency/queryGoodsCount",
		type:"POST",
		data:{"firstPartyType":fpType,"manufacturer":manufacturer},
		dataType:"json",
		async:false,
		success:function(data){
			count=data.result;
			return count;
		}
	});
	return count;
}

/**
 * 查询商品
 * @returns
 */
function queryGoods(){
	$("#gridWrap").html('<table id="supp-grid-table"></table><div id="supp-grid-pager"></div>');
	var goodsCode=$("#goodsCode").val();
	var goodsName = $("#goodsName").val();
	var fpType=$("#firstPartyType").val();
	var manufacturer = $("#firstPartyName").val(); 
	var shengchanchangjia = $("#producer").val();
	
	//如果是供应商类型的话,则生产厂家用搜索条件的
	if(fpType == 3){
		shengchanchangjia = $("#producer").val();
	}
	
	//查询接口,填充数据
	$("#supp-grid-table").jqGrid({
		url:basePath+"/currency/queryRebateProduct",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        postData:{
        		"goodsCode":goodsCode,
        		"goodsName":goodsName,
        		"firstPartyType":fpType,
        		"manufacturer":manufacturer,
        		"shengchanchangjia":shengchanchangjia
        },
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        colNames: ['商品Key','商品ID','商品编号','商品名称', '规格', '生产厂家','品牌厂家','含税单价'],
        colModel: [
        {
        	name:"productKey",
        	index:"productKey",
            width:'100',
            key:true,
            hidden:true
        },
        {
        	name:"productId",
        	index:"productId",
            width:'100',
        },{
            name: 'goodsCode',
            index: 'goodsCode',
            width:'100',
        }, {
            name: 'goodsName',
            index: 'goodsName',
            width:'280',
        }, {
            name: 'goodsSpec',
            index: 'goodsSpec',
            width:'150',
        }, {
            name: 'manufacturer',
            index: 'manufacturer',
            width:'200',
        }, {
            name: 'pinpaichangjia',
            index: 'pinpaichangjia',
            width:'100',
            hidden:true
        },
        {
            name: 'taxprice',
            index: 'taxprice',
            width:'100',
            hidden:true
        }
        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 0,//每页显示记录数
        rowList: [10,20,30],//用于改变显示行数的下拉列表框的元素数组。
        pager: '#supp-grid-pager',//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: false,//是否只能点击复选框多选
//        autowidth: true, //自动宽
        loadComplete: function() {
        	
        	var goodsCode = $("#goodsCode").val();
        	var boo = goodsCode.trim().length>0?true:false;
        	
        	if(boo){
        		jqGridAllChoose("supp-grid-table");
        	}
            
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
    });
}

/**
 * jqGrid全选问题
 * @param tableName
 * @returns
 */
function jqGridAllChoose(tableName){
	$("#"+tableName).jqGrid('setSelection',false);
	var rowIds = jQuery("#"+tableName).jqGrid('getDataIDs');
    for(var k=0; k<rowIds.length; k++) {
         jQuery("#"+tableName).setSelection(rowIds[k], false); 
    }
}


/**
 * 指定商定购进公司
 * @param type
 * @returns
 */
function queryComs(){
	var url = basePath+"/first/gys";
	$(com_table).jqGrid({
        url:url,
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: [ '编号','供应商', '供应商责任人','地区'],
        colModel: [{
            name: 'supplyCode',
            index: 'supplyCode',
            width:'200',
            key:true
        }, {
            name: 'supplyName',
            index: 'supplyName',
            width:'200',
        }, {
            name: 'people',
            index: 'people',
            width:'200',
        },{
        	name:'area',
        	index:'area',
            width:'210',
        }
        ],
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: com_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: false,//是否只能点击复选框多选
//        autowidth: true, //自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
    });
}