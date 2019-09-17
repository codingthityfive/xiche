$(function(){
	//提交按钮
	$("#pro_audit_btn").click(function () {
		var proNo = $('#proNo').val();
		var status = $('#status').val();
		var auditType = 1;
//		if(status == 1 || status == 4){
//			btn_alertDialog("提示","只有协议审核不通过才能修改！");
//			return false;
//		}
		window.location.href=basePath+ '/pro/getProInfo?proNo='+proNo+"&auditType="+auditType;
	});
	
	//导出附件
	$(".exprotFile").click(function () {
		var attachUrl = $(this).attr("url");
		var fileName = $(this).attr("fileName");
		if(attachUrl.trim().length == 0){
			btn_alertDialog("提示","附件url错误！")
			return false;
		}else{
			window.location.href=basePath+ '/pro/downfile?url='+attachUrl+"&fileName="+fileName;
		}
    })
})

//$(".lastProNoAudit").click(function () {
//	var lastProNo = $(this).text();
//	var auditBtnType = 2;//表示为协议留存点击协议编号查看详情，不显示修改按钮
//	window.location.href=basePath+ '/pro/proDetailShow?proCode='+ lastProNo+"&auditBtnType="+auditBtnType;
//});


$(".proRetained").click(function () {
	var proRetained = $(this).text();
	var auditBtnType = 2;//表示为协议留存点击协议编号查看详情，不显示修改按钮
    //var _stime = $(this).attr("id");
    var proId = $(this).attr("id");

	//window.location.href=basePath+ '/pro/proDetailShow?proCode='+ proRetained+"&auditBtnType="+auditBtnType;
    window.parent.$('#mainFrameTabs').bTabsAdd(proId,"修改前协议",basePath+ '/pro/proDetailShowUpdate?proCode='+ proRetained+"&auditBtnType="+auditBtnType);
});

// $(document).on("mouseover",".Img", function () {
//
//     $(this).parent().find(".imgs").css("display","block");
// });
//
// $(document).on("mouseout",".Img", function () {
//
//     $(this).parent().find(".imgs").css("display","none");
// })
//协议书焦点图
$(document).on("click",".openBtn", function () {
    $("#imgModal").modal('toggle')
    $("#imgModalimgShow").get(0).src = $(this).parent().siblings(".Img")[0].src
})
var offon = true;
$(window).scroll(function(){//滚动浏览器就会执行
    if(offon){
        //获取滚动高度
         var _top = $(window).scrollTop();
        $('.menu').show();
        $('.main ul li').each(function(i){
            //获取当前下标
            var _index = $(this).index();
            var _height = $(this).offset().top+500;//获取上偏移值
//             if(_height > _top){//优先原则
                $('.menu ul li').eq(_index).addClass('on').siblings().removeClass('on');
                return false;//跳出遍历
//             };
        });
    };
});
$('.menu ul li').click(function(){
	
    offon = false;
    var _index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    var _height = $('.main ul li').eq(_index).offset().top;//获取上偏移值
    $('body,html').animate({scrollTop:_height},500,function(){
        offon = true;
    });
});