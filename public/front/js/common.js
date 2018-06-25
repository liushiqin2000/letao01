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
//设置区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});