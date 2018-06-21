mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false//是否显示滚动条
});

// 页面加载的时候显示渲染一级目录
$.ajax({
  type: "get",
  url: "/category/queryTopCategory",
  success: function (info) {

    var html = template("firstTpl", info);
    $(".category_left ul").html(html);
    //动态渲染二级分类的名称
    render(1);
    //  给每个li注册委托事件。并且获取点击的id、在进行动态渲染二级目录
    $(".category_left").on("click", "li", function () {
      $(this).addClass("listColor").siblings().removeClass("listColor");
      var id = $(this).data("id");
      render(id);
      mui('.category_right .mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    })
  }
});
//封装的二级渲染的类名的函数
function render(id) {
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id: id
    },
    success: function (info) {
      //当返回的没有相应的二级信息，设置文本框。
      if (info.rows.length == "0") {
        $(".category_right ul").html("该品牌没有更多信息");
        return;
      }
      var html = template("secoundTpl", info);
      $(".category_right ul").html(html);
    }
  })
};

