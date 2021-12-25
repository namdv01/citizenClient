import React, { useEffect, useState } from 'react'
import './infoManage.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants';

const InfoManage = (props) => {
    const inferior = props.init;
    const [copy, setCopy] = useState({
        isCopy: false,
        users: [],
        size: 5,
        page: 0,
        totalPage: []
    })

    const loadData = async () => {
        try {
            const response = await axios.get(`${api}/user/inferior`);
            // console.log(response.data.user);
            if (response.data.result == 'success') {
                const items = response.data.user;
                copy.totalPage = []
                for (let i = 0; i < response.data.user.length; i++) {
                    if (i % copy.size == 0) {
                        copy.totalPage.push(i / copy.size);
                    }
                }
                props.set(items);
                setCopy({ ...copy, isCopy: true, users: items });
                console.log(copy);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeState = async (e, item) => {
        e.preventDefault();
        console.log(props.toggle);
        if (props.toggle == false) {
            alert('Vì tài khoản đã bị cấm nên không thể thực thi thay đổi quyền cho cấp dưới');
            return;
        }
        else {
            try {
                if (item.isToggle) {
                    const response = await axios.get(`${api}/user/turnOffState/${item.username}`);
                    console.log(response.data);
                    if (response.data.result == 'success') {
                        item.isToggle = false;
                        props.set(inferior)
                    }
                }
                else {
                    const response = await axios.get(`${api}/user/turnOnState/${item.username}`);
                    if (response.data.result == 'success') {
                        item.isToggle = true;
                        props.set(inferior);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const changeInfo = async (e, item, index) => {
        console.log(e.target.parentNode.parentNode);
        const tr = e.target.parentNode.parentNode;
        const li = tr.querySelectorAll('.repair input');
        console.log(li);
        li.forEach((i, index) => {
            i.classList.remove('none');
        })

        tr.querySelector(`.re-u-btn${index}`).classList.add('none');
        tr.querySelector(`.de-u-btn${index}`).classList.add('none');
        tr.querySelector(`.re-u-submit${index}`).classList.remove('none');
    }

    const valueChange = async (e, item, index, key) => {
        copy.users[index][key] = e.target.value;
        setCopy({ ...copy });
    }

    const submitInfo = async (e, item, index) => {
        const tr = e.target.parentNode.parentNode;
        tr.querySelector(`.re-u-btn${index}`).classList.remove('none');
        tr.querySelector(`.de-u-btn${index}`).classList.remove('none');
        tr.querySelector(`.re-u-submit${index}`).classList.add('none');
        const li = tr.querySelectorAll('.repair input');
        console.log(li);
        li.forEach((i, index) => {
            i.classList.add('none');
        })

        try {
            const data = {
                phone: copy.users[index].phone,
                location: copy.users[index].location,
                email: copy.users[index].email,
            }
            const response = await axios.post(`${api}/user/repair/${copy.users[index]._id}`, data);
            console.log(response.data);
            if (response.data.result == 'success') {
                loadData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const remove = async (e, item, index) => {
        if (!window.confirm(`Bạn sẽ xóa ${item.location} `)) {
            return;
        }
        try {
            const response = await axios.get(`${api}/user/remove/${item.username}`);
            if (response.data.result == 'success') {
                loadData()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const colorState = (state) => {
        if (state) return {
            'color': 'green'
        }
        return {
            'color': 'red'
        }
    }

    const setPage = (e, i) => {
        copy.page = i;
        setCopy({ ...copy });
    }

    useEffect(() => {
        loadData();
        console.log(props.isToggle);
    }, []);

    return (<>
        {window.innerWidth >= 1024 ? <>
            <div className='infoManage-main'>

                <table>
                    <thead>
                        <th>STT</th>
                        <th>username</th>
                        <th>Đơn vị trực thuộc</th>
                        <th>Số điện thoại</th>
                        <th>Trạng thái</th>
                        <th>Email liên hệ</th>
                        <th colspan="2">Thao tác</th>
                    </thead>
                    <tbody>
                        {copy.isCopy ?
                            <>
                                {
                                    inferior.map((item, index) => {
                                        console.log(item.isToggle);
                                        if (index >= copy.page * copy.size && index < (copy.page + 1) * copy.size)
                                            return (<tr>
                                                <td>{index + 1}</td>
                                                <td>{item.username}</td>
                                                <td className='repair'>
                                                    <span>{item.location}</span>
                                                    <input type='text'
                                                        value={item.location}
                                                        onChange={(e) => valueChange(e, item, index, 'location')}
                                                        className='none'
                                                    ></input>
                                                </td>
                                                <td className='repair'>
                                                    <span>{item.phone}</span>
                                                    <input type='text'
                                                        value={item.phone}
                                                        onChange={(e) => valueChange(e, item, index, 'phone')}
                                                        className='none'
                                                    ></input>
                                                </td>
                                                <td>
                                                    <span style={colorState(item.isToggle)}>{item.isToggle ? 'Active' : 'Non Active'}</span>
                                                    <button onClick={e => changeState(e, item)}>bật tắt quyền hạn</button>
                                                </td>
                                                <td className='repair'>
                                                    <span>{item.email}</span>
                                                    <input type='text'
                                                        value={item.email}
                                                        onChange={(e) => valueChange(e, item, index, 'email')}
                                                        className='none'
                                                    ></input>
                                                </td>
                                                <td>
                                                    <button
                                                        className={`re-u-btn${index}`}
                                                        onClick={e => changeInfo(e, item, index)}>Sửa</button>
                                                    <button
                                                        className={`de-u-btn${index}`}
                                                        onClick={(e) => { remove(e, item, index) }}>Xóa</button>
                                                    <button
                                                        className={`re-u-submit${index} none`}
                                                        onClick={e => submitInfo(e, item, index)}>Cập nhật</button>
                                                </td>
                                            </tr>)
                                    })
                                }
                            </> : <></>}
                    </tbody>
                </table>
                <div className='ma-page'>
                    {copy.totalPage.map(i => {
                        return <span onClick={e => setPage(e, i)}
                            className={`m-page${i + 1} ` + (i == copy.page ? 'ma-choose' : '')}>
                            {i + 1}
                        </span>
                    })}
                </div>
            </div>
        </>
            // ranh giới
            : <>
                <div className='infoManage-main'>
                    <div>Danh sách cấp dưới</div>
                    {copy.isCopy ?
                        <>
                            {
                                inferior.map((item, index) => {
                                    console.log(item.isToggle);
                                    return (<div className='item-bor'>
                                        <div>STT:   {index + 1}</div>
                                        <div>Mã:    {item.username}</div>
                                        <div className='repair'>
                                            <span>Tên:  {item.location}</span>
                                            <input type='text'
                                                value={item.location}
                                                onChange={(e) => valueChange(e, item, index, 'location')}
                                                className='none'
                                            ></input>
                                        </div>
                                        <div className='repair'>
                                            <span>SĐT:  {item.phone}</span>
                                            <input type='text'
                                                value={item.phone}
                                                onChange={(e) => valueChange(e, item, index, 'phone')}
                                                className='none'
                                            ></input>
                                        </div>
                                        <div>
                                            <span style={colorState(item.isToggle)}>Trạng thái:     {item.isToggle ? 'Active' : 'Non Active'}</span>
                                            <button onClick={e => changeState(e, item)}>bật tắt quyền hạn</button>
                                        </div>
                                        <div className='repair'>
                                            <span>Email:    {item.email}</span>
                                            <input type='text'
                                                value={item.email}
                                                onChange={(e) => valueChange(e, item, index, 'email')}
                                                className='none'
                                            ></input>
                                        </div>
                                        <div>
                                            <button
                                                className={`re-u-btn${index}`}
                                                onClick={e => changeInfo(e, item, index)}>Sửa</button>
                                            <button
                                                className={`de-u-btn${index}`}
                                                onClick={(e) => { remove(e, item, index) }}>Xóa</button>
                                            <button
                                                className={`re-u-submit${index} none`}
                                                onClick={e => submitInfo(e, item, index)}>Cập nhật</button>
                                        </div>
                                    </div>)
                                })
                            }
                        </> : <></>}


                </div>
            </>}
    </>
    )
}

export default InfoManage
