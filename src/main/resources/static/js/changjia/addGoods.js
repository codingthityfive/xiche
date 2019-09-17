/**
 * 增加厂家账户js
 * @author baishaojun
 */
var grid_selector = "#goods-table";
var pager_selector = "#goods-pager";
$(function(){
	
    /**
	 * 首营商品查询
	 */
	$("#queryBtn").click(function(){
		var entId = $("#entId").val();
		var goodsCode = $("#goodsCode").val();
		var companyName = $("#companyName").val();
		var exsitCodes = "";
		var noExsitCodes = "";
		var code = 0;
		var msg = "";
		if(goodsCode.trim().length>0){
			$.ajax({
				url:basePath+"/changjia/examateBatchCode",
				type:"POST",
				data:{"goodsCode":goodsCode,"entId":entId},
				dataType:"json",
				async:false,
				success:function(data){
					code = data.code;
					msg = data.msg;
					exsitCodes = data.result.exsitCodes;
					noExsitCodes = data.result.noExsitCodes;
				}
			});
			
			if(code == 0){
				//逻辑判断
				if(noExsitCodes.length > 0){
//					btn_alertDialog("提示","不存在的商品编码："+noExsitCodes);
                    alert("不存在的商品编码："+noExsitCodes)
					if(exsitCodes.length>0){
						//只查找有数据的code
						$("#goodsCode").val(exsitCodes);
					    //点击查询
						researchFirstSale();
					}
				}else{
					if(exsitCodes.length>0){
						//只查找有数据的code
						$("#goodsCode").val(exsitCodes);
					    //点击查询
						researchFirstSale();
					}
				}
			}else{
				btn_alertDialog("提示",""+msg);
			}
		}else{
			//点击查询
			researchFirstSale();
		}
	});

    /**
     * 选中商品值
     */
    $("#ensure").click(function(){
    	$("#goodsModal").modal("hide");
        var ids = $("#goods-table").jqGrid("getGridParam", "selarrrow");
        $(ids).each(function (index, id){
            var row = $("#goods-table").jqGrid('getRowData', id);
            pointGoods(row,index);
        });
        
    });
});


function researchFirstSale(){
	var goodsName = $("#goodsName").val();
	goodsName = goodsName.replace(/\s+/g,"");
	var goodsCode = $("#goodsCode").val();
	//goodsCode = goodsCode.replace(/\s+/g,",");
	var facType = $("#factorytype").val().trim();
	var facName = '';
	//自定义厂家类型的,查询全部商品
	if(facType != 3){
		facName = $("#changjia").val();
	}
    $("#goods-table").jqGrid('setGridParam', {
        postData: {
        	"changjia":facName,//厂家名称
        	"factoryType":facType,//厂家类型
        	"goodsName": goodsName,//商品名称
            "goodsCode": goodsCode,//商品编码
            "beActive":$("#state").val()//销售状态
        },page:1
    }).trigger('reloadGrid');
}

function pointGoods(row,index){
	console.info(row);
	var res = distinct(row);
	if(res.length>0){
		//暂时去掉提示
//		btn_alertDialog("提示",res);
//		return;
	}else{
		var trlen = $("#choose tbody").find("tr").length;
		var index=trlen++;
		var tbody = $("#choose").children("tbody");	
		var data = "<tr class='record'>" 
		+"<td><input type='checkbox'/></td>"
		+"<td style='font-size: 11px;'>"+(index+1)+"</td>" //商品名称
		+"<td style='font-size: 11px;'>" 
		+"<input type='hidden' class='goodsCode' name='goodsCodeMulti' value='"+row.goodsCode+"'/>"+row.goodsCode
		+"<input type='hidden' class='erpGoodsCode' name='erpGoodsCode' value='"+row.erpGoodsCode+"'/></td>"//商品编号
		+"<td style='font-size: 11px;'>"+row.goodsName+"</td>" //商品名称
		+"<td style='font-size: 11px;'>"+row.goodsSpec+"</td>"//规格
		+"<td style='font-size: 11px;'>"+row.manufacturer+"</td>"//生产厂家
		+"<td style='font-size: 11px;'>"+row.pinpaichangjia+"</td>"//品牌厂家
		+"<td style='font-size: 11px;' class='stock'>"+row.allStock + "</td>" //商品库存
		+"<td style='font-size: 11px;'><a class='delwork'>删除</a></td>"
		"</tr>";
		tbody.append(data);
	}
}

//转换为 grid 表格
//tableToGrid("#choose");

/**
 * 去重
 * @returns
 */
function distinct(row){
	var res = "";
	$("#choose tbody").find("tr").each(function(i){
		var code  =$(this).find(".goodsCode").val();
		var rowCode = row.goodsCode;
		if(rowCode == code){
			res="第"+(i)+"行商品:"+code+"已经存在!";
			return res;
		}
	});
	return res;
}

$("#add_goods_import").on('click',function () {
	$("#goodsCode").val('')
	var entId = $("#entId").val();
	var companyName = $("#companyName").val();
    var formData = new FormData();
    var name = $("#goods_file").val();
    var exsitCodes = "";
    var noExsitCodes = "";
    var code = 0;
    var msg = "";
    formData.append("file",$("#goods_file")[0].files[0]);
    formData.append("name",name);
    formData.append("entId",entId)
    formData.append("companyName",companyName)
    $.ajax({
        url : basePath+'/changjia/importGoods',
        type : 'POST',
        data : formData,
        // 告诉jQuery不要去处理发送的数据
        processData : false,
        // 告诉jQuery不要去设置Content-Type请求头
        contentType : false,
        beforeSend:function(){
            console.log("正在进行，请稍候");
        },
        success : function(data) {
        	console.log("完成");
        	code = data.code;
			msg = data.msg;
			exsitCodes = data.result.exsitCodes;
			noExsitCodes = data.result.noExsitCodes;
        	if(code == 0){
        		//逻辑判断
        		if(noExsitCodes.length > 0){
        			alert("不存在的商品编码："+noExsitCodes);
        			if(exsitCodes.length>0){
        				//只查找有数据的code
        				$("#goodsCode").val(exsitCodes);
        			    //点击查询
        				researchFirstSale();
        			}
        		}else{
        			btn_alertDialog("提示","上传完成，查询中..");
        			if(exsitCodes.length>0){
        				//只查找有数据的code
        				$("#goodsCode").val(exsitCodes);
        			    //点击查询
        				researchFirstSale();
        			}
        		}
        	}else{
        		btn_alertDialog("提示",""+msg);
        	}
        },
        error : function(responseStr) {
            btn_alertDialog("提示","上传失败");
            console.log("error");
        }
    });
});

/**
 * 下载模板
 */
$("#down_temp").click(function() {
    window.location=basePath+"/changjia/downloadTemplate";
});