//调用轮播图组件
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//根据上个网页传入的id来动态渲染该网页的商品信息；
var productId = location.search.replace("?productId=", "");
console.log(productId);
//获取到id后发送ajax请求
$.ajax({
  type: "get",
  url: "/product/queryProductDetail",
  data: {
    id: productId
  },
  success: function (info) {
    // console.log(info);
      //获取到成功后的码数，进行转换
    var arr=[];
    var sizeNum=info.size;
    // 先转成数组
    sizeNum=sizeNum.split("-");
    
    for(var i=+sizeNum[0];i< +sizeNum[1];i++) {
    
        arr.push(i);
      
    }
    info.sizeArr=arr;
    

    var html = template("tpl", info);
    $(".mui-scroll").html(html);
    mui('.mui-numbox').numbox();
    //动态渲染的内容需要再渲染结束后调用轮播图组件
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
    
    });
    // 给每个尺寸的盒子注册点击事件。加一个now的类
  $(".size span ").on("click",function(){
   $(this).addClass("now").siblings().removeClass("now");
});  
  }

});
// 给加入购物车注册点击事件。收集用户选择的信息。进行校验。判断用户是否登陆。登陆了就提示加入购物车成功。没有登陆就跳入登陆的页面

$(".add_cart").on("click",function(){
  // 选择的尺码
  var selectedSize=$(".size span.now").text();
  // 选择的双数
  var selectedNum=$(".num input[type='number']").val();

  console.log(selectedSize);
  console.log(selectedNum);
  $.ajax({
    type:"post",
    url:"/cart/addCart",
    data:{
      productId:productId,
      size:selectedSize,
      num:selectedNum
    },
    success:function(info){
      console.log(info);
      if(info.error){
        //这个back参数的传入是为了登陆以后看是继续跳到详情页还是其他
        window.location.href="login.html?back="+location.href;
      }else{
        mui.toast('加入购物车成功',{ duration:'long', type:'div' }) 
      }
      
    }
  })
 
})



