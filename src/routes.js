import { createBrowserRouter } from "react-router-dom";
import App from "./App";


import Feed from "./Pages/Feed/Feed"
import Welcome from "./Pages/Welcome";
import Comments from "./Pages/Comments/Comments"
import Report from "./Pages/Report/Report"
import ClaimItem from "./Pages/ClaimItem/ClaimItem"
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import EnterDetails from "./Pages/EnterDetails";
import LostPost from "./Pages/LostPost/LostPost";
import FoundPost from "./Pages/FoundPost/FoundPost";
import Profile from "./Pages/User/Profile";
import Ending from "./Pages/Ending";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {
            path: "/",
            element: <Feed />,
        },
        {
          path: "/comments/:id",
          element: <Comments />,
        },
        {
          path: "/report/:id",
          element: <Report />
        },
        {
          path: "/claimitem/:id",
          element: <ClaimItem />
        },
        {
          path: "/lostpost",
          element: <LostPost />
        },
        {
          path: "foundpost",
          element: <FoundPost />
        },
        {
          path: "/profile",
          element: <Profile />
        }
    ]
  },
  {
    path :"signup",
    element:<Signup/>
  },
  {
    path :"Login",
    element:<Login/>
  },
  {
    path :"details",
    element:<EnterDetails/>
  },
  {
    path : "ending",
    element:<Ending/>
  },
  {
    path : "welcome",
    element:<Welcome/>
  }
]);
