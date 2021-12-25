import React, { useEffect, useState } from 'react'
import './pationNumber.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants';

const PationNumber = (props) => {
    const number = props.number;
    const [state, setState] = useState({
        isLoaded: false
    });
    const loadData = async () => {
        try {
            const response = await axios.get(`${api}/citizen/searchByIdAdress/${props.id}`)
            const data = response.data;
            const total = data.users.length;
            var totalAge = 0;
            const year = new Date().getFullYear();
            data.users.forEach((people, index) => {
                totalAge += (year - parseInt(people.birthday.split('-', 1)[0]))
            });
            props.setNumber(total, (totalAge / total).toFixed(1))
            setState({ ...state, isLoaded: true })
            console.log(number);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadData();
        // console.log(isLoaded);
    }, [])

    return (<>
        {state.isLoaded ? <>
            <div className='total'>
                <span>Tổng số dân:</span>
                {/* {console.log(number)} */}
                <span>{number.total}</span>
            </div>
            <div className='age'>
                <span>Tuổi trung bình:</span>
                <span>{number.avergeAge}</span>
            </div>
        </> : <></>}
    </>
    )
}

export default PationNumber
