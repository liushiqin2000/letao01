// 给登陆按钮注册点击事件。获取用户输入的用户名和密码进行验证，发送请求判断用户是否登陆成功
$(".load_btn").on("click",function(){
  var userName=$("input[type='text']").val();
  var password=$("input[type='password']").val();
  console.log(userName,password)
  if(!userName){
    mui.toast('用户名不能为空',{ duration:'long', type:'div' });
    return;
  }
  if(!password){
    mui.toast('密码不能为空',{ duration:'long', type:'div' });
    return;
  }
  $.ajax({
    type:"post",
    url:"/user/login",
    data:{
      username:userName,
      password:password
    },
    success:function(info){
      console.log(info);
      if(info.error){
        mui.toast(info.message,{ duration:'long', type:'div' });
      };
      if(info.success){
        if (location.search.indexOf("back") > -1) {
          //包含了back参数
          location.href = location.search.replace("?back=", "");
        } else {
          location.href = "user.html";
        };
      
    }
  }
});
  });

  //给免费注册的按钮注册点击事件，跳转到注册页面。
  $(".register_btn").on("click",function(){
    // console.log(22);
    window.location.href="register.html";
  })
