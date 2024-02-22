import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import MainPage from '../pages/MainPage';
import QAPage from '../pages/QAPage';
import LoginPage from '../pages/LoginPage';

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
        ],
    },
];

const router = createBrowserRouter(mainRouter);
export default router;
