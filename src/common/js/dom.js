// export let apiUrl = 'http://www-api.zhihuiya.com'
export let apiUrl = 'http://192.168.38.19:9000'

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    console.log(newClass)
    newClass.push(className)
    console.log(newClass)
    el.className = newClass.join(' ')
}

export function hasClass(el, className) {
    let reg = new RegExp('(|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function arrSplice(el, num) {
    for (let element of el) {
        element.splice(0, num)
    }
}

export function sortTable(el, str, frontEnd, backEnd, direction) {
    console.log(el)
    if (el === str) {
        return false
    }
    let index = frontEnd.indexOf(el)
    console.log(index)
    frontEnd = backEnd[index]
    direction = direction === 'desc' ? 'asc' : 'desc'

    console.log(this.selectedHead)
}