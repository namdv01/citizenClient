import React, { useEffect, useState } from 'react'
import './controlInferiors.scss'
import * as AiIcons from "react-icons/ai";
import axios from 'axios';
import { api } from '../../../contexts/constants'

const ControlInferiors = () => {
    const [state, setState] = useState({
        inferiors: [],
        isCopy: false,
        size: 5,
        page: 0,
        totalPage: []
    });

    const loadData = async () => {
        try {
            const response = await axios.get(`${api}/user/inferior`);
            console.log(response.data);
            if (response.data.result == 'success') {
                state.inferiors = response.data.user;
                state.totalPage = []
                for (let i = 0; i < response.data.user.length; i++) {
                    if (i % state.size == 0) {
                        state.totalPage.push(i / state.size);
                    }
                }
                setState({ ...state })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitSelf = async (e, user, index) => {
        try {
            const response = await axios.get(`${api}/user/turnOffState/${user.username}`);
            if (response.data.result == 'success') {
                state.inferiors[index].isToggle = false;
                setState({ ...state })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setPage = (e, i) => {
        state.page = i;
        setState({ ...state });
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className='in-main'>
            <div className='I-header'>Tiến độ cấp dưới</div>
            {window.innerWidth >= 1024 ?
                <>
                    {state.inferiors.map((user, index) => {
                        if (index >= state.page * state.size && index < (state.page + 1) * state.size) {
                            if (user.isToggle) {
                                return <div className='borderI'>
                                    <div className='n'>Tên:{user.location}</div>
                                    <div className='pass'>
                                        <AiIcons.AiOutlineReload style={{ 'color': 'white', 'marginRight': '4px' }} />
                                        Đang tiến hành
                                    </div>
                                </div>
                            }
                            else return <div className='borderI'>
                                <div className='n'>Tên:{user.location}</div>
                                <div className='success'>
                                    <AiIcons.AiFillCheckCircle style={{ 'color': 'white' }} />
                                    <span>Đã hoàn thành</span>
                                </div>
                            </div>
                        }

                    })}
                    <div className='in-page'>
                        {state.totalPage.map(i => {
                            return <span onClick={e => setPage(e, i)}
                                className={`in-page${i + 1} ` + (i == state.page ? 'in-choose' : '')}>
                                {i + 1}
                            </span>
                        })}
                    </div>
                </>
                : <>
                    {state.inferiors.map((user, index) => {
                        if (user.isToggle) {
                            return <div className='borderI'>
                                <div className='n'>Tên:{user.location}</div>
                                <div className='pass'>
                                    <AiIcons.AiOutlineReload style={{ 'color': 'white', 'marginRight': '4px' }} />
                                    Đang tiến hành
                                </div>
                            </div>
                        }
                        else return <div className='borderI'>
                            <div className='n'>Tên:{user.location}</div>
                            <div className='success'>
                                <AiIcons.AiFillCheckCircle style={{ 'color': 'white' }} />
                                <span>Đã hoàn thành</span>
                            </div>
                        </div>


                    })}
                </>}

        </div>
    )
}

export default ControlInferiors
