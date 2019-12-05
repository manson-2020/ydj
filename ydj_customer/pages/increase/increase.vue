<template>
	<view class="back">
		<view class="status_bar">
		       <!-- 这里是状态栏 -->
		</view>
	    <view class="top">
	    	<view class="iii" @click="out">
	    		<image class="img" src="../../static/xl.png" mode=""></image>
	    	</view>
	    	<view class="oder">添加收货地址</view>
	    </view>
		<view class="cark">
			<view class="row">
				<view class="address">添加收货地址</view>
				<view class="input">
					<view class="input1"><input-box leftText="姓名：" v-model="username" placeholder="请输入姓名"></input-box></view>
					<view class="input1"><input-box leftText="联系电话：" v-model="tel" placeholder="请输入手机号码"></input-box></view>
					<view class="input2"><input-box leftText="详细地址：" v-model="address" placeholder="XX小区XX栋XX单元XX楼XX号"></input-box></view>
				</view>
			</view>
		</view>
		<view class="name">友情提示：仅提供驿站所在小区范围内送件上门</view>
		<view class="topp" @click="qd">
			<image class="image" src="../../static/login.png" mode=""><view class="login">确&nbsp&nbsp&nbsp定</view></image>
		</view>
	</view>	
</template>
<script>
	import inputBox from '../../components/input-box/input-box.vue';
	export default {
		components: {inputBox},	
		data() {
			return {
				username:"",
				tel:"",
				address:"",
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
		},
		methods: {
			out(){
				uni.navigateBack(-1)
			},
			adds(){
				uni.navigateTo({
					url:"../increase/increase"
				})
			},
			qd(){
				//#ifdef H5
				uni.request({
					url:"/api/address/add",
					method:"POST",
					data:{
						username:this.username,
						usermobile:this.tel,
						address:this.address,
						status:0,
						token: this.token
					},success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:"添加成功",
								icon:"success"
							})
							uni.navigateBack(-1)
						}
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/address/add`,
					method:"POST",
					data:{
						username:this.username,
						usermobile:this.tel,
						address:this.address,
						status:0,
						token: this.token
						
					},success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:"添加成功",
								icon:"success"
							})
							uni.navigateBack(-1)
						}
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.topp{
		width: 80%;
		margin: 300rpx 10%;
		margin-top: 150rpx;
	}
	.image{
		height: 100rpx;
		position: absolute;
		width: 80%;
	}
	.login{
		width: 100%;
		position: relative;
		text-align: center;
		color: white;
		font-size: 45rpx;
		line-height: 100rpx;
	}
	.name{
		width: 82.5%;
		margin: 0 8.25%;
		height:60rpx;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(232,1,1,1);
		line-height:60rpx;
	}
	.input{
		margin-top: 10rpx;
	}
	.input1{
		height: 100rpx;
	}
	.input2{
		height: 40rpx;
	}
	.row{
		width: 90%;
		margin: 0 5%;
	}
	.address{
		height:70rpx;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
	}
	.cark{
		width:90%;
		margin: 60rpx 5%;
		height:400rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
	}
	.back{
		width:100%;		
		height:500rpx;		
		background:linear-gradient(45deg,rgba(32,225,252,1) 0%,rgba(116,35,212,1) 100%);		    
		border-bottom-right-radius:50%;		    
		border-bottom-left-radius:50%;	
	}	  
	.status_bar {	      
		height: var(--status-bar-height);	      
		width: 100%;	  
	}	  
	.top{	  		  
		width: 100%;	  		  
		display: flex;	  		  
		margin-top: 20rpx;	  
	}	  
	.img{
		width: 20rpx;	  	
		height: 40rpx;	  
	}	  
	.iii{	  	
		width: 10%;
		text-align: center;
	}	 
	.oder{	  	 
		width: 80%;	  	 
		color: #FFFFFF;	  	 
		text-align: center;	  	  
		line-height: 40rpx;	  
	}
</style>
