$(function () {
  //渲染页面
  var page=1;
  var pageSize=8;
  function render() {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        // console.log(info);
        $('tbody').html(template('tmp',info))
        
      //  分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          //按钮绑定点击时间
          onPageClicked:function (a,b,c,p) {
            page=p;
            render();
          },
        })
      }
    })
  }
  render()
  
  //添加分类
  $('.addsec').click(function () {
      $('#cateModal').modal('show');
      //渲染一级分类
     $.ajax({
       type:'get',
       url:'/category/queryTopCategoryPaging',
       data:{
         page:1,
         pageSize:100
       },
       success:function (info) {
         // console.log(info);
         $('.dropdown-menu').html(template('tmp-cate',info))
       }
     })
  })
  

  
  //表单验证
  $('#form').bootstrapValidator({
    //组件自己默认不检验一些标签
    excluded: [],//不校验的内容
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      //二级分类
      brandName:{
        validators:{
          notEmpty:{
            message:'二级分类名称不能为空'
          }
        }
      },
      categoryId:{
        validators:{
          notEmpty:{
            message:'一级分类名称不能为空'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'图片不能为空'
          }
        }
      },
    }
  })
  
  
$('#form').on('success.form.bv',function (e) {
    e.preventDefault()
  console.log($(this).serialize());
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      success:function (info) {
          $('#cateModal').modal('hide');
          
        $('#form').data('bootstrapValidator').resetForm(true);
          $('.one-cate').text('请选择一级分类');
          $('.pic').attr('src','./images/none.png')
          
        render();
      }
    })
})
  
  
  //一级分类
  $('.dropdown-menu').on('click','a',function () {
    var id= $(this).data('id')
    $('#categoryId').val(id);
    $('.one-cate').text($(this).text());
  
    //让categoryId校验变成成功
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
})
  //选择图片进行请求
  $('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
      // 图片路径
      // console.log(data.result.picAddr);
      //给img设置
      $('.pic').attr('src',data.result.picAddr);
      
      // console.log(e);
      $('#brandLogo').val(data.result.picAddr);
      
      // 让brandLogo校验变成成功
      $('#from').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })
  
  
  
})