import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

// Helper function to generate realistic success rate data
const generateSuccessRateData = () => {
  const baseValue = 98.5 // Base success rate percentage
  return Array(13).fill(0).map(() => {
    // Random variation between -0.5 and +0.5 percent
    return +(baseValue + (Math.random() * 1 - 0.5)).toFixed(1)
  })
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasData, setHasData] = useState(true)
  const [timeLabels, setTimeLabels] = useState(generateTimeLabels())
  const [provingTimes, setProvingTimes] = useState(generateProvingTimeData())
  const [successRates, setSuccessRates] = useState(generateSuccessRateData())

  // Update data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabels(generateTimeLabels())
      setProvingTimes(prev => {
        const newValue = +(2.4 + (Math.random() * 0.6 - 0.3)).toFixed(2)
        return [...prev.slice(1), newValue]
      })
      setSuccessRates(prev => {
        const newValue = +(98.5 + (Math.random() * 1 - 0.5)).toFixed(1)
        return [...prev.slice(1), newValue]
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const provingTimeData = {
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

  const successRateData = {
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

  const chartOptions = {
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
          callback: (value, index, values) => {
            return value.toFixed(1)
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      setTimeLabels(generateTimeLabels())
      setProvingTimes(generateProvingTimeData())
      setSuccessRates(generateSuccessRateData())
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    } catch (err) {
      setError('Failed to refresh data')
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate current stats based on latest data
  const stats = [
    {
      name: 'Active Proofs',
      value: Math.floor(Math.random() * 5 + 10),
      change: '+2.5%',
      changeType: 'positive',
    },
    {
      name: 'Avg. Proving Time',
      value: `${provingTimes[provingTimes.length - 1]}s`,
      change: `${((provingTimes[provingTimes.length - 1] - provingTimes[provingTimes.length - 2]) / provingTimes[provingTimes.length - 2] * 100).toFixed(1)}%`,
      changeType: provingTimes[provingTimes.length - 1] <= provingTimes[provingTimes.length - 2] ? 'positive' : 'negative',
    },
    {
      name: 'Queue Length',
      value: Math.floor(Math.random() * 10 + 15),
      change: '+5.1%',
      changeType: 'positive',
    },
    {
      name: 'Success Rate',
      value: `${successRates[successRates.length - 1]}%`,
      change: `${(successRates[successRates.length - 1] - successRates[successRates.length - 2]).toFixed(1)}%`,
      changeType: successRates[successRates.length - 1] >= successRates[successRates.length - 2] ? 'positive' : 'negative',
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <button
          onClick={handleRefresh}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-zk-primary hover:bg-zk-primary/90 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          <ArrowPathIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6 
              transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
            title={`Last updated: ${new Date().toLocaleTimeString()}`}
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                )}
                <span className="ml-1">{item.change}</span>
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-lg bg-white shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Proving Time History</h3>
          <Line data={provingTimeData} options={chartOptions} />
        </div>
        <div className="h-96 rounded-lg bg-white shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Success Rate Trend</h3>
          <Line data={successRateData} options={chartOptions} />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mt-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard data</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {!hasData && !error && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No data available</h3>
          <p className="mt-1 text-sm text-gray-500">Start your ZK operations to see metrics here.</p>
        </div>
      )}
    </div>
  )
} 
