<template>
	<view class="top">
		<view class="zh">账户余额</view>
		<view class="hhh">
			<view class="num">{{user.balance}}</view>
		</view>
		<view class="hhh">
			<view class="lj" @click="tx">立即提现</view>
		</view>
		<view class="hhh">
			<view class="jl" @click="jl">提现记录</view>
		</view>
	</view>
</template>
<script>
	export default {

		data() {
			return {
				user:{},
				token:""
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
			adds(){
				uni.navigateTo({
					url:"../increase/increase"
				})
			},
			tx(){
				uni.navigateTo({
					url:"../cash/cash"
				})
			},
			jl(){
				uni.navigateTo({
					url:"../withdrawal/withdrawal"
				})
			},
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
								this.user = res.data.data
							    uni.hideLoading();
						}
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.hhh{
		width: 50%;
		margin: 100rpx 25%;
		text-align: center;
	}
	.top{
		width: 90%;
		margin: 0 5%;
		text-align: center;
	}
	.zh{
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.num{
		font-size:60rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(226,2,2,1);
		line-height:70rpx;
	}
	.lj{
		width:276rpx;
		height:80rpx;
		margin-left: 30rpx;
		background:linear-gradient(83deg,rgba(32,225,252,1) 0%,rgba(5,134,254,1) 100%);
		border-radius:20rpx;
		font-size:38rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:70rpx;
	}
	.jl{
		width:276rpx;
		height:80rpx;
		margin-left: 30rpx;
		background:rgba(229,229,229,1);
		border-radius:20rpx;
		font-size:38rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
</style>
