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
				<text>惠企政策</text>
			</view>
		</uniNavBar>
		<view class="body">
			<view class="body-left">
				<view class="kindItem-default" v-for="(item, index) in policyKind" :key="index" :class="[item.isChoose ? 'kindItem-choose' : 'kindItem-default']" @click="showPolicy(index)">
					<text>{{item.value}}</text>
				</view>
			</view>
			
			<view class="body-right">
				<view class="noPolicy" v-if="policyKind[showPolicyKindIndex].policyList.length===0">
					<image src="../../../static/home/noPolicy.png"></image>
					<text>该政策类型下没有政策数据</text>
				</view>
				
				<view class="policy" v-else>
					<view class="policyItem" v-for="(item, index) in policyKind[showPolicyKindIndex].policyList" :key='index' @click="enterPolicyDetail(index)">
						<text class="policyItem-description">{{item.description}}</text>
						<view class="policyItem-time">
							<image src="../../../static/enterprise/clock.png"></image>
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 行业选择对话框 -->
		<uni-popup id="selectPopupDialog" ref="selectPopupDialog" type="dialog">
			<uni-popup-dialog 
			:isCancel="true"
			type="info" 
			title="选择行业" 
			content="您还没有选择所属行业，选择行业后我们将会为您匹配更精准的政策信息。"
			:isbuttonLeftBorder="true" 
			textLeftColor="#999999"
			buttonLeftBgColor="#FFFFFF"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="本周不再提醒"
			title_right="选择行业"
			:before-close="true" 
			@cancel="selectCancel"
			@confirm="selectConfirm" 
			@close="selectClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniNavBar,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				policyKind:[
					{
						value:'经营扶持',
						isChoose:1,
						policyList:[]
					}, 
					{
						value:'减税降费',
						isChoose:0,		//默认初始进入是选择该类政策显示
						policyList:[
							/* {
								description:'国家发展改革委完善农林生物质发电价格政策',
								time:'2021-02-08'
							},
							{
								description:'煤层气发电上网电价比照生物质发电价格执行',
								time:'2021-02-07'
							},
							{
								description:'吉林省发展改革委副主任常明主持召开推进生物质发电项目建设座谈会',
								time:'2021-02-07'
							},
							{
								description:'湖南省首家生物质发电厂并网发电年发电量2亿度',
								time:'2021-02-07'
							},
							{
								description:'国家发展改革委完善农林生物质发电价格政策',
								time:'2021-02-06'
							},
							{
								description:'煤层气发电上网电价比照生物质发电价格执行',
								time:'2021-02-04'
							},
							{
								description:'吉林省发展改革委副主任常明主持召开推进生物质发电项目建设座谈会',
								time:'2021-02-03'
							},
							{
								description:'湖南省首家生物质发电厂并网发电年发电量2亿度',
								time:'2021-02-01'
							} */
						]
					},
					{
						value:'人才政策',
						isChoose:0,
						policyList:[]
					},
					{
						value:'投融资',
						isChoose:0,
						policyList:[]
					},
					{
						value:'专项建设',
						isChoose:0,
						policyList:[]
					},
					{
						value:'研发创新',
						isChoose:0,
						policyList:[]
					},
					{
						value:'资质认定',
						isChoose:0,
						policyList:[]
					},
					{
						value:'知识产权',
						isChoose:0,
						policyList:[]
					},
					{
						value:'创业服务',
						isChoose:0,
						policyList:[]
					},
					{
						value:'其他',
						isChoose:0,
						policyList:[]
					}]
			};
		},
		onLoad(option) {
			let _this=this
			this.$nextTick(function () {
			  // Code that will run only after the
			  // entire view has been rendered
			  _this.$request({
			  	url:'/preferentialPolicies/industryChoose',
			  	data:{
			  		'industry':[],//industryKindArr,
			  		'enterpriseId':_this.$store.state.id
			  	}
			  }).then(res =>{
				  let data = res[1].data
				  if(data.statusCode == 3024){
					  console.log(data.statusMsg)
					  _this.$request({
					  	url:'/preferentialPolicies/list',
					  	data:{
					  		'enterpriseId':_this.$store.state.id,
					  		'classification':_this.policyKind[0].value
					  	}
					  }).then(res =>{
					  	console.log('onLoad list')
					  	console.log(res[1].data)
					  	let data =res[1].data
					  	let length = data.length
					  	_this.policyKind[_this.showPolicyKindIndex].policyList = []
					  	for(let i=0;i<length;i++){
					  		_this.policyKind[_this.showPolicyKindIndex].policyList.push({
					  			description:data[i].title,
					  			time:data[i].publicTime,
					  			policyId:data[i].policyId
					  		})
					  	}
					  }).catch(err =>{
					  	console.log(err)
					  })
				  }else{
					  console.log('不存在')
					  _this.$refs.selectPopupDialog.open()
				  }
			  })
			  /* if(option.industryKindArr){
			  	console.log('存在')
			  	console.log(option.industryKindArr)
				
			  	// this.industryKindList=option.industryKindArr.split(',')
			  	// this.changeTimeClock=option.changeTime
			  }else{
			  	console.log('不存在')
			  	_this.$refs.selectPopupDialog.open()
			  } */
			})
		},
		computed:{
			//需要展示的政策类型的index
			showPolicyKindIndex(){
				for(let i=0; i<this.policyKind.length; i++){
					if(this.policyKind[i].isChoose===1){
						return i
					}
				}
			}
		},
		methods:{
			clickBack(){
				uni.navigateTo({
					url:'../home'
				})
			},
			showPolicy(index){
				let _this = this
				for(let i=0; i<this.policyKind.length; i++){
					this.policyKind[i].isChoose=0
				}
				this.policyKind[index].isChoose=1
				_this.$request({
					url:'/preferentialPolicies/list',
					data:{
						'enterpriseId':_this.$store.state.id,
						'classification':_this.policyKind[index].value
					}
				}).then(res =>{
					console.log('select list')
					console.log(res[1].data)
					let data =res[1].data
					let length = data.length
					_this.policyKind[index].policyList = []
					for(let i=0;i<length;i++){
						_this.policyKind[index].policyList.push({
							description:data[i].title,
							time:data[i].publicTime,
							policyId:data[i].policyId
						})
					}
				}).catch(err =>{
					console.log(err)
				})
				// this.$refs.selectPopupDialog.open()
			},
			selectConfirm(done) {
				console.log('选择行业');
				uni.navigateTo({
					url:'industrySelect'
				})
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			selectClose(done) {
				console.log('本周不再提醒');
				done()
			},
			selectCancel(done){
				console.log('取消');
				done()
			},
			enterPolicyDetail(index){
				console.log(index)
				console.log(this.policyKind[this.showPolicyKindIndex].policyList[index].policyId)
				uni.navigateTo({
					url:'policyDetail?policyId='+this.policyKind[this.showPolicyKindIndex].policyList[index].policyId
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
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
	.body{
		display: flex;
		flex-direction:row;
		.body-left{
			display: flex;
			flex-direction: column;
			background-color: #F6F6F6FF;
			height: 100vh;
			.kindItem-default{
				background-color: #F6F6F6FF;
				width: 180rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					line-height: 101rpx;
				}
			}
			.kindItem-choose{
				width: 180rpx;
				height: 100rpx;
				background: #FFFFFF;
				border-left: 6rpx solid #ffaa00;
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					line-height: 101rpx;
				}
			}
		}
		.body-right{
			width: 100%;
			height: 100vh;
			.noPolicy{
				margin-top: 425rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 378rpx;
					height: 180rpx;
				}
				text{
					margin-top: 68rpx;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #AAAAAA;
					line-height: 42rpx;
				}
			}
			.policy{
				display: flex;
				flex-direction: column;
				margin-left: 42rpx;
				margin-right: 53rpx;
				.policyItem{
					margin-top: 43rpx;
					.policyItem-description{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #333333;
						line-height: 38rpx;
					}
					.policyItem-time{
						margin-top: 5rpx;
						display: flex;
						align-items: center;
						image{
							height: 24rpx;
							width: 24rpx;
						}
						text{
							margin-left: 8rpx;
							font-size: 26rpx;
							font-family: Arial;
							font-weight: 400;
							color: #BBBBBB;
							line-height: 42rpx;
						}
					}
				}
			}
		}
	}
</style>
