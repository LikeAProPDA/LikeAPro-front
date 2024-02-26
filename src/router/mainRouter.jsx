import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import MainPage from '../pages/main/MainPage';
import QAPage from '../pages/qa/QAPage';
import LoginPage from '../pages/login/LoginPage';
import SignUpPage from '../pages/signUp/SignUpPage';
import QADetailPage from '../pages/qa/QADetailPage';

export const mainRouter = [
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <MainPage />,
                index: true,
            },
            {
                path: '/qas',
                element: <QAPage />,
                index: true,
            },
            {
                path: '/login',
                element: <LoginPage />,
                index: true,
            },
            {
                path: '/sign-up',
                element: <SignUpPage />,
                index: true,
            },
            {
                path: '/qas/:id',
                element: <QADetailPage />,
                index: true,
            },
        ],
    },
];

const router = createBrowserRouter(mainRouter);
export default router;
