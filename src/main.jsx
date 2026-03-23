import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Cube from "./components/cube/Cube.jsx";
import CameraViews from "./components/cube/CameraViews.jsx";
import OpeningCube from "./components/cube/OpeningCube.jsx";
import GravityCube from "./components/cube/GravityCube.jsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Cube />,
        },
        {
          path: "/camera-views",
          element: <CameraViews />,
        },
        {
          path: "/eid-wish",
          element: <OpeningCube />,
        },
        {
          path: "/gravity-cube",
          element: <GravityCube />,
        },
      ],
    },
  ],
  {
    basename: "/HCI_threejs/",
  },
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>,
);
