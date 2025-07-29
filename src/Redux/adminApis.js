import { baseApis } from './main/baseApis'

const adminApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => ({
        url: '/admin/all-admins',
        method: 'GET',
      }),
      providesTags: ['admin'],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/admin/create-admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['admin'],
    }),
    updateAdmin: builder.mutation({
      query: (data) => {
        const { id, name, email } = data
        return {
          url: `/admin/update-admin/${id}`,
          method: 'PATCH',
          body: {
            name,
            email,
          },
        }
      },
      invalidatesTags: ['admin'],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['admin'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApis

export default adminApis
