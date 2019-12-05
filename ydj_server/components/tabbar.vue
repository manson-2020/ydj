<template>
	<view class="back">
		<block v-if="id === 0" v-for="(item,index) in tabList" :key="index">
		    <view class="navigator" :class="currentTabIndex === index ? 'on' : ''">
		        <view class="icon"  @click="switchTab(index)">
					<view>
						<image  class="wow" :src="item.flag ? item.img : item.iamge" mode=""></image>
					</view>
					<!-- <view v-else>
						<image  class="wow"  :src="item.iamge" mode=""></image>
						<text>{{index}}{{currentTabIndex}}</text>
					</view> -->
		            <text class="iconfont" :class="item.icon" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
		            <text v-if="item.badge" class="uni_badge">{{item.badge}}</text>
		            <text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
		            </view>
		        <view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view>
		    </view>
		</block>
		<block v-if="id === 1" v-for="(item,index) in tabARR" :key="index">
		    <view class="navigatorr" :class="currentTabIndex === index ? 'on' : ''" @click="swiTab(index)">
		        <view class="icon">
					<view>
						<image  class="wow" :src="item.flag ? item.img : item.iamge" mode=""></image>
					</view>
		            <text class="iconfont" :class="item.icon" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
		            <text v-if="item.badge" class="uni_badge">{{item.badge}}</text>
		            <text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
		            </view>
		        <view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view>
		    </view>
		</block>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                tabList: this.$store.state.tabList,
				tabARR:this.$store.state.tabARR,
				currentTabIndex: 0,
				id:this.$store.state.id
            }
        },
        props: {
            current: { type: [Number, String], default: 0 },
            backgroundColor: { type: String, default: '#fbfbfb' },
            color: { type: String, default: '#999' },
            tintColor: { type: String, default: '#42b983' }
        },
        methods: {
            switchTab(index){
				this.tabList.map((item, index) => this.tabList[index].flag = false);
				this.tabList[index].flag = true;
				uni.reLaunch({
					url:this.tabList[index].url
				})
            },
			swiTab(index){
				this.tabARR.map((item, index) => this.tabARR[index].flag = false);
				this.tabARR[index].flag = true;
				uni.reLaunch({
					url:this.tabARR[index].url
				})
			}
        },
		onLoad(){
			
		},
		onShow(){
			
		}
    }
</script>

<style>
	.back{
		display: flex;
		position: absolute;
		bottom: 50rpx;
		width: 100%;
	}
	.content{
		margin-top: 500rpx;
	}
	.wow{
		width: 40rpx;
		height: 40rpx;
	}
	.text{
		font-size: 26rpx;
	}
	.navigator{
		width: 25%;
		text-align: center;
	}
	.navigatorr{
		width: 33%;
		text-align: center;
	}
</style>
