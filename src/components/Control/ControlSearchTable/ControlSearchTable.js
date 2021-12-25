import React, { useState, useEffect } from 'react'
import './controlSearchTable.scss'

const ControlSearchTable = (props) => {
    const [state, setState] = useState({
        isCopy: false,
        size: 7,
        page: 0
    });

    const setData = () => {
        state.totalPage = []
        for (let i = 0; i < props.valueSearch.length; i++) {
            if (i % state.size == 0) {
                state.totalPage.push(i / state.size);
            }
        }
        state.isCopy = true;
        setState({ ...state })
    }



    useEffect(() => {
        setData()
    }, [])

    return (
        <div className='se-table-main'>
            <span>Kết quả tìm kiếm: {props.valueSearch.length > state.size ? '(Thêm gợi ý do còn nhiều kết quả khác)' : props.valueSearch.length}</span>
            <table className='searchTable-main'>
                <thead>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Năm sinh</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ thường trú</th>
                </thead>
                {props.valueSearch.map((people, index) => {
                    if (index >= state.page * state.size && index < (state.page + 1) * state.size)
                        return <tr>
                            <td>{index + 1}</td>
                            <td>{people.fullname}</td>
                            <td>{people.birthday}</td>
                            <td>{people.gender}</td>
                            <td>{people.regularAdress}</td>
                        </tr>
                })}

            </table>

        </div>
    )
}

export default ControlSearchTable
