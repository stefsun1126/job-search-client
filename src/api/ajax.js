/* 
   使用 axios 封裝 ajax 請求 , 返回的對象會是 promise 
   用處：
   1.拼湊 get url
   2.之後可以使用 async await , await 會阻塞後續程序 , 等待有結果時將結果返回  
*/
import axios from 'axios'

export default function ajax(url, data = {}, type = "GET") {
    // GET
    if (type === "GET") {
        // 將參數拼湊到get url
        // query example -> account=xxx&password=xxx
        let query = ''
        Object.keys(data).forEach((attribute) => {
            query += `${attribute}=${data[attribute]}&`
        })
        // 去掉最後一個& , 因為有可能沒傳參數 , 所以要把這種情況除外
        if (query) {
            query = query.substring(0, query.length - 1)
        }
        return axios.get(`${url}?${query}`)
    } else {
        // POST
        return axios.post(url, data)
    }

}
