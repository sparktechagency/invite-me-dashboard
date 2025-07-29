import { baseApis } from './main/baseApis'

const reportApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: () => ({
        url: '/report/all-reports',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllReportsQuery } = reportApis

export default reportApis
