<template>
  <el-container class="containerAll">
    <el-drawer
        title="重置密码"
        :visible.sync="draw"
        direction="rtl"
        :close-on-click-modal="false"
        :wrapper-closable="false">
      <el-form ref="PasswdFormRef"
               :model="PasswdForm" :rules="PasswdFromRules" class="changeForm">
        <!-- 密码 -->
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="PasswdForm.passwd" show-password size="medium"
                    @paste.native.capture.prevent="handleFalse"
                    @copy.native.capture.prevent="handleFalse"
                    @cut.native.capture.prevent="handleFalse">
          </el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" :required="true" prop="repasswd">
          <el-input v-model="PasswdForm.repasswd" show-password size="medium"
                    @paste.native.capture.prevent="handleFalse"
                    @copy.native.capture.prevent="handleFalse"
                    @cut.native.capture.prevent="handleFalse">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPasswdChange">修改</el-button>
          <el-button @click="onExitPasswdChange">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
        title="修改用户信息"
        :visible.sync="draw2"
        direction="rtl"
        :close-on-click-modal="false"
        :wrapper-closable="false">
      <div class="leftContainer">
        <el-form ref="ChangeFormRef"
                 :model="ChangeForm" :rules="ChangeFromRules" class="changeForm">
          <!-- 用户名 -->
          <el-form-item label="用户名" :required="true" prop="username">
            <el-input v-model="ChangeForm.username" placeholder="用户名" size="medium">
            </el-input>
          </el-form-item>
          <el-form-item label="昵称" :required="true" prop="nickname">
            <el-input v-model="ChangeForm.nickname" placeholder="昵称" size="medium">
            </el-input>
          </el-form-item>
          <!-- 手机号 -->
          <el-form-item label="手机号" :required="true" prop="phone">
            <el-input v-model="ChangeForm.phone" placeholder="手机号" size="medium">
            </el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" :required="true" prop="email">
            <el-input v-model="ChangeForm.email" placeholder="邮箱" size="medium">
            </el-input>
          </el-form-item>
          <!-- 权限-->
          <el-form-item label="用户角色" :required="true" class="btnItem">
            <el-select v-model="ChangeForm.permission" placeholder="请选择用户角色">
              <el-option label="普通用户" value="commonUser"></el-option>
              <el-option label="快递点员工" value="deliveryStaff"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="当前站点" v-if="this.ChangeForm.permission==='deliveryStaff'" >
            {{this.currentSite}}
          </el-form-item>
          <el-form-item label="站点选择" :required="true" v-if="this.ChangeForm.permission==='deliveryStaff'">
            <el-row><region-group
                :town="true"
                v-model="region"
                @change="siteRegionChange"
                class="regionBox"
            />
            </el-row>
            <el-row>
            <el-col class="line" :span="4">站点名称：</el-col>
            <el-col :span="20">
              <el-select v-model="site_value" filterable placeholder="请选择">
                <el-option
                    v-for="item in site_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
            <el-button @click="onExit">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-dialog
        title="提示"
        :visible.sync="DialogA"
        width="30%">
      <span>按照提示进行修改</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="DialogA = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-header>
      <ManagerHeader></ManagerHeader>
    </el-header>
    <el-container class="containerBottom">
      <el-aside class="aside" width="260px">
        <ManagerAside></ManagerAside>
      </el-aside>
      <el-main>
        <el-col :span="24">
          <div class="rightContainer">
            <el-row>
              <el-col :span="6">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
                  <el-breadcrumb-item :to="{ path: '/ManagerInfoHome' }">信息管理</el-breadcrumb-item>
                  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                </el-breadcrumb>
              </el-col>
              <el-col :span="6">
                <el-select v-model="value" placeholder="请选择" class="searchSelect">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input
                    placeholder="请输入与选择框对应的查询内容"
                    v-model="search_input"
                    class="search">
                  <el-button slot="append" icon="el-icon-search" @click="clicksearch"></el-button>
                </el-input>
              </el-col>
            </el-row>

            <el-table
                :data="tableData"
                class="table"
                border
                height="85%"
            >
              <el-table-column
                  prop="userid"
                  label="id" width="100px">
              </el-table-column>
              <el-table-column
                  prop="username"
                  label="用户名" width="200px">
              </el-table-column>
              <el-table-column
                  prop="nickname"
                  label="昵称"width="200px">
              </el-table-column>
              <el-table-column
                  prop="phone"
                  label="手机号"width="200px">
              </el-table-column>
              <el-table-column
                  prop="email"
                  label="邮箱"width="200px">
              </el-table-column>
              <el-table-column
                  prop="permission"
                  label="角色"
                  width="200px">
              </el-table-column>
              <el-table-column
                  label="操作"
                  width="360px">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">修改
                  </el-button>
                  <el-button
                      size="mini"
                      @click="handlePasswd(scope.$index, scope.row)"
                      type="warning">重置密码
                  </el-button>
                  <el-button
                      size="mini"
                      @click="handleDelete(scope.$index, scope.row)"
                      type="danger">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[4, 8, 12,16]"
                :page-size="4"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="pagination">
            </el-pagination>
          </div>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ManagerAside from "@/components/Manager/ManagerAside";
import ManagerHeader from "@/components/Manager/ManagerHeader";
import request from "@/utils/request";
import {RegionGroup} from "v-region";

export default {
  name: "ManagerHome",
  components: {ManagerAside, ManagerHeader,RegionGroup},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.PasswdForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      tableData: [],
      ChangeForm: {
        userid:"",
        username: "",
        nickname: "",
        phone: "",
        email: "",
        permission: "",
        siteId:0,
      },
      resetpswdForm: {
        userid:1,
        password:"BabyQ123456"
      },
      ChangeFromRules: {
        // 验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 10, message: '长度在 4到 10个字符', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            validator: function (rule, value, callback) {
              if (
                  /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
                      value
                  ) == false
              ) {
                callback(new Error("邮箱格式错误"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,15}$/,
            message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 15位'
          }
        ]
      },
      PasswdForm: {
        passwd: "",
        repasswd: ""
      },
      PasswdFromRules: {
        // 验证用户名是否合法
        passwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,15}$/,
            message: '密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 15位'
          }
        ],
        repasswd: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      },
      search_input: "",
      options: [
          {
        value: 'username',
        label: '用户名'
      }, {
        value: 'phone',
        label: '手机号'
      }, {
        value: 'email',
        label: '邮箱'
      },
        {
          value: 'id',
          label: '用户id'
        }
      ],
      value: "username",
      draw: false,
      draw2: false,
      DialogA: false,
      page_size:4,
      currentPage: 1,
      deleteUserid:1,
      site_options:[
      ],
      site_value: '',
      region: {
      },
      currentSite:"",
    }
  },
  created(){
    this.getUserTotal();
  },
  methods: {
    siteRegionChange (data){
      this.site_options=[];
      this.site_value="";
      if(data.province.value) {
        this.siteRegionData=data.province.value;
        console.log(this.siteRegionData);
      }
      if(data.city.value) {
        this.siteRegionData=data.province.value+data.city.value;
        console.log(this.siteRegionData);
      }
      if(data.area.value) {
        this.siteRegionData=data.province.value+data.city.value+data.area.value;
        console.log(this.siteRegionData);
      }
      if(data.town.value) {
        this.siteRegionData=data.province.value+data.city.value+data.area.value+data.town.value;
        request.get("http://localhost:9090/site/getSitesByRegion",{params:{region:this.siteRegionData}}).then(res=> {
          for(var key in res){
            console.info(key+":"+res[key]);

            this.site_options.push({label:res[key].siteName,value:res[key].siteId});
          };
        });
      }
    },
    getUserTotal()
    {
      this.request.get("http://localhost:9090/user/pagefilter",{params:{pageNum:this.currentPage,pageSize:this.page_size,searchMode: this.value,search_input: this.search_input}})
          .then(res=>
          {
            this.tableData=res.records;
            this.total=res.total;
          })
    },
    handleSizeChange(val){
      this.page_size=val;
      this.getUserTotal();
    },
    handleCurrentChange(val){
      this.currentPage=val;
      this.getUserTotal();
    },
    clicksearch(){
      this.currentPage=1;
      this.getUserTotal();
    },
    deleteUser(){
      this.request.delete("http://localhost:9090/user/delete",{params:{id:this.deleteUserid}})
          .then(res=>
          {
            this.getUserTotal();
          })
    },
    resetUserpassword(){
      this.request.post("http://localhost:9090/user/changeInfo",this.resetpswdForm)
          .then(res=>
          {
            //this.getUserTotal();
          })
    },
    handleEdit(index, row) {
      this.draw2 = true;
      this.ChangeForm.userid = Number(row.userid);
      this.ChangeForm.username = row.username;
      this.ChangeForm.nickname = row.nickname;
      this.ChangeForm.phone = row.phone;
      this.ChangeForm.email = row.email;
      this.ChangeForm.permission = row.permission;
      this.ChangeForm.siteId = row.siteId;
      if(row.siteId)
      {
        request.get("http://localhost:9090/site/getSiteById",{params:{id:row.siteId}}).then(res=>{
          this.currentSite=res.siteRegion+ res.siteName;
        });
      }
    },
    onSubmit() {
      this.$refs["ChangeFormRef"].validate(valid => {
        if (valid) {
          if(this.site_value)
          {
            this.ChangeForm.siteId=Number(this.site_value);
            request.post("http://localhost:9090/user/changeInfo",this.ChangeForm).then(res=> {
              if (res)
              {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
                //修改成功，即刻修改
                this.getUserTotal();
              }
              else
              {
                this.$message({
                  type: 'warning',
                  message: '修改失败'
                });
              }
            });
            this.draw2 = false;
            this.ChangeForm.username = "";
            this.ChangeForm.email = "";
            this.ChangeForm.permission = "";
            this.ChangeForm.phone = "";
            this.ChangeForm.siteId = 0;
            this.currentSite="";
            this.region="";
            this.site_value="";
            this.site_options="";
          }
          else
          {
            request.post("http://localhost:9090/user/changeInfo",this.ChangeForm).then(res=> {
            if (res)
            {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              //修改成功，即刻修改
              this.getUserTotal();
            }
            else
            {
              this.$message({
                type: 'warning',
                message: '修改失败'
              });
            }
          });
            this.draw2 = false;
            this.ChangeForm.username = "";
            this.ChangeForm.email = "";
            this.ChangeForm.permission = "";
            this.ChangeForm.phone = "";
            this.ChangeForm.siteId = 0;
            this.currentSite="";
            this.region="";
            this.site_value="";
            this.site_options="";
          }
        } else {
          this.DialogA = true;
        }
      });
    },
    onExit() {
      this.draw2 = false;
      this.ChangeForm.username = "";
      this.ChangeForm.password = "";
      this.ChangeForm.email = "";
      this.ChangeForm.permission = "";
      this.ChangeForm.phone = "";
      this.ChangeForm.siteId = 0;
      this.currentSite="";
      this.region="";
      this.site_value="";
      this.site_options="";
      this.$message({
        type: 'info',
        message: '已取消修改'
      });
    },
    onPasswdChange() {
      this.$refs["PasswdFormRef"].validate(valid => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '修改密码成功'
          });
          console.log("success submit!!");
          this.PasswdForm.passwd = "";
          this.PasswdForm.repasswd = "";
          this.draw = false;
        } else {
          this.DialogA = true;
          console.log("error submit!!");
          this.PasswdForm.passwd = "";
          this.PasswdForm.repasswd = "";
        }
      });
    },
    onExitPasswdChange() {
      this.$message({
        type: 'info',
        message: '已取消修改'
      });
      this.PasswdForm.passwd = "";
      this.PasswdForm.repasswd = "";
      this.draw = false;
    },
    handlePasswd(index, row) {
      this.$confirm('此操作将重置该用户密码, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.resetpswdForm.userid=Number(row.userid);
        this.resetUserpassword();
        this.$message({
          type: 'success',
          message: '重置密码成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置密码'
        });
      });
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.deleteUserid=Number(row.userid);
        this.deleteUser();
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    search() {
      this.$message({
        type: 'success',
        message: '搜索已提交'
      });
    },
    handleFalse() {
      //终止
      this.$message({
        type: 'info',
        message: '密码框禁止复制粘贴'
      });
      return false;
    },
  }
}
</script>

<style lang="less" scoped>
.containerAll {
  height: 100%;
}

.containerBottom {
  height: 100%;
}

.el-header {
  text-align: right;
  font-size: 12px;
  padding: 0;
}

.el-aside {
  height: 100%;
}

.el-main {
  height: 100%;
  background-color: #fafafa;
}

.el-row {
  height: 100%;
}

.el-col {
  height: 100%;
}

.rightContainer {
  position: relative;
  top: 2.5%;
  left: 2.5%;
  background-color: #ffffff;
  border-radius: 30px;
  width: 95%;
  height: 95%;
}

.leftContainer {
  position: relative;
  top: 2.5%;
  left: 2.5%;
  background-color: #ffffff;
  border-radius: 30px;
  width: 95%;
  height: 95%;
}

.table {
  position: absolute;
  top: 5%;
  left: 2.5%;
  width: 95%;
  margin-top: 2.5%;
}

.pagination {
  position: absolute;
  left: 2.5%;
  top: 95%;
}

.changeForm {
  position: relative;
  left: 10%;
  top: 10%;
  width: 80%;
}

.btnItem {
  margin-top: 30px;
}

.bread {
  font-size: 15px;
  position: relative;
  top: 3.5%;
  left: 10%;
}

.searchSelect {
  position: relative;
  top: 2%;
  width: 130px;
}

.search {
  position: relative;
  top: 2%;
  transform: translate(-50%, 0);
}

.ChangeTitle {
  font-size: 30px;
  position: relative;
  top: 5%;
  left: 30%;
}
</style>