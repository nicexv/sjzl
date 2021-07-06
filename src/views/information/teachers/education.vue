<template>
  <div>
    <div class="sign-box">
      <!-- 导航条 -->
    <div class="navbarbox">
        <van-nav-bar class="navbar" :border = "false" title="请确认学历信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <img src="@/assets/images/button.png" />
          </template>
        </van-nav-bar>
    </div>
      <!-- 基本信息 -->
      <div>
        <van-cell-group class="inf">
          <van-field readonly clickable ref="educationRef" label="学历" :value="applyForm.education" placeholder="去选择" @click="handleShowPicker('education')" input-align="right" is-link />
          <van-field v-model="value" label="毕业院校" placeholder="去填写" input-align="right" is-link />
          <van-field v-model="value" label="所学专业" placeholder="去填写" input-align="right" is-link />
          <van-field v-model="timeValue" label="毕业日期" placeholder="去选择" @click="showPopFn()" readonly input-align="right" is-link />
        </van-cell-group> 
      </div>
    </div> 
    <div class="childbutton">
      <router-link to="basic_teacher"><button class="button">上一页</button></router-link>
      <router-link to="unit"><button class="button">下一页</button></router-link>
    </div>
    <!-- 弹出层+picker基础选择器 -->
    <van-popup v-model="showPicker" round position="bottom" >
      <van-picker show-toolbar ref="pickerRef" :title="pickerTitle" :columns="pickerColumns" @cancel="showPicker = false" @confirm="onConfirmPicker" />
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="show" position="bottom" round>
      <van-datetime-picker v-model="currentDate" type="date" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
    </van-popup>

  </div>
</template>

<script>
import { areaList } from "@/utils/area.js";
export default {
  data() {
    return {
      msg: '',
      currentDate: new Date(),
      changeDate: new Date(),
      show: false, // 用来显示弹出层
      timeValue: '',
      value: '',
      carmodel: '',
      areaList: areaList, //引用地区信息
      showArea: false,
      valueArea: '', //地区值
      arrArea: [], //存放地区数组
      showPicker: false,
      pickerColumns: [],
      pickerTitle:'',
      applyForm: { education:''},
      educationList:[ { text: '本科', value: '00' }, { text: '专科', value: '01' },],
    };
  },
  methods: {
    onClickLeft() {
        if (window.history.length <= 1) {
                this.$router.push({path:'/'})
                return false
            } else {
                this.$router.go(-1)
            }
    },
    onClickRight() {
    },
    handleShowPicker(val) {
      this.showPicker = true
      if (val == 'education') {
        this.pickerColumns = this.educationList
        this.pickerTitle = '学历'
      }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == '学历') {
        this.applyForm.education = values.text
      }
      this.showPicker = false
    },
      // 时间选择器
    showPopFn() {
      this.show = true;
    },
    showPopup() {
    this.show = true;
    },
    changeFn() { // 值变化是触发
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() { // 确定按钮
      this.timeValue = this.timeFormat(this.currentDate);
      this.show = false;
    },
    cancelFn(){  //取消
      this.show = false;
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '.' + month + '.' + day
    }
  },
  mounted() {
      this.timeFormat(new Date());
  }
};
</script>

<style lang="scss" scoped>

</style>