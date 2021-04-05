<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
			@clickLeft="clickBack"
		>	
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>选择园区</text>
			</view>
		</uniNavBar>
		<view v-for="(item,index) in parkList" :key="index">
			<view class="content" v-for="(park,id) in item.list" :key="id">
				<view class="park" @click="applyPark(park.pkid,park.title)">
					<view class="body">
						<text class="parkName">{{park.title}}</text>
						<view class="location">
							<image src="../../../static/enterprise/location.png"></image>
							<text>{{park.address}}</text>
						</view>
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
				bindParkId:'',//要绑定的园区的id
				parkName:'',//要绑定的园区的名字
				token:'',
				parkList:[
					/* {
						categoryTitle:'',
						list:[
							{
								pkid:'',
								parkName:'',
								parkLocation:''
							}
						]
					} */
				]
				/* parkName:'雨花经开区',
				parkLocation:'湖南省长沙市雨花经济开发区' */
			}
		},
		computed:{
			applyParkContent(){
				return '请确认是否要向“' + this.parkName + '”发送入园申请？申请成功后即可享受该园区带来的便捷服务。'
			}
		},
		onLoad(){
			let _this = this
			uni.getStorage({
				key:'token',
				success:function(res){
					_this.token = res.data
					_this.$request({
						url:'/parkList',
						data:{}
					}).then(res=>{
						console.log('parkList')
						/* console.log(res[1].data) */
						_this.parkList=res[1].data.data
						console.log(_this.parkList)
					}).catch(err=>{
						console.log(err)
					})
				},
				fail:function(err){
					console.log(err)
				}
			})
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			applyPark(pkid,parkName){
				this.parkName=parkName
				this.bindParkId = pkid
				this.$refs.applyParkPopupDialog.open()
			},
			applyParkConfirm(done) {
				console.log('是');
				let _this=this
				_this.$request({
					url:'/bindPark',
					data:{
						id:_this.$store.state.id,
						parkId:_this.bindParkId,
						token:_this.token,
						parkName:_this.parkName
					}
				}).then(res=>{
					if(res[1].data.statusCode == 2000){
						console.log('bind complete')
						// 需要执行 done 才能关闭对话框
						done()
						
					}else{
						console.log(res[1].data.statusMsg)
					}
				}).catch(err=>{
					console.log(err)
				})
				uni.navigateBack({
					delta:2
				})
				
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
	.uniNavBar_left, .uniNavBar_center, .uniNavBar_right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_center text{		
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.content{
		padding-top: 40rpx;
		padding-left: 40rpx; 
		padding-right: 40rpx;
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
