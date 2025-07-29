import { createBrowserRouter } from 'react-router-dom'

import Login from '../Pages/auth/Login'
import ForgetPassword from '../Pages/auth/ForgetPassword'
import VerifyCode from '../Pages/auth/VerifyCode'
import SetNewPassword from '../Pages/auth/SetNewPassword'

import AdminRoute from '../ProtectedRoute/AdminRoute'
import Dashboard from '../Pages/layout/Dashboard'
import DashboardHome from '../Pages/dashboardHome/DashboardHome'
import PrivacyPolicy from '../Pages/privacyPolicy/PrivacyPolicy'
import TermsAndConditions from '../Pages/termsAndConditions/TermsAndConditions'
import Profile from '../Pages/profile/Profile'
import MakeAdmin from '../Pages/makeAdmin/MakeAdmin'
import ErrorBoundary from '../ErrorBoundary'
import GuestManagement from '../Pages/userManagement/guestManagement/GuestManagement'
import HotelsManagement from '../Pages/hotelsManagement/HotelsManagement'
import FAQ from '../Pages/faq/FAQ'
import Reports from '../Pages/reports/Reports'
import Notifications from '../Pages/notifications/Notifications'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: '/guests-management',
        element: <GuestManagement />,
      },
      {
        path: '/hotels-management',
        element: <HotelsManagement />,
      },

      {
        path: '/make-admin',
        element: <MakeAdmin />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },

      {
        path: '/settings/faq',
        element: <FAQ />,
      },
      {
        path: '/settings/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/settings/terms-and-condition',
        element: <TermsAndConditions />,
      },
      {
        path: '/settings/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forget-password',
    element: <ForgetPassword />,
  },
  {
    path: '/verify-code',
    element: <VerifyCode />,
  },
  {
    path: '/reset-password',
    element: <SetNewPassword />,
  },
])
export default router
