<template>
	<view class="body">
		<image v-if="user.avatar === null" @click="upload" class="image" src="../../static/tx.png" mode="">
		<image v-else @click="upload" class="image" :src="user.avatar" mode="">
			<view class="cake">
				<view class="tx">上传头像</view>
				<view class="input">
					<view style="display: flex;margin-top: 30rpx;">
						<view style="font-size: 30rpx;line-height: 40rpx;">昵称：</view>
						<input style="color: #666666;" v-model="user.nickname" type="text" placeholder="请输入昵称">
					</view>
					<view style="width: 100%;height: 1rpx;background: #C8C7CC;margin-top: 10rpx;"></view>
					<view style="display: flex;margin-top: 30rpx;">
						<view style="font-size: 30rpx;line-height: 40rpx;">姓名：</view>
						<input style="color: #666666;" :adjust-position="adjustposition" v-model="user.username" type="text" placeholder="请输入姓名">
					</view>
					<view style="width: 100%;height: 1rpx;background: #C8C7CC;margin-top: 10rpx;"></view>
					<view style="display: flex;margin-top: 30rpx;">
						<view style="font-size: 30rpx;line-height: 40rpx;">联系电话：</view>
						<input style="color: #666666;" :adjust-position="adjustposition" v-model="user.mobile" type="text" placeholder="请输入联系电话">
					</view>
					<view style="width: 100%;height: 1rpx;background: #C8C7CC;margin-top: 10rpx;"></view>
				</view>
			</view>
		</image>
		<view class="top" @click="contract">
			<image @click="contract" class="imag" src="../../static/login.png" mode=""><view class="login">保&nbsp&nbsp&nbsp存</view></image>
		</view>
	</view>
</template>
<script>
	import inputBox from '../../components/input-box/input-box.vue';
	export default {
		components: {inputBox},
		data() {
			return {
				name:"",
				username:"",
				tel:"",
				token:"",
				user:{},
				id:0,
				adjustposition:false
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
				uni.getStorage({
					key:"img",
					success:res=>{
						this.id = res.data
						console.log(res)
					}
			})
			this.users()
		},
		onShow(){
			this.users()
		},
		methods: {
			upload(){
				//#ifdef APP-PLUS
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: `${this.$api}/files/image/upload`, 
				            filePath: tempFilePaths[0],
				            name: 'image',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
								let data = uploadFileRes.data
								let da = JSON.parse(data)
								console.log(da)
								uni.setStorage({
									key:"img",
									data: da.data.id,
									success:res=>{
										console.log(res)
									}
								})
								this.id = da.data.id
				            }
				        });
				    }
				});
				//#endif
				//#ifdef H5
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths)
				        uni.uploadFile({
				            url: `/files/image/upload`, 
				            filePath: tempFilePaths[0],
				            name: 'image',
				            success: (uploadFileRes) => {
								if(uploadFileRes.code === 200){
									uni.setStorage({
										key:"img",
										data:uploadFileRes.data.data.id,
										success:res=>{
											console.log(res)
										}
									})
									this.id = uploadFileRes.data.data.id
									console.log(this.id)
								}
				                console.log(uploadFileRes);
				            }
				        });
					}
				});
				//#endif
			},
			users(){
				//#ifdef H5
				uni.request({
					url:"/api/user/getinfo",
					method:"POST",
					data:{
						token:this.token
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
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/getinfo`,
					method:"POST",
					data:{
						token:this.token
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
			},
			contract(){
				//#ifdef APP-PLUS
				console.log(this.id)
				uni.request({
					url:`${this.$api}/api/user/upinfo`,
					method:"POST",
					data:{
						token:this.token,
						username:this.user.username,
						nickname:this.user.nickname,
						mobile:this.user.mobile,
						img:this.id
					},
					success:res=>{
						if(res.data.code === 200){
							uni.request({
								url:`${this.$api}/api/user/getinfo`,
								method:"POST",
								data:{
									token:this.token
								},
								success:res=>{
									if(res.data.code === 200){
										this.user = res.data.data
									}
								}
							})
							uni.showToast({
								title:res.data.msg,
								icon:"success"
							})
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url:"/api/user/upinfo",
					method:"POST",
					data:{
						token:this.token,
						username:this.user.username,
						nickname:this.user.nickname,
						mobile:this.user.mobile,
						img:this.id
					},
					success:res=>{
						if(res.data.code === 200){
							uni.request({
								url:"/api/user/getinfo",
								method:"POST",
								data:{
									token:this.token
								},
								success:res=>{
									if(res.data.code === 200){
										this.user = res.data.data
									}
								}
							})
							uni.showToast({
								title:res.data.msg,
								icon:"success"
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
	.body{
		margin-top: 40rpx;
	}
	.cake{
		position: relative;
		width:90%;
		margin: 0 5%;
		height:500rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
		top: 80rpx;
	}
	.image{
		position: absolute;
		width: 200rpx;
		height: 200rpx;
		z-index: 999;
		border-radius: 50%;
		margin-left: 50rpx;
	}
	.tx{
		margin-left: 230rpx;
		font-size:30rpx;
		height: 100rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(188,188,190,1);
		line-height: 100rpx;
	}
	.input{
		width: 90%;
		margin: 30rpx 5%;
	}
	.input1{
		height: 125rpx;
	}
	.input2{
		height: 125rpx;
	}
	.input3{
		height: 125rpx;
	}
	.top{
		width: 80%;
		margin: 0 10%;
		margin-top: 200rpx;
	}
	.imag{
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
</style>
