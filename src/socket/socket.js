import io from 'socket.io-client'

// 確保一個 client 只有一個連接的 socket
if (!io.socket) {
    // 連接服務器, 得到連接的 socket 
    io.socket = io('ws://localhost:4000')
}

// 綁定 serverSend 事件監聽, 接收服務器端發過來的訊息
io.socket.on('serverSend', function (data) {
    console.log('瀏覽器接收服務器來的訊息:', data)
})