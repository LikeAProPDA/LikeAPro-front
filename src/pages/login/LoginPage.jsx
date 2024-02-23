import { Container, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="text-center">로그인</h2>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;
