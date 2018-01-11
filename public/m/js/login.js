
$(function () {
  
  //表单验证
  $('form').bootstrapValidator({
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:{
      //用户名
      username:{
        validators: {
          notEmpty:{
            message:'用户名不能为空！'
          },
          callback:{
            message:'用户名不存在！'
          }
        }
      },
      
      //密码
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空！'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度在6到12之间！'
          },
          callback:{
            message:'密码错误！'
          }
        }
      }
    }
  })
  
  
  //提交表单时，避免页面跳转使用ajax请求，所以禁止自动提交，validator提供了个事件
  $('form').on('success.form.bv',function (e) {
      e.preventDefault();

    $.ajax({
        type:'post',
        url:'/employee/employeeLogin',
        data:$('form').serialize(),
        dataType:'json',
        success:function (info) {
          if(info.success){
            location.href='index.html'
          }
          console.log(info);
          if(info.error==1000){
            $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          }
          if(info.error==1001){
            $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          }
        }
      })
  })
  
  //重置功能，也重置样式
  $('button[type=reset]').on('click',function () {
    $('form').data('bootstrapValidator').resetForm()
  })
  
  
  
  
})