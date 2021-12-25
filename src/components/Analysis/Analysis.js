import React, { useState } from 'react'
import './analysis.scss'
import OptionAnalysis from './OptionAnalysis/OptionAnalysis'
import ChartAnalysis from './ChartAnalysis/ChartAnalysis'
import TableCompare from './TableCompare/TableCompare'
import OptionCompare from './OptionCompare/OptionCompare'

const Analysis = (props) => {
    const [analysis, setAnalysis] = useState({
        gender: false,
        age: false,
        show: false,
        ageSpacing: [14, 20, 29, 40, 59, 69, 79, 1000],
        sizeCompare: 0,
        showCompare: false,
        beChoose: []
    })

    const setValue = (item, value) => {
        analysis[item] = value;
        setAnalysis({ ...analysis })
        console.log(props);
    }


    return (
        <div className='analysis-main'>
            <div className='self'>
                <div className='optionAnalysis-main'>
                    <OptionAnalysis setValue={setValue} analysis={analysis} />
                </div>
                <div className='chartAnalysis-main'>
                    {analysis.show ? <ChartAnalysis analysis={analysis} id={props.user.user.username} /> : <></>}
                </div>
            </div>
            {props.user.user.level != 'B2' ?
                <>
                    <div className='another'>
                        <div className='optionCompare'>
                            <OptionCompare setValue={setValue} analysis={analysis} />
                        </div>
                        <div className='tableCompare'>
                            {analysis.showCompare ? <TableCompare analysis={analysis} /> : <></>}
                        </div>
                    </div>
                </> : <></>}

        </div>
    )
}

export default Analysis
