<template>
	<view>
		<view class="back">
			<view class="top">
				<view>输入驿站名称:</view>
				<input class="inpuy" type="text" v-model="obj.name">
			</view>
			<view class="top">
				<view>输入驿站负责人:</view>
				<input class="inpuy" type="text" v-model="obj.username">
			</view>
			<view class="top">
				<view>输入驿站联系电话:</view>
				<input class="inpuy" type="text" v-model="obj.mobile">
			</view>
			<view class="top">
				<view>输入驿站详细地址:</view>
				<input class="inpuy" type="text" v-model="obj.address">
			</view>
			<view class="map">
				<map class="mpp" style="width: 675rpx;height: 500rpx" :latitude="obj.location.latitude" :longitude="obj.location.longitude" :markers="covers"></map>
			</view>
			<view class="top" >
				<view style="width: 30%;">驿站服务状态:</view>
				<input @click="ttt" v-if="obj.status === 1" class="inpuy" type="text" disabled="disabled" v-model="open">
				<input @click="ttt" v-if="obj.status === 0" class="inpuy" type="text" disabled="disabled" v-model="close">
				<view @click="ttt" style="margin-top: 10rpx;"><image style="width: 30rpx; height: 30rpx;" src="../../static/xia.png" mode=""></image></view>
			</view>
			<view v-if="flag === true" class="asd">
				<view v-for="(item,index) in list" :key="index">
					<view v-if="obj.status !== index" class="textet" @click="xz(index)">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="toppp" @click="preservation">
			<image class="image" src="../../static/login.png" mode=""><view class="login">保存</view></image>
		</view>
	</view>
</template>
<script>
	import cade from "../../components/choose-Cade/choose-Cade.vue"
	export default {
		data() {
			return {
				token:"",
				item:{},
				obj:{},
				covers: [{
					iconPath:"../static/location.png"
				}],
				open:"开启",
				close:"关闭",
				list:[{name:"关闭"},{name:"开启"}],
				flag: false
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
			});
			this.yh()
		},
		methods: {
			preservation(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/upStation`,
					method:"POST",
					data:{
						token:this.token,
						name:this.obj.name,
						username:this.obj.username,
						mobile:this.obj.mobile,
						longitude:this.obj.location.longitude,
						latitude:this.obj.location.latitude,
						status:this.obj.status
					},
					success:res=>{
						if(res.data.code === 200){
							uni.showToast({
								title:res.data.msg,
								icon:"success"
							})
						}
					}
				})
				//#endif
			},
			xz(index){
				this.obj.status = index
				this.flag = false
			},
			ttt(){
				this.flag = !this.flag
			},
			yh(){
				//#ifdef APP-PLUS
				uni.request({
					url:`${this.$api}/api/user/station`,
					method:"POST",
					data:{
						token:this.token,
						longitude: this.item.longitude,
						latitude:this.item.latitude
					},
					success:res=>{
						uni.showLoading({
						    title: '加载中'
						});
						if(res.data.code === 200){
							uni.setStorage({
								key:"obj",
								data: res.data.data
							})
							uni.hideLoading();
							this.obj = res.data.data
							this.covers[0] = res.data.data.location
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url:`/api/user/station`,
					method:"POST",
					data:{
						token:this.token,
						longitude: this.item.longitude,
						latitude:this.item.latitude
					},
					success:res=>{
						if(res.data.code === 200){
							uni.setStorage({
								key:"obj",
								data: res.data.data
							})
							uni.hideLoading();
							this.obj = res.data.data
							this.covers[0] = res.data.data.location
						}
					}
				})
				//#endif
			}
		},
		onShow() {
			this.yh()
		}
	}
</script>
<style>
	.textet{
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.asd{
		width: 60%;
		height: 140rpx;
		line-height: 70rpx;
		text-align: center;
		margin-left: 30%;
	}
	.login{
		width: 100%;
		position: relative;
		text-align: center;
		color: white;
		font-size: 45rpx;
		line-height: 100rpx;
	}
	.toppp{
		position: absolute;
		bottom: 40rpx;
		width: 80%;
		margin: 0 10%;
	}
	.image{
		height: 100rpx;
		position: absolute;
		width: 100%;
	}
	.map{
		margin: 40rpx 0;
	}
	.top{
		display: flex;
		line-height: 70rpx;
		border-bottom: rgba(245,245,245,1) solid 1rpx;
		font-size:28rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(153,153,153,1);
		margin-top: 30rpx;
	}
	.inpuy{
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		width: 60%;
		color:rgba(51,51,51,1);
	}
	.back{
		width: 90%;
		margin: 0 5%;
	}
</style>
