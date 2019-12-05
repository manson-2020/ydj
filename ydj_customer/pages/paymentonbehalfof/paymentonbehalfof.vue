<template>
	<view class="row">
		<view class="back">
			<view class="text">
				<view class="text-name">{{ pageData.text }}</view>
				<image class="img" src="../../static/sx.png" mode="" @click="refreshCopywriting"></image>
			</view>
			<view class="col">
				<view class="link">支付宝付款链接:</view>
				<view class="website">{{ pageData.url }}</view>
				<view class="tips">提示：请将支付链接发送至付款人付款</view>
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
				pageData:"http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&"
			}
		},	
		methods: {
			copy(){
				uni.setClipboardData({
				    data: this.pageData.url,
				    success: _ => {
						console.log(_);
				    }
				});
			},
			refreshCopywriting() {
				uni.request({
					url: `${this.$api}/api/order/get_text`,
					method: "post",
					data: { token: uni.getStorageSync("token") },
					success: res => this.pageData.text = res.data.data
				})
			}
		},
		onLoad(options) {
			this.pageData = JSON.parse(options.page_data);
		}
	}
</script>

<style>
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
		width: 600rpx;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		margin-top: 40rpx;
		word-break: break-word;
	}
	.col{
		width: 95%;
		margin: 0 2.5%;
	}
	.link{
		width:200rpx;
		height:22rpx;
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:70rpx;
	}
	.back{
		width:90%;
		margin: 40rpx 5%;
		height:310rpx;
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
