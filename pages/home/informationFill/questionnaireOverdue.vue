<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image id="left" src="../../../static/enterprise/return.png"></image>
				</view>
				<view id="right" @click="isDelete" v-if="isInvalid">
					<image id="right" src="../../../static/enterprise/handle.png"></image>
				</view>	
			</view>
			<view class="tips" v-if="false">
				<text>填报开始时间：{{questionnaire.startTime}}</text>
				<text>填报结束时间：{{questionnaire.endTime}}</text>
			</view>
			
		</view>
		
		<view class="body" v-if="isInvalid">
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
									<radio :id="answerItem.value" :value="answerItem.value" :checked="answerItem.checked" disabled="true"></radio>
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
									<checkbox :value="answerItem.value" :checked="answerItem.checked" disabled="true"></checkbox>
								</view>
								<view class="multiple-choice-group-item-value">
									<text>{{answerItem.value}}</text>
								</view>
							</label>
						</checkbox-group>
					</view>
					
					<view class="essay" v-else>
						<text class="choice-question">{{index+1}}.{{item.question}}</text>
							<textarea class="essay-input" :value='item.result' disabled="true"></textarea>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<view class="invalid" v-if="!isInvalid">
			<image src="../../../static/home/invalid.png"></image>
			<text>该内容已被发布者删除</text>
		</view>
		
		<view class="dropOption" v-if="dropOptionShow" @click="doDelete">
			<text>删除</text>
		</view>
		<!-- 删除对话框 -->
		<uni-popup id="deletePopupDialog" ref="deletePopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="确定要删除此填报记录吗？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="deleteConfirm" 
			@close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				isInvalid:true,		//信息是否删除了
				dropOptionShow:false,		//是否显示下拉框
				questionnaire:{}
			};
		},
		onLoad: function(option) {
			let obj=JSON.parse(option.param)
			this.questionnaire=obj
			console.log(this.questionnaire)
		},
		methods:{
			clickBack(){
				/* uni.navigateTo({
					url:'./informationFill'
				}) */
				uni.navigateBack({
					delta:1
				})
			},
			isDelete(){
				this.dropOptionShow=!this.dropOptionShow
			},
			doDelete(){
				this.$refs.deletePopupDialog.open()
				this.dropOptionShow=false
			},
			deleteConfirm(done) {
				console.log('是');
				this.isInvalid=false
				let _this = this
				_this.$request({
					url:'/deleteQuestionnaire',
					data:{
						'questionnaireId':_this.questionnaireId
					}
				}).then(res =>{
					console.log(res[1].data)
					if(res[1].data.statusCode != 2000){
						console.log(res[1].data.statusMsg)
						done()
					}else{
						// 需要执行 done 才能关闭对话框
						done()
					}
				}).catch(err =>{
					console.log(err)
				})
			},
			/**
			 * 对话框取消按钮
			 */
			deleteClose(done) {
				console.log('否');
				done()
			},
			radioChange: function(e, index) {
				var checked = e.detail.value
				// console.log(checked)
				// console.log(index)
				this.questionnaire.content[index].result=checked
				console.log(this.questionnaire.content)
			},
			checkboxChange: function(e, index) {
				var checked = e.detail.value
				// console.log(checked)
				this.questionnaire.content[index].result=checked
				console.log(this.questionnaire.content)
			},
		}
	}
</script>

<style lang="scss">
	.nav{
		background-color: #2D6BDD;
		// padding-top: 36rpx;
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		// z-index: -10;
		.head{
			height: 88rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
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
			#right{
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					width: 38rpx;
					height: 8rpx;
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
		// top:-48rpx;
		position: absolute;
		overflow: scroll;
		// top: 140rpx;
		top: 160rpx;
		bottom: 0;
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
	}
	.invalid{
		// position: relative;
		// top:-48rpx;
		position: absolute;
		top: 140rpx;
		left: 0;
		right: 0;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			margin-top: 404rpx;
			width: 378rpx;
			height: 180rpx;
		}
		text{
			margin-top: 49rpx;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #AAAAAA;
			line-height: 42rpx;
		}
	}
	.dropOption{
		width: 160rpx;
		height: 70rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(122, 122, 122, 0.32);
		border-radius: 10rpx;
		position:absolute;
		z-index: 20;
		top: 110rpx;
		right: 40rpx;
		text-align: center;
		text{
			font-size: 26rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #555555;
			line-height: 66rpx;
		}
	}
</style>
