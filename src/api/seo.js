import axios from 'axios'
import Vue from 'vue'
// 设置seo页面的codeName / id ----
export function getSeoKeywords(url, options, optionsId) {
    axios.get(url, {
        // 携带cookie
        withCredentials: true
    }).then((res) => {
        let datas = res.data.data
        console.log(datas)
        for (let i = 0; i < datas.length; i++) {

            Vue.set(options, i, datas[i].codeName)
            Vue.set(optionsId, i, datas[i].codeId)
        }
        console.log(optionsId)
    })
}

export function getSmallKeywords(url, options, optionsId) {
    axios.get(url, {
        // 携带cookie
        withCredentials: true
    }).then((res) => {
        let datas = res.data.data
        console.log(datas)
        for (let i = 0; i < datas.length; i++) {
            Vue.set(options, i, datas[i].value)
            Vue.set(optionsId, i, datas[i].infoCode)
        }
    })
}