// //设置区域滚动在公共类

// 通过用户发送的值。来渲染
var proName = getSearch().key;

$(".lt_search input[type='text']").val(proName);
var page = 1;
var pageSize = 2;
// --------定义全局变量
mui.init({
  pullRefresh: {
    container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down: {
      auto: true,
      //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      callback: function () {
        page = 1;
        render(function (info) {
          //下拉的时候只渲染第一页。
          var html = template("tpl", info);
          $(".lt_product ul").html(html);
          //  手动关闭刷新
          // console.log(mui('.mui-scroll-wrapper').pullRefresh())
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
           //重置上拉加载
           mui(".mui-scroll-wrapper").pullRefresh().refresh(true);

        })
      }
    },
    up: {
      //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      callback: function () {
        //上拉加载的时候page++；
        page++;
        render(function (info) {
          // console.log(info);
          // console.log(info.data.length);
          var html = template("tpl", info);
          $(".lt_product ul").append(html);
          if (info.data.length == "0") {
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
          } else {
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
          }
        })
      }
    },

  }
});
// 用户搜索的已经key值传输过来；

//功能：进行参数的转码代码
function getSearch() {
  var key = location.search;
  // 传输的key值是转码了的，所以我们需要转化成数组

  key = decodeURI(key);

  key = key.slice(1);
  // var result=key.split();

  var result = key.split("&");
  var obj = {};


  result.forEach(function (e, i) {

    var k = e.split("=")[0];
    var v = e.split("=")[1];
    obj[k] = v;
  });
  return obj;

};

function render(callback) {
  // $(".lt_product ul").html("<div class='loading'></div>");
  var obj = {
    page: page,
    pageSize: pageSize,
    proName: proName
  }
  //判断是否添加price或者num参数。
  var isSelect = $(".choiceList li.now");
  if (isSelect.length > 0) {

    var type = isSelect.data("type");
    var value = isSelect.find("i").hasClass("fa-angle-up") ? 1 : 2;
    obj[type] = value;
  } else {
    console.log("不需要排序")
  }


  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: obj,
    success: function (info) {
      setTimeout(function () {
        callback(info);
      }, 1000);



    }
  });
};

// 给搜索按钮注册点击功能，根据用户输入的内容跳转页面再重新渲染。
$(".search_btn").on("click", function () {
  // 点击搜索按钮的时候，手动刷新
  mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
  var txt = $(".lt_search input[type='text']").val();
  location.href = "searchList.html?key=" + txt;

});
// 给choiceList里面的价格和库存注册事件
$(".choiceList li[data-type]").on("tap", function () {

  var $this = $(this);
  //添加now类和切换下箭头
  if (!$this.hasClass("now")) {
    $this.addClass("now").siblings().removeClass("now");
    $(".choiceList li i").addClass("fa-angle-down").removeClass("fa-angle-up");
  }else{
    $(".choiceList li.now").find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
   
  }
  
  // 点击的时候重新手动加载
  mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
   



})


