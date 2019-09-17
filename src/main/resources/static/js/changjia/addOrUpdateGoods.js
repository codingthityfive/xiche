var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
var goods=[];
$(document).ready(function () {
    var dialog = top.dialog.get(window);
    var lastsel;
    $("#grid-table").jqGrid({
        url: "query",
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
        colNames: [ '商品编号','商品名称', '规格', '生产厂家','品牌厂家','销售状态','库存'],
        colModel: [{
            name: 'goodsCode',
            index: 'goodsCode',
            key:true
        }, {
            name: 'goodsName',
            index: 'goodsName',
        }, {
            name: 'goodsSpec',
            index: 'goodsSpec',
        }, {
            name: 'manufacturer',
            index: 'manufacturer',
        },{
            name: 'pinpaichangjia',
            index: 'pinpaichangjia',

        },{
            name: 'allStock',
            index: 'allStock',
            width:115,
            formatter:function(cellvalue){
                var str='';
                if(parseInt(cellvalue)>0){
                    str='在售';
                }else{
                    str='售罄';
                }
                return str;
            }
        }
        ,{
            name: 'allStock',
            index: 'allStock',
            hidden:true,
        }
//        ,{
//            name: 'beActive',
//            index: 'beActive',
//            formatter:function(cellvalue, options, rowObject){
//                var str='';
//                if(cellvalue=='Y'){
//                    str='在售';
//                }else{
//                    str='售罄';
//                }
//                return str;
//            }
//        }
        ],loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        onSelectRow:function(id){
        	if(id){
        		var cellValue=$("#grid-table").getCell(id,"status");//获取某个单元格的值
        		$("#toEdit").attr("href","addProduct.shtml?id="+id);
        		$("#toEdit").attr("data-status",cellValue);
        	}else{
        		$(".toEdit").attr("href","javascript:;");
        	}
        },
        autowidth: true, //自动宽
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
    });


    $("#queryBtn").click(function(){
    	debugger;
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "goodsName": $("#goodsName").val(),
                "goodsCode": $("#goodsCode").val(),
                "beActive" : $("#beActive").val(),//标签名
                "pinpai" : $("#pinpaichangjia").val(),
                "manufacturer" : $("#manufacturer").val(),
                
                // "date" : $("#date").val()//标签名
            },page:1
        }).trigger('reloadGrid');
    });
    
    $("#resetBtn").click(function(){
        $("#goodsName").val("");
        $("#goodsCode").val("");
        $("#beActive").val("");
        $("#pinpaichangjia").val("");
        $("#manufacturer").val("");
        // $("#batchCode").val("");//标签名
        // $("#date").val("");
        window.location.href=basePath+'/custom/addGoods'
    });

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


    function  reload() {
    $("#grid-table").jqGrid('setGridParam', {
        postData: {
            "factoryCode": $("#factoryCode").val(),
            "factoryName": $("#factoryName").val()
        },page:1
    }).trigger('reloadGrid');
}


    $("#xuanze_goods_btn").click(function () {
        var ids = $("#grid-table").jqGrid('getGridParam','selarrrow');
        for(var i=0;i<ids.length;i++){
            var id = ids[i];
            var celldata = $("#grid-table").jqGrid('getRowData',id);
            goods.push(celldata);
        }
        dialog.close(goods);
        dialog.remove();
    })
    $("#model_close_btn").click(function () {
        dialog.close().remove()
    });

});



