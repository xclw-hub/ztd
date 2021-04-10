<template>
	<view>
		<view class="nav">
			<view class="navbar">
				<view class="navbar_left" @click="clickBack">
					<image src="../../../static/enterprise/return.png"></image>
				</view>
				<view class="navbar_search" @click="enterSearch">
					<view class="img">
						<image src="../../../static/home/search.png"></image>
					</view>
					<input
					 :placeholder="searchPlaceholder"
					 placeholder-class="placeholderClass"
					 @focus="searchFocus"
					 @blur="searchBlur"
					 v-model="searchContent"
					 disabled="true"
					 />
				</view>
			</view>
			<view class="titlebox">
				<view class="title">
					<view class="option">
						<view class="option-enterprise" @click="showEnterprise">
							<text :class="[showOption ? 'activeClass_option' : 'defaultClass_option']">公司</text>
						</view>
						<view class="option-need" @click="showNeed">
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
		<view class="body">
			<view class="enterpriseList" v-show="showOption">
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
			
			<view class="supplyList" v-show="!showOption">
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
				<button class="publish" @click="publish">
					<text>我要发布</text>
				</button>
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
				enterpriseList:[
					{
						isShowMore:false,
						unfoldImgSrc:'../../../static/home/unfold.png',		//展开与收起图片的地址
						name:'长沙迪沃机械科技有限公司',
						phone:'123456789',
						address:'新顺南大街31号西南60米',
						industryKindList:['金属切削机床','铸造机械','实验分析仪器','金属切割及焊接设备','矿山机械','金属切削机床','实验分析仪器','试验机','铸造机械']
					}
				],
				supplyList:[
					{
						kind:'1',		//1是需求
						content:'本公司长期现金回收工程尾货，积压库存，回收伺服电机等',
						time:'2020-12-08 11:39'
					}
				],
				enterprisePage: 1,		//默认获取第一页(企业)
				totalPage : 1,			//企业总页数
				supplyPage: 1,		//默认获取第一页(供需)
				supplyTotalPage: 1,	//供需总页数
				parkId: 0,		//企业绑定的园区ID
				isPark:true,
				enterpriseId:0
				
			};
		},
		onPullDownRefresh() {
			console.log('触发了刷新')
			let _this = this
			_this.enterprisePage = 1		//刷新加载,重新获取所有的
			_this.filterKind = 0		//获取类型为全部
			_this.supplyPage = 1
			_this.kindchoiceType = ''
			_this.rangeChoiceType = ''
			_this.$request({
				url:'/enterpriseService/enterpriseListInner',
				data:{
					// parkId: 4,
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					page: _this.enterprisePage
				}
			}).then(res =>{
				let data = res[1].data
				_this.totalPage = data.totalPage		//获取总共页面数
				let enterpriseArr = data.enterpriseInfoList		//获取企业列表
				_this.enterpriseList = []		//将原填充数据清空
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
			
			//重新获取供需列表信息
			_this.$request({
				url:'/InfoRelease/supplyAndDemand',
				data:{
					parkId: _this.parkId,
					companyId: _this.enterpriseId,	
					type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
					range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
					keyword:'',	//关键字
					memberId:_this.$store.state.id,		
					page: _this.supplyPage,		//页码
				}
			}).then(res =>{
				let data = res[1].data.data
				// console.log(_this.enterprisePage)
				// console.log('第1页内容：')
				console.log(data)
				_this.supplyTotalPage = data.pageTotal		//获取总共页面数
				let supplyArr = data.list		//获取供需列表
				if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '收到的数据为空'
					})
					return
				}
				_this.supplyList = []		//将原填充数据清空
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
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			console.log('触发获取更多')
			let _this = this
			if(_this.showOption){		//处理公司模块
				_this.enterprisePage++
				//检查是否还有更多
				if(_this.enterprisePage > _this.totalPage){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '没有更多了!!!'
					})
				}
				else{
					console.log('获取第：'+_this.enterprisePage+'页')
					if(_this.filterKind === 0){
						_this.$request({
							url:'/enterpriseService/enterpriseListInner',
							data:{
								// parkId: 4,
								userId: _this.$store.state.id,
								userType: _this.$store.state.kind,
								page: _this.enterprisePage
							}
						}).then(res =>{
							let data = res[1].data
							// console.log('下一页内容：')
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
								page: _this.enterprisePage
							}
						}).then(res =>{
							let data = res[1].data
							// console.log('下一页内容：')
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
								page: _this.enterprisePage
							}
						}).then(res =>{
							let data = res[1].data
							// console.log('下一页内容：')
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
				}
			}
			else{
				_this.supplyPage++
				//检查是否还有更多
				if(_this.supplyPage > _this.supplyTotalPage){
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
							keyword:'',	//关键字
							memberId:_this.$store.state.id,		
							page: _this.supplyPage,		//页码
						}
					}).then(res =>{
						let data = res[1].data.data
						console.log('第:'+_this.supplyPage+'页内容是：')
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
			}
		},
		onLoad() {
			let _this = this
			if(_this.$store.state.kind === '0'){
				let info = _this.$store.state.enterpriseInfo
				_this.isPark = info.isBindPark
				_this.parkId = info.parkId
				_this.enterpriseId = info.enterpriseId
			}else{
				let info = _this.$store.state.userInfo
				_this.isPark = info.isBindPark
				_this.parkId = info.parkId
				_this.enterpriseId = info.enterpriseId
			}
			console.log(_this.isPark)
			console.log(_this.parkId)
			console.log(_this.enterpriseId)
			console.log('userID:'+_this.$store.state.id)
			_this.enterprisePage = 1		//每次进入都先加载第一页
			_this.$request({
				url:'/enterpriseService/enterpriseListInner',
				data:{
					// parkId: 4,
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					page: _this.enterprisePage
				}
			}).then(res =>{
				let data = res[1].data
				// console.log(_this.enterprisePage)
				// console.log('第1页内容：')
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
				_this.enterpriseList = []		//将原填充数据清空
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
			
			//获取供需列表信息
			_this.supplyPage = 1
			_this.$request({
				url:'/InfoRelease/supplyAndDemand',
				data:{
					parkId: _this.parkId,
					companyId: _this.enterpriseId,	
					type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
					range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
					keyword:'',	//关键字
					memberId:_this.$store.state.id,		
					page: _this.supplyPage,		//页码
				}
			}).then(res =>{
				let data = res[1].data.data
				// console.log(_this.enterprisePage)
				console.log('第1页内容：')
				console.log(data)
				_this.supplyTotalPage = data.pageTotal		//获取总共页面数
				let supplyArr = data.list		//获取供需列表
				if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '收到的数据为空'
					})
					return
				}
				_this.supplyList = []		//将原填充数据清空
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
		methods:{
			enterSearch(){
				if(this.showOption){		//搜索企业
					uni.navigateTo({
						url:'search?searchType='+'1'
					})
				}else{		//搜索供需
					uni.navigateTo({
						url:'search?searchType='+''		//收到为空表示，供需
					})
				}
			},
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
			// 点击显示公司列表
			showEnterprise(){
				this.showOption=true
				this.kindDropListShow=false
				this.rangeDropListShow=false
			},
			// 点击显示供需列表
			showNeed(){
				this.showOption=false
			},
			// 点击公司页面中的全部,进行过滤
			filterAll(){
				let _this = this
				_this.filterKind = 0
				if(_this.$store.state.kind === '0'){
					let enterpriseInfo = _this.$store.state.enterpriseInfo
					_this.parkId = enterpriseInfo.parkId
				}else{
					let userInfo = _this.$store.state.userInfo
					_this.parkId = userInfo.parkId
				}
				// console.log(_this.parkId)
				_this.enterprisePage = 1		//每次进入都先加载第一页
				_this.$request({
					url:'/enterpriseService/enterpriseListInner',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.enterprisePage
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
					_this.enterpriseList = []		//将原填充数据清空
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
				if(_this.$store.state.kind === '0'){
					let enterpriseInfo = _this.$store.state.enterpriseInfo
					_this.parkId = enterpriseInfo.parkId
				}else{
					let userInfo = _this.$store.state.userInfo
					_this.parkId = userInfo.parkId
				}
				// console.log(_this.parkId)
				_this.enterprisePage = 1		//每次进入都先加载第一页
				_this.$request({
					url:'/enterpriseService/enterpriseListInnerWithPhone',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.enterprisePage
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
					_this.enterpriseList = []		//将原填充数据清空
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
				if(_this.$store.state.kind === '0'){
					let enterpriseInfo = _this.$store.state.enterpriseInfo
					_this.parkId = enterpriseInfo.parkId
				}else{
					let userInfo = _this.$store.state.userInfo
					_this.parkId = userInfo.parkId
				}
				// console.log(_this.parkId)
				_this.enterprisePage = 1		//每次进入都先加载第一页
				_this.$request({
					url:'/enterpriseService/enterpriseListInnerWithAddress',
					data:{
						// parkId: 4,
						userId: _this.$store.state.id,
						userType: _this.$store.state.kind,
						page: _this.enterprisePage
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
					_this.enterpriseList = []		//将原填充数据清空
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
				let _this = this
				//重新获取供需列表信息
				_this.supplyPage = 1
				_this.$request({
					url:'/InfoRelease/supplyAndDemand',
					data:{
						parkId: _this.parkId,
						companyId: _this.enterpriseId,	
						type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
						range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
						keyword:'',	//关键字
						memberId:_this.$store.state.id,		
						page: _this.supplyPage,		//页码
					}
				}).then(res =>{
					let data = res[1].data.data
					// console.log(_this.enterprisePage)
					// console.log('第1页内容：')
					console.log(data)
					_this.supplyTotalPage = data.pageTotal		//获取总共页面数
					let supplyArr = data.list		//获取供需列表
					if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					_this.supplyList = []		//将原填充数据清空
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
				_this.supplyPage = 1
				_this.$request({
					url:'/InfoRelease/supplyAndDemand',
					data:{
						parkId: _this.parkId,
						companyId: _this.enterpriseId,	
						type: _this.kindchoiceType,		//1为供应，2为需求，参数为空表全部
						range: _this.rangeChoiceType,		//1为第三方，2为园内，参数为空表全部
						keyword:'',	//关键字
						memberId:_this.$store.state.id,		
						page: _this.supplyPage,		//页码
					}
				}).then(res =>{
					let data = res[1].data.data
					// console.log(_this.enterprisePage)
					// console.log('第1页内容：')
					console.log(data)
					_this.supplyTotalPage = data.pageTotal		//获取总共页面数
					let supplyArr = data.list		//获取供需列表
					if(supplyArr.length <= 0){			//如果收到的数据为空（接口无数据），默认显示填充数据
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '收到的数据为空'
						})
						return
					}
					_this.supplyList = []		//将原填充数据清空
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
		background: #2D6BDD;
		// height: 88rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 26rpx;
		// padding-top: 56rpx;
		padding-top: 76rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.navbar_left{
			display: flex;
			align-items: center;
			image{
				width: 36rpx;
				height: 36rpx;
			}
		}
		.navbar_search{
			margin-left: 30rpx;
			display: flex;
			align-items: center;
			width: 100%;
			height: 72rpx;
			background-color: #FFFFFF;
			border-radius: 10px;
			padding-left: 21rpx;
			padding-right: 21rpx;
			.img{
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
			position: fixed;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: column;
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
				display: flex;
				flex: 1;
				flex-wrap: wrap;
				height: 60rpx;
				overflow: hidden;
			}
			.industryKindList-unfold{
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
</style>
