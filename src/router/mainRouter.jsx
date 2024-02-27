import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import MainPage from "../pages/main/MainPage";
import QAPage from "../pages/qa/QAPage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signUp/SignUpPage";
import RankingPage from "../pages/ranking/RankingPage";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        index: true,
      },
      {
        path: "/qas",
        element: <QAPage />,
        index: true,
      },
      {
        path: "/login",
        element: <LoginPage />,
        index: true,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
        index: true,
      },
      {
        path: "/ranking",
        element: <RankingPage />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
