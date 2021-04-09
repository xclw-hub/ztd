<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
			@clickRight="clickSkip"
		>	
			<view slot="center" class="uniNavBar_center">
				<text>选择园区</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>跳过</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="park" v-for="(item, index) in parkList" :key='index' @click="applyPark(index)">
				<view class="body">
					<text class="parkName">{{item.title}}</text>
					<view class="location">
						<image src="../../static/enterprise/location.png"></image>
						<text>{{item.address}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 已入园对话框 -->
		<uni-popup id="applyParkPopupDialog" ref="applyParkPopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			:content="applyParkContent"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="applyParkConfirm" 
			@close="applyParkClose"></uni-popup-dialog>
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
				parkName:'雨花经开区',
				parkLocation:'湖南省长沙市雨花经济开发区',
				parkList:[],
				selectedParkId:0
			}
		},
		computed:{
			applyParkContent(){
				return '请确认是否要向“' + this.parkName + '”发送入园申请？申请成功后即可享受该园区带来的便捷服务。'
			}
		},
		onLoad() {
			let _this = this
			_this.$request({
				url:'/parkList',
			}).then(res =>{
				// console.log(res[1].data.data)
				let categoryArr = res[1].data.data
				for(let i = 0; i < categoryArr.length; i++){
					let parkArr = categoryArr[i].list
					for(let j = 0; j < parkArr.length; j++){
						_this.parkList.push(parkArr[j])
					}
				}
				console.log(_this.parkList)
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			clickSkip(){
				uni.navigateTo({
					url:'../home/home'
				})
			},
			applyPark(index){
				this.parkName = this.parkList[index].title
				this.selectedParkId = this.parkList[index].pkid
				this.$refs.applyParkPopupDialog.open()
				// console.log(index)
			},
			applyParkConfirm(done) {
				// console.log('是');
				let _this = this
				let enterpriseId = _this.$store.state.id
				uni.getStorage({
					key:'token',
					success:function(res){
						let token = res.data
						console.log(token)
						_this.$request({
							url:'/bindPark',
							data:{
								id: enterpriseId,
								parkId: _this.selectedParkId,
								token: token
							}
						}).then(res =>{
							let data = res[1].data
							if(data.statusCode===2000){
								console.log('成功绑定园区')
								uni.navigateTo({
									url:'../home/home'
								})
							}
							else{
								uni.showToast({
								    icon:'none',
									position:'bottom',
								    title: data.statusMsg
								})
							}
						}).catch(err=>{
							console.log(err)
						})
					},
					fail:function(err){
						console.log(err)
					}
				})
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			applyParkClose(done) {
				console.log('否');
				done()
			}
		}
	}
</script>

<style>
	.uniNavBar_center, .uniNavBar_right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_center text{		
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.uniNavBar_right text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #2D6BDD;
	}
	.content{
		padding-top: 40rpx;
		padding-left: 40rpx; 
		padding-right: 40rpx;
		display: flex;
		flex-direction: column;
	}
	.park{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		height: 220rpx;
		background: linear-gradient(90deg, #2D71EC, #1854C3);
		box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(27, 140, 255, 0.5);
		border-radius: 10rpx;
		margin-bottom: 40rpx;
	}
	.body .parkName{
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 26rpx;
		margin-left: 50rpx;
	}
	.body .location{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 32rpx;
		margin-left: 50rpx;
	}
	.location image{
		width: 22rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
	.location text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 26rpx;
	}
</style>
