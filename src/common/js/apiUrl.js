import { apiUrl } from 'common/js/dom'

export function getPageUrl(type, selectedPage) {
    return `${apiUrl}/admin/patsnap/${type}/index/page:${selectedPage}`
}

export function getSortUrl(type, selectedHead, direction) {
    return `${apiUrl}/admin/patsnap/${type}/index/sort:${selectedHead}/direction:${direction}`
}

export function getOriginUrl(type) {
    return `${apiUrl}/admin/patsnap/${type}`
}
export function getSingleUrl(type, id) {
    return `${apiUrl}/admin/patsnap/${type}/${id}`
}


export function getSystemPageUrl(selectedPage, selectedOption) {
    return `${apiUrl}/admin/system/code_info/index/page:${selectedPage}?codeId=${selectedOption}`
}

export function getSystemSortUrl(selectedHead, direction, selectedOption) {
    return `${apiUrl}/admin/system/code_info/index/sort:${selectedHead}/direction:${direction}?codeId=${selectedOption}`
}

export function getSystemOriginUrl() {
    return `${apiUrl}/admin/system/code_type`
}
export function getSystemCodenameUrl(selectedOption) {
    return `${apiUrl}/admin/system/code_info?codeId=${selectedOption}`
}