$("#queryBtn").click(function(){
	getAllVender();
});

var cityIds=[];
var companyIds='';
    $(function(){
        //确定按钮
        var dialog = top.dialog.get(window);
        var datas = dialog.data;
        companyIds = datas.companyId;
        //alert(datas.list);
        $("#choose_vender_btn").click(function () {

            //cityIds.splice(0,cityIds.length);
            var checkboxs,origin,target,num=0;
            origin = $('.selected-ul');
            target = $('.unselect-ul');
            checkboxs = origin.find('.checkboxs');
            for(var i=0;i<checkboxs.length;i++){
                if($(checkboxs[i]).prop('checked')){
                    var factoryId = $(checkboxs[i]).attr("data-id");
                    var changJiaMingCheng = $(checkboxs[i]).attr("data-name");
                    //var changJiaBianHao = $(checkboxs[i]).attr("data-bianhao");
                    var ids = {};
                    ids.cjuser=factoryId;
                    ids.changJiaMingCheng = changJiaMingCheng;
                    //ids.changJiaBianHao = changJiaBianHao;
                    cityIds.push(ids);
                }
            }


            dialog.close(cityIds);
            dialog.remove();
        });
        $("#cancel_city_btn").click(function () {
            dialog.close().remove()
        });

        //全选函数
        $('.checkbox-all').click(function(){
            if($(this).prop('checked')){
                $(this).parent().next().find('.checkboxs').prop('checked',true);
            }else{
                $(this).parent().next().find('.checkboxs').prop('checked',false);
            }
        })

        //单个checkbox与全选的关系函数
        $('.select-content').on('click','.checkboxs',function(e){

            var checkedAll = $(this).parents('.select-content').prev().find('.checkbox-all');
            var checkboxs = $(this).prop('checked');
            if(!checkboxs&&checkedAll.prop('checked')){
                checkedAll.prop('checked',false);
            }else if(checkboxs&&!checkedAll.prop('checked')){
                var lis = $(this).parents('ul').children();
                for(var i=0;i<lis.length;i++){
                    if($(lis[i]).find('.checkboxs').prop('checked')){
                        if(i==lis.length-1){
                            checkedAll.prop('checked',true)
                        }
                    }else{
                        break;
                    }
                }
            }
            stopFunc(e);
        });
        $('.select-content').on('click','li',function(){
            $(this).children('.checkboxs').click();
        })

        //左右移按钮点击事件
        $('.arrow-btn').click(function(){
            var checkboxs,origin,target,num=0;
            if($(this).hasClass('right')){
                origin = $('.unselect-ul');
                target = $('.selected-ul');
            }else{
                origin = $('.selected-ul');
                target = $('.unselect-ul');
            }
            checkboxs = origin.find('.checkboxs');
            for(var i=0;i<checkboxs.length;i++){
                if($(checkboxs[i]).prop('checked')){
                    var that = $(checkboxs[i]).parent().clone();
                    that.children('input').prop('checked',true);
                    target.append(that);
                    $(checkboxs[i]).parent().remove();
                }else{
                    num++;
                }
            }
            if(checkboxs.length == num){
                btn_alertDialog("提示",'未选中任何厂家！');
            }else{
                origin.parent().prev().find('.checkbox-all').prop('checked',false);
            }
        })
        getAllVender(datas);
    });


    function stopFunc(e){
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
    }

    function getAllVender(dataslist) {
        var companyId = '';
        if(dataslist){
            companyId = dataslist.companyId;
            if(dataslist.list){
                var liat = dataslist.list;
                $.ajax({
                    type: "GET",
                    url: "chooseVender?factorytype="+$("#changjialeixing").val()+"&changjia="+$("#changjia").val()+"&companyId="+companyId,
                    //data: ,
                    dataType: "json",
                    success: function(datas){
                        var data =datas;
                        var venderAll = "";
                        var yixuanze_all = '';
                        //var listCity=[];
                        for(var i=0;i<data.length;i++){
                            var da = data[i];
                            for(var y=0;y<liat.length;y++){
                                var li = liat[y];
                                if(da.changjiaId == li.factoryId){
                                    //alert(da.changjiaId );
                                    data.splice(i,1);
                                }
                            }
                        }
                        for(var j=0;j<data.length;j++){
                            var da = data[j];
                            venderAll +="<li>";
                            venderAll += '<input type=\"checkbox\"  data-id='+da.id+' data-name='+da.changjia+' class=\"checkboxs\" />';
                            venderAll += '<span>'+da.changjia+'</span>';
                            venderAll += '</li>';
                        }
                        $("#vender_all").html(venderAll);
                        for(var q=0;q<liat.length;q++){
                            var li = liat[q];
                            yixuanze_all +="<li>";
                            yixuanze_all += '<input type=\"checkbox\"  data-id='+li.cjuser+' data-name='+li.changJiaMingCheng+' class=\"checkboxs\" />';
                            yixuanze_all += '<span>'+li.changJiaMingCheng+'</span>';
                            yixuanze_all += '</li>';
                        }
                        $("#yixuanze_all").html(yixuanze_all);
                    }
                });
            }else {
                $.ajax({
                    type: "GET",
                    url: "chooseVender?factorytype="+$("#changjialeixing").val()+"&changjia="+$("#changjia").val()+"&companyId="+companyId,
                    //data: ,
                    dataType: "json",
                    success: function(datas){
                        var data =datas;
                        var venderAll = "";
                        for(var i=0;i<data.length;i++){
                            var da = data[i];
                            venderAll +="<li>";
                            venderAll += '<input type=\"checkbox\" data-id='+da.id+' data-name='+da.changjia+' class=\"checkboxs\" />';
                            venderAll += '<span>'+da.changjia+'</span>';
                            venderAll += '</li>';
                        }
                        $("#vender_all").html(venderAll);
                    }
                });
            }
        }else {
            companyId = companyIds;
            $.ajax({
                type: "GET",
                url: "chooseVender?factorytype="+$("#changjialeixing").val()+"&changjia="+$("#changjia").val()+"&companyId="+companyId,
                //data: ,
                dataType: "json",
                success: function(datas){
                    var data =datas;
                    var venderAll = "";
                    for(var i=0;i<data.length;i++){
                        var da = data[i];
                        venderAll +="<li>";
                        venderAll += '<input type=\"checkbox\" data-id='+da.id+' data-name='+da.changjia+' class=\"checkboxs\" />';
                        venderAll += '<span>'+da.changjia+'</span>';
                        venderAll += '</li>';
                    }
                    $("#vender_all").html(venderAll);
                }
            });
        }



    }




