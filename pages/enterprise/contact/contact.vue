<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
		>	
			<view slot="center" class="uniNavBar_center">
				<text>添加联系人</text>
			</view>
		</uniNavBar>
		<view class="content">
			<button
					class="addContact"
					type="default"
					@click="addContact"
			><text>添加</text></button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				
			}
		},
		methods: {
			// clickBack(){		//导航栏返回按键
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// },
			addContact(){
				uni.navigateTo({
					url:'addContact'
				})
			}
		}
	}
</script>

<style scoped>
	.uniNavBar_left, .uniNavBar_center{
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 300rpx;
	}
	.addContact{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-width: 20rpx;
		width: 670rpx;
		height: 88rpx;
		background: #FFFFFF;
		/* box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(27, 140, 255, 0.5); */
		border-radius: 10rpx;
	}
	.addContact text{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2E6BDE;
		line-height: 26rpx;
	}
</style>
