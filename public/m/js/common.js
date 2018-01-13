
$(function () {


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
  
  
  
  
  
  
  
  //二级分类
  $('.cate').on('click',function () {
    $(this).next().slideToggle()
  })
  
  
  //menu
  $('.menu').on('click',function () {
      $('.lt-aside').toggleClass('move');
      $('.lt-main').toggleClass('move');
  })
  
  //退出功能
  $('.outlogin').on('click',function () {
    $('#logoutModal').modal('show')
  })
  //确定退出
  $('.btn_logout').click(function () {
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      datatype:'json',
      success:function (info) {
        if(info.success){
          location.href='login.html'
        }
      }
    })
  })
  
  
  //验证是否登录
  //在登录页不做请求
  // location.href得到导航的地址
 
  if(location.href.indexOf('login.html')==-1){
    $.ajax({
      type: 'get',
      url: '/employee/checkRootLogin',
      success: function (info) {
        if (info.error == 400) {
          location.href = 'login.html'
        }
      }
    })
  }
  
  
  
})


