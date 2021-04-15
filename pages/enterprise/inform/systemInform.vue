<template>
	<view>
		<uniNavBar
			class="nav"
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>系统消息</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="body" v-for="(item, index) in systemInformArr" :key='index'>
				<text class="time">{{item.time | timestampToTime}}</text>
				<view class="body-detail">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<text class="body-detail-content">{{item.body}}</text>
					<text class="body-detail-content-tips" v-if="item.title==='审核通过'" @click="enterContact">完善联系人信息>></text>
					<text class="body-detail-content-tips" v-else-if="item.title==='审核被拒绝'" @click="viewReason(index)">具体原因请点击>></text>
					<text class="body-detail-content-tips" v-else @click="clickToFill">查看详情>></text>
				</view>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="dropListShow"></view>
		
		<view class="dropList" v-if="dropListShow">
			<view class="dropList-title">
				<image src="../../../static/enterprise/refuse.png"></image>
				<text>拒绝原因</text>
			</view>
			<text class="dropList-content">{{showReason}}</text>
			<view class="dropList-btn" @click="closeDropList">
				<text>关闭</text>
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
				systemInformArr:[],
				showReason:'',
				dropListShow:false		//是否打开上拉框
			}
		},
		filters:{
			timestampToTime(timestamp) {
			  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			  var Y = date.getFullYear() + '-';
			  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
			  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			  
			  let strDate = Y+M+D+h+m+s;
			  return strDate; 
			 }
		},
		onLoad(option) {
			let _this = this
			console.log(_this.$store.state.id)
			console.log(_this.$store.state.kind)
			//获取系统消息
			_this.$request({
				url:'/noticeService/systemNoticeList',
				data:{
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					// userId: 1,
					// userType: '0',
				}
			}).then(res=>{
				let data = res[1].data
				console.log(data)
				for(let i = 0; i < data.length; i++){
					let informObj
					if(data[i].title==='审核被拒绝'){
						informObj = {
							time: data[i].receiveTime,
							title: data[i].title,
							body: data[i].summary,
							reason: data[i].reason
						}
					}
					else{
						informObj = {
							time: data[i].receiveTime,
							title: data[i].title,
							body: data[i].summary
						}
					}
					_this.systemInformArr.push(informObj)
				}
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
			enterContact(){
				uni.navigateTo({
					url:'../contact/contactList'
				})
			},
			viewReason(index){
				this.dropListShow=true
				this.showReason = this.systemInformArr[index].reason
			},
			closeDropList(){
				this.dropListShow=false
			},
			clickToFill(){
				uni.navigateTo({
					url:'../../home/informationFill/informationFill'
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
		width: 36rpx;
		height: 36rpx;
	}
	.uniNavBar_center{
		text-align: center;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 100rpx;
	}
	.body{
		margin-top: 45rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.body .time{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
	}
	.body-detail{
		margin-top: 27rpx;
		/* width: 670rpx; */
		height: 202rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 15rpx;
		padding-left: 31rpx;
		padding-right: 31rpx;
	}
	.body-detail .title{
		height: 79rpx;
		border-bottom:1rpx solid #E9E9E9;
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}
	.body-detail .title text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}
	.body-detail .body-detail-content{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 46rpx;
	}
	.body-detail .body-detail-content-tips{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 46rpx;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index:20;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}
	.dropList{
		width: 100%;
		/* height: 396px; */
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		position: fixed;
		bottom: 0;
		z-index: 30;
	}
	.dropList-title, .dropList-content, .dropList-btn{
		margin-left: 39rpx;
		margin-right: 39rpx;
		margin-top: 30rpx;
	}
	.dropList-title image{
		width: 28rpx;
		height: 28rpx;
	}
	.dropList-title text{
		margin-left: 2rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #222222;
	}
	.dropList-content{
		display:block;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 46rpx;
	}
	.dropList-btn{
		height: 119rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top:1rpx solid #E9E9E9;
	}
	.dropList-btn text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
</style>
