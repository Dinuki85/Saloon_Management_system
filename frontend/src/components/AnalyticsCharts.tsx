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
  const bookingsTrend = stats?.bookingsTrend || {};
  const revenueTrend = stats?.revenueTrend || {};
  const labels = Object.keys(bookingsTrend).sort();

  if (labels.length === 0) {
    return (
      <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
        <p className="text-gray-400 font-medium">No trend data available for the last 7 days.</p>
      </div>
    );
  }
  
  const bookingData = {
    labels,
    datasets: [
      {
        label: 'Bookings',
        data: labels.map(label => bookingsTrend[label] || 0),
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
        fill: true
      },
    ],
  };

  const revenueData = {
    labels,
    datasets: [
      {
        label: 'Revenue ($)',
        data: labels.map(label => revenueTrend[label] || 0),
        borderColor: 'rgb(22, 163, 74)',
        backgroundColor: 'rgba(22, 163, 74, 0.5)',
        tension: 0.4,
        fill: true
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        cornerRadius: 12,
        titleFont: { size: 14, weight: 'bold' },
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: '#f3f4f6' }
      },
      x: {
        grid: { display: false }
      }
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
