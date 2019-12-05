<template>
	<view class="back">
		<view class="status_bar">
		       <!-- 这里是状态栏 -->
		</view>
		<view class="top">
			<view class="iii" @click="out">
				<image class="img" src="../../static/xl.png" mode=""></image>
			</view>
			<view class="oder">下单</view>
		</view>
		<view class="row">
			<view class="flyx">
				<view> 
					<image class="imgg" :src="item.img" mode=""></image>
				</view>
				<view class="koa">
					<view class="disp">
						<view class="name">{{item.name}}</view>
						<view class="num">{{item.mobile}}</view>
					</view>
					<view class="dus">
						<view class="hhh">
							 <view class="place">{{item.city}}</view>
						</view>
						<view class="ddd">
							<view class="gl">{{item.metre}}</view>
						</view>
					</view>
					<view class="address">{{item.address}}</view>
				</view>
			</view>
		</view>
		<view class="information">订单信息</view>
		<view class="withdraw">
			<view class="input">
				<view class="input2"><input-box leftText="取件码：" v-model="code" placeholder="多个取件码请用逗号“,”间隔开"></input-box></view>
				<view class="input1">
					<view class="inputoo" style="width: 30%;font-size: 28rpx;color: #4A4A4A;">配送地址：</view>
					<input type="text" style="font-size: 26rpx;" v-model="obj.address" class="inputoow" placeholder="请选择您的配送地址"/>
					<image @click="choice" class="uio" src="../../static/lfet.png" ></image>
				</view>
				<view class="input1">
					<view class="inputoo" style="width: 30%;font-size: 28rpx;color: #4A4A4A;">手机号：</view>
					<input type="text" style="font-size: 26rpx;" v-model="obj.usermobile" class="inputoow" placeholder="请选择手机号"/>
				</view>
			</view>
		</view>
		<view class="tips">
			友情提示：请仔细核对取件码 
		</view>
		<view class="col">
			<view class="pppp" @click="out">
				<view class="wer">上一步</view>
			</view>
			<view class="iut" @click="nice">
				<view style="color: #FFFFFF;text-align: center;height: 80rpx;line-height: 80rpx;font-size: 36rpx;">下一步</view>
			</view>
		</view>
	</view>
</template>

<script>
	import inputBox from '../../components/input-box/input-box.vue';
	export default {
        components: {inputBox},
		data() {
			return {
				item:{},
				obj:"",
				code:"",
				tel:""
			}
		},
		onLoad(options) {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
			this.item = JSON.parse(options.item)
			this.user()
		},
		onShow(){
			uni.showLoading({
			    title: '加载中'
			});
			this.user()
			uni.hideLoading();
		},
		methods: {
			out(){
				uni.navigateBack(-1)
			},
			nice(){
				let itemsw = {}
				itemsw.sid = this.item.sid
				itemsw.code = this.code
				itemsw.addressId = this.obj.addressId
				if(itemsw.code !== ''){
					uni.navigateTo({
						url:`../payment/payment?item=${JSON.stringify(itemsw)}`
					})
				}else{
					uni.showToast({
						title:"请输入取件码",
						icon:"none"
					})
				}
			},
			choice(){
				uni.navigateTo({
					url:"../address/address"
				})
			},
			user(){
				//#ifdef H5
				uni.request({
					url: '/api/address/lists',
					method: 'POST',
					data: {
						token:this.token
					},
					success: res => {
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();
							res.data.data.map(item=>{
								if(item.status === 1){
									this.obj = item
								}
							})
						}
						
					},
				})		
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url: `${this.$api}/api/address/lists`,
					method: 'POST',
					data: {
						token:this.token
					},
					success: res => {
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();
							res.data.data.map(item=>{
								if(item.status === 1){
									this.obj = item
								}
							})
						}
					},
				})		
				//#endif
			}
		}
	}
</script>

<style>
	.pppp{
		background-image: url(data:image/png;base64,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);
		width: 204rpx;
		height: 80rpx;
		background-size: 100% 100%;
		background-position: center;
		text-align: center;
		margin: 0 auto;
	}
	.wer{
		height: 80rpx;
		font-size:36rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		line-height: 80rpx;
		color:rgba(255,255,255,1);
		background:linear-gradient(83deg,rgba(37,213,249,1) 0%, rgba(116,35,212,1) 100%);
		-webkit-background-clip:text;
		-webkit-text-fill-color:transparent;
	}
	.iut{
	  width:204rpx;
	  height:80rpx;
	  background:linear-gradient(83deg,rgba(32,226,252,1) 0%,rgba(117,32,212,1) 100%);
	  border-radius:35rpx;
	  margin: 0 auto;
	}
	.tui{
	  width: 40%;
	  margin: 0 auto;
	}
	.col{
		display: flex;
		margin-top: 60rpx;
		width: 100%;
	}
	.ttt{
		width: 205rpx;
		height: 90rpx;
	    padding: 0 50rpx;
	}
	.ooo{
		width: 205rpx;
		height: 90rpx;
		padding: 0 50rpx;
	}
	.tips{
		width: 80%;
		margin: 0 10%;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(232,1,1,1);
		line-height:44rpx;
		margin-top: 40rpx;
	}
	.uio{
		width: 50rpx;
		height: 50rpx;
		line-height: 25rpx;
		padding-top: 10rpx;
		margin-left: 30rpx;
	}
	.withdraw{
		width:90%; 
		margin: 0 5%; 
		height:400rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
	}
	.inputoo{
		width: 85%;
	}
	.inputoow{
		width: 60%;
		font-size: 20rxp;
		color: #666666;
	}
	.input{
		padding-top: 5rpx;
		width: 90%;
		margin: 0 5%;
	}
	.input1{
		display: flex;
		margin-top: 30rpx;
		border-bottom: #C8C7CC solid 1rpx;
	}
	.input2{
		margin-top: 30rpx;
	}
	.information{
		width: 90%;
		margin: 0 5%;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:44rpx;
        margin-top: 8%;
		margin-bottom: 5%;
	}
	.row{
		width:90%;
		margin: 0 5%;
		height:300rpx;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20rpx;
		margin-top: 100rpx;
	}
	.address{
		color: #999999;
		font-size: 22rpx;
	}
	.hhh{
		text-align: center;
	}
	.ddd{
		text-align: center;
	}
	.place{
		padding: 0 10rpx;
		height:30rpx;
		border:1px solid rgba(116,35,212,1);
		border-radius:13rpx;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(116,35,212,1);
		text-align: center;
		line-height: 30rpx;
	}
	.gl{
		padding: 0 10rpx;
		margin-left: 30rpx;
		height:30rpx;
		border:1px solid rgba(32,225,252,1);
		border-radius:13rpx;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		text-align: center;
		color:rgba(32,225,252,1);
		line-height: 30rpx
	}
	.disp{
		display: flex;
	}
	.name{
		font-size: 30rpx;
		font-weight: 600;
	}
	.num{
		font-size: 24rpx;
		line-height: 48rpx;
		margin-left: 20rpx;
		font-weight: 500;
	}
	.dus{
		display: flex;
		margin: 20rpx 0;
	}
	.koa{
		margin-left: 20rpx;
	}
	.imgg{
		width: 160rpx;
		height: 160rpx;
		border-radius: 20rpx;
	}
	.flyx{
		display: flex;
		margin: 0 20rpx;
		padding-top: 50rpx;
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
	.oder{
		width: 80%;
		color: #FFFFFF;
		text-align: center;
		line-height: 40rpx;
	} 
	.img{
		width: 20rpx;
		height: 40rpx;
	}
	.iii{
		width: 10%;
		text-align: center;
	}
</style>
