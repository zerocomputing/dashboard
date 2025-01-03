import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  ChartBarIcon,
  QueueListIcon,
  ClockIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  
  const navigation = [
    { name: 'Overview', href: '/', icon: HomeIcon, current: location.pathname === '/' },
    { name: 'Metrics', href: '/metrics', icon: ChartBarIcon, current: location.pathname === '/metrics' },
    { name: 'Queue Status', href: '/queue', icon: QueueListIcon, current: location.pathname === '/queue' },
    { name: 'History', href: '/history', icon: ClockIcon, current: location.pathname === '/history' },
  ]

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
          <div className="fixed inset-0 flex">
            <Transition.Child
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex flex-col bg-white px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">ZK Monitor</h2>
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          item.current
                            ? 'bg-zk-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-6 w-6 ${
                            item.current ? 'text-white' : 'text-gray-400'
                          }`}
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">ZK Monitor</h1>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-zk-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 ${
                      item.current ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
} 
