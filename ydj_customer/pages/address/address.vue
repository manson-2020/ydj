<template>
	<view>
		<view class="back">
			<view class="status_bar">
				       <!-- 这里是状态栏 -->
			</view>
			<view class="top">
				<view class="iii" @click="out">
					<image class="img" src="../../static/xl.png" mode=""></image>
				</view>
				<view class="oder">收货地址管理</view>
				<view class="iii" @click="adds"><image class="imgg" src="../../static/jia.png" mode=""></image></view>
			</view>
			<view v-for="(item,index) in list" :key="index">
				<view class="cark">
					<view class="flyx">
						<view class="name">{{item.username}}</view>
						<view class="tel">{{item.usermobile}}</view>
					</view>
					<view class="add">{{item.address}}</view>
					<view class="row">
						<view class="col" v-if="item.status === 1">
							<image class="gou" src="../../static/gou.png" mode=""></image>
							<view class="default">默认地址</view>
						</view>
						<view class="col" v-if="item.status === 0">
							<image @click="genggai(item.addressId)" class="gou" src="../../static/mgou.png" mode=""></image>
							<view class="defaulte">设为默认地址 </view>
						</view>
						<view class="add">
							<view class="yq" @click="bj(item)">
								<image class="addsa" src="../../static/add.png" mode=""></image>
								<view class="adds">编辑</view>
							</view>
							<view class="eq" @click="del(item.addressId)">
								<image class="addsa" src="../../static/del.png" mode=""></image>
								<view class="adds">删除</view>
							</view>
						</view>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				token:"",
				list:[]
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
			this.setData()
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
			setData(){
				//#ifdef H5
				uni.request({
					url:"/api/address/lists",
					method:"POST",
					data:{
						token:this.token
					},
					success:res=>{
						if(res.data.code === 200){
							this.list = res.data.data
						}
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/address/lists`,
					method:"POST",
					data:{
						token:this.token
					},
					success:res=>{
						if(res.data.code === 200){
							this.list = res.data.data
						}
					}
				})
				//#endif
			},
			bj(item){
				uni.navigateTo({
					url:`../modify/modify?item=${JSON.stringify(item)}`
				})
			},
			del(id){
				//#ifdef H5
				uni.request({
					url:"/api/address/del",
					method:"POST",
					data:{
						addressId: id,
						token:this.token
					},
					success:res=>{
						if(res.data.code){
							uni.showToast({
								title:"删除成功",
								icon:"success"
							})
						}
						this.setData()
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/address/del`,
					method:"POST",
					data:{
						addressId: id,
						token:this.token
					},
					success:res=>{
						if(res.data.code){
							uni.showToast({
								title:"删除成功",
								icon:"success"
							})
						}
						this.setData()
					}
				})
				//#endif
			},
			genggai(id){
				//#ifdef H5
				uni.request({
					url:"/api/address/edit",
					method:"POST",
					data:{
						addressId:id,
						status: 1,
						token:this.token
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:res.data.msg,
								icon:"success"
							})
						}
						this.setData()
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/address/edit`,
					method:"POST",
					data:{
						addressId:id,
						status: 1,
						token:this.token
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:res.data.msg,
								icon:"success"
							})
						}
						this.setData()
					}
				})
				//#endif
			}
		},
		onShow(){
			this.setData()
		}
	}
</script>

<style>
	.defaulte{
		width: 80%;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		margin-left: 10rpx;	
	}
	.adds{
		font-size:22rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
	}
	.eq{
		display: flex;
		width: 40%;
		margin: 0 5%;
		text-align: center;
	}
	.yq{
		width: 40%;
		margin: 0 5%;
		display: flex;
		text-align: center;
	}
	.addsa{
		width: 40rpx;
		height: 40rpx;
	}
	.add{
		display: flex;
		height: 120rpx;
	}
	.row{
		display: flex;
		width: 90%;
		margin: 0 5%;
		margin-top: 20rpx;
	}
	.default{
		width: 80%;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(216,30,6,1);
		line-height:40rpx;
		margin-left: 10rpx;
	}
	.col{
		display: flex;
		width: 100%;
	}
	.gou{
		width: 40rpx;
		height: 40rpx;
	}
	.add{
		width: 90%;
		margin: 0 5%;
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);	
		line-height:60rpx;
	}
	.flyx{
		display: flex;
		width: 90%;
		margin: 0 5%;
	}
	.name{
		text-align: left;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
		width: 50%;
	}
	.tel{
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:70rpx;
		text-align: right;
		width: 50%;
	}
	.back{
		width:100%;
		height:500rpx;
		background:linear-gradient(45deg,rgba(32,225,252,1) 0%,
		rgba(116,35,212,1) 100%);border-bottom-right-radius:50%;
		border-bottom-left-radius:50%;
	}
	.status_bar{
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
	.imgg{
		width: 40rpx;
		height: 40rpx;	  
	}
	.cark{
		width: 90%;
		margin: 90rpx 5% 20rpx 5%;
		height:300rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
	}
	.car{
		width: 90%;
		margin: 20rpx 5% 20rpx 5%;
		height:300rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
	}
</style>
