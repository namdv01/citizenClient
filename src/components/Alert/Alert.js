import React from 'react'
import './alert.scss'
const Alert = ({ isAlert }) => {
    return isAlert ? (
        <div className='alertMes'>
            Sai mật khẩu hoặc tên đăng nhập
        </div>
    ) : (null)
}

export default Alert
