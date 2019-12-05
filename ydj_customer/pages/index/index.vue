<template>
	<view class="tyu">
		<view class="content">
			<view class="top">
				<bw-swiper :swiperType="swiperType" :nextMargin="nextMargin" :swiperHeight="swiperHeight" :swiperList="swiperList"
				 style="width:100%" :autoplay="autoplay" :indicatorDots="indicatorDots"></bw-swiper>
			</view>
		</view>
	</view>
</template>
<script>
	import bwSwiper from '../../components/bw-swiper/bw-swiper.vue'
	export default {
		components: {
			bwSwiper,
		},
		data() {
			return {
				swiperList: [],
				previousMargin: "150rpx",
				nextMargin: "30rpx",
				indicatorDots: false,
				swiperType: true,
				autoplay: false,
				// fullScreen:true,
				swiperHeight: 0,
				token: ""
			}
		},
		onLoad() {
			(async () => {
				let token = await uni.getStorage({
					key: "token",
				});			
				if(!token[1]){
					uni.navigateTo({
						url:"../login/login"
					})
				}else{
					uni.getStorage({
						key:"token",
						success:res=>{
							this.token = res.data
						}
					})
				}
			})();
			uni.getStorage({
				key: "token",
				success: res => {
					this.token = res.data
					this.img()
				}
			})
			uni.getSystemInfo({
				success: res => {
					this.swiperHeight = res.windowHeight
					this.swiperHeight += this.swiperHeight - 250
				}
			})
		},
		onShow(){
			uni.getStorage({
				key: "token",
				success: res => {
					this.token = res.data
					//#ifdef APP-PLUS
					uni.request({
						url: `${this.$api}/api/home/banner`,
						method: "POST",
						data: {
							token: this.token
						},
						success: res => {
							if (res.data.code === 200) {
								if(this.swiperHeight !== 0){
									this.swiperList = res.data.data
								}
							}
						}
					})
					//#endif
					//#ifdef H5
					uni.request({
						url: `/api/home/banner`,
						method: "POST",
						data: {
							token: this.token
						},
						success: res => {
							if (res.data.code === 200) {
								if(this.swiperHeight !== 0){
									this.swiperList = res.data.data
								}
							}
						}
					})
					//#endif
				}
			})
		},
		methods: {
			img() {
				//#ifdef APP-PLUS
				uni.request({
					url: `${this.$api}/api/home/banner`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						uni.showLoading({
						    title: '加载中'
						});
						if (res.data.code === 200) {
							if(this.swiperHeight !== 0){
								this.swiperList = res.data.data
								uni.hideLoading();
							}
						}
					}
				})
				//#endif
				//#ifdef H5
				uni.request({
					url: `/api/home/banner`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						uni.showLoading({
						    title: '加载中'
						});
						if (res.data.code === 200) {
							if(this.swiperHeight !== 0){
								this.swiperList = res.data.data
								uni.hideLoading();
							}
						}
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.top {
		margin-top: 40rpx;
		margin-left: 40rpx;
	}
	.tyu {
		height: 100vh;
	}
</style>
