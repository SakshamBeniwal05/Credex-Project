import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.tsx'
import AuditPage from './Pages/AuditPage.tsx'
import FinalPage from './Pages/FinalPage.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/auditPage',
        element:<AuditPage/>
      },
            {
        path:'/Result/:slug',
        element:<FinalPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />
)
