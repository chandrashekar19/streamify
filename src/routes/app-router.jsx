import { createBrowserRouter } from "react-router-dom";
import Body from "../pages/body";
import MainContainer from "../pages/main-container";
import WatchPage from "../pages/watch-page";
import Demo from "../components/demo";
import Demo2 from "../components/demo2";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "demo",
        element: (
          <>
            <Demo />
            <Demo2 />
          </>
        ),
      },
    ],
  },
]);

export default appRouter;
