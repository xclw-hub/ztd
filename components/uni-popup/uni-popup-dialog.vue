<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-cancel" v-if="isCancel">
			<image src="../../static/enterprise/cancel.png" @click="clickCancel"></image>
		</view>
		<view class="uni-dialog-title">
			<text class="uni-dialog-title-text">{{title}}</text>
		</view>
		<view class="uni-dialog-content">
			<text class="uni-dialog-content-text" v-if="mode === 'base'">{{content}}</text>
			<textarea v-else class="uni-dialog-input" v-model="val" type="text" :placeholder="placeholder" placeholder-class="placeholderStyle" :focus="focus"/>
		</view>
		<view class="uni-dialog-button-group">
			<view class="uni-dialog-button-left" :style="{background: buttonLeftBgColor}" @click="close" :class="{ 'active-border': isbuttonLeftBorder }">
				<text :style="{color: textLeftColor}">{{title_left}}</text>
			</view>
			
			<view class="uni-dialog-button-right" :style="{background: buttonRightBgColor}" @click="onOk" :class="{ 'active-border': isbuttonRightBorder }">
				<text :style="{color: textRightColor}">{{title_right}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			// 是否存在取消按键，默认为没有
			isCancel: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			//左边按键有无边框
			isbuttonLeftBorder:{
				type: Boolean,
				default: false
			},
			//左边按键的背景色
			buttonLeftBgColor:{
				type: String,
				default: "#2D6BDD"
			},
			//左边按键字体的背景色
			textLeftColor:{
				type: String,
				default: "#FFFFFF"
			},
			//左边按键有无边框
			isbuttonRightBorder:{
				type: Boolean,
				default: false
			},
			//右边按键的背景色
			buttonRightBgColor:{
				type: String,
				default: "#FFFFFF"
			},
			//右边按键字体的背景色
			textRightColor:{
				type: String,
				default: "#999999"
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			title_left:{
				type: String,
				default: '取消'
			},
			title_right:{
				type: String,
				default: '确认'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			this.popup.mkclick = false
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					if (this.mode === 'input') this.val = this.value
				}, this.mode === 'input' ? this.val : '')
			},
			/**
			 * 点击关闭按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			},
			/**
			 * 点击取消按钮
			 */
			clickCancel(){
				if (this.beforeClose) {
					this.$emit('cancel', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			}
		}
	}
</script>

<style scoped>
	.uni-popup-dialog {
		width: 670rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding-top: 40rpx;
		padding-bottom: 45rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.uni-dialog-cancel{
		align-self: flex-end;
		margin-right: 40rpx;
	}
	.uni-dialog-cancel image{
		height: 40rpx;
		width: 40rpx;
	}
	.uni-dialog-title {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.uni-dialog-title-text {
		/* font-size: 16px;
		font-weight: 500; */
		font-size: 38rpx;
		color: #333333;
		font-family: Microsoft YaHei;
		font-weight: 400;
		/* line-height: 50rpx; */
	}
	.uni-dialog-content {
		margin-top: 52rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 573rpx;
	}
	.uni-dialog-content-text {
		text-align: center;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #666666;
	}
	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 46rpx;
	}
	.uni-dialog-button-left{
		width: 280rpx;
		height: 78rpx;
		border-radius: 39rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20rpx;
	}
	.uni-dialog-button-right{
		width: 280rpx;
		height: 78rpx;
		border-radius: 39rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-dialog-button-left text{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		line-height: 64rpx;
	}
	.uni-dialog-button-right text{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		line-height: 64rpx;
	}
	.active-border{
		border: 2rpx solid #BFBFBF;
	}
	.uni-dialog-input {
		width: 580rpx;
		height: 250rpx;
		border: 1rpx solid #AAAAAA;
		border-radius: 10px;
		padding-top: 28rpx;
		padding-left: 27rpx;
		padding-right: 75rpx;
	}
	.placeholderStyle{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #ACACAC;
	}
</style>