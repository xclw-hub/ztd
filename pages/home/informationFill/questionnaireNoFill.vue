<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image id="left" src="../../../static/enterprise/return.png"></image>
				</view>
			</view>
			<view class="tips" v-if="true">
				<text>填报开始时间：{{questionnaire.startTime}}</text>
				<text>填报结束时间：{{questionnaire.endTime}}</text>
			</view>
			
		</view>
		
		<view class="body">
			
			<view class="description">
				<text class="description-title">{{questionnaire.title}}</text>
				<view class="description-body">
					<text>发布人：{{questionnaire.publisher}}</text>
					<text>审核人：{{questionnaire.checker}}</text>
					<text>时间：{{questionnaire.time}}</text>
				</view>
				<view class="description-content">
					<text>{{questionnaire.discription}}</text>
				</view>
			</view>
			
			<view class="question">
				<view class="question-item" v-for="(item, index) in questionnaire.content" :key="index">
					
					<view class="single-choice" v-if="item.kind==1">
						<text class="choice-question">{{index+1}}.{{item.question}}</text>
						<radio-group class="single-choice-group" @change="radioChange($event,index)">
							<view class="single-choice-group-item" v-for="(answerItem, anserIndex) in item.answer" :key='anserIndex'>
								<view>
									<radio :id="answerItem.value" :value="answerItem.value" :checked="answerItem.checked"></radio>
								</view>
								<label class="single-choice-group-item-value" :for="answerItem.value">
									<text>{{answerItem.value}}</text>
								</label>
							</view>
						</radio-group>
					</view>
					
					<view class="multiple-choice" v-else-if="item.kind==2">
						<text class="choice-question">{{index+1}}.{{item.question}}</text>
						<checkbox-group class="multiple-choice-group" @change="checkboxChange($event,index)">
							<label class="multiple-choice-group-item" v-for="(answerItem, anserIndex) in item.answer" :key='anserIndex'>
								<view>
									<checkbox :value="answerItem.value" :checked="answerItem.checked"></checkbox>
								</view>
								<view class="multiple-choice-group-item-value">
									<text>{{answerItem.value}}</text>
								</view>
							</label>
						</checkbox-group>
					</view>
					
					<view class="essay" v-else>
						<text class="choice-question">{{index+1}}.{{item.question}}</text>
						<textarea class="essay-input" :value='item.result' @blur="bindTextAreaBlur($event,index)"></textarea>
					</view>
					
				</view>
				
				<button type="default" @click="submit">
					<text>提交</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questionnaire:{},
				token:'',
				formId:'',
				questionnaireId:''
			};
		},
		onLoad: function(option) {
			let obj=JSON.parse(option.param)
			this.questionnaireId = option.questionnaireId
			this.formId = option.formId
			this.questionnaire=obj
			console.log(this.questionnaire)
			console.log(this.questionnaireId)
			let _this = this
			uni.getStorage({
				key:'token',
				success:function(res){
					_this.token = res.data
				},
				fail:function(err){
					console.log('没有存储token，无法获取token')
				}
			})
		},
		methods:{
			radioChange: function(e, index) {
				var checked = e.detail.value
				console.log(e)
				console.log(checked)
				this.questionnaire.content[index].result=checked
				// console.log(this.questionnaire.content)
			},
			checkboxChange: function(e, index) {
				var checked = e.detail.value
				console.log(checked)
				console.log(index)
				this.questionnaire.content[index].result=checked
				// console.log(this.questionnaire.content)
			},
			bindTextAreaBlur: function(e, index) {
				var areaValue=e.detail.value
				console.log(index)
				console.log(areaValue)
				this.questionnaire.content[index].result=areaValue
			},
			clickBack(){
				/* uni.navigateTo({
					url:'./informationFill'
				}) */
				uni.navigateBack({
					delta:1
				})
			},
			submitQuestion(index){
				let _this = this
				console.log(_this.questionnaire.content[index].question+':'+_this.questionnaire.content[index].result)
				_this.$request({
					url:'/submitQuestion',
					data:{
						'token':_this.token,
						'userType':_this.$store.state.kind,
						'formId':_this.formId,
						'itemType':_this.questionnaire.content[index].kind,
						'question':_this.questionnaire.content[index].question,
						'answer':_this.questionnaire.content[index].result
					}
				}).then(res =>{
					if(res[1].data.statusCode != 2000){
						console.log(res[1].data.statusMsg)
					}
				}).catch(err =>{
					console.log(err)
				})
			},
			submit(){
				let _this = this
				let length = this.questionnaire.content.length
				for(let i=0;i<length;i++){
					this.submitQuestion(i)
				}
				_this.$request({
					url:'/submitForm',
					data:{
						'token':_this.token,
						'type':_this.$store.state.kind,
						'formId':_this.formId
					}
				}).then(res =>{
					if(res[1].data.statusCode != 2000){
						console.log(res[1].data.statusMsg)
					}else{
						_this.$request({
							url:'/fillInRecord',
							data:{
								'token':_this.token,
								'questionnaireId':_this.questionnaireId
							}
						}).then(res =>{
							console.log('record')
							console.log(res[1].data)
							if(res[1].data.success == true || res[1].data.statusCode == 2000){
								uni.reLaunch({
									url:'informationFill'
								}
								)
							}else{
								console.log(res[1].data.statusMsg)
							}
						}).catch(err =>{
							console.log(err)
						})
					}
				}).catch(err =>{
					console.log(err)
				})
				//console.log(this.questionnaire.content)
			},
		}
	}
</script>

<style lang="scss">
	.nav{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		// z-index: -10;
		background-color: #2D6BDD;
		// padding-top: 36rpx;
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		.head{
			height: 88rpx;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			#left{
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
		}
		.tips{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 37rpx;
			text{
				font-size: 26rpx;
				font-family: Arial;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 42rpx;
			}
		}
	}
	.body{
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		padding-top: 49rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 40rpx;
		// position: relative;
		position: absolute;
		overflow: scroll;
		// top: 240rpx;
		top: 260rpx;
		bottom: 0;
		// top:-48rpx;
		.description{
			display: flex;
			flex-direction: column;
			justify-content: center;
			border-bottom: 1rpx solid #E9E9E9;
			padding-bottom: 43rpx;
			.description-title{
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #333333;
			}
			.description-body{
				margin-top: 27rpx;
				display: flex;
				align-items: center;
				justify-content:space-between;
				text{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					// line-height: 42rpx;
				}
			}
			.description-content{
				margin-top: 38rpx;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
					line-height: 46rpx;
					opacity: 0.8;
				}
			}
		}
		.question{
			margin-top: 59rpx;
			.question-item{
				margin-bottom: 84rpx;
				display: flex;
				flex-direction: column;
				.choice-question{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
					line-height: 44rpx;
				}
				.single-choice-group{
					.single-choice-group-item{
						margin-top: 40rpx;
						display: flex;
						flex-direction: row;
						.single-choice-group-item-value{
							margin-left: 17rpx;
							text{
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #666666;
								line-height: 44rpx;
							}
						}
					}
				}
				.multiple-choice-group{
					.multiple-choice-group-item{
						margin-top: 40rpx;
						display: flex;
						flex-direction: row;
						.multiple-choice-group-item-value{
							margin-left: 17rpx;
							text{
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #666666;
								line-height: 44rpx;
							}
						}
					}
				}
				.essay{
					.essay-input{
						margin-top: 32rpx;
						width: 100%;
						height: 214rpx;
						border: 1rpx solid #BEBEBE;
						border-radius: 5rpx;
						padding: 28rpx;
						box-sizing: border-box;		//解决设置padding后边框溢出问题
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #666666;
						line-height: 44rpx;
					}
				}
			}
		}
		button{
			height: 84rpx;
			background: #2D6BDD;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 26rpx;
			}
		}
	}
</style>
