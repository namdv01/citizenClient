import React, { useState } from 'react'
import './controlSearchOption.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants'

const ControlSearchOption = (props) => {
    const [state, setState] = useState({
        key: ''
    })

    const setKey = (e) => {
        state.key = e.target.value;
        setState({ ...state });
    }

    const search = async (e) => {
        try {
            const response = await axios.get(`${api}/citizen/search/${state.key}`);
            console.log(response.data);

            if (response.data.result == 'success') {
                props.setSearch(true);
                props.setValueSearch(response.data.users);
                document.querySelector('.searchInput').classList.add('none');
                document.querySelector('.searchBack').classList.remove('none');
            }

        } catch (error) {
            console.log(error);
        }
    }
    const back = (e) => {
        state.key = '';
        setState({ ...state });
        props.setSearch(false);
        props.setValueSearch([]);
        document.querySelector('.searchInput').classList.remove('none');
        document.querySelector('.searchBack').classList.add('none');
    }

    return (
        <>
            <div className='searchHeader'>Tìm kiếm người dân</div>
            <div className='searchInput'>
                <input value={state.key}
                    placeholder='Nhập tên học,căn cước công dân để tìm kiếm'
                    name='keySearch'
                    onChange={e => setKey(e)}
                />
                <button onClick={e => search(e)}>Tìm kiếm </button>
            </div>
            <div className='searchBack none'>
                <button onClick={e => back(e)}>Trở về</button>
            </div>
        </>
    )
}

export default ControlSearchOption
