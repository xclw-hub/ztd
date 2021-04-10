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
				<text>反馈详情</text>
			</view>
		</uniNavBar>
		<view class="kind">
			<view class="kind-detail" v-for="(item, index) in kind" :key="index" :class="[isChoose[index] ? activeClass_bg : 'active2_bg']" @click="chooseKind(index)">
				<text :class="[isChoose[index] ? activeClass_font : 'active2_font']">{{item}}</text>
			</view>
		</view>
		<view class="content">
			<view class="enterprise" v-for="(enterpriseItem, index) in enterpriseDetail" :key="index" @click="ViewPriseDetail(index)">
				<text class="enterprise-name">{{enterpriseItem.title}}</text>
				<view class="enterprise-body">
					<view class="enterprise-body-item" v-for="(investItem, index) in enterpriseItem.Fieldlist" :key="index">
						<text>{{investItem}}</text>
					</view>
				</view>
				<view class="enterprise-invest">
					<text>今年投资数：</text>
					<text>{{enterpriseItem.investment}}</text>
					<text>总投资数：</text>
					<text>{{enterpriseItem.investmentTotal}}</text>
				</view>
				<view class="enterprise-investRecently">
					<text>最近投资：</text>
					<text>{{enterpriseItem.recentInvestment}}</text>
				</view>
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
				isChoose:[true,false,false,false],
				activeClass_bg:'active1_bg',
				activeClass_font:'active1_font',
				kind:['自动化装备','数控机床','智能生产','矿山机械'],
				enterpriseDetail:[
					// {
					// 	title:'和光投资',
					// 	Fieldlist:['5G终端设备','5G文娱','5G教育','智能教育'],
					// 	investment:'5',
					// 	investmentTotal:'17',
					// 	recentInvestment:'鲜果壹号',
					// 	RegionalRanking:0,
					// 	pkid: 0,
					// 	registeredcapital: 0
					// }
				],
				parkId:0,
				pkid:0
			}
		},
		onLoad(option) {
			this.pkid = Number(option.pkid)
			if(this.$store.state.kind==='0'){
				this.parkId = this.$store.state.enterpriseInfo.parkId
			}
			else{
				this.parkId = this.$store.state.userInfo.parkId
			}
			console.log(this.pkid)
			console.log(this.parkId)
			let _this = this
			_this.$request({
				url:'/noticeService/mechanismList',
				data:{
					parkId: _this.parkId,
					// title: '自动化装备'
					title: '长沙千景智能设备有限公司',
					// parkId: 4
				}
			}).then(res=>{
				let data = res[1].data.data[0]
				console.log(data)
				_this.enterpriseDetail = data.mechanismlist
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			// 类型展示按钮事件
			chooseKind(index){
				this.isChoose=[false,false,false,false]
				this.isChoose[index]=true
				console.log(this.kind[index])
				let _this = this
				_this.$request({
					url:'/noticeService/mechanismList',
					data:{
						parkId: _this.parkId,
						title: _this.kind[index],
						// title: '长沙千景智能设备有限公司',
						// parkId: 4
					}
				}).then(res=>{
					let data = res[1].data.data[0]
					console.log(data)
					_this.enterpriseDetail = data.mechanismlist
				}).catch(err=>{
					console.log(err)
				})
			},
			ViewPriseDetail(index){
				let _this = this
				let enterpriseId
				if(_this.$store.state.kind === '0'){
					enterpriseId = _this.$store.state.id
				}
				else{
					enterpriseId = _this.$store.state.userInfo.enterpriseId
				}
				let obj = {
					companyId: enterpriseId,
					pkid: _this.enterpriseDetail[index].pkid,
					companyTitle: _this.enterpriseDetail[index].title
				}
				uni.navigateTo({
					url:'enterpriseDetail?obj='+JSON.stringify(obj) 
				})
				console.log("进入"+this.enterpriseDetail[index].title+"的企业详情")
			}
		}
	}
</script>

<style>
	.uniNavBar_left, .uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 36rpx;
		height: 36rpx;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.kind{
		padding-top: 27rpx;
		padding-bottom: 27rpx;
		padding-left: 39rpx;
		display: flex;
		flex-direction: row;
	}
	.active1_bg{
		height: 56rpx;
		padding-left: 19rpx;
		padding-right: 19rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #2D6BDD;
		border-radius: 5rpx;
	}
	.active2_bg{
		height: 56rpx;
		padding-left: 19rpx;
		padding-right: 19rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #E9E9E9;
		border: 1px solid #7D7D7D;
		border-radius: 5rpx;
	}
	.active1_font{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.active2_font{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	page{
		background-color: #E9E9E9;
	}
	.enterprise{
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		padding: 31rpx 39rpx 34rpx 39rpx;
	}
	.enterprise-name{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.enterprise-body{
		margin-top: 14rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.enterprise-body .enterprise-body-item{
		margin-top: 15rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		height: 48rpx;
		border: 1px solid #BFBFBF;
		border-radius: 5rpx;
		margin-right: 14rpx;
	}
	.enterprise-body-item text{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
	}
	.enterprise-invest{
		margin-top: 30rpx;
	}
	.enterprise-invest text:nth-child(1){
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.enterprise-invest text:nth-child(2){
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}
	.enterprise-invest text:nth-child(3){
		margin-left: 88rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.enterprise-invest text:nth-child(4){
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}
	.enterprise-investRecently{
		margin-top: 24rpx;
	}
	.enterprise-investRecently text:nth-child(1){
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.enterprise-investRecently text:nth-child(2){
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}
</style>
