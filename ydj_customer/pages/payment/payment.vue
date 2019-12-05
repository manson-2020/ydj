<template>
	<view class="back">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="top">
			<view class="iii" @click="out">
				<image class="img" src="../../static/xl.png" mode />
			</view>
			<view class="oder">下单支付</view>
		</view>
		<view class="row">
			<view class="col">
				<view class="uni">订单详情</view>
				<view>
					<view class="plp">
						<view class="name">驿站名称：</view>
						<view class="text">{{name}}</view>
					</view>
					<view class="www"></view>
					<view class="plp">
						<view class="name">取件码：</view>
						<view class="text">{{item.code}}</view>
					</view>
					<view class="www"></view>
					<view class="plp">
						<view class="name">配送地址：</view>
						<view class="text">{{add}}</view>
					</view>
					<view class="www"></view>
					<view class="plp">
						<view class="name">手机号：</view>
						<view class="text">{{usermobile}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cost">
			<view class="col">
				<view class="uni">支付费用</view>
				<view class="qer">
					<view class="order">订单配送费：</view>
					<view class="num">{{oopo.price}} 元</view>
					<view class="discount">本次已优惠：</view>
					<view class="much">{{oopo.coupon}} 元</view>
				</view>
				<view class="sss"></view>
				<view class="dsl">
					<view class="payment">实际支付：</view>
					<view class="money">{{oopo.money}} 元</view>
				</view>
			</view>
		</view>
		<view class="roww">
			<view class="col">
				<view class="uni">选择支付方式</view>
				<view class="magin">
					<view v-for="(item,index) in list" :key="index">
						<view class="iuy">
							<view class="inpu" :class="{yop: index === idd }" @click="click(index)"></view>
							<view class="others">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="idd === 0" class="topp" @click="nextstep">
			<image class="image" src="../../static/login.png" mode>
				<view class="login">下一步</view>
			</image>
		</view>
		<view v-if="idd === 1" class="topp" @click="wx">
			<image class="image" src="../../static/login.png" mode>
				<view class="login">确&nbsp;&nbsp;&nbsp;定</view>
			</image>
		</view>
	</view>
</template>

<script>
	import inputBox from "../../components/input-box/input-box.vue";
	export default {
		components: {
			inputBox
		},
		data() {
			return {
				clearShow: false,
				idd: 3,
				list: [{
						id: 1,
						name: "他人支付(推荐支付宝)"
					},
					{
						id: 2,
						name: "自己支付（微信）"
					}
				],
				item: {},
				obj: {},
				token: "",
				name: "",
				add: "",
				usermobile: "",
				oopo: {}
			};
		},
		onLoad(options) {
			uni.getStorage({
				key: "token",
				success: res => {
					this.token = res.data;
				}
			});
			uni.showLoading({
				title: "加载中"
			});
			setTimeout(() => {
				this.item = JSON.parse(options.item);
				this.oop();
				uni.hideLoading();
			}, 500);
		},
		methods: {
			wx() {
				//#ifdef APP-PLUS
				uni.request({
					url: `${this.$api}/api/order/add`,
					method: "POST",
					data: {
						token: this.token,
						sid: this.item.sid,
						code: this.item.code,
						addressId: this.item.addressId,
						method: 0,
						price: this.oopo.money
					},
					success: res => {
						uni.showToast({
							title: res.data.msg,
							icon: res.data.code == 200 ? "success" : "none",
							success: _ => {
								if (res.data.code == 200) {
									uni.requestPayment({
										provider: "wxpay",
										orderInfo: JSON.stringify({
											appid: res.data.data.appid,
											noncestr: res.data.data.noncestr,
											package: res.data.data.package,
											partnerid: res.data.data.partnerid,
											prepayid: res.data.data.prepayid,
											timestamp: res.data.data.timestamp,
											sign: res.data.data.sign
										}),
										complete: res => {
											uni.request({
												url: `${this.$api}/api/wxpay/selectOrder`,
												data: {
													oid: res.data.data.oid,
												},
												complete: res => {
													uni.showToast({
														title: res.data.msg,
														icon: res.data.code == 200 ? "success" : "none",
														duration: 1200,
														success: _ => {
															setTimeout(() => {
																uni.switchTab({
																	url: "../order/order"
																});
															}, 1200)
														}
													})
												}
											})
										}
									});
								}else {
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}
							}
						})
					}
				});
				//#endif
				//#ifdef H5
				uni.request({
					url: `${this.$api}/api/order/add`,
					method: "POST",
					data: {
						token: this.token,
						sid: this.item.sid,
						code: this.item.code,
						addressId: this.item.addressId,
						method: 0,
						price: this.oopo.money
					},
					success: res => {
						if (res.data.code == 200) {
							uni.requestPayment({
								provider: "wxpay",
								orderInfo: {
									appid: res.data.data.appid,
									noncestr: res.data.data.nonceStr,
									package: res.data.data.package,
									partnerid: res.data.data.partnerid,
									prepayid: res.data.data.prepayid,
									timestamp: res.data.data.timeStamp,
									sign: res.data.data.sign
								},
								success: res => {
									console.log("success:" + JSON.stringify(res));
								},
								fail: err => {
									console.log("fail:" + JSON.stringify(err));
								}
							});
						}else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				});
				//#endif
			},
			out() {
				uni.navigateBack(-1);
			},
			click(index) {
				this.idd = 3;
				this.idd = index;
			},
			nextstep() {
				if (this.idd === 0) {
					uni.request({
						url: `${this.$api}/api/order/add`,
						method: "POST",
						data: {
							token: this.token,
							sid: this.item.sid,
							code: this.item.code,
							addressId: this.item.addressId,
							method: 1,
							price: this.oopo.money
						},
						success: res => {
							if (res.data.code == 200) {
								uni.navigateTo({
									url: `../paymentonbehalfof/paymentonbehalfof?page_data=${JSON.stringify(res.data.data)}`
								});
							}else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
							}
						}
					});

				}
			},
			oop() {
				//#ifdef APP-PLUS
				uni.request({
					url: `${this.$api}/api/home/getStation`,
					method: "POST",
					data: {
						token: this.token,
						longitude: "30.4080340208",
						latitude: "103.9746093750"
					},
					success: res => {
						if (res.data.code === 200) {
							res.data.data.map(item => {
								if (item.sid === this.item.sid) {
									this.name = item.name;
								}
							});
						}
					}
				});
				uni.request({
					url: `${this.$api}/api/address/lists`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						if (res.data.code === 200) {
							res.data.data.map(item => {
								if (item.addressId === this.item.addressId) {
									this.add = item.address;
									this.usermobile = item.usermobile;
								}
							});
						}
					}
				});
				uni.request({
					url: `${this.$api}/api/home/getConfig`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						if (res.data.code === 200) {
							this.oopo = res.data.data;
						}
					}
				});
				//#endif
				//#ifdef H5
				uni.request({
					url: `/api/home/getStation`,
					method: "POST",
					data: {
						token: this.token,
						longitude: "30.4080340208",
						latitude: "103.9746093750"
					},
					success: res => {
						if (res.data.code === 200) {
							res.data.data.map(item => {
								if (item.sid === this.item.sid) {
									this.name = item.name;
								}
							});
						}
					}
				});
				uni.request({
					url: `/api/address/lists`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						if (res.data.code === 200) {
							res.data.data.map(item => {
								if (item.addressId === this.item.addressId) {
									this.add = item.address;
									this.usermobile = item.usermobile;
								}
							});
						}
					}
				});
				uni.request({
					url: `/api/home/getConfig`,
					method: "POST",
					data: {
						token: this.token
					},
					success: res => {
						if (res.data.code === 200) {
							this.oopo = res.data.data;
						}
					}
				});
				//#endif
			}
		}
	};
</script>
<style>
	.yop {
		width: 45rpx;
		height: 35rpx;
		border: 1rpx #000000 solid;
		border-radius: 50%;
		background: linear-gradient(83deg,
			rgba(37, 213, 249, 1),
			rgba(116, 35, 212, 1));
	}

	.magin {
		margin-left: 30%;
	}

	.others {
		width: 500rpx;
		height: 23rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		margin-left: 20rpx;
	}

	.iuy {
		display: flex;
		margin-top: 25rpx;
	}

	.inpu {
		width: 45rpx;
		height: 35rpx;
		border: 1rpx #000000 solid;
		border-radius: 50%;
	}

	.topp {
		width: 80%;
		margin: 0 10%;
		margin-top: 20rpx;
	}

	.image {
		height: 100rpx;
		position: absolute;
		width: 80%;
	}

	.login {
		position: relative;
		text-align: center;
		color: white;
		font-size: 45rpx;
		line-height: 100rpx;
	}

	.money {
		width: 150rpx;
		height: 46px;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(232, 1, 1, 1);
		line-height: 71rpx;
	}

	.payment {
		width: 450rpx;
		height: 46rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 71rpx;
	}

	.dsl {
		display: flex;
	}

	.much {
		width: 150rpx;
		height: 44rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(238, 238, 238, 1);
		line-height: 71rpx;
	}

	.order {
		width: 150rpx;
		height: 44rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 70rpx;
	}

	.discount {
		width: 150rpx;
		height: 44rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 71rpx;
	}

	.num {
		width: 150rpx;
		height: 46rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(238, 238, 238, 1);
		line-height: 70rpx;
	}

	.qer {
		display: flex;
	}

	.uni {
		margin: 30rpx 0;
		padding-top: 20rpx;
	}

	.plp {
		display: flex;
	}

	.back {
		width: 100%;
		height: 500rpx;
		background: linear-gradient(45deg,
			rgba(32, 225, 252, 1) 0%,
			rgba(116, 35, 212, 1) 100%);
		border-bottom-right-radius: 50%;
		border-bottom-left-radius: 50%;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.top {
		width: 100%;
		display: flex;
		margin-top: 20rpx;
	}

	.img {
		width: 20rpx;
		height: 40rpx;
	}

	.iii {
		width: 10%;
		text-align: center;
	}

	.oder {
		width: 80%;
		color: #ffffff;
		text-align: center;
		line-height: 40rpx;
	}

	.row {
		width: 90%;
		margin: 0 5%;
		height: 480rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3px 5px 22px 2px rgba(4, 130, 254, 0.18);
		border-radius: 20rpx;
		margin-top: 60rpx;
	}

	.col {
		width: 90%;
		margin: 0 5%;
	}

	.name {
		font-size: 22rpx;
		width: 155rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 70rpx;
	}

	.www {
		width: 100%;
		height: 1px;
		background: rgba(238, 238, 238, 1);
	}

	.sss {
		width: 100%;
		height: 1px;
		background: rgba(238, 238, 238, 1);
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}

	.text {
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(170, 170, 170, 1);
		line-height: 71rpx;
	}

	.plp {
		margin-top: 10rpx;
	}

	.cost {
		width: 90%;
		margin: 40rpx 5%;
		height: 290rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3px 5px 22px 2px rgba(4, 130, 254, 0.18);
		border-radius: 20rpx;
	}

	.roww {
		width: 90%;
		margin: 40rpx 5%;
		height: 270rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 3px 5px 22px 2px rgba(4, 130, 254, 0.18);
		border-radius: 20rpx;
	}
</style>
