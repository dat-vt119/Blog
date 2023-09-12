import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogDetailPage from "./pages/BlogDetailPage";
import MyListPage from "./pages/MyListPage";
import BlogRoot from "./pages/BlogRoot";
import EditBlogPage from "./pages/EditBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewBlogPage from "./pages/NewBlogPage";
import Root from "./pages/Root";
import userContext from "./store/user-context";
import BlogListPage from "./pages/BlogListPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "blogs",
        element: <BlogRoot />,
        children: [
          {
            index: true,
            element: <BlogListPage />,
          },
          {
            path: "profile",
            element: [<MyListPage />],
          },
          {
            path: ":blogId",
            element: <BlogDetailPage />,
          },
          {
            path: "profile/:blogId",
            element: <BlogDetailPage />,
          },
          {
            path: "profile/:blogId/edit",
            element: <EditBlogPage />,
          },
          {
            path: "profile/new",
            element: <NewBlogPage />,
          },
        ],
      },
      {
        path: "homepage",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          console.log("not login");

          return;
        }
        setIsLogged(true);
        setUser(user);
      });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <userContext.Provider
      value={{
        user: user,
        isLogged: isLogged,
        listUser: [],
        listBlog: [],
        currentUser: "",
      }}
    >
      <RouterProvider router={router} />
    </userContext.Provider>
  );
}

export default App;
