// 排序获取数据
// el : 点击表头emit 出来的数据 
// type: 按什么类型排序
// direction: asc / dsc 所有类型公用一个direction变量
export function sortDom(el, theads, tables, type, sortUrl, direction) {
    let len = this.tables.id.length
    type = el

    // arrSplice([this.tables.id, this.tables.title, this.tables.path], len)
    getCurrentTable(sortUrl, theads, tables)
    direction = direction === 'asc' ? 'dsc' : 'asc'
}