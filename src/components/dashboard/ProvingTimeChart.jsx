import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'

// Helper function to generate timestamps for last hour
const generateTimeLabels = () => {
  const labels = []
  for (let i = 12; i >= 0; i--) {
    const time = new Date(Date.now() - i * 5 * 60000) // Every 5 minutes
    labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }
  return labels
}

// Helper function to generate realistic proving time data
const generateProvingTimeData = () => {
  const baseValue = 2.4 // Base proving time in seconds
  return Array(13).fill(0).map(() => {
    // Random variation between -0.3 and +0.3 seconds
    return +(baseValue + (Math.random() * 0.6 - 0.3)).toFixed(2)
  })
}

export default function ProvingTimeChart() {
  const [timeLabels, setTimeLabels] = useState(generateTimeLabels())
  const [provingTimes, setProvingTimes] = useState(generateProvingTimeData())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabels(generateTimeLabels())
      setProvingTimes(prev => {
        const newValue = +(2.4 + (Math.random() * 0.6 - 0.3)).toFixed(2)
        return [...prev.slice(1), newValue]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Proving Time (s)',
        data: provingTimes,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => value.toFixed(1)
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <div className="h-96 rounded-lg bg-white shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Proving Time History</h3>
      <Line data={data} options={options} />
    </div>
  )
} 
