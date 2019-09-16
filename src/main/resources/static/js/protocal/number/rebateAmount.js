var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$("#proNo").click(function(){
	var proNo = $("#proNo").val();
	var productNo = $("#goodsCode").val();
	var rebateStandard = $("#rebateStandard").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var firstPartyName = $("#firstPartyName").val();
	var firstPartyType = $("#firstPartyType").val();
	/*alert("点击表单==proNo:"+proNo+"=====rebateStandard:"+rebateStandard
			+"=====productNo:"+productNo+"=====startTime:"+startTime+"=====endTime:"+endTime
			+"=====firstPartyName:"+firstPartyName+"=====firstPartyType:"+firstPartyType);*/
	
	//根据返利标准筛选  返利标准：1销售 2购进 3付款金额 
	if(rebateStandard==1){		
		sale(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType);
	}else if(rebateStandard==2){
		//btn_alertDialog("订单较多，请耐心等待","预计时间1min");
		purchase(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType);
	}else if(rebateStandard==3){
		payment(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType); 
	} 
		
});

function purchase(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType){	
	$("#showByProtocal").html('<table id="grid-table" > <button id="Exprot" type="button" >导出</button> </table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ '/pro/getIdByStandard',
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total", 
        },
        postData:{"proNo":proNo,"rebateStandard":rebateStandard,"productNo":productNo,"startTime":startTime,"endTime":endTime,"firstPartyName":firstPartyName,"firstPartyType":firstPartyType},
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['入库日期','入库单号','订单编号','商品编码','商品名称', '商品规格 ','生产厂家 ','订单数量', '商品含税单价', '入库数量', '入库含税金额', '供应商'],
        colModel: [
        	{
        		name: 'rkDates',
    		    index: 'rkDates',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",		
    		    
        	},{
        		name: 'rkBillcode',
    		    index: 'rkBillcode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'ddBillcode',
    		    index: 'ddBillcode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsCode',
    		    index: 'goodsCode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsName',
    		    index: 'goodsName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsSpec',
    		    index: 'goodsSpec',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'manufacturer',
    		    index: 'manufacturer',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'ddNum',
    		    index: 'ddNum',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'taxprice',
    		    index: 'taxprice',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'rkNum',
    		    index: 'rkNum',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        	,{
        		name: 'rkTaxamount',
    		    index: 'rkTaxamount',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        	,{
        		name: 'suppliersName',
    		    index: 'suppliersName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
    $("#Exprot").click(function(){
        window.location.href=basePath+"/pro/purchaseExport?proNo="+proNo+"&rebateStandard="+rebateStandard+"&productNo="+productNo+"&startTime="+startTime+"&endTime="+endTime+"&firstPartyName="+firstPartyName+"&firstPartyType="+firstPartyType;
    });
    dialog.close().remove();
     
}
function sale(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType){	
	$("#showByProtocal").html('<table id="grid-table" > <button id="Exprot" type="button" >导出</button> </table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ '/pro/getIdByStandard',
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:{"proNo":proNo,"rebateStandard":rebateStandard,"productNo":productNo,"startTime":startTime,"endTime":endTime,"firstPartyName":firstPartyName,"firstPartyType":firstPartyType},
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['销售订单日期','销售单号','商品编码','商品名称','商品规格', '生产厂家 ','客户类型 ','药店名称', '省', '市', '区', '订单单价', '订单数量', '订单金额', '单位'],
        colModel: [
        	{
        		name: 'ddDates',
    		    index: 'ddDates',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",		
    		    
        	},{
        		name: 'xsBillcode',
    		    index: 'xsBillcode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsCode',
    		    index: 'goodsCode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsName',
    		    index: 'goodsName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'goodsSpec',
    		    index: 'goodsSpec',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'manufacturer',
    		    index: 'manufacturer',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'clientType',
    		    index: 'clientType',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'businessName',
    		    index: 'businessName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'citynName',
    		    index: 'citynName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'cityName2',
    		    index: 'cityName2',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'cityName3',
    		    index: 'cityName3',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'price',
    		    index: 'price',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'ddNum',
    		    index: 'ddNum',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'amount',
    		    index: 'amount',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'unit',
    		    index: 'unit',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
    $("#Exprot").click(function(){
    	btn_alertDialog("正在导出......","导出时间较长，请耐心等待！");
        window.location.href=basePath+"/pro/saleExport?proNo="+proNo+"&rebateStandard="+rebateStandard+"&productNo="+productNo+"&startTime="+startTime+"&endTime="+endTime+"&firstPartyName="+firstPartyName+"&firstPartyType="+firstPartyType;
    });
    dialog.close().remove();
}
function payment(proNo,rebateStandard,productNo,startTime,endTime,firstPartyName,firstPartyType){	
	$("#showByProtocal").html('<table id="grid-table" > <button id="Exprot" type="button" >导出</button> </table><div id="grid-pager" ></div>');
	var pager_selector = "#grid-pager";
	$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ '/pro/getIdByStandard',
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:{"proNo":proNo,"rebateStandard":rebateStandard,"productNo":productNo,"startTime":startTime,"endTime":endTime,"firstPartyName":firstPartyName,"firstPartyType":firstPartyType},
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['付款单日期','付款单号','供应商','付款金额','付款方式'],
        colModel: [
        	{
        		name: 'fkDates',
    		    index: 'fkDates',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",		
    		    
        	},{
        		name: 'fkBillcode',
    		    index: 'fkBillcode',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'businessName',
    		    index: 'businessName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'sjszje',
    		    index: 'sjszje',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	},{
        		name: 'payMetName',
    		    index: 'payMetName',
    		    width: 150,//宽度
    		    editable: false,//是否可编辑
    		    edittype: "select",
        	}
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        }, 
    });
    $("#Exprot").click(function(){
        window.location.href=basePath+"/pro/paymentExport?proNo="+proNo+"&rebateStandard="+rebateStandard+"&productNo="+productNo+"&startTime="+startTime+"&endTime="+endTime+"&firstPartyName="+firstPartyName+"&firstPartyType="+firstPartyType;
    });
}



