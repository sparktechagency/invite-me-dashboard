'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetUserStaticQuery } from '../../../../Redux/userChartApis'
import { useState, useMemo } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserGrowthData = () => {
  const [selectedYear, setSelectedYear] = useState()

  const { data: userStatic, isLoading } = useGetUserStaticQuery({
    year: selectedYear,
  })

  const currentYear = new Date().getFullYear()

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const years = useMemo(() => {
    return userStatic?.data?.yearsDropdown?.length > 0
      ? userStatic.data.yearsDropdown
      : [currentYear]
  }, [userStatic])

  const userGrowthData = useMemo(() => {
    const chartData = userStatic?.data?.chartData ?? []

    const dataByMonth = months.map((month) => {
      const found = chartData.find((item) => item.month === month)
      return found ? found.totalUser : 0
    })

    return {
      labels: months,
      datasets: [
        {
          label: 'User Growth',
          data: dataByMonth,
          backgroundColor: '#11CD95',
          borderRadius: 10,
        },
      ],
    }
  }, [userStatic])

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value)
    console.log(e.target.value)
    setSelectedYear(year)
  }

  return (
    <div className="w-full mt-5 border-2 border-[#11CD95] rounded-md p-3">
      <div className="bg-white ml-5 rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">User Ratio</h2>
          <select
            onChange={handleYearChange}
            value={selectedYear ?? ''}
            className="p-2 rounded text-sm outline-none bg-[#11CD95] text-white"
          >
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option
                key={year}
                value={year}
                className="cursor-pointer text-black"
              >
                {year}
              </option>
            ))}
          </select>
        </div>

        {!isLoading ? (
          <Bar height={70} data={userGrowthData} />
        ) : (
          <p className="text-gray-500 text-center py-5">Loading chart...</p>
        )}
      </div>
    </div>
  )
}

export default UserGrowthData
