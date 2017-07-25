import axios from 'axios'
import Vue from 'vue'
import { apiUrl } from 'common/js/dom'
// 新增blog
export function postBlog() {
    let url = `${apiUrl}/admin/patsnap/articles`
    axios.post(url, {
        // 携带cookie
        withCredentials: true
    }).then((res) => {
        let datas = res.data.data
        for (let i = 0; i < datas.length; i++) {

            Vue.set(options, i, datas[i].codeName)
            Vue.set(optionsId, i, datas[i].codeId)
        }
    })
}