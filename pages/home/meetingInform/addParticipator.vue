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
				<image src="/static/meeting/delete.png" mode="heightFix" @click="shanchu(index)" >
				</image>
			</view>
			<view class="name">
				<text>姓名</text>
				<input type="text" 
						v-model="item.name" 
						:placeholder="name_placeholder" 
						:disabled="item.isDisabled"/>
			</view>
			<view style="margin-left: 38rpx;margin-right: 38rpx; margin-top: 20rpx;border:1px solid #F2F2F2" />
			<view class="job">
				<text>职务</text>
				<input type="text" 
				v-model="item.job" 
				:placeholder="job_placeholder" 
				:disabled="item.isDisabled"/>
			</view>
			<view style="margin-left: 38rpx;margin-right: 38rpx; margin-top: 20rpx;border:1px solid #F2F2F2" />
			<view class="telephone">
				<text>联系电话</text>
				<input type="text" 
				v-model="item.telephone" 
				:placeholder="telephone_placeholder" 
				:disabled="item.isDisabled"/>
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
		if((chnStr[0]=='一')&&(chnStr[1]=='十')){
			var b = chnStr.indexOf("十");
			chnStr=chnStr.slice(b)
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
					isDisabled:false		//是否禁止修改
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
			console.log(SectionToChinese(10))
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
			_this.$request({
				url:'/queryCustomParticipants',
				data:{
					meetingId: _this.meetingId,
					enterpriseId: _this.enterpriseId
				}
			}).then(res=>{
				let data = res[1].data
				// console.log(data)
				if(data.statusCode === 2000){
					let customContactList = data.customParticipants
					console.log(customContactList)
					if(customContactList.length > 0){
						_this.list = []		//清空原来的
						for(let i = 0; i< customContactList.length; i++){
							let customContact = {
								name: customContactList[i].participantName,
								job: customContactList[i].position,
								telephone: customContactList[i].phoneNum,
								isDisabled: true	
							}
							_this.list.push(customContact)
						}
					}
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta:1
				})
				// console.log(this.NumberToChinese(1))
			},
			add() {
				let len = this.list.length
				if(len > 0){
					if(this.list[len-1].name==='' || this.list[len-1].job==='' || this.list[len-1].telephone===''){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: '请填写完整成员信息'
						})
						return
					}
				}
				this.list.push({
					name: '',
					job: '',
					telephone: '',
					isDisabled:false		//是否禁止修改
				})
			},
			shanchu(index) {
				let _this = this
				if(_this.list[index].isDisabled){	//真正删除已存的自定义成员
					_this.$request({
						url: '/deleteCustomParticipants',
						data:{
							token: _this.token,
							participantName: _this.list[index].name,
							position: _this.list[index].job,
							phoneNum: _this.list[index].telephone,
							enterpriseId: _this.enterpriseId,
							meetingId: _this.meetingId
						}
					}).then(res=>{
						console.log(res)
						let data = res[1].data
						if(data.statusCode === 2000){
							_this.list.splice(index, 1)
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								duration: 2000,
								title: '自定义与会成员删除成功'
							})
							if(_this.list.length === 0){
								_this.list.push({
									name: '',
									job: '',
									telephone: '',
									isDisabled:false		//是否禁止修改
								})
							}
						}
						
					}).catch(err=>{
						console.log(err)
					})
				}
				else{
					_this.list.splice(index, 1)
					if(_this.list.length === 0){
						_this.list.push({
							name: '',
							job: '',
							telephone: '',
							isDisabled:false		//是否禁止修改
						})
					}
				}
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
				let len = _this.list.length
				_this.isShowDiagnosis = false
				_this.isFirst = true
				console.log(_this.list)
				console.log(_this.enterpriseId)
				console.log(_this.token)
				console.log(_this.meetingId)
				if(_this.list[len-1].name==='' || _this.list[len-1].job==='' || _this.list[len-1].telephone===''){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						duration: 2000,
						title: '请填写完整成员信息'
					})
					return
				}
				let count = 0		//新增加的个数
				for(let j = 0; j < len; j++){
					if(!_this.list[j].isDisabled){
						count++
					}
				}
				console.log('要增加的个数:'+count)
				if(count===0){
					uni.navigateBack({
						delta:1
					})
				}
				let flag = 0
				for(let i = 0; i < len; i++){
					if(!_this.list[i].isDisabled){		//去掉已经添加的成员
						console.log(_this.list[i])
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
								flag++
								if(flag === count){
									console.log('添加自定义与会成员成功')
									uni.navigateBack({
										delta:1
									})
								}
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
