<template>
<div id="box">
 <el-row>
  <el-col :span="24">
     <el-form-item label="投诉人身份证号" prop="idCard">
        <el-input v-model="complaintForm.idCard" onkeyup="this.value=this.value.replace(/[^\X0-9]/g, '')" placeholder="请输入身份证号(数字0-9 X为大写）" style="width: 300px;" :disabled="isDetails"></el-input>
     </el-form-item>
  </el-col>
</el-row><br><br>
</div>
</template>
 
<script>
import isIdentityId from '@/utils/idcard'
 
export default {
data() {
    var icdId  = (rule, value, callback) => {
      var errorMsg = isIdentityId(value);
      if (errorMsg != "") {
        callback(new Error(errorMsg));
      }    
    };
    return{
      isPhone:''
    }
},
 
phoneNum: [
          { required: true, message: "请填写投诉人手机号", trigger: "blur" },
          { validator: isPhone, trigger: "blur" },
 
        ],　
}
</script>