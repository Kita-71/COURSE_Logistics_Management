<template>
  <div class="header">
    <div class="user">
      <el-dropdown  style=" color: #999922; position: relative; left: 50px;top: -2px;">
        <div style="font-size: 20px; ">
          <i class="el-icon-setting"  ></i>
          <el-dropdown-menu slot="dropdown"  >
            <el-dropdown-item  @click.native="Exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>
    <span class="times">{{ time }}</span>
    <div class="user" style="font-size: 15px; position: relative;  left: -150px; top: 20px; ">
      <i class="el-icon-s-custom" ></i>
      <span>{{this.name}}</span>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  created() {
    request.get("http://localhost:9090/user/getone",{params:{username:this.$store.state.courier.username}}).then(res=>
    {
        var siteId=res.siteId;
        request.get("http://localhost:9090/site/getSiteById",{params:{id:siteId}}).then(res=>
            {
              this.name=res.siteRegion+res.siteName;
            })
    })
  },
  data() {
    return {
      time: "",
      name:"",
    };
  },
  mounted() {
    this.currentTime();
  },
  methods: {
    //   时间
    currentTime() {
      setInterval(this.getTime, 500);
    },
    getTime() {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
          new Date().getMinutes() < 10
              ? "0" + new Date().getMinutes()
              : new Date().getMinutes();
      let ss =
          new Date().getSeconds() < 10
              ? "0" + new Date().getSeconds()
              : new Date().getSeconds();
      this.time =
          yy + "年 " + mm + "月" + dd + "日 " + hh + ":" + mf + ":" + ss;
    },
    Exit(){
      this.$store.commit("courier_exit");
      this.$router.replace({path:'/Sign'});
      this.$message({
        type: 'success',
        message: '登出成功'
      });
    }
  }
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 100%;
  background-color: #4d52f8;
}
.times{
  position: absolute;
  left:50%;
  top:2%;
  color: #ffffff;
}
.user
{
  position: absolute;
  left:90%;
  top:2%;
  color: #ffffff;
}

</style>