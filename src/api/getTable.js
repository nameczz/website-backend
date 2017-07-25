import axios from 'axios'
let date = require('common/js/date.js')

// 创建表格数据 ---- 父组件的theads 和tables的key必须相同 
export function getCurrentTable(url, theads, tables) {
    let list = []

    for (let str of theads) {
        list.push(str)
    }
    // 清空table
    for (let str of list) {
        if (tables[str]) tables[str].splice(0, tables[str].length)
    }
    // 获取数据
    axios.get(url, {
        // 携带cookie
        withCredentials: true
    }).then((res) => {
        let datas = res.data.data
        for (let key in datas) {
            let data = datas[key]

            for (let str of list) {
                for (let index in tables) {
                    if (index === str) {
                        if (index === 'createtime') {
                            data[index] = date.formateDate(data[index])
                        }
                        tables[index].push(data[index])
                    }
                }
            }
        }
        equalLength(res.data.data, tables)
        console.log(res)
    })

}

function equalLength(obj1, obj2) {
    let len = obj1.length
    let len2 = 0

    for (let key in obj2) {
        len2++
    }
    if (len < len2) return false
    for (let i = len2; i < len; i++) {
        obj2[i] = 'empty'
    }
}