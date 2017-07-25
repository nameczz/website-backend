export function formateDate(now) {
    let obj = new Date(parseInt(now) * 1000)

    let year = obj.getFullYear();
    let month = obj.getMonth() + 1;
    let date = obj.getDate();
    let hour = obj.getHours();
    let minute = obj.getMinutes();
    let second = obj.getSeconds();

    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
}