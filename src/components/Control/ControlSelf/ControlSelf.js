import React, { useState } from 'react'
import './controlSelf.scss'
import * as AiIcons from "react-icons/ai";
import axios from 'axios';
import { api } from '../../../contexts/constants'

const ControlSelf = (props) => {
    const [state, setState] = useState({
        isActive: props.self
    })
    const submitSelf = async () => {

        try {
            const response = await axios.get(`${api}/user/turnOffState/${props.id}`);
            if (response.data.result == 'success') {
                console.log(props.self);
                setState({ ...state, isActive: false })
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='cs-main'>
            {console.log(props.x)}
            <span>Tiến độ bản thân</span>
            {state.isActive ?
                <div className='pass' onClick={e => submitSelf()}>
                    Hoàn tất
                </div> :
                <div className='success'>
                    <AiIcons.AiFillCheckCircle style={{ 'color': 'white' }} />
                    <span>Đã hoàn thành</span>
                </div>}
        </div>
    )
}

export default ControlSelf
