/* 放所有工具函數 */

// 有頭像 -> 主頁面
// 沒有頭像 -> 完善頁面

export function getRedirectTo(type, avatar) {
    let path = ''

    if (type === '0') {
        path = '/worker'
    } else {
        path = '/boss'
    }

    if (!avatar) {
        path += 'info'
    }

    return path
}