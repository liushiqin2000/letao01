//根据 用户搜索的页面传入的参数，动态渲染页面
var page=1;
var pageSize=4;
var key=getSearch().key;
//获取用户搜索的内容
// console.log(key);
$(".lt_search input[type='text']").val(key);//设置给input框
//下拉刷新
mui.init({
  pullRefresh : {
    container:".mui-scroll-wrapper",
    down : {
      auto: true,//可选,默认false.首次加载自动下拉刷新一次
      callback :function(){
         page=1;
         render(function(info){
           var html=template("tpl",info);
           $(".lt_product ul").html(html);
           //渲染结束后手动结束下拉刷新。
           mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
           //渲染后重置下拉加载的功能
           mui('.mui-scroll-wrapper').pullRefresh().refresh();

         });
      }
    },
    up: {
      auto: false,//可选,默认false.首次加载自动下拉刷新一次
      callback :function(){
         page++;
         render(function(info){
           if(info.data.length==0){
             //当length等于0的时候说明没有更多数据。停止上拉加载。参数传入true。
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
           }else{
            //  其他的时候。说明还有数据，就传入false
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
           }
           var html=template("tpl",info);
           $(".lt_product ul").append(html);
           
    
         });
      }
    }
  }
});

//封装的渲染的函数
function render(callback){
  //因为涉及多个参数的变更，所以使用对象
  var obj={
    page:page,
    pageSize:pageSize,
    proName:key
  };
  //进行判断看是否需要排序，如果有now说明需要排序
  var isSelected=$(".choiceList li.now");
 
  if(isSelected.length>0){
    var k=isSelected.data("type");  //获取点击的li的type类型
    var v=isSelected.find("i").hasClass("fa-angle-up")?1:2;//通过箭头的类型来判断是升序还是降序
    obj[k]=v;
  }
   
  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:obj,
    success:function(info){
      //模仿延迟的效果。
      setTimeout(function(){
        callback(info);
      },1000);
      
    }
  });



}
//点击搜索按钮的时候，手动下拉刷新一次。
$(".search_btn").on("click",function(){
  console.log(mui('.mui-scroll-wrapper').pullRefresh());
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
 
})
//点击排序按钮，重新渲染。
$(".choiceList li[data-type]").on("tap",function(){
  if($(this).hasClass("now")){
    //有now的这个类，切换上下箭头
    $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else{
    $(this).addClass("now").siblings().removeClass("now");
    // 让所有图标的箭头向下
    $(".choiceList li").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
 

  };
  mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  
})

