import { reqRegister, reqLogin, reqUpdate, reqGetUser, reqGetUserList, reqGetChatMsgs, reqReadMsgs } from './../api/api-interface'

import { AUTH_SUCCESS, AUTH_FAIL, SEND_DATA_FAIL, RECIVE_USER, RESET_USER, RECIVE_USER_LIST, RECIVE_MSG_LIST, RECIVE_MSG, LET_MSG_BE_READ } from './action-type'

import io from 'socket.io-client'

function initSocket(dispatch, userId) {
    // 確保一個 client 只有一個連接的 socket
    if (!io.socket) {
        // 連接服務器, 得到連接的 socket 
        io.socket = io('ws://localhost:4000')
    }

    // 綁定 serverSend 事件監聽, 接收服務器端發過來的訊息
    io.socket.on('serverSend', function (chatMsg) {
        console.log('瀏覽器接收服務器來的訊息:', chatMsg)
        // 後台是直接發給所有的 socket , 所以要將是跟自己相關的訊息再塞到 redux
        if (chatMsg.to === userId || chatMsg.from === userId) {
            console.dir("userid : " + userId)
            dispatch(reciveMsg({ chatMsg, userId }))
        }
    })
}

// 驗證 成功 (同步)
const authSuccess = (user) => (
    {
        type: AUTH_SUCCESS,
        data: user
    }
)

// 驗證 失敗 (同步)
const authFail = (msg) => (
    {
        type: AUTH_FAIL,
        data: {
            msg: msg
        }
    }
)

// 接收使用者資訊 同步
const reciveUser = (user) => (
    {
        type: RECIVE_USER,
        data: user
    }
)

// SEND_DATA_FAIL
const sendDataFail = (msg) => (
    {
        type: SEND_DATA_FAIL,
        data: msg
    }
)

// 重置 user state  同步
export const resetUser = (msg) => (
    {
        type: RESET_USER,
        data: {
            msg: msg
        }
    }
)

// 接收使用者列表 同步
const reciveUserList = (users) => (
    {
        type: RECIVE_USER_LIST,
        data: users
    }
)

// 讀取聊天訊息 同步
const letMsgBeRead = ({ count, from, to }) => (
    {
        type: LET_MSG_BE_READ,
        data: { count, from, to }
    }
)

// 接收聊天訊息列表 同步
const reciveMsgList = ({ users, chatMsgs, userId }) => (
    {
        type: RECIVE_MSG_LIST,
        data: { users, chatMsgs, userId }
    }
)

// 接收聊天訊息 同步
const reciveMsg = ({ chatMsg, userId }) => (
    {
        type: RECIVE_MSG,
        data: { chatMsg, userId }
    }
)


// call 註冊 api (異步兼同步)
export const register = (account, password, confirmPwd, type) => {
    // 同步 前端驗證
    if (!account) {
        return authFail('帳號不得為空')
    } else if (!password) {
        return authFail('密碼不得為空')
    } else if (password !== confirmPwd) {
        return authFail('確認密碼輸入不一致')
    } else if (!type) {
        return authFail('請選擇登入類型')
    }

    return async (dispatch) => {
        // 異步 後端回應
        // 發送註冊請求
        const response = await reqRegister(account, password, type)
        const responseData = response.data
        // 判斷使否註冊成功
        if (responseData.code === 0) {
            // 成功
            dispatch(authSuccess(responseData.data))
            // 獲取聊天訊息
            getMsgList(dispatch, responseData.data._id)
        } else {
            // 失敗
            dispatch(authFail(responseData.msg))
        }
    }
}

// call 登入 api (異步兼同步)
export const login = (account, password) => {
    // 同步 前端驗證
    if (!account) {
        return authFail('帳號不得為空')
    } else if (!password) {
        return authFail('密碼不得為空')
    }
    return async (dispatch) => {
        // 發送登入請求
        const response = await reqLogin(account, password)
        const responseData = response.data
        // 判斷使否登入成功
        if (responseData.code === 0) {
            // 成功
            dispatch(authSuccess(responseData.data))
            // 獲取聊天訊息
            getMsgList(dispatch, responseData.data._id)
        } else {
            // 失敗
            dispatch(authFail(responseData.msg))
        }
    }
}


// 更新 完善個人訊息 (異步)
export const update = (userInfo) => {
    // 同步 前端驗證 後端也有判 但也可以在這就先擋掉
    if (!userInfo.avatar) {
        return sendDataFail('頭像必填')
    }
    return async (dispatch) => {
        // 發送更新請求
        const response = await reqUpdate(userInfo)
        const responseData = response.data
        // 判斷是否更新成功
        if (responseData.code === 0) {
            // 成功 接收新的 user data 並更改 user state
            dispatch(reciveUser(responseData.data))
            // 獲取聊天訊息
            getMsgList(dispatch, responseData.data._id)
        } else {
            // 失敗 init user state , 會錯誤是因為沒收到 _id , 所以讓洗掉 user state 資訊 , 重登入 
            dispatch(resetUser(responseData.msg))
        }
    }
}


// 根據 cookies userid 返回 user 資料 (異步)
export const getUser = () => {
    return async (dispatch) => {
        // 發送獲取user請求
        const response = await reqGetUser()
        const responseData = response.data
        // 判斷是否獲取成功
        if (responseData.code === 0) {
            // 獲取聊天訊息
            getMsgList(dispatch, responseData.data._id)
            // 成功 
            dispatch(reciveUser(responseData.data))
        } else {
            // 失敗 
            dispatch(resetUser(responseData.msg))
        }
    }
}

// 根據 cookies userid 返回 user 資料 (異步)
export const getUserList = (type) => {
    return async (dispatch) => {
        // 發送獲取user請求
        const response = await reqGetUserList(type)
        const responseData = response.data
        // 判斷是否獲取成功
        if (responseData.code === 0) {
            // 成功 
            dispatch(reciveUserList(responseData.data))
        }
    }
}


// 發送聊天訊息 (異步 使用 websoket)
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        // send msg to server
        io.socket.emit('clientSend', { from, to, content })
    }
}


// 讀取訊息 (異步)
export const readMsgs = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsgs(from)
        const responseData = response.data
        // 判斷是否獲取成功
        if (responseData.code === 0) {
            // 成功 
            dispatch(letMsgBeRead({ count: responseData.data, from, to }))
        }
    }
}


// 讀取聊天訊息 , 要在確認cookies裡有 userid 的時候才能讀取 
// 所以讀取時機有三個 : 註冊.登入.自動登入(getUsers時,因為自動登入會直接跳到主頁面)
// 這邊就先寫一個異步方法 給那三個時機調用
async function getMsgList(dispatch, userId) {
    // init socket
    // 一開始就建立 soket 連線 (所以也可以在那三個時機做)
    initSocket(dispatch, userId)
    const response = await reqGetChatMsgs()
    const responseData = response.data
    const { users, chatMsgs } = responseData.data
    // 判斷是否獲取成功
    if (responseData.code === 0) {
        // 成功 
        dispatch(reciveMsgList({ users, chatMsgs, userId }))
    }
}


