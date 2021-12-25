import React, { useEffect, useState } from 'react'
import './listCitizen.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants';

const ListCitizen = (props) => {
    const citizen = props.init;
    const [copy, setCopy] = useState({
        isCopy: false,
        citizen: [],
        size: 5,
        page: 0,
        totalPage: []
    });

    const loadData = async () => {
        try {
            const response = await axios.get(`${api}/citizen/searchByIdAdress/${props.id}`);
            console.log(response.data);
            // console.log(response.data.user);
            if (response.data.result == 'tim kiem thanh cong') {
                const items = response.data.users;
                props.set(items);
                copy.totalPage = []
                for (let i = 0; i < response.data.users.length; i++) {
                    if (i % copy.size == 0) {
                        copy.totalPage.push(i / copy.size);
                    }
                }
                setCopy({ ...copy, isCopy: true, citizen: items });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitInfo = async (e, item, index) => {
        const tr = e.target.parentNode.parentNode;
        tr.querySelector(`.re-ci-btn${index}`).classList.remove('none');
        tr.querySelector(`.de-ci-btn${index}`).classList.remove('none');
        tr.querySelector(`.re-ci-submit${index}`).classList.add('none');
        const li = tr.querySelectorAll('.repair input');
        console.log(li);
        li.forEach((i, index) => {
            i.classList.add('none');
        })

        try {
            const data = {
                fullname: copy.citizen[index].fullname,
                gender: copy.citizen[index].gender,
                job: copy.citizen[index].job,
                phone: copy.citizen[index].phone,
                idCard: copy.citizen[index].idCard,
                regularAdress: copy.citizen[index].regularAdress,
                temporaryAdress: copy.citizen[index].temporaryAdress,
                religion: copy.citizen[index].religion,
            }
            const response = await axios.post(`${api}/citizen/update/${copy.citizen[index]._id}`, data);
            console.log(response.data);
            if (response.data.result == 'update thanh cong') loadData();
        } catch (error) {
            console.log(error);
        }
    }

    const setPage = (e, i) => {
        copy.page = i;
        setCopy({ ...copy });
    }

    const changeInfo = async (e, item, index) => {
        console.log(e.target.parentNode.parentNode);
        const tr = e.target.parentNode.parentNode;
        const li = tr.querySelectorAll('.repair input');
        console.log(li);
        li.forEach((i, index) => {
            i.classList.remove('none');
        })

        tr.querySelector(`.re-ci-btn${index}`).classList.add('none');
        tr.querySelector(`.de-ci-btn${index}`).classList.add('none');
        tr.querySelector(`.re-ci-submit${index}`).classList.remove('none');
    }

    const remove = async (e, item, index) => {
        if (!window.confirm(`Bạn sẽ xóa công dân ${item.fullname} ra khỏi dân sách `)) {
            return;
        }
        try {
            const response = await axios.get(`${api}/citizen/delete/${item._id}`);
            console.log(response.data);
            console.log(item);
            if (response.data.result == 'success') {
                loadData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const valueChange = async (e, item, index, key) => {
        copy.citizen[index][key] = e.target.value;
        setCopy({ ...copy });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (<>
        {window.innerWidth > 1023 ?
            <>
                <div className='list-ci-main'>
                    <div className='list-ci-header'>Danh sách công dân trong địa bàn quản lý</div>
                    <table>
                        <thead>
                            <th>STT</th>
                            <th>Tên đầy đủ</th>
                            <th>Giới tính</th>
                            <th>SĐT</th>
                            <th>CCCD</th>
                            <th>Hộ khẩu</th>
                            <th>Địa chỉ bán trú</th>
                            <th>Tôn giáo</th>
                            <th>Công việc</th>
                            <th >Thao tác</th>
                        </thead>
                        <tbody>
                            {copy.isCopy ? citizen.map((item, index) => {
                                if (index >= copy.page * copy.size && index < (copy.page + 1) * copy.size)
                                    return (<tr>
                                        <td>{index + 1}</td>
                                        <td className='repair'>
                                            <span>{item.fullname}</span>
                                            <input type='text'
                                                value={item.fullname}
                                                onChange={(e) => valueChange(e, item, index, 'fullname')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td className='repair'>
                                            <span>{item.gender}</span>
                                            <input type='text'
                                                value={item.gender}
                                                onChange={(e) => valueChange(e, item, index, 'gender')}
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
                                        <td className='repair'>
                                            <span>{item.idCard}</span>
                                            <input type='text'
                                                value={item.idCard}
                                                onChange={(e) => valueChange(e, item, index, 'idCard')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td className='repair'>
                                            <span>{item.regularAdress}</span>
                                            <input type='text'
                                                value={item.regularAdress}
                                                onChange={(e) => valueChange(e, item, index, 'regularAdress')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td className='repair'>
                                            <span>{item.temporaryAdress}</span>
                                            <input type='text'
                                                value={item.temporaryAdress}
                                                onChange={(e) => valueChange(e, item, index, 'temporaryAdress')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td className='repair'>
                                            <span>{item.religion}</span>
                                            <input type='text'
                                                value={item.religion}
                                                onChange={(e) => valueChange(e, item, index, 'religion')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td className='repair'>
                                            <span>{item.job}</span>
                                            <input type='text'
                                                value={item.job}
                                                onChange={(e) => valueChange(e, item, index, 'job')}
                                                className='none'
                                            ></input>
                                        </td>
                                        <td>
                                            <button
                                                className={`re-ci-btn${index}`}
                                                onClick={e => changeInfo(e, item, index)}>Sửa</button>
                                            <button
                                                className={`de-ci-btn${index}`}
                                                onClick={(e) => { remove(e, item, index) }}>Xóa</button>
                                            <button
                                                className={`re-ci-submit${index} none`}
                                                onClick={e => submitInfo(e, item, index)}>Cập nhật</button>
                                        </td>

                                    </tr>)
                            }) : <></>}
                        </tbody>
                    </table>
                    <div className='ci-page'>
                        {copy.totalPage.map(i => {
                            return <span onClick={e => setPage(e, i)}
                                className={`ci-page${i + 1} ` + (i == copy.page ? 'ci-choose' : '')}>
                                {i + 1}
                            </span>
                        })}
                    </div>
                </div>
            </>
            // ranh giới
            : <>
                <div className='list-ci-main'>
                    <div className='list-ci-header'>Danh sách công dân trong địa bàn quản lý</div>

                    {copy.isCopy ? citizen.map((item, index) => {
                        return (<div className='ci-bor'>
                            <div>STT:   {index + 1}</div>
                            <div className='repair'>
                                <span>Tên:{item.fullname}</span>
                                <input type='text'
                                    value={item.fullname}
                                    onChange={(e) => valueChange(e, item, index, 'fullname')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Giới tính:    {item.gender}</span>
                                <input type='text'
                                    value={item.gender}
                                    onChange={(e) => valueChange(e, item, index, 'gender')}
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
                            <div className='repair'>
                                <span>CMND,CCCD:    {item.idCard}</span>
                                <input type='text'
                                    value={item.idCard}
                                    onChange={(e) => valueChange(e, item, index, 'idCard')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Địa chỉ thường trú:   {item.regularAdress}</span>
                                <input type='text'
                                    value={item.regularAdress}
                                    onChange={(e) => valueChange(e, item, index, 'regularAdress')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Địa chỉ bán trú:  {item.temporaryAdress}</span>
                                <input type='text'
                                    value={item.temporaryAdress}
                                    onChange={(e) => valueChange(e, item, index, 'temporaryAdress')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Tôn giáo: {item.religion}</span>
                                <input type='text'
                                    value={item.religion}
                                    onChange={(e) => valueChange(e, item, index, 'religion')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Công việc:    {item.job}</span>
                                <input type='text'
                                    value={item.job}
                                    onChange={(e) => valueChange(e, item, index, 'job')}
                                    className='none'
                                ></input>
                            </div>
                            <div>
                                <button
                                    className={`re-ci-btn${index}`}
                                    onClick={e => changeInfo(e, item, index)}>Sửa</button>
                                <button
                                    className={`de-ci-btn${index}`}
                                    onClick={(e) => { remove(e, item, index) }}>Xóa</button>
                                <button
                                    className={`re-ci-submit${index} none`}
                                    onClick={e => submitInfo(e, item, index)}>Cập nhật</button>
                            </div>

                        </div>)
                    }) : <></>}

                </div>
            </>}
    </>
    )
}

export default ListCitizen
