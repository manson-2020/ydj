<template>
	 <view class="tyu">
		 <image class="img" src="../../static/bj.png" mode="">
			 <view class="status_bar">
			      <!-- 这里是状态栏 -->
			 </view>
			 <view class="yh">
				 <view class="text">我的</view>
				 <image v-if="user.avatar === null" class="tx" src="../../static/tx.png" mode=""></image>
				 <image v-else class="tx" :src="user.avatar" mode=""></image>
				 <view class="name">{{user.username}}</view>
			 </view>
		 </image>
		<view class="body" >
			<view class="flxy" @click="yh"> 
				<view class="ling"><image class="images" src="../../static/gr.png" mode=""></image></view>
				<view class="tet">个人信息</view>
				<view>〉</view>
			</view>
			<view class="flxy" @click="gy">
				<view class="ling"><image class="images" src="../../static/gy.png" mode=""></image></view>
				<view class="tet">关于我们</view>
				<view>〉</view>
			</view>
			<view class="flxy" @click="out">
				<view class="ling"><image class="images" src="../../static/tc.png" mode=""></image></view>
				<view class="tet">退出登录</view>
				<view>〉</view>
			</view>
		</view>
	 </view>
</template>

<script>
	export default {
		data() {
			return {
				id: this.$store.state.id,
				token:"",
				user:{}
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
			out(){
				uni.removeStorage({
				    key: 'token',
				    success: function (res) {
						uni.showToast({
							title:"退出成功",
							icon:"success"
						})
						uni.navigateTo({
							url:"../login/login"
						})
					}
				});
			},
			yh(){
				uni.navigateTo({
					url:"../information/information"
				})
			},
			ye(){
				uni.navigateTo({
					url:"../balance/balance"
				})
			},
			gy(){
				uni.navigateTo({
					url:"../about/about"
				})
			},
			users(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/getinfo`,
					method:"POST",
					data:{
						token: this.token
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							setTimeout(()=>{
								this.user = res.data.data
							    uni.hideLoading();
							}, 500);
						}
					}
				})
				//#endif 
				//#ifdef H5
				uni.request({
					url:"/api/user/getinfo",
					method:"POST",
					data:{
						token: this.token
					},
					success:res=>{
						uni.showLoading({
							    title: '加载中'
							});
						if(res.data.code === 200){
							setTimeout(()=>{
								this.user = res.data.data
							    uni.hideLoading();
							}, 500);	
						}	
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.tyu{
		height: 100vh;
	}
	.img{
		width: 100%;
		height: 600rpx;
		position: absolute;
	}
	.text{
		color: #FFFFFF; 
	}
  .status_bar {
      height: var(--status-bar-height);
      width: 100%;
  }
  .yh{
      position:relative;
	  top: 20rpx;
	  text-align: center;
  }
  .tx{
	  margin-top: 20rpx;
	  width: 200rpx;
	  height: 200rpx;
	  border-radius: 50%;
  }
  .name{
	  margin-top: 5rpx;
	  color: #FFFFFF;
  }
  .body{
	  position: relative;
	  top: 50rpx;
	  width:90%;
	  margin: 0 5%;
	  height:370rpx;
	  background:rgba(255,255,255,1);
	  box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
	  border-radius:20rpx;
  }
  .bodyy{
  	  position: relative;
  	  top: 70rpx;
  	  width:90%;
  	  margin: 0 5%;
  	  height:260rpx;
  	  background:rgba(255,255,255,1);
  	  box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
  	  border-radius:20rpx;
  }
  .flxy{
	  display: flex;
	  padding-top: 50rpx;
  }
  .images{
	  width: 40rpx;
	  height: 43rpx;
  }
  .ling{
     line-height: 50rpx;
	 width: 150rpx;
	 text-align: center;
  }
  .tet{
	  width: 70%;
	  font-size:32rpx;
	  font-family:Microsoft YaHei;
	  font-weight:400;
	  color:rgba(102,102,102,1);
	  line-height: 50rpx;
  }
  .login{
  	position: relative;
  	text-align: center;
  	color: white;
  	font-size: 45rpx;
  	line-height: 100rpx;
  }

</style>
