import { baseApis } from './main/baseApis'

const notificationsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: '/notification/get-notifications',
        method: 'GET',
      }),
      providesTags: ['notification'],
    }),

    deleteNotifications: builder.mutation({
      query: (id) => ({
        url: `/notification/delete-notification/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notification'],
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteNotificationsMutation, useGetAllNotificationsQuery } =
  notificationsApis

export default notificationsApis
