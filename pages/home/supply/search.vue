<template>
	<view>
		<view class="navbar">
			<view class="navbar_left" @click="clickBack">
				<image src="../../../static/login/return.png"></image>
			</view>
			<view class="navbar_search">
				<view class="img1">
					<image src="../../../static/home/search.png"></image>
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
				<text>没有找到关键词“机器人”的搜索结果您可以换个搜索词试试~</text>
			</view>
		</view>
		
		<view class="content" v-show="!showHistory && !showEmpty">
			<view class="fix">
				<view class="dropmenu">
					<u-dropdown ref="uDropdown">
						<u-dropdown-item :title="region">
							<view class="slot-content" style="background-color: #FFFFFF;">
								<scroll-view scroll-y="true" style="height: 350rpx;">
									<view class="province">
										<view class="labelName">
											省份
										</view>
										<view class="provinceList">
											<view class="provinceItem" :class="provinceCurrent==index?'active':''"
												v-for="(item,index) in provinceList" :key='index'  @click.stop="tapprovinceItem(index)">
												{{item}}
											</view>
										</view>
									</view>
									<view class="city">
										<view class="labelName">
											城市
										</view>
										<view class="cityList">
											<view class="cityItem" :class="cityCurrent==index?'active':''"
												v-for="(item,index) in cityList" :key='index' @click.stop="tapcityItem(index)">
												{{item}}
											</view>
										</view>
									</view>
								</scroll-view>
								<view class="slotbottomBar">
									<view class="reset" @click="tapresetregion">
										重置
									</view>
									<view class="save" @click="tapsaveregion">
										确定
									</view>
								</view>
							</view>
						</u-dropdown-item>
						<u-dropdown-item :title="price">
							<view class="slot-content" style="background-color: #FFFFFF;">
								<view class="slotpriceCon">
									<view class="labelName">
										价格区间（元）
									</view>
									<view class="priceinput">
										<view class="inputitem">
											<input type="number" placeholder="最低价" v-model="minprice" />
										</view>
										<view class="middleLine">
				
										</view>
										<view class="inputitem">
											<input type="number" placeholder="最高价" v-model="maxprice" />
										</view>
									</view>
									<view class="tips">
										注：最多可保留两位小数
									</view>
								</view>
								<view class="slotbottomBar">
									<view class="reset" @click="priceCancel">
										取消
									</view>
									<view class="save" @click="pricesave">
										确定
									</view>
								</view>
							</view>
						</u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
			
			
			<view class="pad">
				<view class="listCon">
					<view class="item" v-for="(item, index) in searchSupplyList" :key="index" @click="tapdetail">
						<image class="goodsimg" :src="item.imgSrc"
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
								{{item.province}}{{item.city}}
							</view>
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
					<image src="../../../static/home/hidehistory.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components:{
		},
		onLoad(){
			this.readLocalStorage()
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
				region: "不限地区",
				price: "不限价格",
				provinceList: ["不限", "北京", "天津", "上海", "重庆", "河北", "辽宁", "黑龙江", "江西", "浙江", "安徽", "山东", "河南", "湖北", "江西",
					"浙江", "安徽", "山东", "河南", "湖北"
				],
				cityList: ["不限"],
				provinceCurrent: 0,
				cityCurrent: 0,
				minprice: "",
				maxprice: "",
				supplyList:[
					{
						title:'厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱',
						price:18800.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},{
						title:'厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱',
						price:18800.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},{
						title:'厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱',
						price:18800.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},{
						title:'厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱',
						price:18800.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},{
						title:'厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱',
						price:18800.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},
					{
						title:'步入式高低温恒温恒湿试验箱 大型高低温交变湿热试验箱',
						price:280000.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},
					{
						title:'达人机床 工业立式多孔钻床 机床台钻 高效率 大功率厂家真销攻丝',
						price:10000.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					},
					{
						title:'新款伺服电机400W 伺服定位控制系统现货批发',
						price:1155.00,
						province:'广东',
						city:'东莞',
						imgSrc:'https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg'
					}
				],
				searchSupplyList:[]			//点击搜索后过滤的文章列表
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
					this.showHistory=false		//显示搜索结果页面
					// 如果该搜索记录为新记录则加入历史记录数组
					if(this.historyArr == null || !this.historyArr.includes(this.searchContent)){
						this.historyArr.unshift(this.searchContent)
						this.historyShowNumber=this.historyShowNumber == this.defaultNumber ? this.defaultNumber : this.historyArr
					}
					//过滤企业列表,如果该企业的行业种类数组中包含搜索关键字则加入显示列表
					this.searchSupplyList=this.supplyList.filter(item => item.title.includes(this.searchContent))
					if(this.searchSupplyList.length <= 0){
						this.showEmpty = true
					}else{
						this.showEmpty = false
					}
					this.saveHistory()
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
						//console.log(res.data)
						that.historyArr = res.data
					}
				})
				
			},
			saveHistory(){
				uni.setStorage({
					key:'history',
					data:this.historyArr
				})
			},
			tapdetail() {
				uni.navigateTo({
					url: './supplydetail'
				})
			},
			tapprovinceItem(index) {
				this.provinceCurrent = index;
			},
			tapcityItem(index) {
				this.cityCurrent = index;
			},
			tapresetregion() {
				this.provinceCurrent = 0;
				this.cityCurrent = 0;
				this.region = "不限地区";
				this.$refs.uDropdown.close();
			},
			tapsaveregion() {
				let province = this.provinceList[this.provinceCurrent];
				let city = this.cityList[this.cityCurrent];
				if (province == "不限" && city == "不限") {
					this.region = "不限地区";
					this.$refs.uDropdown.close();
					return;
				} else {
					this.region = province;
					this.$refs.uDropdown.close();
				}
			},
			priceCancel() {
				this.$refs.uDropdown.close();
			},
			pricesave() {
				if (this.minprice == "" || this.maxprice == "") {
					return uni.showToast({
						title: '请输入价格区间',
						icon: 'none'
					})
				}
			
				if (this.maxprice < this.minprice) {
					return uni.showToast({
						title: '最高价必须高于最低价',
						icon: 'none'
					})
				}
			
				let minprice = Number(this.minprice);
				let maxprice = Number(this.maxprice);
			
				this.price = minprice.toFixed(2) + '-' + maxprice.toFixed(2);
				this.$refs.uDropdown.close();
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
	.dropmenu {
		background-color: #fff;
		.slot-content {
	
			.province {
				margin-top: 35rpx;
				display: flex;
				align-items: flex-start;
				padding: 0rpx 30rpx;
	
				.labelName {
					color: #999999;
					width: 100rpx;
					font-size: 30rpx;
				}
	
				.provinceList {
					flex: 1;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					color: #666666;
	
					.provinceItem {
						margin-left: 12rpx;
						margin-right: 12rpx;
						margin-bottom: 12rpx;
						font-size: 30rpx;
					}
				}
			}
	
			.city {
				display: flex;
				align-items: flex-start;
				padding: 0rpx 30rpx;
				margin-top: 15rpx;
	
				.labelName {
					color: #999999;
					width: 100rpx;
					font-size: 30rpx;
				}
	
				.cityList {
					flex: 1;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					color: #666666;
	
					.cityItem {
						margin-left: 12rpx;
						margin-right: 12rpx;
						margin-bottom: 12rpx;
						font-size: 30rpx;
					}
				}
			}
	
			.active {
				color: #2D6BDD;
				border: 1rpx solid #2D6BDD;
				padding: 5rpx 10rpx;
				border-radius: 6rpx;
			}
	
	
			.slotpriceCon {
				padding: 25rpx 20rpx;
	
				.labelName {
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
				}
	
				.priceinput {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 15rpx;
	
					.inputitem {
						width: 280rpx;
						height: 80rpx;
						background-color: #F3F3F3;
						border-radius: 15rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
	
					.middleLine {
						width: 50rpx;
						height: 5rpx;
						background-color: #F3F3F3;
						border-radius: 2rpx;
					}
				}
	
				.tips {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					margin-top: 15rpx;
				}
	
			}
	
			.slotbottomBar {
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.reset {
					width: 50%;
					line-height: 90rpx;
					text-align: center;
					background-color: #fff;
					color: #666666;
					font-size: 32rpx;
					border-top: 1rpx solid #C7C7C7;
				}
	
				.save {
					width: 50%;
					line-height: 90rpx;
					background-color: #FF9000;
					color: #fff;
					font-size: 32rpx;
					text-align: center;
					border-top: 1rpx solid #FF9000;
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
	
	.fix{
		position: fixed;
		z-index: 2;
		width: 100%;
	}
	.pad {
		padding-top: 80rpx;
	}
</style>
