<template>
	<view class="tyu">
		<view class="nkl">
			<view  class="rows">
				<view class="colw" v-for="(item,index) in list" :key="index" >
					<view  class="ttet" :class="{tetee : item.status !== inde}" @click="click(item.status)">{{item.name}}&nbsp({{item.total}})</view>
					<view v-if=" item.status !== inde"></view>
					<view  v-else class="tuo"></view>
				</view>
			</view>
			<view v-for="(item,index) in arr" :key="index">
				<view class="wui" >
					<view class="num">{{item.sn}}</view>
					<view class="timee">{{item.time}}</view>
				</view>
				<view class="carke">
					<view class="qwe">
						<view class="tqwe">
							<view>联系电话：{{item.mobile}}</view>
							<view>取件码：{{item.code}}</view>
						</view>
						<view @click="ck(item.orderId)" v-if="item.status === 1" class="tubiao">标记出库</view>
					</view>
					<view class="addes">派送地址：{{item.address}}</view>
				</view>	
			</view>
		</view>
	</view>
</template>
<script>
	export default {
			data() {
				return {
					list:[],
					inde:1,
					currentTabIndex: 0,
					iamge:"../../static/juxing.png",
					token:"",
					arr:[]
				}
			},
			onLoad() {
				uni.getStorage({
					key:"token",
					success:res=>{
						this.token = res.data
					}
				})			
				this.listde()
				this.order()
			},
			methods:{
				ck(id){
					//#ifdef H5
					uni.request({
						url:"/api/order/edit",
						method:"POST",
						data:{
							token:this.token,
							orderId:id
						},
						success:res=>{
							if(res.data.code === 200){
								uni.showToast({
									title:res.msg,
									icon:"success"
								})
								this.inde = 1
								this.order()
							}
						}
					})	
					//#endif
					//#ifdef APP-PLUS
					uni.request({
						url:`${this.$api}/api/order/edit`,
						method:"POST",
						data:{
							token:this.token,
							orderId:id
						},
						success:res=>{
							if(res.data.code === 200){
								uni.showToast({
									title:res.msg,
									icon:"success"
								})
								this.inde = 1
								this.order()
							}
						}
					})	
					//#endif
				},
				click(index){
					this.inde = index
					this.order()
				},
				order(){
					//#ifdef H5
					uni.request({
						url:"/api/order/listStation",
						method:"POST",
						data:{
							token:this.token,
							status: this.inde,
						},
						success:res=>{
							uni.showLoading({
							    title: '加载中'
							});
							if(res.data.code === 200){
								uni.hideLoading();
								this.arr = res.data.data
							}
						}
					})	
					//#endif
					//#ifdef APP-PLUS
					uni.request({
						url:`${this.$api}/api/order/listStation`,
						method:"POST",
						data:{
							token:this.token,
							status: this.inde,
						},
						success:res=>{
							uni.showLoading({
							    title: '加载中'
							});
							if(res.data.code === 200){
								uni.hideLoading();
								this.arr = res.data.data
							}
						}
					})	
					//#endif
				},
				listde(){
					//#ifdef H5
					uni.request({
						url:"/api/order/getTotal",
						method:"POST",
						data:{
							token:this.token
						},
						success:res=>{
							uni.showLoading({
							    title: '加载中'
							});
							if(res.data.code === 200){
								uni.hideLoading();
								this.list = res.data.data
							}
						}
					})	
					//#endif
					//#ifdef APP-PLUS
					uni.request({
						url:`${this.$api}/api/order/getTotal`,
						method:"POST",
						data:{
							token:this.token
						},
						success:res=>{
							uni.showLoading({
							    title: '加载中'
							});
							if(res.data.code === 200){
								uni.hideLoading();
								this.list = res.data.data
							}
						}
					})	
					//#endif
				}
				
			},
			onShow(){
				this.inde = 1
				this.order()
			}
	}
</script>
<style>
	.addes{
			width: 90%;
			margin: 40rpx 5%;
			font-size:22rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
		}
		.tubiao{
			width:140rpx;
			height:40rpx;
			background:linear-gradient(83deg,rgba(32,225,252,1) 0%,rgba(5,133,254,1) 100%);
			border-radius:18rpx;
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			text-align: center;
			line-height: 40rpx;
			color:rgba(255,255,255,1);
			margin-top: 25rpx;
			margin-left: 140rpx;
		}
		.tqwe{
			width: 70%;
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:500;
			color:#666666;
			line-height: 60rpx;
		}
		.qwe{
			display: flex;
			width: 90%;
			margin: 0 5%;
			padding-top: 20rpx;
		}
		.carke{
			width: 90%;
			margin: 0 5%;
			height:284rpx;
			background:rgba(255,255,255,1);
			box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
			border-radius:0 0 20rpx 20rpx;
		}
		.num{
			width: 45%;
			margin: 20rpx 2.5%;
			color: #FFFFFF;
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			line-height: 60rpx;
			color:rgba(255,255,255,1)
		}
		.timee{
			width: 45%;
			margin: 20rpx 2.5%;
			color: #FFFFFF;
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(255,255,255,1);
			text-align: right;
			line-height: 60rpx;
		}
		.wui{
			height: 100rpx;
			width: 90%;
			margin: 0 5%;
			margin-top: 40rpx;
			border-radius: 20rpx 20rpx  0 0;
			background:linear-gradient(45deg,rgba(32,250,240,1) 0%,rgba(116,35,212,1) 100%);
			display: flex;
		}
		.ujn{
			margin-top: 10rpx;
		}
		.tuo{
			margin-top: 10rpx;
			height:6rpx;
			background:linear-gradient(83deg,rgba(32,225,252,1) 0%,rgba(5,133,254,1) 100%);
			border-radius:3rpx;
		}
		.ttet{
			font-size:34rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(0,0,0,1);
		}
		.nkl{
			margin-top: 40rpx;
		}
		.tetee{
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		.colw{
			width: 100%;
			text-align: center;
		}
		.rows{
			display: flex;
			width: 90%;
			margin: 0 5%;
		}
		.tyu{
			height: 100vh;
		}
		.body{
			width: 95%;
			margin: 40rpx 2.5%;
			height: 70%;
		}
		.caek{
			width: 100%;
			height: 200px;
			background:rgba(255,255,255,1);
			box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
			border-radius:20px;
		}
		.flxy{
			width: 90%;
			margin: 20rpx 5%;
			display: flex;
		}
		.bh{
			width: 50%;
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:600;
			color:rgba(51,51,51,1);
			line-height:70rpx;
			text-align: left;
		}
		.time{
			width: 50%;
			height:15rpx;
			font-size:18rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:70rpx;
			text-align: right;
		}
		.row{
			height:160rpx;
			background:rgba(246,246,246,1);
		}
		.col{
			display: flex;
			padding: 32rpx 0 32rpx 0;
			width: 100%;
		}
		.name{
			color: #333333 ; 
			width: 100%;
			height:30rpx;
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
		}
		.ool{
			width: 70%;
			text-align: left;
		}
		.ppl{
			margin-left: 30%;
		}
		.buck{
			width: 90%;
			margin: 30rpx 5%;
		}
		.unpaid{
			width:86rpx;
			height:30rpx;
			border:1px solid rgba(153,153,153,1);
			border-radius:14rpx;
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(153,153,153,1);
			text-align: center;
			padding-top: 5rpx;
		}
		.money{
			width:50%;
			height:24rpx;
			font-size:24rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		.xyl{
			display: flex;
			margin: 45rpx 0;
			
		}
		.signfor{
			width:91rpx;
			height:40rpx;
			background:rgba(116,35,212,1);
			border-radius:20rpx;
			font-size:22rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(252,252,252,1);
			text-align: center;
		}
		.cancel{
			width:130rpx;
			height:40rpx;
			background:rgba(221,221,221,1);
			border-radius:20rpx;
			font-size:22rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
			text-align: center;
		}
		.payment{
			width:130rpx;
			height:40rpx;
			background:rgba(221,221,221,1);
			border-radius:20rpx;
			font-size:22rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
			text-align: center;
		}
		.ttu{
			margin-left: 20rpx;
		}
		.ooo{
			margin-left: 40%;
		}
		.unpa{
			width:86rpx;
			height:30rpx;
			border:1px solid rgba(32,225,252,1);
			border-radius:14rpx;
			font-size:20rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(32,225,252,1);
			text-align: center;
			padding-top: 5rpx;
		}
</style>