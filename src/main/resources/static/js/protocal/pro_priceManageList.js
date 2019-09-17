
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";

$(document).ready(function () {
    var companyName='';
    var goodsIds = '';
    var entId = '';
    var companyId = '';
    $("#queryBtn").on('click',function () {
        var datas = getSeleteValue();
        if(!datas){
            btn_alertDialog("提示","返利使用不能大于单品返利");
            return false;
        }
        var proGoodsFloooerVo = {};
        proGoodsFloooerVo.proGoodsFloooers=datas;
        var ds = JSON.stringify(proGoodsFloooerVo);
        if(entId == ''){
            entId = $("#branchCompanyCode").val();
        }
        if(companyName == ''){
            companyName = $("#branchCompany").val();
        }
        if(companyId == ''){
            companyId = $("#branchCompanyId").val();
        }
        if(entId == ''){
            btn_alertDialog("提示","分公司不能为空");
            return false;
        }
        if(goodsIds == ''){
            btn_alertDialog("提示","商品不能为空");
            return false;
        }


        $.ajax({
            type: "POST",
            url: "addAndUpdatePrice?entId="+entId+"&goodsCodes="+goodsIds+"&companyId="+companyId+"&companyName="+companyName ,
            data: ds,
            dataType: "json",
            contentType : 'application/json;charset=UTF-8',
            success: function(data){
                if(data.code == 0){
                    lodeGoodsPriceList(data.result);
                }else {
                    btn_alertDialog("提示",data.msg);
                    lodeGoodsPriceList();
                }

            }
        });
    });
    function getSeleteValue(){
        var datas = [];
        var firstPartyType_one = $("#firstPartyType_one").val();
        var goodRebate_one = $("#goodRebate_one").val();
        var is_task_pro_one = $("#is_task_pro_one").val();
        var rebayeUse_one = $("#rebayeUse_one").val();
        var isSelect_o = $("#pro_type_one").is(':checked');
        var yiji = {};
        if(goodRebate_one <= rebayeUse_one){
            btn_alertDialog("提示","一级协议返利使用不能大于单品返利")
            return false;
        }
        if (isSelect_o){
            yiji.isSelect=1;
        } else {
            yiji.isSelect=0;
        }
        yiji.proType=1;
        yiji.firstPartyType=firstPartyType_one;
        yiji.goodRebate=goodRebate_one;
        yiji.isTask=is_task_pro_one;
        yiji.rebateUse=rebayeUse_one;
        datas.push(yiji);
        var firstPartyType_tow = $("#firstPartyType_tow").val();
        var goodRebate_tow = $("#goodRebate_tow").val();
        var is_task_pro_tow = $("#is_task_pro_tow").val();
        var rebayeUse_tow = $("#rebayeUse_tow").val();
        var isSelect_to = $("#pro_type_tow").is(':checked');
        var erji ={};
        if(goodRebate_tow <= rebayeUse_tow){
            btn_alertDialog("提示","二级协议返利使用不能大于单品返利")
            return false;
        }
        if (isSelect_to){
            erji.isSelect=1;
        } else {
            erji.isSelect=0;
        }
        erji.proType=2;
        erji.firstPartyType=firstPartyType_tow;
        erji.goodRebate=goodRebate_tow;
        erji.isTask=is_task_pro_tow;
        erji.rebateUse=rebayeUse_tow;
        datas.push(erji);
        var firstPartyType_t = $("#firstPartyType_t").val();
        var goodRebate_t = $("#goodRebate_t").val();
        var is_task_pro_t = $("#is_task_pro_t").val();
        var rebayeUse_t = $("#rebayeUse_t").val();
        var isSelect_t = $("#pro_type_t").is(':checked');
        if(goodRebate_t <= rebayeUse_t){
            btn_alertDialog("提示","商业供货协议返利使用不能大于单品返利")
            return false;
        }
        var shangye ={};
        if (isSelect_t){
            shangye.isSelect=1;
        } else {
            shangye.isSelect=0;
        }
        shangye.proType=4;
        shangye.firstPartyType=firstPartyType_t;
        shangye.goodRebate=goodRebate_t;
        shangye.isTask=is_task_pro_t;
        shangye.rebateUse=rebayeUse_t;

        datas.push(shangye);
        var firstPartyType_d = $("#firstPartyType_d").val();
        var goodRebate_d = $("#goodRebate_d").val();
        var is_task_pro_d = $("#is_task_pro_d").val();
        var rebayeUse_d = $("#rebayeUse_d").val();
        var isSelect_d = $("#pro_type_d").is(':checked');
        if(goodRebate_d <= rebayeUse_d){
            btn_alertDialog("提示","代理商协议返利使用不能大于单品返利")
            return false;
        }
        var daili ={};
        if (isSelect_d){
            daili.isSelect=1;
        } else {
            daili.isSelect=0;
        }
        daili.proType=5;
        daili.firstPartyType=firstPartyType_d;
        daili.goodRebate=goodRebate_d;
        daili.isTask=is_task_pro_d;
        daili.rebateUse=rebayeUse_d;
        datas.push(daili);
        var firstPartyType_l = $("#firstPartyType_l").val();
        var goodRebate_l = $("#goodRebate_l").val();
        var is_task_pro_l = $("#is_task_pro_l").val();
        var rebayeUse_l = $("#rebayeUse_l").val();
        var is_activity_pro_l = $("#is_activity_pro_l").val();
        var isSelect_l = $("#pro_type_l").is(':checked');
        if(goodRebate_l <= rebayeUse_l){
            btn_alertDialog("提示","临时协议返利使用不能大于单品返利")
            return false;
        }
        var linshi ={};
        if (isSelect_l){
            linshi.isSelect=1;
        } else {
            linshi.isSelect=0;
        }
        linshi.proType=3;
        linshi.firstPartyType=firstPartyType_l;
        linshi.goodRebate=goodRebate_l;
        linshi.isTask=is_task_pro_l;
        linshi.rebateUse=rebayeUse_l;
        linshi.isActivity = is_activity_pro_l;
        datas.push(linshi);
        return datas;
    }
    //重置
    $("#resetBtn").on('click',function(){
        //$("#firstPartyType_one").val('');
        $("#goodRebate_one").val('');
        $("#is_task_pro_one").val(0);
        $("#rebayeUse_one").val('');
        $("#goodRebate_tow").val('');
        $("#is_task_pro_tow").val(0);
        $("#rebayeUse_tow").val('');
        $("#goodRebate_t").val('');
        $("#is_task_pro_t").val(0);
        $("#rebayeUse_t").val('');
        $("#goodRebate_d").val('');
        $("#is_task_pro_d").val(0);
        $("#rebayeUse_d").val('');
        $("#goodRebate_l").val('');
        $("#is_task_pro_l").val(0);
         $("#rebayeUse_l").val('');
         $("#is_activity_pro_l").val(0);
         $("#pro_type_l").attr("checked",false);
        $("#pro_type_d").attr("checked",false);
        $("#pro_type_t").attr("checked",false);
        $("#pro_type_tow").attr("checked",false);
        $("#pro_type_one").attr("checked",false);
    });

    //搜索分公司
    $("#searchProvider").on("dblclick",function(){
        top.dialog({
            url: basePath+'/message/aadCompany',
            title:'分公司表单',
            width:700,
            height:500,
            // data: "1", // 给modal 要传递的 的数据
            onclose: function() {
                if(this.returnValue) {
                    var data=this.returnValue;
                    entId = data.entId;
                    companyId = data.id;
                    companyName =  data.companyName;
                    $('#remark').focus();

                    $('#branchCompanyCode').val( data.entId);
                    $('#branchCompany').val( data.companyName);
                    $('#branchCompanyId').val( data.id);
                }
            },
            oniframeload: function() {
                //console.log('iframe ready')
            }
        }).showModal();
    });
    //  搜索厂家
    // $("#searchChangshang").on("dblclick",function(){
    //     var companyId = $("#branchCompanyId").val();
    //     if(companyId == '' || companyId == null){
    //         btn_alertDialog("提示","请选择分公司")
    //         return false;
    //     }
    //     top.dialog({
    //         url: basePath+'/price/searchFactory',
    //         title:'厂家表单',
    //         width:900,
    //         height:500,
    //         data: companyId, // 给modal 要传递的 的数据
    //         onclose: function() {
    //             if(this.returnValue) {
    //                 var data=this.returnValue;
    //                 factoryIds = data;
    //
    //             }
    //         },
    //         oniframeload: function() {
    //             //console.log('iframe ready')
    //         }
    //     }).showModal();
    // });

    //搜索商品
    $("#searchGoodsCode").on("dblclick",function(){
        var entId = $("#branchCompanyCode").val();
        if(entId == '' || entId == null){
            btn_alertDialog("提示","请选择分公司")
            return false;
        }
        top.dialog({
            url: basePath+'/price/searchGoods',
            title:'商品表单',
            width:1200,
            height:600,
            data: entId, // 给modal 要传递的 的数据
            onclose: function() {
                if(this.returnValue) {
                    var data=this.returnValue;
                    goodsIds =data;
                }
            },
            oniframeload: function() {
                //console.log('iframe ready')
            }
        }).showModal();
    });
    $("#pro_all_type").on('change',function(){
        var aa = $("#pro_all_type").is(':checked');
        if(aa){

            $("#pro_type_l").prop("checked",true);
            $("#pro_type_d").prop("checked",true);
            $("#pro_type_t").prop("checked",true);
            $("#pro_type_tow").prop("checked",true);
            $("#pro_type_one").prop("checked",true);
        }else {
            $("#pro_type_l").prop("checked",false);
            $("#pro_type_d").prop("checked",false);
            $("#pro_type_t").prop("checked",false);
            $("#pro_type_tow").prop("checked",false);
            $("#pro_type_one").prop("checked",false);
        }
    });
    function lodeGoodsPriceList(grid_data){
        $("#grid-table").jqGrid({
            sortable: true,
            datatype: "local", //数据来源，本地数据（local，json,jsonp,xml等）
            height: "auto",//高度，表格高度。可为数值、百分比或'auto'
            //mtype:"GET",//提交方式
            colNames: ['商品编号',"商品名称","商品规格","商品厂家","商品品牌厂商","分公司","最近一次购进含税单价","商品底价"],
            colModel: [{
                name: 'goodsCode',
                index: 'goodsCode',
                key:true,
                width:70,
                align:'center',
            },{
                name: 'goodsName',
                index: 'goodsName',//索引。其和后台交互的参数为sidx
                //align:'center',
                key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略

            },{
                name: 'goodsSpec',
                index: 'goodsSpec',//索引。其和后台交互的参数为sidx
                key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                width:90,
                align:'center',
            },{
                name: 'manufacturer',
                index: 'manufacturer',//索引。其和后台交互的参数为sidx
                key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                //align:'center',
            },{
                name: 'pinpai',
                index: 'pinpai',//索引。其和后台交互的参数为sidx
                key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                //align:'center',
            },{
                    name: 'companyName',
                    index: 'companyName',//索引。其和后台交互的参数为sidx
                    key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                    //align:'center',
                }
                ,{
                    name: 'hanshuiPrice',
                    index: 'hanshuiPrice',//索引。其和后台交互的参数为sidx
                    key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                    width:90,
                    align:'center',
                }
                ,{
                    name: 'goodsPrice',
                    index: 'goodsPrice',//索引。其和后台交互的参数为sidx
                    key: false,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                    align:'center',
                    width:50,
                }
            ], onSelectRow:function(){

            },

            viewrecords: true,//是否在浏览导航栏显示记录总数
            rowNum: -1,//每页显示记录数
            // rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
            //pager: pager_selector,//分页、按钮所在的浏览导航栏
            altRows: true,//设置为交替行表格,默认为false
            multiselect: false,//是否多选
            multiboxonly: false,//是否只能点击复选框多选
            autowidth: true,//自动宽
        });
        $("#grid-table").jqGrid("clearGridData");
        $.each(grid_data,function (i,e){
            $("#grid-table").jqGrid('addRowData',i+1,e);
        })

    };

});

