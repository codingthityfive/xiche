(function ($) {
  //依赖jQ   
  //获取form表单数据，返回对象类型
  $.fn.z_serializeObject = function () {
    var result = {};
    var extend = function (i, element) {
      var node = result[element.name];
      if ('undefined' !== typeof node && node !== null) {
        if ($.isArray(node)) {
          node.push(element.value);
        } else {
          result[element.name] = [node, element.value];
        }
      } else {
        result[element.name] = element.value;
      }
    };
    $.each(this.serializeArray(), extend);
    return result;
  };
  //添加表单数据  传入对象格式参数
  //input/select/textarea已测   
  $.fn.z_setform = function (jsonValue) {
    var that = this;
    for (var key in jsonValue) {
      var val = jsonValue[key];
      if (jsonValue.hasOwnProperty(key)) {
        var $oinput = that.find("[name=" + key + "]");
        if ($oinput.attr("type") == "radio" || $oinput.attr("type") == "checkbox") {
          $oinput.each(function () {
            if (Object.prototype.toString.apply(val) == '[object Array]') { //是复选框，并且是数组
              for (var i = 0; i < val.length; i++) {
                if ($(this).val() == val[i])
                  $(this).attr("checked", "checked");
              }
            } else {
              if ($(this).val() == val)
                $(this).attr("checked", "checked");
            }
          });
        } else {
          that.find("[name=" + key + "]").val(val);
        }
      }
    }
  };
})(jQuery);