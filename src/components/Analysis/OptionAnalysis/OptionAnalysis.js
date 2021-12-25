import React from 'react'
import './optionAnalysis.scss'
const OptionAnalysis = (props) => {
    const checked = (e) => {
        console.log([e.target.id]);
        props.setValue(e.target.id, e.target.checked);
    }

    const showChart = (e) => {
        if (!props.analysis.gender && !props.analysis.age) {
            alert('chọn đã')
            return;
        }
        props.setValue('show', true);
        document.querySelector('.show').classList.add('none');
        document.querySelector('.back').classList.remove('none');
    }

    const backChart = (e) => {
        props.setValue('show', false);
        document.querySelector('.show').classList.remove('none');
        document.querySelector('.back').classList.add('none');
    }

    return (
        <>
            <div className='option-header'>Lựa chọn các mục có sẵn</div>
            <div className='show'>
                <div className='option-item'>
                    <input type="checkbox" id="gender" onClick={e => checked(e)} />
                    <label for="gender">Giới tính</label>
                </div>
                <div className='option-item'>
                    <input type="checkbox" id="age" onClick={e => checked(e)} />
                    <label for="age">Tuối</label>
                </div>
                <div className='option-item'>
                    <button className='option-btn' onClick={e => showChart(e)}>Show </button>
                </div>
            </div>
            <div className='option-item none back'>
                <button className='option-btn back-btn' onClick={e => backChart(e)}>Back </button>
            </div>
        </>
    )
}

export default OptionAnalysis
