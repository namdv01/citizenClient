import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from "../../contexts/constants";
import './profile.scss';

const Profile = () => {
    const [profile, setProfile] = useState({
        items: [
            {
                name: 'Cấp',
                value: ''
            },
            {
                name: 'Tên đăng nhập',
                value: ''
            },
            {
                name: 'Mật khẩu',
                value: ''
            },
            {
                name: 'Email liên hệ',
                value: ''
            },
            {
                name: 'Trực thuộc',
                value: ''
            },
            {
                name: 'Trạng thái',
                value: ''
            }
        ],
        update: {
            password: '',
            newPassword: ''
        }
    })
    const loadProfile = async () => {
        try {
            const response = await axios.get(`${api}/user/profile`);
            // console.log(response.data);
            if (response.data.result == 'success') {
                const data = response.data.user;

                const items = [
                    {
                        name: 'Cấp',
                        value: data.level
                    },
                    {
                        name: 'Tên đăng nhập',
                        value: data.username
                    },
                    {
                        name: 'Mật khẩu',
                        value: '................'
                    },
                    {
                        name: 'Email liên hệ',
                        value: data.email
                    },
                    {
                        name: 'Điện thoại liên hệ',
                        value: data.phone
                    },
                    {
                        name: 'Trạng thái',
                        value: data.isToggle ? 'Active' : 'Non active'
                    },
                    {
                        name: 'Đơn vị hành chính',
                        value: data.location
                    }
                ]
                setProfile({ ...profile, items });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const changePassword = async (e) => {
        document.querySelector('.item-hide').classList.toggle('non-active');
        document.querySelector('.changePassword').classList.add('non-active');
    }
    const changeCur = (e) => {
        profile.update.password = e.target.value;
        setProfile({ ...profile });
    }
    const changeNew = (e) => {
        profile.update.newPassword = e.target.value;
        setProfile({ ...profile });
    }
    const updatePass = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/user/changePassword`, profile.update);
            console.log(response.data);
            if (response.data.result === 'change success') {
                document.querySelector('.changePassword').classList.remove('non-active');
                document.querySelector('.item-hide').classList.toggle('non-active');
                alert('Thay đổi mật khẩu thành công');
                profile.update.password = '';
                profile.update.newPassword = '';
                setProfile({ ...profile });
            }
            else {
                alert('sai mật khẩu');
            }
        } catch (error) {
            console.log(error);
            alert('thất bại');
        }

    }

    // loadProfile();
    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <div className='profile-main'>
            <div className='profile-title'>Thông tin cá nhân</div>
            {profile.items.map((item, index) => {
                if (item.name == 'Mật khẩu') return (<>
                    <div className='profile-item' key={index}>
                        <h4 className='profile-itemName'>{item.name}</h4>
                        <span className='spacing2dot'>:</span>
                        <p className='profile-itemValue'>{item.value}</p>
                        <button className='changePassword' onClick={e => changePassword(e)}>Thay đổi mật khẩu</button>
                    </div>
                    <div className='profile-item non-active item-hide'>
                        <div className='currentPass'>
                            <label>Nhập mật khẩu cũ</label>
                            <input name="password"
                                value={profile.update.password}
                                type="password"
                                onChange={e => changeCur(e)}
                            />
                        </div>
                        <div className='newPass'>
                            <label>Nhập mật khẩu mới</label>
                            <input name="newPassword"
                                value={profile.update.newPassword}
                                type="password"
                                onChange={e => changeNew(e)}
                            />
                        </div>
                        <button className='updatePass' onClick={(e) => updatePass(e)}>Cập nhật</button>
                    </div>
                </>)
                else return (<>
                    <div className='profile-item' key={index}>
                        <h4 className='profile-itemName'>{item.name}</h4>
                        <span className='spacing2dot'>:</span>
                        <p className='profile-itemValue'>{item.value}</p>
                    </div>
                </>)
            })}
        </div>
    )
}

export default Profile
