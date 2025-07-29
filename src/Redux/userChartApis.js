import { baseApis } from './main/baseApis'

const userChartApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getUserStatic: builder.query({
      query: (params) => ({
        url: '/meta/user-chart-data',
        method: 'GET',
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserStaticQuery } = userChartApis

export default userChartApis
