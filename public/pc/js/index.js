
$(function () {
//  轮播图
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
  });

//  区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
  });

  //渲染商品
  function render() {
    
    // $.ajax({
    //   type:'get',
    //   url:'/product/queryProduct',
    //   data
    // })
  }
  render()

})