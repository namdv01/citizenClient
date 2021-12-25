import React, { useEffect, useState } from 'react'
import './tableCompare.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants'

const TableCompare = (props) => {
    const [state, setState] = useState({
        isLoaded: false,
        users: [],
        list: []
    })

    const array = props.analysis.beChoose;
    const ids = array.map((item, index) => {
        return item.split('-')[0];
    })
    const names = array.map((item, index) => {
        return item.split('-')[1];
    })
    var users = array.map((item, index) => {
        return 0;
    })
    const beDuplicate = () => {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] == array[j]) return true;
            }
        }
        return false;
    }

    const handleData = () => {
        state.list = state.users.map((item, index) => {
            var total = 0;
            var male = 0;
            var female = 0;
            item.forEach((u, i) => {
                total++;
                if (u.gender == 'male') male++;
                else female++;
            })
            return {
                total,
                male,
                female,
                name: names[index],
                stt: index + 1
            }
        })
        setState({ ...state });
    }

    const loadData = async () => {
        for (let i = 0; i < ids.length; i++) {
            try {
                const response = await axios.get(`${api}/citizen/searchByIdAdress/${ids[i]}`);
                if (response.data.result == 'tim kiem thanh cong') {
                    console.log(response.data.users);
                    users[i] = response.data.users;
                    console.log(users[i]);
                    // console.log(users[i]);
                }

            } catch (error) {
                console.log(error);
            }
        }
        state.isLoaded = true;
        state.users = users;
        setState({ ...state });
        handleData();
    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            {!state.isLoaded
                ? <></>
                : <>{!beDuplicate() ? <table className='tableC-main'>
                    <thead className='tableC-header'>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Tổng số dân</th>
                        <th>Số lượng nam</th>
                        <th>Số lượng nữ</th>
                    </thead>
                    <tbody className='tableC-body'>
                        {state.list.map((p, i) => {
                            return <tr>
                                <td>{p.stt}</td>
                                <td>{p.name}</td>
                                <td>{p.total}</td>
                                <td>{p.male}</td>
                                <td>{p.female}</td>
                            </tr>
                        })}
                    </tbody>
                </table> : <>Nhập trùng tên các cấp con</>}

                </>}
        </div>
    )
}

export default TableCompare
