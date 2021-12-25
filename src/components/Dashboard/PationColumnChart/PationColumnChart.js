import React, { useEffect, useState } from 'react'
import './pationColumnChart.scss'
import Chart from "react-apexcharts"
import axios from 'axios'
import { api } from '../../../contexts/constants'

const PationColumnChart = (props) => {
    var list = [];
    const [state, setState] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['0-14', '15-20', '21-29', '30-40', '41-59', '60-69', '70-79', '>=80'],
            }
        },
        series: [
            {
                name: "Tổng số dân",
                data: []
            }
        ],
        isLoaded: false
    });

    const loadData = async () => {
        console.log(props.id);
        try {
            const response = await axios.get(`${api}/citizen/searchByIdAdress/${props.id}`);
            console.log(response);
            const data = response.data;
            // const total = data.users.length;
            var totalAge = 0;
            const year = new Date().getFullYear();
            data.users.forEach((people, index) => {
                totalAge += (year - parseInt(people.birthday.split('-', 1)[0]))
            });
            const peoples = data.users.map(
                (people, index) => {
                    return {
                        fullname: people.fullname,
                        age: year - parseInt(people.birthday.split('-', 1)[0])
                    }
                }
            );
            console.log(peoples);
            list = props.age.map(item => 0);
            for (let i = 0; i < peoples.length; i++) {
                for (let j = 0; j < props.age.length; j++) {
                    if (peoples[i].age <= props.age[j]) {
                        list[j]++;
                        break;
                    }
                }

            }
            state.series[0].data = list;
            state.isLoaded = true;
            setState({ ...state });
            console.log(state);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (<>
        {state.isLoaded ? <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="480"
            height="250"
        /> : <></>}

        <div className='column-title'>Biểu đồ số dân tương ứng với độ tuổi</div>
    </>
    )
}

export default PationColumnChart
