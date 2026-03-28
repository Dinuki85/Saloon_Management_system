'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsCharts({ stats }: { stats: any }) {
  const labels = Object.keys(stats.bookingsTrend || {}).sort();
  
  const bookingData = {
    labels,
    datasets: [
      {
        label: 'Bookings',
        data: labels.map(label => stats.bookingsTrend[label]),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const revenueData = {
    labels,
    datasets: [
      {
        label: 'Revenue ($)',
        data: labels.map(label => stats.revenueTrend[label] || 0),
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-purple-500/5">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Booking trends</h3>
        <Line options={options} data={bookingData} />
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-purple-500/5">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Growth</h3>
        <Line options={options} data={revenueData} />
      </div>
    </div>
  );
}
