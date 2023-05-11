// import { BarChart } from "./BarChart";
import Chart from "chart.js/auto";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart = ({ chartData }) => {
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Monthly ${chartData.name} Statistics ($)`,
            },
        },
    };
    
    const labels = chartData?.stats?.map((item)=>item.month);

    const data = {
        labels,
        datasets: [
            {
                label: "Earnings",
                data: chartData?.stats?.map((item) => item.branGain),
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Loses",
                data: chartData?.stats?.map((item) => item.branLost),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return <Bar options={options} data={data} />;
};
