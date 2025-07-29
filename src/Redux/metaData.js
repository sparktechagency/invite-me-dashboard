import { baseApis } from './main/baseApis'

const metaApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: (params) => {
        return {
          url: '/meta/get-dashboard-meta-data',
          method: 'GET',
          params,
        }
      },
      providesTags: ['meta'],
    }),
  }),
})

export const { useGetMetaDataQuery } = metaApis

export default metaApis
