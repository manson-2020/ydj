<template>
	<view class="back">
		{{text}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token:"",
				text:""
			}
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:res=>{
					this.token = res.data
				}
			})
			//#ifdef H5
			uni.request({
				url:"/api/user/about",
				method:"POST",
				data:{
					token: this.token
				},
				success:res=>{
					if(res.data.code === 200){
						this.text = res.data.data
					}
				}
			})
			//#endif
			//#ifdef APP-PLUS
			uni.request({
				url:`${this.$api}/api/user/about`,
				method:"POST",
				data:{
					token: this.token
				},
				success:res=>{
					if(res.data.code === 200){
						this.text = res.data.data
					}
					console.log(res)
				}
			})			
			//#endif
		},
		methods: {
		}
	}
</script>
<style>
	.back{
		width: 90%;
		margin: 0 5%;
		font-size:28rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(0,0,0,1)
	}
</style>
