import { Container, Nav, Navbar } from 'react-bootstrap';
import useWidth from '../../../lib/hooks/useWidth';
import logo from '../../../assets/images/shin_logo.png';
import PrimaryButton from '../button/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/userReducer';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './customNavbar.css';

const CustomNavbar = () => {
    const width = useWidth();
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.isLogin);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const loginClick = useCallback(() => {
        navigate('/login');
    }, []);

    const logoutClick = useCallback(() => {
        dispatch(logoutUser());
    }, []);

    return (
        <Navbar expand="md" className="bg-white py-0">
            <Container className={width < 767 ? 'py-2' : false}>
                <Navbar.Brand href="/" className="text-primary fw-bold">
                    <img src={logo} width="28" height="28" className="d-inline-block align-top" />
                    {'  '} Like A Pro
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant={width < 767 ? false : 'underline'} defaultActiveKey="/" className="me-auto">
                        <Nav.Item>
                            <Nav.Link eventKey="/" as={Link} to="/" className={width < 767 ? false : 'customNavLink'}>
                                메인
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="/qas"
                                as={Link}
                                to="/qas"
                                className={width < 767 ? false : 'customNavLink'}
                            >
                                지식 투자
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="/ranking"
                                href="#ranking"
                                className={width < 767 ? false : 'customNavLink'}
                            >
                                랭킹
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {isLogin ? (
                        <>
                            <h6 className="my-auto me-4 py-2 fw-bold">
                                {user.nickname} <small>님</small>{' '}
                            </h6>
                            <PrimaryButton text="로그아웃" minWidth={120} onClick={logoutClick} />
                        </>
                    ) : (
                        <>
                            <PrimaryButton
                                text="로그인"
                                minWidth={120}
                                style={{ marginRight: '10px' }}
                                onClick={loginClick}
                            />
                            <PrimaryButton text="회원가입" minWidth={120} />
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default CustomNavbar;
