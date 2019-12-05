<script>
	export default {
		onLaunch: function() {
			//#ifdef APP-PLUS
			this.handleNotice()
			//#endif
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		handleNotice(e) {
			let system = uni.getSystemInfoSync(); // 获取系统信息
			console.log(JSON.stringify(system));
			if (system.platform === 'android') { // 判断平台
				var context = plus.android.importClass("android.content.Context");
				var locationManager = plus.android.importClass("android.location.LocationManager");
				var main = plus.android.runtimeMainActivity();
				var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
				if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
					uni.showModal({
						title: '提示',
						content: '请打开定位服务功能',
						showCancel: false, // 不显示取消按钮
						success() {
							if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
								var Intent = plus.android.importClass('android.content.Intent');
								var Settings = plus.android.importClass('android.provider.Settings');
								var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
								main.startActivity(intent); // 打开系统设置GPS服务页面
							} else {
								console.log('GPS功能已开启');
							}
						}
					});
				}
			}
			// uni.navigateTo({
			// 		url: './../tabBar-3/notice/notice_list?type=1&userId='+_self.userInfo.userId
			// });
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
