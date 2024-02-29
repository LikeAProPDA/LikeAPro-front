import { useCallback, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import NicknameForm from './NicknameForm';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import BackjoonIdForm from './BackjoonIdForm';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from '../common/alert/CustomAlert';
import { signUp } from '../../lib/apis/userApi';
import { clear } from '../../store/signUpReducer';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [backjoonId, setBackjoonId] = useState('');
    const [beforeAlert, setBeforeAlert] = useState(false); // 폼 입력 이전 시 회원가입하려 할 시
    const [signUpAlert, setSignUpAlert] = useState(false);
    const signUpState = useSelector((state) => state.signUp);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = useCallback(async (event, nickname, email, password, backjoonId, signUpState) => {
        event.preventDefault();
        console.log(signUpState);
        if (
            signUpState.isVerifyNickname &&
            signUpState.isVerifyEmail &&
            signUpState.isVerifyPassword &&
            signUpState.isVerifyBackjoonId
        ) {
            dispatch(clear());
            try {
                await signUp(nickname, email, password, backjoonId);

                navigate('/');
            } catch (err) {
                setSignUpAlert(true);
                setEmail('');
                setNickname('');
                setPassword('');
                setCheckPassword('');
                setBackjoonId('');
            }

            return;
        }

        setBeforeAlert(true);
    }, []);

    return (
        <Container className="bg-white rounded p-5">
            <Form noValidate onSubmit={(e) => handleSubmit(e, nickname, email, password, backjoonId, signUpState)}>
                <NicknameForm nickname={nickname} setNickname={setNickname} />
                <EmailForm email={email} setEmail={setEmail} />
                <PasswordForm
                    password={password}
                    setPassword={setPassword}
                    checkPassword={checkPassword}
                    setCheckPassword={setCheckPassword}
                />
                <BackjoonIdForm backjoonId={backjoonId} setBackjoonId={setBackjoonId} />
                <Button className="mt-2" size="lg" style={{ width: '100%' }} type="submit">
                    회원가입
                </Button>
            </Form>
            <CustomAlert
                setShow={setBeforeAlert}
                show={beforeAlert}
                variant="danger"
                heading="회원가입 문제"
                content="먼저 회원가입 폼을 다 작성해주세요"
            />
            <CustomAlert
                setShow={setSignUpAlert}
                show={signUpAlert}
                variant="danger"
                heading="회원가입 문제"
                content="회원 가입에 문제가 생겼습니다. 회원가입 폼을 다시 작성해주세요."
            />
        </Container>
    );
};

export default SignUpForm;
