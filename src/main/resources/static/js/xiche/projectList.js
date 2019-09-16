var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = { caption: "筛选列", bSubmit: "确定", bCancel: "取消" };
function showColumnDialog() { $("#grid-table").jqGrid('setColumns', { modal: true }); }
$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "queryProject",
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
        colNames: ['序号','项目名称', '价格','积分'],
        colModel: [{
            name: 'id',
            index: 'id',//索引。其和后台交互的参数为sidx
            key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
            width: 30,
            editable: false,
            editoptions: {
                size: "20",
                maxlength: "30"
            }
        }, {
            name: 'name',
            index: 'name',
            width: 100,//宽度
            editable: false,//是否可编辑
            edittype: "select",//可以编辑的类型。可选值：text, textarea, select, checkbox, password, button, image and file.s
            editoptions: {
                value: "1:采购入库;2:退用入库"
            }
        }, {
            name: 'price',
            index: 'price',
            width: 60,
        }, {
            name: 'point',
            index: 'point',
            width: 60,
        }
//        , {
//            name: 'type',
//            index: 'type',
//            width: 60,
//        }, {
//            name: 'status',
//            index: 'status',
//            width: 60,
//        }
        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: true,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        autowidth: true//自动宽
    });
    /**
     * 编辑
     * @param id
     * @returns {boolean}
     */
      $("#toEdit").click(function() {
          var id = $("#grid-table").jqGrid('getGridParam', 'selrow');
          if(id == null || id == ''){
             alert("请选择要修改的项目！");
              return;
          }
           top.dialog({
               url: '/xiche/toUpdateProject?id='+id,
               title: '编辑项目',
               width:500,
               height:300,
               data: 'val值', // 给modal 要传递的 的数据
               onclose: function() {
                   reload();
               },
               oniframeload: function() {
                   //console.log('iframe ready')
               }
           })
               .showModal();
           return false;
       });

    $("#queryBtn").click(function(){
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                "name": $("#name").val()//标签名
            },page:1
        }).trigger('reloadGrid');
    });

    /**
     * 新增
     */
    $("#toAdd").click(function() {
    	console.info("1111");
        var id = $("#grid-table").jqGrid('getGridParam', 'selrow');
        top.dialog({
            url: '/xiche/toProjectAdd',
            title: '新增项目',
            width:500,
            height:300,
            data: 'val值', // 给modal 要传递的 的数据
            onclose: function() {
                reload();
            },
            oniframeload: function() {
                //console.log('iframe ready')
            }
        })
            .showModal();
        return false;
    });

});