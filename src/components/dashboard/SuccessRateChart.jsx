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

// Helper function to generate realistic success rate data
const generateSuccessRateData = () => {
  const baseValue = 98.5 // Base success rate percentage
  return Array(13).fill(0).map(() => {
    // Random variation between -0.5 and +0.5 percent
    return +(baseValue + (Math.random() * 1 - 0.5)).toFixed(1)
  })
}

export default function SuccessRateChart() {
  const [timeLabels, setTimeLabels] = useState(generateTimeLabels())
  const [successRates, setSuccessRates] = useState(generateSuccessRateData())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabels(generateTimeLabels())
      setSuccessRates(prev => {
        const newValue = +(98.5 + (Math.random() * 1 - 0.5)).toFixed(1)
        return [...prev.slice(1), newValue]
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Success Rate (%)',
        data: successRates,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
        min: 95,
        max: 100,
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
      <h3 className="text-lg font-medium text-gray-900 mb-4">Success Rate Trend</h3>
      <Line data={data} options={options} />
    </div>
  )
} 
