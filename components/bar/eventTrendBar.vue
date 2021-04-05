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
	    GridComponent,
	    LegendComponent
	} from 'echarts/components';
	import {
	    BarChart,
	    LineChart
	} from 'echarts/charts';
	import {
	    CanvasRenderer
	} from 'echarts/renderers';
	
	echarts.use(
	    [GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer]
	);
  export default{
	props:{
		xData:Array,
		yDataBar:Array,
		yDataLine:Array
	},
    data () {
      return {
	  }
    },
    methods: {
      initCharts () {
        let myChart = echarts.init(this.$refs.chart);
        // console.log(this.$refs.chart)
		let option = {
			grid: {
			    left: '0%',
			    right: '0%',
			    top: 20,
				bottom:60,
			    containLabel: true
			},
			legend: {
				data: ['融资事件（起）', '增速'],
				// y:'right',     //可设定图例在上、下、居中
				bottom:20
			},
			xAxis: [
				{
					type: 'category',
					// data: ['2015', '2016', '2017', '2018', '2019'],
					data: this.xData,
					axisPointer: {
						type: 'shadow'
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
				}
			],
			yAxis: [
				{
					type: 'value',
					min: 0,
					max: 100,
					interval: 20,
					axisLine: {
						show: true,
						style:{
							width:1,
							color:'#BBBBBB'
						}
					}
				},
				{
					type: 'value',
					min: -3,
					max: 2,
					interval: 1,
					axisLine: {
						show: true,
						style:{
							width:1,
							color:'#BBBBBB'
						}
					}
				}
			],
			series: [
				{
					name: '融资事件（起）',
					type: 'bar',
					// data: [ 35, 70, 92, 79, 70],
					data:this.yDataBar,
					// barWidth:9, 		//无法同时设置宽度和间距
					barCategoryGap:'90%',
					label: {
							show: true,
							formatter:function(params){ //标签内容
								return  params.value
							},
							position: 'top',
							fontSize: 11,
							color:'#777777'
					},
					itemStyle: {
							borderRadius:[9, 9, 0, 0],
							color: new echarts.graphic.LinearGradient(
											0, 1, 0, 0,
											[
												{offset: 0, color: '#0086C5'},
												{offset: 1, color: '#2CD7FC'}
											]
							)
					},
				},
				{
					name: '增速',
					type: 'line',
					yAxisIndex: 1,
					// data: [-1, -1.5, -2, -0.7, 1.5],
					data:this.yDataLine,
					itemStyle: {
						color: '#FFB922'
					},
				}
			]
		}
        // 绘制图表
        myChart.setOption(option);
      }
    },
    mounted () {
      this.initCharts()
    }
  }
</script>

<style>
	.canvasView{
		height: inherit;
		width: inherit;
	}
</style>