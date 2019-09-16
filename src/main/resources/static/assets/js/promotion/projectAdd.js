//王博臣 1.2
//满减输入数字校验
        function mj_num1(obj){
            var mj_give_type=$('input[name="mj_isvehicle"]:checked ').val();
            if(mj_give_type==1){
              var num = obj.value;
                        var re=/^\d*$/;
                        if(!re.test(num)){
                        alert("满减件数请输入整数");
                            isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
                        }
            }else{

                        obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                        obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
                        obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
            }
       }

        function mj_num2(obj){
               var num = obj.value;
               var re=/^\d*$/;
               if(!re.test(num)){
                alert("满减金额请输入整数");
                    isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
                }
        }

    //满折输入数字校验
      function mz_num1(obj){
                var mj_give_type=$('input[name="mz_isvehicle"]:checked ').val();
                if(mj_give_type==1){
                  var num = obj.value;
                            var re=/^\d*$/;
                            if(!re.test(num)){
                             alert("满折件数请输入整数");
                                isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
                            }
                }else{
                    obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
                    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
                }
           }

            function mz_num2(obj){
	            var mz_num = Number($(obj).val());
	            if(mz_num != '' && mz_num < 0 || mz_num > 100){
	            	  alert("满折折扣 请输入0~100之间的数字");
	                  $("#mz_give_num").val("");
	            }
	              obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
	              obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
	              obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
	              obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	              obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
            }

//满送输入数字校验
  function ms_num1(obj){
            var mj_give_type=$('input[name="ms_isvehicle"]:checked ').val();
            if(mj_give_type==1){
              var num = obj.value;
                        var re=/^\d*$/;
                        if(!re.test(num)){
                          alert("满送件数请输入整数");
                            isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
                        }
            }else{
             obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
                        obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
                        obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
                        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
                        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
            }
       }

        function ms_num2(obj){
            var num = obj.value;
            var re=/^\d*$/;
            if(!re.test(num)){
             alert("满送件数请输入整数");
                isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
            }
        }
//廖李闯 1.0
//返回数据的满折的json数据
function mzjsondata(){
    var mz_give_type=$('input[name="mz_isvehicle"]:checked ').val();
    var is_add_up=$('input[name="is_add_up"]:checked ').val();
    var promotion_sn=$("#promotion_sn").val();
    var divs=$("#text2").children("div");
    var data =new Array();
    var data2 =new Array();
    data2={mz_give_type:mz_give_type,is_add_up:is_add_up,promotion_sn:promotion_sn};
    data.push(data2);
    for(var i = 0; i<divs.length;i++ ){
     var data3 = new Array();
     var mv_value=divs.children('div');
     var mz_full_num=mv_value.children("#mz_full_num").eq(i).val();
     var mz_give_num=mv_value.children("#mz_give_num").eq(i).val();
     data3={mz_full_num:mz_full_num,mz_give_num:mz_give_num};
     data.push(data3);
    }

    var jsondata = JSON.stringify(data);
    return jsondata;

	};

function mjjsondata(){
    var promotion_sn=$("#promotion_sn").val();
    var mj_give_type=$('input[name="mj_isvehicle"]:checked ').val();
    var divs=$("#text3").children("div");
    var data =new Array();
    var data2 =new Array();
    data2={mj_give_type:mj_give_type,promotion_sn:promotion_sn};
    data.push(data2);
    for(var i = 0; i<divs.length;i++ ){
     var data3 = new Array();
     var mv_value=divs.children('div');
     var mj_full_num=mv_value.children("#mj_full_num").eq(i).val();
     var mj_give_num=mv_value.children("#mj_give_num").eq(i).val();
     data3={mj_full_num:mj_full_num,mj_give_num:mj_give_num};
     data.push(data3);
    }

    var jsondata = JSON.stringify(data);
    return jsondata;
	};

function msjsondata(){
    var promotion_sn=$("#promotion_sn").val();
    var divs=$("#text1").children("div");
    var data =new Array();
    var data2 =new Array();
    var ms_give_type=$('input[name="ms_isvehicle"]:checked ').val();
    data2={ms_give_type:ms_give_type,promotion_sn:promotion_sn};
    data.push(data2);
    for(var i = 0; i<divs.length;i++ ){
     var data3 = new Array();
     var mv_value=divs.children('div');
     var ms_full_num=mv_value.children("#ms_full_num").eq(i).val();
     var ms_give_num=mv_value.children("#ms_give_num").eq(i).val();
     data3={ms_full_num:ms_full_num,ms_give_num:ms_give_num};
     data.push(data3);
    }

    var jsondata = JSON.stringify(data);
    return jsondata;
	}
window.onload = function(){
	// var url="/sales/route/getDjbh";
	// $.post(url,{},
	// 		function(data){
	// 		document.getElementById("promotion_sn").value = data.result
	// 		},"json");
 //    var date = new Date();
 //    document.getElementById("taocancode").value = "TC" + new Date().toLocaleString().match(/\d+/g).join("");

  //全选
        $("#checkMore").click(function(){
            var ischecked =	$("#checkMore").prop("checked");
            if(ischecked){
                $(".checkboxxxall").prop("checked",true);
            }else{
                $(".checkboxxxall").prop("checked",false);
            }
        });


  //提交xml
    $("#sub").click(function(){
    	var flag = false;
    	if($("#apply_target_type").val() == '2'){
    		$(".vip input").each(function(){
    		   if($(this).prop('checked') == true){
    		        flag = true;
    		   }
    		});
    		if(flag == false){
    			alert('请选择会员类型');
    			return;
    		}
    	}
        var url="/sales/route/saveCuxiao";
        var promotion_sn=$("#promotion_sn").val();
        if(promotion_sn.trim() == ""){
            alert("单据编号不能为空，请重新确认！");
            return;
        }
        var promotion_name=$("#promotion_name").val();
        if(promotion_name.trim() == ""){
            alert("促销方案名称不能为空，请重新确认！");
            return;
        }
        var vilid_date=$("#vilid_date").val();
        if(vilid_date==""||vilid_date==null){
            alert("请选择生效日期！");
            return;
        }
        var invalid_date=$("#invalid_date").val();
        if(invalid_date==""||invalid_date==null){
            alert("请选择失效日期！");
            return;
        }
        var price_type = 1;
        if(vilid_date>invalid_date){
            alert("生效日期不能在失效日期之后，请重新确认！");
            return;
        }
        var typeId = $("#promotion_type").val();
        if(typeId==1||typeId==2||typeId==3||typeId==4) {
            //校验商品是否选择
            var spans = $("#pselect").children("#tab01");
            var shangpinListl = spans.children('tbody').children('tr');
            if($("#apply_goods_type").val()==0 || $("#apply_goods_type").val()==2) {
                if(shangpinListl.length==0) {
                    alert("请选择商品");
                    return;
                }
            }
        }

        //校验限量特价
        if(typeId==6) {
            var divs = $("#promotion_type6");
            var tr = divs.children('table').children('tbody').children('tr');
            if(tr.length == 0) {
                alert("请选择商品");
                return;
            }
        }

        //校验满送商品是否选择
        if(typeId==3) {
            var divss = $("#msDIV");
            var trrt = divss.children('table').children('tbody').children('tr');
            if(trrt.length == 0) {
                alert("请选择商品");
                return;
            }
        }
//限量特价非空校验
        var flag = false;
        $(".tdlist").each(function () {
           var vals= $(this).val();
           if(vals ==""){
             flag=true;
           }
        })
        if(flag==true) {
            alert("请输入正确的库存，价格,人均限购量信息");
            return;
        }
//满送非空校验
        var flag1 = false;
        $(".mslist").each(function () {
            var vals1= $(this).val();
            if(vals1 ==""){
                flag1=true;
            }
        })
        if(flag1==true) {
            alert("请输入正确的优惠价信息");
            return;
        }

        var apply_target_type=$("#apply_target_type").val();
        var apply_goods_type=$("#apply_goods_type").val();
        var promotion_type=$(".promotion_type").val();

        var leaguer_level="";
        $("[name=huiyuan]:checked").each(function(){
            leaguer_level=leaguer_level+$(this).attr("value")+",";
        });
        var ms_jsondata;
        var mj_jsondata;
        var mz_jsondata;
        var assjson;
        var xlteJson;
        var zpJson;
        var goodsJson;

        if(promotion_type=="1"){//满减
            mj_jsondata=mjjsondata();
            //非空校验
            if(mj_jsondata.indexOf('""')!=-1){
                alert("满减输入框不可以为空");
                return;
            }
            goodsJson=saveCX();
        }else if(promotion_type=="2"){//满折
            mz_jsondata=mzjsondata();
            //非空校验
            if(mz_jsondata.indexOf('""')!=-1){
                alert("满折输入框不可以为空");
                return;
            }
            goodsJson=saveCX();
        }else if(promotion_type=="3"){//满送
            ms_jsondata=msjsondata();
            //非空校验
            if(ms_jsondata.indexOf('""')!=-1){
                alert("满送输入框不可以为空");
                return;
            }
            goodsJson=saveCX();
            zpJson=saveMS();
        }else if(promotion_type=="4"){//会员日
            assjson=getAssociInfo();
            if(!assjson){
            	return;
            }
            var obj = JSON.parse(assjson); //由JSON字符串转换为JSON对象
            console.log(obj.arr.length);
            if(obj.is_discount_set== 1 && obj.arr.length== 0){
            	return;
            }
            goodsJson=saveCX();
            if(goodsJson=='' || goodsJson== null || goodsJson == undefined ){
            	alert("商品不能为空");
            	return;
            }
        }else if(promotion_type=="5"){//套餐

        }else if(promotion_type=="6"){//限量特价
            xlteJson=saveTab01();
        }
        $.post(url,{apply_goods_type:apply_goods_type,promotion_sn:promotion_sn,promotion_name:promotion_name,vilid_date:vilid_date,invalid_date:invalid_date,
        	price_type:price_type,apply_target_type:apply_target_type,promotion_type:promotion_type,leaguer_level:leaguer_level,
                ms_jsondata:ms_jsondata,mj_jsondata:mj_jsondata,mz_jsondata:mz_jsondata,assjson:assjson,xlteJson:xlteJson,zpJson:zpJson,goodsJson:goodsJson},
            function(data){
                window.location.href="/bill/view/dics?billKey=cuxiaoxinzeng";
            },"json");
    });
    addCheckBox();
    //隐藏会员价
    $("#proprice").hide();
};

//添加时间选择复选框
function addCheckBox(){
	var str ="";
	for(var i=1;i < 32;i++){
         str += "<input type='checkbox' name='promotion_date' value='"+i+"'>"+i+"&nbsp;&nbsp;";
	}
	 $("#promotion_date_checkbox").html(str);
}

var selectDays = new Array() ;

$(document).ready(function(){
	$("#apply_target_type").on("change",function(){
		var a =$(this).val()
		if(a==2){
			   $.ajax({
				   url:"/sales/route/getAssoLevel",
				   type:"post",
				   success:function(backData){
					   if(backData.status == 1){
						   var list = backData.result;
						   var str = "";
						   $.each(list,function(i,item){
							str += "<div class='fl vip'><input type='checkbox' name='huiyuan' onClick='getAssoLevel()' class='huiyuan' value='"+item.djmckey+"'><span>"+item.djmc+"</span></div>";
						   });
						$("#ass_checkbox").html(str);
					   }
				   }
			   });
		}else{
			$("#ass_checkbox").empty();
		}
		});

	/*
	$("#my97DateIcon").click(function(){
		WdatePicker({
		el:'yyTime2',
		onpicked:function(){
		  if(!!!$("#my97DateIcon").val()){
		  $("#my97DateIcon").val(this.value) ;
		  }else{
		  $("#my97DateIcon").val( $("#my97DateIcon").val()+","+this.value ) ;
		  }
		  selectDays.push(this.value);
		 },
		 dateFmt:'yyyy-MM-dd',
		 minDate:'%y-%M-{%d+1}',
		 disabledDates: selectDays
		});
		}); */
		var selectDays = new Array() ;
		//会员折扣生效
		$(function(){
			$("#assList").hide();
			$("#associator").click(function(){
			var ischecked = $("#associator").prop("checked");
			if(ischecked == true){
				$("#assList").show();
//				getAssoLevel();
			}else{
				$("#assList").hide();
			}
			});
			$("#my97DateIcon").click(function(){
				WdatePicker({
				el:'yyTime2',
				onpicked:function(){
				  if(!!!$("#my97DateIcon").val()){
				  $("#my97DateIcon").val(this.value) ;
				  }else{
				  $("#my97DateIcon").val( $("#my97DateIcon").val()+","+this.value ) ;
				  }
				  selectDays.push(this.value);
				 },
				 dateFmt:'yyyy-MM-dd',
				 minDate:'%y-%M-{%d+1}',
				 disabledDates: selectDays
				});
				});
		});


	hideAllPromotion();
	$("#promotion_type1").show();
    $("#promotion_type2").show();



    $("#add_ms").click(function(){

        //var html=$('<div class="rowlist"> <div class="form-group">  <span class="hidden-md"><i class="xintip">*</i>满</span> <input type="text" class="form-control" id="ms_full_num"  placeholder="件/元" onkeyup="ms_num1(this)">  </div>  <div class="form-group"> <span class="hidden-md">送</span>   <label class="sr-only" for="name">名称</label> <input type="text" class="form-control" id="ms_give_num" placeholder="件" onkeyup="ms_num2(this)">  </div> <button id="del_ms"  type="button" class="btn btn-summit" onclick="delet(this)"><i class="glyphicon glyphicon-trash"></i>删除</button>  </div>  </div>');
        var html=$('<div class="rowlist"> <div class="col-sm-5 marginTop5"><div class="input-group"><label class="input-group-addon"><span class="danger">*</span>满</label><input type="text" id="ms_full_num" class="form-control" placeholder="件/元" required="required" data-msg-required="该字段为必填项" onkeyup="ms_num1(this)"></div></div> <div class="col-sm-5 marginTop5"><div class="input-group"><label class="input-group-addon">送</label><input type="text" id="ms_give_num" class="form-control" placeholder="件" onkeyup="ms_num2(this)"></div></div><div class="col-sm-2 marginTop5"><button id="del_ms"  type="button" class="btn btn-summit" onclick="delet(this)"><i class="glyphicon glyphicon-trash"></i>删除</button></div></div>');

        $("#text1").append(html);
    });


    $('input[name=ms_isvehicle]').click(function(){
        $(this).attr('checked','checked').siblings().removeAttr('checked');
    });


});



$(document).ready(function(){
  $("#add_mz").click(function(){

      //var html=$('<div class="rowlist"> <div class="form-group">  <span class="hidden-md"><i class="xintip">*</i>满</span> <input type="text" class="form-control" id="mz_full_num"  placeholder="件/元" onkeyup="mz_num1(this)">  </div>  <div class="form-group"> <span class="hidden-md">打</span>   <label class="sr-only" for="name">名称</label> <input type="text" class="form-control" id="mz_give_num" placeholder="%" onkeyup="mz_num2(this)">  </div> <button id="del_ms"  type="button" class="btn btn-summit" onclick="delet(this)"><i class="glyphicon glyphicon-trash"></i>删除</button>  </div>  </div>');
      var html=$('<div class="rowlist"> <div class="col-sm-5 marginTop5"><div class="input-group"><label class="input-group-addon"><span class="danger">*</span>满</label><input type="text" id="mz_full_num" class="form-control" placeholder="件/元" required="required" data-msg-required="该字段为必填项" onkeyup="mz_num1(this)"></div></div> <div class="col-sm-5 marginTop5"><div class="input-group"><label class="input-group-addon">打</label><input type="text" id="mz_full_num" class="form-control" placeholder="%" onkeyup="mz_num2(this)"></div></div><div class="col-sm-2 marginTop5"><button id="del_ms"  type="button" class="btn btn-summit" onclick="delet(this)"><i class="glyphicon glyphicon-trash"></i>删除</button></div></div>');

  $("#text2").append(html);
  });



   $('input[name=mz_isvehicle]').click(function(){
     $(this).attr('checked','checked').siblings().removeAttr('checked');
   });

});


$(document).ready(function(){
  $("#add_mj").click(function(){

      var html=$('<div class="rowlist"> <div class="form-group">  <span class="hidden-md"><i class="xintip">*</i>满</span> <input type="text" class="form-control" id="mj_full_num"  placeholder="件/元" onkeyup="mj_num1(this)">  </div>  <div class="form-group"> <span class="hidden-md">减</span>   <label class="sr-only" for="name">名称</label> <input type="text" class="form-control" id="mj_give_num" placeholder="元"  onkeyup="mj_num2(this)"> </div> <button id="del_ms"  type="button" class="btn btn-summit" onclick="delet(this)"><i class="glyphicon glyphicon-trash"></i>删除</button>  </div>  </div>');

 $("#text3").append(html);
   })





   $('input[name=mj_isvehicle]').click(function(){
     $(this).attr('checked','checked').siblings().removeAttr('checked');
   });



});

 function delet(btn){
   $(btn).parent().parent().remove();
  }

 　 $(document).ready(function(){ $("#addup").show();});

    function showaddup(obj){
        if(obj == 1){
              $("#addup").show();
          } else{
              $("#is_add_up").prop("checked", false);
              $("#addup").hide();
          }

  }

//选择促销类型
function change_promotion_type(obj){
	var typeId = $(obj).val();
	hideAllPromotion();
	$("#promotion_type"+typeId).fadeIn();
	$("#msDIV").addClass('hides');
	if(typeId == '3'){
		$("#msDIV").removeClass('hides');
	}
	if(typeId == '4' && $("#week").prop('checked')){
		$(".weekcheck").removeClass('hides');
	}

	if(typeId=='5'||typeId=='6'){
		$("#pselect").hide();
	}else{
		$("#pselect").fadeIn();
	}
	if(typeId=='6'){
		$("#proareatype").hide();
	}else{
		$("#proareatype").show();
	}
}

function hideAllPromotion(){
    $("#promotion_type1").hide();
    $("#promotion_type2").hide();
    $("#promotion_type3").hide();
    $("#promotion_type4").hide();
    $("#promotion_type5").hide();
    $("#promotion_type6").hide();
}


  var leng = 0;
 // 新增套餐
 $(document).on("click","#addTaocan", function () {
     leng++;
     var strnum = "taoTb"+leng;
     var html = '<div id="div"+'+leng+'>'+
	     '<div class="taoArea margin-bottom-10">'+
	   	 '<input type="hidden" id="taocancode" class="form-control taocan"/>'+
	               ' 套餐名称：<input type="text" disabled="disabled" class="tcName form-control taocan" id="taocanName" value="套餐1"/>'+
                '套餐价格：<input type="text" id="taocanPrice" class="form-control taocan" />'+
		'</div>'+
		'<button type="button" class="btn btn-summit" onclick="addBut(\''+strnum+'\')"><i class="glyphicon glyphicon-plus-sign"></i>新增</button>'+
		'<table id = \''+strnum+'\' class="trtest  table table-bordered table-hover">'+
		   '<thead id="j_th">'+
		   ' <tr>'+
		       ' <td>商品编号</td>'+
		       ' <td>商品名称</td>'+
		        '<td>数量</td>'+
		        '<td>零售价</td>'+
		       ' <td>成本价</td>'+
		        '<td>操作</td>'+
		   ' </tr>'+
		  ' </thead>'+
		'</table>'+
		'</div>';
      $("#divID").append(html);

   /*  $(  '<div>\n' +
         '<input type="button" value="新增商品" class="btn btn-summit" id="addBut'+leng+'" onclick="addBut(this);" />\n' +
         '        <input type="button" class="btn btn-summit" onclick="deleteSp(this);" value="删除套餐" />\n' +
         '        <table class="table table-bordered table-hover">\n' +
         '            <thead id="j_th">\n' +
         '            <tr>\n' +
         '                <td>序号</td>\n' +
         '                <td>商品编号</td>\n' +
         '                <td>商品名称</td>\n' +
         '                <td>数量</td>\n' +
         '                <td>零售价</td>\n' +
         '                <td>成本价</td>\n' +
         '                <td>操作</td>\n' +
         '            </tr>\n' +
         '            </thead>\n' +
         '           <tbody id="j_tb'+leng+'">\n' +
         '            </tbody>\n' +
         '        </table></div>').attr("id",'div'+leng).appendTo("#divID");*/
 });

 $("#svae_all").on("click",function () {
	    var divs = $("#divID").children();
	    var data = new Array();
	    for (var i = 0; i<divs.length;i++){
	        var data3=new Array();
	        var data2 = new Array();
	        var taocanName = divs.eq(i).children("#taocanName").val();
	        var taocanPrice = divs.eq(i).children("#taocanPrice").val();
	        var taocancode = divs.eq(i).children("#taocancode").val();
	        var tr = divs.eq(i).children('table').children('tbody').children('tr');
	        for(var j=0;j<tr.length;j++){
	            var data4 = new Array();
	            var spcode =  tr.eq(j).children().children('.spcode').val();
	            var spname = tr.eq(j).children().children('.spname').val();
	            var spnum = tr.eq(j).children().children('.spnum').val();
	            var spcbj = tr.eq(j).children().children('.spcbj').val();
	            var splsj = tr.eq(j).children().children('.splsj').val();
	            data4 = {spcode:spcode,spname:spname,spnum:spnum,splsj:spcbj,spcbj:splsj};
	            data2.push(data4)
	        }
	        data3 = {taocancode:taocancode,taocanName:taocanName,taocanPrice:taocanPrice,data2:data2};
	        data.push(data3);
	    };
	    var jsdata = JSON.stringify(data);

	    $.ajax({
	        url: '/cuxiao_taocan/route/Save-TaoCan',
	        type: 'POST', //GET
	        async: false, //或false,是否异步
	        data: {data:jsdata},
	        timeout: 60000,    //超时时间
	        dataType: 'json',    //返回的数据格式：json/xmlml/script/jsonp/text

	        success: function (data, textStatus, jqXHR) {
	            if (data && data.status == 1) {
	                alert("保存成功！！！");
	            }
	        },
	        error: function (xhr, textStatus) {
	            alert(textStatus);
	        },
	        complete: function () {
	            console.log('结束')
	        }
	    });
	});






// 删除商品
function del(obj) {
    if(confirm('确定要删除商品嘛?')){
        $(obj).parent().parent().remove();
    }
};


// 删除套餐
function deleteSp(obj) {
    if(confirm('确定要删除该套餐嘛?')){
        $(obj).parent().remove();
    }
    // 然后排序
    var taLen = $(".tcName").length
    for(var i = 0; i<taLen;i++){
        var tt = "套餐"+(i+1)
        $(".tcName").eq(i).attr("value",tt);
    }
};

//会员日
//保存会员信息
function getAssociInfo(){
	var associatorObject=new Object();
	associatorObject.promotion_sn = $("#promotion_sn").val();
	var checked = $("#associator").prop("checked");
	//是否进行会员折扣
	if(checked){
		associatorObject.is_discount_set = 1;//是
		//保存会员折扣信息
		var assLevel ;
	 	var promotion_sn = $("#promotion_sn").val();
	    var arr = new Array();
	    var intFlag = true;
	    $("#assBody").find("tr").each(function(){
	    	assLevel= new Object();
	        var tdArr = $(this).children();
	        assLevel.leaguer_level_name = tdArr.eq(1).text();//等级名称
	        assLevel.promotion_sn = promotion_sn;//单据编号
	        assLevel.discount  = tdArr.eq(2).find("input").val();//折扣
	        var value = Number(assLevel.discount);
	    	  if(value != ''){
	    		  if(!isInteger(value)){
	        		  $(this).val('').focus();
	        		  alert('请输入整数~');
	        		  intFlag = false;
	        		  return false;
	    		  }else if(value < 0 || value >100){
	    			  $(this).val('').focus();
	            	  alert('请输入0到100的整数~');
	            	  intFlag = false;
	            	  return false;
	    		  }
	    	  }else{
	    		  alert("会员折扣不能为空");
	    		  intFlag = false;
	    		  return false;
	    	  }
	        assLevel.integral_rate  = tdArr.eq(3).find("input").val();//积分倍率
	        var value = Number(assLevel.integral_rate);
	        if(value != ''){
	    		  if(value < 1){
	    			  $(this).val('').focus();
	            	  alert('请输入大于1的数~');
	            	  intFlag = false;
	            	  return false;
	    		  }
	    	  }else{
	    		  alert("积分倍率不能为空");
	    		  intFlag = false;
	    		  return false;
	    	  }
	        assLevel.leaguer_level  = tdArr.eq(4).find("input").val();//积分倍率
	        arr.push(assLevel);
	    });
	    associatorObject.arr=arr;
	    if(!intFlag){
			return false;
		}
	}else{
		associatorObject.is_discount_set = 0;//否
		  var arr = new Array();
		  associatorObject.arr=arr;
	}

	//促销日约束类型
	var isweek = $("#week").prop("checked");
	if(isweek){
		associatorObject.member_day_type=1;//按周约束
		var assday = new Array();
		$("[name='week_day']").each(function(i,item){
			if(item.checked==true){
				assday.push(item.value);
			}
		});
		associatorObject.week_day = assday.join(",");
		if(associatorObject.week_day == null || associatorObject.week_day ==""){
			alert("按周约束请选择具体时间");
			 return false;
		}
	}else{
		associatorObject.member_day_type=2;//按具体日期约束
			var days = new Array();
		$("input[name='promotion_date']:checked").each(function(i,item){
			var day = item.value;
			days.push(day);
		});
		var strday = days.join(",");
		associatorObject.promotion_date = strday;
		if(associatorObject.promotion_date == "" || associatorObject.promotion_date == null){
			alert("请选择具体日期");
			 return false;
		}
	}

	var json=JSON.stringify(associatorObject);
	return json;
}

//选中促销的日期(按周)
function selected() {
	$("[name='week_day']").each(function(i,item){
	if(item.checked==true){
		$("#week").prop("checked",true);
		$("[name='promotion_date']:checked").each(function(){
			$(this).prop("checked",false);
		});

	}
});
}

//按周选择
function assignweek(){
	var checked = $("#week").prop("checked");
	if(checked){
		$("[name='promotion_date']").each(function(){
			if(this.checked){
				$(this).prop("checked",false);
			}
		});
		$(".weekcheck").removeClass('hides');
		$("#promotion_date_checkbox").addClass('hides');
	}else{
		$(".weekcheck").addClass('hides');
	}
}

//选中促销的日期（按天）
function assignDate(){
	$("[name='week_day']").each(function(){
		$(this).prop("checked",false);
    });
	if($("#date").prop("checked") == true){
		$(".weekcheck").addClass('hides');
		$("#promotion_date_checkbox").removeClass('hides');
	}else{
		$("#promotion_date_checkbox").addClass('hides');
	}
}
function applychange(){
	console.log($("#apply_target_type").val());
	if($("#apply_target_type").val() == 2){
		$("#huiyuanri").removeClass('hides');
		$("#proprice").show();
	}else{
		 $("#proprice").hide();
		 $(":radio[value='1']").prop("checked",true);
		 $("#huiyuanri").addClass('hides');
		if($("#promotion_type").val()==4){
		
			$("#promotion_type").val(2);
			$("#promotion_type2").show();
			$("#promotion_type3,#promotion_type4,#promotion_type5,#promotion_type6").hide();
		}
	}
}


//获取会员等级信息
function getAssoLevel(){
	var str = "";
	$("[name = 'huiyuan']:checked").each(function(i,item){
		var key = $(item).val();
		var name = $(item).next().text();
		str += "<tr>" +
		"<td>"+(i+1)+"</td>"+
		"<td>"+name+"</td>"+
		"<td><input type='text' name='discount'></td>" +
		"<td><input type='text' name='integral_rate'></td>" +
		"<td style='display:none;'><input type='text' name='leaguer_level' value='"+key+"'></td>" +
		"</tr>";
	});
				$("#assBody").html(str);
}
//会员日

    //促销商品 满送商品 限量特价
    //保存限量特价商品
    function saveTab01() {
        var divs = $("#promotion_type6");
        var data2 = new Array();
        var tr = divs.children('table').children('tbody').children('tr');
        for (var j = 0; j < tr.length; j++) {
            var data4 = {};
            var spcode = tr.eq(j).children(".spcode").text();
            var spname = tr.eq(j).children(".spname").text();
            var splsj = tr.eq(j).children(".splsj").text();
            var sptj = tr.eq(j).children().children(".sptj").val();
            var xgkc = tr.eq(j).children().children(".xgkc").val();
            var rjxgl = tr.eq(j).children().children(".rjxgl").val();
            var djbh = $("#promotion_sn").val();
            data4 = {spcode: spcode, spname: spname, splsj: splsj, sptj: sptj, xgkc: xgkc, rjxgl: rjxgl, djbh: djbh};
            data2.push(data4);
        }
        var dataJson = JSON.stringify(data2);
        return dataJson;
    }

    //满送保存
    function saveMS() {
        var divs = $("#msDIV");
        console.log(divs);

        var data2 = new Array();
        var tr = divs.children('table').children('tbody').children('tr');
        console.log(tr);
        for (var j = 0; j < tr.length; j++) {
            var data4 = {};
            var spcode = tr.eq(j).children(".spcode").text();
            var spname = tr.eq(j).children(".spname").text();
            var spgg = tr.eq(j).children(".spgg").text();
            var spdwn = tr.eq(j).children(".spdw").text();
            var spdw = tr.eq(j).children(".key").text();
            var scqy = tr.eq(j).children(".scqy").text();
            var spyhj = tr.eq(j).children(".spyhj").text();
            var djbh = $("#promotion_sn").val();
            data4 = {
                spcode: spcode,
                spname: spname,
                spgg: spgg,
                spdwn: spdwn,
                spdw: spdw,
                scqy: scqy,
                spyhj: spyhj,
                djbh: djbh
            };
            data2.push(data4);
        }
        var dataJson = JSON.stringify(data2);
        return dataJson;
    }

//促销商品保存
function saveCX() {
    var checkVal = $("#apply_goods_type").val();

        var spans = $("#pselect").children("#tab01");
        var data2 = new Array();
        var tr = spans.children('tbody').children('tr');
        for (var j = 0; j < tr.length; j++) {
            var data4 = {};

            var spcode = tr.eq(j).children(".spcode").text();
            var spname = tr.eq(j).children(".spname").text();
            var spgg = tr.eq(j).children(".spgg").text();
            var spdwn = tr.eq(j).children(".spdw").text();
            var spdw = tr.eq(j).children(".key").text();
            var scqy = tr.eq(j).children(".scqy").text();
            var splsj = tr.eq(j).children(".splsj").text();
            var djbh = $("#promotion_sn").val();
            data4 = {
                spcode: spcode,
                spname: spname,
                spgg: spgg,
                spdwn: spdwn,
                spdw: spdw,
                scqy: scqy,
                splsj: splsj,
                is_back_select: checkVal,
                djbh: djbh
            };
            data2.push(data4);
        }
        var dataJson = JSON.stringify(data2);
        return dataJson;
    }

    function showWindow() {
       /* var width = 1000;
        var height = 500;
        var iTop = (window.screen.height - height) / 2;       //获得窗口的垂直位置;
        var iLeft = (window.screen.width - width) / 2;*/
        $("#newaddpromation").modal('show');

        whjPaging();
        findList();
//        window.open('popup.html', 'newwindow', 'height=' + height + ',width=' + width + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
    }

    //限量特价新增行
    function addTable(tabId) {
        tableId = tabId;
        $("#checkMore").show();
        showWindow();
    }

    //促销商品新增行
    function addTr01(tabId) {
        tableId = tabId;
        $("#checkMore").show();
        showWindow();
    }

    //满送商品新增行
    function addTab02(tabId) {
        tableId = tabId;
        $("#checkMore").hide();
        showWindow();
    }


    // 增加商品
    function addBut(tabId) {
    	tableId = tabId;
        showWindow();
    };


    //全局变量
    var tableId;

    //公用方法
    function addT(arr) {
        //限量特价
        if (tableId == "tabtest") {
            var divs = $("#promotion_type6");
            var tr = divs.children('table').children('tbody').children('tr');
                var arrs = [];
                for (var i = 0; i < tr.length; i++) {
                    var spcode = tr.eq(i).children(".spcode").text();
                    arrs.push(spcode);
                }
                if ($.inArray( arr[0],arrs) == -1) {
                    $("#tabtest").append("<tbody><tr align='center'>"
                        + "<td class='spcode'>" + arr[0] + "</td>"
                        + "<td class='spname'>" + arr[1] + "</td>"
                        + "<td class='splsj'>" + arr[8] + "</td>"
                        + "<td><input  type='text' onblur='priceCK(this)' class='sptj form-control tdform tdlist' ></td>"
                        + "<td><input type='text' onblur='kucunCk(this)' class='xgkc form-control tdform tdlist' ></td>"
                        + "<td><input type='text' onblur='kucunCk(this)' class='rjxgl form-control tdform tdlist' ></td>"
                        + "<td><button class='btn' onclick='deltr(this)'>删除</button></td>"
                        + "</tr></tbody>");
                }
        } else if (tableId == "tab02") { //满送
            $("#tab02").children("tbody").remove();
            var divs = $("#msDIV");
            var tr = divs.children('table').children('tbody').children('tr');
            var arrs = [];
            for (var i = 0; i < tr.length; i++) {
                var spcode = tr.eq(i).children(".spcode").text();
                arrs.push(spcode);
            }
            if ($.inArray( arr[0],arrs) == -1) {
                $("#tab02").append("<tbody><tr align='center'>"
                    + "<td class='spcode'>" + arr[0] + "</td>"
                    + "<td class='spname'>" + arr[1] + "</td>"
                    + "<td class='spgg'>" + arr[2] + "</td>"
                    + "<td class='spdw'>" + arr[3] + "</td>"
                    + "<td class='key' style='display: none;'>" + arr[4] + "</td>"
                    + "<td class='scqy'>" + arr[5] + "</td>"
                    + "<td class='spyhj'>" + 0.01 + "</td>"
                 /*   + "<td><input type='text' onblur='priceCK(this)' class='spyhj tdform form-control mslist' align='center'></td>"*/
                    + "<td><button class='btn'  onclick='deltr02(this)'>删除</button></td>"
                    + "</tr></tbody>");
            }
        } else if (tableId == "tab01") {//选择商品
            var divs = $("#pselect");
            var tr = divs.children('table').children('tbody').children('tr');
            var arrs = [];
            for (var i = 0; i < tr.length; i++) {
                var spcode = tr.eq(i).children(".spcode").text();
                arrs.push(spcode);
            }
            if ($.inArray( arr[0],arrs) == -1) {
                $("#tab01").append("<tbody><tr align='center'>"
                    + "<td class='spcode'>" + arr[0] + "</td>"
                    + "<td class='spname'>" + arr[1] + "</td>"
                    + "<td class='spgg'>" + arr[2] + "</td>"
                    + "<td class='spdw'>" + arr[3] + "</td>"
                    + "<td class='key' style='display: none;'>" + arr[4] + "</td>"
                    + "<td class='scqy'>" + arr[5] + "</td>"
                    + "<td class='splsj'>" + arr[8] + "</td>"
                    + "<td><button class='btn' onclick='deltrpc(this)'>删除</button></td>"
                    + "</tr></tbody>");
            }
        } else { //套餐选择商品
        	 var tr = $("#promotion_type5").find('tr');
             //var tr = divs.childrens('table').childrens('tbody').childrens('tr');
             var arrs = [];
             for (var i = 0; i < tr.length; i++) {
                 var spcode = tr.eq(i).children(".spcode").text();
                 arrs.push(spcode);
             }
             if ($.inArray( arr[0],arrs) == -1) {
            	 $("#" + tableId).append("<tbody id='taoTbody'><tr align='center'>"
                         + "<td class='spcode'>"+arr[0]+"</td>"
                         + "<td>"+arr[1]+"</td>"
                         + "<td><input type='text' class='spnum tdform  form-control' value=''></td>"
                         + "<td>"+arr[8]+"</td>"
                         + "<td>"+arr[9]+"</td>"
                         + "<td><button clas='btn btn-summit' onclick='del(this)'><i class='glyphicon glyphicon-trash'></i>删除</button></td>"
                         + "</tr></tbody>");
             }

        }
    }

    //删除
    //限量特价删除行
    function deltr(index) {
        if (confirm('确定要删除商品嘛?')) {
            $(index).parent().parent().remove();//删除当前行
        }
    }

    //满送删除行
    function deltr02(index) {
        if (confirm('确定要删除商品嘛?')) {
            $(index).parent().parent().remove();//删除当前行
        }
    }

    //选择商品删除行
    function deltrpc(index) {
        if (confirm('确定要删除商品嘛?')) {
            $(index).parent().parent().remove();//删除当前行
        }
    }


    //选择商品隐藏
    function hideProductSelect() {
        $("#pselect").hide();
    }


    $(function () {
        $("#s2,#tab01,#nogoods").hide();
        $(".selest").change(function () {
            if (this.value == "1") {
                $("#s2,#tab01").hide();
            }
            if (this.value == "2") {
                $("#s2,#tab01").show();
            }
            if (this.value == "0") {
                $("#s2,#tab01").show();
            }
        })
    })

//llc
 //库存相关校验
function kucunCk(obj) {
    var num = obj.value;
    var re=/^[1-9]\d*$/;
    if(!re.test(num)){
        alert("请输入整数件数");
        isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
    }
}
//价格相关校验
function priceCK(obj) {
    var num = obj.value;
    var re=/^[0-9]+([.]{1}[0-9]{1,2})?$/;
        if(!re.test(num)){
            alert("请输入正确金额");
            isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);
    }
}
//llc
//-------------------
    //弹窗-开始
        var pageSize = 5;
        var currentPage = 1;
        var total= 0,totalPage = 0;
        $(function () {
//           findList();
            $("#findPage").click(function () {
                findList();
            });
        });

        //分页查询方法
        function findList() {
        	var zjm = $.trim($("#zjm").val());
            $.ajax({
                url: "/sales/route/goodsList",
                async: false,
                type: "post",
                data: {
                    zjm: zjm,
                    pageSize: pageSize,
                    currentPage: currentPage
                },
                success: function (backData) {
                    var list = backData.result;
                   /* if(list.length == 0){
                    	$("#tbody").remove();
                    	$("#pageArea").hide();
                    	return;
                    }*/
                    total = backData.count;
                    totalPage = Math.ceil(total/pageSize);
                    var currentPage = backData.currentPage;
                    var str = "";
                    $.each(list, function (i, item) {
                    	if(item.kucunshuliang==null){
                    		item.kucunshuliang=0;
                    	}
                    	if(item.chengbendanjia==null){
                    		item.chengbendanjia=0;
                    	}
                    	if(item.guige==null){
                    		item.guige='';
                    	}
                    	if(item.danwei==null){
                    		item.danwei='';
                    	}
                    	if(item.shengchanchangjia==null){
                    		item.shengchanchangjia='';
                    	}
                    	if(item.kucunshuliang==null){
                    		item.kucunshuliang=0;
                    	}
                    	if(item.lsj==null){
                    		item.lsj=0;
                    	}
                    	if(item.chandi==null){
                    		item.chandi='';
                    	}
                       	 str += "<tr data-name="+item.shangpinbianhao+">"
                       	 	+ "<td width='30'><input class='checkboxxxall' type='checkbox' name='test'></td >"
                       	 	+ "<td width='100'>"+ item.shangpinbianhao + "</td>"
                       	 	+ "<td width='200'>"+ item.shangpinmingcheng + "</td>"
                       	 	+ "<td width='200'>"+ item.guige + "</td>"
                       	 	+ "<td width='60'>" + item.danwei+ "</td>"
                       	 	+ "<td style='display: none;'>" + item.key+ "</td>"
                       	 	+ "<td width='200'>" + item.shengchanchangjia+ "</td>"
                       	 	+ "<td width='80'>" + item.kucunshuliang + "</td>"
                       	 	+ "<td width='80'>" + item.chengbendanjia + "</td>"
                       	 	+ "<td width='80'>"+ item.lsj + "</td>"
                            + "<td width='200'>" + item.chandi + "</td>"
                            + "</tr>";
                    });
                    $("#tbody").html(str);
                    $("#pageArea .currentPage").text(currentPage);
                    $("#pageArea .totalPage").text(totalPage);
                    $("#pageArea .total").text(total);
                    $("#pagination_3").whjPaging("setPage",  backData.currentPage, backData.totalPage);
                    /*
                    if(type != 3){
                	   var html = '';
                       for(var i = 1;i<= 5;i++){
	                       	if(i == 1){
	                       		html = '<li id="previous"><a href="javascript:previous()" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
	                       	}
	                       	html += '<li><a class="currentpageli" href="javascript:currentpage(this)">'+i+'</a></li>';
	                       	if(i == totalpage ){
	                       		html += '<li id="next"><a href="javascript:next()" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>';
	                       	}
                       }
                       $("#navArea .pagination").html('').append(html);
                    }*/

                    //$("[name='currentPage']").val(currentPage + 1);
                    //$("[name='totalPage']").val(totalPage);
                }
            });
        }

        //上一页
        function previous() {
            currentPage--;
            if (currentPage < 0) {
                alert("当前页是第一页");
                $("#previous").attr("disabled", true);
            } else {
                findList();
            }
          /* var  currentpage =Number($(".pagination li[class='active']").children('a').text());
           var  currentprevious = currentpage-1;
           if(currentprevious <= 0){
               $("#previous").attr("disabled", true);
           }else{
        	   $(".pagination li").removeClass('active');
        	   $(".pagination li").eq(currentprevious).addClass('active');
        	   $("#previous").attr("disabled", false);
        	   findList(currentprevious,3);
           }*/

        }

        //
        function next() {
            currentPage++;
            if (currentPage >= totalPage) {
                alert("当前页是最后一页");
                $("#next").attr("disabled", true);
            } else {
                findList();
            }
           /* var  currentpage = Number($(".pagination li[class='active']").children('a').text());
            var  currentprevious = currentpage+1;
            if(currentprevious > totalpage){
                $("#next").attr("disabled", true);
            }else{
         	   $(".pagination li").removeClass('active');
         	   $(".pagination li").eq(currentprevious).addClass('active');
         	   $("#next").attr("disabled", false);
         	   findList(currentprevious,3);
            }*/

        }
     /*   $(document).on('click','.pagination li .currentpageli',function(){
        	var currentpage = Number($(this).text());
        	$(".pagination li").removeClass('active');
        	$(this).parent('li').addClass('active');
        	findList(currentpage,3);
        })*/

        //点击当前页
       /* function currentpage(){
        	currentPage = $(this).text();
        	obj.parent('li').addClass('active');
        	findList();
        }*/
        //确认添加新的促销商品
        function confirm1() {
            $("input[class='checkboxxxall']:checkbox:checked").each(function () {
                var tr = $(this).parent().parent();
                var spbh = $(tr).find("td").eq(1).text();
                var spmc = $(tr).find("td").eq(2).text();
                var spgg = $(tr).find("td").eq(3).text();
                var spdwn = $(tr).find("td").eq(4).text();
                var spdw = $(tr).find("td").eq(5).text();
                var sccj = $(tr).find("td").eq(6).text();
                var dqkc = $(tr).find("td").eq(7).text();
                var ckjj = $(tr).find("td").eq(8).text();
                var lsj = $(tr).find("td").eq(9).text();
                var jlgg = $(tr).find("td").eq(10).text();
                var cd = $(tr).find("td").eq(11).text();
                var arr = new Array();
                arr.push(spbh,spmc,spgg,spdwn,spdw,sccj,dqkc,ckjj,lsj,jlgg,cd);
                addT(arr);
            });
            $("#newaddpromation").modal('hide');
            $(".checkboxxxall").prop("checked",false);
        }

        //取消添加新的促销商品，关闭弹窗
        function cancel() {
            $("#newaddpromation").modal('hide');
            $(".checkboxxxall").prop("checked",false);
        }
        function goback(){
            $("#newaddpromation").modal('hide');
            $(".checkboxxxall").prop("checked",false);

        }
        //弹窗结束

        function isInteger(obj) {
            return Math.floor(obj) === obj
        }


        $(document).on('blur','#taoTbody .spnum',function(){
    	  var value = Number($(this).val());
    	  if(value != ''){
    		  if(!isInteger(value)){
        		  $(this).val('').focus();
        		  alert('请输入整数~');
    		  }else if(value < 0){
    			  $(this).val('').focus();
            	  alert('请输入大于0的整数~');
    		  }
    	  }

        });
        $(document).on('blur','#taocanPrice',function(){
        	 var value = Number($(this).val());
        	 if(value !== ''){
        		 if(isNaN(value)){
        			 $(this).val('').focus();
              		 alert('请输入合适的数字~');
              	 }else if(value < 0){
              		 $(this).val('').focus();
              		alert('请输入大于0的数字~');
              	 }
        	 }
        });
        $(document).on('click','#tbody tr',function(){
                if(tableId=="tab02") {
                    var tdinput = $(this).find('td').eq(0).find('input');
                    if(tdinput.prop('checked')){
                        tdinput.prop('checked',false);
                    }else{
                        $(".checkboxxxall").prop("checked",false);
                        tdinput.prop('checked',true);
                    }
            }else {
                var tdinput = $(this).find('td').eq(0).find('input');
                if(tdinput.prop('checked')){
                    tdinput.prop('checked',false);
                }else{
                    tdinput.prop('checked',true);
                }
            }

       });

        function whjPaging(){
        	  $("#pagination_3").whjPaging({
                  totalPage: totalPage,
                  showPageNum: 5,
                  firstPage: '首页',
                  previousPage: '《',
                  nextPage: '》',
                  lastPage: '尾页',
                  skip: '跳至',
                  confirm: '跳转',
                  totalPageText: '共{}页',
                  isShowFL: true,
                  isShowPageSizeOpt: false,
                  isShowSkip: true,
                  isShowRefresh: false,
                  isShowTotalPage: false,
                  isResetPage: true,
                  callBack: function (currPage, pageSize) {
                	  currentPage = currPage;
                	  console.log('currPage:' + currPage + '     pageSize:' + pageSize);
                	  findList();
                  }
              });
        }

//        setTimeout(function(){
//        	whjPaging();
//        },500);
	
	
	
	
	

