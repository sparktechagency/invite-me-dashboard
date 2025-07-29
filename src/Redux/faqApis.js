import { baseApis } from './main/baseApis'

const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: () => ({
        url: '/manage/get-faq',
        method: 'GET',
      }),
      providesTags: ['faq'],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: '/manage/add-faq',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['faq'],
    }),
    updateFaq: builder.mutation({
      query: (data) => {
        const { id, ...body } = data
        return {
          url: `/manage/edit-faq/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: ['faq'],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/manage/delete-faq/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['faq'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis

export default faqApis
