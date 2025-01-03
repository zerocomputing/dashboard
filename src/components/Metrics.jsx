import { Tab } from '@headlessui/react'
import PerformancePanel from './metrics/PerformancePanel'
import SystemHealthPanel from './metrics/SystemHealthPanel'
import QueueAnalyticsPanel from './metrics/QueueAnalyticsPanel'

// Make sure Chart.js is properly registered
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Metrics() {
  const categories = [
    { name: 'Performance', current: true },
    { name: 'System Health', current: false },
    { name: 'Queue Analytics', current: false },
    { name: 'Cost Analysis', current: false },
    { name: 'Quality Metrics', current: false },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Detailed Metrics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Comprehensive analysis of ZK prover performance and system metrics
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {categories.map((category) => (
              <Tab
                key={category.name}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                   ${selected 
                     ? 'bg-white text-blue-700 shadow'
                     : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
                   }`
                }
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <PerformancePanel />
            </Tab.Panel>

            <Tab.Panel>
              <SystemHealthPanel />
            </Tab.Panel>

            <Tab.Panel>
              <QueueAnalyticsPanel />
            </Tab.Panel>

            <Tab.Panel>
              <div className="text-center py-12 text-gray-500">
                Cost Analysis metrics coming soon...
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="text-center py-12 text-gray-500">
                Quality metrics coming soon...
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
} 
