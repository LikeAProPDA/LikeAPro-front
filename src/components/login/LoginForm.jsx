import { useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CustomAlert from '../common/alert/CustomAlert';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../store/userReducer';
import validator from 'validator';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswordInitAlert, setShowPasswordInitAlert] = useState(false);
    const [showLoginFailAlert, setShowLoginFailAlert] = useState(false);

    const onEmailChange = useCallback((email) => {
        setEmail(email);
    }, []);

    const onPasswordChange = useCallback((password) => {
        setPassword(password);
    }, []);

    const handleSubmit = useCallback(async (event, email, password) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }

        const { meta } = await dispatch(fetchUser({ email: email, password: password }));

        if (meta.requestStatus === 'fulfilled') {
            setValidated(true);
            console.log('Login Success');
            return navigate('/');
        }

        setValidated(false);
        console.log('login Not Success');
        setShowLoginFailAlert(true);
    }, []);

    return (
        <Container className="bg-white rounded p-5">
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e, email, password)}>
                <Form.Group controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        required
                        isInvalid={email.length > 0 && !validator.isEmail(email)}
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        value={email}
                        onChange={(e) => {
                            onEmailChange(e.target.value);
                        }}
                    />
                    <Form.Control.Feedback type="invalid">이메일 형식이 올바르지 않습니다</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-4">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        required
                        isInvalid={password.length > 0 && password.length < 8}
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        onChange={(e) => {
                            onPasswordChange(e.target.value);
                        }}
                    />
                    <Form.Control.Feedback type="invalid">비밀번호는 최소 8자 이상이어야 합니다</Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-4" size="lg" style={{ width: '100%' }} type="submit">
                    로그인
                </Button>
                <Container className="mt-4">
                    <Row className="justify-content-center">
                        <Col
                            as={Link}
                            className="text-end text-muted"
                            style={{ textDecoration: 'none' }}
                            onClick={() => {
                                setShowPasswordInitAlert(true);
                            }}
                        >
                            비밀번호 초기화
                        </Col>
                        <Col
                            as={Link}
                            className="text-start text-muted"
                            style={{ textDecoration: 'none' }}
                            to="/sign-up"
                        >
                            {' '}
                            회원가입
                        </Col>
                    </Row>
                </Container>
            </Form>
            <CustomAlert
                setShow={setShowPasswordInitAlert}
                show={showPasswordInitAlert}
                onClose={() => setShowPasswordInitAlert(false)}
                heading="아직 지원하지 않는 기능"
                content="아직 비밀번호 초기화는 지원하지 않는 기능입니다."
            />
            <CustomAlert
                setShow={setShowLoginFailAlert}
                show={showLoginFailAlert}
                onClose={() => setShowLoginFailAlert(false)}
                variant="danger"
                heading="로그인 실패"
                content="아이디 혹은 비밀번호를 확인해주세요"
            />
        </Container>
    );
};

export default LoginForm;
