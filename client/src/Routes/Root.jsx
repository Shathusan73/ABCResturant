import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";



import NotFound from "../Layout/NotFound";
import Home from "../pages/Home";
import RootLayout from "../Layout/RootLayout";
import About from "../pages/About";
import Menu from "../pages/Menu";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound/>}>
    <Route index element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
     
    </Route>
  )
);

const Root = () => {
  return (
   
      <RouterProvider router={router} />

  );
};

// const Root = () => {
//   return <RouterProvider router={router} />;
// };

export default Root;
