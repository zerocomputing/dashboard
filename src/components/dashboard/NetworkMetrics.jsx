import { Bar } from 'react-chartjs-2'
import { networks } from '../../utils/networksData'

export default function NetworkMetrics() {
  const barData = {
    labels: networks.map(n => n.name),
    datasets: [
      {
        label: 'Average Proving Time (s)',
        data: networks.map(n => n.avgProvingTime),
        backgroundColor: networks.map(n => n.color),
        borderColor: networks.map(n => n.color),
        borderWidth: 1
      }
    ]
  }

  const successData = {
    labels: networks.map(n => n.name),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: networks.map(n => n.successRate),
        backgroundColor: networks.map(n => n.color + '80'), // Add transparency
        borderColor: networks.map(n => n.color),
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Network Performance</h2>
      
      {/* Network Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {networks.map((network) => (
          <div 
            key={network.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: network.color }} />
                <h3 className="ml-2 text-lg font-medium text-gray-900">
                  {network.name}
                </h3>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Proving Time</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {network.avgProvingTime}s
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {network.successRate}%
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Daily Proofs</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {network.dailyProofs.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Proving Time by Network
          </h3>
          <div className="h-80">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Seconds'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Success Rate by Network
          </h3>
          <div className="h-80">
            <Bar
              data={successData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    min: 95,
                    max: 100,
                    title: {
                      display: true,
                      text: 'Percentage'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 
