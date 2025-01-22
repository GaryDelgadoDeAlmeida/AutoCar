import React from "react"
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { generateYearMonths } from "../hooks/DomControl";

export default function LinearChart() {

    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};
    const months = generateYearMonths()

    const labels = generateYearMonths().map((item, index) => {
        let month = new Date()
        month.setMonth(index)
        return month.toLocaleDateString("en-EN", {month: 'long'})
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sans Plomb 98 (E5)',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Super 98 (E10)',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'Sans Plomb 95 (E5)',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
            },
            {
                label: 'Sans Plomb 95 (E10)',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'BioEthanol E85',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Gazole / Diesel (B7)',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
            {
                label: 'GPL',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'GNV',
                data: months.map(item => {
                    return Math.random()
                }),
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            }
            // {
            //     label: 'Dataset 9',
            //     data: months.map(item => {
            //         return Math.random()
            //     }),
            //     borderColor: 'rgb(255, 159, 64)',
            //     backgroundColor: 'rgba(255, 159, 64, 0.2)',
            // }
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: ''
                }
            }
        },
    };

    return (
        <Line {...config} />
    )
}