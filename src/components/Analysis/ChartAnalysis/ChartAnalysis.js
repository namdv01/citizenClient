import React, { useState, useEffect } from 'react'
import './chartAnalysis.scss'
import Chart from "react-apexcharts"
import axios from 'axios'
import { api } from '../../../contexts/constants'

const ChartAnalysis = (props) => {

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
                name: 'tổng dân số',
                data: []
            }
        ],
        isLoaded: false
    });

    const loadData = async () => {
        try {
            const response = await axios.get(`${api}/citizen/searchByIdAdress/${props.id}`);
            const data = response.data;
            console.log(props.analysis.show);
            state.isLoaded = true;

            if (props.analysis.gender && props.analysis.age) {
                var listMale = props.analysis.ageSpacing.map(item => 0);
                var listFemale = props.analysis.ageSpacing.map(item => 0);
                const year = new Date().getFullYear();
                const peoples = data.users.map(
                    (people, index) => {
                        return {
                            fullname: people.fullname,
                            age: year - parseInt(people.birthday.split('-', 1)[0]),
                            gender: people.gender
                        }
                    }
                );

                for (let i = 0; i < peoples.length; i++) {
                    for (let j = 0; j < props.analysis.ageSpacing.length; j++) {
                        if (peoples[i].age <= props.analysis.ageSpacing[j] && peoples[i].gender == 'male') {
                            listMale[j]++;
                            break;
                        }
                    }

                }

                for (let i = 0; i < peoples.length; i++) {
                    for (let j = 0; j < props.analysis.ageSpacing.length; j++) {
                        if (peoples[i].age <= props.analysis.ageSpacing[j] && peoples[i].gender == 'female') {
                            listFemale[j]++;
                            break;
                        }
                    }

                }

                state.series[0] = {
                    name: 'Nam',
                    data: listMale
                }
                state.series[1] = {
                    name: 'Nữ',
                    data: listFemale
                }

            }
            else if (props.analysis.gender) {
                // console.log('gender');
                state.options.xaxis.categories = ['Nam', 'Nữ'];
                var list = [0, 0];
                data.users.forEach(
                    (people, index) => {
                        people.gender == 'male' ? list[0]++ : list[1]++
                    }
                );
                state.series[0] = {
                    name: 'Tổng dân số',
                    data: list
                }
            }
            else if (props.analysis.age) {
                var list = props.analysis.ageSpacing.map(item => 0);
                const year = new Date().getFullYear();
                const peoples = data.users.map(
                    (people, index) => {
                        return {
                            fullname: people.fullname,
                            age: year - parseInt(people.birthday.split('-', 1)[0]),
                            gender: people.gender
                        }
                    }
                );

                for (let i = 0; i < peoples.length; i++) {
                    for (let j = 0; j < props.analysis.ageSpacing.length; j++) {
                        if (peoples[i].age <= props.analysis.ageSpacing[j]) {
                            list[j]++;
                            break;
                        }
                    }

                }

                state.series[0] = {
                    name: 'Tổng dân số',
                    data: list
                }

            }
            else {
                console.log('ko biet la cai gi');
            }
            setState({ ...state });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            {state.isLoaded ? <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="480"
                height="420"
            /> : <></>}
            {console.log(state)}
        </>
    )
}

export default ChartAnalysis
