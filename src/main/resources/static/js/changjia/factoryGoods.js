/**
* 厂家指定商品
*/
$(function(){
	//选择的商品删除按钮的操作
	$("#choose").on("click",".delwork",function(){
		var del = $(this).parent().parent();
		del.remove();
//		resort();
	});
	
	//添加商品弹窗
	$("#toAddGoods").click(function(){
		var entId = $("#modal_entId").val();
		$("#goodsModal").modal("show");
		queryGoods(entId);//查询商品
	});
	
	//批量商品删除按钮
	$("#toDeleteGoods").on("click",function(){
		var checked = $("#choose :checked").length;
		if(checked>0){
			if(checked == 1 && $("#choose :checked").prop("id") == "checkBoxSelect"){
				btn_alertDialog("提示","选择要删除的商品");
			}else{
				$("#choose :checked").each(function(index,dom){
					if($(dom).prop("id")!="checkBoxSelect"){
						$(dom).parent().parent().remove();
					}
				});
			}
		}else{
			btn_alertDialog("提示","选择要删除的商品");
		}
	});
	
	
	//批量商品选择按钮
	$("#checkBoxSelect").click(function(){
		var attr = $(this).prop("checked");
		$("#choose :checkbox").prop("checked",attr);
	});
	
	//查询按钮
	$("#queryGoodBygoodsCodeBtn").click(function(){
		var inputGoodsCode = $("#inputGoodsCode").val().trim();
		var isGoodsCodeEixts = true;
		if(inputGoodsCode == null || inputGoodsCode == ""){
			btn_alertDialog("提示","输入商品编号");
			return false;
		}
		
		var trList = $("#choose").find("tr");
		
		if(trList.length > 1){
			
			$("#choose :checkbox").prop("checked",false);
			trList.each(function(index,dom){
				var goodsCode =	$(dom).find("td").eq(1).text();
				if(inputGoodsCode == goodsCode.trim()){
					$(dom).parent().prepend($(dom));
					$(dom).find(":checkbox").prop("checked",true);
					isGoodsCodeEixts = false;
				}
			});
			
			if(isGoodsCodeEixts){
				btn_alertDialog("提示","不存在编号是"+inputGoodsCode+"的商品");
			}
			
		}else{
			btn_alertDialog("提示","暂无商品，请添加商品");
		}
		
		
	});
	

//function pointGoods(row){
//	var res = distinct(row);
//	if(res.length>0){
//		btn_alertDialog("提示",res);
//	}else{
//		var trlen = $("#choose tbody").find("tr").length;
//		var index=trlen++;
//		var tbody = $("#choose").children("tbody");	
//		var data = "<tr class='record'>" +
//		"<td><input class='goodsCode' name='goodsCodeMulti' value='"+row.goodsCode+"' readonly/></td>"//商品编号
//		+"<td>"+row.goodsName+"</td>" //商品名称
//		+"<td>"+row.goodsSpec+"</td>"//规格
//		+"<td>"+row.manufacturer+"</td>"//生产厂家
//		+"<td>"+row.pinpaichangjia+"</td>"//品牌厂家
//		+"<td class='stock'>"+row.allStock + "</td>" //商品库存
//		+"<td><a class='delwork'>删除</a></td>"
//		"</tr>";
//		tbody.append(data);
//	}
//}
////转换为 grid 表格
//    tableToGrid("#choose");
/**
 * 商品下标重排序
 * 废除
 * @returns
 */
//function resort(){
//	var index=0;
//	$("#choose tbody").find("tr").each(function(i){
//		$(this).find("input").each(function(j){
//			var name = $(this).attr("name");
//			name = name.replace(/\d/g,index);
//			$(this).attr("name",name);
//		});
//		index++;
//	});
//}

///**
// * 去重
// * @returns
// */
//function distinct(row){
//	var res = "";
//	$("#choose tbody").find(".record").each(function(i){
//		var code  =$(this).find(".goodsCode").val();
//		if(row.goodsCode == code){
//			res="第"+(i+1)+"行商品:"+code+"已经存在,请调整!";
//		}
//	});
//	return res;
//}

});