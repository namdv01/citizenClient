import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './createManage.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants'

const CreateManage = (props) => {
    const [user, setUser] = useState({
        form: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            location: ''
        },
        body: [{
            name: 'Tên đăng nhập',
            className: 'username',
            placeholder: "tên gồm 2 chữ số",
            type: 'text',
            maxWidth: 2
        },
        {
            name: 'Mật khẩu',
            className: 'password',
            placeholder: "",
            type: 'password',
        },
        {
            name: 'Xác nhận mật khẩu',
            className: 'confirmPassword',
            placeholder: "",
            type: 'password',
        },
        {
            name: 'Email',
            className: 'email',
            placeholder: "",
            type: 'text',
        },
        {
            name: 'Số điện thoại',
            className: 'phone',
            placeholder: "",
            type: 'text',
        },
        {
            name: 'Trực thuộc',
            className: 'location',
            placeholder: 'chỉ nhập cấp đơn vị hành chính',
            type: 'text'
        }]
    });

    const changeItem = (e, className) => {
        user.form[className] = e.target.value;
        setUser({ ...user });
    }

    const removeText = (e) => {
        user.form = {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            phone: '',
            location: ''
        }
        setUser({ ...user });
    }

    const submitText = async (e) => {
        if (!props.toggle) {
            alert('Vì tài khoản đã bị cấm nên không thể tạo thêm cấp dưới');
            return;
        }
        const check = user.body.password === user.body.confirmPassword;
        if (!check) {
            alert('Xác nhận mật khẩu sai');
            return;
        }
        else {
            try {
                const response = await axios.post(`${api}/user/createUser`, user.form);
                console.log(response.data);
                if (response.data.result == 'success') {
                    removeText(e);
                    props.add(response.data.user);
                }

                <Redirect to="/manage" />
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='createManage-main'>
            <div className='create-header'>Thông tin tạo</div>
            {user.body.map((item, index) => {
                return (<div key={index} className='create-item'>
                    <label key={index + 'label'}>{item.name}</label>
                    <input key={index + 'input'} type={item.type}
                        placeholder={item.placeholder}
                        value={user.form[item.className]}
                        name={item.className}
                        maxLength={item.maxWidth ? item.maxWidth : 99}
                        onChange={(e) => { changeItem(e, item.className) }}
                    ></input>
                </div>)
            })}
            <div className="create-submit">
                <button className='create' onClick={e => submitText(e)}>Tạo</button>
                <button className='remove' onClick={e => removeText(e)}>Xóa viết lại</button>
            </div>
        </div>
    )
}

export default CreateManage
