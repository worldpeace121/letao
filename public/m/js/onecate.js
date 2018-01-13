$(function () {
  
  var page=1;
  var pageSize=5;
  //渲染页面
  function render() {
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        // console.log(info);
        $('tbody').html(template('tmp',info))
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
  
  //添加分类
  $('.addcate').click(function () {
    $('#cateModal').modal('show');
  })

  
  //表单校验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //分类
      categoryName:{
        validators:{
          notEmpty:{
            message:'分类名称不能为空'
          }
        }
      }
    }
  })
  
  //表单提交成功事件
  $('#form').on('success.form.bv',function (e) {
      e.preventDefault()
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      success:function (info) {
        console.log(info);
        if(info.success){
          render();
          $('#cateModal').modal('hide');
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})