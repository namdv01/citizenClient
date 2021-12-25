import React, { useState } from 'react'
import './control.scss'
import ControlSelf from './ControlSelf/ControlSelf'
import ControlInferiors from './ControlInferiors/ControlInferiors'
import ControlSearchOption from './ControlSearchOption/ControlSearchOption'
import ControlSearchTable from './ControlSearchTable/ControlSearchTable'

const Control = (props) => {
    const [state, setState] = useState({
        beSearch: false,
        valueSearch: [],
    })
    const setSearch = (value) => {
        state.beSearch = value;
        setState({ ...state });
    }

    const setValueSearch = (value) => {
        setState({ ...state, valueSearch: value })
    }

    return (
        <div className='controlMain'>
            <div className='column1'>
                {props.user.user.level !== 'A1' ?
                    <div className='controlSelf'>
                        <ControlSelf
                            self={props.user.user.isToggle}
                            id={props.user.user.username}
                            x={props}
                        />
                    </div>
                    : <></>}
                {props.user.user.level !== 'B2' ?
                    <div className='controlInferiors'>
                        <ControlInferiors />
                    </div>
                    : <></>}
            </div>

            <div className='column2'>
                <div className='searchOption'>
                    <ControlSearchOption setSearch={setSearch} setValueSearch={setValueSearch} />
                </div>

                {state.beSearch ?
                    <div className='searchTable'>
                        <ControlSearchTable valueSearch={state.valueSearch} />
                    </div>
                    : <></>}

            </div>
        </div>
    )
}

export default Control
