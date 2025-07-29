import { Table, Avatar } from 'antd'
import dayjs from 'dayjs'
import { useGetAllReportsQuery } from '../../Redux/reportApis'
import Loader from '../Loader'

function Reports() {
  const { data: reports, isLoading, isError } = useGetAllReportsQuery()

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p>Failed to load reports. Please try again later.</p>
      </div>
    )
  }

  const reportsData =
    reports?.data?.result?.map((report, index) => ({
      key: report._id,
      sno: index + 1,
      reportFrom: report.reportFrom,
      reportTo: report.reportTo,
      incidentType: report.incidentType,
      additionalNote: report.additionalNote,
      createdAt: report.createdAt,
    })) || []

  const columns = [
    {
      title: <div className="font-bold text-xl !text-poppins">S.ID</div>,
      dataIndex: 'sno',
      key: 'sno',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Report From</div>,
      dataIndex: 'reportFrom',
      key: 'reportFrom',
      render: (user) => (
        <div className="flex items-center gap-2">
          <Avatar src={user?.profile_image} />
          <span className="text-gray-600 text-[15px] !text-poppins">
            {user?.name}
          </span>
        </div>
      ),
    },
    {
      title: (
        <div className="font-bold text-xl !text-poppins">Report Reason</div>
      ),
      dataIndex: 'incidentType',
      key: 'incidentType',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: (
        <div className="font-bold text-xl !text-poppins">Additional Note</div>
      ),
      dataIndex: 'additionalNote',
      key: 'additionalNote',
      render: (text) => (
        <span className="text-gray-600 text-[15px] !text-poppins">{text}</span>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Report To</div>,
      dataIndex: 'reportTo',
      key: 'reportTo',
      render: (user) => (
        <div className="flex items-center gap-2">
          <Avatar src={user?.profile_image} />
          <span className="text-gray-600 text-[15px] !text-poppins">
            {user?.name}
          </span>
        </div>
      ),
    },
    {
      title: <div className="font-bold text-xl !text-poppins">Date & Time</div>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <span className="text-gray-600 text-[15px] !text-poppins">
          {dayjs(date).format('DD MMM YYYY, h:mm A')}
        </span>
      ),
    },
  ]

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow !p-6 border-[#11CD95] border-2 rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
        </div>

        <Table
          columns={columns}
          dataSource={reportsData}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  )
}

export default Reports
