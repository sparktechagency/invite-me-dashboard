import { baseApis } from './main/baseApis'

const guestApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuests: builder.query({
      query: (params) => ({
        url: '/normal-user/get-all-user',
        method: 'GET',
        params,
      }),
      providesTags: ['guest'],
    }),
    getSingleGuests: builder.query({
      query: (params) => {
        const { selectedId } = params
        return {
          url: `/normal-user/single-user/${selectedId}`,
          method: 'GET',
        }
      },
      providesTags: ['guest'],
    }),
    updateStatus: builder.mutation({
      query: (params) => {
        const { userId } = params
        return {
          url: `/user/change-status/${userId}`,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['guest'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllGuestsQuery,
  useGetSingleGuestsQuery,
  useUpdateStatusMutation,
} = guestApis

export default guestApis
