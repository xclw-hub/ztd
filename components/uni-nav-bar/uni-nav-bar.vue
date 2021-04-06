<template>
	<view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
			<uni-status-bar v-if="statusBar" />
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header">
				<view @tap="onClickLeft" class="uni-navbar__header-btns-left">
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container">
					<!-- 标题插槽 -->
					<slot name="center" />
					<!-- </view> -->
				</view>
				<view @tap="onClickRight" class="uni-navbar__header-btns-right">
					<slot name="right" />
				</view>
			</view>
		</view>
		<view class="uni-navbar__placeholder" v-if="fixed">
			<uni-status-bar v-if="statusBar" />
			<view class="uni-navbar__placeholder-view" />
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "../uni-status-bar/uni-status-bar.vue";

	export default {
		name: "UniNavBar",
		components: {
			uniStatusBar
		},
		props: {
			title: {
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: [String, Boolean],
				default: false
			},
			border: {
				type: [String, Boolean],
				default: false
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	};
</script>

<style lang="scss" scoped>
	// $nav-height: 44px;
	$nav-height: 88rpx;
	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		// font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		// font-size: $uni-font-size-lg;
		/* #endif */
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		// color: #333333;
		color: #4CD964;
	}
	.uni-nav-bar-right-text {
		font-size: $uni-font-size-base;
	}

	.uni-navbar {
		width: 750rpx;
		position: sticky;
		top: 0;
		z-index: 999;
		// box-sizing: border-box;
	}

	.uni-navbar__content {
		position: relative;
		width: 750rpx;
		background-color: $uni-bg-color;
		overflow: hidden;
	}

	.uni-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		width: 750rpx;
		height: $nav-height;
		line-height: $nav-height;
	}
	.uni-navbar__header-btns-left {
		display: flex;
		align-items: center;
		width: 200rpx;
		justify-content: flex-start;
		padding-left: 40rpx;
	}
	.uni-navbar__header-btns-right {
		display: flex;
		align-items: center;
		width: 200rpx;
		justify-content: flex-end;
		padding-right: 40rpx;
	}
	.uni-navbar__header-container {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-navbar__placeholder-view {
		height: $nav-height;
	}

	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
	}

	.uni-navbar--shadow {
		/* #ifndef APP-NVUE */
		// box-shadow: 0 1px 6px #ccc;
		box-shadow: 0 1rpx 6rpx #ccc;
		/* #endif */
	}

	.uni-navbar--border {
		// border-bottom-width: 6rpx;
		border-bottom-width: 2rpx;
		border-bottom-style: solid;
		border-bottom-color: $uni-border-color;
		// border-bottom-color: #C7C7C7;
	}
</style>
