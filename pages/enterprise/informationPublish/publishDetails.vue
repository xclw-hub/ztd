<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image id="left" src="../../../static/enterprise/return.png"></image>
				</view>
				<view id="center">
					<text>{{publish.kind}}</text>
				</view>
				<view id="right" @click="isDelete">
					<image id="right" src="../../../static/enterprise/handle.png"></image>
				</view>	
			</view>
			
		</view>
		<view class="body">
			<view class="content">
				<view class="title">
					<text>{{publish.title}}</text>
				</view>
				<view class="time">
					<view class="tips">
						<text>发布日期</text>
					</view>
					<view class="detail">
						<text id="time">{{publish.time}}</text>
					</view>
				</view>
				
				<view class="price">
					<view class="tips">
						<text>价格</text>
					</view>
					<view class="detail">
						<text id="price">￥{{publish.price}}</text>
					</view>
				</view>
				
				<view class="bussiness">
					<view class="tips">
						<text>主营业务</text>
					</view>
					<view class="detail">
						<text id="bussiness">{{publish.bussiness}}</text>
					</view>
				</view>
				
				<view class="address">
					<view class="tips">
						<text>地址</text>
					</view>
					<view class="detail">
						<text id="address">{{publish.address}}</text>
					</view>
				</view>
				
				<view class="contact">
					<view class="tips">
						<text>联系人</text>
					</view>
					<view class="detail">
						<text id="contact">{{publish.contact}}</text>
					</view>
				</view>
				
				<view class="mobilePhone">
					<view class="tips">
						<text>联系电话</text>
					</view>
					<view class="detail">
						<text id="mobilePhone">{{publish.mobilePhone}}</text>
					</view>
				</view>
			</view>
			
			<view class="description">
				<view id="descriptionTitle">
					<text>详细描述</text>
				</view>
				<view id="descriptionDetail">
					<text>{{publish.description}}</text>
				</view>
				<view class="imgShow">
					<image v-for="(item,index) in publish.imageArr" :src="item" :key="index" @click="preview(item)"></image>
				</view>
			</view>
		</view>
		<view class="dropOption" v-if="dropOptionShow" @click="doDelete">
			<text>删除</text>
		</view>
		<!-- 删除对话框 -->
		<uni-popup id="deletePopupDialog" ref="deletePopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="确定要删除这条信息吗？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="deleteConfirm" 
			@close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupDialog
		},
		onLoad(option) {
			this.pkid = JSON.parse(option.pkid)
			console.log(this.pkid)
			this.setData();
		},
		data() {
			return {     
				dropOptionShow:false,		//是否显示下拉框
				pkid:'',
				publish:{}
// 				publish:{
// 					kind:'供应',
// 					title:'K26A13小型本安型矿用红外热像仪 高清红外测温仪',
// 					time:'2020-08-26 12:36',
// 					price:'18800.00',
// 					bussiness:'红外监测仪代理商K26A13在线式红外热成像测温仪',
// 					address:'西辛南区甲36号楼1层2单元底商',
// 					contact:'孙光洪',
// 					mobilePhone:'13966763179',
// 					imageArr:['../../../static/login/bg.jpg'],		//保存上传照片的路径
// 					description:`K26A13在线式红外热成像测温仪采用17μm非制冷红外焦平面探测器和信号处理电路，嵌入先进的图像处理算法，具备体积小、功耗低、启动快速、成像质量优异、测温精准等特点。

// 功能特性：
// 1、具备较强的穿透烟雾性能，可在较宽的环境温度范围使用；
// 2、采用高帧频设计，可以观测快速移动的目标；
// 3、采用自研测温校正算法，实现精确温度测量；
// 4、输出全码流无损16Bit温度数据，提供客户端软件及SDK开发包。
// `
// 				}
			}
		},
		methods: {
			setData(){
				let _this = this
				uni.request({
				    url: 'http://39.105.57.219:80/ztd/InfoRelease/detail', //仅为示例，并非真实接口地址。
					method: 'POST',
				    data: {
						'pkid':_this.pkid
				    },
				    header: {
						'content-type': 'application/x-www-form-urlencoded'
				    },
				    success: (res) => {
				        console.log(res.data.data)
						let data = res.data.data
						// kind:'供应',
						// title:'K26A13小型本安型矿用红外热像仪 高清红外测温仪',
						// time:'2020-08-26 12:36',
						// price:'18800.00',
						// bussiness:'红外监测仪代理商K26A13在线式红外热成像测温仪',
						// address:'西辛南区甲36号楼1层2单元底商',
						// contact:'孙光洪',
						// mobilePhone:'13966763179',
						// imageArr:['../../../static/login/bg.jpg'],		//保存上传照片的路径
						// description:
						
						let detail = {}
						detail.kind = data.type == '2' ? '需求' : '供应'		// type：供应是1 需求是2
						detail.title = data.title
						detail.time = data.time
						detail.price = data.price
						detail.bussiness = data.business
						detail.address = data.address
						detail.contact = data.contacts
						detail.mobilePhone = data.tel
						// console.log(data.pic)
						if(data.pic != null){
							let arr = data.pic.split(',')
							detail.imageArr = arr
						}
						detail.description = data.content
						this.publish = detail
						
						console.log(detail.imageArr)
				    }
				})
			},
			test(){
				var img = "http://xxx/timg.jpg";
				"http://yq.qyxqk.comblob:http://localhost:8080/d5c5e6e5-889a-408b-ba6b-4c47b4ef1459"
				var image = new Image();
				image.src = img;
				image.onload = function() {
				    //文件的Base64字符串
				    var base64 = getBase64Image(image);
				    console.log(base64);
				}
			},
			getBase64Image(img) {
			    var canvas = document.createElement("canvas");
			    canvas.width = img.width;
			    canvas.height = img.height;
			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(img, 0, 0, img.width, img.height);
			    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
			    var dataURL = canvas.toDataURL("image/" + ext);
			    return dataURL;
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			isDelete(){
				this.dropOptionShow=!this.dropOptionShow
			},
			doDelete(){
				this.$refs.deletePopupDialog.open()
				this.dropOptionShow=false
			},
			deleteConfirm(done) {
				console.log('是');
				// 需要执行 done 才能关闭对话框
				let _this = this
				_this.$request({
				    url:"/InfoRelease/delSupplyAndDemand",
				    data: {
				        'pkid':_this.pkid
				    }
				    }).then(res=>{
					// console.log(res)
				 //    console.log(res[1].data)
				    if(res[1].statusCode===200){
						this.$store.flag = 1
				        uni.showToast({
				            icon:'success',
				        	position:'bottom',
				        	duration: 500,
				            title: '删除成功'
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
				            title: '删除失败'
				        })
				    }
				    }).catch(err=>{
				    console.log(err)
				    })
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			deleteClose(done) {
				console.log('否');
				done()
			},
			// 预览图片
			preview(index) {
				uni.previewImage({
					current: index, //当前点击预览的图片
					urls: this.publish.imageArr //预览图片的链接
				})
			},
		}
	}
</script>

<style scoped>
	.nav{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		/* z-index: -10; */
		background-color: #2D6BDD;
		/* padding-top: 36rpx; */
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	
	.nav .head{
		height: 88rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
/* 	.nav{
		height: 90rpx;
		padding-top: 36rpx;
		padding-bottom: 46rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		background-color: #2D6BDD;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	} */
	#left, #center, #right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.nav #left image{
		width: 36rpx;
		height: 36rpx;
	}
	.nav #center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.nav #right image{
		width: 38rpx;
		height: 8rpx;
	}
	.body{
		width: 100%;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		/* position: relative; */
		/* top:88rpx; */
		/* top:-48rpx; */
		padding-top: 48rpx;
		position: absolute;
		/* z-index: 20; */
		overflow: scroll;
		/* top: 140rpx; */
		top: 160rpx;
		bottom: 0;
	}
	.body .content{
		border-bottom: 20rpx solid #ECECEC;
		padding-bottom: 46rpx;
	}
	.content .title{
		border-bottom: 1rpx solid #E9E9E9;
		padding-bottom: 32rpx;
		margin-left: 39rpx;
		margin-right: 39rpx;
	}
	.title text{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.content .tips{
		width: 160rpx;
		display: inline-flex;
		align-items: center;
	}
	.content .tips text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
	}
	.content .detail{
		width: 490rpx;
		display: inline-flex;
	}
	.time, .price, .bussiness, .address, .contact, .mobilePhone{
		margin-left: 39rpx;
		margin-right: 39rpx;
		padding-top: 36rpx;
	}
	#time, #bussiness, #address, #contact, #mobilePhone{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	#price{
		font-size: 34rpx;
		font-family: Arial;
		font-weight: bold;
		color: #F02828;
	}
	.description #descriptionTitle{
		margin-top: 31rpx;
		padding-left: 26rpx;
		border-left: 10rpx solid #2D6BDD;
	}
	.description #descriptionTitle text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.description #descriptionDetail{
		margin-top: 36rpx;
		margin-left: 36rpx;
		margin-right: 36rpx;
	}
	.description #descriptionDetail text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 50rpx;
	}
	.imgShow{
		margin-top: 17rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.imgShow image{
		width: 572rpx;
		height: 416rpx;
	}
	.dropOption{
		width: 160rpx;
		height: 70rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(122, 122, 122, 0.32);
		border-radius: 10rpx;
		position:absolute;
		top: 110rpx;
		right: 40rpx;
		text-align: center;
	}
	.dropOption text{
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #555555;
		line-height: 66rpx;
	}
</style>
