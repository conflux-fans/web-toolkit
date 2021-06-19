<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header style="background: #409eff">
        <el-row class="full-height" type="flex" align="middle" justify="left">
          <el-col :span="6">
            <label class="white-font bold-font">{{
              $t("message.title")
            }}</label>
          </el-col>


          <el-col :offset="16" :span="2">
            <el-dropdown @command="handleLangCommand" class="full-width">
              <div
                class="el-dropdown-link full-width bold-font right-align"
                style="color: white"
              >
                {{ localeText
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
                <el-dropdown-item command="en">en</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>



      

      <el-main class="main-background">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/address-filter">Address Filter</router-link>
        </div>
          
        <router-view/>
        
      </el-main>
    </el-container>
    
  </div>
</template>

<script>

export default {
  components: {
    // FaucetPanel,
  },
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    localeText() {
      switch (this.$i18n.locale) {
        case "zh-CN":
          return "中文";
        default:
          return this.$i18n.locale;
      }
    },
  },
  mounted() {
    // 读取本地化信息
    if (localStorage.locale) {
      this.$i18n.locale = localStorage.locale;
    }    
  },

  methods: {
    // 选择语言选项时触发的函数
    handleLangCommand(locale) {
      this.$i18n.locale = locale;
      localStorage.locale = locale;
    },
    
    processError(err) {
      this.$alert(err.message, this.$t("message.error.error"));
    },
  },
};
</script>


<style>
html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.main-background {
  background: #ebeef5;
}

.full-height {
  height: 100%;
}

.full-width {
  width: 100%;
}

.right-align {
  text-align: right;
}

.center-align {
  text-align: center;
}

.bold-font {
  font-weight: bold;
}

.white-font {
  color: white;
}

.el-card {
  margin: 10px;
}

.lang-select {
  background: none;
}

.no-break {
  word-break: normal;
}

#nav {
  padding: 0 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
