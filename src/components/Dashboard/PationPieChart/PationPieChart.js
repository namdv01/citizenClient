import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import axios from 'axios'
import { api } from '../../../contexts/constants'
import './pationPieChart.scss'

const PationPieChart = (props) => {
    const [state, setState] = useState({
        options: {
            // series: [44, 55, 41, 17, 15],
            labels: ['nam', 'nữ']
        },
        series: [4, 5],
        type: 'donut',
        isLoaded: false
    })

    const loadData = async () => {
        console.log(props.id);
        try {
            const response = await axios.get(`${api}/citizen/searchByIdAdress/${props.id}`);
            console.log(response);
            const data = response.data;
            const total = data.users.length;
            var totalMale = 0;
            for (let i = 0; i < total; i++) {
                if (data.users[i].gender == 'male') totalMale++;
            }
            state.series = [totalMale, total - totalMale];

            setState({ ...state });
            // var totalAge = 0;
            // const year = new Date().getFullYear();
            // data.users.forEach((people, index) => {
            //     totalAge += (year - parseInt(people.birthday.split('-', 1)[0]))
            // });
            // const peoples = data.users.map(
            //     (people, index) => {
            //         return {
            //             fullname: people.fullname,
            //             age: year - parseInt(people.birthday.split('-', 1)[0])
            //         }
            //     }
            // );
            // console.log(peoples);
            // list = props.age.map(item => 0);
            // for (let i = 0; i < peoples.length; i++) {
            //     for (let j = 0; j < props.age.length; j++) {
            //         if (peoples[i].age <= props.age[j]) {
            //             list[j]++;
            //             break;
            //         }
            //     }

            // }
            // state.series[0].data = list;
            // state.isLoaded = true;
            // setState({ ...state });
            // console.log(state);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className='pie-main'>
            <Chart
                options={state.options}
                series={state.series}
                type={state.type}
                width="360"
            />
            <div className='pie-title'>Biểu đồ tỷ lệ nam/nữ</div>
        </div>
    )
}

export default PationPieChart
