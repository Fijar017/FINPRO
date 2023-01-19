import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './component/Form/Form';
import Home from './component/Home/Home';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailFoods from './component/DetailFoods/DetailFoods';
import { AddFoods } from './component/AddFoods/AddFoods';
import { MyFavorite } from './component/MyFavorite/MyFavorite';
import { Foods } from './component/Foods/Foods';
import AllUsers from './component/AllUsers/AllUsers';
import Profile from './component/Profile/Profile';
import Rating from './component/Rating/Rating';

const router = createBrowserRouter([
  {
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <Form />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/my-favorite",
        element: <MyFavorite />,
      },
      {
        path: "/foods",
        element: <Foods />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },    
      {
        path: "/profile-user",
        element: <Profile />,
      },       
      {
        path: "/detail-foods/:id",
        element: <DetailFoods />,
      },
      {
        path: "/add-foods",
        element: <AddFoods />,
      },
      {
        path: "/rating/:foodsID",
        element: <Rating />,
      },
    ]
    ,
    
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();