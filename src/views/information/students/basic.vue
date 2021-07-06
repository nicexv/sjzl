<template>
  <div class="sign-box">
    <!-- 导航条 -->
    <div class="navbarbox">
        <van-nav-bar class="navbar" :border = "false" title="请确认基本信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <img src="@/assets/images/button.png" />
          </template>
        </van-nav-bar>
    </div>
    <div class="main">
        <van-cell-group class="inf">
          <van-field class="name" v-model="name" label="姓名" placeholder="去填写" input-align="right" center />
          <van-field readonly clickable ref="cardRef" label="证件类型" :value="applyForm.card" placeholder="去选择" @click="handleShowPicker('card')" input-align="right" is-link />
          <van-form>
          <van-field v-model="idcard" :rules="[
              { required: true, message: '请填写您的身份证号码！' },
              { pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '格式错误！'} ]" type="tel" label="身份证号" placeholder="去填写" clearable input-align="right" is-link />
        </van-form>
        </van-cell-group>
        <van-cell-group class="inf">
          <van-field readonly clickable ref="genderRef" label="性别" :value="applyForm.gender" placeholder="去选择" @click="handleShowPicker('gender')" input-align="right" is-link />
          <van-field readonly clickable ref="moveRef" label="是否随迁子女" :value="applyForm.move" placeholder="去选择" @click="handleShowPicker('move')" input-align="right" is-link />
          <van-field readonly clickable ref="stayhomeRef" label="是否留守儿童" :value="applyForm.stay" placeholder="去选择" @click="handleShowPicker('stay')" input-align="right" is-link />
          <van-field readonly clickable ref="outlookRef" label="政治面貌" :value="applyForm.outlook" placeholder="去选择" @click="handleShowPicker('outlook')" input-align="right" is-link />
          <van-field readonly clickable ref="nationRef" label="民族" :value="applyForm.nation" placeholder="去选择" @click="handleShowPicker('nation')" input-align="right" is-link />
          <van-field readonly clickable @click="showPopup" label="籍贯" placeholder="去选择" v-model="carmodel" input-align="right" is-link />
          <van-field readonly clickable ref="residenceRef" label="户口地址" :value="applyForm.residence" placeholder="去选择" @click="handleShowPicker('residence')" input-align="right" is-link />
        </van-cell-group>
        <van-cell-group class="inf"> 
          <van-field readonly clickable label="家庭住址" :value="valueArea" placeholder="添加地址" @click="bindShow" input-align="right" is-link/>
        </van-cell-group> 
    </div>
    <div class="buttondiv">
        <router-link to="school"><button class="button">下一页</button></router-link>
    </div>
    <!-- 弹出层+picker基础选择器 -->
    <van-popup v-model="showPicker" round position="bottom" >
      <van-picker show-toolbar ref="pickerRef" :title="pickerTitle" :columns="pickerColumns" @cancel="showPicker = false" @confirm="onConfirmPicker" />
    </van-popup>
    <van-popup v-model="show" round position="bottom" >
      <van-area :area-list="areaList" :columns-num="2" ref="myArea" title="籍贯" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
    <!--选择省市区-->
    <van-popup v-model="showArea" round position="bottom" >
      <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="bindCancel" />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from "@/utils/area.js";

export default {
  data() {
    return {
      idcard:'',
      name:'',
      idCard:'',
      value: '',
      show:false,
      carmodel: '',
      areaList: areaList, //引用地区信息
      showArea: false,
      valueArea: '', //地区值
      arrArea: [], //存放地区数组
      showPicker: false,
      pickerColumns: [],
      pickerTitle:'',
      applyForm: { card:'', gender: '', move: '', stay: '', outlook: '', nation: '', native: '', residence: '' },
      cardList:[ { text: '身份证', value: '00' },],
      genderList: [ { text: '男', value: '01' }, { text: '女', value: '02' },{ text: '其他', value: '03' } ],
      moveList: [ { text: '是', value: '11' }, { text: '否', value: '12' } ],
      stayList: [ { text: '是', value: '21' }, { text: '否', value: '22' } ],
      outlookList: [ { text: '群众', value: '31' }, { text: '共青团员', value: '32' }, { text: '中共党员', value: '33' } ],
      nationList: [ { text: '汉族', value: '41' },{ text: '满族', value: '41' },{ text: '蒙古族', value: '41' },{ text: '回族', value: '41' },{ text: '藏族', value: '41' },{ text: '维吾尔族', value: '41' },{ text: '苗族', value: '41' },{ text: '彝族', value: '41' },{ text: '壮族', value: '41' },{ text: '布依族', value: '41' },{ text: '侗族', value: '41' }],
      residenceList: [ { text: '城镇户口', value: '61' }, { text: '农村户口', value: '62' } ],
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
      if (val == 'card') {
        this.pickerColumns = this.cardList
        this.pickerTitle = '身份证号'
      } else if (val == 'gender') {
        this.pickerColumns = this.genderList
        this.pickerTitle = '性别'
      } else if (val == 'move') {
        this.pickerColumns = this.moveList
        this.pickerTitle = '是否随迁子女'
      } else if (val == 'stay') {
        this.pickerColumns = this.stayList
        this.pickerTitle = '是否留守儿童'
      } else if (val == 'outlook') {
        this.pickerColumns = this.outlookList
        this.pickerTitle = '政治面貌'
      } else if (val == 'nation') {
        this.pickerColumns = this.nationList
        this.pickerTitle = '民族'
      } else if (val == 'residence') {
        this.pickerColumns = this.residenceList
        this.pickerTitle = '户口类型'
      }
    },
    onConfirmPicker(values) {
      if (this.$refs.pickerRef.title == '身份证号') {
        this.applyForm.card = values.text
      } else if (this.$refs.pickerRef.title == '性别') {
        this.applyForm.gender = values.text
      } else if (this.$refs.pickerRef.title == '是否随迁子女') {
        this.applyForm.move = values.text
      } else if (this.$refs.pickerRef.title == '是否留守儿童') {
        this.applyForm.stay = values.text
      } else if (this.$refs.pickerRef.title == '政治面貌') {
        this.applyForm.outlook = values.text
      } else if (this.$refs.pickerRef.title == '民族') {
        this.applyForm.nation = values.text
      } else if (this.$refs.pickerRef.title == '户口类型') {
        this.applyForm.residence = values.text
      }
      this.showPicker = false
    },
    // 籍贯选择
    showPopup() {
      this.show = true;// 弹出层显示
    },
    onChange(picker, index, value) {
      let val = picker.getValues();//value=0改变省，1改变市，2改变区
      console.log(val); //查看打印
      let areaName = "";
      for (var i = 0; i < val.length; i++) {
        areaName = areaName + (i == 0 ? "" : "") + val[i].name;
      }
      this.carmodel = areaName;
    },
    onConfirm(val) {
      console.log(val[0].name + "," + val[1].name);//确定选择城市
      this.show = false; //关闭弹框
    },
    onCancel() {
      this.show = false;//取消选中城市
      this.$refs.myArea.reset(); // 重置城市列表
    },
    // 家庭住址选择省市区
    bindShow(){
      this.showArea= true;
      },
    bindCancel(){
      this.showArea= false;
      },
    onAreaConfirm(val) {
      this.showArea = false;//地区选择
      this.arrArea = val;
      var addrInfo = val[0].name + val[1].name + val[2].name;
      this.valueArea = addrInfo
      },
  },
};
</script>

<style lang="scss" scoped>
</style>