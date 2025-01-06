import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import ProvingTimeChart from './dashboard/ProvingTimeChart'
import SuccessRateChart from './dashboard/SuccessRateChart'
import NetworkMetrics from './dashboard/NetworkMetrics'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Calculate current stats
  const stats = [
    {
      name: 'Active Proofs',
      value: Math.floor(Math.random() * 5 + 10),
      change: '+2.5%',
      changeType: 'positive',
    },
    {
      name: 'Avg. Proving Time',
      value: '2.4s',
      change: '-0.3%',
      changeType: 'positive',
    },
    {
      name: 'Queue Length',
      value: Math.floor(Math.random() * 10 + 15),
      change: '+5.1%',
      changeType: 'negative',
    },
    {
      name: 'Success Rate',
      value: '98.5%',
      change: '+0.2%',
      changeType: 'positive',
    },
  ]

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    } catch (err) {
      setError('Failed to refresh data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time monitoring of ZK proof generation
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white 
              bg-zk-primary hover:bg-zk-primary/90 transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zk-primary
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <ArrowPathIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6 
              transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-2 flex items-baseline justify-between">
              <div className="flex items-baseline text-2xl font-semibold text-gray-900">
                {item.value}
              </div>
              <div
                className={`inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium
                  ${item.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'}`}
              >
                {item.changeType === 'positive' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center text-green-500 -ml-1 mr-0.5" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center text-red-500 -ml-1 mr-0.5" />
                )}
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
        <ProvingTimeChart />
        <SuccessRateChart />
      </div>

      {/* Network Metrics */}
      <div className="mb-8">
        <NetworkMetrics />
      </div>

      {/* Error Display */}
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
    </div>
  )
} 
