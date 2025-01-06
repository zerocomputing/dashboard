import { useState, useEffect } from 'react'
import { 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

const MOCK_QUEUE_ITEMS = [
  { 
    id: '1',
    status: 'processing',
    priority: 'high',
    startTime: new Date(Date.now() - 120000),
    estimatedTime: 180,
    progress: 65,
    circuit: 'Aleo Verification',
    size: '2.4MB'
  },
  { 
    id: '2',
    status: 'pending',
    priority: 'medium',
    startTime: new Date(Date.now() - 60000),
    estimatedTime: 240,
    progress: 0,
    circuit: 'Aztec Protocol',
    size: '3.1MB'
  },
  { 
    id: '3',
    status: 'completed',
    priority: 'high',
    startTime: new Date(Date.now() - 300000),
    estimatedTime: 120,
    progress: 100,
    circuit: 'Bonsol Proof',
    size: '1.8MB'
  },
  { 
    id: '4',
    status: 'processing',
    priority: 'low',
    startTime: new Date(Date.now() - 90000),
    estimatedTime: 300,
    progress: 25,
    circuit: 'Cysic Network',
    size: '2.9MB'
  },
  { 
    id: '5',
    status: 'completed',
    priority: 'medium',
    startTime: new Date(Date.now() - 180000),
    estimatedTime: 200,
    progress: 100,
    circuit: 'Holonym Identity',
    size: '2.2MB'
  },
  { 
    id: '6',
    status: 'pending',
    priority: 'high',
    startTime: new Date(Date.now() - 30000),
    estimatedTime: 240,
    progress: 0,
    circuit: 'Space and Time',
    size: '2.7MB'
  }
]

const STATUS_STYLES = {
  pending: 'bg-yellow-50 text-yellow-700',
  processing: 'bg-blue-50 text-blue-700',
  completed: 'bg-green-50 text-green-700',
  failed: 'bg-red-50 text-red-700'
}

const PRIORITY_BADGES = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
}

export default function QueueStatus() {
  const [queueItems, setQueueItems] = useState(MOCK_QUEUE_ITEMS)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate queue updates
      setQueueItems(current => 
        current.map(item => {
          if (item.status === 'processing') {
            const progress = item.progress + Math.random() * 5
            return {
              ...item,
              progress: progress >= 100 ? 100 : progress,
              status: progress >= 100 ? 'completed' : 'processing'
            }
          }
          return item
        })
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Queue Status</h1>
          <p className="mt-2 text-sm text-gray-700">
            Real-time monitoring of ZK proof generation queue
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zk-primary hover:bg-zk-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zk-primary"
          >
            <ArrowPathIcon 
              className={`-ml-1 mr-2 h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average Wait Time
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      2m 45s
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        {/* Add more stat cards */}
      </div>

      {/* Filters */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'all' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('processing')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'processing' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'pending' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'completed' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                filter === 'failed' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {/* Queue Items */}
        <div className="overflow-hidden">
          <ul role="list" className="divide-y divide-gray-200">
            {queueItems.map((item) => (
              <li key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-2.5 w-2.5 rounded-full ${
                      item.status === 'processing' ? 'bg-blue-600 animate-pulse' : 
                      item.status === 'completed' ? 'bg-green-600' :
                      item.status === 'failed' ? 'bg-red-600' : 'bg-yellow-600'
                    }`} />
                    <p className="ml-4 text-sm font-medium text-gray-900">
                      {item.circuit}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      PRIORITY_BADGES[item.priority]
                    }`}>
                      {item.priority}
                    </span>
                    {item.status === 'processing' && (
                      <div className="w-32 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {item.status === 'processing' 
                        ? `${Math.round(item.progress)}%`
                        : item.status
                      }
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 
