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
        if (!window.confirm(`B???n s??? x??a c??ng d??n ${item.fullname} ra kh???i d??n s??ch `)) {
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
                    <div className='list-ci-header'>Danh s??ch c??ng d??n trong ?????a b??n qu???n l??</div>
                    <table>
                        <thead>
                            <th>STT</th>
                            <th>T??n ?????y ?????</th>
                            <th>Gi???i t??nh</th>
                            <th>S??T</th>
                            <th>CCCD</th>
                            <th>H??? kh???u</th>
                            <th>?????a ch??? b??n tr??</th>
                            <th>T??n gi??o</th>
                            <th>C??ng vi???c</th>
                            <th >Thao t??c</th>
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
                                                onClick={e => changeInfo(e, item, index)}>S???a</button>
                                            <button
                                                className={`de-ci-btn${index}`}
                                                onClick={(e) => { remove(e, item, index) }}>X??a</button>
                                            <button
                                                className={`re-ci-submit${index} none`}
                                                onClick={e => submitInfo(e, item, index)}>C???p nh???t</button>
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
            // ranh gi???i
            : <>
                <div className='list-ci-main'>
                    <div className='list-ci-header'>Danh s??ch c??ng d??n trong ?????a b??n qu???n l??</div>

                    {copy.isCopy ? citizen.map((item, index) => {
                        return (<div className='ci-bor'>
                            <div>STT:   {index + 1}</div>
                            <div className='repair'>
                                <span>T??n:{item.fullname}</span>
                                <input type='text'
                                    value={item.fullname}
                                    onChange={(e) => valueChange(e, item, index, 'fullname')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>Gi???i t??nh:    {item.gender}</span>
                                <input type='text'
                                    value={item.gender}
                                    onChange={(e) => valueChange(e, item, index, 'gender')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>S??T:  {item.phone}</span>
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
                                <span>?????a ch??? th?????ng tr??:   {item.regularAdress}</span>
                                <input type='text'
                                    value={item.regularAdress}
                                    onChange={(e) => valueChange(e, item, index, 'regularAdress')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>?????a ch??? b??n tr??:  {item.temporaryAdress}</span>
                                <input type='text'
                                    value={item.temporaryAdress}
                                    onChange={(e) => valueChange(e, item, index, 'temporaryAdress')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>T??n gi??o: {item.religion}</span>
                                <input type='text'
                                    value={item.religion}
                                    onChange={(e) => valueChange(e, item, index, 'religion')}
                                    className='none'
                                ></input>
                            </div>
                            <div className='repair'>
                                <span>C??ng vi???c:    {item.job}</span>
                                <input type='text'
                                    value={item.job}
                                    onChange={(e) => valueChange(e, item, index, 'job')}
                                    className='none'
                                ></input>
                            </div>
                            <div>
                                <button
                                    className={`re-ci-btn${index}`}
                                    onClick={e => changeInfo(e, item, index)}>S???a</button>
                                <button
                                    className={`de-ci-btn${index}`}
                                    onClick={(e) => { remove(e, item, index) }}>X??a</button>
                                <button
                                    className={`re-ci-submit${index} none`}
                                    onClick={e => submitInfo(e, item, index)}>C???p nh???t</button>
                            </div>

                        </div>)
                    }) : <></>}

                </div>
            </>}
    </>
    )
}

export default ListCitizen
