<template>
	<view class="row">
		<view class="back">
			<view class="text">
				<view class="text-name">此处为后台配置文案内容，此处为后台配置文案内容哈哈</view>
				<view><image class="img" src="../../static/sx.png" mode=""></image></view>
			</view>
			<view class="col">
				<view class="link">支付宝付款二维码:</view>
				<view class="website">
					<image class="rwm" src="../../static/ewm.png" mode=""></image>
				</view>
				<view class="tips">提示：请将支付二维码发送至付款人付款</view>
			</view>
			<view class="top" @click="copy">
				<image class="image" src="../../static/login.png" mode=""><view class="login">复制链接并提交</view></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			copy(){
				uni.setClipboardData({
				    data: this.website,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>
	.rwm{
		width: 60%;
		margin:  0 20%;
		height: 300rpx;
	}
	.top{
		width: 90%;
		margin: 0 5%;
		margin-top: 200rpx;
	}
	.image{
		height: 100rpx;
		position: absolute;
		width: 80%;
	}
	.login{
		position: relative;
		text-align: center;
		color: white;
		font-size: 45rpx;
		line-height: 100rpx;
	}
	.tips{
		height:19rpx;
		font-size:18rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:100rpx;
	}
	.website{
		width: 80%;
		margin: 0 10%;
		height: 300rpx;
	}
	.col{
		width: 95%;
		margin: 0 2.5%;
	}
	.link{
		width:200rpx;
		height:80rpx;
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:70rpx;
	}
	.back{
		width:90%;
		margin: 40rpx 5%;
		height:600rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
	}
	.text{
		width:95%;
		margin: 0 2.5%;
		display: flex
	}
	.text-name{
		width: 95%;
		height:22px;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		padding-top: 40rpx;
	}
	.img{
		width: 30rpx;
		height: 30rpx;
		padding-top: 40rpx;
	}
</style>
