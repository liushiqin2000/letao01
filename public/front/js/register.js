//给获取验证码按钮注册点击功能
$(".code_btn").on("click",function(){

  var mobile=$("input.mobile").val();
  if(!mobile){
    mui.toast('手机号码不能为空',{ duration:'long', type:'div' });
    return;
  }
  // 校验 手机号
  if(!/^1[34578]\d{9}$/.test(mobile)){
    mui.toast('手机号格式不正确',{ duration:'long', type:'div' });
    return;
  }
  
  $.ajax({
    type:"get",
    url:"/user/vCode",
    success:function(info){
      console.log(info);
      if(info.vCode){
        var count=5;
       var timeId=setInterval(function(){
           count--;
           $(".code_btn").text("请"+count+"秒后发送");
           $(".code_btn").prop("disabled",true).addClass("disabled");
           if(count==0){
             clearInterval(timeId);
             $(".code_btn").text("再次发送");
             $(".code_btn").prop("disabled",false).removeClass("disabled");
           }
        },1000)
      }
    }
  });

})