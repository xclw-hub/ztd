<template>
	<view class="mainCon" :class="isShowDiagnosis==true?'nos':''">
		<view class="navbar">
			<view class="navleftCon">
				<view class="avatarCon" @click="enterpriseHome">
					<image :src="user_logo!='' ? user_logo : '../../static/home/userIcon.png'" mode=""></image>
				</view>
				<view class="searchBar" @click="enterSearch">
					<image class="searchImg" src="../../static/home/search.png" mode=""></image>
					<view class="searchInput">
						<input type="text" v-model="keywords" placeholder="请输入搜索关键词" />
					</view>
				</view>
			</view>
			<view class="navrightCon">
				<image class="scan" src="../../static/home/scan.png" mode="" @click="scan" v-if="isParked"></image>
				<image class="notice" src="../../static/home/notice.png" mode="" @click="tapNotice"></image>
			</view>
		</view>
		<view style="height: 178rpx;">

		</view>
		<view class="fix">
			<view class="menubar">
				<view class="item" v-for="(item,index) in menuList1" :key='index' @click="enterpage1(index)">
					<image :src="item.icon" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="menubar2">
				<view class="item" v-for="(item,index) in menuList2" :key='index' @click="enterpage2(index)">
					<image :src="item.icon" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="labelTitle">
				产业视角
			</view>
			<view class="tabCon">
				<view class="tabItem" :style="{paddingLeft:index!=0?'20rpx':'0rpx'}"
					:class="tabCurrent==index?'active':''" v-for="(item,index) in tabList" :key='index'
					@click="tapchange(index)">
					{{item.title}}
					<view class="tabline" v-if="index!=0">

					</view>
				</view>
			</view>
		</view>
		<view class="pad">

			<view class="listCon">
				<view class="listItem" v-for="(item,index) in dataList" :key='index'>
					<view class="leftCon" @click="toDetail(item.pkid)">
						<view class="title">
							{{item.title}}
						</view>
						<view class="desc">
							{{item.synopsis}}
						</view>
						<view class="date">
							{{item.time}}
						</view>
					</view>
					<view class="rightCon" @click="toDetail(item.pkid)">
						<image :src="item.pic" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 遮罩层 -->
		<view class="mask" v-if="isShowDiagnosis"></view>

		<view class="diagnosis" v-if="isShowDiagnosis">
			<view class="diagnosis-title">
				<text>专家诊断</text>
			</view>
			<text class="diagnosis-tips">专家包含技术专家和行业专家，行业专家主要为园区提供行业分析，产业分析，投资分析，招商分析等。</text>
			<view class="diagnosis-name">
				<view class="diagnosis-name-img">
					<image src="../../static/home/diagnosis_name.png"></image>
				</view>
				<input type="text" :placeholder="name_placeholder" placeholder-class="placeholderStyle"
					v-model="diagnosis_name" @focus="nameFocus" @blur="nameBlue" />
			</view>

			<view class="diagnosis-phone">
				<view class="diagnosis-phone-img">
					<image src="../../static/home/diagnosis_phone.png"></image>
				</view>
				<input type="text" :placeholder="phone_placeholder" placeholder-class="placeholderStyle"
					v-model="diagnosis_phone" @focus="phoneFocus" @blur="phoneBlue" />
			</view>
			<image id="textAreaimg" src="../../static/home/diagnosis_need.png">
			</image>
			<textarea class="diagnosis-need" :placeholder="need_placeholder" placeholder-class="placeholderStyle"
				v-model="diagnosis_need" @focus="needFocus" @blur="needBlue">
			</textarea>

			<view class="diagnosis-btn">
				<view class="diagnosis-btn-left" @click="clickCancel">
					<text>取消</text>
				</view>
				<view class="diagnosis-btn-right" @click="clickConfirm">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		request
	} from '../../util/request.js'
	export default {
		components: {
			uniNavBar,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				isShowDiagnosis: false, //标记是否显示专家诊断弹窗
				name_placeholder: '您的姓名',
				diagnosis_name: '',
				phone_placeholder: '您的联系方式',
				diagnosis_phone: '',
				need_placeholder: '简要描述您的专家需求',
				diagnosis_need: '',
				keywords: "",
				isParked: true,
				menuList1: [{
					name: "会议通知",
					icon: '../../static/home/meeting.png'
				}, {
					name: "通知公告",
					icon: '../../static/home/gonggao.png'
				}, {
					name: "供应链",
					icon: '../../static/home/gongying.png'
				}, {
					name: "企业服务",
					icon: '../../static/home/qiye.png'
				}],
				menuList2: [{
					name: "信息填报",
					icon: '../../static/home/xinxitianbao.png'
				}, {
					name: "惠企政策",
					icon: '../../static/home/zhengce.png'
				}, {
					name: "融资助手",
					icon: '../../static/home/rongzi.png'
				}, {
					name: "专家诊断",
					icon: '../../static/home/zhenduan.png'
				}],
				tabList: [],
				tabCurrent: 0,
				pageNumber: 1,
				dataList: [],
				user_logo: ''
			}
		},
		onLoad(option) {
			this.$forceUpdate()
			let _this = this
			console.log(_this.$store.state.id)
			console.log(_this.$store.state.kind)
			console.log(_this.isParked)
			if (_this.$store.state.kind === '0') {
				if (_this.$store.state.enterpriseInfo.isBindPark) {
					_this.isParked = true
				} else {
					_this.isParked = false
				}
			} else {
				if (_this.$store.state.userInfo.isBindPark) {
					_this.isParked = true
				} else {
					_this.isParked = false
				}
			}
			request({
				url: '/industry/dataTitle',
			}).then(res => {
				console.log(res[1].data.data);
				_this.tabList = res[1].data.data;
				console.log(_this.tabList);
				let d = {
					industryId: _this.tabList[_this.tabCurrent].pkid,
					keyword: _this.tabList[_this.tabCurrent].title,
					page: _this.pageNumber,
				}
				request({
					url: '/industry/dataList',
					data: d,
				}).then(res => {
					console.log(res[1].data.data.list)
					let a = _this.dataList.length
					console.log(a)
					_this.dataList = res[1].data.data.list
					console.log(_this.dataList)
				})
			})
			if (_this.$store.state.kind === '0') {
				// if (_this.$store.state.id) {
				// 	_this.user_logo = 'http://39.105.57.219/ztd/loadIcon?id='+_this.$store.enterpriseInfo.enterpriseId+'&type=0'
				// }
				// console.log('头像', _this.$store.state.id, _this.user_logo)
				_this.$request({
					url: '/enterpriseDetail',
					data: {
						'enterpriseId': _this.$store.state.id
					}
				}).then(res => {
					let data = res[1].data
					// console.log(data)
					if (data.statusCode === 2000) {
						let tem = {
							enterpriseContact: data.enterpriseContact,
							enterpriseId: data.enterpriseId,
							enterpriseLogo: data.enterpriseLogo,
							enterpriseName: data.enterpriseName,
							enterprisePhoNum: data.enterprisePhoNum,
							enterpriseUsername: data.enterpriseUsername,
							parkId: 0,
							isBindPark: false
						}
						if (data.parkId) { //如果园区ID存在，则修改存储的园区ID以及是否绑定值
							tem.parkId = data.parkId
							tem.isBindPark = true
						}
						_this.$store.commit('setEnterpriseInfo', tem)
						// console.log(_this.$store.state.enterpriseInfo)
						console.log(_this.$store.state.enterpriseInfo.enterpriseLogo)
					} else {
						console.log(data.statusMsg)
					}
				}).catch(err => {
					console.log(err)
				})
			} else {
				// _this.user_logo = 'http://39.105.57.219/ztd/loadIcon?id='+_this.$store.state.id+'&type=1'
				_this.$request({
					url: '/contactDetail',
					data: {
						'userId': _this.$store.state.id
						// 'userId' : 7
					}
				}).then(res => {
					let data = res[1].data
					console.log(data)
					if (!data.statusCode) {
						let tem = {
							contactName: data.contactName,
							phoneNum: data.phoneNum,
							contactHead: data.contactHead,
							enterpriseId: data.enterpriseId,
							enterpriseLogo: data.enterpriseLogo,
							enterpriseName: data.enterpriseName,
							enterpriseUsername: data.enterpriseUsername,
							parkId: 0,
							isBindPark: false
						}
						if (data.parkId) { //如果园区ID存在，则修改存储的园区ID以及是否绑定值
							tem.parkId = data.parkId
							tem.isBindPark = true
						}
						_this.$store.commit('setUserInfo', tem)
						if (_this.$store.state.kind === '0') {
							console.log(_this.$store.state.enterpriseInfo.enterpriseLogo)
							_this.user_logo = _this.$store.state.enterpriseInfo.enterpriseLogo
						} else {
							console.log(_this.$store.state.userInfo.contactHead)
							_this.user_logo = _this.$store.state.userInfo.contactHead
						}
					} else {
						console.log(data.statusMsg)
					}
				}).catch(err => {
					console.log(err)
				})
			}
			request({
				url: '/industry/dataTitle',
			}).then(res => {
				// console.log(res[1].data.data);
				_this.tabList = res[1].data.data;
				// console.log(_this.tabList);
				let d = {
					industryId: _this.tabList[_this.tabCurrent].pkid,
					keyword: _this.tabList[_this.tabCurrent].title,
					page: _this.pageNumber,
				}
				request({
					url: '/industry/dataList',
					data: d,
				}).then(res => {
					// console.log(res[1].data.data.list)
					let a = _this.dataList.length
					// console.log(a)
					_this.dataList = res[1].data.data.list
					// console.log(_this.dataList)
				})
			})
		},
		onReachBottom() {
			let _this = this
			console.log('触底刷新')
			console.log(this.pageNumber)
			let d = {
				industryId: _this.tabList[_this.tabCurrent].pkid,
				keyword: _this.tabList[_this.tabCurrent].title,
				page: 1
			}
			request({
				url: '/industry/dataList',
				data: d,
			}).then(res => {
				if (res[1].data.data.list.length != 0) {
					let a = _this.dataList.length
					console.log(a)
					let c = 0
					for (let b = a; b < a + res[1].data.data.list.length; b++) {
						_this.dataList.push(res[1].data.data.list[c])
						c++
					}
					console.log(_this.dataList)
					_this.pageNumber++
				} else {
					console.log('没有更多内容了')
					uni.showToast({
						title: '没有更多内容了',
						duration: 2000,
						icon: 'none'
					});
				}
			})
		},
		onShow() {
			if (this.$store.state.kind === '0') {
				this.user_logo = '';
				setTimeout(() => {
					this.user_logo = this.$store.state.enterpriseInfo.enterpriseLogo
				}, 100)
			} else {
				this.user_logo = '';
				setTimeout(() => {
					this.user_logo = this.$store.state.userInfo.contactHead
				}, 100)

			}
		},
		methods: {
			tapNotice(){
				uni.navigateTo({
					url:'../../enterprise/inform/inform'
				}	
				)
			},
			toDetail(pkid) {
				console.log(pkid)
				uni.navigateTo({
					url: './viewDetail/viewDetail?pkid=' + pkid
				})
			},
			tapchange(index) {
				this.dataList = []
				this.tabCurrent = index
				this.pageNumber = 1
				let _this = this
				request({
					url: '/industry/dataTitle',
				}).then(res => {
					console.log(res[1].data.data);
					_this.tabList = res[1].data.data;
					console.log(_this.tabList);
					let d = {
						industryId: _this.tabList[_this.tabCurrent].pkid,
						keyword: _this.tabList[_this.tabCurrent].title,
						page: _this.pageNumber,
					}
					request({
						url: '/industry/dataList',
						data: d,
					}).then(res => {
						console.log(res[1].data.data.list)
						let a = _this.dataList.length
						console.log(a)
						_this.dataList = res[1].data.data.list
						console.log(_this.dataList)
					})
				})
			},
			enterSearch() {
				uni.navigateTo({
					url: './search'
				})
			},
			enterpriseHome() {
				let userKind = this.$store.state.kind
				if (userKind == 0) {
					uni.navigateTo({
						url: '../enterprise/enterprise'
					})
				} else {
					uni.navigateTo({
						url: '../personal/personal'
					})
				}
			},
			enterpage1(index) {
				let that = this;
				switch (this.menuList1[index].name) {
					case '会议通知':
						console.log('进入会议通知页面')
						uni.navigateTo({
							url: 'meetingInform/meetingInform'
						})
						break
					case '通知公告':
						console.log('进入通知公告页面')
						uni.navigateTo({
							url: 'noticeAnnouncement/noticeAnnouncement'
						})
						break
					case '供应链':
						console.log('进入供应链页面')
						uni.navigateTo({
							url: 'supply/supply'
						})
						break
					case '企业服务':
						console.log('进入企业服务页面')
						uni.navigateTo({
							url: 'enterpriseSevice/enterpriseSevice'
						})
						break
					default:
						console.log('选项出错')
				}
			},
			enterpage2(index) {
				let that = this;
				switch (this.menuList2[index].name) {
					case '信息填报':
						console.log('进入信息填报页面')
						uni.navigateTo({
							url: 'informationFill/informationFill'
						})
						break
					case '惠企政策':
						console.log('进入惠企政策页面')
						uni.navigateTo({
							url: 'friendlyPolicy/friendlyPolicy'
						})
						break
					case '融资助手':
						console.log('进入融资助手页面')
						if (that.$store.state.kind == '1') {
							if (!that.$store.state.userInfo.isBindPark) {
								uni.showToast({
									title: '企业未入园,暂无权限',
									duration: 2000,
									icon: 'none'
								});
							} else {
								uni.navigateTo({
									url: 'financeAssistant/financeAssistant'
								})
							}
						} else {
							if (!that.$store.state.enterpriseInfo.isBindPark) {
								uni.navigateTo({
									url: '../enterprise/myPark/parkApply'
								})
							} else {
								uni.navigateTo({
									url: 'financeAssistant/financeAssistant'
								})
							}
						}
						break
					case '专家诊断':
						console.log('进入专家诊断页面')
						if (that.$store.state.kind == '1') {
							if (!that.$store.state.userInfo.isBindPark) {
								uni.showToast({
									title: '企业未入园,暂无权限',
									duration: 2000,
									icon: 'none'
								});
							} else {
								this.isShowDiagnosis = true
							}
						} else {
							this.isShowDiagnosis = true
						}
						break
					default:
						console.log('选项出错')
				}
			},
			nameFocus() {
				this.name_placeholder = ''
			},
			nameBlue() {
				this.name_placeholder = '您的姓名'
			},
			phoneFocus() {
				this.phone_placeholder = ''
			},
			phoneBlue() {
				this.phone_placeholder = '您的联系方式'
			},
			needFocus() {
				this.need_placeholder = ''
			},
			needBlue() {
				this.need_placeholder = '简要描述您的专家需求'
			},
			scan() {
				let that = this
				uni.scanCode({
					success: function(res) {
						console.log('条码内容：' + res.result);
						if (that.$store.state.kind == '0') {
							console.log({
								meetingId: res.result,
								enterpriseId: that.$store.state.enterpriseInfo.enterpriseId
							})
							request({
								url: '/enterpriseSignIn',
								data: {
									meetingId: res.result,
									enterpriseId: that.$store.state.enterpriseInfo.enterpriseId
								},
							}).then(res => {
								console.log(res[1].data.statusMsg)
								uni.showToast({
									title: res[1].data.statusMsg,
									icon: 'none',
								});
							})
						} else {
							console.log({
								meetingId: res.result,
								contactId: that.$store.state.id
							})
							request({
								url: '/contactSignIn',
								data: {
									meetingId: res.result,
									contactId: that.$store.state.id
								},
							}).then(res => {
								console.log(res[1].data.statusMsg)
								uni.showToast({
									icon: 'none',
									title: res[1].data.statusMsg,
								});
							})
						}
					}
				});

			},
			clickCancel() {
				console.log('取消')
				this.isShowDiagnosis = false
			},
			clickConfirm() {
				console.log('确定')
				let that = this
				let token = uni.getStorageSync('token');
				if (that.$store.state.kind == '0') {
					if (that.$store.state.enterpriseInfo.isBindPark) {
						let ss = {
							url: '/expertDiagnosis',
							data: {
								token,
								parkId: that.$store.state.enterpriseInfo.parkId,
								companyId: that.$store.state.enterpriseInfo.enterpriseId,
								memberId: that.$store.state.enterpriseInfo.enterpriseId,
								name: that.diagnosis_name,
								tel: that.diagnosis_phone,
								notes: that.diagnosis_need,
								companyTitle: that.$store.state.enterpriseInfo.enterpriseUsername,
								type: that.$store.state.kind
							}
							// data: {
							// 	token:'11888311eb09e1c31467236120fc3d67',
							// 	parkId: 126,
							// 	companyId: 126,
							// 	memberId: 126,
							// 	name: that.diagnosis_name,
							// 	tel: that.diagnosis_phone,
							// 	notes: that.diagnosis_need,
							// 	companyTitle: that.$store.state.userInfo.enterpriseUsername,
							// 	type:'0'
							// }
						}
						console.log(ss)
						request(ss).then((res) => {
							console.log(res)

							console.log('as')
						})
					} else {
						uni.navigateTo({
							url: '../enterprise/myPark/parkApply'
						})
					}
				} else {
					if (that.$store.state.userInfo.isBindPark) {
						let ss = {
							url: '/expertDiagnosis',
							data: {
								token,
								parkId: that.$store.state.userInfo.parkId,
								companyId: that.$store.state.userInfo.enterpriseId,
								memberId: that.$store.state.id,
								name: that.diagnosis_name,
								tel: that.diagnosis_phone,
								notes: that.diagnosis_need,
								companyTitle: that.$store.state.userInfo.enterpriseUsername,
								type: that.$store.state.kind
							},
							// data: {
							// 	token:'11888311eb09e1c31467236120fc3d67',
							// 	parkId: 126,
							// 	companyId: 126,
							// 	memberId: 126,
							// 	name: that.diagnosis_name,
							// 	tel: that.diagnosis_phone,
							// 	notes: that.diagnosis_need,
							// 	companyTitle: that.$store.state.userInfo.enterpriseUsername,
							// 	type:'0'
							// }
						}
						console.log(ss)
						request(ss).then((res) => {
							console.log(res)

							console.log('as')
						})
					}
				}
				this.isShowDiagnosis = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100%;
		background-color: #2E6BDE;
		padding-top: 66rpx;
		padding-bottom: 42rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 555;

		.navleftCon {
			display: flex;
			align-items: center;
			margin-left: 20rpx;

			.avatarCon {
				width: 68rpx;
				height: 68rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.searchBar {
				width: 468rpx;
				height: 72rpx;
				border-radius: 15rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				margin-left: 20rpx;

				.searchImg {
					width: 30rpx;
					height: 30rpx;
				}

				.searchInput {
					margin-left: 15rpx;
				}
			}
		}


		.navrightCon {
			display: flex;
			align-items: center;
			margin-right: 40rpx;

			image {
				width: 46rpx;
				height: 46rpx;
			}

			.scan {}

			.notice {
				margin-left: 20rpx;
			}
		}
	}

	.menubar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 40rpx;
		padding-left: 31rpx;
		padding-right: 31rpx;

		.item {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 130rpx;
				height: 130rpx;
			}

			.name {
				color: #333333;
				font-size: 28rpx;
			}
		}
	}

	.menubar2 {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;
		padding-left: 31rpx;
		padding-right: 31rpx;

		.item {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 130rpx;
				height: 130rpx;
			}

			.name {
				color: #333333;
				font-size: 28rpx;
			}
		}
	}


	.labelTitle {
		padding-top: 15rpx;
		padding-left: 40rpx;
		padding-bottom: 15rpx;
		font-size: 32rpx;
		color: #333333;
	}

	.tabCon {
		display: flex;
		align-items: center;
		padding: 0 40rpx;

		.tabItem {
			color: #C6C6C6;
			font-size: 26rpx;
			position: relative;
			padding-right: 40rpx;

			.tabline {
				position: absolute;
				left: -9rpx;
				bottom: 9rpx;
				width: 2rpx;
				height: 30rpx;
				display: inline-block;
				background-color: #C6C6C6;
				margin: 0rpx 5rpx;
			}
		}

		.active {
			color: #1D5CD1;
		}

	}

	.listCon {
		padding: 20rpx;
		width: 100%;
		box-sizing: border-box;

		.listItem {
			display: flex;
			width: 100%;
			height: 160rpx;
			margin-bottom: 50rpx;

			.leftCon {
				box-sizing: border-box;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 160rpx;
				padding-right: 10rpx;

				.title {
					font-size: 33rpx;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.desc {
					width: 420rpx;
					color: #777777;
					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.date {
					color: #999999;
					font-size: 26rpx;
				}
			}

			.rightCon {
				image {
					width: 240rpx;
					height: 180rpx;
				}
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 666;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}

	#textAreaimg {
		width: 28rpx;
		height: 28rpx;
		position: absolute;
		left: 73rpx;
		top: 511rpx;
	}

	.diagnosis {
		position: fixed;
		top: 350rpx;
		left: 0;
		right: 0;
		z-index: 777;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		// align-items: center;
		margin-left: 40rpx;
		margin-right: 40rpx;
		padding-top: 39rpx;
		padding-bottom: 57rpx;
		padding-left: 48rpx;
		padding-right: 48rpx;

		.diagnosis-title {
			display: flex;
			justify-content: center;

			text {
				font-size: 38rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
		}

		.diagnosis-tips {
			margin-top: 36rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			line-height: 38rpx;
		}

		.diagnosis-name {
			margin-top: 38rpx;
			height: 84rpx;
			width: 100%;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;

			.diagnosis-name-img {
				display: flex;
				justify-content: flex-start;
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}

			input {
				display: flex;
				flex: 1;
			}
		}

		.diagnosis-phone {
			margin-top: 38rpx;
			height: 84rpx;
			width: 100%;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;

			.diagnosis-phone-img {
				display: flex;
				justify-content: flex-start;
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}

			input {
				display: flex;
				flex: 1;
			}
		}

		.diagnosis-need {
			cursor: 30;
			margin-top: 38rpx;
			width: 100%;
			height: 240rpx;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding: 21rpx;
			padding-left: 64rpx;
			box-sizing: border-box;
		}

		.diagnosis-btn {
			margin-top: 38rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.diagnosis-btn-left {
				width: 280rpx;
				height: 78rpx;
				background: #BDBDBD;
				border-radius: 39rpx;
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

			.diagnosis-btn-right {
				width: 280rpx;
				height: 78rpx;
				background: #FF9000;
				border-radius: 39rpx;
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
	}

	.placeholderStyle {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
	}

	.pad {
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 500rpx;
	}

	.fix {
		position: fixed;
		z-index: 2;
		background-color: #FFFFFF;
		width: 100%;
	}

	.nos {
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0;
	}
</style>
