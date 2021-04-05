<template>
	<view>
		<view class="nav">
			<uniNavBar
				status-bar="true"
				backgroundColor="#2D6BDD"
				@clickLeft="clickBack"
			>
				<view slot="left" class="uniNavBar_left">
					<image src="/static/enterprise/return.png"></image>
				</view>
				<view slot="center" class="uniNavBar_center">
					<text>供需发布</text>
				</view>
			</uniNavBar>
			<view class="titlebox">
				<view class="title" >
					<view class="service" @click="serviceClick" :class="[isActive_service ? activeClass_service : 'active2_service']" >
						<text v-bind:style="{color:serviceColor}">我的服务</text>
					</view>
					<view class="need" @click="needClick" :class="[isActive_need ? activeClass_need : 'active2_need']">
						<text v-bind:style="{color:needColor}">供需列表</text>
						<image src="../../../static/enterprise/need.png"></image>
					</view>
				</view>
				
				<view class="dropListBody" v-if="dropListShow">
					<view class="dropList" v-for="(item,index) in list" :key="index" @click="choose(index)">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="myService" v-if="choice">
				<text id="serviceTips">我的服务</text>
				<view class="serviceList">
					<view class="serviseItem" v-for="(serviceItem,index) in serviceList" :key="index">
						<text>{{serviceItem}}</text>
					</view>
					<view id="edit" @click="serviceEdit">
						<image src="../../../static/enterprise/edit.png"></image>
						<text>编辑</text>
					</view>
				</view>
				
				<view class="tips">
					<text class="addressTip">联系地址</text>
					<text class="save" v-if="addressSave_seen" @click="addressSave">保存</text>
				</view>
				<view class="address" v-bind:style="{background : addressInputColor}">
					<input 
					v-bind:style="{color : addressFontColor}"
					:disabled="isEditAddress"
					type="text"
					v-model.trim="address"
					/>
					<image src="../../../static/enterprise/save.png" @click="editAddress"></image>
				</view>
				
				<view class="tips">
					<text class="addressTip">联系电话</text>
					<text class="save" v-if="phoneSave_seen" @click="phoneSave">保存</text>
				</view>
				<view class="address" v-bind:style="{background : phoneInputColor}">
					<input 
					v-bind:style="{color : phoneFontColor}"
					:disabled="isEditPhone"
					type="text"
					v-model.trim="phone"
					/>
					<image src="../../../static/enterprise/save.png" @click="editPhone"></image>
				</view>
			</view>
			
			<view v-else class="supplyList">
				<view class="supplyitem" v-for="(item,index) in supplyListDisply" :key="index" @click="viewSupplyDetail(index)">
					<view id="supplyTitle" v-if="item.kind === '0'">
						<text>供应</text>
					</view>
					<view id="needTitle" v-else>
						<text>需求</text>
					</view>
					<text id="message">{{item.content}}</text>
					<view id="time">
						<image src="../../../static/enterprise/clock.png"></image>
						<text>{{item.time}}</text>
					</view>
				</view>
				<button class="publish" @click="publish">
					<text>我要发布</text>
				</button>
			</view>
		</view>
		
		<view class="mask" v-if="mask_seen"></view>
		
		<!-- 我的服务关键字维护对话框 -->
		<uni-popup id="servicePopupDialog" ref="servicePopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			mode="input"
			title="关键字维护" 
			placeholder="输入关键词，多个关键词请用英文“,”隔开"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="取消"
			title_right="确定"
			:before-close="true" 
			@confirm="editConfirm" 
			@close="editClose"></uni-popup-dialog>
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
				list:['全部类型','供应','需求'],		//下拉菜单
				dropListShow:false,		//是否显示下拉列表
				serviceList:['金属切削机床','铸造机械','矿山机械','试验机','实验分析仪器','铸造机械','矿山机械','试验机',],
				supplyList:[
					{
						kind:'0',		//0是供应
						content:'深圳K型热电偶 温度传感器 热敏电阻 NTC传感器 广州',
						time:'2020-12-08 11:39'
					},
					{
						kind:'1',		//1是需求
						content:'长期回收伺服电机，欧姆龙，基恩士，费斯托，西门子等工控元件',
						time:'2020-12-08 11:39'
					},
					{
						kind:'0',		//0是供应
						content:'深圳K型热电偶 温度传感器 热敏电阻 NTC传感器 广州',
						time:'2020-12-08 11:39'
					},
					{
						kind:'1',		//1是需求
						content:'本公司长期现金回收工程尾货，积压库存，回收伺服电机等',
						time:'2020-12-08 11:39'
					},
					{
						kind:'0',		//0是供应
						content:'深圳K型热电偶 温度传感器 热敏电阻 NTC传感器 广州',
						time:'2020-12-08 11:39'
					},
					{
						kind:'1',		//1是需求
						content:'长期回收伺服电机，欧姆龙，基恩士，费斯托，西门子等工控元件',
						time:'2020-12-08 11:39'
					},
					{
						kind:'0',		//0是供应
						content:'深圳K型热电偶 温度传感器 热敏电阻 NTC传感器 广州',
						time:'2020-12-08 11:39'
					},
					{
						kind:'1',		//1是需求
						content:'本公司长期现金回收工程尾货，积压库存，回收伺服电机等',
						time:'2020-12-08 11:39'
					}
				],
				mask_seen:false,		//遮罩层是否显示
				choice:true,		//表示选择我的服务，否则表示选择供需列表
				isActive_service:true,		//点击我的服务时的view样式
				activeClass_service:'active1_service',
				serviceColor:'#2D6BDD',
				isActive_need:false,		//点击供应需求时的view样式
				activeClass_need:'active1_need',
				needColor:'#666666',
				
				isEditAddress:true,
				addressSave_seen:false,
				addressInputColor:'#F6F6F6',
				addressFontColor:'#888888',
				address:'幸福西街与新顺北大街交叉口西100米',
				
				isEditPhone:true,
				phoneSave_seen:false,
				phoneInputColor:'#F6F6F6',
				phoneFontColor:'#888888',
				phone:'18051287437',
				// keyWords:'',
				condition:'全部类型'
			}
		},
		computed:{
			supplyListDisply(){
				let oldSupplyList = this.supplyList
				let newSupplyList = new Array()
				if (this.condition === '全部类型'){
					newSupplyList = oldSupplyList
				}
				else if (this.condition === '供应'){
					newSupplyList = oldSupplyList.filter(function (elem) {
					     return (elem.kind === '0');
					})
				}
				else{
					newSupplyList = oldSupplyList.filter(function (elem) {
					     return (elem.kind === '1');
					})
				}
				return newSupplyList
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			serviceClick(){
				this.isActive_service=true
				this.isActive_need=false
				this.serviceColor='#2D6BDD'
				this.needColor='#666666'
				if(!this.choice){
					this.mask_seen=false
					if(this.mask_seen){
						this.dropListShow=true
					}else{
						this.dropListShow=false
					}
				}
				this.choice=true
				console.log(this.choice)
			},
			needClick(){
				if(this.choice){
					this.isActive_need=true
					this.isActive_service=false
					this.needColor='#2D6BDD'
					this.serviceColor='#666666'
					this.choice=false
					console.log(this.choice)
				}else{
					// console.log("listDisplay:"+listDisplay)
					this.mask_seen=!this.mask_seen
					if(this.mask_seen){
						this.dropListShow=true
					}else{
						this.dropListShow=false
					}
				}
			},
			// 查看供应详情
			viewSupplyDetail(index){
				console.log(index)
				uni.navigateTo({
					url:'publishDetails'
				})
			},
			choose(index){
				console.log(this.list[index])
				this.condition=this.list[index]
				this.mask_seen=false
				if(this.mask_seen){
					this.dropListShow=true
				}else{
					this.dropListShow=false
				}
			},
			serviceEdit(){
				this.$refs.servicePopupDialog.open()
			},
			editConfirm(done) {
				console.log('确定');
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			editClose(done) {
				console.log('取消');
				done()
			},
			editAddress(){
				this.isEditAddress=false		//开启输入框
				this.addressInputColor='#FFFFFF'
				this.addressFontColor='#333333'
				this.addressSave_seen=true
			},
			addressSave(){
				this.isEditAddress=true		//禁止输入框
				this.addressInputColor='#F6F6F6'
				this.addressFontColor='#888888'
				this.addressSave_seen=false
			},
			editPhone(){
				this.isEditPhone=false		//开启输入框
				this.phoneInputColor='#FFFFFF'
				this.phoneFontColor='#333333'
				this.phoneSave_seen=true
			},
			phoneSave(){
				this.isEditPhone=true		//禁止输入框
				this.phoneInputColor='#F6F6F6'
				this.phoneFontColor='#888888'
				this.phoneSave_seen=false
			},
			publish(){
				// console.log("我要发布")
				uni.navigateTo({
					url:'publish'
				})
			}
			
		}
	}
</script>

<style scoped>
	.nav{
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
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
	.title{
		display: flex;
		flex-direction: row;
	}
	.title image{
		margin-left: 16rpx;
		width: 24rpx;
		height: 14rpx;
	}
	.active1_service{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom:5rpx solid #2D6BDD;
	}
	.active2_service{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.active1_need{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom:5rpx solid #2D6BDD;
	}
	.active2_need{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title text{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}
	.dropListBody{
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
	}
	.dropList{
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dropList text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 90rpx;
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
	.myService{
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.myService #serviceTips{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 100rpx;
	}
	.myService .serviceList{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.myService .serviceList .serviseItem{
		width: 212rpx;
		height: 64rpx;
		border: 1rpx solid #BFBFBF;
		border-radius: 10rpx;
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.serviceList #edit{
		width: 212rpx;
		height: 64rpx;
		border: 1rpx solid #2D6BDD;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.serviceList #edit image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 11rpx;
	}
	.serviceList #edit text{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 100rpx;
	}
	.serviseItem text{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
	}
	.addressTip{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 100rpx;
		float: left;
	}
	.save{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 100rpx;
		float: right;
	}
	.address{
		/* 清除浮动 */
		clear:both;
		height: 88rpx;
		/* background: #F6F6F6; */
		border: 1rpx solid #CACACA;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding-left: 26rpx;
		padding-right: 26rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}
	.address input{
		display: flex;
		flex: 1;
	}
	.address image{
		height: 28rpx;
		width: 28rpx;
		display: flex;
		justify-content: flex-end;
	}
	.supplyList{
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 200rpx;
	}
	.supplyList .supplyitem{
		width: 100%;
		/* height: 183rpx; */
		padding-top: 37rpx;
		padding-bottom: 33rpx;
		border-bottom: 1rpx solid #C7C7C7;
	}
	.supplyitem #supplyTitle{
		width: 72rpx;
		height: 40rpx;
		background: #FF9C00;
		border-radius: 5rpx;
		display:inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
	}
	.supplyitem #message{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.supplyitem #time{
		display: flex;
		align-items: center;
		margin-top: 22rpx;
	}
	.supplyitem #time image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
	}
	.supplyitem #time text{
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
	}
	.supplyitem #needTitle{
		width: 72rpx;
		height: 40rpx;
		background: #2E6BDE;
		border-radius: 5rpx;
		display:inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
	}
	#supplyTitle text, #needTitle text{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 42rpx;
	}
	.supplyList .publish{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		margin-top: 265rpx;
		margin-bottom: 40rpx;
		width: 670rpx;
		height: 84rpx;
		background: #2D6BDD;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.supplyList .publish text{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
