

$(function () {
  
  var page=1;
  var pageSize=5;
  //渲染页面
  function render() {
      $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
          page:page,
          pageSize:pageSize
        },
        success:function (info) {
        //模板渲染
          $('tbody').html(template('tmp',info));
        
          //分页
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            //当前页码
            currentPage:info.page,
            //总页数
            totalPages:Math.ceil(info.total/info.size),
            //按钮绑定点击时间
            onPageClicked:function (a,b,c,p) {
              page=p;
              render();
            },
            itemTexts: function(type, page, current) { //修改显示文字
              switch (type) {
                case "first":
                  return "第一页";
                case "prev":
                  return "上一页";
                case "next":
                  return "下一页";
                case "last":
                  return "最后一页";
                case "page":
                  return page;
              }
            }
          })
        }
      })
  }
  render();
  
  //禁用启用
  $('tbody').on('click','.btn',function () {
    $('#userModal').modal('show')
    var id =$(this).parent().data('id');
    var isdel=$(this).data('isdel');
    
    $('.btn_confirm').off().on('click',function () {
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isdel
        },
        success:function (info) {
            if(info.success){
              $('#userModal').modal('hide');
              render()
            }
        }
      })
    })
   
   
  
  })
  
  
  
  
  
  
  
  
  
  
})