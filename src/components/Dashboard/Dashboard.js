import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import PationNumber from './PationNumber/PationNumber'
import PationColumnChart from './PationColumnChart/PationColumnChart'
import PationPieChart from './PationPieChart/PationPieChart'
import PationRank from './PationRank/PationRank'
import axios from 'axios'
import { api } from '../../contexts/constants'

const Dashboard = (props) => {
    const [dashboard, setDashboard] = useState({
        number: {
            total: 0,
            avergeAge: 0
        },
        rank: {
            top: 5,
            list: []
        },
        column: {
            age: [14, 20, 29, 40, 59, 69, 79, 1000]
        },
        pie: {

        }

    });

    const setNumber = (total, age) => {
        dashboard.number = { total: total, avergeAge: age };
        setDashboard({ ...dashboard });
    }

    const setRank = (list) => {
        dashboard.rank.list = list;
        setDashboard({ ...dashboard });
    }

    return (
        <div className='dashboard'>
            <div className='lineOne'>
                <div className='number'>
                    <PationNumber
                        number={dashboard.number}
                        setNumber={setNumber}
                        id={props.user.user.username}

                    />
                </div>
                <div className='column'>
                    <PationColumnChart
                        id={props.user.user.username}
                        age={dashboard.column.age}
                    />
                </div>
            </div>
            <div className='lineTwo'>
                {props.user.user.level != 'B2' ?
                    <>
                        <div className='rank'>
                            <PationRank
                                rank={dashboard.rank}
                                setRank={setRank}
                            />
                        </div>
                    </>
                    : <></>}

                <div className='pie'>
                    <PationPieChart
                        id={props.user.user.username}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
