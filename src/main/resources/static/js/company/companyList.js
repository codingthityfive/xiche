var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
$.jgrid.col = {caption: "筛选列", bSubmit: "确定", bCancel: "取消"};

function showColumnDialog() {
    $("#grid-table").jqGrid('setColumns', {modal: true});
}

$(document).ready(function () {
    var lastsel;
    $("#grid-table").jqGrid({
        url: "pageList",
        jsonReader: {
            root: "result.list",
            page: "result.pageNum",
            total: "result.pages",
            records: "result.total"
        },
        sortable: true,
        datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
        height: "auto",//高度，表格高度。可为数值、百分比或'auto'
        //mtype:"GET",//提交方式
        colNames: ['ID', '分公司名称', '时空ID', '状态'],
        colModel: [
            {
                name: 'id',
                index: 'id',//索引。其和后台交互的参数为sidx
                key: true,//当从服务器端返回的数据中没有id时，将此作为唯一rowid使用只有一个列可以做这项设置。如果设置多于一个，那么只选取第一个，其他被忽略
                align: "center",
                editable: false,
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
            {
                name: 'companyName',
                index: 'companyName',//索引。其和后台交互的参数为sidx
                width: 200,
                editable: false,
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
            {
                name: 'entId',
                index: 'entId',//索引。其和后台交互的参数为sidx
                width: 200,
                editable: false,
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
            {
                name: 'status',
                index: 'status',//索引。其和后台交互的参数为sidx
                editable: false,
                editoptions: {
                    size: "20",
                    maxlength: "30"
                },
                formatter: function (cellvalue) {
                    var str = '';
                    if (cellvalue == '1') {
                        str = "可用";
                    }else{
                        str = "禁用";
                    }
                    return str;
                }
            }
            /*,{
                name: 'operate',
                index: 'operate',
                width: 300,
                formatter: function (value, grid, rows, state) {
                    var btn = '';
                    // if ($("#company_edit").val()) {
                        btn = btn + '<button class="btn btn-white" onclick="toUpdate(\'' + rows.id + '\');">编辑</button>';
                    // }
                    return btn;
                }
            }*/
        ],
        viewrecords: true,//是否在浏览导航栏显示记录总数
        rowNum: 10,//每页显示记录数
        rowList: [10, 20, 30],//用于改变显示行数的下拉列表框的元素数组。
        pager: pager_selector,//分页、按钮所在的浏览导航栏
        altRows: true,//设置为交替行表格,默认为false
        //toppager: true,//是否在上面显示浏览导航栏
        multiselect: false,//是否多选
        multiboxonly: true,//是否只能点击复选框多选
        loadComplete: function () {
            var table = $(this);
            setTimeout(function () {
                updatePagerIcons(table);
            }, 0);
        },
       /* onSelectRow: function (id) {
            if (id) {
                var cellValue = $("#grid-table").getCell(id, "status");//获取某个单元格的值
                $("#toEdit").attr("href", "addProduct.shtml?id=" + id);
                $("#toEdit").attr("data-status", cellValue);
            } else {
                $(".toEdit").attr("href", "javascript:;");
            }
        },*/
        autowidth: true, //自动宽
        loadComplete: function () {
            var table = $(this);
            setTimeout(function () {
                updatePagerIcons(table);
            }, 0);
        },
    });


    /**
     * 编辑
     * @param id
     * @returns {boolean}
     */
      $("#toEdit").click(function() {
          var id = $("#grid-table").jqGrid('getGridParam', 'selrow');
          if(id == null || id == ''){
              btn_alertDialog("提示","请选择要修改的公司");
              return;
          }
           top.dialog({
               url: basePath+'/company/toUpdate?id='+id,
               title: '编辑分公司',
               width:900,
               height:330,
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

    /**
     * 新增
     */
    $("#toAdd").click(function() {
        var id = $("#grid-table").jqGrid('getGridParam', 'selrow');
        top.dialog({
            url: basePath+'/company/toAdd',
            title: '新增分公司',
            width:900,
            height:330,
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


    function  reload() {
        // var changjia = $("#changjia").val();
        // changjia = changjia.replace(/\s+/g,"");
        // var userName = $("#username").val();
        // userName = userName.replace(/\s+/g,"");
        // var phone = $("#phone").val();
        // phone = phone.replace(/\s+/g,"");
        $("#grid-table").jqGrid('setGridParam', {
            postData: {
                // "changjia": changjia,//厂家名
                // "factoryType":$("#facType").val(),//厂家类型
                // "username": userName,//姓名
                // "phone": phone,//手机号码
                // "isuse": $("#isuse").val()//状态
            },page:1
        }).trigger('reloadGrid');
    }



    /*  $("#toAdd").click(function() {
          top.dialog({
              url: basePath+'/changjia/toAdd',
              title: '新增厂家',
              width:1100,
              height:550,
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
      });*/


    /**
     * 导出
     */
    /* $("#exportExcel").click(function() {
         var changjia = $("#changjia").val();
         var username = $("#username").val();
         var phone = $("#phone").val();
         var isuseFlag = $("#isuse").val();
         var isuse;
         if(isuseFlag==1){
             isuse = true;
         }else{
             isuse = false;
         }
         var user= {};
         user.changjia = changjia;
         user.username = username;
         user.phone = phone;
         user.isuse = isuse;
         window.location="exportExcel?changjia="+changjia+"&username="+username+"&phone="+phone+"&isuse="+isuseFlag;
     });*/


    /* $("#queryBtn").click(function(){
         reload();
     });*/

    /**
     * 批量操作
     * @returns
     */
    /*   $("#batchHandle").click(function(){
           var ids = $("#grid-table").jqGrid("getGridParam", "selarrrow");
           if(ids.length<=0){
               btn_alertDialog("提示","请选择批处理条目");
           }else{
               //弹出批量处理弹框
               top.dialog({
                   url: basePath+'/changjia/toBatch?userIds='+ids,
                   title: '批量操作',
                   width:1100,
                   height:550,
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
           }
       });*/
});






