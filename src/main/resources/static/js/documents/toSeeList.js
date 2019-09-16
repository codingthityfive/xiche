var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
//function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
	var lastsel;
    var trowid;
    var yijian;
    
    $("#grid-table").jqGrid({    	
    	url: "/manage/actDocuments/queryProduct?activId=" + $("#id").text(),
        jsonReader : {
            root:"result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式    ,,factory,cl_datetime,,,status,dispose
        colNames: [ '活动商品','库存','活动价格（元）', '活动总量（最小单位）','活动开始时间','活动结束时间'],
        colModel: [{
        	 name: 'goodsCode',
             index: 'goodsCode',
         }, {
             name: 'inventory',
             index: 'inventory',
         }, {
             name: 'activPrice',
             index: 'activPrice',
         }, {
             name: 'activNum',
             index: 'activNum',
         },{
             name: 'startDate',
             index: 'startDate',
             formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
         },{
             name: 'endDate',
             index: 'endDate',
             formatter:function(value,options,row){return new Date(value).Format('yyyy-MM-dd HH:mm:ss');}
         }
         ],
         loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
//        pager: pager_selector,//分页、按钮所在的浏览导航栏
//        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选true
        multiboxonly: false,//是否只能点击复选框多选
        autowidth: true,//自动宽
        rownumbers: true,//自动显示行
        loadComplete: function() {
            var table = $(this);
            setTimeout(function(){
                updatePagerIcons(table);
            }, 0);
        },

//        onSelectRow:function(rowId){
//            var allRowIds = $("#grid-table").jqGrid('getDataIDs'); //  获取表格共有多少行数据
//            var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow"); //  当前 共选中行的数量，多少行
//            console.log(ids) // 当前 选中行 的ids
//            if(ids.length == allRowIds.length ){ //  判断当前选中的行 的数量是否等于 所有行
//                $('#cb_grid-table').click();
//            }
//            trowid=rowId;
//        },       
    
    });
    jQuery("#grid-table").jqGrid('setLabel','rn', '序号', {'text-align':'left'},'');
    $(".btnEdit").click(function() {
        var gr = jQuery("#grid-table").jqGrid('getGridParam', 'selrow');
        console.log(gr);
        if (gr != null) {
            window.location.href = "toUpdate?id=" + gr;
        } else {
            alert("请选择需要编辑的记录");
        }
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
});
