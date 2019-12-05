<template>
	<view  class="home">
		<view class="status_bar">
				       <!-- 这里是状态栏 -->
		</view>
		<view class="name">欢迎来到驿到家</view>
		<view class="flxy">
			<view class="lll">
				<view class="signin" @click="signin">登录</view>
				<image  class="sliver" src="../../static/sliver.png" mode=""></image>
			</view>
		</view>
		<view class="input">
			<view class="input1">
				<view style="font-size: 23rpx;width: 22%;line-height: 50rpx;">登录手机号:</view>
				<input :adjust-position="adjustposition" placeholder-class="iuyt" class="input-box"  v-model="tel" :placeholder="placeholder"></input-box>
				<view class="yyyy" @click="codede(tel)">发送验证码</view>
			</view>
			<view class="input1">
				<view style="font-size: 23rpx;width: 22%;line-height: 50rpx;">输入验证码:</view>
				<input :adjust-position="adjustposition"  placeholder-class="iuyt"  v-model="code"  :placeholder="codee"></input-box>
			</view>
		</view>
		<view class="top" @click="login">
			<image class="image" src="../../static/login.png" mode=""><view class="login">登录</view></image>
		</view>
		<view class="agreement">
			登录注册即代表你同意<text class="text">《用户协议》</text>和<text class="text">《隐私政策》</text>
		</view>
	</view>
</template>
<script>
	import inputBox from '../../components/input-box/input-box.vue';
	export default {
		components: {inputBox},
		data() {
			return {
				index: 0,
				placeholder:"请输入手机号",
				tel:"15196614755",
				code:"999713",
				codee:"请输入验证码",
				role:2,
				adjustposition:false,
				focus:true
		
			}
		},
		onLoad() {
		},
		methods: {
			signin(){
				this.index = 0
			},
			register(){
				this.index = 1
			},
			login(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/login/index`,
					method:'POST',
					data:{
						mobile:this.tel,
						code: this.code,
						role: this.role
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title: res.data.msg,
								icon:"success"
							})
							uni.setStorage({
							    key: "token",
							    data: res.data.data.token,
							    success: function () {
							    }
							});
							uni.switchTab({
								url:"../index/index"
							})
						}
						if(res.data.code === 400){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							this.codee = ""
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url:`/api/login/index`,
					method:'POST',
					data:{
						mobile:this.tel,
						code: this.code,
						role: this.role
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title: res.data.msg,
								icon:"success"
							})
							uni.setStorage({
							    key: "token",
							    data: res.data.data.token,
							    success: function () {
							    }
							});
							uni.switchTab({
								url:"../index/index"
							})
						}
						if(res.data.code === 400){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							this.codee = ""
						}
					},
				
				})
				//#endif	
			},
			codede(tel){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/login/sendsms`,
					method:'POST',
					data:{
						mobile:this.tel,
						},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title: res.data.msg.slice(11,17),
								icon:"success"
							})
							console.log(res.data.msg.slice(11,17))
						}
						if(res.data.code === 400){
							uni.showToast({
								title: res.data.msg,
								icon:"none"
							})
							
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url:`/api/login/sendsms`,
					method:'POST',
					data:{
						mobile:this.tel,
						},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title: res.data.msg.slice(11,17),
								icon:"success"
							})
							console.log(res.data.msg.slice(11,17))
						}
						if(res.data.code === 400){
							uni.showToast({
								title: res.data.msg,
								icon:"none"
							})
						}
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.iuyt{
		line-height: 24rpx;
		font-size: 24rpx;
	}
	.status_bar {
		height: var(--status-bar-height);	      
		width: 100%;	  
	}
	.input-box{
		width: 55%
	}
	.yyyy{
		height: 20rpx;
		font-size: 24rpx;
		width: 23%;
		line-height: 60rpx;
	}
	.home{
		width: 80%;
		margin: 150rpx 10%;

	}
	.name{
		color: #000000;
		width: 100dp;
		font-weight: 700;
		font-size: 56rpx;
	}
	.flxy{
		display: flex;
		width: 350rpx;
		font-size: 35rpx;
		margin-top:  50rpx;
		margin-bottom: 20rpx;
		font-weight: 560;
	}
	.signin{
		text-align: center;
		width: 200rpx;
	}
	.register{
		width: 200rpx;
		text-align: center;
	}
	.input{
		margin-top: 150rpx;
	}
	.input1{
		display: flex;
		height: 100rpx;
	}
	.input2{
		height: 15rpx;
	}
	.top{
		margin-top: 150rpx;
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
	.lll{
		width: 200rpx;
	}
	.sliver{
		width: 200rpx;
		height: 10rpx;
	}
	.iii{
		margin-left: 100rpx;
	}
	.agreement{
		color: #999999;
		font-size: 24rpx;
		line-height: 140rpx;
	}
	.text{
		color: #007AFF;
	}
</style>
