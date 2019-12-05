<template>
	<view class="back">
		<view class="time">{{date}}</view>
		<view class="monye">提现金额：￥{{total}}</view>
		<view class="row">
			<view v-for="(item,index) in list" :key="index">
				<view class="col">
					<view class="image">
						<image class="img" src="../../static/monye.png" mode=""></image>
					</view>
					<view class="text">
						<view class="ye">{{item.text}}</view>
						<view class="times">{{item.time}}</view>
						<view class="xian"></view>
					</view>
					<view style="width: 25%;">
						<view class="num">{{item.money}}</view>
						<view style="font-size: 24rpx;" v-if="item.status === 0">待审核</view>
						<view style="font-size: 24rpx;" v-if="item.status === 1">审核通过</view>
						<view style="font-size: 24rpx;" v-if="item.status === 2">审核未通过</view>
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
				date:"",
				d:"",
				token:"",
				monye:0,
				list:[],
				total:""
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
			this.time()
			let time = this.d.slice(0,7)
			//#ifdef H5
			uni.request({
				url:"/api/user/moneyList",
				method:"POST",
				data:{
					token:this.token,
					date: time
				},
				success:res=>{
					uni.showLoading({
					    title: '加载中'
					});
					if(res.data.code === 200){
						uni.hideLoading();
						this.date = res.data.data.date
						this.list = res.data.data.list
						this.total = res.data.data.total
					}
				}
			})	
			//#endif
			//#ifdef APP-PLUS
			uni.request({
				url:`${this.$api}/api/user/moneyList`,
				method:"POST",
				data:{
					token:this.token,
					date: time
				},
				success:res=>{
					uni.showLoading({
					    title: '加载中'
					});
					if(res.data.code === 200){
						uni.hideLoading();
						this.date = res.data.data.date
						this.list = res.data.data.list
						this.total = res.data.data.total
					}
				}
			})	
			//#endif
		},
		methods: {
			time(){
				this.d = new Date();
				this.d = this.d.getFullYear() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getDate() + ' ' + this.d.getHours() + ':' + this.d.getMinutes() + ':' + this.d.getSeconds();
				return this.d;
			}
		}
	}
</script>

<style>
	.xian{
		margin-top: 25rpx;
		height:2px;
		background:rgba(239,239,239,1);
	}
	.times{
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(163,163,163,1);
		line-height:30rpx;
	}
	.num{
		width:20%;
		height:70rpx;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:50rpx;
	}
	.ye{
		width: 100%;
		height: 70rpx;
		font-size:28rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		word-break:  break-all;   //允许在单词内换行
		text-overflow:  ellipsis;   // 以省略号显示超出的文本
		display:  -webkit-box;   
		-webkit-box-orient:  vertical;   //从上向下垂直排列子元素
		-webkit-line-clamp:  1;   //显示文本的行数
		overflow:  hidden;   //溢出隐藏
		color:rgba(51,51,51,1);
		line-height:50rpx;
	}
	.text{
		width: 60%;
		padding-left: 20rpx;
	}
	.image{
		width: 20%;
		height: 50%;
	}
	.img{
		width: 100rpx;
		height: 100rpx;
	}
	.col{
		width: 90%;
		margin: 0 5%;
		padding: 5% 0;
		display: flex;
	}
	.row{
		width: 100%;
		background:rgba(255,255,255,1);
		box-shadow:3px 5px 22px 2px rgba(4,130,254,0.18);
		border-radius:20px;
	}
	.monye{
		width: 80%;
		font-size:28rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:70rpx;
		margin-top: 50rpx;
	}
	.time{
		width:80%;
		height:36rpx;
		font-size:36rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:70rpx;
		margin-top: 50rpx;
	}
	.back{
		width: 90%;
		margin: 0 5%;
	}
</style>
