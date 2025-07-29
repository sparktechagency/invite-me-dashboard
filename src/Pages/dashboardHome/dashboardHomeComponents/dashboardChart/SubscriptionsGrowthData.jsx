import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend)

const SubscriptionsGrowthData = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  ).reverse()
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const SubscriptionsGrowthData = {
    labels: months,
    datasets: [
      {
        label: 'Subscriptions Growth',
        data: [20, 90, 40, 100, 60, 85, 70, 60, 50, 70, 80, 90],
        borderColor: '#2563EB',
        backgroundColor: '#2563EB',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="w-1/2 ">
      <div className=" bg-white p-3 rounded-md mr-4 ">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Subscriptions Growth</h2>
          <select className="p-2 bg-gray-100 rounded text-sm outline-none border border-gray-200">
            {years.map((year) => (
              <option key={year} value={year} className="cursor-pointer">
                {year}
              </option>
            ))}
          </select>
        </div>
        <Line options={{ responsive: true }} data={SubscriptionsGrowthData} />
      </div>
    </div>
  )
}

export default SubscriptionsGrowthData
