/* 定義請求接口 , 對照 api 文件定義*/

import ajax from './ajax'

// 註冊
export const reqRegister = (account, password, type) => {
    return ajax(
        '/users/register',
        {
            account: account,
            password: password,
            type: type,
        },
        'POST'
    )
}

// 登入
export const reqLogin = (account, password) => {
    return ajax(
        '/users/login',
        {
            account: account,
            password: password,
        },
        'POST'
    )
}

// 更新用戶資訊 (完善用戶訊息)
// 因為這可能會參數不固定所以直接傳物件
export const reqUpdate = ({ avatar, info, post, salary, company }) => {
    return ajax(
        '/users/update',
        { avatar, info, post, salary, company },
        'POST'
    )
}


// 根據 cookies裡的 userid 獲取 user 資料
export const reqGetUser = () => {
    return ajax('/users/user')
}


// 根據特定用戶類型獲取user list資料
export const reqGetUserList = (type) => {
    return ajax('/users/userlist', { type })
}


// 返回所有用戶及當前用戶之相關聊天訊息
export const reqGetChatMsgs = () => {
    return ajax('/chats/msglist')
}


// 修改特定人發給當前使用者的訊息為已讀
export const reqReadMsgs = (from) => {
    return ajax('/chats/readmsg', { from }, 'POST')
}


