import axios from 'axios'
// 设置页码总数
export function getTotalPages(url, totalPages) {
    return axios.get(url, {
        // 携带cookie
        withCredentials: true
    })
}