<template>
  <div>
    <!-- 导航条 -->
    <div class="navbarbox">
        <van-nav-bar class="navbar" :border = "false" title="请确认学校信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <img src="@/assets/images/button.png" />
          </template>
        </van-nav-bar>
    </div>
    <!-- 基本信息 -->
    <div class="main">
      <van-cell-group class="inf">
        <van-field class="name" v-model="value" label="学籍号" placeholder="去填写" input-align="right" center />
        <van-field v-model="value" label="所属学校" placeholder="去填写" input-align="right"  />
      </van-cell-group>
      <van-cell-group class="inf">
        <van-field v-model="value" label="学号" placeholder="去填写" input-align="right" is-link />
        <van-field readonly clickable ref="gradeRef" label="所属年级" :value="applyForm.grade" placeholder="去选择" @click="handleShowPicker('grade')" input-align="right" is-link />
        <van-field readonly clickable ref="classRef" label="所属班级" :value="applyForm.class" placeholder="去选择" @click="handleShowPicker('class')" input-align="right" is-link />
        <van-field v-model="timeValue" label="入学日期" placeholder="去选择" @click="showPopFn()" readonly input-align="right" is-link />
      </van-cell-group> 
    </div>
    <div class="childbutton">
      <router-link to="/"><button>上一页</button></router-link>
      <router-link to="family"><button>下一页</button></router-link>
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
      showPicker: false,
      pickerColumns: [],
      pickerTitle:'',
      applyForm: { grade: '', class: '' },
      gradeList: [ { text: '一年级', value: '01' }, { text: '二年级', value: '02' },{ text: '三年级', value: '03' },{ text: '四年级', value: '04' },{ text: '五年级', value: '05' },{ text: '六年级', value: '06' } ],
      classList: [ { text: '1班', value: '11' }, { text: '2班', value: '12' }, { text: '3班', value: '13' }, { text: '4班', value: '14' }, { text: '5班', value: '15' }, { text: '6班', value: '16' } ],
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
      if (val == 'grade') {
        this.pickerColumns = this.gradeList
        this.pickerTitle = '所属年级'
      } else if (val == 'class') {
        this.pickerColumns = this.classList
        this.pickerTitle = '所属班级'
      }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == '所属年级') {
        this.applyForm.grade = values.text
      } else if (this.$refs.pickerRef.title == '所属班级') {
        this.applyForm.class = values.text
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
}
</script>

<style lang="scss" scoped>
</style>