var goods=[];
$(document).ready(function () {
    var dialog = top.dialog.get(window);
    var factoryCode =dialog.data;
    $("#addOrUpdateGoods_btn").click(function() {
        top.dialog({
            url: basePath+'/custom/addGoods',
            title: '增加商品',
            width:1000,
            height:600,
            data: 'val值', // 给modal 要传递的 的数据
            onclose: function() {
                if(this.returnValue) {
                    var datas=this.returnValue;
                    htmlGoods(datas);
                }
            }
        }).showModal();
        return false;
    });
    function htmlGoods(datas) {
        var codes=[];
        var tr = document.getElementsByClassName("goods");
        if(tr.length >1){
            for(var i=0;i<tr.length; i++){
                var thiz = tr[i];
                var data={};
                var goodsCode = $(thiz).attr('data');
                var istrue = $(thiz).find('.checkboxs').prop('checked');
                if(istrue){
                    data.goodsCode = goodsCode;
                    codes.push(data);
                }
            }
        }
        for(var i=0;i<datas.length;i++){
            var data = datas[i];
            if(codes.length>0){
                for(var j=0;j<codes.length;j++){
                    if(codes[j].goodsCode == data.goodsCode){
                        datas.splice(i,1);
                    }
                }
            }
        }


        var arrdss = $("#yixuan_goods_list");
        var htmls ='';
        for(var i=0;i<datas.length;i++){
        	var tcbz = 0;
            var data = datas[i];
            if(codes.length>0){
                for(var j=0;j<codes.length;j++){
                    if(codes[j].goodsCode == data.goodsCode){
                    	tcbz = 1;
                    	break;
                    }
                }
            }
            if(tcbz == 0){
            	 htmls +='<tr class="goods" data="'+data.goodsCode+'">';
                 htmls += '<td style="width:50px"><input class="checkboxs" type="checkbox" checked></td>';
                 htmls += '<td style="width:200px"> '+data.goodsCode+'</td>';
                 htmls += '<td style="width:200px">'+data.goodsName+'</td>';
                 htmls += '<td style="width:100px">'+data.goodsSpec+'</td>';
                 htmls += '<td style="width:200px">'+data.manufacturer+'</td>';
                 htmls += '<td style="width:200px">'+data.pinpaichangjia+'</td>';
                 if(data.allStock == 0){
                     htmls += '<td style="width:100px">售罄</td>';
                 }else {
                     htmls += '<td style="width:100px">在售</td>';
                 }
                 htmls +='</tr>';
            }
        }
        arrdss.append(htmls);
    }

    $("#model_close_btn").click(function () {
        goods.splice(0,goods.length);
        dialog.close().remove()
    });

    $("#model_btn_addgoods").click(function () {
        var tr = document.getElementsByClassName("goods");

        if(factoryCode){
            if(tr.length <1){
                btn_alertDialog("提示","请至少选择一个商品");
                return false;
            }else {
                for(var i=0;i<tr.length; i++){
                    var thiz = tr[i];
                    var data={};
                    var goodsCode = $(thiz).attr('data');
                    var istrue = $(thiz).find('.checkboxs').prop('checked');
                    if(istrue){
                        data.goodsCode = goodsCode;
                        data.factoryCode = factoryCode;
                        goods.push(data);
                    }
                }
            }
            var customFactroyList = {};
            customFactroyList.list =goods;

            $.ajax({
                type: "POST",
                url: basePath+'/custom/addGoodsCodes?factoryCode='+factoryCode ,
                data: JSON.stringify(customFactroyList),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(datas){
                    if(datas.code == 0){
                        btn_alertDialog("提示","操作成功");
                        goods.splice(0,goods.length);
                        dialog.close();
                        dialog.remove();
                    }else {
                        btn_alertDialog("提示","操作失败");
                        goods.splice(0,goods.length);
                    }

                },
                error : function(responseStr) {
                    goods.splice(0,goods.length);
                    btn_alertDialog("提示","操作失败");
                }
            });
        }
    });



    getSelectedProduct(factoryCode)
});

function getSelectedProduct(factoryCode) {
    if(factoryCode){
        $.ajax({
            type: "POST",
            url: basePath+'/custom/getSelectedProductByCodes?factoryCode='+factoryCode ,
            //data: JSON.stringify(customFactroyList),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(datas){
                if(datas){
                    htmlSelectedGoods(datas);
                }else {
                    btn_alertDialog("提示","查询已关联商品失败");
                }
            },
            error : function(datas) {
                if(datas){

                }else {
                    btn_alertDialog("提示","查询已关联商品失败");
                }

            }
        });
    }
    
}

function htmlSelectedGoods(datas) {

    var arrdss = $("#yixuan_goods_list");
    var htmls ='';
    for(var i=0;i<datas.length;i++){
        var data = datas[i];
        // data.factoryCode = factoryCode;
        // goods.push(data);
        htmls +='<tr class="goods" data="'+data.goodsCode+'">';
        htmls += '<td style="width:50px"><input class="checkboxs" type="checkbox" checked></td>';
        htmls += '<td style="width:200px"> '+data.goodsCode+'</td>';
        htmls += '<td style="width:200px">'+data.goodsName+'</td>';
        htmls += '<td style="width:100px">'+data.goodsSpec+'</td>';
        htmls += '<td style="width:200px">'+data.manufacturer+'</td>';
        htmls += '<td style="width:200px">'+data.pinpaichangjia+'</td>';
        if(data.allStock == 0){
            htmls += '<td style="width:100px">售罄</td>';
        }else {
            htmls += '<td style="width:100px">在售</td>';
        }

        htmls +='</tr>';
    }
    arrdss.append(htmls);
}