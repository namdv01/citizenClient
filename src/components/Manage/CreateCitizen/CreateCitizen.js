import React, { useState } from 'react'
import './createCitizen.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants'
import { Redirect } from 'react-router-dom'
import file from '../../../assets/txt/khaibaocongdan.docx'

const CreateCitizen = (props) => {
    const [state, setState] = useState({
        form: {
            fullname: '',
            birthday: '',
            idCard: '',
            job: '',
            educational: '',
            phone: '',
            regularAdress: '',
            temporaryAdress: '',
            religion: '',
            gender: '',
        },
        body: [
            {
                name: 'Họ tên',
                className: 'fullname',
                placeholder: 'Đầy đủ họ tên',
                type: 'text'
            },
            {
                name: 'Ngày sinh',
                className: 'birthday',
                placeholder: 'yyyy/mm/dd',
                type: 'text'
            },
            {
                name: 'CMND/CCCD',
                className: 'idCard',
                placeholder: 'CMND hoặc CCCD mới nhất',
                type: 'text'
            },
            {
                name: 'Công việc',
                className: 'job',
                placeholder: 'Công việc hiện thời',
                type: 'text'
            },
            {
                name: 'Trình độ',
                className: 'educational',
                placeholder: '',
                type: 'text'
            },
            {
                name: 'Số điện thoại liên hệ',
                className: 'phone',
                placeholder: '',
                type: 'text'
            },
            {
                name: 'Địa chỉ thường trú',
                className: 'regularAdress',
                placeholder: '',
                type: 'text'
            },
            {
                name: 'Địa chỉ bán trú',
                className: 'temporaryAdress',
                placeholder: '',
                type: 'text'
            },
            {
                name: 'Tôn giáo',
                className: 'religion',
                placeholder: '',
                type: 'text'
            },

        ]
    })

    const changeItem = (e, className) => {
        state.form[className] = e.target.value;
        setState({ ...state });
    }

    const changeGender = (e) => {
        state.form.gender = e.target.value;
        setState({ ...state });
    }

    const removeText = (e) => {
        state.form = {
            fullname: '',
            birthday: '',
            idCard: '',
            job: '',
            educational: '',
            phone: '',
            regularAdress: '',
            temporaryAdress: '',
            religion: '',
            gender: '',
        }
        setState({ ...state });
    }

    const submitText = async (e) => {
        if (!props.toggle) {
            alert('Vì tài khoản đã bị cấm nên không thể tạo thêm người dân');
            return;
        }

        else {
            try {
                const response = await axios.post(`${api}/citizen/createCitizen`, state.form);
                console.log(response.data);
                if (response.data.result == 'success') {
                    removeText(e);
                    props.add(response.data.citizen);
                }

                <Redirect to="/manage" />
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='cre-ci-main'>
            <div>Form nhập liệu công dân
                <span>
                    <a href={file} download>Download file khai báo công dân</a>
                </span>
            </div>
            <div className='cre-ci-form'>
                {state.body.map((item, index) => {
                    return <div key={index} className='cre-ci-item'>
                        <label key={index + 'label'}>{item.name}</label>
                        <input key={index + 'input'} type={item.type}
                            placeholder={item.placeholder}
                            value={state.form[item.className]}
                            name={item.className}
                            onChange={(e) => { changeItem(e, item.className) }}
                        ></input>
                    </div>
                })}
                <div key={state.body.length} className='cre-ci-item'>
                    <label key={state.body.length + 'label'}>Giới tính</label>
                    <span>Nam</span>
                    <input type='radio' name="gender" value='male' onChange={e => changeGender(e)} />
                    <span>Nữ</span>
                    <input type='radio' name="gender" value='female' onChange={e => changeGender(e)} />
                </div>
                <div className="cre-ci-sub">
                    <button className='create' onClick={e => submitText(e)}>Thêm</button>
                    <button className='remove' onClick={e => removeText(e)}>Xóa viết lại</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCitizen
