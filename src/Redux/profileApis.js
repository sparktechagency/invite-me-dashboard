import { baseApis } from './main/baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => ({
        url: '/user/get-my-profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    postProfileData: builder.mutation({
      query: (data) => {
        return {
          url: '/super-admin/update-profile',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileDataQuery, usePostProfileDataMutation } =
  privacyApis
export default privacyApis
