import { Container, Row, Col } from 'react-bootstrap';
import SignUpForm from '../../components/signUp/SignUpForm';
import { Provider } from 'react-redux';
import signUpStore from '../../store/signUpReducer';

const SignUpPage = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        <h2 className="text-center py-3 fw-bold">회원가입</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={10} md={8} xl={6}>
                        <Provider store={signUpStore}>
                            {' '}
                            <SignUpForm />
                        </Provider>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignUpPage;
