import React from "react"
import { Button } from "antd-mobile"
export default class NotFound extends React.Component {
    // 當接收到無效路由時 , 展示這個元件
    render() {
        return (
            <div>
                <div>
                    <h2>查無頁面</h2>
                    <Button
                        type="primary"
                        onClick={() => this.props.history.replace("/")}
                    >
                        回到首頁
                    </Button>
                </div>
            </div>
        )
    }
}
