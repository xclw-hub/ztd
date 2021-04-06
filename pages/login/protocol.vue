<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
			@clickLeft="clickBack"
		>	<view slot="left" class="uniNavBar_left">
				<image class="return" src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>用户协议及隐私保护声明</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view id="num1">
				<p>在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。本协议约定北京笃威迩数字技术有限公司（以下简称“笃威迩”）与用户之间关于“招易达”软件服务（以下简称“服务“）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由笃威迩随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本APP中查阅最新版协议条款。在修改协议条款后，如果用户不接受修改后的条款，请立即停止使用“招易达”提供的服务，用户继续使用服务将被视为接受修改后的协议。</p>
			</view>
			<view id="num2">
				<p>一、账号注册</p>
				<br/>
				<p>1、用户在使用本服务前需要注册一个“招易达”账号。“招易达”账号应当使用用户身份的个人基础信息进行绑定注册，服务可以根据用户需求或产品需要对账号注册和绑定的方式进行变更，而无须事先通知用户。</p>
				<br/>
				<p>2、在用户注册及使用本服务时，笃威迩需要搜集能识别用户身份的个人信息以便服务可以在必要时联系用户，或为用户提供更好的使用体验。搜集的信息包括但不限于用户的姓名、地址；笃威迩同意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。</p>
			</view>
			<view id="num3">
				<p>二、用户个人隐私信息保护</p>
				<br/>
				<p>1、如果笃威迩发现或收到他人举报或投诉用户违反本协议约定的，有权不经通知随时对相关内容，包括但不限于用户资料、发贴记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁 、设备封禁 、功能封禁 的处罚，且通知用户处理结果。</p>
				<br/>
				<p>2、因违反用户协议被封禁的用户，可以自行与笃威迩联系。其中，被实施功能封禁的用户会在封禁期届满后自动恢复被封禁功能。被封禁用户可提交申诉，笃威迩将对申诉进行审查，并自行合理判断决定是否变更处罚措施。</p>
				<br/>
				<p>3、用户理解并同意，笃威迩有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。</p>
				<br/>
				<p>4、用户理解并同意，因用户违反本协议约定，导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户应当赔偿笃威迩与合作公司、关联公司，并使之免受损害。</p>
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
				
			}
		},
		methods: {
			clickBack(){		//导航栏返回按键
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style scoped>
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_left, .uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_center text{
		white-space: nowrap;		/* 禁止换行 */
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.content{
		padding-top: 42rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 62rpx;
	}
	.content p{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 50rpx;
		text-indent: 40rpx;
	}
	.content #num2, #num3{
		margin-top: 64rpx;
	}
</style>
