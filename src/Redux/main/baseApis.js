import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './server'

export const baseApis = createApi({
  reducerPath: 'hyeGatherApis',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'hotel',
    'faq',
    'privacyPolicy',
    'termsAndCondition',
    'Profile',
    'guest',
    'meta',
    'notification',
  ],
  endpoints: () => ({}),
})
