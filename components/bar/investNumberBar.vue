<template>
	<view class="content">
		<view :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
	</view>
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
		return {
			option : {
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
													{offset: 0, color: '#7466CC'},
													{offset: 1, color: '#AD85FF'}
												]
								)
						},
					}	
				]
			}
		}
    }
  }
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts () {
				myChart = echarts.init(document.getElementById('echarts'))
				// 绘制图表
				myChart.setOption(this.option);
			}
		}
	}
</script>

<style>
	.echarts{
		height: inherit;
		/* width: inherit; */
	}
</style>