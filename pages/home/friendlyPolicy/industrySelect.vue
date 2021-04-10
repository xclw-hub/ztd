<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
			@clickLeft="clickBack"
			@clickRight="confirm"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>选择行业</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<view class="uniNavBar_right_box">
					<text>确定</text>
				</view>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="search">
				<image @click="clickSearch" class="img1" src="../../../static/home/search.png"></image>
				<input
				 type="text"
				 :placeholder="search_placeholder"
				 placeholder-class="placeholderStyle"
				 v-model.trim="searchContent"
				 @focus="searchFocus"
				 @blur="searchBlue"/>
				 <image class="img2" @click="clearSearchContent" v-show="searchContent!=''" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="industry-list">
				<view class="industry-list-item" v-for="(item, index) in searchResult" :key='index' :class="[item.choice===1 ? 'industry-list-item-true' : 'industry-list-item-false']" @click="selectKind(index)">
					<text>{{item.kind}}</text>
				</view>
			</view>
		</view>
		
		<!-- 已入园对话框 -->
		<uni-popup id="selectPopupDialog" ref="selectPopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="行业设置成功后，30天内不可修改， 是否选择该行业？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="取消"
			title_right="确定"
			:before-close="true" 
			@confirm="selectConfirm" 
			@close="selectClose"></uni-popup-dialog>
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
				search_placeholder:'搜索行业名称',
				searchContent:'',
				searchResult:[],
				industryKindList:[
					{
						kind:'人工智能',
						choice:0
					},
					{
						kind:'智能制造',
						choice:0
					},
					{
						kind:'工业互联网',
						choice:0
					},
					{
						kind:'信息通信',
						choice:0
					},
					{
						kind:'集成电路及电子材料',
						choice:0
					},
					{
						kind:'云计算及大数据',
						choice:0
					},
					{
						kind:'新材料',
						choice:0
					},
					{
						kind:'生物医药',
						choice:0
					},
					{
						kind:'新能源汽车',
						choice:0
					},
					{
						kind:'能源产业',
						choice:0
					},
					{
						kind:'节能环保',
						choice:0
					},
					{
						kind:'企业服务',
						choice:0
					},
					{
						kind:'其他',
						choice:0
					}],		//所有可选的行业种类列表
				selectKindArr:[]		//已选的行业
			}
		},
		onLoad(){
			this.searchResult = this.industryKindList
		},
		methods: {
			clearSearchContent(){
				this.searchContent=''
				this.searchResult=this.industryKindList
			},
			clickSearch(){
				this.searchResult = []
				let length = this.industryKindList.length
				for(let i = 0;i<length;i++){
					if(this.industryKindList[i].kind.indexOf(this.searchContent)>=0){
						this.searchResult.push(this.industryKindList[i])
					}
				}
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			searchFocus(){
				this.search_placeholder=''
			},
			searchBlue(){
				this.search_placeholder='搜索行业名称'
			},
			selectKind(index){
				let _this=this
				if(_this.industryKindList[index].choice===1){
					_this.industryKindList[index].choice=0
				}else{
					_this.industryKindList[index].choice=1
				}
			},
			confirm(){
				this.$refs.selectPopupDialog.open()
			},
			selectConfirm(done) {
				console.log('确定');
				let _this=this
				for(let i=0;i<_this.industryKindList.length;i++){
					if(_this.industryKindList[i].choice===1){
						_this.selectKindArr.push(_this.industryKindList[i].kind)
					}
				}
				let industryKindArr= _this.selectKindArr
				let changeTime = +new Date()
				_this.$request({
					url:'/preferentialPolicies/industryChoose',
					data:{
						'industry':industryKindArr,
						'enterpriseId':_this.$store.state.id
					}
				}).then(res =>{
					let data =res[1].data
					console.log('industryChoose')
					console.log(data)
					console.log('choose end')
					if(data.statusCode == 2000){
						uni.navigateBack({
							delta:1
						})
						// 需要执行 done 才能关闭对话框
						done()
					}else{
						console.log(data.statusMsg)
					}
					//debugger
				}).catch(err =>{
					console.log(err)
				})
			},
			/**
			 * 对话框取消按钮
			 */
			selectClose(done) {
				console.log('取消');
				done()
			}
		}
	}
</script>

<style scoped>
	.uniNavBar_left, .uniNavBar_center, .uniNavBar_right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_center{
		text-align: center;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.uniNavBar_right .uniNavBar_right_box{
		width: 90rpx;
		height: 54rpx;
		background: #2D6BDD;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_right_box text{
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}
	.search{
		margin-top: 30rpx;
		margin-left: 39rpx;
		margin-right: 39rpx;
		height: 72rpx;
		background: #F3F3F3;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding-left: 21rpx;
	}
	.img1{
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}
	.img2{
		width: 30rpx;
		height: 30rpx;
		margin-left: auto;
		margin-right: 15rpx;
	}
	.placeholderStyle{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}
	.industry-list{
		margin-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		padding-left: 39rpx;
		padding-right: 17rpx;
	}
	.industry-list-item-false{
		width: 324rpx;
		height: 88rpx;
		border: 1rpx solid #D8D8D8;
		border-radius: 44rpx;
		background-color: #FFFFFF;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 22rpx;
		margin-bottom: 30rpx;
	}
	.industry-list-item-true{
		width: 324rpx;
		height: 88rpx;
		border-radius: 44rpx;
		box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(27, 140, 255, 0.5);
		background: linear-gradient(90deg, #4184FF, #1854C3);
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 22rpx;
		margin-bottom: 30rpx;
	}
	.industry-list text{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}
</style>
