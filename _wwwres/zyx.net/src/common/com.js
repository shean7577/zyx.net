import router from '../router'
import { useRoute } from 'vue-router';
const cfg = {
    siteName: "”张同学”",
    siteDesc: "张同学·正少年",
    siteURL: "www.zhangyixuan.net",
    siteInfo: "请勿转载本站原创类内容",
    lanList: [{ name: '简体中文', file: 'ch' }, { name: 'English', file: 'en' }],
    api: "/api",
    userMenu: [
        //我的信息
        {
            text: '',
            onClick: () => { router.push('/account') },
            icon: 'user'
        },
        //网站管理
        {
            text: '',
            onClick: () => {
                router.push('/mgr')
            },
            onlyMgr: true,
            icon: 'setup'
        },
        //清空我的登录状态
        {
            text: '',
            onClick: () => {
                const cond = (localStorage.getItem('memberData') && localStorage.getItem('memberData').length > 10);
                if (cond) {
                    localStorage.removeItem('memberData')
                    messageData.value.message = currentLanguage.value.information[5] + "<br/>" + currentLanguage.value.information[8]
                } else {
                    messageData.value.message = currentLanguage.value.information[5] + "<br/>" + currentLanguage.value.information[9]
                }
                messageData.value.show = true
            },
            icon: 'reset'
        },
        //退出登录
        {
            text: '',
            onClick: () => {
                showExit.value = true;
            },
            icon: 'exit'
        },
    ]
}

const bas = {
    deviceType: () => {
        const screenWidth = window.innerWidth;
        let type;
        if (screenWidth > 450 && screenWidth < 1000) {
            type = 'pad'
        } else if (screenWidth <= 449) {
            type = 'mob'
        } else {
            type = 'pc'
        }
        return type;
    },
    systemTheme: () => {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme)');
        if (mediaQueryList.matches) {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
            if (prefersDarkScheme.matches) {
                return 'dark';
            } else if (prefersLightScheme.matches) {
                return 'light';
            }
        }
        return 'none';
    },
    currentLanguage: (lanName) => {
        return new Promise((resolve) => {
            fetch(bas.getPath('lan/' + lanName + '.json')).then(e => {
                e.json().then(e => { resolve(e) })
            })
        })
    },
    getPath: (resStr) => {
        return new URL(`../assets/${resStr}`, import.meta.url).href
    },
    pageInput: (paramName) => {
        const r = useRoute()
        let val = r.query[paramName]
        if (!val) {
            return false
        } else {
            return val
        }
    }
}

const api = (url, data) => {
    return new Promise((resolve) => {
        fetch(cfg.api + url, { body: JSON.stringify(data), method: "POST", headers: { 'content-type': 'application/json' } }).then(e => {
            e.json().then(e => { resolve(e) }).catch(e => { resolve(e) })
        })
            .catch(e => {
                resolve(e)
            })
    })
}

export default {
    cfg, bas, api
}