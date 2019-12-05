<template>
<view>
	<view class="oiu">
		<view class="search">
		   <mSearch :show="false" radius="5" @inputVal="inputVal" placeholder="搜索..."   border='1px #999 solid'></mSearch>
		   <view class="choice">
				选择驿站
		   </view>
		</view>
		<view class="wzyz" v-if="list.length === 0">
			暂无驿站
		</view>
		<view v-else v-for="(item,index) in list" :key="index">
			<view class="flyx">
				<radio-group @change="chenge">
					<radio :value="item.value"  :checked="index === current" class="radio" ></radio>
				</radio-group>
				<view> 
					<image class="img" :src="item.img" mode=""></image>
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
		<view class="top" @click="jump">
			<image class="image" src="../../static/login.png" mode=""><view class="login">确&nbsp&nbsp&nbsp定</view></image>
		</view>
	</view>
</view>
</template>
<script>
	import mSearch from '../../components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {mSearch},
		data() {
			return {
				flxy: true,
				tabList:{},
				token:"",
				list:[],
				current: 0,          
				item:{},
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
			uni.getLocation({
			    type: 'wgs84',
			    success:res=>{
					this.item = res
			    }
			})
			this.input()
		},
		methods: {
			chenge(evt){
				 for (let i = 0; i < this.list.length; i++) {
				        if (this.list[i].value === evt.target.value) {
				        this.current = i;
				        break;
				     }
				 }
			},
			jump(){
				let item = this.list[this.current]
				uni.navigateTo({
					url:`../placeanorder/placeanorder?item=${JSON.stringify(item)}`
				})
			},
			inputVal(data){
				if(data !== ""){
					 let obj = []
					 this.list.filter((item, index)=>{
						 uni.showLoading({
						     title: '加载中'
						 });
						if(item.name.indexOf(data) === 0){
							obj.push(item)
							this.list = obj;
							setTimeout(()=>{
							    uni.hideLoading();
							}, 500);
						}else if((index + 1) == this.list.length && item.name.indexOf(data) != 0){
							uni.hideLoading();
							this.list = []
						}
					})
				}else{
					this.list = this.arr
				}
			},
			input(){
				//#ifdef H5
				uni.request({
					url:"/api/home/getStation",
					method:"POST",
					data:{
						token:this.token,
						longitude:"30.4080340208",
						latitude:"103.9746093750",
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();
							this.list = res.data.data
							this.arr = res.data.data
						}
					}
				})
				//#endif
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/home/getStation`,
					method:"POST",
					data:{
						token:this.token,
						longitude:"30.4080340208",
						latitude:"103.9746093750"
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.hideLoading();
							this.list = res.data.data
							this.arr = res.data.data
						}
					}
				})
				//#endif
			}
		}
	}
</script>
<style>
	.wzyz{
		width: 100&;
		text-align: center;
		color: #666666;
		font-size: 32rpx;
	}
	.search{
		width: 90%;
	}
	.choice{
		margin: 50rpx 3.5%;
		font-weight: 500;
	}
	.img{
		width: 160rpx;
		height: 160rpx;
	}
	.flyx{
		display: flex;
	}
	.radio{
		margin-left: 40rpx;
		line-height: 160rpx;
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
		line-height: 42rpx;
		margin-left: 20rpx;
		font-weight: 500;
	}
	.address{
		color: #999999;
		overflow: hidden; 
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 20rpx;
	}
	.dus{
		display: flex;
		margin: 20rpx 0;
		
	}
	.koa{
		margin-left: 20rpx;
		width: 55%;
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
		height:30rpx;
		border:1px solid rgba(32,225,252,1);
		border-radius:13rpx;
		font-size:20rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		text-align: center;
		color:rgba(32,225,252,1);
		line-height:30rpx
	}
	.hhh{
		text-align: center;
	}
	.ddd{
		margin-left: 30rpx;
		text-align: center;
	}
	.top{
		width: 80%;
		margin: 0 10%;
		margin-top: 100rpx;
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
</style>
