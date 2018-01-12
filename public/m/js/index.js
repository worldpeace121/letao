$(function () {
  
  //1. 初始化echarts实例
  var myChart = echarts.init(document.querySelector(".content-l"));
  
  // 2. 指定图表的配置项和数据
  
  //如果是真实接口：
  var data = [
    {name: "1月", num: 333},
    {name: "2月", num: 200},
    {name: "3月", num: 300},
    {name: "4月", num: 200},
    {name: "5月", num: 100},
    {name: "6月", num: 500},
  ];
  
  var arr1 = data.map(function (e, i) {
    //把return回来的数据重新组成一个属性
    return e.name;
  });
  
  
  var arr2 = data.map(function (e, i) {
    //把return回来的数据重新组成一个属性
    return e.num;
  });
  
  var option = {
    //标题
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data: ['人数']
    },
    xAxis: {
      data: arr1
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: arr2
    }]
  };
  //3. 使用配置项和图标
  myChart.setOption(option);
  
  
  //饼图
  var myChart1 = echarts.init(document.querySelector(".content-r"));
  console.log(arr1);
  var option1 = {
    title : {
      text: '2017年注册人数',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data:['耐克', '阿迪', '新百伦', '迪卡侬', '阿迪打死']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value: 335, name: '耐克'},
          {value: 310, name: '阿迪'},
          {value: 234, name: '新百伦'},
          {value: 135, name: '迪卡侬'},
          {value: 1548, name: '阿迪打死'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  myChart1.setOption(option1)
  
})

