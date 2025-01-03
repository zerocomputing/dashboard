import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { generateSystemData } from '../../utils/metricsSimulator'

export default function SystemHealthPanel() {
  const [systemData, setSystemData] = useState(generateSystemData())
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Update data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(generateSystemData())
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const resourceData = {
    labels: ['CPU', 'Memory', 'GPU', 'Network'],
    datasets: [
      {
        data: [
          systemData.cpu,
          systemData.memory,
          systemData.gpu,
          systemData.network,
        ],
        backgroundColor: [
          'rgba(79, 70, 229, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
      },
    ],
  }

  const getStatusColor = (value) => {
    if (value > 90) return 'text-red-600'
    if (value > 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">System Status</h3>
          <p className={`mt-2 text-2xl font-bold ${getStatusColor(systemData.cpu)}`}>
            {systemData.cpu > 90 ? 'Critical' : systemData.cpu > 75 ? 'Warning' : 'Healthy'}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Uptime</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">99.9%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Error Rate</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">0.1%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Active Nodes</h3>
          <p className="mt-2 text-2xl font-bold text-gray-900">4/4</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Resource Utilization</h3>
          <div className="flex space-x-2">
            {Object.entries(systemData).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-gray-500">{key.toUpperCase()}: </span>
                <span className={getStatusColor(value)}>{value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-80">
          <Bar
            data={resourceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  title: {
                    display: true,
                    text: 'Utilization (%)'
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 
