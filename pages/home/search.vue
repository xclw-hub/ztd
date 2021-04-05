<template>
	<view>
		<view class="navbar">
			<view class="navbar_left" @click="clickBack">
				<image src="../../static/login/return.png"></image>
			</view>
			<view class="navbar_search">
				<view class="img1">
					<image src="../../static/home/search.png"></image>
				</view>
				<input
				 :placeholder="searchPlaceholder"
				 placeholder-class="placeholderClass"
				 @focus="searchFocus"
				 @blur="searchBlur"
				 v-model="searchContent"
				 />
				 <view class="img2" @click="clearSearchContent" v-show="searchContent!=''">
				 	<image src="../../static/enterprise/cancel.png"></image>
				 </view>
			</view>
			<view class="navbar_right" @click="clickSearch">
				<text>搜索</text>
			</view>
		</view>
		
		<view class="emptyResult" v-show="!showHistory && showEmpty">
			<image src="../../static/home/emptyResult.png"></image>
			<view class="textbox">
				<text>没有找到关键词“{{searchContent}}”的搜索结果您可以换个搜索词试试~</text>
			</view>
		</view>
		
		<view class="content" v-show="!showHistory && !showEmpty">
			<view class="fix">
				<view class="tabCon">
					<view class="tabItem" :class="tabCurrent==index?'active':''" v-for="(item,index) in tabList" :key='index' @click="tapchange(index)">
						{{item.title}}
					</view>
				</view>
			</view>
			
			<view class="pad">
				<view class="listCon">
					<view class="listItem" v-for="(item,index) in dataList" :key='index' @click="toDetail(item)">
						<view class="leftCon">
							<view class="title">
								<text>
									{{item.title.slice(0,item.title.toLowerCase().indexOf(searchContent.toLowerCase()))}}
								</text>
								<text style="color:#2D6BDD">
									{{item.title.slice(item.title.toLowerCase().indexOf(searchContent.toLowerCase()),item.title.toLowerCase().indexOf(searchContent.toLowerCase())+searchContent.length)}}
								</text>
								<text>
									{{item.title.substr(item.title.toLowerCase().indexOf(searchContent.toLowerCase())+searchContent.length)}}
								</text>
							</view>
							<view class="desc">
								{{item.synopsis}}
							</view>
							<view class="date">
								{{item.time}}
							</view>
						</view>
						<view class="rightCon">
							<image :src="item.pic" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="searchHistory" v-show="showHistory && !showEmpty">
			<text>历史搜索</text>
			<text @click="clearHistory">清空</text>
			<view class="history">
				<view class="historyList">
					<view class="historyItem" v-for="(item, index) in historyArr" v-if="index<historyShowNumber" :key='index' @click="historySearch(index)">
						{{item}}
					</view>
				</view>
				<view @click="hideHistory">
					<image src="../../static/home/hidehistory.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
			
		},
		onLoad(option){
			this.readLocalStorage()
			this.tabList = JSON.parse(option.tabList)
			this.pageNumber=1
		},
		data() {
			return {
				historyShowNumber:7,	//显示的历史记录的数量
				defaultNumber:7,		//默认显示的历史记录的数量
				showHistory:true,		//为true表示还未搜索,显示历史搜索界面,否则显示结果
				showEmpty:false,		//为true表示显示搜索结果为空界面，false不显示
				searchContent:'',
				searchPlaceholder:'请输入关键字搜索',
				historyArr:['多CPU结构分布式控制','侦察机器人','数控机床','传感器','多孔钻床','金属切削机床','伺服电机','侦察机器人'],
				tabList: [],
				tabCurrent: 0,
				dataList:[],
				pageNumber:1
			}
		},
		onReachBottom() {
			let _this = this
			console.log('触底刷新')
			this.pageNumber++
			console.log(this.pageNumber)
			let d = {
				industryId: _this.tabList[_this.tabCurrent].pkid,
				keyword: _this.searchContent,
				page: this.pageNumber
			}
			request({
				url: '/industry/dataList',
				data: d,
			}).then(res => {
				if (res[1].data.data.list.length != 0) {
					_this.dataList.concat(res[1].data.data.list)
					console.log(_this.dataList)
				} else {
					console.log('没有更多内容了')
				}
			})
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
					this.showHistory=false		//显示搜索结果页面
					// 如果该搜索记录为新记录则加入历史记录数组
					if(this.historyArr == null || !this.historyArr.includes(this.searchContent)){
						this.historyArr.unshift(this.searchContent)
						this.historyShowNumber=this.historyShowNumber == this.defaultNumber ? this.defaultNumber : this.historyArr
					}
					//过滤文章列表,如果该文章的标题中包含搜索关键字则加入显示列表
					/* this.searchArticleList=this.articleList.filter(item => item.title.includes(this.searchContent))
					if(this.searchArticleList.length <= 0){
						this.showEmpty = true
					}else{
						this.showEmpty = false
					} */
					this.saveHistory()
					let _this = this
					_this.pageNumber=1
					console.log(_this.searchContent)
					_this.$request({
						url:'/industry/dataList',
						data:{
							industryId:_this.tabList[_this.tabCurrent].pkid,
							keyword: _this.searchContent,
							page:_this.pageNumber
						}
					}).then(res =>{
						console.log(res[1].data)
						_this.dataList = res[1].data.data.list
					}).catch(err =>{
						console.log(err)
					})
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
					key:'history',
				})
			},
			tapchange(index) {
				this.tabCurrent = index
				let _this = this
				_this.pageNumber=1
				_this.$request({
					url:'/industry/dataList',
					data:{
						industryId:_this.tabList[_this.tabCurrent].pkid,
						keyword: _this.searchContent,
						page:_this.pageNumber
					}
				}).then(res =>{
					_this.dataList = res[1].data.data.list
				}).catch(err =>{
					console.log(err)
				})
			},
			toDetail(){
				console.log('asd')
				uni.navigateTo({
					//url:'./financeAssistantDetail'
				})
				
			},
			hideHistory(){
				if(this.historyArr != null){
					this.historyShowNumber=this.historyShowNumber == this.defaultNumber ? this.historyArr.length : this.defaultNumber
				}
			},
			readLocalStorage(){
				const that = this
				uni.getStorage({
					key:'history',
					success:function(res){
						that.historyArr = res.data
					}
				})
				
			},
			saveHistory(){
				uni.setStorage({
					key:'history',
					data:this.historyArr
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar{
		background: #FFFFFF;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 26rpx;
		padding-top: 56rpx;
		border-bottom: 10rpx solid #F3F3F3;
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
			justify-content: flex-end;
			image{
				width: 24rpx;
				height: 14rpx;
				margin-right: 40rpx;
				margin-top: 45rpx;
			}
		}
		.historyList{
			display: flex;
			padding: 10rpx 0rpx;
			flex-wrap: wrap;
			width: 650rpx;
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
	
	.tabCon {
		display: flex;
		height: 80rpx;
		
		.tabItem {
			background: #FFFFFF;
			height: 80rpx;
			width: 100%;
			color: #666666;
			font-size: 32rpx;
			position: relative;
			border-bottom: 5rpx solid #FFFFFF;
			text-align: center;
			line-height: 80rpx;
		}
	
		.active {
			color: #2D6BDD;
			border-bottom: 4rpx solid #2D6BDD;
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
		padding: 40rpx;
		width: 100%;
		box-sizing: border-box;
		
		.listItem {
			display: flex;
			width: 100%;
			height: 180rpx;
			margin-bottom: 40rpx;
	
			.leftCon {
				box-sizing: border-box;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				height: 180rpx;
				padding-right: 10rpx;
	
				.title {
					font-size: 30rpx;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
	
				.desc {
					width: 420rpx;
					color: #777777;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
	
				.date {
					color: #999999;
					font-size: 22rpx;
				}
			}
	
			.rightCon {
				margin-left: 10rpx;
				margin-top: 15rpx;
	
				image {
					width: 220rpx;
					height: 160rpx;
				}
			}
		}
	}
	.fix{
		position: fixed;
		z-index: 2;
		width: 100%;
		border-bottom: 10rpx solid #F3F3F3;
	}
	.pad {
		padding-top: 80rpx;
	}
</style>
