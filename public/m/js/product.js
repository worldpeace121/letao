$(function () {
  //渲染页面
  var page=1;
  var pageSize=5;
  function render() {
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
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
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) {
              page=p;
            render();
          }
        })
      }
    })
  }
  render()
  
  
  //添加商品
  $('.addpro').click(function () {
    $('#addModal').modal('show');
    
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        //渲染二级分类
        $('.dropdown-menu').html(template('tmp-cate',info));
      }
    })
  })

  //选择二级分类
  $('.dropdown-menu').on('click','a',function () {
      var id =$(this).data('id');
      //存id
      $('#brandId').val(id)
    
      $('.two-cate').text($(this).text())
    
      //手动验证
      $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
      
      
  })
  
  var arr=[]; //存图片的地址
  //上传图片
    $('#fileupload').fileupload({
      dataType:'json',
      done:function (e,data) {
        if(arr.length >= 3){
          return false;
        }
        
        // console.log(data.result);
        arr.push(data.result);
        
        //显示图片
          $('.img-box').append($('<img src="'+ data.result.picAddr +'"  width="150" height="100">'))
        
        
        //手动验证
        
        if(arr.length==3){
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
       }else {
          $('#form').data('bootstrapValidator').updateStatus('brandLogo','INVALID');
        }
      }
    })
  
  //表单验证
  $('#form').bootstrapValidator({
    excluded: [],  //去掉隐藏不校验的
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId:{
        validators: {
        notEmpty: {
          message: '二级分类名称不能为空'
        }
      }
    },
      proName:{
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc:{
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num:{
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          },
          regexp:{
            regexp:/^[1-9]*\d$/,
            message:'请输入合理的数'
          }
        }
      },
      size:{
        validators: {
          notEmpty: {
            message: '商品尺寸不能为空'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入合理的尺寸，例：38-42'
          }
        }
      },
      oldPrice:{
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      price:{
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      brandLogo:{
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      }
      
  }
  })
  
  $('#form').on('success.form.bv',function (e) {
      e.preventDefault();
      
      var formdata=$('#form').serialize();
      formdata += '&picName1="'+ arr[0].picName +'"&picAddr1="'+ arr[0].picAddr +'"';
      formdata += '&picName2="'+ arr[1].picName +'"&picAddr2="'+ arr[1].picAddr +'"';
      formdata += '&picName3="'+ arr[2].picName +'"&picAddr3="'+ arr[2].picAddr +'"';
    
      $.ajax({
        type:'post',
        url:'/product/addProduct',
        data:formdata,
        success:function (info) {
            if(info.success){
              $('#addModal').modal('hide');
              page=1;
              render();
              $('#form').data("bootstrapValidator").resetForm(true);
              $('.two-cate').text('请选择二级分类');
              
              $('.img-box img').remove()
              arr=[];
            }
        }
      })
  })
  
  
  
})