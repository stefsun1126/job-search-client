import io from 'socket.io-client'

// 連接服務器, 得到連接的 socket 對象
const socket = io('ws://localhost:4000')

// 綁定 serverSend 事件監聽, 接收服務器端發過來的訊息
socket.on('serverSend', function (data) {
    console.log('瀏覽器接收服務器來的訊息:', data)
})
// 向服務端發送消息
socket.emit('clientSend', { name: 'Tom', date: Date.now() })
console.log('客戶端向服務器端發送消息:', { name: 'Tom', date: Date.now() })