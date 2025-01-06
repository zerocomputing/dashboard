# ZK Monitor Dashboard

A real-time monitoring dashboard for ZK proof generation across multiple networks.

## Overview

This dashboard provides real-time monitoring and analytics for Zero-Knowledge proof generation across various blockchain networks. It offers comprehensive metrics, queue management, and historical tracking of proof generations.

## Supported Networks

- Aleo
- Aztec
- Bonsol
- Cysic
- Holonym
- Space and Time

## Features

### Real-time Monitoring
- Live proof generation tracking
- Network-specific performance metrics
- System resource utilization
- Success rate monitoring

### Queue Management
- Real-time queue status
- Priority-based queue visualization
- Network-specific proof tracking
- Progress monitoring

### Historical Data
- Comprehensive proof history
- Network-specific analytics
- Error tracking and analysis
- Performance trends

### Interactive Metrics
- Network comparison charts
- Success rate analytics
- Proving time analysis
- Resource utilization graphs

## Live Demo

Visit [https://zerocomputing.github.io/dashboard/](https://zerocomputing.github.io/dashboard/)

## Technology Stack

- React 18
- Vite
- TailwindCSS
- Chart.js
- React Router
- Headless UI

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

### Building for Production

1. Create production build: `npm run build`
2. Preview production build: `npm run preview`

## Deployment

The dashboard is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process is handled by GitHub Actions.

## Project Structure

```
dashboard/
├── src/
│   ├── components/           # React components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── NetworkMetrics.jsx
│   │   │   ├── ProvingTimeChart.jsx
│   │   │   └── SuccessRateChart.jsx
│   │   ├── metrics/         # Metrics visualization
│   │   │   ├── PerformancePanel.jsx
│   │   │   ├── SystemHealthPanel.jsx
│   │   │   └── QueueAnalyticsPanel.jsx
│   │   ├── Dashboard.jsx    # Main dashboard view
│   │   ├── History.jsx      # Proof history view
│   │   ├── Metrics.jsx      # Detailed metrics view
│   │   ├── QueueStatus.jsx  # Queue management
│   │   └── Sidebar.jsx      # Navigation sidebar
│   ├── utils/               # Utility functions
│   │   ├── metricsSimulator.js
│   │   └── networksData.js
│   ├── App.jsx              # Main application component
│   └── main.jsx            # Application entry point
├── public/                  # Static assets
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
