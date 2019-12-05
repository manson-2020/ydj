<template>
	 <view class="tyu">
		<image class="img" src="../../static/bj.png" mode="">
			<view class="status_bar">
			      <!-- 这里是状态栏 -->
			</view>
			<view class="yh">
				<view class="text">我的</view>
				<image class="tx" @click="img" :src="user.avatar" mode=""></image>
				<view class="name">{{user.username}}</view>
			</view>
		</image>
		<view class="body">
			<view class="flxy" @click="ye">
				<view class="ling"><image class="images" src="../../static/yueyue.png" mode=""></image></view>
				<view class="tet">我的余额</view>
				<view>〉</view>
			</view>
			<view class="flxy" @click="withdrawal">
				<view class="ling"><image class="images" src="../../static/txtx.png" mode=""></image></view>
				<view class="tet">提现申请</view>
				<view>〉</view>
			</view>
			<view class="flxy" @click="poststation">
				<view class="ling"><image class="images" src="../../static/yz.png" mode=""></image></view>
				<view class="tet">驿站基本信息</view>
				<view>〉</view>
			</view>
		</view>
		<view class="bodyy">
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
				token:"",
				user:{},
				id:0
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
			let _this = this
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
			withdrawal(){
				uni.navigateTo({
					url:"../cash/cash"
				})
			},
			poststation(){
				uni.navigateTo({
					url:"../poststation/poststation"
				})
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
								this.contract()
				            }
				        });
				    }
				});
				//#endif
			},
			contract(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/upStation`,
					method:"POST",
					data:{
						token:this.token,
						img:this.id
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:res.data.msg,
								icon:"success"
							})
							this.users()
						}
					}
				})
				//#endif
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
						if(res.data.code === 200){
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
						if(res.data.code === 200){
							this.user = res.data.data
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
