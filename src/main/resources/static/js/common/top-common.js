//全局域名
var basePath = $("#basePath").val();

//用于验证特殊字符的正则表达式:返回true表示有特殊字符
function specialVal(str) {
	//var pattern = new RegExp("[`~!@%#￥$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]"); 
	var pattern = new RegExp("[~!@#$%^&*]"); 
	if (pattern.test(str)) {
		return true;
	}
	return false;
}

/**
 * 数字验证  使用用法：在input框上加上 onkeyup="clearNoNum(this,digits)"
 * 限制了最大输入长度为16位
 * @param obj 当前传象，传this即可
 * @param digits 小数保留位数，不传值则取整,举例：onkeyup="clearNoNum(this,5)" 代表限制输入5位小数
 */
function clearNoNum(obj,digits){
	if (!digits) {
		obj.value = obj.value.replace(/\D/g,"")
	} else {
		obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
	    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
	    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
	    if (digits == 1) {
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3');//只能输入一个小数  
	    }else if (digits == 2) {
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
	    }else if (digits == 3){ //三位小数
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');//只能输入三个小数  
	    }else if (digits == 4) { //四位小数
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');//只能输入四个小数  
	    }else if (digits == 5) { //五位小数
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/,'$1$2.$3');//只能输入五个小数  
	    }else if (digits == 6) { //五位小数
	    	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/,'$1$2.$3');//只能输入六个小数  
	    }
	    var index = obj.value.indexOf(".");
	    if (index > 0) {
	    	//截掉超过digits位的小数
	    	obj.value = obj.value.substring(0,index + digits + 1);
	    }
	}
	//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
	if(obj.value.indexOf(".")< 0 && obj.value !=""){
        obj.value= parseFloat(obj.value); 
    }
	//如果是百分比的
	if (digits == 3 && Number(obj.value) > 9999.9999) {
		obj.value = null;
	}
	//整数部分长度不能参超过10
	if (Number(obj.value) > 9999999999.999999) {
		obj.value = null;
	}
	
}