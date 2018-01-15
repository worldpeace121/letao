$(function () {

  //渲染页面
  var render=function () {
      $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function (info) {
          // console.log(info);
          $('.cate').html(template('tmp-cate',info))
          //一开始就渲染第一个分类和商品
          var cateid=info.rows[0].id;
          $('.cate li').eq(0).addClass('active')
          secondrender(cateid);
        }
      })
  }
    render();

  
  function secondrender(id) {
      $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{
          id:id
        },
        success:function (info) {
          // console.log(info);
          $('.branch').html(template('tmp-brand',info))
        }
      })
  }
  
  $('.cate').on('click','li',function () {
      var id =$(this).data('id')
    secondrender(id);
      $(this).addClass('active').siblings().removeClass('active')
      $('.scrollpro')[0].style.transform='translate3d(0px,0px,0px)';
    $('.scrollpro')[0].style.transition='all .5s'
    
  })
 
  
  
})