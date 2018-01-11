
//公用js


//进度条
//ajax请求时开始，结束时完成
//jq中提供全局监听ajax开始及结束时事件
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
  
})


$(document).ajaxStop(function () {
  setInterval(function () {
      NProgress.done();
  },1000)
  
})




