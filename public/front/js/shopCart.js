//进购物车页面刷新
mui.init({
  pullRefresh : {
    container:".mui-scroll-wrapper",
    down : {
  
      auto: true,//可选,默认false.首次加载自动上拉刷新一次
      callback :function(){
          $.ajax({
            type:"get",
            url:"/cart/queryCart",
            success:function(info){
              // console.log(info);
              // console.log(mui('.mui-scroll-wrapper').pullRefresh());
              setTimeout(function(){
                if(info.error==400){
                  // 如果用户返回的信息错误，说明用户没有登陆，就跳转到登陆页面
                  window.location.href="login.html?retUrl="+location.href;
                }
                //因为info返回的是数组，所以要转换
                var html=template("tpl",{info:info});
                $("#OA_task_2").html(html);
                    //渲染结束的后手动结束刷新
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              
              },1000);}
                
          });
       

      }
    }
  }
});
//给删除按钮注册点击事件(委托事件)
$("#OA_task_2").on("tap",".remove_btn",function(){
  var id=$(this).data("id");
  // console.log(id);
  $.ajax({
    type:"get",
    url:"/cart/deleteCart",
    data:{
      id:[id]
    },
    success:function(info){
      
      if(info.success){
        // 成功手动调用刷新一次
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
      }
     
    }
    
  })
});
//给每个单选框注册change事件。获取点击的商品数量和价格
$("#OA_task_2").on("change",".btn_check",function(){
  var total=0;
  var isChecked=$('.btn_check:checked');
  isChecked.each(function(){
    total+=$(this).data("num")*$(this).data("price");
  })
  $(".total_price").text(total.toFixed(2)+"元");

  
  
})
//点击更改按钮，回显所选择的信息；
$("#OA_task_2").on("tap",".delete_btn",function(){
  //需要模板引擎渲染用户商品信息
  var data=this.dataset;
  console.log(data);
  var sizeSpan=template("tpl2",data);
  sizeSpan = sizeSpan.replace(/\n/g, "");

  
  mui.confirm(sizeSpan,"温馨提醒",["确认","取消"],function(e){
    
    if(e.index==0){
      var id=data.id;
      var size=$('.lt_edit_size span.now').text();
      var num=$(".lt_edit_size input").val();
      // console.log(id,size,num);
      $.ajax({
        type:"post",
        url:"/cart/updateCart",
        data:{
          id:id,
          size:size,
          num:num
        },
        success:function(info){
           // 成功手动调用刷新一次
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        }
      })
    }
  });
  //给每个span注册点击事件。加类，以及初始化数量框；
 $(".lt_edit_size span").on("tap",function(){
   $(this).addClass("now").siblings().removeClass("now");
     mui(".mui-numbox").numbox()
  
 })

})
