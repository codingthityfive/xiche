
$(document).ready(function () {

    $("#deliveryType").val(1);
    // $(".whetherTax").attr("checked",true);
    $(".money").click(function () {
        /*alert($(this).val())*/
        var res = $(this).prop("checked");
        var account = $(this).parent().parent().parent().find(".payment");
        var per = $(this).parent().parent().parent().find(".percent");
        var balancePeriod = $(this).parent().parent().parent().find(".balancePeriod");
        var balanceDay = $(this).parent().parent().parent().find(".balanceDay");
        var payDay = $(this).parent().parent().parent().find(".payDay");
        if(res){
            account.attr("readonly",false);
            per.attr("readonly",false);
            balancePeriod.attr("readonly",false);
            balanceDay.attr("readonly",false);
            payDay.attr("readonly",false);
        }else{
            account.attr("readonly",true);
            per.attr("readonly",true);
            balancePeriod.attr("readonly",true);
            balanceDay.attr("readonly",true);
            payDay.attr("readonly",true);

            account.val('');
            per.val('');
            balancePeriod.val('');
            balanceDay.val('');
            payDay.val('');
        }
    });
    $(".whetherTax").click(function () {
        var whe = $(this).prop("checked");
        if(whe){
            $(this).val(1);
        }else{
            $(this).val(0);
        }

    });


});
function selectSupply(){

}
var fkForm = document.getElementById( 'fkForm' );
var jsForm = document.getElementById( 'jsForm' );
var qtForm = document.getElementById( 'qtForm' );
function fk() {
    //判断区域是否没有选择
    var json = [];
    var percent100 =Number(fkForm.percent[0].value)+Number(fkForm.percent[1].value)+
        Number(fkForm.percent[2].value)+Number(fkForm.percent[3].value)+
        Number(fkForm.percent[4].value);
    if(percent100 != 100 && percent100 !=0){
        if(percent100>100){
            btn_alertDialog("提示", "商业供货协议条款付款方式占比总值大于100");
            return false;
        }else if (percent100<100){
            btn_alertDialog("提示", "商业供货协议条款付款方式占比总值小于100");
            return false;
        }
    } else{
        var xs=/^[0-9]+([.]{1}[0-9]{1,3})?$/;
        var cuuer = true;
        $("#payTypeDiv").find(".row").each(function(i){
            var type = $(this).find(".money").val();
            var flag  = $(this).find(".money").prop("checked");
            var selected = flag?1:0;
            var percent = $(this).find(".percent").val();
            // if(!xs.test(percent)){
            //     btn_alertDialog("提示", "请填写规范的占比");
            //     cuuer = false;
            //     return false;
            // }
            var payment = $(this).find(".payment").val();
            // if(!xs.test(payment)){
            //     btn_alertDialog("提示", "请填写规范的付款金额");
            //     cuuer = false;
            //     return false;
            // }
            var taxFlag = $(this).find(".whetherTax").prop("checked");
            var tax = taxFlag?1:0;
            var j = {};
            j.payType = type;
            j.selected = selected;
            j.percent = percent;
            j.rebateScale = payment;
            j.whetherTax = tax;
            json.push(j);
        });
        // if(!cuuer){
        //     return false;
        // }
    }
    return json;
}
function getName(type){
    var name = "";
    if(type==1){
        name="支票";
    }else if(type==2){
        name="电汇";
    }else if(type==3){
        name="3个月承兑";
    }else if(type==4){
        name="6个月承兑";
    }else if(type==5){
        name="易货";
    }
    return name;
}
/**
 * 创建付款方式
 * @returns
 */
function buildPayType(proBusinessPay){
    var html="";
    for (var i = 0; i < proBusinessPay.length; i++) {
        var payType = proBusinessPay[i].payType;
        var selected = proBusinessPay[i].selected;
        var percent = proBusinessPay[i].percent;
        var rebateScale = proBusinessPay[i].rebateScale;
        var tax = proBusinessPay[i].whetherTax;
        var checked = selected?"checked":"";
        var taxChecked = tax==1?"checked":"";
        var name = getName(payType);

        html +='<div class="row">\n' +
            '<div class="col-sm-2 marginTop5 checkbox">\n' +
            '<label>\n' +
            '<input id="payType" name="proBusinessList.payList['+i+'].payType" type="checkbox" class="form-control money" value="'+payType+'" '+checked+'>'+name+'\n' +
            '</label>\n' +
            '</div>\n' +
            '<div class="col-sm-3 marginTop5">\n' +
            '<div class="input-group">\n' +
            '<label class="input-group-addon">占比</label>\n' +
            '<input readonly id="percent" name="proBusinessList.payList['+i+'].percent" value="'+percent+'" type="text" class="form-control input-left percent">\n' +
            '<span class="form-control-feedback">%</span>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="col-sm-3 marginTop5">\n' +
            '<div class="input-group">\n' +
            '<label class="input-group-addon">付款金额</label>\n' +
            '<input readonly id="rebateScale" name="proBusinessList.payList['+i+'].rebateScale" value="'+rebateScale+'" type="text" class="form-control payment input-left">\n' +
            '<span class="form-control-feedback readonly">%</span>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="col-sm-1 marginTop5 checkbox">\n' +
            '<div class="">\n' +
            '<label>\n' +
            '<input id="whetherTax" name="proBusinessList.payList['+i+'].whetherTax" value="'+tax+'" type="checkbox" class="form-control whetherTax" '+taxChecked+' >含税\n' +
            '</label>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';
    }
    return html;
}

function js() {
    var json = [];
    $("#balanceTypeDiv").find(".row").each(function(i){
        var balanceType = $(this).find(".money").val();
        var flag  = $(this).find(".money").prop("checked");
        var selected = flag?1:0;
        var balancePeriod = $(this).find(".balancePeriod").val();
        var balanceDay = $(this).find(".balanceDay").val();
        var payDay = $(this).find(".payDay").val();
        var depositNum = $(this).find(".balancePeriod").val();
        var creditAmount = $(this).find(".balancePeriod").val();
        var rebateScale = $(this).find(".rebateScale").val();
        var includeTax = $(this).find(".includeTax").val();
        var taxFlag = $(this).find(".whetherTax").prop("checked");
        var tax = taxFlag?1:0;

        var j = {};
        j.balanceType = jsForm.balanceType[i].value;
        j.selected = selected;
        j.balancePeriod = jsForm.balancePeriod[i].value;
        j.balanceDay = jsForm.balanceDay[i].value;
        j.payDay = jsForm.payDay[i].value;
        j.depositNum = jsForm.balancePeriod[i].value;
        j.creditAmount = jsForm.balancePeriod[i].value;
        j.rebateScale = jsForm.rebateScale[i].value;
        j.includeTax = jsForm.includeTax[i].value;
        j.includeTax = tax;
        if(balanceType == 6){
            j.creditAmount=creditAmount;
        }
        json.push(j);
    });
    return json;
}
function getBalanceTypeName(type){
    var name = "";
    if(type==1){
        name="预付款";
    }else if(type==2){
        name="账期";
    }else if(type==3){
        name="实销实结";
    }else if(type==4){
        name="货到付款";
    }else if(type==5){
        name="压批";
    }else if(type==6){
        name="授信";
    }
    return name;
}
/**
 * 创建结算方式
 * @returns
 */
function buildBalanceType(proBusinessBalance){
    var html="";
    for (var i = 0; i < proBusinessBalance.length; i++) {
        var balanceType = proBusinessBalance[i].balanceType;
        var selected = proBusinessBalance[i].selected;
        var balancePeriod = proBusinessBalance[i].balancePeriod;
        var balanceDay = proBusinessBalance[i].balanceDay;
        var payDay = proBusinessBalance[i].payDay;
        var rebateScale = proBusinessBalance[i].rebateScale;
        var depositNum = proBusinessBalance[i].depositNum;
        var creditAmount = proBusinessBalance[i].creditAmount;
        var tax = proBusinessBalance[i].includeTax;
        var checked = selected?"checked":"";
        var taxChecked = tax==1?"checked":"";
        var name = getBalanceTypeName(balanceType);

        if(balanceType==1||balanceType==4){
            html +='<div class="row">\n' +
                '                        <div class="col-sm-2 marginTop5 checkbox">\n' +
                '                            <label>\n' +
                '                                <input id="balanceType" name="proBusinessList.balanceList['+i+'].balanceType" type="checkbox" class="form-control money" value="'+balanceType+'" '+checked+'>'+name+'\n' +
                '                            </label>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="balancePeriod" name="proBusinessList.balanceList['+i+'].balancePeriod" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"></label>\n' +
                '                                <input id="balanceDay" name="proBusinessList.balanceList['+i+'].balanceDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="payDay" name="proBusinessList.balanceList['+i+'].payDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-3 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">付款金额</label>\n' +
                '                                <input readonly id="rebateScale" name="proBusinessList.balanceList['+i+'].rebateScale" value="'+rebateScale+'" type="text" class="form-control payment input-left">\n' +
                '                                <span class="form-control-feedback">%</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-1 marginTop5 checkbox">\n' +
                '\n' +
                '                            <div class="">\n' +
                '                                <label>\n' +
                '                                    <input id="includeTax" name="proBusinessList.balanceList['+i+'].includeTax" value="'+tax+'" type="checkbox" class="form-control whetherTax" '+taxChecked+' >含税\n' +
                '                                </label>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
        }
        else if(balanceType==2||balanceType==3){
            html +='<div class="row">\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <label>\n' +
                '                                <input id="balanceType" name="proBusinessList.balanceList['+i+'].balanceType" type="checkbox" class="form-control money" value="'+balanceType+'" '+checked+'>'+name+'\n' +
                '                            </label>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">结算周期</label>\n' +
                '                                <input readonly id="balancePeriod" name="proBusinessList.balanceList['+i+'].balancePeriod" value="'+balancePeriod+'" type="text" class="form-control input-left balancePeriod">\n' +
                '                                <span class="form-control-feedback">天</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">结算日</label>\n' +
                '                                <input readonly id="balanceDay" name="proBusinessList.balanceList['+i+'].balanceDay" value="'+balanceDay+'" type="text" class="form-control input-left balanceDay">\n' +
                '                                <span class="form-control-feedback">日</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">支付日</label>\n' +
                '                                <input readonly id="payDay" name="proBusinessList.balanceList['+i+'].payDay" value="'+payDay+'" type="text" class="form-control input-left payDay">\n' +
                '                                <span class="form-control-feedback">日</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-3 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">付款金额</label>\n' +
                '                                <input readonly id="rebateScale" name="proBusinessList.balanceList['+i+'].rebateScale" value="'+rebateScale+'" type="text" class="form-control payment input-left">\n' +
                '                                <span class="form-control-feedback">%</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-1 marginTop5 checkbox">\n' +
                '\n' +
                '                            <div class="">\n' +
                '                                <label>\n' +
                '                                    <input id="includeTax" name="proBusinessList.balanceList['+i+'].includeTax" value="'+tax+'" type="checkbox" class="form-control whetherTax" '+taxChecked+' >含税\n' +
                '                                </label>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
        }
        else if(balanceType==5){
            html +='<div class="row">\n' +
                '                        <div class="col-sm-2 marginTop5 checkbox">\n' +
                '                            <label>\n' +
                '                                <input id="balanceType" name="proBusinessList.balanceList['+i+'].balanceType" type="checkbox" class="form-control money" value="'+balanceType+'" '+checked+'>'+name+'\n' +
                '                            </label>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">压批次数</label>\n' +
                '                                <input readonly id="balancePeriod" name="proBusinessList.balanceList['+i+'].depositNum" value="'+depositNum+'" type="text" class="form-control balancePeriod input-left">\n' +
                '\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="balanceDay" name="proBusinessList.balanceList['+i+'].balanceDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="payDay" name="proBusinessList.balanceList['+i+'].payDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-3 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">付款金额</label>\n' +
                '                                <input readonly id="rebateScale" name="proBusinessList.balanceList['+i+'].rebateScale" value="'+rebateScale+'" type="text" class="form-control payment input-left">\n' +
                '                                <span class="form-control-feedback">%</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-1 marginTop5 checkbox">\n' +
                '\n' +
                '                            <div class="">\n' +
                '                                <label>\n' +
                '                                    <input id="includeTax" name="proBusinessList.balanceList['+i+'].includeTax" value="'+tax+'" type="checkbox" class="form-control whetherTax" '+taxChecked+' >含税\n' +
                '                                </label>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
        }
        else if(balanceType==6){
            html +='<div class="row">\n' +
                '                        <div class="col-sm-2 marginTop5 checkbox">\n' +
                '                            <label>\n' +
                '                                <input id="balanceType" name="proBusinessList.balanceList['+i+'].balanceType" type="checkbox" class="form-control money" value="'+balanceType+'" '+checked+'>'+name+'\n' +
                '                            </label>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">授信金额</label>\n' +
                '                                <input readonly id="balancePeriod" name="proBusinessList.balanceList['+i+'].creditAmount" value="'+creditAmount+'" type="text" class="form-control balancePeriod input-left">\n' +
                '                                <span class="form-control-feedback">万</span>\n' +
                '\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="balanceDay" name="proBusinessList.balanceList['+i+'].balanceDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-2 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon"> </label>\n' +
                '                                <input id="payDay" name="proBusinessList.balanceList['+i+'].payDay" type="hidden" class="form-control input-left">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-3 marginTop5">\n' +
                '                            <div class="input-group">\n' +
                '                                <label class="input-group-addon">付款金额</label>\n' +
                '                                <input readonly id="rebateScale" name="proBusinessList.balanceList['+i+'].rebateScale" value="'+rebateScale+'" type="text" class="form-control payment input-left">\n' +
                '                                <span class="form-control-feedback">%</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="col-sm-1 marginTop5 checkbox">\n' +
                '\n' +
                '                            <div class="">\n' +
                '                                <label>\n' +
                '                                    <input id="includeTax" name="proBusinessList.balanceList['+i+'].includeTax" value="'+tax+'" type="checkbox" class="form-control whetherTax" '+taxChecked+'>含税\n' +
                '                                </label>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>';
        }

    }
    return html;
}

/**
 * 创建商业供货协议方式
 * @returns
 */
function buildPaymentType(buildPaymentType){
    var html="";
    var arrivalPeriod = buildPaymentType.arrivalPeriod;
    var minSendNum = buildPaymentType.minSendNum;
    var deliveryType = buildPaymentType.deliveryType;
    var deliveryTypeName = buildPaymentType.deliveryTypeName;
    var proManagerId = buildPaymentType.proManagerId;
    var proManagerName = buildPaymentType.proManagerName;
    var contactId = buildPaymentType.contactId;
    var contractName = buildPaymentType.contractName;
    var contractPhone = buildPaymentType.contractPhone;
    var position = buildPaymentType.position;
    html +='<div class="row">\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">到货周期</label>\n' +
        '                                <input id="arrivalPeriod" name="proBusinessList.supplyList.arrivalPeriod" value="'+arrivalPeriod+'"  type="text" class="form-control input-left">\n' +
        '                                <span class="form-control-feedback">天</span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">最小发货量</label>\n' +
        '                                <input id="minSendNum" name="proBusinessList.supplyList.minSendNum" value="'+minSendNum+'"  type="text" class="form-control input-left">\n' +
        '                                <span class="form-control-feedback">件</span>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">送货方式</label>\n' +
        '                             <select name="proBusinessList.supplyList.deliveryType">\n' +
        '                                <option value="'+deliveryType+'">'+deliveryTypeName+'</option>\n' +
        '                             </select>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>';
    html +='<div class="row">\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">采购负责人</label>\n' +
        '                                <input type="hidden" id="proManagerId" name="proBusinessList.supplyList.proManagerId" value="'+proManagerId+'"class="form-control">\n' +
        '                                <input type="text" id="proManagerName" name="proBusinessList.supplyList.proManagerName" value="'+proManagerName+'" class="form-control" readonly>\n' +
        '                                <i class="glyphicon glyphicon-search" id="searchProvider"></i>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">联系人</label>\n' +
        '                                <input type="text" id="contractName" name="proBusinessList.supplyList.contractName" value="'+contractName+'"class="form-control" readonly value="${(protocal.contractName)!}">\n' +
        '                                <input type="hidden" id="contactId" name="proBusinessList.supplyList.contactId" value="'+contactId+'"class="form-control" value="${(protocal.firstPartyId)!}">\n' +
        '                                <i class="glyphicon glyphicon-search" id="searchProvider"></i>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">联系人电话</label>\n' +
        '                                <input id="contractPhone" name="proBusinessList.supplyList.contractPhone" value="'+contractPhone+'" type="text" class="form-control input-left" readonly>\n' +
        '\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                        <div class="col-sm-3 marginTop5">\n' +
        '                            <div class="input-group">\n' +
        '                                <label class="input-group-addon">联系人职位</label>\n' +
        '                                <input id="Position" name="proBusinessList.supplyList.position" value="'+position+'" type="text" class="form-control input-left" readonly>\n' +
        '                                <!--<span class="form-control-feedback"></span>-->\n' +
        '                            </div>\n' +
        '\n' +
        '                        </div>\n' +
        '                    </div>';
    return html;
}
/**
 * 获取商业供货条款回显
 * @returns
 */
function List() {
    //付款
    var proBusinessPay=fk();
    console.log(proBusinessPay);
    //结算
    var proBusinessBalance=js();
    console.log(proBusinessBalance);
    //商业供货
    var payment=getPayment();
    console.log(payment);

    var contents = buildPayType(proBusinessPay);
    var contents2 = buildBalanceType(proBusinessBalance);
    var contents3 = buildPaymentType(payment);
    var html='';
    html+='<div class="panel panel-default publicPanel">'+
					    '<h4 class="" style="font-weight: bolder;">商业供货协议条款</h4>';
    html +='<div class="row">\n' +
        '<div class="col-xs-1 ">\n' +
        '<h5 style="margin-top: 20px;">付款方式</h5>\n' +
        '</div>\n' +
        '<div class="col-xs-11 ">';
    html+=contents;
    html +='</div>\n' +
        '</div>';
    html +='<div class="row">\n' +
        '<div class="col-xs-1 ">\n' +
        '<h5 style="margin-top: 20px;">结算方式</h5>\n' +
        '</div>\n' +
        '<div class="col-xs-11 ">';
    html+=contents2;
    html +='</div>\n' +
        '</div>';
    html +='<div class="row">\n' +
        '                <div class="col-xs-1 ">\n' +
        '                    <h5 style="margin-top: 20px;">其他</h5>\n' +
        '                </div>\n' +
        '                <div class="col-xs-11 ">';
    html+=contents3;
    html +='</div>\n' +
        '</div></div>';
    return html;
}

$("#proManagerName").on("dblclick", function () {
    proManagerName();
});
$("#contractName").on("dblclick", function () {
    contractName();
});

/*function addAll() {
    var ProBusinessList="";
    //付款
    var proBusinessPay=fk();
    console.log(proBusinessPay);
    //结算
    var proBusinessBalance=js();
    console.log(proBusinessBalance);
    //商业供货
    var payment=getPayment();
    console.log(payment);
    ProBusinessList.push(proBusinessPay);
    ProBusinessList.push(proBusinessBalance);
    ProBusinessList.push(payment);
    return ProBusinessList;
}*/
function forAjax(url,object) {
    var result;
    $.ajax({
        url: url,
        type: 'POST', //GET
        async: false,    //或false,是否异步
        data: JSON.stringify(object),
        timeout: 60000,    //超时时间
        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
        contentType: "application/json",
        beforeSend: function (xhr) {
            //console.log(xhr)
            //console.log('发送前');
        },
        success: function (data, xtStatus, jqXHR) {
            result = data;
        },
        error: function (xhr, textStatus) {
            btn_alertDialog("提示",textStatus);
        },
        complete: function () {
            //console.log('结束')
        }
    });
    return result;
};
/**
 * 校验是否填写
 */
function businCheck() {
    //校验付款
    var flag = 0;
    var flagjs = 0;
    var out =0;//跳出循环
    $("#payTypeDiv").find(".row").each(function(i){
        var xs=/^[0-9]+([.]{1}[0-9]{1,3})?$/;
        var checked  = $(this).find(".money").prop("checked");
        var percent = $(this).find(".percent").val();
        if(percent != '' && !xs.test(percent)){
            btn_alertDialog("提示", "请填写规范的付款占比");
            out=1;
            return false;
        }
        var payment = $(this).find(".payment").val();
        if(payment != '' && !xs.test(payment)){
            btn_alertDialog("提示", "请填写规范的付款返利付款金额");
            out=1;
            return false;
        }
        if(checked){
            var percent100 =Number(fkForm.percent[0].value)+Number(fkForm.percent[1].value)+
                Number(fkForm.percent[2].value)+Number(fkForm.percent[3].value)+
                Number(fkForm.percent[4].value);
            if(percent100 != 100 && percent100 !=0){
                if(percent100>100){
                    out=1;
                    btn_alertDialog("提示", "商业供货协议条款付款方式占比总值大于100");
                    return false;
                }else if (percent100<100){
                    out=1;
                    btn_alertDialog("提示", "商业供货协议条款付款方式占比总值小于100");
                    return false;
                }
            }

        }else{
            flag++;
        }
    });
    if(flag==5){
        //alert("flag:"+flag);
        btn_alertDialog("提示", "请选择付款方式");
        return false;
    }
    //结束外层循环
    if(out>=1){
        return false;
    }



//校验结算
    $("#balanceTypeDiv").find(".row").each(function(i){
        var balanceType = $(this).find(".money").val();
        var flag  = $(this).find(".money").prop("checked");
        var selected = flag?1:0;
        var balancePeriod = $(this).find(".balancePeriod").val();
        var balanceDay = $(this).find(".balanceDay").val();
        var payDay = $(this).find(".payDay").val();
        var depositNum = $(this).find(".balancePeriod").val();
        var creditAmount = $(this).find(".balancePeriod").val();
        var payment = $(this).find(".payment").val();
        var re = /^[1-9]\d*$/;
        var xs=/^[0-9]+([.]{1}[0-9]{1,5})?$/;
        var zb=/^[0-9]+([.]{1}[0-9]{1,3})?$/;
        if(payment != ""){
            if (!zb.test(payment)){
                out=1;
                btn_alertDialog("提示", "请填写规范的结算返利付款金额");
                return false;
            }
        }
        if(flag==1){
            if(balanceType==2||balanceType==3){
                if(balancePeriod==null||balancePeriod==""||balancePeriod==undefined){
                    out=1;
                    btn_alertDialog("提示", "请选择商业供货协议条款结算周期");
                    return false;
                }else {
                    if(!re.test(balancePeriod)){
                        out=1;
                        btn_alertDialog("提示", "请填写规范的商业供货协议条款结算周期");
                        return false;
                    }
                }
                if(balanceDay==null||balanceDay==""||balanceDay==undefined){
                    out=1;
                    btn_alertDialog("提示", "请填写商业供货协议条款结算日");
                    return false;
                }else {
                    if(!re.test(balanceDay)){
                        out=1;
                        btn_alertDialog("提示", "请填写规范的商业供货协议条款结算日");
                        return false;
                    }
                }
                if(payDay==null||payDay==""||payDay==undefined){
                    out=1;
                    btn_alertDialog("提示", "请选择商业供货协议条款支付日");
                    return false;
                }else {
                    if(!re.test(payDay)){
                        out=1;
                        btn_alertDialog("提示", "请填写规范的商业供货协议条款支付日");
                        return false;
                    }
                }
            }else if(balanceType==5){
                if(depositNum==null||depositNum==""||depositNum==undefined){
                    out=1;
                    btn_alertDialog("提示", "请选择商业供货协议条款压批次数");
                    return false;
                }else {
                    if(!re.test(depositNum)){
                        out=1;
                        btn_alertDialog("提示", "请填写规范的商业供货协议条款压批次数");
                        return false;
                    }
                }
            }else if(balanceType==6){
                if(creditAmount==null||creditAmount==""||creditAmount==undefined){
                    out=1;
                    btn_alertDialog("提示", "请选择商业供货协议条款授信金额");
                    return false;
                }else {
                    if(!xs.test(creditAmount)){
                        out=1;
                        btn_alertDialog("提示", "请填写规范的商业供货协议条款授信金额");
                        return false;
                    }
                }
            }
            //校验其他
            var arrivalPeriod = $("#arrivalPeriod").val();
            var minSendNum = $("#minSendNum").val();
            var deliveryType = $("#deliveryType").val();
            var deliveryTypeName = $("#deliveryType :selected").text();
            //alert(deliveryTypeName);
            var proManagerId = $("#proManagerId").val();
            var proManagerName = $("#proManagerName").val();
            var contactId = $("#contactId").val();
            var contractName = $("#contractName").val();
            var contractPhone = $("#contractPhone").val();
            var position = $("#Position").val();

            if(arrivalPeriod==null||arrivalPeriod==""||arrivalPeriod==undefined){
                out=1;
                btn_alertDialog("提示", "请填写商业供货协议条款到货周期");
                return false;
            }else {
                if(!re.test(arrivalPeriod)){
                    out=1;
                    btn_alertDialog("提示", "请填写规范的商业供货协议条款到货周期");
                    return false;
                }
            }
            if(minSendNum==null||minSendNum==""||minSendNum==undefined){
                out=1;
                btn_alertDialog("提示", "请填写商业供货协议条款最小发货量");
                return false;
            }else {
                if(!re.test(minSendNum)){
                    out=1;
                    btn_alertDialog("提示", "请填写规范的商业供货协议条款最小发货量");
                    return false;
                }
            }
            if(deliveryType==null||deliveryType==""||deliveryType==undefined){
                out=1;
                btn_alertDialog("提示", "请选择商业供货协议条款送货方式");
                return false;
            }else if(proManagerName==null||proManagerName==""||proManagerName==undefined){
                out=1;
                btn_alertDialog("提示", "请填写商业供货协议条款采购负责人");
                return false;
            }else if(contractName==null||contractName==""||contractName==undefined){
                out=1;
                btn_alertDialog("提示", "请填写商业供货协议条款联系人");
                return false;
            }
        }else{
            flagjs++;
        }
    });
    if(flagjs==6){
        btn_alertDialog("提示", "请选择结算方式");
        return false;
    }
    //结束外层循环
    if(out>=1){
        return false;
    }
    return true;
}
function getPayment() {
    var arrivalPeriod = $("#arrivalPeriod").val();
    var minSendNum = $("#minSendNum").val();
    var deliveryType = $("#deliveryType").val();
    var deliveryTypeName = $("#deliveryType :selected").text();
    //alert(deliveryTypeName);
    var proManagerId = $("#proManagerId").val();
    var proManagerName = $("#proManagerName").val();
    var contactId = $("#contactId").val();
    var contractName = $("#contractName").val();
    var contractPhone = $("#contractPhone").val();
    var position = $("#Position").val();

    var payment={};
    payment.arrivalPeriod=arrivalPeriod;
    payment.minSendNum=minSendNum;
    payment.deliveryType=deliveryType;
    payment.deliveryTypeName=deliveryTypeName;
    payment.proManagerId=proManagerId;
    payment.proManagerName=proManagerName;
    payment.contactId=contactId;
    payment.contractName=contractName;
    payment.contractPhone=contractPhone;
    payment.position=position;

    return payment;
}
function contractName() {
    top.dialog({
        url: basePath+'/first/firstSignerList',
        title:'联系人查询',
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
                $('#contactId').val( data.id);
                $('#contractName').val( data.contractname);
                $('#contractPhone').val( data.contractphone);
                $('#Position').val( data.position);
            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}

function proManagerName(){
    top.dialog({
        url: basePath+'/first/proLeaderList',
        title:'采购负责人查询',
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

                $('#proManagerId').val( data.id);
                $('#proManagerName').val( data.name);

            }
        },
        oniframeload: function() {
            //console.log('iframe ready')
        }
    }).showModal();
}