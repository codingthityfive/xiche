/*$(function() {
	var dialog = parent.dialog.get(window);
	var data = dialog.data; // 获取对话框传递过来的数据
	$('#member_code').val(data);

	$('.btn_submit').on('click', function() {
		var val = $('#member_code').val();
		dialog.close(val);
		dialog.remove();
	});
});*/
var grid_selector = "#grid-table";
var pager_selector = "#grid-pager";
var w_width = $(window).width() * 0.8;
var w_height = $(window).height() * 0.95;
$(document).ready(function () {

    $("#factory").on("dblclick", function () {
        var firstPartyType = $("#type").val();

        if(firstPartyType==""||firstPartyType==null||firstPartyType==undefined){
            btn_alertDialog("提示","请选择甲方类型!");
            return;
        }
        firstPartList(firstPartyType);
    });

    $("#cencelbtn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });

    $("#confirmbtn").click(function(){
        var dialog = parent.dialog.get(window);
        dialog.close().remove();
    });


    $("#grid-table").jqGrid('bindKeys', {"onEnter":function( rowid ) {
            var dialog = parent.dialog.get(window);
            var rowData = $("#grid-table").jqGrid('getRowData',rowid);
            dialog.close(rowData);

        }});

    $("#formSubmit").click(function () {
        var proContacts=getProContact();
        if(proContacts){
            var res = callAjax("saveOrUpdate",proContacts);
            btn_alertDialog("提示", "保存成功");
            var dialog = parent.dialog.get(window);
            dialog.close().remove();
            // alert(res.id);
        }
    });

    

});
$('input[lit=seach]').keyup(function(e) {
    if (e.keyCode == 13) {
        $("#queryBtn").click();
    }
});

function getProContact() {
    var contractname = $("#contractname").val();
    var id = $("#id").val();
    var contractphone = $("#contractphone").val();
    var position = $("#position").val();
    var factory = $("#factory").val();
    var mailbox=$("#mailbox").val();
    var type = $("#type").val();
    if(type==""){
    	btn_alertDialog("提示", "请选择厂家类型");
        return false;
    }
    
     if(contractname==null||contractname==""||contractname==undefined){
         btn_alertDialog("提示", "请填写联系人姓名");
         $("#contractname").focus();
         return false;
     }

    var myreg =/^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(contractphone == '' || contractphone == null){
        btn_alertDialog("提示","请填写手机号码！");
        return false;
    }else {
        if(!myreg.test(contractphone)){
            btn_alertDialog("提示","请填写正确的手机号码！");
            return false;
        }
    }

    if(position==null||position==""||position==undefined){
        btn_alertDialog("提示", "请填写联系人职位");
        $("#position").focus();
        return false;
    }
    if(factory==null||factory==""||factory==undefined){
        btn_alertDialog("提示", "请填写联系人厂家/供应商");
        $("#factory").focus();
        return false;
    }
    // if(mailbox==null||mailbox==""||mailbox==undefined){
    //     btn_alertDialog("提示", "请填写联系人邮箱");
    //     $("#mailbox").focus();
    //     return;
    // }
    var proContact={};
    proContact.id=id;
    proContact.contractname=contractname;
    proContact.contractphone=contractphone;
    proContact.position=position;
    proContact.factory=factory;
    proContact.mailbox=mailbox;
    proContact.type=type;
    return proContact;

}
