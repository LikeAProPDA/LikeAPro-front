import { Button, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/userReducer';

const TestPage = () => {
    const user = useSelector((state) => state.user);
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();

    console.log(isLogin);
    console.log(user);
    return (
        <>
            <Container>
                <div>{isLogin}</div>
                <Container className="bg-white">
                    <div>{user ? user.nickname : '로그인 안됨'}</div>
                    <Button
                        onClick={() => {
                            dispatch(logoutUser());
                        }}
                    >
                        로그아웃
                    </Button>
                </Container>
            </Container>
        </>
    );
};

export default TestPage;
