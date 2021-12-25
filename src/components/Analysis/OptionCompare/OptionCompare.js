import React, { useState, useEffect } from 'react'
import './optionCompare.scss'
import axios from 'axios'
import { api } from '../../../contexts/constants'

const OptionCompare = (props) => {
    const [state, setState] = useState({
        checked: false,
        inferiors: [],
        listSize: []
    })

    const changeSize = (e) => {
        props.setValue('sizeCompare', parseInt(e.target.value));
        state.listSize = []
        for (let i = 0; i < parseInt(e.target.value); i++) {
            state.listSize.push(i + 1);
        }
        setState({ ...state, checked: true });
    }

    const loadSize = async () => {
        try {
            const response = await axios.get(`${api}/user/inferior`);
            console.log(response.data);
            state.inferiors = response.data.user;
            setState({ ...state });
        } catch (error) {
            console.log(error);
        }
    }

    const compare = (e) => {
        if (!state.checked) {
            alert('Chọn số lượng so sánh trước khi thực thi');
            return;
        }
        const listCom = state.listSize;
        for (let i = 0; i < state.listSize.length; i++) {
            console.log(document.getElementById(`compareItem${i + 1}`).value);
            listCom[i] = document.getElementById(`compareItem${i + 1}`).value;
        }
        props.setValue('beChoose', listCom);
        props.setValue('showCompare', true);
        document.querySelector('.option-quantity').classList.add('none');
        document.querySelector('.option-selectSize').classList.add('none');
        document.querySelector('.option-submit').classList.add('none');

        document.querySelector('.option-reback').classList.remove('none');
        // console.log(listCom);

    }

    const reback = (e) => {
        document.querySelector('.option-quantity').classList.remove('none');
        document.querySelector('.option-selectSize').classList.remove('none');
        document.querySelector('.option-submit').classList.remove('none');

        document.querySelector('.option-reback').classList.add('none');
        state.checked = false;
        setState({ ...state });

        props.setValue('beChoose', []);
        props.setValue('showCompare', false);
    }

    useEffect(() => {
        loadSize();
    }, [])

    return (
        <>
            <div className='optionCompare-header'>So sánh các cấp con </div>
            <div className='option-quantity'>
                <h4>Số lượng hiển thị:</h4>
                <div className='option-item'>
                    <input type="radio" id="compare2" value={2} name="sizeCompare" onChange={e => changeSize(e)} />
                    <br />
                    <label for="compare2">2</label>
                </div>
                <div className='option-item'>
                    <input type="radio" id="compare3" value={3} name="sizeCompare" onChange={e => changeSize(e)} />
                    <br />
                    <label for="compare3">3</label>
                </div>
                <div className='option-item'>
                    <input type="radio" id="compare4" value={4} name="sizeCompare" onChange={e => changeSize(e)} />
                    <br />
                    <label for="compare4">4</label>
                </div>
            </div>

            <div className='option-selectSize '>
                {state.checked ?
                    <>
                        <div>Gồm:</div>
                        {state.listSize.map(item => {
                            return <div>
                                <span>{item}:  </span>
                                <select id={`compareItem${item}`}>
                                    {state.inferiors.map(node => {
                                        return <option value={`${node.username}-${node.location}`}>{node.location}</option>
                                    })}
                                </select>
                            </div>
                        })}
                    </> : <></>}
            </div>

            <div className='option-submit'>
                <button onClick={(e) => compare(e)}>Thực thi</button>
            </div>
            <div className='option-reback none'>
                <button onClick={e => reback(e)}>Trở lại</button>
            </div>
        </>
    )
}

export default OptionCompare
