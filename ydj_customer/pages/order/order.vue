<template>
	<view class="tyu">
		<view class="body" >
			<view class="caek" v-for="(item,index) in arr" :key="index">
				<view class="flxy">
					<view class="bh">{{item.sn}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				<view class="row">
					<view class="buck">
						<view class="col">
							<view class="ool">
								<view class="name">驿站名称：{{item.name}}</view>
							</view>
							<view class="ppl">
								<view v-if="item.status === 0" class="unpaid">未支付</view>
								<view v-if="item.status === 1" class="unpa">待出货</view>
								<view v-if="item.status === 2" class="unpa">派送中</view>
								<view v-if="item.status === 3" class="unpaid">已完成</view>
							</view>
						</view>
						<view class="money">取件码：{{item.code}}</view>
					</view>
				</view>		
				<view class="opop">
					<view style="width: 50%;"></view>
					<view class="xyl" v-if="item.status === 0">
						<view class="ttu" @click="qsxx(-1,item.orderId)"><view class="cancel">取消订单</view></view>
						<view class="ttu"><view class="payment">马上支付</view></view>
					</view>
					<view class="xyll" v-if="item.status === 1 || item.status === 2">
						<view class="ooo" @click="qsxx(3,item.orderId)"><view class="signfor">签收</view></view>
					</view>
					<view class="xyll" v-if="item.status === 3">
						<view class="ooo"><view class="signfor">已完成</view></view>
					</view>
				</view>		
			</view>
			<view v-if="arr.length === 0">
				<view style="width: 50%;margin: 200rpx 25%;text-align: center;">暂无订单</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				inde:0,
				currentTabIndex: 0,
				iamge:"../../static/juxing.png",
				token:"",
				arr:[]
			}
		},
		onLoad(){
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
					console.log(this.token)
				}
			})
			this.setData()
		},
		methods: {
			click(index){
				this.inde = index
				console.log(this.inde)
				console.log(index)
			},
			qsxx(status,orderId){
				//#ifdef H5
				uni.request({
					url:"/api/order/edit",
					method:"POST",
					data:{
						token:this.token,
						status:status,
						orderId:orderId
					},
					success:res=>{
						if(res.data.code === 200){
							uni.request({
								url:`/api/order/listUser`,
								method:"POST",
								data:{
									token:this.token
								},
								success:res=>{
									if(res.data.code === 200){
										this.arr = res.data.data
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
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/order/edit`,
					method:"POST",
					data:{
						token:this.token,
						status:status,
						orderId:orderId
					},
					success:res=>{
						if(res.data.code === 200){
							uni.request({
								url:`${this.$api}/api/order/listUser`,
								method:"POST",
								data:{
									token:this.token
								},
								success:res=>{
									if(res.data.code === 200){
										this.arr = res.data.data
									}
								}	
							})
						}
						uni.showToast({
							title:res.data.msg,
							icon:"success"
						})		
					}
				})
				//#endif
			},
			setData(){
				//#ifdef H5
				uni.request({
					url:`/api/order/listUser`,
					method:"POST",
					data:{
						token:this.token
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							setTimeout(()=>{
								this.arr = res.data.data
							    uni.hideLoading();
							}, 500);
						}
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/order/listUser`,
					method:"POST",
					data:{
						token:this.token
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							setTimeout(()=>{
								this.arr = res.data.data
							    uni.hideLoading();
							}, 500);
						}
					}
				})
				//#endif
			}	
		},
		onShow() {
			this.setData()
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
	.mescroll{
		position: fixed;
		top: 44px;
		bottom: 0;
		height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
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
		height:40rpx;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		overflow:hidden;
		text-overflow:ellipsis;
		-o-text-overflow:ellipsis;
		-webkit-text-overflow:ellipsis;
		-moz-text-overflow:ellipsis;
		white-space:nowrap;   
	}
	.ool{
		width: 80%;
		text-align: left;
	}
	.ppl{
		width: 20%;
		margin-left: 10%;
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
		line-height: 30rpx;
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
		line-height: 30rpx;
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
		width: 50%;
		margin-left: 50%;
	}
	.xyll{
		display: flex;
		margin: 45rpx 0;
		width: 40%;
		margin-left: 60%;
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
		line-height: 40rpx;
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
		line-height: 40rpx;
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
		line-height: 40rpx;
	}
	.ttu{
		margin-left: 20rpx;
	}
	.ooo{
		margin-left: 45%;
	}
</style>
