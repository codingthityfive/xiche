var w_width = $(window).width() * 0.8;
var w_height = $(window).height() * 0.75;
var btnFlag = 0 ;//用来判断按什么展现查询数据
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
var startProId = '';
$(function() {

    // tabs 切换
    $('.nav-tabs>li').on(
        'click',
        function() {
            var $this = $(this), $nav_content = $('.nav-content');
            $this.addClass('active').siblings().removeClass('active');
            $nav_content.children('div').eq($this.index()).show()
                .siblings().hide();
        })
    var dialog = top.dialog.get(window);

    $("#firstPartyName").on("dblclick", function () {
        proFirstPartyName();
    });
    $("#proLeaderName").on("dblclick", function () {
        proLeaderFlowMore();
    });
    $("#firstSignName").on("dblclick", function () {
        firstSignerFlow();
    });
    $("#secondPartyName").on("dblclick", function () {
        proSecondPartyName();
    });
    $("#purchaseChannelName").on("dblclick", function () {
        proPurchaseChannel();
    });
    $("#proNo").on("dblclick", function () {
        proNoSearch();
    });
    $("#goodsCode").on("dblclick", function () {
        var company = $("#entId").val();
        if(company == '' || company== '111111'){
            btn_alertDialog("提示","请先在“乙方”选择具体的分公司！");
            return false;
        }
        goodsCodeSearch(company);
    });

});
$("#queryBtn").click(function () {
    var data = queryConditions()
    if(data){
        $("#grid-table").jqGrid('setGridParam', {
            postData: data,page:1
        }).trigger('reloadGrid');
        $("#grid-table2").jqGrid("clearGridData");
    }
})
$("#auditBtn").click(function(){
    top.dialog({
        url:basePath + '/pro/auditProtocal',
        title: '提交审批',
        width:900,
        height:800,
        data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
        onclose: function() {
            var data = this.returnValue;
            if (data == "success") {
                $('#grid-table').jqGrid().trigger('reloadGrid');
                $('#value').html("这里是modal 返回的值  " + this.returnValue);
            }
        }
    }).showModal();
});

// $("#queryByProtocal").click(function(){
//     var proDetailManage = queryConditions();
//     if(proDetailManage){
//         var this_id=$(this).attr("data-id");
//         if(this_id == 1){
//             btnFlag = this_id;
//             proDetailManage.btnFlag = btnFlag;
//             queryByProtocal(proDetailManage);
//         }
//     }
// });
// $("#queryByProtocalAndProduct").click(function(){
//     var proDetailManage = queryConditions();
//     if(proDetailManage){
//         var this_id=$(this).attr("data-id");
//         if(this_id == 3){
//             btnFlag = this_id;
//             proDetailManage.btnFlag = btnFlag;
//             queryByProtocalAndProduct(proDetailManage);
//         }
//     }
// });

/**
 * 选择了指定商业公司类型，才会显示指定商业公司输入框
 */
$("#purchaseChannel").on("change",function(){
    var channel = $(this).val();
    if(channel == 3){
        $("#pointCompany").show();
    }else{
    	$("#purchaseChannelName").val("");
        $("#pointCompany").hide();
    }
});

function queryConditions(){
    proDetailManage=new Object();
    var effectiveStartDateStr = $("#effectiveStartDate").val();
    var effectiveEndDateStr = $("#effectiveEndDate").val();
    var createTimeStartStr = $("#createTimeStart").val();
    var createTimeEndStr = $("#createTimeEnd").val();
    var proNo =$("#proNo").val();//协议编号
    var proLeaderName = $("#proLeaderName").val();//协议负责人
    var proType =$("#proType").val();//协议类型
    var firstPartyName =$("#firstPartyName").val();//甲方
    var whetherActivity = $("#whetherActivity").val();//是否活动协议
    var businessSignName =$("#businessSignName").val();//经手人
    var purchaseChannel = $("#purchaseChannel").val();//购进渠道
    var purchaseChannelName = $("#purchaseChannelName").val();//指定商业公司
    var secondPartyName =$("#secondPartyName").val();//乙方
    var entId =$("#entId").val();//乙方编码

    //新增加的几个查询参数
    var branchCompany =$("#branchCompany").val();//分公司
    var taskStandard =$("#taskStandard").val();//任务量标准
    var proTaskStatus =$("#proTaskStatus").val();//协议任务状态
    var rebateStandard =$("#rebateStandard").val();//返利标准
    var goodsCode =$("#goodsCode").val();//商品编码
    if(!goodsCode){
        goodsCode = '';
    }
    var date = getCurrentTime();

    if(effectiveStartDateStr == "" && effectiveEndDateStr == ""){
        var date=new Date();
        var year=date.getFullYear(); //获取当前年份
        var newStartDateStr = year+"-01-01";
        var newEndDateStr = year+"-12-31";
        // proDetailManage.effectiveStartDateStr=newStartDateStr;
        // proDetailManage.effectiveEndDateStr=newEndDateStr;
        proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
        proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
    }else if(effectiveStartDateStr!= "" && effectiveEndDateStr!= ""){
        proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
        proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
    }

    if(purchaseChannel==3 && purchaseChannelName==''){
        btn_alertDialog("提示","请输入指定商业公司!");
        return false;
    }

    if(effectiveStartDateStr == '' && effectiveEndDateStr != ''){
        btn_alertDialog("提示","请选择生效日期起始日期!");
        return false;
    }
    if(createTimeStartStr == '' && createTimeEndStr != ''){
        btn_alertDialog("提示","请选择创建日期的起始日期!");
        return false;
    }
    if(effectiveStartDateStr != '' && effectiveEndDateStr == ''){
        if(effectiveStartDateStr>date){
            btn_alertDialog("提示","生效日期起始日期大于当前日期，请选择结束日期!");
            return false;
        }
    }

    if(effectiveStartDateStr != '' && effectiveEndDateStr != ''){
        if(effectiveStartDateStr > effectiveEndDateStr){
            btn_alertDialog("提示","生效日期中起始日期不能大于结束日期!");
            return false;
        }
    }
    if(createTimeStartStr != '' && createTimeEndStr != ''){
        if(createTimeStartStr > createTimeEndStr){
            btn_alertDialog("提示","创建日期中起始日期不能大于结束日期!");
            return false;
        }
    }

    if(createTimeStartStr != '' && createTimeEndStr == ''){
        if(createTimeStartStr>date){
            btn_alertDialog("提示","创建日期中开始日期大于当前日期，请选择结束日期!");
            return false;
        }
    }
    
    //增加二审通过时间的选择
    var secAuditTimeStartStr = $("#secAuditTimeStartStr").val();
    var secAuditTimeEndStr = $("#secAuditTimeEndStr").val();
    
    if(secAuditTimeStartStr == '' && secAuditTimeEndStr != ''){
        btn_alertDialog("提示","请选择二审通过日期起始日期!");
        return false;
    }
    
    if(secAuditTimeStartStr != '' && secAuditTimeEndStr == ''){
        if(effectiveStartDateStr>date){
            btn_alertDialog("提示","二审通过日期起始日期大于当前日期，请选择结束日期!");
            return false;
        }
    }

    if(secAuditTimeStartStr != '' && secAuditTimeEndStr != ''){
        if(secAuditTimeStartStr > secAuditTimeEndStr){
            btn_alertDialog("提示","二审通过日期中起始日期不能大于结束日期!");
            return false;
        }
    }
    
    proDetailManage.secAuditTimeStartStr=secAuditTimeStartStr;
    proDetailManage.secAuditTimeEndStr=secAuditTimeEndStr;
    
    //proDetailManage.effectiveStartDateStr=effectiveStartDateStr;
    //proDetailManage.effectiveEndDateStr=effectiveEndDateStr;
    proDetailManage.createTimeStartStr=createTimeStartStr;
    proDetailManage.createTimeEndStr=createTimeEndStr;
    proDetailManage.proNo=proNo;
    proDetailManage.proLeaderName=proLeaderName;
    proDetailManage.proType=proType;
    proDetailManage.firstPartyName=firstPartyName;
    proDetailManage.whetherActivity=whetherActivity;
    proDetailManage.businessSignName=businessSignName;
    proDetailManage.purchaseChannel=purchaseChannel;
    proDetailManage.purchaseChannelName=purchaseChannelName;
    proDetailManage.secondPartyName=secondPartyName;
    proDetailManage.entId=entId;

    proDetailManage.branchCompany=branchCompany;
    proDetailManage.taskStandard=taskStandard;
    proDetailManage.proTaskStatus=proTaskStatus;
    proDetailManage.rebateStandard=rebateStandard;
    proDetailManage.goodsCode=goodsCode;
    proDetailManage.btnFlag=1;
    proDetailManage.isInitition=0;
    return proDetailManage;
};
$("#resetBtn").click(function(){
    $("#effectiveStartDate").val("");
    $("#effectiveStartDate").attr("value","");
    $("#effectiveEndDate").val("");
    $("#effectiveEndDate").attr("value","");
    $("#createTimeStart").val("");
    $("#createTimeEnd").val("");
    $("#secAuditTimeStartStr").val("");
    $("#secAuditTimeEndStr").val("");
    $("#proNo").val("");//协议编号
    $("#proLeaderName").val("");//协议负责人
    $("#proType").val("");//协议类型
    $("#firstPartyName").val("");//甲方
    $("#whetherActivity").val("");//是否活动协议
    $("#businessSignName").val("");//经手人
    $("#purchaseChannel").val("");//购进渠道
    $("#purchaseChannelName").val("");//指定商业公司
    $("#secondPartyName").val("");//乙方entId
    $("#entId").val("");//乙方entId
    $("#taskStandard").val("");//任务量标准
    $("#proTaskStatus").val("");//协议任务状态
    $("#rebateStandard").val("");//返利标准
    $("#goodsCode").val("");//商品编码
    $("#butMonth").val("");
    $("#butYear").val("");
    $("#pointCompany").hide();
    // proDetailManage=new Object();
    // proDetailManage.btnFlag = btnFlag;
    if(btnFlag ==1){
        $("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
    }else if(btnFlag ==2){

    }else if(btnFlag ==3){
        $("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
    }
});

//function queryByProtocal(proDetailManage){
    $("#showByProtocal").html('<table id="grid-table" ></table><div id="grid-pager" ></div>');
    var pager_selector = "#grid-pager";
    $.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
    $("#grid-table").jqGrid({
        url: basePath+ "/pro/detail/manage/query",
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        postData:queryConditions(),
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        autowidth:true,
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames:  ['id','协议编号','协议甲方','创建日期','生效日期','结束日期','二审通过时间','甲方类型 ','甲方联系人','甲方联系电话','协议类型 ','付款方式', '结算方式','返利兑付方式',
            '返利兑付时间 ','购进渠道 ','是否活动协议','经手人','协议品种数','商业供货返利','非商品返利','商品返利','协议返利金额','返利核算金额','返利核算备注','协议责任人','操作'],
        colModel: [
            {
                name: 'id',
                index: 'id',
                hidden:true,
                align:'center',
            },
            {
                name: 'proNo',
                index: 'proNo',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(cellvalue){
                    var str='<a href="javascript:void(0);" class="proCode">'+cellvalue+'</a>';
                    return str;
                }
            },{
                name: 'firstPartyName',
                index: 'firstPartyName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'createTime',
                index: 'createTime',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },{
                name: 'effectiveStartDate',
                index: 'effectiveStartDate',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                editoptions: {
                    size: "20",
                    maxlength: "30"
                },
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },{
                name: 'effectiveEndDate',
                index: 'effectiveEndDate',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                editoptions: {
                    size: "20",
                    maxlength: "30"
                },
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },
            {
            	name:'secondAuditTime',
            	index:'secondAuditTime',
				width:150,
				editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                editoptions: {
                    size: "20",
                    maxlength: "30"
                },
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}            
            },        
            {
                name: 'firstPartyTypeName',
                index: 'firstPartyTypeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'contractName',//任务量一
                index: 'contractName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'contractPhone',//任务量一
                index: 'contractPhone',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'proTypeName',
                index: 'proTypeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'payTypeName',
                index: 'payTypeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'balanceTypeName',
                index: 'balanceTypeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            }, {
                name: 'cashTypeName',
                index: 'cashTypeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'cashTimeName',
                index: 'cashTimeName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'purchaseChannelName',
                index: 'purchaseChannelName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'whetherActivity',//是否活动协议
                index: 'whetherActivity',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "是";
                    }else if(value == 0){
                        return "否";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'businessSignName',//经手人
                index: 'businessSignName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(row.whetherActivity == 1){
                        return value;
                    }else{
                        return "";
                    }
                }
            },{
                name: 'proNum',
                index: 'proNum',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    var whetherAll = row.whetherAll;
                    var firstPartyTypeName = row.firstPartyTypeName;
                    if(whetherAll == '1' && firstPartyTypeName == '商业-供应商'){
                        return '所有商品';
                    }else{
                        var str=value;
                        return str;
                    }
                }
            },{
                name: 'businessRebateAmount',//商业供货返利
                index: 'businessRebateAmount',
                width: 100,//宽度
                align:'center',
            },{
                name: 'nichtwareRebateAmount',//非商品返利
                index: 'nichtwareRebateAmount',
                width: 100,//宽度
                align:'center',
            },{
                name: 'productRebateAmount',//商品返利金额
                index: 'productRebateAmount',
                width: 100,//宽度
                align:'center',
            },{
                name: 'totalRebateAmount',//协议返利金额
                index: 'totalRebateAmount',
                width: 100,//宽度
                align:'center',
            },{
                name: 'rebateAdjustAmount',//返利核算金额
                index: 'rebateAdjustAmount',
                width: 100,//宽度
                align:'center',
            },{
                name: 'rebateAdjustNote',//返利核算备注
                index: 'rebateAdjustNote',
                width: 100,//宽度
                align:'center',
            },{
                name: 'proLeaderName',//协议责任人
                index: 'proLeaderName',
                width: 200,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },
            {  name: 'operate',
   			 index: 'operate',
   			 width: 100,// 宽度
   			 align:'center',
   			 formatter: function (value, grid, rows, state) {
   			 var btn = '';
   				 if ($("#pro_detail_rebate_adjust").val()) { //返利核算 - 权限控制
   					 btn = btn + '<button class="btn btn-white" onclick="rebateAdjust(\''+rows.id+'\');" >返利核算</button>';
   				 }
   				 //style= "display:none;"
   				 //btn = btn + '<button class="btn btn-white"  onclick="rebateCalculate(\''+rows.id+'\');" >返利计算</button>';
   				 return btn;
   			 }
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
        onSelectRow:function(id){

            var rowData = $("#grid-table").jqGrid('getRowData',id);
            var danjupiaohao = rowData.id;
            startProId = danjupiaohao;
            if(danjupiaohao != null){
                salesitemDetil(danjupiaohao);
            }
        }
    });



    $("#grid-table").on("click",".proCode",function(){
        var proCode = $(this).text();
        var auditBtnType = 1;//表示为协议列表点击查看详情，需要显示修改按钮

        $.ajax({
            url:basePath + '/pro/findStatusByProNo',
            type: 'POST', //GET
            async: false,    //或false,是否异步
            data: proCode,
            timeout: 60000,    //超时时间
            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
            contentType: "application/json",
            success: function (data) {
                if(data.code == 0){
                    window.parent.$('#mainFrameTabs').bTabsAdd("proDetail"+proCode,"协议详情",basePath+'/pro/proDetailShow?proCode='+ proCode+"&auditBtnType="+auditBtnType);
                }else {
                    btn_alertDialog("提示","该协议正在被审核，重新刷新页面！");
                    setTimeout(function(){
                        location.reload();
                    }, 1000);
                }
            }
        });

    });
    $("#grid-table").on("click",".proNum",function(){

        var proNo = $(this).parent().parent().children().first().next().text();

        top.dialog({
            url:basePath + '/pro/proNumberColumns?proNo='+proNo,
            title: '协议商品数展现列表单',
            width:900,
            height:500,
            data: '', // 给modal 要传递的 的数据{"name": user_name, "phone": phone, "factory": factory, "createtime": createtime}
            onclose: function() {
                var data = this.returnValue;
                if (data == "success") {
                    $('#grid-table').jqGrid().trigger('reloadGrid');
                    $('#value').html("这里是modal 返回的值  " + this.returnValue);
                }
            }
        }).showModal();

    });

    $("#grid-table").on("click",".adjustRebateAmount",function(){
        var adjustRebateAmount = $(this).parent().prev().text();
        var proNo = $(this).parent().parent().children().first().next().text();
        top.dialog({
            url:basePath + '/pro/adjustRebateAmount?adjustRebateAmount='+adjustRebateAmount+"&proNo="+proNo,
            title: '返利金额调整',
            width:800,
            height:400,
            data: '',
            onclose: function() {
                var data = this.returnValue;
                if (data == "success") {
                    $('#grid-table').jqGrid().trigger('reloadGrid');
                    $('#value').html("这里是modal 返回的值  " + this.returnValue);
                }
            }
        }).showModal();
    });
//}
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//導出
$("#Exprot_pro").click(function(){
    confirmDialog("提示","是否确认导出表单内容?",exprosubmitForm);
});
$("#Exprot_goods").click(function(){
    confirmDialog("提示","是否确认导出表单内容?",exprosubmitGoodsForm);
});
function exprosubmitForm() {
    var proDetailManage = queryConditions();
    if(proDetailManage){
        window.location.href=basePath+"/pro/export?proNo="+proDetailManage.proNo+"&firstPartyName="+proDetailManage.firstPartyName+"&whetherActivity="+proDetailManage.whetherActivity+"&businessSignName=" +proDetailManage.businessSignName+
            "&purchaseChannel="+proDetailManage.purchaseChannel + "&secondPartyName="+proDetailManage.secondPartyName+"&effectiveStartDateStr="+proDetailManage.effectiveStartDateStr+"&proLeaderName="+proDetailManage.proLeaderName+"&rebateStandard="+proDetailManage.rebateStandard+
            "&effectiveEndDateStr="+proDetailManage.effectiveEndDateStr+"&createTimeStartStr=" + proDetailManage.createTimeStartStr + "&createTimeEndStr="+proDetailManage.createTimeEndStr+"&btnFlag=1&goodsCode="+proDetailManage.goodsCode+"&proType="+proDetailManage.proType+
            "&purchaseChannelName="+proDetailManage.purchaseChannelName+"&entId="+proDetailManage.entId+"&secAuditTimeStartStr="+proDetailManage.secAuditTimeStartStr+"&secAuditTimeEndStr="+proDetailManage.secAuditTimeEndStr;
    }
}
function exprosubmitGoodsForm() {
    var proDetailManage = queryConditions();
    if(proDetailManage){
        window.location.href=basePath+"/pro/export?proNo="+proDetailManage.proNo+"&firstPartyName="+proDetailManage.firstPartyName+"&whetherActivity="+proDetailManage.whetherActivity+"&businessSignName=" +proDetailManage.businessSignName+
            "&purchaseChannel="+proDetailManage.purchaseChannel + "&secondPartyName="+proDetailManage.secondPartyName+"&effectiveStartDateStr="+proDetailManage.effectiveStartDateStr+"&proLeaderName="+proDetailManage.proLeaderName+"&rebateStandard="+proDetailManage.rebateStandard+
            "&effectiveEndDateStr="+proDetailManage.effectiveEndDateStr+"&createTimeStartStr=" + proDetailManage.createTimeStartStr + "&createTimeEndStr="+proDetailManage.createTimeEndStr+"&btnFlag=3&goodsCode="+proDetailManage.goodsCode+"&proType="+proDetailManage.proType+"&purchaseChannelName="+
            proDetailManage.purchaseChannelName+"&entId="+proDetailManage.entId+"&secAuditTimeStartStr="+proDetailManage.secAuditTimeStartStr+"&secAuditTimeEndStr="+proDetailManage.secAuditTimeEndStr;
    }
}

function updatePagerIcons(table) {
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
};
//更新分页按钮
function updatePagerIcons(table) {
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    var replacement =
        {
            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
        };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
        if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
    })
};

function getCurrentTime(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate;
}

//返利计算
function rebateAdjust(proId) {
	var rowData = $('#grid-table').jqGrid('getRowData',proId);
	var rebateAdjustAmount = rowData.rebateAdjustAmount;
	var rebateAdjustNote = rowData.rebateAdjustNote;
	//弹出层
	top.dialog({
		url: basePath+'/pro/rebateAdjust',
		title: '返利核算金额管理',
		width:400,
    	height:250,
    	data: {proId:proId,rebateAdjustAmount:rebateAdjustAmount,rebateAdjustNote:rebateAdjustNote}, // 给modal 要传递的 的数据
		onclose: function() {
			var data = this.returnValue;
			if (data) {
				if (data.code == 0) {
					btn_alertDialog('提示','"返利金额核算"提交成功！');
					//修改列表里面的值
					$("#grid-table").jqGrid('setCell',proId,"rebateAdjustAmount",data.rebateAdjustAmount);
					$("#grid-table").jqGrid('setCell',proId,"rebateAdjustNote",data.rebateAdjustNote);
				} else {
					btn_alertDialog('提示',data.msg);
				}
			}
		},
		oniframeload: function() {
		}
	})
	.showModal();
}

//返利计算
function rebateCalculate(proId) {
	btn_alertDialog('提示','计算中，请耐心等待，不要重复点击...');
	//提交修改
	$.post(basePath+"/pro/rebateCalculate?proId="+proId,'', function(data) {
	  if (data.code == 0) {
		  btn_alertDialog('提示','计算成功');
		  //修改列表里面的值
		  $("#grid-table").jqGrid('setCell',proId,"businessRebateAmount",data.result.businessRebateAmount);
		  $("#grid-table").jqGrid('setCell',proId,"nichtwareRebateAmount",data.result.nichtwareRebateAmount);
		  $("#grid-table").jqGrid('setCell',proId,"productRebateAmount",data.result.productRebateAmount);
		  $("#grid-table").jqGrid('setCell',proId,"totalRebateAmount",data.result.totalRebateAmount);
	  } else {
		  btn_alertDialog('提示',data.msg);
	  }
	});
}


var myGrid2 = $("#grid-table2");
$("#gview_"+myGrid2[0].id).hide();
//点击协议查询商品
function salesitemDetil(bianhao) {
    if(bianhao){
        proId =bianhao;
        $("#grid-table2").jqGrid('setGridParam', {
            postData: {
                'proId': bianhao
            }
        }).trigger('reloadGrid');
    }
}


    $("#grid-table2").jqGrid({

        url : basePath+'/pro/findGoodsByProId',
        sortable: true,
        width: '100%',
        height: "auto",
        datatype : "json",
        colNames:  ['协议key','协议编号','协议甲方','创建日期','生效日期','结束日期','协议类型','购进渠道','商品编码','商品名称','规格','生产厂家','供货价','出库价','零售价','返利标准','任务量','返利规则','阶梯条件计算方式','返利计算规则','黑白名单','区域范围设置','客户范围设置','返利兑付方式','返利兑付时间','是否活动协议','经办人','协议负责人'],
        colModel: [
            {
                name: 'productKey',//
                index: 'productKey',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                hidden:true,
            },{
                name: 'proNo',//
                index: 'proNo',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(cellvalue){
                    var str='<a href="javascript:void(0);" class="proCode">'+cellvalue+'</a>';
                    return str;
                }
            },{
                name: 'firstPartyName',//协议甲方
                index: 'firstPartyName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'createTime',//创建日期
                index: 'createTime',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'effectiveStartDate',//生效日期
                index: 'effectiveStartDate',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },{
                name: 'effectiveEndDate',//结束日期
                index: 'effectiveEndDate',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd');}
            },{
                name: 'proType',//协议类型
                index: 'proType',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "一级协议";
                    }else if(value == 2){
                        return "二级协议";
                    }else if(value == 3){
                        return "临时协议";
                    }else if(value == 4){
                        return "商业供货协议";
                    }else if(value == 5){
                        return "代理商协议";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'purchaseChannelName',//购进渠道
                index: 'purchaseChannelName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'goodsCode',//商品编码
                index: 'goodsCode',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'goodsName',//商品名称
                index: 'goodsName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'goodsSpec',//商品规格
                index: 'goodsSpec',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                key:true,
                align:'center',
            },{
                name: 'manufacturer',//商品厂家
                index: 'manufacturer',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            },{
                name: 'supplyTaxPrice',//甲方类型
                index: 'supplyTaxPrice',
                align:'center',
            },{
                name: 'outTaxPice',//甲方类型
                index: 'outTaxPice',
                editable: false,//是否可编辑
                align:'center',

            },{
                name: 'retailTaxPrice',//甲方类型
                index: 'retailTaxPrice',
                editable: false,//是否可编辑
                align:'center',

            },{
                name: 'rebateStandard',//
                index: 'rebateStandard',
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "销售";
                    }else if(value == 2){
                        return "购进";
                    }else if(value == 3){
                        return "付款金额";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'taskNumStr',
                index: 'taskNumStr',
                width: 150,//宽度
                align:'center',
            },{
                name: 'setItems',
                index: 'setItems',
                width: 150,//宽度
                align:'center',
            },{
                name: 'ladderComputeType',//协议任务状态
                index: 'ladderComputeType',
                width: 150,//宽度
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "覆盖";
                    }else if(value == 2){
                        return "叠加";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'rebateComputeRule',//协议任务状态
                index: 'rebateComputeRule',
                width: 150,//宽度
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "汇总计算";
                    }else if(value == 2){
                        return "按单计算";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'listType',//协议任务状态
                index: 'listType',
                align:'center',
                formatter:function(value,options,row){
                    if(value == 2){
                        return "黑名单";
                    }else if(value == 1){
                        return "白名单";
                    }else{
                        return "无";
                    }
                }
            },{
                name: 'areaName',//协议任务状态
                index: 'areaName',
                align:'center',
            },{
                name: 'customerName',//协议任务状态
                index: 'customerName',
                align:'center',
            },{
                name: 'cashType',//返利兑付方式
                index: 'cashType',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "支票";
                    }else if(value == 2){
                        return "电汇";
                    }else if(value == 3){
                        return "3个月承兑";
                    }else if(value == 4){
                        return "6个月承兑";
                    }else if(value == 5){
                        return "票折";
                    }else if(value == 6){
                        return "其他";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'cashTime',//返利兑付时间
                index: 'cashTime',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "协议生效月起";
                    }else if(value == 2){
                        return "协议完结月起";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'isActivity',//协议责任人
                index: 'isActivity',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(value == 1){
                        return "是";
                    }else if(value == 0){
                        return "否";
                    }else{
                        return "";
                    }
                }
            },{
                name: 'businessSignName',//协议责任人
                index: 'businessSignName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
                formatter:function(value,options,row){
                    if(row.isActivity == 1){
                        return value;
                    }else{
                        return "";
                    }
                }
            }
            ,{
                name: 'proLeaderName',//协议责任人
                index: 'proLeaderName',
                width: 150,//宽度
                editable: false,//是否可编辑
                edittype: "select",
                align:'center',
            }
        ],
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        shrinkToFit:false,
        altRows: true,//设置为交替行表格,默认为false
        multiselect: false,//是否多选
        multiboxonly: false,//是否只能点击复选框多选
        autowidth: true,//自动宽
        mtype : "post",
        viewrecord : true,
        sortname : 'item',
        jsonReader : {
            root:"result"
        },
        viewrecords : true,
        sortorder : "asc",
        onSelectRow:function(id){

            var rowData = $("#grid-table2").jqGrid('getRowData',id);
            //var danjupiaohao = rowData.danjubianhao;
            var subRowDa = rowData;
            if(subRowDa != null){
                sub_row_datas = subRowDa;
            }

        },
        loadComplete:function(){

        }}).navGrid('#grid-table2', {
        add : false,
        edit : false,
        del : false
    });
$(function(){
    var filtInput2=$("#filterName2"),
        filtrkolumn2=$("#filtrkolumn2");

    if (filtInput2.length) {
        filtName2(filtInput2);
    }
    if (filtrkolumn2.length) {
        showColumnDialog2(filtrkolumn2);
    };
})

function filtName2(filtInput) {
    filtInput.keyup(function(){
        $('table tbody tr').hide()
            .filter(":contains('" +($(this).val()) + "')").show();
    }).keyup();
}

function showColumnDialog2(element) {
    element.click(function(){
        $("#grid-table2").jqGrid('setColumns', { modal: true, saveicon: false, closeicon: false, left: "220", top: "-5", colnameview: false});
    })
}

jQuery("#grid-table2").jqGrid('bindKeys', {"onEnter":function( rowid ) { alert("你enter了一行， id为:"+rowid)} } );
