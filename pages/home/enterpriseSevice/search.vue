<template>
	<view>
		<view class="nav">
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
			<view class="titlebox" v-show="!showHistory">
				<view class="title">
					<view class="option">
						<view class="option-enterprise">
							<text :class="[showOption ? 'activeClass_option' : 'defaultClass_option']">公司</text>
						</view>
						<view class="option-need">
							<text :class="[!showOption ? 'activeClass_option' : 'defaultClass_option']" >供需</text>
						</view>
					</view>
					
					<view class="enterprise-filter" v-show="showOption">
						<view :class="[filterKind==0 ? 'activeClass_filter' : 'defaultClass_filter']" @click="filterAll">
							<text>全部</text>
						</view>
						<view :class="[filterKind==1 ? 'activeClass_filter' : 'defaultClass_filter']" @click="filterPhone">
							<text>有电话</text>
						</view>
						<view :class="[filterKind==2 ? 'activeClass_filter' : 'defaultClass_filter']" @click="filterAddress">
							<text>有地址</text>
						</view>
					</view>
					
					<view class="need-filter" v-show="!showOption">
						<view class="allKind" @click="showKindDropList">
							<text :class="[kindDropListShow ? 'activeTextColor' : 'defaultTextColor']">{{kindChoice}}</text>
							<image src="../../../static/home/listShow.png"></image>
						</view>
						<view class="allRange" @click="showRangeDropList">
							<text :class="[rangeDropListShow ? 'activeTextColor' : 'defaultTextColor']">{{rangeChoice}}</text>
							<image src="../../../static/home/listShow.png"></image>
						</view>
					</view>
				</view>
				<!-- 类型过滤下拉框 -->
				<view class="dropList" v-show="kindDropListShow">
					<view class="dropItem" v-for="(kindItem, kindIndex) in kindList" :key="kindIndex" @click="kindChoose(kindIndex)">
						<text>{{kindItem}}</text>
					</view>
				</view>
				<!-- 范围过滤下拉框 -->
				<view class="dropList" v-show="rangeDropListShow">
					<view class="dropItem" v-for="(rangeItem, rangeIndex) in rangeList" :key="rangeIndex" @click="rangeChoose(rangeIndex)">
						<text>{{rangeItem}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="body" v-show="!showHistory">
			<view class="enterpriseList" v-if="showOption">
				<view class="enterpriseItem" v-for="(item, index) in enterpriseList" :key='index'>
					<view class="enterpriseItem-up">
						<text>{{item.name}}</text>
						<view class="enterpriseItem-up-phone" :class="[item.phone!=='' ? 'activeClass_phone' : 'defaultClass_phone']" @click="dialPhone(index)">
							<text>联系商家</text>
						</view>
					</view>
					
					<view class="enterpriseItem-center" v-if="item.industryKindList.length>0">
						<view :class="[item.isShowMore ? 'industryKindList-unfold' : 'industryKindList-fold']">
							<view class="industryKindItem" v-for="(industryItem, industryIndex) in item.industryKindList" :key='industryIndex'>
								<text>{{industryItem}}</text>
							</view>
						</view>
						<view class="enterpriseItem-center-img" @click="showMoreItem(index)">
							<image :src='item.unfoldImgSrc'></image>
						</view>
					</view>
					
					<view class="enterpriseItem-down">
						<image src="../../../static/home/address.png"></image>
						<text v-if="item.address!==''">{{item.address}}</text>
						<text v-else>未录入地址信息</text>
					</view>
				</view>
			</view>
			
			<view class="supplyList" v-if="!showOption">
				<view class="supplyItem" v-for="(item,index) in supplyList" :key="index" @click="viewSupplyDetail(index)">
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
				<!-- <button class="publish" @click="publish">
					<text>我要发布</text>
				</button> -->
			</view>
		</view>
		
		<view class="history" v-show="showHistory">
			<view class="history-up" v-if="historyArr.length>0">
				<text>历史搜索</text>
				<text @click="clearHistory" v-if="historyArr.length!=0">清空</text>
			</view>
			<view class="history-down">
				<view class="historyItem" v-for="(item, index) in historyArr" :key='index'>
					<text>{{item}}</text>
				</view>
			</view>
		</view>
		
		<view class="mask" v-show="kindDropListShow||rangeDropListShow"></view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				showHistory:true,		//为true表示还未搜索,显示历史搜索界面,否则显示结果
				kindDropListShow:false,		//为true显示全部类型的下拉菜单
				kindList:['全部类型', '供应' ,'需求'],
				kindChoice:'全部类型',		//选中的筛选条件，默认为全部类型
				kindchoiceType: '',		//空为全部，'1'为供应，'2'为需求
				rangeDropListShow:false,		//为true显示不限范围的下拉菜单
				rangeList:['不限范围', '第三方服务' ,'园内服务'],
				rangeChoice:'不限范围',		//选中的筛选条件，默认为全部类型
				rangeChoiceType: '',		//空为全部，'1'为第三方，'2'为园内
				searchPlaceholder:'请输入关键字搜索',
				searchContent:'',
				showOption:true,		//true则显示公司列表,false显示供需列表
				filterKind:0,		//0表示显示全部，1表示显示有电话的，2表示显示有地址的
				enterpriseList:[],
				supplyList:[],
				historyArr:[],		//搜索的历史记录
				currentPage: 1,		//默认获取第一页
				totalPage : 1,
				parkId: 0,		//企业绑定的园区ID
				isPark:true,
				enterpriseId:0,
				memberId: ''
			};
		},
		onPullDownRefresh() {
			console.log('触发了刷新')
			let _this = this
			_this.currentPage = 1		//刷新加载,重新获取所有的
			_this.filterKind = 0		//获取类型为全部
			_this.kindchoiceType = ''
			_this.rangeChoiceType = ''
			console.log(_this.showOption)
			if(_this.showOption){		//刷新企业
				_this.enterpriseList = []		//将原填充数据清空
				_this.$request({
					url:'/enterpriseService/enterpriseListInner',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.currentPage
					}
				}).then(res =>{
					let data = res[1].data
					_this.totalPage = data.totalPage		//获取总共页面数
					let enterpriseArr = data.enterpriseInfoList		//获取企业列表
					for (let i = 0; i < enterpriseArr.length; i++){
						let keywordArr = enterpriseArr[i].keyword.split(',')
						let item = {
							isShowMore: false,
							unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
							name: enterpriseArr[i].enterpriseName,
							phone: enterpriseArr[i].phone || '',	//默认为‘’
							address: enterpriseArr[i].address || '',	
							industryKindList: keywordArr
						}
						_this.enterpriseList.push(item)
					}
					console.log(_this.enterpriseList)
				}).catch(err => {
					console.log(err)
				})
			}
			else{
				//重新获取供需列表信息
				_this.supplyList = []		//将原填充数据清空
				_this.$request({
					url:'/InfoRelease/supplyAndDemand',
					data:{
						parkId: _this.parkId,
						companyId: _this.enterpriseId,	
						type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
						range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
						keyword:_this.searchContent,	//关键字
						memberId: _this.memberId,
						page: _this.currentPage,		//页码
					}
				}).then(res =>{
					let data = res[1].data.data
					console.log(_this.enterprisePage)
					console.log('第1页内容：')
					console.log(data)
					_this.totalPage = data.pageTotal		//获取总共页面数
					let supplyArr = data.list		//获取供需列表
					if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < supplyArr.length; i++){
						let item = {
							pkid: supplyArr[i].pkid,
							kind:'0',		//0是供应
							content: supplyArr[i].title,
							time: supplyArr[i].time
						}
						if(supplyArr[i].type === '供应'){
							item.kind = '0'
						}else{
							item.kind = '1'
						}
						_this.supplyList.push(item)
					}
					
				}).catch(err=>{
					console.log(err)
				})
			}
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			console.log('触发获取更多')
			let _this = this
			_this.currentPage++
			//检查是否还有更多
			if(_this.currentPage > _this.totalPage){
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '没有更多了!!!'
				})
			}
			else{
				console.log('获取第：'+_this.currentPage+'页')
				if(_this.showOption){//处理公司模块
					if(_this.filterKind === 0){
						_this.$request({
							url:'/enterpriseService/enterpriseListInner',
							data:{
								// parkId: 4,
								userId: _this.$store.state.id,
								userType: _this.$store.state.kind,
								page: _this.currentPage
							}
						}).then(res =>{
							let data = res[1].data
							console.log('下一页内容：')
							console.log(data)
							let enterpriseArr = data.enterpriseInfoList
							for (let i = 0; i < enterpriseArr.length; i++){
								let keywordArr = enterpriseArr[i].keyword.split(',')
								let item = {
									isShowMore: false,
									unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
									name: enterpriseArr[i].enterpriseName,
									phone: enterpriseArr[i].phone || '',
									address: enterpriseArr[i].address || '',
									industryKindList: keywordArr
								}
								_this.enterpriseList.push(item)
							}
							// console.log(_this.enterpriseList)
						}).catch(err => {
							console.log(err)
						})
					}
					else if(_this.filterKind === 1){
						_this.$request({
							url:'/enterpriseService/enterpriseListInnerWithPhone',
							data:{
								// parkId: 4,
								userId: _this.$store.state.id,
								userType: _this.$store.state.kind,
								page: _this.currentPage
							}
						}).then(res =>{
							let data = res[1].data
							console.log('下一页内容：')
							console.log(data)
							let enterpriseArr = data.enterpriseInfoList
							for (let i = 0; i < enterpriseArr.length; i++){
								let keywordArr = enterpriseArr[i].keyword.split(',')
								let item = {
									isShowMore: false,
									unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
									name: enterpriseArr[i].enterpriseName,
									phone: enterpriseArr[i].phone || '',
									address: enterpriseArr[i].address || '',
									industryKindList: keywordArr
								}
								_this.enterpriseList.push(item)
							}
							// console.log(_this.enterpriseList)
						}).catch(err => {
							console.log(err)
						})
					}
					else{
						_this.$request({
							url:'/enterpriseService/enterpriseListInnerWithAddress',
							data:{
								// parkId: 4,
								userId: _this.$store.state.id,
								userType: _this.$store.state.kind,
								page: _this.currentPage
							}
						}).then(res =>{
							let data = res[1].data
							console.log('下一页内容：')
							console.log(data)
							let enterpriseArr = data.enterpriseInfoList
							for (let i = 0; i < enterpriseArr.length; i++){
								let keywordArr = enterpriseArr[i].keyword.split(',')
								let item = {
									isShowMore: false,
									unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
									name: enterpriseArr[i].enterpriseName,
									phone: enterpriseArr[i].phone || '',
									address: enterpriseArr[i].address || '',
									industryKindList: keywordArr
								}
								_this.enterpriseList.push(item)
							}
						}).catch(err => {
							console.log(err)
						})
					}
					console.log(_this.enterpriseList)
				}
				else{
					//检查是否还有更多
					if(_this.currentPage > _this.supplyTotalPage){
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '没有更多了!!!'
						})
					}
					else{		//获取供需列表信息
						_this.$request({
							url:'/InfoRelease/supplyAndDemand',
							data:{
								parkId: _this.parkId,
								companyId: _this.enterpriseId,	
								type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
								range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
								keyword:_this.searchContent,	//关键字
								memberId: _this.memberId,
								page: _this.currentPage,		//页码
							}
						}).then(res =>{
							let data = res[1].data.data
							console.log('下一页内容：')
							console.log(data)
							let supplyArr = data.list		//获取供需列表
							for (let i = 0; i < supplyArr.length; i++){
								let item = {
									pkid: supplyArr[i].pkid,
									kind:'0',		//0是供应
									content: supplyArr[i].title,
									time: supplyArr[i].time
								}
								if(supplyArr[i].type === '供应'){
									item.kind = '0'
								}else{
									item.kind = '1'
								}
								_this.supplyList.push(item)
							}
						}).catch(err=>{
							console.log(err)
						})
					}
					console.log(_this.supplyList)
				}
			}
		},
		onShow() {
			if(!this.showOption&&this.searchContent!=''){
				this.clickSearch()
			}
		},
		onLoad(option) {
			let _this = this 
			// console.log(Boolean(option.searchType))
			_this.showOption = Boolean(option.searchType)
			if(_this.$store.state.kind === '0'){
				let info = _this.$store.state.enterpriseInfo
				_this.isPark = info.isBindPark
				_this.parkId = info.parkId
				_this.enterpriseId = info.enterpriseId
				_this.memberId = ''
			}else{
				let info = _this.$store.state.userInfo
				_this.isPark = info.isBindPark
				_this.parkId = info.parkId
				_this.enterpriseId = info.enterpriseId
				_this.memberId = _this.$store.state.id
			}
			console.log(_this.isPark)
			console.log(_this.parkId)
			console.log(_this.enterpriseId)
			console.log(this.parkId)
			//获取存储的搜索历史记录
			uni.getStorage({
				key: 'enterpriseSearchHistory',
				success:function(res){
					_this.historyArr = res.data
				},
				fail:function(err){
					console.log('没有存储历史记录')
				}
			})
		},
		onUnload(){
			let _this = this
			console.log('退出页面')
			//将返回的token进行缓存
			uni.setStorage({
			    key: 'enterpriseSearchHistory',
			    data: _this.historyArr,
			    success: function () {
			        console.log(_this.historyArr)
			        console.log('enterpriseSearchHistory缓存成功')
			    },
				fail:function(){
					console.log('enterpriseSearchHistory缓存失败')
				}
			})
		},
		methods:{
			// 返回
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			dialPhone(index){
				let _this = this
				console.log(_this.enterpriseList[index].phone)
				uni.makePhoneCall({
				    phoneNumber: _this.enterpriseList[index].phone
				})
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
			},
			// 点击公司页面中的全部,进行过滤
			filterAll(){
				let _this = this
				_this.filterKind = 0
				_this.currentPage = 1		//每次进入都先加载第一页
				_this.enterpriseList = []		//将原填充数据清空
				_this.$request({
					url:'/enterpriseService/enterpriseListInner',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.currentPage
					}
				}).then(res =>{
					let data = res[1].data
					console.log(data)
					_this.totalPage = data.totalPage		//获取总共页面数
					let enterpriseArr = data.enterpriseInfoList		//获取企业列表
					if(enterpriseArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < enterpriseArr.length; i++){
						let keywordArr = enterpriseArr[i].keyword.split(',')
						let item = {
							isShowMore: false,
							unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
							name: enterpriseArr[i].enterpriseName,
							phone: enterpriseArr[i].phone || '',	//默认为‘’
							address: enterpriseArr[i].address || '',	
							industryKindList: keywordArr
						}
						_this.enterpriseList.push(item)
					}
					// console.log(_this.enterpriseList)
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击公司页面中的有电话,进行过滤
			filterPhone(){
				let _this = this
				_this.filterKind = 1
				_this.currentPage = 1		//每次进入都先加载第一页
				_this.enterpriseList = []		//将原填充数据清空
				_this.$request({
					url:'/enterpriseService/enterpriseListInnerWithPhone',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.currentPage
					}
				}).then(res =>{
					let data = res[1].data
					console.log(data)
					_this.totalPage = data.totalPage		//获取总共页面数
					let enterpriseArr = data.enterpriseInfoList		//获取企业列表
					if(enterpriseArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < enterpriseArr.length; i++){
						let keywordArr = enterpriseArr[i].keyword.split(',')
						let item = {
							isShowMore: false,
							unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
							name: enterpriseArr[i].enterpriseName,
							phone: enterpriseArr[i].phone || '',	//默认为‘’
							address: enterpriseArr[i].address || '',	
							industryKindList: keywordArr
						}
						_this.enterpriseList.push(item)
					}
					// console.log(_this.enterpriseList)
				}).catch(err => {
					console.log(err)
				})
			},
			// 点击公司页面中的有地址,进行过滤
			filterAddress(){
				let _this = this
				_this.filterKind = 2
				_this.currentPage = 1		//每次进入都先加载第一页
				_this.enterpriseList = []		//将原填充数据清空
				_this.$request({
					url:'/enterpriseService/enterpriseListInnerWithAddress',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.currentPage
					}
				}).then(res =>{
					let data = res[1].data
					console.log(data)
					_this.totalPage = data.totalPage		//获取总共页面数
					let enterpriseArr = data.enterpriseInfoList		//获取企业列表
					if(enterpriseArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < enterpriseArr.length; i++){
						let keywordArr = enterpriseArr[i].keyword.split(',')
						let item = {
							isShowMore: false,
							unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
							name: enterpriseArr[i].enterpriseName,
							phone: enterpriseArr[i].phone || '',	//默认为‘’
							address: enterpriseArr[i].address || '',	
							industryKindList: keywordArr
						}
						_this.enterpriseList.push(item)
					}
					// console.log(_this.enterpriseList)
				}).catch(err => {
					console.log(err)
				})
			},
			// 显示供需页面的类型下拉列表
			showKindDropList(){
				if(this.rangeDropListShow){
					this.rangeDropListShow=false
				}
				this.kindDropListShow=!this.kindDropListShow
			},
			// 显示供需页面的范围下拉列表
			showRangeDropList(){
				if(this.kindDropListShow){
					this.kindDropListShow=false
				}
				this.rangeDropListShow=!this.rangeDropListShow
			},
			// 类型下拉列表的点击事件
			kindChoose(index){
				this.kindChoice=this.kindList[index]
				if(this.kindChoice==='全部类型'){
					this.kindchoiceType = ''
				}
				else if(this.kindChoice==='供应'){
					this.kindchoiceType = '1'
				}
				else{
					this.kindchoiceType = '2'
				}
				this.kindDropListShow=!this.kindDropListShow
				//重新获取供需列表信息
				let _this = this
				_this.currentPage = 1
				_this.supplyList = []		//将原填充数据清空
				_this.$request({
					url:'/InfoRelease/supplyAndDemand',
					data:{
						parkId: _this.parkId,
						companyId: _this.enterpriseId,	
						type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
						range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
						keyword:_this.searchContent,	//关键字
						memberId: _this.memberId,
						page: _this.currentPage,		//页码
					}
				}).then(res =>{
					let data = res[1].data.data
					// console.log(_this.enterprisePage)
					// console.log('第1页内容：')
					console.log(data)
					_this.totalPage = data.pageTotal		//获取总共页面数
					let supplyArr = data.list		//获取供需列表
					if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < supplyArr.length; i++){
						let item = {
							pkid: supplyArr[i].pkid,
							kind:'0',		//0是供应
							content: supplyArr[i].title,
							time: supplyArr[i].time
						}
						if(supplyArr[i].type === '供应'){
							item.kind = '0'
						}else{
							item.kind = '1'
						}
						_this.supplyList.push(item)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 范围下拉列表的点击事件
			rangeChoose(index){
				this.rangeChoice=this.rangeList[index]
				if(this.rangeChoice==='不限范围'){
					this.rangeChoiceType = ''
				}
				else if(this.rangeChoice==='第三方服务'){
					this.rangeChoiceType = '1'
				}
				else{
					this.rangeChoiceType = '2'
				}
				this.rangeDropListShow=!this.rangeDropListShow
				//重新获取供需列表信息
				let _this = this
				_this.currentPage = 1
				_this.supplyList = []		//将原填充数据清空
				_this.$request({
					url:'/InfoRelease/supplyAndDemand',
					data:{
						parkId: _this.parkId,
						companyId: _this.enterpriseId,	
						type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
						range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
						keyword:_this.searchContent,	//关键字
						memberId: _this.memberId,
						page: _this.currentPage,		//页码
					}
				}).then(res =>{
					let data = res[1].data.data
					// console.log(_this.enterprisePage)
					// console.log('第1页内容：')
					console.log(data)
					_this.totalPage = data.pageTotal		//获取总共页面数
					let supplyArr = data.list		//获取供需列表
					if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					// console.log(enterpriseArr)
					for (let i = 0; i < supplyArr.length; i++){
						let item = {
							pkid: supplyArr[i].pkid,
							kind:'0',		//0是供应
							content: supplyArr[i].title,
							time: supplyArr[i].time
						}
						if(supplyArr[i].type === '供应'){
							item.kind = '0'
						}else{
							item.kind = '1'
						}
						_this.supplyList.push(item)
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 查看供应详情
			viewSupplyDetail(index){
				console.log(this.supplyList[index])
				uni.navigateTo({
					url:'../../enterprise/informationPublish/publishDetails?pkid='+this.supplyList[index].pkid
				})
			},
			publish(){
				uni.navigateTo({
					url:`../../enterprise/informationPublish/publish?parkId=${JSON.stringify(this.parkId)}&companyId=${JSON.stringify(this.enterpriseId)}`
				})
			},
			//行业种类中点击展示更多
			showMoreItem(index){
				if(this.enterpriseList[index].isShowMore){
					this.enterpriseList[index].isShowMore=false
					this.enterpriseList[index].unfoldImgSrc='../../../static/home/unfold.png'
					
				}else{
					this.enterpriseList[index].isShowMore=true
					this.enterpriseList[index].unfoldImgSrc='../../../static/home/fold.png'
				}
				// this.enterpriseList[index].isShowMore=!this.enterpriseList[index].isShowMore
			},
			// 点击搜索按键
			clickSearch(){
				let _this = this
				if(_this.searchContent!=''){
					_this.showHistory=false		//显示搜索结果页面
					// 如果该搜索记录为新记录则加入历史记录数组
					if(!_this.historyArr.includes(_this.searchContent)){
						_this.historyArr.unshift(_this.searchContent)
					}
					_this.currentPage = 1		//每次点击搜索都加载第一页
					if(_this.showOption){		//搜索企业
						_this.enterpriseList = []		//将原填充数据清空
						_this.$request({
							url:'/enterpriseService/enterpriseListInnerSearch',
							data:{
								// parkId: 4,
								userId: _this.$store.state.id,
								userType: _this.$store.state.kind,
								page: _this.currentPage,
								searchInfo: _this.searchContent
							}
						}).then(res =>{
							let data = res[1].data
							// console.log(_this.enterprisePage)
							console.log('第1页内容：')
							console.log(data)
							_this.totalPage = data.totalPage		//获取总共页面数
							let enterpriseArr = data.enterpriseInfoList		//获取企业列表
							if(enterpriseArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									duration: '2000',
									title: '搜索无结果'
								})
								return
							}
							// console.log(enterpriseArr)
							for (let i = 0; i < enterpriseArr.length; i++){
								let keywordArr = enterpriseArr[i].keyword.split(',')
								let item = {
									isShowMore: false,
									unfoldImgSrc: '../../../static/home/unfold.png',		//展开与收起图片的地址
									name: enterpriseArr[i].enterpriseName,
									phone: enterpriseArr[i].phone || '',	//默认为‘’
									address: enterpriseArr[i].address || '',	
									industryKindList: keywordArr
								}
								_this.enterpriseList.push(item)
							}
							// console.log(_this.enterpriseList)
						}).catch(err => {
							console.log(err)
						})
					}
					else{		//搜索供需
						_this.supplyList = []		//将原填充数据清空
						_this.$request({
							url:'/InfoRelease/supplyAndDemand',
							data:{
								parkId: _this.parkId,
								companyId: _this.enterpriseId,	
								type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
								range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
								keyword:_this.searchContent,	//关键字
								memberId: _this.memberId,
								page: _this.currentPage,		//页码
							}
						}).then(res =>{
							console.log(res)
							let data = res[1].data.data
							console.log(_this.enterprisePage)
							console.log('第1页内容：')
							console.log(data)
							_this.totalPage = data.pageTotal		//获取总共页面数
							let supplyArr = data.list		//获取供需列表
							if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									duration: '2000',
									title: '搜索无结果'
								})
								return
							}
							// console.log(enterpriseArr)
							for (let i = 0; i < supplyArr.length; i++){
								let item = {
									pkid: supplyArr[i].pkid,
									kind:'0',		//0是供应
									content: supplyArr[i].title,
									time: supplyArr[i].time
								}
								if(supplyArr[i].type === '供应'){
									item.kind = '0'
								}else{
									item.kind = '1'
								}
								_this.supplyList.push(item)
							}
						}).catch(err=>{
							console.log(err)
						})
					}
					
				}
				else{
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入搜索内容'
					})
				}
			},
			clearHistory(){
				this.historyArr=[]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav{
		display: flex;
		flex-direction: column;
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	.navbar{
		background: #FFFFFF;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 26rpx;
		// padding-top: 56rpx;
		padding-top: 76rpx;
		border-bottom: 8rpx solid #F3F3F3;
		display: flex;
		flex-direction: row;
		align-items: center;
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
	.titlebox{
		.title{
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			justify-content: space-between;
			background: #FFFFFF;
			.option{
				display: flex;
				align-items: center;
				.option-enterprise{
					border-right: #CACACA solid 1rpx;
					padding-right: 20rpx;
				}
				.option-need{
					padding-left: 20rpx;
				}
				.activeClass_option{
					font-size: 38rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #1B5CD4;
				}
				.defaultClass_option{
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
				}
			}
			.enterprise-filter{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.activeClass_filter{
					width: 100rpx;
					height: 52rpx;
					border: 1rpx solid #2360D1;
					border-radius: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text{
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #2D6BDD;
					}
				}
				.defaultClass_filter{
					width: 100rpx;
					height: 52rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text{
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #999999;
					}
				}
			}
			.need-filter{
				display: flex;
				align-items: center;
				.allKind{
					display: flex;
					align-items: center;
					margin-right: 25rpx;
					text{
						margin-right: 10rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
					}
					image{
						width: 24rpx;
						height: 14rpx;
					}
				}
				.allRange{
					display: flex;
					align-items: center;
					text{
						margin-right: 10rpx;
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
					}
					image{
						width: 24rpx;
						height: 14rpx;
					}
				}
				.activeTextColor{
					color: #1B5CD4;
				}
				.defaultTextColor{
					color: #999999;
				}
			}
		}
		.dropList{
			background: #FFFFFF;
			display: flex;
			flex-direction: column;
			// position: fixed;
			position: absolute;
			left: 0;
			right: 0;
			.dropItem{
				height: 90rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					line-height: 90rpx;
				}
			}
		}
	}
	.body{
		// padding-top: 95rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.enterpriseList{
		display: flex;
		flex-direction: column;
		// padding-bottom: 200rpx;
		padding-bottom: 50rpx;
		.enterpriseItem{
			display: flex;
			flex-direction: column;
			padding-top: 34rpx;
			padding-bottom: 34rpx;
			border-top: 1rpx solid #E9E9E9;
			.enterpriseItem-up{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				text:nth-child(1){
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
				}
				.enterpriseItem-up-phone{
					width: 138rpx;
					height: 56rpx;
					border-radius: 5rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
				.activeClass_phone{
					background: #2D6BDD;
				}
				.defaultClass_phone{
					background: #A2A2A2;
				}
			}
			.enterpriseItem-center{
				margin-top: 20rpx;
				display: flex;
				.enterpriseItem-center-img{
					display: flex;
					justify-content: flex-end;
					margin-top: 20rpx;
					width: 24rpx;
					height: 14rpx;
					image{
						width: 24rpx;
						height: 14rpx;
					}
				}
			}
			.industryKindList-fold{
				// margin-top: 20rpx;
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				height: 60rpx;
				overflow: hidden;
			}
			.industryKindList-unfold{
				// margin-top: 20rpx;
				flex: 1;
				display: flex;
				flex-wrap: wrap;
			}
			.industryKindItem{
				margin-right: 12rpx;
				margin-top: 12rpx;
				padding-left: 15rpx;
				padding-right: 15rpx;
				height: 48rpx;
				border: 1rpx solid #BFBFBF;
				border-radius: 5rpx;
				text{
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #777777;
				}
			}
			.enterpriseItem-down{
				margin-top: 24rpx;
				display: flex;
				align-items: center;
				image{
					width: 21rpx;
					height: 26rpx;
				}
				text{
					margin-left: 8rpx;
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
	.supplyList{
		padding-bottom: 200rpx;
		.supplyItem{
			width: 100%;
			padding-top: 34rpx;
			padding-bottom: 34rpx;
			border-top: 1rpx solid #E9E9E9;
			#supplyTitle{
				width: 72rpx;
				height: 40rpx;
				background: #FF9C00;
				border-radius: 5rpx;
				display:inline-flex;
				align-items: center;
				justify-content: center;
				margin-right: 10rpx;
				text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 42rpx;
				}
			}
			#needTitle{
				width: 72rpx;
				height: 40rpx;
				background: #2E6BDE;
				border-radius: 5rpx;
				display:inline-flex;
				align-items: center;
				justify-content: center;
				margin-right: 10rpx;
				text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 42rpx;
				}
			}
			#message{
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
			}
			#time{
				display: flex;
				align-items: center;
				margin-top: 22rpx;
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
				}
				text{
					font-size: 26rpx;
					font-family: Arial;
					font-weight: 400;
					color: #BBBBBB;
					line-height: 42rpx;
				}
			}
		}
		.publish{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			margin-top: 265rpx;
			margin-bottom: 40rpx;
			width: 670rpx;
			height: 84rpx;
			background: #2D6BDD;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	
	.history{
		margin-top: 36rpx;
		display: flex;
		flex-direction: column;
		padding-left: 40rpx;
		padding-right: 40rpx;
		.history-up{
			display: flex;
			justify-content: space-between;
			text:nth-child(1){
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
			text:nth-child(2){
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #2D6BDD;
			}
		}
		.history-down{
			margin-top: 23rpx;
			display: flex;
			flex-wrap: wrap; 
			width: 100%;
			.historyItem{
				border: 1rpx solid #BFBFBF;
				height: 54rpx;
				border-radius: 5rpx;
				padding-left: 15rpx;
				padding-right: 15rpx;
				margin-right: 12rpx;
				margin-top: 12rpx;
				display: flex;
				align-items: center;
				text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #777777;
				}
			}
		}
	}
	
	.mask{
		position: fixed;
		/* top: 0; */
		top: 270rpx;
		left: 0;
		bottom: 0;
		right: 0;
		z-index:20;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}
</style>
