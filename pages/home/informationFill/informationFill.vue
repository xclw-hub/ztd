<template>
	<view>
		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>信息填报</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="questionnaire-list">
				<view class="questionnaire-item"  v-for="(item, index) in questionnaire" :key='index' @click="enterDetail(index)">
					<view class="questionnaireNoFill" v-if="item.flag===0">
						<view class="up">
							<view id="questionnaireNoFill-flag">
								<text>未填</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<text>{{item.discription}}</text>
						</view>
					</view>
					<view class="questionnaireFilled"  v-else-if="item.flag===1">
						<view class="up">
							<view id="questionnaireFilled-flag">
								<text>已填</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<text>{{item.discription}}</text>
						</view>
					</view>
					
					<view class="questionnaireOverdue"  v-else>
						<view class="up">
							<view id="questionnaireOverdue-flag">
								<text>过期</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<text>{{item.discription}}</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				questionnaire:[],
				ids:[],
				/* questionnaire:[
					{
						flag:0,		//未填
						startTime:'2021-02-19  12:00',
						endTime:'2021-03-15  12:00',
						title:'有关营商环境的调查问卷',
						publisher:'赵汝杰',
						checker:'李松林',
						time:'2020-12-02 22:49',
						discription:'为了更好地为园区企业提供便捷、高效的服务，优化营商环境，特开展此次调查问卷，请您结合自身遇到的问题，填写调查问卷。感谢您的支持',
						content:[
							{
								kind:1,		//1表示单项选择题
								question:'企业的性质？',
								result:'',
								answer:[
									{
										value:'国有企业',
										checked:false
									},
									{
										value:'私营企业',
										checked:false
									},
									{
										value:'合资企业',
										checked:false
									},
									{
										value:'个体工商户',
										checked:false
									},
								]
							},
							{
								kind:2,		//2表示多项选择题
								question:'企业认为最需要加强哪些方面的融资服务？',
								result:[],
								answer:[
									{
										value:'建立信用担保机构',
										checked:false
									},
									{
										value:'成立针对中小企业融资的专项基金',
										checked:false
									},
									{
										value:'信用和诚信体系建设',
										checked:false
									},
									{
										value:'其他',
										checked:false
									},
								]
							},
							{
								kind:3,		//3表示问答题
								question:'对进一步优化园区营商环境，企业希望得到 政府哪些方面的改进？',
								result:''
							},
						]
					},
					{
						flag:1,		//已填
						startTime:'2021-02-19  12:00',
						endTime:'2021-03-15  12:00',
						title:'有关营商环境的调查问卷',
						publisher:'赵汝杰',
						checker:'李松林',
						time:'2020-12-02 22:49',
						discription:'为了更好地为园区企业提供便捷、高效的服务，优化营商环境，特开展此次调查问卷，请您结合自身遇到的问题，填写调查问卷。感谢您的支持',
						content:[
							{
								kind:0,		//0表示单项选择题
								question:'企业的性质？',
								result:'',
								answer:[
									{
										value:'国有企业',
										checked:true
									},
									{
										value:'私营企业',
										checked:false
									},
									{
										value:'合资企业',
										checked:false
									},
									{
										value:'个体工商户',
										checked:false
									},
								]
							},
							{
								kind:1,		//1表示多项选择题
								question:'企业认为最需要加强哪些方面的融资服务？',
								result:[],
								answer:[
									{
										value:'建立信用担保机构',
										checked:true
									},
									{
										value:'成立针对中小企业融资的专项基金',
										checked:false
									},
									{
										value:'信用和诚信体系建设',
										checked:true
									},
									{
										value:'其他',
										checked:false
									},
								]
							},
							{
								kind:2,		//2表示问答题
								question:'对进一步优化园区营商环境，企业希望得到 政府哪些方面的改进？',
								result:'积极和企业协调沟通解决，优化办理程序，减少不必要流程，做到手续便捷；积极宣传优惠政策，出台利于企业发展的各种税收、技术、创业、人才政策保障企业的稳步向前。'
							},
						]
					},
					{
						flag:2,		//过期
						startTime:'2021-02-19  12:00',
						endTime:'2021-03-15  12:00',
						title:'有关营商环境的调查问卷',
						publisher:'赵汝杰',
						checker:'李松林',
						time:'2020-12-02 22:49',
						discription:'为了更好地为园区企业提供便捷、高效的服务，优化营商环境，特开展此次调查问卷，请您结合自身遇到的问题，填写调查问卷。感谢您的支持',
						content:[
							{
								kind:0,		//0表示单项选择题
								question:'企业的性质？',
								result:'',
								answer:[
									{
										value:'国有企业',
										checked:false
									},
									{
										value:'私营企业',
										checked:false
									},
									{
										value:'合资企业',
										checked:false
									},
									{
										value:'个体工商户',
										checked:false
									},
								]
							},
							{
								kind:1,		//1表示多项选择题
								question:'企业认为最需要加强哪些方面的融资服务？',
								result:[],
								answer:[
									{
										value:'建立信用担保机构',
										checked:false
									},
									{
										value:'成立针对中小企业融资的专项基金',
										checked:false
									},
									{
										value:'信用和诚信体系建设',
										checked:false
									},
									{
										value:'其他',
										checked:false
									},
								]
							},
							{
								kind:2,		//2表示问答题
								question:'对进一步优化园区营商环境，企业希望得到 政府哪些方面的改进？',
								result:''
							},
						]
					}
				] */
			}
		},
		onLoad(option){
			let _this = this
			let token
			/* uni.setStorage({
				key:'token',
				data:'11888311eb09e1c31467236120fc3d67'
			}) */
			uni.getStorage({
				key:'token',
				success:function(res){
					token = res.data
					if(token){
						_this.$request({
							url:'/callQuestionnaires',
							data:{
								'token':token,
								'userId':_this.$store.state.id,
								'type':_this.$store.state.kind
							}
						}).then(res =>{
							if(res[1].data.statusCode != 2000){
								console.log('callQuestionnaires')
								console.log(res[1].data.statusMsg)
							}
							else{
								let questionnaireIds = res[1].data.questionnaireIds
								let length = questionnaireIds.length
								for(let i = 0;i<length;i++){
									_this.$request({
										url:'/getQuestionDetails',
										data:{
											'token':token,
											'questionnaireId':questionnaireIds[i]
										}
									}).then(res =>{
										let data=res[1].data
										if(data.success == false){
											console.log(data.message)
										}
										else{
											data = data.data
											console.log('问卷数据：')
											console.log(data)
											_this.questionnaire.push({
												formId:'',
												flag:0,
												startTime:data.starttime,
												endTime:data.endtime,
												title:data.title,
												publisher:data.author,
												checker:data.examine,
												time:data.time,
												discription:data.content,
												content:[],
											})
											_this.ids.push(questionnaireIds[i])
											let len = data.information.length
											let index = _this.questionnaire.length - 1
											for(let j = 0;j<len;j++){
												_this.questionnaire[index].content.push({
													kind:data.information[j].type,
													question:data.information[j].title,
													result:'',
													answer:[]
												})
												for(let k = 0;k<data.information[j].options.length;k++){
													_this.questionnaire[index].content[_this.questionnaire[index].content.length-1].answer.push({
														value:data.information[j].options[k],
														checked:false
													})
												}
											}
											//判断问卷类型，即已填、未填、过期
											var endtime = new Date(_this.questionnaire[index].endTime)
											var date = new Date()
											if(endtime.getTime() < date.getTime()){//大于号应该为小于号
												_this.questionnaire[index].flag = 2
											}else{
												_this.$request({
													url:'/isDuplicateFill',
													data:{
														'token':token,
														'userId':_this.$store.state.id,
														'type':_this.$store.state.kind,
														'questionnaireId':questionnaireIds[i]
														/* 'questionnaireId':2 */
													}
												}).then(res =>{
													data = res[1].data
													console.log('问卷重复填写数据:')
													console.log(data)
													console.log(questionnaireIds[i])
													if(data.statusCode != 2000){
														_this.questionnaire[index].flag = 1
														console.log(data.statusMsg)
													}else{
														_this.questionnaire[index].flag = 0
														_this.questionnaire[index].formId = data.formId
													}
												}).catch(err =>{
													console.log(err)
												})
											}
										}
									}).catch(err =>{
										console.log(err)
									})
								}
							}
						}).catch(err =>{
							console.log('callQuestionnaires')
							console.log(err)
						})
					}
				},
				fail:function(err){
					console.log('没有存储token，无法使用token登录')
				}
			})
		},
		methods:{
			clickBack(){
				uni.navigateTo({
					url:'../home'
				})
			},
			enterDetail(index){
				let obj=this.questionnaire[index]
				let param={
					startTime:obj.startTime,
					endTime:obj.endTime,
					title:obj.title,
					publisher:obj.publisher,
					checker:obj.checker,
					time:obj.time,
					discription:obj.discription,
					content:obj.content
				}
				if(obj.flag===0){		//进入未填页面
					uni.navigateTo({
						url:'questionnaireNoFill?param='+JSON.stringify(param)+'&questionnaireId='+this.ids[index]+'&formId='+this.questionnaire[index].formId
					})
				}
				else if(obj.flag===1){		//进入已填页面
					uni.navigateTo({
						url:'questionnaireFilled?param='+JSON.stringify(param)+'&questionnaireId='+this.ids[index]
					})
				}
				else{		//进入过期页面
					uni.navigateTo({
						url:'questionnaireOverdue?param='+JSON.stringify(param)+'&questionnaireId='+this.ids[index]
					})
				}
				console.log(param)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #E9E9E9;
	}
	.uniNavBar_left{
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.questionnaire-list{
		.questionnaire-item{
			width: 100%;
			// height: 242rpx;
			background: #FFFFFF;
			padding-top: 37rpx;
			padding-bottom: 31rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			.up{
				display:flex;
				flex-direction: row;
				align-items: center;
				margin-left: 40rpx;
				margin-right: 40rpx;
				.up-title{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
				}
			}
			.down{
				margin-top: 23rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				text{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					font-size: 25rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #AAAAAA;
					line-height: 36rpx;
				}
			}
		}
	}
	#questionnaireNoFill-flag{
		width: 72rpx;
		height: 40rpx;
		background: #2D6BDD;
		border-radius: 5rpx;
		margin-right: 15rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	#questionnaireFilled-flag{
		width: 72rpx;
		height: 40rpx;
		border: 2rpx solid #2D6BDD;
		border-radius: 5Rpx;
		margin-right: 15rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #2D6BDD;
		}
	}
	#questionnaireOverdue-flag{
		width: 72rpx;
		height: 40rpx;
		background: #BFBFBF;
		border-radius: 5rpx;
		margin-right: 15rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
