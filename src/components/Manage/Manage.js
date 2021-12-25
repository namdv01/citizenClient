import React, { useEffect, useState } from 'react'
import './manage.scss'
import InfoManage from './InfoManage/InfoManage'
import CreateManage from './CreateManage/CreateManage'
import ListCitizen from './ListCitizen/ListCitizen'
import CreateCitizen from './CreateCitizen/CreateCitizen'

const Manage = (props) => {
    const [state, setState] = useState({
        inferior: [],
        citizen: []
    });

    const setInf = (array) => {
        state.inferior = array;
        setState({ ...state });
    }
    const addInf = (item) => {
        state.inferior = [...state.inferior, item];
        setState({ ...state });
    }

    const setCitizen = (array) => {
        state.citizen = array;
        setState({ ...state });
    }
    const addCitizen = (item) => {
        state.citizen = [...state.citizen, item];
        setState({ ...state });
    }
    return (
        <div className='manage-main'>
            {props.user.user.level !== 'B2' ?
                <>
                    <InfoManage init={state.inferior}
                        set={setInf}
                        toggle={props.user.user.isToggle}

                    />
                    <CreateManage add={addInf} toggle={props.user.user.isToggle} />
                </>
                : <>
                    <CreateCitizen add={addCitizen}
                        toggle={props.user.user.isToggle}
                        id={props.user.user.username}
                    />
                    <ListCitizen init={state.citizen}
                        set={setCitizen}
                        toggle={props.user.user.isToggle}
                        id={props.user.user.username}
                    />
                </>}
        </div>
    )
}

export default Manage
