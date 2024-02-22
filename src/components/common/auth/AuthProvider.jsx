import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoFetchUser } from '../../../store/userReducer';

const AuthProvider = ({ children }) => {
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(autoFetchUser());
    }, []);

    return children;
};

export default AuthProvider;
