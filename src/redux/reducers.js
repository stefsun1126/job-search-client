import { combineReducers } from 'redux'

import { AUTH_SUCCESS, AUTH_FAIL, SEND_DATA_FAIL, RECIVE_USER, RESET_USER, RECIVE_USER_LIST, RECIVE_MSG_LIST, RECIVE_MSG, LET_MSG_BE_READ } from './action-type'
import { getRedirectTo } from './../utils/index'

const initUser = {
    _id: '',        //用戶基本訊息
    account: '',    //用戶基本訊息
    type: '',       //用戶基本訊息
    msg: '',        //錯誤提示訊息
    redirectTo: ''
}

// 登入/註冊 的使用者資訊
const user = (state = initUser, action) => {
    switch (action.type) {
        // 登入/註冊 成功
        case AUTH_SUCCESS:
            const { data } = action
            // 看有無個人完善資訊過(這裡是看有沒有頭像), 沒有的話導入個人完善頁面 , 有的話導入主頁面
            return { ...action.data, redirectTo: getRedirectTo(data.type, data.avatar) }
        // 登入/註冊 失敗
        case AUTH_FAIL:
            return { ...action.data }
        // 完善個人訊息 成功
        case RECIVE_USER:
            return action.data
        // 完善個人訊息 失敗 (會洗掉_id)
        case RESET_USER:
            return { ...initUser, msg: action.data.msg }
        // 完善個人訊息 失敗 (不會洗掉_id)
        case SEND_DATA_FAIL:
            return { ...state, msg: action.data }

        default:
            return state
    }
}

// 所有對應的人員列表 (老闆 > 顯示應徵者列表 , 應徵者 > 顯示老闆列表)
const userList = (state = [], action) => {
    switch (action.type) {
        case RECIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

// 當前使用者相關聊天紀錄
const initMsgList = {
    users: {},  // key : _id  , value : { account , avatar }
    chatMsgs: [],
    unReadMsgs: 0
}
const msgList = (state = initMsgList, action) => {
    switch (action.type) {
        case RECIVE_MSG_LIST:
            const { users, chatMsgs, userId } = action.data
            return {
                users,
                chatMsgs,
                unReadMsgs: chatMsgs.reduce((total, msg) => total + (msg.to === userId && !msg.read ? 1 : 0), 0)
            }
        case RECIVE_MSG:
            {
                const { chatMsg, userId } = action.data
                const newMsgs = [...state.chatMsgs, chatMsg]
                return {
                    users: state.users,
                    chatMsgs: newMsgs,
                    unReadMsgs: newMsgs.reduce((total, msg) => total + (msg.to === userId && !msg.read ? 1 : 0), 0)
                }
            }
        case LET_MSG_BE_READ:
            const { count, from, to } = action.data
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map((msg) => {
                    if (msg.to === to && msg.from === from && !msg.read) {
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                unReadMsgs: state.unReadMsgs - count
            }
        default:
            return state
    }
}


export default combineReducers({
    user,
    userList,
    msgList,
})


