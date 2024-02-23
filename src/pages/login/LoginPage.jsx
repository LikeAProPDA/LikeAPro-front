import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="text-center py-5 mt-5 fw-bold">로그인</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={10} md={8} xl={6}>
                        <LoginForm />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
