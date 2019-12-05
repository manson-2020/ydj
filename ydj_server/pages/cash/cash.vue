<template>
	<view class="back">
		<view class="ye">
			<view>账户余额：</view>
			<view class="moyue">{{user.balance}}</view>
		</view>
		<view class="input">
			<view class="sq">申请提现：</view>
			<input class="ttt" style="text-align: center;" placeholder="请输入金额" type="text" value=""	v-model="num" />
			<view class="yuan">(元)</view>
		</view>
		<view class="wx">微信收款二维码：</view>
		<view class="img" @click="img">
			<image class="image" src="../../static/ewm.png" mode=""></image>
		</view>
		<view class="lan" @click="tj">提交申请</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{},
				token:"",
				num: ""
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
			this.users()
		},
		onShow(){
			this.users()
		},
		methods: {
			users(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/station`,
					method:"POST",
					data:{
						token: this.token
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();	
							this.user = res.data.data
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url:`/api/user/station`,
					method:"POST",
					data:{
						token: this.token
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();
							this.user = res.data.data
						}
					}
				})
				//#endif
			},
			img(){
				//#ifdef APP-PLUS
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: `${this.$api}/files/image/upload`, //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'image',
				            success: (uploadFileRes) => {
								let data = uploadFileRes.data
								let da = JSON.parse(data)
								this.id = da.data.id
				            }
				        });
				    }
				});
				//#endif
			},
			tj(){
				//#ifdef APP-PLUS
				if(Number(this.num) !== 0){
					if(Number(this.num) < 0){
						uni.showToast({
							title:"请输入金额不能小于0",
							icon:"none"
						})
					}
					uni.request({
						url:`${this.$api}/api/user/cashout`,
						method:"POST",
						data:{
							token: this.token,
							money: Number(this.num),
							img: this.id
						},
						success:res=>{
							if(res.data.code === 200){
								uni.showToast({
									title:res.data.msg,
									icon:"success"
								})
								this.num = ""
								this.id = ""
								uni.request({
									url:`${this.$api}/api/user/station`,
									method:"POST",
									data:{
										token: this.token
									},
									success:res=>{
										if(res.data.code === 200){
											this.user = res.data.data
										}
									}
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:"请输入金额",
						icon:"none"
					})
				}
				//#endif
			},
			zf(){
				//#ifdef APP-PLUS
				uni.getProvider({
				    service: 'payment',
				    success: function (res) {
						if(res.provider[1] === "wxpay"){
							uni.requestPayment({
							    provider: 'wxpay',
							    orderInfo: 'orderInfo', //微信、支付宝订单数据
							    success: function (res) {
							        console.log('success:' + JSON.stringify(res));
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
						}
				    }
				});
				//#endif
			}
		}
	}
</script>

<style>
	.lan{
		margin-top: 300rpx;
		width:276rpx;
		height:80rpx;
		background:linear-gradient(83deg,rgba(32,225,252,1) 0%,rgba(5,134,254,1) 100%);
		border-radius:20rpx;
		font-size:38rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:70rpx;
		text-align:center;
		margin-left: 160rpx;
	}
	.wx{
		width: 100%;
		font-size:34rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.moyue{
		font-size:60rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(226,2,2,1);
		line-height:70rpx;
		padding-left: 40rpx;
	}
	.sq{
		width: 35%;
		font-size:34rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.yuan{
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.ye{
		display: flex;
		font-size:34rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.back{
		width: 80%;
		margin: 0 10%;
		margin-top: 40rpx;
	}
	.ttt{
		border-bottom: rgba(239,239,239,1) solid 1rpx ;
	}
	.input{
		margin: 40rpx 0;
		display: flex;
	}
	.img{
		width: 100%;
		text-align: center;
		margin-top: 40rpx;
	}
	.image{
		width: 300rpx;
		height: 300rpx;
	}
</style>
