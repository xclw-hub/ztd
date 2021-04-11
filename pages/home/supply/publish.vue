<template>
	<view>
		<uniNavBar status-bar="true" backgroundColor="#2D6BDD" @clickLeft="clickBack" @clickRight="confirm">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>发布商品</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>发布</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<view class="tt">
					<text>商品名称</text>
				</view>
				<view class="inputTitle">
					<input type="text" :placeholder="title_placeholder" placeholder-class="placeholderStyle"
						v-model.trim="title" maxlength="80" @focus="titleFocus"  @blur="titleBlue" />
					<text class="titleLength">{{titleLength}}/80</text>
				</view>
				<!-- <input 
				    type="text" 
					:placeholder="title_placeholder" 
					placeholder-class="placeholderStyle"
					v-model.trim="title" 
					@focus="titleFocus" 
					@blur="titleBlue" /> -->
			</view>
			<view class="uploadImg">
				<view class="tips">
					<text id="tip1">上传图片</text>
					<text id="tip2">{{imageNumber}}/5</text>
				</view>
				<view class="upload">
					<view class="upload-img" v-for="(item,index) in imageArr" :key="index">
						<image :src="item" @click="preview(item)"></image>
						<image id="delete" src="../../../static/enterprise/cancel.png" @click="deleteImg(index)"></image>
					</view>
					<image src="../../../static/enterprise/uploadImage.png" @click="chooseImage"></image>
				</view>
			</view>
			<view class="price">
				<text>价格（元）</text>
				<input type="number" min="0" max="999999.99" step="0.01"  :placeholder="price_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="price" @focus="priceFocus" @blur="priceBlue" @input="changeValue()"/>
			</view>
			<view class="business" @click="tapaddress">
				<text>货源</text>
				<input type="text" :placeholder="businessaddress_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="businessaddress" @focus="businessFocus" @blur="businessBlue" :disabled="true" />
				<view class="rightArrow">
					<image src="../../../static/enterprise/btn.png" mode=""></image>
				</view>
			</view>
			<view class="address">
				<text>详细地址</text>
				<input type="text" :placeholder="address_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="address" maxlength="100" @focus="addressFocus" @blur="addressBlue" />
			</view>
			<view class="contact">
				<text>联系人</text>
				<input type="text" :placeholder="contact_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="contact" maxlength="20" @focus="contactFocus" @blur="contactBlue" />
			</view>
			<view class="mobilePhone">
				<text>移动电话</text>
				<input type="number" :placeholder="mobilePhone_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="mobilePhone" maxlength="11" @focus="mobilePhoneFocus" @blur="mobilePhoneBlue" />
			</view>
			<view class="detailinfo">
				<text>详细信息</text>
				<input type="text" :placeholder="detailinfo_placeholder" placeholder-class="placeholderStyle"
					v-model.trim="detailinfo" maxlength="1000" @focus="detailinfoFocus" @blur="detailinfoBlue" />
			</view>
		</view>

		<u-popup v-model="showAddress" mode="bottom" border-radius="20">
			<view class="addressCon">
				<view class="labelName">
					选择省市
				</view>
				<view class="Citypicker">
					<picker-view indicator-style="height:40px" indicator-class="indicator" @change="onpickerChange"
						class="picker-main">
						<picker-view-column>
							<text class="city-item" v-for="(item, index) in provinceList"
								:key="index">{{item.label}}</text>
						</picker-view-column>
						<picker-view-column>
							<text class="city-item" v-for="(item, index) in cityList[defaultCity[0]]"
								:key="index">{{item.label}}</text>
						</picker-view-column>
					</picker-view>
				</view>
				<view class="bottomBar">
					<view class="cancel" @click="showAddress=false">
						取消
					</view>
					<view class="confirm" @click="cityConfim">
						确认
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import provinceData from '../../../common/province.js';
	import cityData from '../../../common/city.js';
	import {
		request
	} from '../../../util/request.js'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title_placeholder: '请输入商品名称',
				title: '',
				imageNumber: 0, //记录已上传的照片数量
				imageArr: [], //保存上传照片的路径
				price_placeholder: '请输入价格，0为面议',
				price: '',
				businessaddress_placeholder: '请选择发货地',
				businessaddress: '',
				// fontCount:0,
				address_placeholder: '请输入详细地址',
				address: '',
				contact_placeholder: '请输入联系人姓名',
				contact: '',
				mobilePhone_placeholder: '请输入联系人手机号',
				mobilePhone: '',
				detailinfo_placeholder: '请输入详细信息',
				detailinfo: '',
				showAddress: false,
				provinceList: provinceData,
				cityList: cityData,
				defaultCity: []
			}
		},
		onLoad() {
			/* if(option){
				let goodsDetail = JSON.parse(option.goodsDetail)
				this.title = goodsDetail.title
				this.price = goodsDetail.price
				this.businessaddress=goodsDetail.source
				this.address=goodsDetail.address
				this.contact=goodsDetail.contacts
				this.mobilePhone=goodsDetail.tel
				this.detailinfo=goodsDetail.content
			} */
		},
		methods: {
			clickBack() {
				uni.reLaunch(
				{
					url:'supply'
				}
					
				)
			},
			changeValue(){
				// that.price=Number(this.price).toFixed(2);
				console.log('abcd')
			},
			confirm() {
				let that = this
				let token = uni.getStorageSync('token');
				if(that.mobilePhone.length!= 11){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '移动电话错误'
					})
					return false
				}
				if(that.imageNumber== 0){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '至少上传一张图片'
					})
					return false
				}
				if((that.price<=0)||(that.price>999999.99)){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '价格不在有效价格范围'
					})
					return false
				}
				that.price=Number(that.price).toFixed(2); //保留两位小数
				console.log(that.price)
				console.log(
				{
					token,
					type: that.$store.state.kind,
					isEdit: false,
					parkId: that.$store.state.enterpriseInfo.parkId,
					companyId: that.$store.state.enterpriseInfo.parkId,
					memberId:that.$store.state.userInfo.parkId,
					title:that.title,
					price:that.price,
					source:that.businessaddress,
					address:that.address,
					contacts:that.contact,
					tel:that.mobilePhone,
					pic:that.imageArr,
					content:that.detailinfo
				})
				if (that.$store.state.kind == '0') {
					console.log('supplyEdit')
					console.log(that.imageArr)
					request({
						url: '/supplyEdit',
						data: {
							token,
							type: that.$store.state.kind,
							isEdit: false,
							parkId: that.$store.state.enterpriseInfo.parkId,
							companyId: that.$store.state.enterpriseInfo.enterpriseId,
							memberId:1,
							title:that.title,
							price:that.price,
							source:that.businessaddress,
							address:that.address,
							contacts:that.contact,
							tel:that.mobilePhone,
							pic:that.imageArr,
							content:that.detailinfo
						}
					}).then(res => {
						console.log(res[1].data)
						let gt = res[1].data.data
						if(gt=='发布成功'){
							uni.showToast({
								title: '发布成功',
								duration: 2000,
								icon: 'none'
							});
							uni.reLaunch(
							{
								url:'../../enterprise/myGoods/myGoods'
							}
								
							)
						}
					}).catch(err=>{
						console.log(err)
					})
				}else{
					request({
						url: '/supplyEdit',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber,
							isEdit: false,
							parkId: that.$store.state.userInfo.parkId,
							companyId: that.$store.state.userInfo.enterpriseId,
							memberId:that.$store.state.id,
							title:that.title,
							price:that.price,
							source:that.businessaddress,
							address:that.address,
							contacts:that.contact,
							tel:that.mobilePhone,
							pic:that.imageArr,
							content:that.detailinfo
						}
					}).then(res => {
						console.log(res[1].data)
						let gt = res[1].data.data
						if(gt=='发布成功'){
							uni.showToast({
								title: '发布成功',
								duration: 2000,
								icon: 'none'
							});
							uni.reLaunch(
							{
								url:'../../enterprise/myGoods/myGoods'
							}
								
							)
						}
					})
				}
				console.log("发布")
				
			},
			// // 统计字数
			// wordStatic() {
			// 	this.fontCount = this.description.length
			// },
			//选择照片并上传
			chooseImage() {
				console.log('chooseImage')
				uni.chooseImage({
					count: 5 - this.imageNumber,
					success: res => {
						console.log('tempFilePaths')
						console.log(res.tempFilePaths)
						let token = uni.getStorageSync('token');
						let length = res.tempFilePaths.length
						let _this = this
						for(let i=0;i<length;i++){
							uni.uploadFile({
								url:'http://39.105.57.219:80/ztd/uploadProductImage',
								filePath: res.tempFilePaths[i],
								name: 'multipartFile',  //后台接收字段名
								formData:{
									"token":token
								},
								success: (res) => {
									console.log('uploadFile')
									console.log(res)
									let data = JSON.parse(res.data)
									console.log(data.imagePath)
									if(data.statusCode==2000){
										_this.imageArr.push(data.imagePath)
										_this.imageNumber = _this.imageArr.length
									}else{
										console.log(data.statusMsg)
									}
								},
								fail:(err)=>{
									console.log(err)
								}
							})
						}
					}
				})
			},
			//上传成功预览图片
			preview(index) {
				uni.previewImage({
					current: index, //当前点击预览的图片
					urls: this.imageArr //预览图片的链接
				})
			},
			titleFocus() {
				this.title_placeholder = ''
			},
			titleBlue() {
				this.title_placeholder = '请输入商品名称'
			},
			priceFocus() {
				this.price_placeholder = ''
			},
			priceBlue() {
				this.price_placeholder = '请输入价格，0为面议'
			},
			businessFocus() {
				this.businessaddress_placeholder = ''
			},
			businessBlue() {
				this.businessaddress_placeholder = '请选择发货地'
			},
			addressFocus() {
				this.address_placeholder = ''
			},
			addressBlue() {
				this.address_placeholder = '请输入详细地址'
			},
			contactFocus() {
				this.contact_placeholder = ''
			},
			contactBlue() {
				this.contact_placeholder = '请输入联系人姓名'
			},
			mobilePhoneFocus() {
				this.mobilePhone_placeholder = ''
			},
			mobilePhoneBlue() {
				this.mobilePhone_placeholder = '请输入联系人手机号'
			},
			detailinfoFocus() {
				this.detailinfo_placeholder = ''
			},
			detailinfoBlue() {
				this.detailinfo_placeholder = '请输入详细信息'
			},
			tapaddress() {
				this.showAddress = true;
				this.defaultCity = [0, 0];
			},
			onpickerChange(e) {
				var res = e.detail.value;
				if (!res[0]) {
					res[0] = 0;
				}
				if (!res[1]) {
					res[1] = 0;
				}
				this.defaultCity = res;
			},
			cityConfim() {
				let province = provinceData[this.defaultCity[0]].label;
				let city = cityData[this.defaultCity[0]][this.defaultCity[1]].label;
				this.businessaddress = province + city;
				this.showAddress = false;
				this.defaultCity = [];

			}
		},
		computed: {
			titleLength: function() {
				// `this` 指向 vm 实例
				return this.title.length
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uniNavBar_left,
	.uniNavBar_center,
	.uniNavBar_right {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uniNavBar_left image {
		width: 36rpx;
		height: 36rpx;
	}

	.uniNavBar_center {
		text-align: center;
	}

	.uniNavBar_center text {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}

	.uniNavBar_right text {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.placeholderStyle {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}

	.content {
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 50rpx;
	}

	.title {
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.tt text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.inputTitle {
		margin-top: 46rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.titleInput input {}

	.titleLength {
		color: #AAAAAA;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}

	.uploadImg {
		margin-top: 50rpx;
	}

	.uploadImg .tips {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.tips #tip1 {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		/* line-height: 100rpx; */
	}

	.tips #tip2 {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		/* line-height: 26rpx; */
	}

	.upload image{
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}
	.upload-img{
		position: relative;
		display: inline;
	}
	.upload-img #delete{
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: -210rpx; 
		right: -10rpx;
	}

	.price {
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.price text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.price input {
		margin-top: 46rpx;
	}

	.business {
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
		position: relative;

		.rightArrow {
			position: absolute;
			right: 0;
			bottom: 35rpx;

			image {
				width: 17rpx;
				height: 30rpx;
			}
		}
	}

	.business text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.business input {
		margin-top: 46rpx;
	}

	.address {
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.address text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.address input {
		margin-top: 46rpx;
	}

	.contact {
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.contact text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.contact input {
		margin-top: 46rpx;
	}

	.mobilePhone {
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.mobilePhone text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.mobilePhone input {
		margin-top: 46rpx;
	}

	.detailinfo {
		/* border-bottom: 1rpx solid #C7C7C7; */
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}

	.detailinfo text {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.detailinfo input {
		margin-top: 46rpx;
	}


	.addressCon {
		width: 100%;
		height: 600rpx;

		.labelName {
			text-align: center;
			line-height: 100rpx;
			font-size: 34rpx;
			border-bottom: 1rpx solid #F2F1F4;
		}

		.Citypicker {
			.picker-main {
				width: 750rpx;
				height: 400rpx;
			}

			.city-item {
				height: 40px;
				font-size: 15px;
				line-height: 40px;
				overflow: hidden;
				text-align: center;
				display: block;
			}
		}

		.bottomBar {
			width: 100%;
			border-top: 1rpx solid #F2F1F4;
			display: flex;
			align-items: center;

			.cancel {
				width: 50%;
				line-height: 80rpx;
				text-align: center;
			}

			.confirm {
				width: 50%;
				color: 50rpx;
				line-height: 80rpx;
				text-align: center;
				color: #245CD2;
			}
		}
	}
</style>
