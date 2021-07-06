<template>
  <div>
    <div class="sign-box">
      <!-- 导航条 -->
    <div class="navbarbox">
        <van-nav-bar class="navbar" :border = "false" title="请确认单位信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <img src="@/assets/images/button.png" />
          </template>
        </van-nav-bar>
    </div>
      <!-- 基本信息 -->
      <div>
        <van-cell-group class="inf">
          <van-field readonly clickable ref="typeRef" label="职工类型" :value="applyForm.type" placeholder="去选择" @click="handleShowPicker('type')" input-align="right" is-link />
          <van-field v-model="value" label="员工编号" placeholder="去填写" input-align="right" is-link />
          <van-field v-model="value" label="所属部门" placeholder="去填写" input-align="right" is-link />
          <van-field v-model="value" label="职务" placeholder="去填写" input-align="right" is-link />
        </van-cell-group> 
      </div>
    </div> 
    <div class="childbutton">
      <router-link to="education"><button class="button">上一页</button></router-link>
      <router-link to=""><button class="button">提交</button></router-link>
    </div>
    <!-- 弹出层+picker基础选择器 -->
    <van-popup v-model="showPicker" round position="bottom" >
      <van-picker show-toolbar ref="pickerRef" :title="pickerTitle" :columns="pickerColumns" @cancel="showPicker = false" @confirm="onConfirmPicker" />
    </van-popup>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      show:false,
      showPicker: false,
      pickerColumns: [],
      pickerTitle:'',
      applyForm: { type:''},
      typeList:[ { text: '科员', value: '00' }],
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
      if (val == 'type') {
        this.pickerColumns = this.typeList
        this.pickerTitle = '职工类型'
      }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == '职工类型') {
        this.applyForm.type = values.text
      }
      this.showPicker = false
    },
  },
};
</script>

<style lang="scss" scoped>

</style>