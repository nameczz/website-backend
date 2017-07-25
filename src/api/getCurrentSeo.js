import axios from 'axios'
// data ----
export function getCurrentTable(url) {
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
                        tables[index].push(data[index])
                    }
                }
            }
        }
        equalLength(res.data.data, tables)
        console.log(tables)
    }).catch((err) => {
        console.log(err)
    })
}