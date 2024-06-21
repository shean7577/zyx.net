<template>
  <template v-if="JSON.stringify(currentLanguage) !== '{}'">
    <div class="container grid-xl">
      <div class="columns">
        <div class="column col-7 hide-md">
          <div class="pc-left">
            <!-- pc-left-panel -->
            <div class="pc-left-panel">
              <div>
                <!-- logo -->
                <div class="large">{{ com.cfg.siteName }}</div>
                <div class="desc">{{ com.cfg.siteDesc }}</div>

                <!-- panel -->
                <div class="_panel">
                  <!-- 设备 -->
                  <div class="item c-hand -hover" @click="() => {
    messageData.show = true;
    let msg;
    if (deviceType.indexOf('pc') >= 0) {
      msg = currentLanguage.deviceType[0]
    } else if (deviceType.indexOf('pad') >= 0) {
      msg = currentLanguage.deviceType[1]
    } else {
      msg = currentLanguage.deviceType[2]
    }
    messageData.message = currentLanguage.information[1] + '[' + msg + ']';
  }">
                    <div :class="deviceType"></div>
                    <div v-html="currentLanguage.leftPanel.device"></div>
                  </div>

                  <!-- 主题 -->
                  <div class="item c-hand -hover"
                    @click="messageData.show = true; messageData.message = currentLanguage.information[2] + '[' + com.bas.systemTheme() + ']';">
                    <div :class="systemTheme"></div>
                    <div v-html="currentLanguage.leftPanel.theme"></div>
                  </div>

                  <!-- 语言 -->
                  <div class="item dropdown d-block c-hand -hover">
                    <div class="dropdown-toggle" tabindex="0"
                      v-html="'<div class=\'-icon -icon-lan\'></div><div>' + currentLanguage.leftPanel.language + '</div>'">
                    </div>
                    <ul class="menu">
                      <template v-for="(item, index) in com.cfg.lanList">
                        <li class="menu-item" @click="loadLan(item.file)"><a href="javascript:;">{{ item.name }}</a>
                        </li>
                      </template>
                    </ul>
                  </div>

                  <!-- 登录 -->
                  <template v-if="isLogin === true">
                    <div class="item dropdown d-block c-hand -hover">
                      <div class="dropdown-toggle" tabindex="0"
                        v-html="'<div class=\'-icon -icon-user\'></div><div>' + userData.name + '</div>'">
                      </div>
                      <ul class="menu">
                        <template v-for="(item, index) in userMenu">
                          <template v-if="!item.onlyMgr || userData.type === 'manager'">
                            <li class="menu-item"><a href="javascript:;" @click="item.onClick()">{{ item.text }}</a>
                            </li>
                          </template>
                          <template v-else>
                            <li class="menu-item"><a href="javascript:;"><span
                                  class="text-gray">{{ item.text }}</span></a>
                            </li>
                          </template>
                        </template>
                      </ul>
                    </div>
                  </template>
                  <template v-else>
                    <div class="item c-hand -hover" @click="loginData.show = true">
                      <div class="-icon -icon-user"></div>
                      <div v-html="currentLanguage.leftPanel.login"></div>
                    </div>
                  </template>
                </div>

                <!-- footer -->
                <div class="_footer">
                  <div class="desc">{{ com.cfg.siteURL }}</div>
                  <div class="desc">{{ com.cfg.siteInfo }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column col-4 col-md-12 p-0">
          <div class="main-right">
            <!-- 页面 -->
            <router-view :lan="currentLanguage"
              :logsta="{ logsta: (userData && userData.type === 'manager'), isLogin: isLogin }"
              :device="{ icon: deviceType, text: (deviceType.indexOf('pc') >= 0) ? currentLanguage.deviceType[0] : (deviceType.indexOf('pad') >= 0) ? currentLanguage.deviceType[1] : currentLanguage.deviceType[2] }"
              :theme="{ icon: systemTheme, text: com.bas.systemTheme() }" :userData="userData"
              :doLogin="() => { loginData.show = true }" :doMessage="(md) => { messageData = md }"
              :doLogout="() => { goExit() }" :onlanguagechange="e => { loadLan(e) }" />

            <!-- 悬浮菜单 -->
            <van-floating-bubble axis="xy" icon="wap-nav" magnetic="x" @click="goNav" />
          </div>
        </div>
        <div class="column col-1 hide-md">&nbsp;</div>
      </div>
    </div>

    <!-- message window -->
    <message :show="messageData.show" :message="messageData.message"
      :buttons="[{ text: currentLanguage['message-window-btn'], onClick: () => { messageData.show = false } }, { text: currentLanguage['message-window-btn-help'], onClick: () => { messageData.message = currentLanguage.information[4] } }]"
      :close="messageData.close" />

    <!-- login window -->
    <login :show="loginData.show" :cancle="() => { loginData.show = false }" :text="currentLanguage['login-window']"
      :submit="loginSubmit" />

    <!-- exit window -->
    <message :show="showExit" :message="currentLanguage.information[3]"
      :buttons="[{ text: currentLanguage['message-window-btn'], onClick: () => { goExit(); showExit = false; } }, { text: currentLanguage['message-window-btn-cancle'], onClick: () => { showExit = false } }]"
      :close="() => { showExit = false }" />
  </template>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import md5 from 'crypto-js/md5';
  import router from "./router"
  import com from "./common/com"
  import message from "./components/message.vue";
  import login from "./components/login.vue";

  // 消息弹窗
  const messageData = ref({
    show: false,
    message: "",
    close: () => {
      messageData.value.show = false;
    }
  })

  // 登录弹窗
  const loginData = ref({
    show: false
  })

  // 用户数据
  const userData = ref({})

  // userMenu 的排列顺序在语言包里
  const userMenu = ref(com.cfg.userMenu)


  // 退出登录提示
  const showExit = ref(false)

  // 是否一登录
  const isLogin = ref(false)

  const deviceType = ref(com.bas.deviceType() === 'pc' ? "-icon -icon-pc" : (com.bas.deviceType() === 'pad') ? "-icon -icon-pad" : "-icon -icon-mob")
  const systemTheme = ref('-icon -icon-systemTheme-' + com.bas.systemTheme())
  const currentLanguage = ref({})



  onMounted(() => {
    document.title = com.cfg.siteDesc
    loadLan(localStorage.getItem('lan'))
    getLoginStatus();
  })

  // 加载语言包
  const loadLan = (lan) => {
    if (!lan || lan === '') lan = 'ch'
    com.bas.currentLanguage(lan).then(e => {
      currentLanguage.value = e
      for (let i = 0; i < e.userMenu.length; i++) {
        userMenu.value[i].text = currentLanguage.value.userMenu[i]
      }
      localStorage.setItem('lan', lan);
    })
  }

  // 获取登录状态
  const getLoginStatus = () => {
    const cond = (localStorage.getItem('memberData') && localStorage.getItem('memberData').length > 35);
    //debugger
    isLogin.value = cond
    userData.value = JSON.parse(localStorage.getItem('memberData'))
  }

  // 登录提交
  const loginSubmit = (data) => {
    if (data.name === "" || data.pswd === '') {
      messageData.value.message = currentLanguage.value.information[6]
      messageData.value.show = true
      return;
    }
    data.pswd = md5(data.pswd).toString()
    com.api('memberLogin', data).then(e => {
      let cond = !e.data.id || !e.data.type || !e.data.name;
      if (cond) {
        messageData.value.message = currentLanguage.value.information[5] + "<br/>" + currentLanguage.value.information[7]
      } else {
        messageData.value.message = currentLanguage.value.information[5] + "<br/>" + currentLanguage.value.information[8]
      }
      messageData.value.show = true
      isLogin.value = false
      if (cond) return;
      isLogin.value = true
      userData.value = e.data
      if (data.keepSession === true) {
        localStorage.setItem('memberData', JSON.stringify(e.data))
      } else {
        localStorage.removeItem('memberData')
      }
    }).catch(e => {
      messageData.value.message = currentLanguage.value.information[5] + "<br/>" + e.message
      messageData.value.show = true
    })
  }

  // 注销登录
  const goExit = () => {
    isLogin.value = false;
  }

  // 全局浮动菜单按钮点击事件
  const goNav = () => {
    let url = location.href
    if (url.indexOf('/nav') >= 0) {
      router.push('/')
    } else {
      router.push('/nav')
    }
  }
</script>

<style scoped></style>