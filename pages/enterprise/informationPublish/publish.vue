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
				 	:placeholder="title_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="title"
				 	@focus="titleFocus"
				 	@blur="titleBlue"/>
			</view>
			<view class="price">
				<text>价格（元）</text>
				<input 
					type="text" 
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
					<image src="../../../static/enterprise/publishLoad.png" @click="chooseImage"></image>
				</view>
			</view>
			<view class="address">
				<text>详细地址</text>
				<input 
					type="text" 
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
				 	:placeholder="contact_placeholder"
				 	placeholder-class="placeholderStyle"
				 	v-model.trim="contact"
				 	@focus="contactFocus"
				 	@blur="contactBlue"/>
			</view>
			<view class="mobilePhone">
				<text>移动电话</text>
				<input 
					type="text" 
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
				imageArr:[],		//保存上传照片的路径
				address_placeholder:'请输入详细地址',
				address:'',
				contact_placeholder:'请输入联系人姓名',
				contact:'',
				mobilePhone_placeholder:'请输入联系人手机号',
				mobilePhone:'',
				publishKind:'供应'		//种类默认是供应
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			confirm(){
				console.log("发布")
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
						this.imageArr=this.imageArr.concat(res.tempFilePaths) 
						// console.log(this.imageArr)
						this.imageNumber=this.imageArr.length
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
			//删除预览的图片
			deleteImg(index){
				this.imageArr.splice(index,1)
				this.imageNumber = this.imageArr.length
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
	.uploadImg{
		margin-top: 50rpx;
	}
	.uploadImg .tips{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 30rpx;
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
