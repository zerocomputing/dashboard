import { useState, useEffect } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import { generateTimeSeriesData, generateTimeLabels } from '../../utils/metricsSimulator'

export default function QueueAnalyticsPanel() {
  const [timeLabels, setTimeLabels] = useState(generateTimeLabels())
  const [queueDepth, setQueueDepth] = useState(generateTimeSeriesData(20, 24, 5))
  const [waitTimes, setWaitTimes] = useState(generateTimeSeriesData(30, 24, 10))
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Update data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLabels(generateTimeLabels())
      setQueueDepth(prev => [...prev.slice(1), Math.floor(Math.random() * 10 + 15)])
      setWaitTimes(prev => [...prev.slice(1), Math.floor(Math.random() * 10 + 25)])
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: [
        'rgba(239, 68, 68, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(16, 185, 129, 0.7)',
      ]
    }]
  }

  const queueTrendData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Queue Depth',
        data: queueDepth,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
      },
      {
        label: 'Wait Time (s)',
        data: waitTimes,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        yAxisID: 'waitTime',
      }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Current Queue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.floor(Math.random() * 10 + 15)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Avg Wait Time</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.floor(Math.random() * 10 + 25)}s
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Processing Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.floor(Math.random() * 5 + 35)}/min
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Dropped Requests</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {Math.floor(Math.random() * 3)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Queue Trends</h3>
          <div className="h-80">
            <Line
              data={queueTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                      display: true,
                      text: 'Queue Depth'
                    }
                  },
                  waitTime: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                      display: true,
                      text: 'Wait Time (s)'
                    },
                    grid: {
                      drawOnChartArea: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Distribution</h3>
          <div className="h-80">
            <Doughnut
              data={priorityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-500 text-right">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  )
} 
