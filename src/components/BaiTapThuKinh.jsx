import React, { Component } from 'react'
import Body from './Body'
import Header from './Header'

export default class BaiTapThuKinh extends Component {
    render() {
        return (
            <div
                className='wrapper'
                style={{ backgroundImage: "url('./image/background.jpg')", backgroundSize: "100% 100%", minHeight: "100vh" }}
            >
                <div style={{ backgroundColor: "rgba(0,0,0,0.4)", minHeight: "100vh" }}>
                    <Header />
                    <Body />
                </div>
            </div>
        )
    }
}
