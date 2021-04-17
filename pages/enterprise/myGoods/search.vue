<template>
	<view>
		<view class="navbar">
			<view class="navbar_left" @click="clickBack">
				<image src="../../../static/login/return.png"></image>
			</view>
			<view class="navbar_search">
				<view class="img1">
					<image src="../../../static/home/search.png" @click="clickSearch"></image>
				</view>
				<input
				 :placeholder="searchPlaceholder"
				 placeholder-class="placeholderClass"
				 @focus="searchFocus"
				 @blur="searchBlur"
				 v-model="searchContent"
				 />
				 <view class="img2" @click="clearSearchContent" v-show="searchContent!=''">
				 	<image src="../../../static/enterprise/cancel.png"></image>
				 </view>
			</view>
			<view class="navbar_right" @click="clickSearch">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="emptyResult" v-show="!showHistory && showEmpty">
			<image src="../../../static/home/emptyResult.png"></image>
			<view class="textbox">
				<text>没有找到关键词“{{searchContent}}”的搜索结果您可以换个搜索词试试~</text>
			</view>
		</view>
		
		<view class="content" v-show="!showHistory && !showEmpty">
			<view class="listCon">
				<view class="item" v-for="(item, index) in supplyList" :key="index" @click="tapdetail(item)">
					<image class="goodsimg" :src="item.pic[0] == ''?'../../../static/enterprise/noneimage.png':item.pic[0]"
					 mode=""></image>
					<view class="name u-line-2">
						{{item.title}}
					</view>
					<view class="priceCon">
						<view class="unit">
							￥
						</view>
						<view class="price">
							{{item.price}}
						</view>
					</view>
					<view class="position">
						<u-icon name="map" color="#AAAAAA" size="30"></u-icon>
						<view class="city">
							{{item.source}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="searchHistory" v-show="showHistory && !showEmpty">
			<text v-if="historyArr.length!=0">历史搜索</text>
			<text @click="clearHistory" v-if="historyArr.length!=0">清空</text>
			<view class="history">
				<view class="historyList">
					<view class="historyItem" v-for="(item, index) in historyArr" v-if="index<historyShowNumber" :key='index' @click="historySearch(index)">
						{{item}}
					</view>
				</view>
				<view @click="hideHistory">
					<image src="../../../static/home/hidehistory.png" v-show="historyArr.length>defaultNumber"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				historyShowNumber:7,	//显示的历史记录的数量
				defaultNumber:7,		//默认显示的历史记录的数量
				showHistory:true,		//为true表示还未搜索,显示历史搜索界面,否则显示结果
				showEmpty:false,		//为true表示显示搜索结果为空界面，false不显示
				searchContent:'',
				searchPlaceholder:'请输入关键字搜索',
				historyArr:[],
				supplyList:[],
				pageNumber:''
			}
		},
		onLoad(){
			this.historyArr = uni.getStorageSync('supplySearchHistory')
			if(!this.historyArr){
				this.historyArr = []
			}
			this.historyShowNumber = this.historyArr.length
		},
		mounted() {
			this.viewChange(1)
		},
		onReachBottom() {
			this.pageNumber++
			if(this.$store.state.kind == 0 ){
				_this.$request({
					url:'/supplyInformationList',
					data:{
						token,
						type:_this.$store.state.kind,
						page:_this.pageNumber,
						keyword:_this.searchContent,
						companyId:_this.$store.state.id
					},
				}).then(res=>{
					console.log('search')
					console.log(res[1].data)
					if(res[1].data.success == true){
						let data = res[1].data.data
						let len = _this.supplyList.length
						_this.supplyList = _this.supplyList.concat(data.list)
						let length = _this.supplyList.length
						for(let i =len - 1;i<length;i++){
							_this.supplyList[i].pic = _this.supplyList[i].pic.split(',')
							_this.supplyList[i].price = Number(_this.supplyList[i].price).toFixed(2);
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			}else{
				_this.$request({
					url:'/supplyInformationList',
					data:{
						token,
						type:_this.$store.state.kind,
						page:_this.pageNumber,
						keyword:_this.searchContent,
						companyId:_this.$store.state.userInfo.enterpriseId,
						memberId:_this.$store.state.id
					},
				}).then(res=>{
					console.log('search')
					console.log(res[1].data)
					if(res[1].data.success == true){
						let data = res[1].data.data
						let len = _this.supplyList.length
						_this.supplyList = _this.supplyList.concat(data.list)
						let length = _this.supplyList.length
						for(let i =len - 1;i<length;i++){
							_this.supplyList[i].pic = _this.supplyList[i].pic.split(',')
							_this.supplyList[i].price = Number(_this.supplyList[i].price).toFixed(2);
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		methods: {
			clickBack(){
				if(this.showHistory && ! this.showEmpty){
					uni.navigateBack({
						delta:1
					})
				}else{
					this.clearSearchContent()
				}
			},
			searchFocus(){
				this.searchPlaceholder=''
			},
			searchBlur(){
				this.searchPlaceholder='请输入关键字搜索'
			},
			
			// 清空搜索框的输入内容
			clearSearchContent(){
				this.searchContent=''
				this.showHistory=true
				this.showEmpty=false
			},
			// 点击搜索按键
			clickSearch(){
				if(this.searchContent!=''){
					let flag
					// 如果该搜索记录为新记录则加入历史记录数组
					if(this.historyArr == [] || !this.historyArr.includes(this.searchContent)){
						this.historyArr.unshift(this.searchContent)
					}else{
						this.historyArr.splice(this.historyArr.indexOf(this.searchContent),1)
						this.historyArr.unshift(this.searchContent)
					}
					//将搜索记录全部显示以便于之后调用viewChange来判断第一行的记录数量，并记录历史记录是显示全部还是显示一行
					if(this.historyShowNumber != this.defaultNumber){
						flag = 0
					}else{
						flag = 1
					}
					this.historyShowNumber = this.historyArr.length
					this.saveHistory()
					let token = uni.getStorageSync('token');
					let _this = this
					this.pageNumber=1
					this.saveHistory()
					if(this.$store.state.kind == 0 ){
						_this.$request({
							url:'/supplyInformationList',
							data:{
								token,
								type:_this.$store.state.kind,
								page:_this.pageNumber,
								keyword:_this.searchContent,
								companyId:_this.$store.state.id
							},
						}).then(res=>{
							console.log('search')
							console.log(res[1].data)
							if(res[1].data.success == true){
								let data = res[1].data.data
								_this.supplyList = data.list
								if(flag){
									this.viewChange(1)
								}else{
									console.log('viewChange')
									this.viewChange(0)
								}
								this.showHistory=false		//显示搜索结果页面
								if(_this.supplyList.length <= 0){
									this.showEmpty = true
								}else{
									let length = _this.supplyList.length
									for(let i =0;i<length;i++){
										_this.supplyList[i].pic = _this.supplyList[i].pic.split(',')
										_this.supplyList[i].price = Number(_this.supplyList[i].price).toFixed(2);
									}
									this.showEmpty = false
								}
							}
						}).catch(err=>{
							console.log(err)
						})
					}else{
						_this.$request({
							url:'/supplyInformationList',
							data:{
								token,
								type:_this.$store.state.kind,
								page:_this.pageNumber,
								keyword:_this.searchContent,
								companyId:_this.$store.state.userInfo.enterpriseId,
								memberId:_this.$store.state.id
							},
						}).then(res=>{
							console.log('search')
							console.log(res[1].data)
							if(res[1].data.success == true){
								let data = res[1].data.data
								_this.supplyList = data.list
<<<<<<< Updated upstream
=======
								if(flag){
									this.viewChange(1)
								}else{
									console.log('viewChange')
									this.viewChange(0)
								}
>>>>>>> Stashed changes
								this.showHistory=false		//显示搜索结果页面
								if(_this.supplyList.length <= 0){
									this.showEmpty = true
								}else{
									let length = _this.supplyList.length
									for(let i =0;i<length;i++){
										_this.supplyList[i].pic = _this.supplyList[i].pic.split(',')
										_this.supplyList[i].price = Number(_this.supplyList[i].price).toFixed(2);
									}
									this.showEmpty = false
								}
							}
						}).catch(err=>{
							console.log(err)
						})
					}
				}
			},
			//点击历史记录进行搜索
			historySearch(index){
				this.searchContent=this.historyArr[index]
				this.clickSearch()
			},
			clearHistory(){
				this.historyArr=[]
				uni.removeStorage({
					key:'supplySearchHistory',
				})
			},
			hideHistory(){
				if(this.historyArr != null){
					this.historyShowNumber=this.historyShowNumber == this.defaultNumber ? this.historyArr.length : this.defaultNumber
				}
			},
			saveHistory(){
				uni.setStorage({
					key:'supplySearchHistory',
					data:this.historyArr
				})
			},
			tapdetail(item) {
				uni.navigateTo({
					url: './goodsdetail?supplyId='+item.pkid
				})
			},
			//根据历史记录元素的位置，即top值来判断第一行的历史记录数量
			viewChange(flag){
				const query = uni.createSelectorQuery().in(this);
				query.selectAll(".historyItem").boundingClientRect(data => {
					console.log('viewChange')
					console.log(data)
					let length = data.length
					for(let i=0;i<length;i++){
						if(data[i].top>150){
							if(flag){
								this.defaultNumber = i
								this.historyShowNumber = i
							}else{
								this.defaultNumber = i
							}
							break
						}
					}
					/* return data.top */
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F3F3F3;
	}
	.navbar{
		background: #FFFFFF;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 26rpx;
		padding-top: 56rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: sticky;
		top: 0;
		z-index: 999;
		.navbar_left{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			image{
				width: 20rpx;
				height: 36rpx;
			}
		}
		.navbar_search{
			margin-left: 30rpx;
			margin-right: 30rpx;
			display: flex;
			align-items: center;
			flex: 1;
			width: 100%;
			height: 72rpx;
			background-color: #F3F3F3;
			border-radius: 10px;
			padding-left: 21rpx;
			padding-right: 21rpx;
			.img1{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-right: 21rpx;
				width: 30rpx;
				height: 30rpx;
				image{
					width: 30rpx;
					height: 30rpx;
				}
			}
			input{
				display: flex;
				flex: 1;
			}
			.img2{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 34rpx;
				height: 34rpx;
				image{
					width: 34rpx;
					height: 34rpx;
				}
			}
		}
		.navbar_right{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			text{
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.placeholderClass{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}
	
	.searchHistory{
		margin-top: 40rpx;
		text:nth-child(1){
			margin-left: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			font-family: SourceHanSansCN-Regular;
			color: #333333;
		}
		text:nth-child(2){
			display: inline;
			float: right;
			margin-right: 40rpx;
			font-size: 28rpx;
			font-weight: 400;
			font-family: SourceHanSansCN-Regular;
			color: #2D6BDD;
		}
		.history{
			display: flex;
			
			image{
				justify-content: flex-end;
				width: 24rpx;
				height: 14rpx;
				margin-left: 40rpx;
				margin-top: 45rpx;
			}
		}
		.historyList{
			display: flex;
			padding: 10rpx 0rpx;
			padding-left: 40rpx;
			flex-wrap: wrap;
			width: 650rpx;
			justify-content: flex-start;
			.historyItem{
				border: 1rpx solid #BFBFBF;
				border-radius: 5rpx;
				height: 54rpx;
				display: flex;
				align-items: center;
				line-height: 54rpx;
				padding-left: 10rpx;
				padding-right: 10rpx;
				margin-right: 12rpx;
				margin-top: 12rpx;
				color: #777777;
				text{
					font-size: 26rpx;
					font-weight: 400;
					font-family: SourceHanSansCN-Normal;
				}
			}
		}
	}
	
	.emptyResult{
		line-height: 42rpx;
		padding-top: 214rpx;
		display: flex; 
		flex-direction: column;
		align-items: center;
		image{
			width: 670rpx;
			height: 418rpx;
		}
		.textbox{
			width: 440rpx;
			text-align: center;
			text{
				font-size: 26rpx;
				font-weight: 400;
				font-family: SourceHanSansCN-Regular;
				color: #AAAAAA;
			}
		}
	}
	
	.listCon {
		padding: 20rpx;
		padding-top: 26rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #F3F3F3;
		.item {
			background-color: #fff;
			width: 345rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 15rpx;
			padding: 15rpx;
			margin-bottom: 25rpx;
	
			.goodsimg {
				width: 100%;
				height: 350rpx;
			}
	
			.name {
				width: 100%;
				font-size: 32rpx;
			}
	
			.priceCon {
				width: 100%;
				display: flex;
				align-items: flex-end;
	
				.unit {
					color: #F02828;
					font-size: 28rpx;
				}
	
				.price {
					font-size: 32rpx;
					color: #F02828;
				}
			}
	
			.position {
				width: 100%;
				display: flex;
				align-items: center;
				color: #AAAAAA;
	
				.city {
					margin-left: 5rpx;
				}
			}
		}
	}
</style>
