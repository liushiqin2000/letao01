$(function(){

// var arr1= ['耐克','李宁','阿迪达斯'];
// 将设置的数据转换成json字符串再进行储存
// localStorage.setItem("lt_history",JSON.stringify(arr1));//设置的假数据
// 封装一个获取localstorage本地历史的函数getHistory();
function getHistory(){
  var history=localStorage.getItem("lt_history") || "[]";
  var arr=JSON.parse(history);
  return arr;//将获取到了历史记录返回
};
// 封装一个渲染历史记录的函数
function renderHistory(){
  //  先调用获取历史记录的函数。用一个变量进行接收。
  var arr=getHistory();
  //拿到储存的数组后转成对象，渲染，直接前端渲染不需要ajax请求 ;
 var html=template("tpl",{rows:arr});
$(".search_content").html(html);
};

//功能一：进入页面就提取localStorage里面的历史记录。进行动态渲染。
renderHistory();
// 功能二，点击清空历史按钮（委托事件）。
$(".search_content").on("click",".remove_btn",function(){
  localStorage.removeItem("lt_history");
  renderHistory();
})
//功能三：点击删除图标(委托事件)，获取到当前点击的下标。
$(".search_content").on("click",".remove_icon",function(){
  
  var index=$(this).data("index");
 
  var result=getHistory();
  // 用数组的方法删除当前的记录
  result.splice(index,1);
  
  result=JSON.stringify(result);
  console.log(result);
  // 重新储存改变的数据后再渲染
  localStorage.setItem("lt_history",result);
  renderHistory()
  
});
// 功能四：点击搜索按钮。通过输入框用户输入的值。来加入历史记录第一条

$(".search_btn").on("click",function(){

  var txt=$(".lt_search input[type='text']").val().trim();
  $(".lt_search input[type='text']").val('');
  if(txt==""){
    return;
  }
  var arr=getHistory();
  //先判断是否有相同的历史记录。有就删除之前的再欠佳
  if(arr.indexOf(txt)!="-1"){
    var index=arr.indexOf(txt);
    arr.splice(index,1);
  }
  //再判断历史记录条数是否超过10条。超过就删除最后一条
  if(arr.length>=10){
    arr.pop();
    console.log(arr)
  }
  arr.unshift(txt);
  result=JSON.stringify(arr);
  localStorage.setItem("lt_history",result);
  renderHistory();
  location.href="searchList.html?key="+txt;
 
});









});