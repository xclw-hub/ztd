<template>
  <div>
    <div class="canvasView" ref="chart"></div>
  </div>
</template>
<script>
	// import * as echarts from 'echarts';//整体引用
	//按需引用
	import * as echarts from 'echarts/core';
	import {
	    GridComponent
	} from 'echarts/components';
	import {
	    BarChart
	} from 'echarts/charts';
	import {
	    CanvasRenderer
	} from 'echarts/renderers';
	
	echarts.use(
	    [GridComponent, BarChart, CanvasRenderer]
	);
  export default{
	props:{
		xData:Array,
		yData:Array
	},
    data () {
      return {};
    },
    methods: {
      initCharts () {
        let myChart = echarts.init(this.$refs.chart);
        // console.log(this.$refs.chart)
		let option = {
		    grid: {
		        left: '0%',
		        // right: '0%',
		        top: '0%',
				bottom:'0%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value',
		        // boundaryGap: [0, 0.01],
				show:false
		    },
		    yAxis: {
		        type: 'category',
		        // data: ['5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机'],
				data: this.xData,
				axisLabel: {
				        show: true,
						color: '#777777',
						fontSize: 11,
				    },
				    axisTick: {
				        show: false
				    },
				    axisLine: {
				        show: true,
						style:{
							width:1,
							color:'#BBBBBB'
						}
				    }
		    },
		    series: [
		        {
		            type: 'bar',
		            // data: [1746, 1326, 916, 696, 436, 376, 215],
					data: this.yData,
					// barWidth:9, 		//无法同时设置宽度和间距
					barCategoryGap:'60%',
					label: {
							show: true,
							formatter:function(params){ //标签内容
								return  params.value
							},
							position: 'right',
							fontSize: 11,
							color:'#777777'
					},
					itemStyle: {
							borderRadius:[0, 9, 9, 0],
							// color:'#7466CC'
							color: new echarts.graphic.LinearGradient(
											1, 0, 0, 1,
											[
												{offset: 0, color: '#3C77E6'},
												{offset: 1, color: '#01B4FF'}
											]
							)
					},
				}	
		    ]
		}
        // 绘制图表
        myChart.setOption(option);
      }
    },
    mounted () {
      this.initCharts();
    }
  }
</script>

<style>
	.canvasView{
		height: inherit;
		width: inherit;
	}
</style>