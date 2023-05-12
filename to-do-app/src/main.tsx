import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import HomePage from './components/pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './components/pages/Login/LoginPage';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<HomePage/>,
        },
        {
          path:'/login',
          element:<LoginPage/>
        }
      ]
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
