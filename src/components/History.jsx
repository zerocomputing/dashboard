import { useState, useEffect } from 'react'
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

const MOCK_HISTORY = [
  {
    id: '1',
    network: 'Aleo',
    status: 'completed',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    duration: '2.3s',
    size: '2.4MB',
    proofType: 'Transaction Verification'
  },
  {
    id: '2',
    network: 'Space and Time',
    status: 'completed',
    timestamp: new Date(Date.now() - 4800000), // 1.3 hours ago
    duration: '2.2s',
    size: '2.7MB',
    proofType: 'Data Availability'
  },
  {
    id: '3',
    network: 'Aztec',
    status: 'failed',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    duration: '1.8s',
    size: '3.1MB',
    proofType: 'Privacy Shield',
    error: 'Circuit constraint violation'
  },
  {
    id: '4',
    network: 'Bonsol',
    status: 'completed',
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    duration: '2.1s',
    size: '1.8MB',
    proofType: 'State Transition'
  },
  {
    id: '5',
    network: 'Cysic',
    status: 'completed',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    duration: '2.5s',
    size: '2.9MB',
    proofType: 'Network Validation'
  },
  {
    id: '6',
    network: 'Holonym',
    status: 'completed',
    timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    duration: '1.9s',
    size: '2.2MB',
    proofType: 'Identity Verification'
  },
  {
    id: '7',
    network: 'Aleo',
    status: 'completed',
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    duration: '2.4s',
    size: '2.6MB',
    proofType: 'Smart Contract Execution'
  },
  {
    id: '8',
    network: 'Space and Time',
    status: 'failed',
    timestamp: new Date(Date.now() - 25200000), // 7 hours ago
    duration: '2.1s',
    size: '3.0MB',
    proofType: 'Query Validation',
    error: 'Timeout exceeded'
  },
  {
    id: '9',
    network: 'Aztec',
    status: 'completed',
    timestamp: new Date(Date.now() - 28800000), // 8 hours ago
    duration: '1.9s',
    size: '2.8MB',
    proofType: 'Zero-Knowledge Range Proof'
  },
  {
    id: '10',
    network: 'Cysic',
    status: 'completed',
    timestamp: new Date(Date.now() - 32400000), // 9 hours ago
    duration: '2.3s',
    size: '2.5MB',
    proofType: 'Consensus Verification'
  },
  {
    id: '11',
    network: 'Holonym',
    status: 'completed',
    timestamp: new Date(Date.now() - 36000000), // 10 hours ago
    duration: '2.0s',
    size: '2.3MB',
    proofType: 'Credential Proof'
  },
  {
    id: '12',
    network: 'Bonsol',
    status: 'failed',
    timestamp: new Date(Date.now() - 39600000), // 11 hours ago
    duration: '2.2s',
    size: '2.1MB',
    proofType: 'Account Verification',
    error: 'Invalid witness'
  }
]

const STATUS_STYLES = {
  completed: 'bg-green-50 text-green-700',
  failed: 'bg-red-50 text-red-700'
}

// Move this to a separate utils file if it grows
const generateNewProof = () => {
  const networks = [
    { name: 'Aleo', proofTypes: ['Transaction Verification', 'Smart Contract Execution', 'State Validation'] },
    { name: 'Aztec', proofTypes: ['Privacy Shield', 'Zero-Knowledge Range Proof', 'Anonymous Transfer'] },
    { name: 'Bonsol', proofTypes: ['State Transition', 'Account Verification', 'Block Validation'] },
    { name: 'Cysic', proofTypes: ['Network Validation', 'Consensus Verification', 'Node Authentication'] },
    { name: 'Holonym', proofTypes: ['Identity Verification', 'Credential Proof', 'Access Control'] },
    { name: 'Space and Time', proofTypes: ['Data Availability', 'Query Validation', 'Time Series Proof'] }
  ]

  const randomNetwork = networks[Math.floor(Math.random() * networks.length)]
  const randomProofType = randomNetwork.proofTypes[Math.floor(Math.random() * randomNetwork.proofTypes.length)]
  const isSuccess = Math.random() > 0.15 // 85% success rate

  return {
    id: Date.now().toString(),
    network: randomNetwork.name,
    status: isSuccess ? 'completed' : 'failed',
    timestamp: new Date(),
    duration: `${(Math.random() * 0.7 + 1.8).toFixed(1)}s`,
    size: `${(Math.random() * 1.5 + 1.5).toFixed(1)}MB`,
    proofType: randomProofType,
    ...(isSuccess ? {} : {
      error: [
        'Circuit constraint violation',
        'Timeout exceeded',
        'Invalid witness',
        'Memory limit exceeded',
        'Verification failed'
      ][Math.floor(Math.random() * 5)]
    })
  }
}

// Add network-specific generation rates
const NETWORK_RATES = {
  'Aleo': { minInterval: 15000, maxInterval: 25000 },       // 15-25 seconds
  'Aztec': { minInterval: 20000, maxInterval: 30000 },      // 20-30 seconds
  'Bonsol': { minInterval: 25000, maxInterval: 35000 },     // 25-35 seconds
  'Cysic': { minInterval: 18000, maxInterval: 28000 },      // 18-28 seconds
  'Holonym': { minInterval: 22000, maxInterval: 32000 },    // 22-32 seconds
  'Space and Time': { minInterval: 17000, maxInterval: 27000 } // 17-27 seconds
}

export default function History() {
  const [historyItems, setHistoryItems] = useState(MOCK_HISTORY)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Add new proofs periodically
  useEffect(() => {
    // Generate a proof for a random network
    const generateProofForRandomNetwork = () => {
      const newProof = generateNewProof()
      setHistoryItems(prevItems => [newProof, ...prevItems].slice(0, 50))

      // Schedule next proof with random interval based on network rates
      const network = Object.keys(NETWORK_RATES)[Math.floor(Math.random() * Object.keys(NETWORK_RATES).length)]
      const { minInterval, maxInterval } = NETWORK_RATES[network]
      const nextInterval = Math.random() * (maxInterval - minInterval) + minInterval
      
      setTimeout(generateProofForRandomNetwork, nextInterval)
    }

    // Start the generation process
    generateProofForRandomNetwork()

    // Cleanup
    return () => {
      // Any necessary cleanup
    }
  }, [])

  const formatTimestamp = (date) => {
    const diffMinutes = Math.floor((new Date() - date) / 60000)
    
    if (diffMinutes < 1) return 'Just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    return date.toLocaleDateString()
  }

  const filteredHistory = historyItems.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter
    const matchesSearch = searchTerm === '' || 
      item.network.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.proofType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Proof History</h1>
        <p className="mt-1 text-sm text-gray-500">
          View past proof generations and their outcomes
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
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
        <div className="relative">
          <input
            type="text"
            placeholder="Search by network or proof type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-zk-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* History List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {filteredHistory.map((item) => (
            <li key={item.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 gap-x-4">
                  <div className={`flex-none rounded-full p-1 ${
                    item.status === 'completed' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.network}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.proofType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-8">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="flex items-center gap-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2 mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-500">{item.duration}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm text-gray-500">{item.size}</p>
                    {item.error && (
                      <p className="mt-1 text-xs text-red-500">{item.error}</p>
                    )}
                  </div>
                  <div className={`rounded-md px-2 py-1 text-xs font-medium ${STATUS_STYLES[item.status]}`}>
                    {item.status}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 
