import { baseApis } from './main/baseApis'

const hotelApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: (params) => ({
        url: '/hotel/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['hotel'],
    }),
    createHotels: builder.mutation({
      query: (data) => ({
        url: '/hotel/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['hotel'],
    }),
    updateHotel: builder.mutation({
      query: ({ id, otherData }) => ({
        url: `/hotel/update/${id}`,
        method: 'PATCH',
        body: otherData,
      }),
      invalidatesTags: ['hotel'],
    }),
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `/hotel/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['hotel'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllHotelsQuery,
  useCreateHotelsMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApis

export default hotelApis
