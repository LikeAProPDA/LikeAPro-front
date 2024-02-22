import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import AuthProvider from './components/common/auth/AuthProvider';
import router from './router/mainRouter';

const App = () => {
    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    );
};

export default App;
