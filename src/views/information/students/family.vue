<template>
  <div>
    <div>
      <!-- 导航条 -->
    <div class="navbarbox">
        <van-nav-bar class="navbar" :border = "false" title="请确认家庭信息" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
          <template #right>
            <img src="@/assets/images/button.png" />
          </template>
        </van-nav-bar>
    </div>
      <children v-for="(item,index) in arr" :key="index" :index="index" @remove="remove"></children>
      <van-cell-group class="inf">
        <van-field v-model="value" readonly label-class="parentclass" label="家长信息" @click="add" placeholder="添加" input-align="right" :error = "true"/>
      </van-cell-group>
    </div>
    <div class="childbutton">
        <router-link to="school"><button>上一页</button></router-link>
        <router-link to=""><button>提交</button></router-link>
    </div>
  </div>
</template>

<script>
import Children from '@/components/Children'
 
export default {
data() {
    return {
        arr:[],
        value:'',
    };
},
components: {
    Children
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
    //点击新增子组件 
    add(){
      this.arr.push({})
    },
    //删除子组件
    remove(n){
      this.arr.splice(n,1); 
    }
}
};
</script>
<style scoped>
.inf{
  margin-bottom: 400px;
}
</style>