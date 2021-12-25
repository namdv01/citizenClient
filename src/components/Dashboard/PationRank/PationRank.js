import axios from 'axios'
import React, { useEffect } from 'react'
import './pationRank.scss'
import { api } from '../../../contexts/constants'

const PationRank = (props) => {
    var list = [];
    const load = async () => {
        try {
            const response = await axios.get(`${api}/user/inferior`);
            const userItems = response.data.user;
            // console.log(userItems);
            list = userItems.map(item => { return 0; })
            userItems.forEach(async (item, index) => {
                const res = await axios.get(`${api}/citizen/searchByIdAdress/${item.username}`);
                // console.log(res.data.users.length);
                list[index] = ({ name: item.location, total: res.data.users.length });
                sortRank();
                props.setRank(list);
            });



        } catch (error) {
            console.log(error);
        }
    }

    const sortRank = () => {
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {
                if (list[j].total > list[i].total) {
                    var item = list[j];
                    list[j] = list[i];
                    list[i] = item;

                }
            }
        }
        // console.log(list);
        props.setRank(list);
    }

    useEffect(() => {
        load();
        // sortRank();
    }, []);

    return (
        <>
            <div className='rank-header'>Bảng xếp hạng tổng dân số</div>
            <table className='rank-body'>
                <thead>
                    <th className='rank-title'>STT</th>
                    <th className='rank-title'>Khu vực</th>
                    <th className='rank-title'>Số lượng</th>
                </thead>
                <tbody>
                    {props.rank.list.map((item, index) => {
                        if (index < props.rank.top)
                            return (<tr key={index} className='rank-items'>
                                <td className='rank-item'>{index + 1}.</td>
                                <td className='rank-item'>{item.name}</td>
                                <td className='rank-item'>{item.total}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </>
    )
}

export default PationRank
