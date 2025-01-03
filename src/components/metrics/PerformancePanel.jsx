import { Line } from 'react-chartjs-2'
import { generateTimeSeriesData, generateTimeLabels } from '../../utils/metricsSimulator'

export default function PerformancePanel() {
  const timeLabels = generateTimeLabels()
  const provingTimes = generateTimeSeriesData(2.4, 24, 0.3)
  const setupTimes = generateTimeSeriesData(0.8, 24, 0.1)
  const witnessGenTimes = generateTimeSeriesData(1.2, 24, 0.2)

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Total Proving Time',
        data: provingTimes,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
      },
      {
        label: 'Setup Time',
        data: setupTimes,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
      },
      {
        label: 'Witness Generation',
        data: witnessGenTimes,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
      },
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Throughput</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {Math.floor(Math.random() * 10 + 40)} proofs/hour
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Avg Proving Time</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {(Math.random() * 0.4 + 2.2).toFixed(2)}s
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Success Rate</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {(Math.random() * 2 + 97).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Proving Time Breakdown</h3>
        <div className="h-80">
          <Line
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                mode: 'index',
                intersect: false,
              },
              scales: {
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: 'Time (seconds)'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 
