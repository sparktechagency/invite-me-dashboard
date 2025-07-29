import { baseApis } from './main/baseApis'

const termsAndConditionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/manage/get-terms-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndCondition'],
    }),
    postTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: '/manage/add-terms-conditions',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['termsAndCondition'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTermsAndConditionsQuery,
  usePostTermsAndConditionsMutation,
} = termsAndConditionApis
export default termsAndConditionApis
