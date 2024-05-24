import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  Landing,
  Home,
  RootLayout,
  Register,
  Login,
  ProtectedRoutes,
  PublicRoutes,
  SingleBlog,
} from "./pages/index";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route path="/singleblog/:id" element={<SingleBlog />} />

        <Route
          path="landing"
          element={
            <PublicRoutes>
              <Landing />
            </PublicRoutes>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
