
$(function () {
  
  document.querySelector(".btn-del").addEventListener('tap', function() {
    var btnArray = ['否', '是'];
    mui.confirm('你确定要删除吗？', '温馨提示', btnArray, function(e) {
      console.log(e);
      if (e.index == 1) {
        console.log(1); //确认
      } else {
        console.log(2); //取消
      }
    })
  });
})