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
	    LegendComponent
	} from 'echarts/components';
	import {
	    PieChart
	} from 'echarts/charts';
	import {
	    CanvasRenderer
	} from 'echarts/renderers';
	
	echarts.use(
	    [LegendComponent, PieChart, CanvasRenderer]
	);
  export default{
	props:{
		investData:Array
	},
    data () {
      return {};
    },
    methods: {
      initCharts () {
        let myChart = echarts.init(this.$refs.chart);
        // console.log(this.$refs.chart)
		function sumArray(arr){
			let result = 0
			for (let i=0;i<arr.length;i++){
				result=result+arr[i].value
			}
			return result
		}
		let investDataSum = sumArray(this.investData)
		function toPercent(point){
		    var str=Number(point/investDataSum*100).toFixed(2);
			// var str=Math.floor((point/yDataSum)*100)
		    str+="%";
		    return str;
		}
		let option = {
			grid: {
				left:0,
				right:0,
				top:0,
				bottom:0,
				containLabel: true
			},
			legend: {
				top: '15%',
				right:'10%',
				orient: 'vertical',
			},
			series: [
				{
					type: 'pie',
					center:['25%', '50%'],
					radius: ['35%', '90%'],
					avoidLabelOverlap: false,
					itemStyle: {
						// borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					label: {
						show: true,
						formatter:function(params){ //标签内容
							return  toPercent(params.value)
						},
						position: 'inner',
						fontSize: 11,
						color:'#FFFFFF'
					},
					emphasis: {
					   scale:false
					},
					labelLine: {
						show: false
					},
					// data: [
					// 	{value: 5, name: '江苏省（5）'},
					// 	{value: 4, name: '北京市（4）'},
					// 	{value: 1, name: '广东省（1）'},
					// 	{value: 4, name: '浙江省（4）'},
					// 	{value: 3, name: '四川省（3）'}
					// ]
					data:this.investData
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