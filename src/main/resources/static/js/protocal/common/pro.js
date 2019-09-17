/**
 * 公共js
 * @returns
 */
function payCompanyNameFlow() {
    top.dialog({
        url:basePath+ '/pro/getFirstParty?type=3',
        title:'甲方信息查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;

                $('#payCompanyName').val( data.supplyName);
                $('#payCompanyId').val( data.supplyCode);

            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function firstSignerFlow() {
    top.dialog({
        url: basePath+'/first/firstSignerList',
        title:'甲方签订人查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                // providerInfo(data);
                $('#remark').focus();
                // console.log(data);

                $('#firstSignId').val( data.id);
                $('#firstSignName').val( data.contractname);
                $('#contractphone').val( data.contractphone);
                $('#position').val( data.position);

                // if(firstPartyType==1){
                //     $('#firstPartyName').val( data.shengchanchangjia);
                // }else if(firstPartyType==2){
                //     $('#firstPartyName').val( data.pinpaichangjia);
                // }else{
                //     $('#firstPartyName').val( data.supplyName);
                //     $('#firstPartyId').val( data.supplyCode);
                // }
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}



function proLeaderFlow(){
    top.dialog({
        url: basePath+'/first/proLeaderList',
        title:'协议负责人查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                // providerInfo(data);
                $('#remark').focus();
                // console.log(data);

                $('#proLeaderId').val( data.id);
                $('#proLeaderName').val( data.name);

                // if(firstPartyType==1){
                //     $('#firstPartyName').val( data.shengchanchangjia);
                // }else if(firstPartyType==2){
                //     $('#firstPartyName').val( data.pinpaichangjia);
                // }else{
                //     $('#firstPartyName').val( data.supplyName);
                //     $('#firstPartyId').val( data.supplyCode);
                // }
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function proLeaderFlowMore(){
    top.dialog({
        url: basePath+'/first/proLeaderMoreList',
        title:'协议负责人查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                $("#proLeaderName").val(data);
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function firstPartList(firstPartyType,obj) {
    top.dialog({
        url: basePath+'/pro/getFirstParty?type='+firstPartyType,
        title:'甲方信息查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                // providerInfo(data);
                $('#remark').focus();
                // console.log(data);

                //obj是当前双击框的对象，找当前对象的上一个或下一个hidden框，并赋值
                if ($(obj).next() && $(obj).next().attr("type") == "hidden"){
                    $(obj).next().val(data.id);
                }else if ($(obj).prev() && $(obj).prev().attr("type") == "hidden") {
                    $(obj).prev().val(data.id);
                }
                if(firstPartyType==1){
                    $(obj).val( data.shengchanchangjia);
                    if( $('#factory')!=undefined){
                        $('#factory').val(data.shengchanchangjia);
                    }
                }else if(firstPartyType==2){
                    $(obj).val( data.pinpaichangjia);
                }else{
                    $(obj).val(data.supplyName);
                    //找当前对象的上一个或下一个hidden框，并赋值
                    if ($(obj).next() && $(obj).next().attr("type") == "hidden"){
                        $(obj).next().val(data.supplyCode);
                    }else if ($(obj).prev() && $(obj).prev().attr("type") == "hidden") {
                        $(obj).prev().val(data.supplyCode);
                    }
                    if( $('#factory')!=undefined){
                        $('#factory').val(data.supplyName);
                    }
                }
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function proFirstPartyName() {
    top.dialog({
        url: basePath+'/first/proFirstPartyName',
        title:'甲方签订人查询',
        width:w_width,
        height:w_height,
        // data: "1", // 给modal 要传递的 的数据
        onclose: function() {
            /*this.returnValue && $('#input').val(this.returnValue);
            dialog.focus();*/
            if(this.returnValue) {
                var data=this.returnValue;
                // providerInfo(data);
                $('#remark').focus();
                // console.log(data);

                $('#firstSignId').val( data.id);
                $('#firstPartyName').val( data.firstPartyName);
                $('#firstPartyType').val( data.firstPartyType);
//                $('#position').val( data.position);
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}
function proSecondPartyName() {
    top.dialog({
        url: basePath+'/first/proSecondPartyName',
        title:'乙方查询',
        width:w_width,
        height:w_height,
        onclose: function() {
            if(this.returnValue) {
                var data=this.returnValue;
                $('#remark').focus();
                $('#secondPartyName').val('');
                $('#secondPartyName').val(data.secondPartyName);
                $('#entId').val(data.entId);
            }
        },
        oniframeload: function() {
        }
    }).showModal();
}
/**
 * 客户类型选择
 * obj为当前双击的input框对象
 */
function selectClientType(obj) {
    top.dialog({
        url: basePath+'/currency/clientTypeList',
        title: '客户类型',
        width:700,
        height:470,
        data: {roleIds:$("#roleIds").val()},
        onclose: function() {
            var data = this.returnValue;
            if (data) {
                $(obj).val(data.clientTypeNames);
                $(obj).attr("title",data.clientTypeNames);
                //找当前对象上一个对象或下一个对象，并且为hidden框的
                if ($(obj).next() && $(obj).next().attr("type") == "hidden"){
                    $(obj).next().val(data.cilentTypeIds);
                }else if ($(obj).prev() && $(obj).prev().attr("type") == "hidden") {
                    $(obj).prev().val(data.cilentTypeIds);
                }
            }
        },
        oniframeload: function() {
        }
    })
        .showModal();
}

/**
 * 购进渠道
 */
function proPurchaseChannel() {
    top.dialog({
        url: basePath+'/first/proPurchaseChannel',
        title: '购进渠道',
        width:900,
        height:500,
        onclose: function() {
            var data = this.returnValue;
            $('#remark').focus();
            $("#purchaseChannelName").val(data);
        },
        oniframeload: function() {
        }
    }).showModal();
}


/**
 * 获取客户类型的<tr>行数据
 * @returns
 */
function getCustomTypes(){
    var ctypes = "";
    $.ajax({
        url:basePath+"/currency/queryClientTypeList",
        type:"POST",
        dataType:"json",
        async:false,
        success:function(data){
            if(data.code=='0'){
                $.each(data.result,function(i,obj){
                    ctypes += '<tr><td><input type="checkbox" class="cusCh"/>'+(i+1)+
                        '</td><td><input type="hidden" class="cusVal" value="'+obj.value+'"/><span class="cusName">'+obj.name+'</span></td></tr>';
                });
            }else{
                btn_alertDialog("提示",data.msg);
            }
        }
    });
    return ctypes;
}

/**
 * 获取下一级区域,select结构
 */
function getNextDic(dicId){
    var dics = "";
    $.ajax({
        url:basePath+"/currency/ctrlSaleArea",
        type:"POST",
        dataType:"json",
        data:{"pid":dicId},
        async:false,
        success:function(data){
            if(data.code=='0'){
                dics+="<option value='0'>请选择</option>";
                $.each(data.result,function(i,obj){
                    dics+="<option value=\""+obj.id+"\">"+obj.areaname+"</option>";
                });
            }else{
                btn_alertDialog("提示",data.msg);
            }
        }
    });
    return dics;
}
//协议编号模糊查询
function proNoSearch() {
    top.dialog({
        url: basePath+'/first/proNoSearch',
        title:'协议编号查询',
        width:800,
        height:500,
        onclose: function() {
            if(this.returnValue) {
                var data=this.returnValue;
                $('#remark').focus();
                $('#proNo').val( data.proNo);
            }
        },
        oniframeload: function() {
        }
    }).showModal();
}
//商品编码查询
function goodsCodeSearch(entId) {
    top.dialog({
        url: basePath+'/first/goodsCodeSearch?entId='+entId,
        title:'商品编码查询',
        width:800,
        height:500,
        onclose: function() {
            if(this.returnValue) {
                var data=this.returnValue;
                $('#remark').focus();
                $('#goodsCode').val(data.goodsCode);
            }
        },
        oniframeload: function() {
        }
    }).showModal();
}