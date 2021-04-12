<template>
	<view>
		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
			@clickRight="confirm"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>发布信息</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>确认发布</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<text>标题</text>
				<input 
					type="text" 
					maxlength=80
				 	:placeholder="title_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="title"
				 	@focus="titleFocus"
				 	@blur="titleBlue"/>
			</view>
			<view class="price">
				<text>价格（元）</text>
				<input 
					type="digit"
					maxlength=9
				 	:placeholder="price_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="price"
				 	@focus="priceFocus"
				 	@blur="priceBlue"/>
			</view>
			<view class="business">
				<text>主营业务</text>
				<input 
					type="text"
					maxlength=400
				 	:placeholder="business_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="business"
				 	@focus="businessFocus"
				 	@blur="businessBlue"/>
			</view>
			<view class="description">
				<text id="tip">描述</text>
				<textarea 
				:placeholder="description_placeholder"
				placeholder-class="placeholderStyle"
				v-model="description"
				maxlength="400"
				@input="wordStatic"
				@focus="descriptionFocus"
				@blur="descriptionBlue"></textarea>
				<view class="count">
					<text>{{fontCount}}/400</text>
				</view>
			</view>
			<view class="uploadImg">
				<view class="tips">
					<text id="tip1">上传图片</text>
					<text id="tip2">{{imageNumber}}/9</text>
				</view>
				<view class="upload">
					<view class="upload-img" v-for="(item,index) in imageArr" :key="index">
						<image :src="item" @click="preview(item)"></image>
						<image id="delete" src="../../../static/enterprise/cancel.png" @click="deleteImg(index)"></image>
					</view>
					<image src="../../../static/enterprise/uploadImage.png" @click="chooseImage" v-show="imageNumber<9"></image>
				</view>
			</view>
			<view class="address">
				<text>详细地址</text>
				<input 
					type="text"
					maxlength=100
				 	:placeholder="address_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="address"
				 	@focus="addressFocus"
				 	@blur="addressBlue"/>
			</view>
			<view class="contact">
				<text>联系人</text>
				<input 
					type="text"
					maxlength=20
				 	:placeholder="contact_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="contact"
				 	@focus="contactFocus"
				 	@blur="contactBlue"/>
			</view>
			<view class="mobilePhone">
				<text>移动电话</text>
				<input 
					type="number"
					maxlength=11
				 	:placeholder="mobilePhone_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="mobilePhone"
				 	@focus="mobilePhoneFocus"
				 	@blur="mobilePhoneBlue"/>
			</view>
			<view class="kind">
				<text>类型</text>
				<view>
					<radio-group @change="radioChange" v-model="publishKind">
							<label id="item">
								<view>
									<radio value="供应" checked />供应
								</view>
							</label>
							<label>
								<view>
									<radio value="需求" />需求
								</view>
							</label>
					</radio-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		onLoad(option) {
			this.parkId = JSON.parse(option.parkId)
			this.companyId = JSON.parse(option.companyId)
			// console.log(this.parkId)
			// console.log(this.companyId)
		},
		data() {
			return {
				title_placeholder:'请输入标题',
				title:'',
				price_placeholder:'请输入价格，0为面议',
				price:'',
				business_placeholder:'输入关键词，多个关键词请用英文“,”隔开',
				business:'',
				description_placeholder:'请输入描述内容',
				description:'',
				fontCount:0,
				imageNumber:0,	//记录已上传的照片数量
				imageArr:[],		// 保存上传照片的路径，
				imageAddr:'',					//【注意发布接口是String，详情展示再转换为数组】
				address_placeholder:'请输入详细地址',
				address:'',
				contact_placeholder:'请输入联系人姓名',
				contact:'',
				mobilePhone_placeholder:'请输入联系人手机号',
				mobilePhone:'',
				publishKind:'供应',		//种类默认是供应
				
				parkId:'',
				companyId:''
			}
		},
		methods: {
			setData(){
				// this.$data.title_placeholder = 'aaa'	
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			deleteImg(index){
				this.imageArr.splice(index,1)
				this.imageNumber--
			},
			confirm(){
				console.log("发布")
				let _this = this
				let decimalReg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;//var decimalReg=/^[-\+]?\d{0,8}\.{0,1}(\d{1,2})?$/;
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/   //11位手机号码正则
				// console.log(_this.price)
				if(_this.title==="" || _this.price==="" || _this.business==="" || _this.address==="" ||
					_this.contact==="" || _this.mobilePhone==="" || _this.description == ""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请填写完整！'
					})
					return false
				}
				// if(_this.title.length > 80){
				// 	uni.showToast({
				// 	    icon: 'none',
				// 		position: 'bottom',
				// 	    title: '标题不能超过80个字符'
				// 	})
				// 	return false
				// }
				// if(_this.address > 100){
				// 	uni.showToast({
				// 	    icon: 'none',
				// 		position: 'bottom',
				// 	    title: '地址不能超过100个字符'
				// 	})
				// 	return false
				// }
				// if(_this.contact > 20){
				// 	uni.showToast({
				// 	    icon: 'none',
				// 		position: 'bottom',
				// 	    title: '联系人不能超过20个字符'
				// 	})
				// 	return false
				// }
				if(!reg_tel.test(_this.mobilePhone)){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请正确填写您的手机号'
					})
					return false
				}
				if(!decimalReg.test(_this.price) || _this.price > 999999.99){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入有效价格'
					})
					return false
				}
				
				uni.request({
				    url: 'http://39.105.57.219:80/ztd/InfoRelease/Inforelease', //仅为示例，并非真实接口地址。
					method: 'POST',
				    data: {
				        'parkId':_this.parkId,
				        'companyId':_this.companyId,
						'memberId':_this.companyId,
						'title':_this.$data.title,
						'price':_this.price,
						'business':_this.business,
						'address':_this.address,
						'contacts':_this.contact,
						'tel':_this.mobilePhone,
						'pic':_this.imageAddr,
						'content':_this.description,
						'type':_this.publishKind == '供应' ? '1' : '2'
				    },
				    header: {
						'content-type': 'application/x-www-form-urlencoded'
				    },
				    success: (res) => {
				        console.log(res.statusCode)
				        if(res.statusCode===200){
							this.$store.flag = 1
				        	uni.showToast({
				        	    icon:'success',
				        		position:'bottom',
								duration: 500,
				        	    title: '发布成功!'
				        	})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},500)
				        }else{
				        	uni.showToast({
				        	    icon:'none',
				        		position:'bottom',
				        	    title: '发布失败'
				        	})
				        }
				    },
					fail: (err) => {
						console.log(err)
					}
				});
			},
			// 统计字数
			wordStatic() {
				this.fontCount = this.description.length
			},
			//选择照片并上传
			chooseImage(){
				uni.chooseImage({
					count:9-this.imageNumber,
					success:res=>{						
						let token = 1 // uni.getStorageSync('token');
						let length = res.tempFilePaths.length
						let _this = this
						
						for(let i=0;i<length;i++){
							uni.uploadFile({
								url:'http://39.105.57.219:80/ztd/uploadInfoImage',
								filePath: res.tempFilePaths[i],
								name: 'multipartFile',  //后台接收字段名
								formData:{
									"token":token
								},
								success: (res) => {
									// console.log('response data')
									let data = JSON.parse(res.data)
									// console.log(data.statusCode)
									console.log(data.imagePath)
									if(data.statusCode==2000){
										_this.imageArr.push(data.imagePath)
										_this.imageNumber = _this.imageArr.length
										_this.imageAddr = _this.imageArr.toString()
										console.log(_this.imageAddr)
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
			radioChange(evt){
				this.publishKind=evt.detail.value
				console.log(this.publishKind)
			},
			titleFocus(){
				this.title_placeholder=''
			},
			titleBlue(){
				this.title_placeholder='请输入标题'
			},
			priceFocus(){
				this.price_placeholder=''
			},
			priceBlue(){
				this.price_placeholder='请输入价格，0为面议'
			},
			businessFocus(){
				this.business_placeholder=''
			},
			businessBlue(){
				this.business_placeholder='输入关键词，多个关键词请用英文“,”隔开'
			},
			descriptionFocus(){
				this.description_placeholder=''
			},
			descriptionBlue(){
				this.description_placeholder='请输入描述内容'
			},
			addressFocus(){
				this.address_placeholder=''
			},
			addressBlue(){
				this.address_placeholder='请输入详细地址'
			},
			contactFocus(){
				this.contact_placeholder=''
			},
			contactBlue(){
				this.contact_placeholder='请输入联系人姓名'
			},
			mobilePhoneFocus(){
				this.mobilePhone_placeholder=''
			},
			mobilePhoneBlue(){
				this.mobilePhone_placeholder='请输入联系人手机号'
			},
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
	.uniNavBar_right text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}
	.placeholderStyle{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	.content{
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 50rpx;
	}
	.title{
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.title text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.title input{
		margin-top: 46rpx;
	}
	.price{
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.price text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.price input{
		margin-top: 46rpx;
	}
	.business{
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.business text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.business input{
		margin-top: 46rpx;
	}
	.description{
		/* height: 352rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.description #tip{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.description textarea{
		margin-top: 46rpx;
	}
	.description .count{
		display: flex;
		flex-direction: row-reverse;
	}
	.description .count text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	/* .uploadImg{
		margin-top: 50rpx;
	}
	.uploadImg .tips{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
	} */
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
	.tips #tip1{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		/* line-height: 100rpx; */
	}
	.tips #tip2{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		/* line-height: 26rpx; */
	}
	.uploadImg .upload image{
		width: 200rpx;
		height: 200rpx;
	}
	.address{
		/* height: 191rpx; */
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.address text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.address input{
		margin-top: 46rpx;
	}
	.contact{
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.contact text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.contact input{
		margin-top: 46rpx;
	}
	.mobilePhone{
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
		padding-bottom: 37rpx;
	}
	.mobilePhone text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.mobilePhone input{
		margin-top: 46rpx;
	}
	.kind{
		display: flex;
		justify-content: space-between;
		margin-top: 50rpx;
	}
	.kind text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.kind radio-group{
		display: flex;
		flex-direction: row;
	}
	.kind #item{
		margin-right: 38rpx;
	}
</style>
