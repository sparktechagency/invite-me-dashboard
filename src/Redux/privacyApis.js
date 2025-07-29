import { baseApis } from './main/baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => {
        return {
          url: '/manage/get-privacy-policy',
          method: 'GET',
        }
      },
      providesTags: ['privacyPolicy'],
    }),

    postPrivacy: builder.mutation({
      query: (data) => {
        return {
          url: '/manage/add-privacy-policy',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
})

export const { useGetPrivacyQuery, usePostPrivacyMutation } = privacyApis

export default privacyApis
