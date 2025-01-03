// Helper function to generate time series data
export const generateTimeSeriesData = (baseValue, count = 24, variance = 0.1) => {
  return Array(count).fill(0).map(() => {
    return +(baseValue + (Math.random() * variance * 2 - variance)).toFixed(2)
  })
}

// Generate timestamps for x-axis
export const generateTimeLabels = (count = 24, intervalMinutes = 5) => {
  const labels = []
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(Date.now() - i * intervalMinutes * 60000)
    labels.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
  }
  return labels
}

// Generate system resource data
export const generateSystemData = () => ({
  cpu: Math.floor(Math.random() * 30 + 60), // 60-90%
  memory: Math.floor(Math.random() * 20 + 70), // 70-90%
  gpu: Math.floor(Math.random() * 25 + 70), // 70-95%
  network: Math.floor(Math.random() * 40 + 30), // 30-70%
})

// Generate cost metrics
export const generateCostData = () => ({
  computeCost: +(Math.random() * 0.5 + 1.5).toFixed(3), // $1.5-2.0 per proof
  gasCost: +(Math.random() * 0.02 + 0.08).toFixed(3), // 0.08-0.10 ETH
  totalCost: +(Math.random() * 2 + 8).toFixed(2), // $8-10 total
}) 
