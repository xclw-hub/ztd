<template>
	<view class="mainCon">
		<uniNavBar status-bar="true" backgroundColor="#FFFFFF" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png" mode="heightFix"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>自定义与会成员</text>
			</view>
		</uniNavBar>
		<view class="list" v-for="(item, index) in list" :key="index">
			<view class="bg" style="height: 50rpx;background-color: #F3F3F3;">

			</view>
			<view class="frist">
				<view class="blue">

				</view>
				<text>新增{{index|NumberToChinese}}</text>
				<image src="/static/meeting/delete.png" mode="heightFix" @click="shanchu(index)" v-if="index!=0">
				</image>
			</view>
			<view class="name">
				<text>姓名</text>
				<input type="text" v-model="item.name" :placeholder="name_placeholder" />
			</view>
			<view style="margin-left: 38rpx;margin-right: 38rpx; margin-top: 20rpx;border:1px solid #F2F2F2" />
			<view class="job">
				<text>职务</text>
				<input type="text" v-model="item.job" :placeholder="job_placeholder" />
			</view>
			<view style="margin-left: 38rpx;margin-right: 38rpx; margin-top: 20rpx;border:1px solid #F2F2F2" />
			<view class="telephone">
				<text>联系电话</text>
				<input type="text" v-model="item.telephone" :placeholder="telephone_placeholder" />
			</view>
		</view>
		<view class="bottom">
			<view class="zhanwei">

			</view>
			<view class="add" @click="add">
				<image src="/static/meeting/add.png" mode="heightFix"></image>
				<text>增加与会人员</text>
			</view>
		</view>
		<view class="diagnosis-btn">
			<view class="diagnosis-btn-left" @click="clickCancel">
				<text>取消</text>
			</view>
			<view class="diagnosis-btn-right" @click="clickConfirm">
				<text>确认参加</text>
			</view>
		</view>
		<view class="bgg">

		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
	var chnUnitChar = ["", "十", "百", "千"];

	function SectionToChinese(section) {
		var strIns = '',
			chnStr = '';
		var unitPos = 0;
		var zero = true;
		while (section > 0) {
			var v = section % 10;
			if (v === 0) {
				if (!zero) {
					zero = true;
					chnStr = chnNumChar[v] + chnStr;
				}
			} else {
				zero = false;
				strIns = chnNumChar[v];
				strIns += chnUnitChar[unitPos];
				chnStr = strIns + chnStr;
			}
			unitPos++;
			section = Math.floor(section / 10);
		}
		return chnStr;
	}
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				meetingId:0,		//会议ID
				enterpriseId:0,		//包括企业用户的ID以及个人用户所在企业的ID
				token:'',
				name_placeholder: '请输入姓名',
				job_placeholder: '请输入职务',
				telephone_placeholder: '请输入联系方式',
				list: [{
					name: '',
					job: '',
					telephone: '',
				}]
			}
		},
		filters: {
			NumberToChinese(num) {
				var unitPos = 0;
				var strIns = '',
					chnStr = '';
				var needZero = false;
				num++;
				if (num === 0) {
					return chnNumChar[0];
				}
				while (num > 0) {
					var section = num % 10000;
					if (needZero) {
						chnStr = chnNumChar[0] + chnStr;
					}
					strIns = SectionToChinese(section);
					strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
					chnStr = strIns + chnStr;
					needZero = (section < 1000) && (section > 0);
					num = Math.floor(num / 10000);
					unitPos++;
				}
				return chnStr;
			},
		},
		onLoad(option) {
			let _this = this
			// console.log(option.meetingId)
			//获取会议ID
			_this.meetingId = option.meetingId
			//获取企业ID
			if(_this.$store.state.kind === '0'){
				_this.enterpriseId = _this.$store.state.id
			}else{		//如果是个人用户，则获取其所在企业id
				let useInfo = _this.$store.state.userInfo
				_this.enterpriseId = useInfo.enterpriseId
			}
			//获取token
			uni.getStorage({
				key:'token',
				success:function(res){
					// console.log(res.data)
					_this.token = res.data
				},
				fail:function(err){
					console.log('token获取失败')
					return
				}
			})
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta:1
				})
				console.log(this.NumberToChinese(1))
			},
			add() {
				this.list.push({
					name: '',
					job: '',
					telephone: '',
				})
			},
			shanchu(index) {
				this.list.splice(index, 1)
			},
			clickCancel() {
				console.log('取消')
				this.isShowDiagnosis = false
				this.isFirst = true
				uni.navigateBack({
					delta:1
				})
			},
			clickConfirm() {
				let _this = this
				_this.isShowDiagnosis = false
				_this.isFirst = true
				console.log(_this.list)
				console.log(_this.enterpriseId)
				console.log(_this.token)
				console.log(_this.meetingId)
				for(let i = 0; i < _this.list.length; i++){
					if(_this.list[i].name==='' || _this.list[i].job==='' || _this.list[i].telephone===''){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: '请填写完整成员信息'
						})
						return
					}
					_this.$request({
						url:'/customParticipants',
						data:{
							token: _this.token,
							meetingId: _this.meetingId,
							enterpriseId: _this.enterpriseId,
							participantName: _this.list[i].name,
							position: _this.list[i].job,
							phoneNum: _this.list[i].telephone
						}
					}).then(res=>{
						// console.log(res)
						let data = res[1].data
						if(data.statusCode === 2000){
							console.log('添加与会成员成功')
							uni.navigateBack({
								delta:1
							})
						}
						else{
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								duration: 2000,
								title: data.statusMsg
							})
						}
					}).catch(err=>{
						console.log(err)
					})
				}
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.uniNavBar_left {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 36rpx;
			height: 36rpx;
		}
	}

	.uniNavBar_center {
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #000000;
		}
	}

	.uniNavBar_right {
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-family: SourceHanSansCN-Regular;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 28rpx;
		}
	}

	.list {
		background-color: #FFFFFF;
		color: #000000;
		display: flex;
		flex-direction: column;

		.frist {
			height: 50rpx;
			font-size: 34rpx;
			font-weight: bolder;
			flex-direction: row;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.blue {
				background-color: #2D6BDD;
				height: 32rpx;
				width: 8rpx;
				margin-top: 8rpx;
			}

			text {
				padding-left: 30rpx;
				flex: 20;
			}

			image {
				padding-right: 38rpx;
				flex: 1;
				height: 60%;
			}
		}

		.name {
			margin-top: 20rpx;
			font-size: 30rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;

			text {
				padding-left: 38rpx;
				color: #AAAAAA;
			}

			input {
				text-align: right;
				padding-right: 38rpx;
			}
		}

		.job {
			margin-top: 20rpx;
			font-size: 30rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;

			text {
				padding-left: 38rpx;
				color: #AAAAAA;
			}

			input {
				text-align: right;
				padding-right: 38rpx;
			}
		}

		.telephone {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 30rpx;
			flex-direction: row;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;

			text {
				padding-left: 38rpx;
				color: #AAAAAA;
			}

			input {
				text-align: right;
				padding-right: 38rpx;
			}
		}
	}

	.bottom {
				background-color: #F3F3F3;
		display: flex;
		height: 370rpx;
		justify-content: space-between;
		flex-direction: row;
		padding-bottom: 274rpx;
		.zhanwei {}

		.add {
			display: flex;
			padding-right: 38rpx;
			flex-direction: row;
			align-items: center;

			image {
				height: 35rpx;
				padding-right: 10rpx;
			}

			text {
				font-size: 30rpx;
				color: #2D6BDD;
			}
		}
	}

	.mainCon {
		background-color: #F3F3F3;
		height: 100%;
		min-height: 100%;
	}

	.diagnosis-btn {
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		height: 144rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;

		.diagnosis-btn-left {
			margin-left: 40rpx;
			width: 324rpx;
			height: 84rpx;
			border: 1px solid #000000;
			background: #FFFFFF;
			border-radius: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #AAAAAA;
				line-height: 64rpx;
			}
		}

		.diagnosis-btn-right {
			margin-right: 40rpx;
			width: 324rpx;
			height: 84rpx;
			background: #2D6BDD;
			border-radius: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 64rpx;
			}
		}
	}
</style>
