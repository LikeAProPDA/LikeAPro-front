import { useCallback, useEffect, useState } from 'react';
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import validator from 'validator';
import CustomAlert from '../common/alert/CustomAlert';
import { isVerifyEmail, sendVerifyEmail } from '../../lib/apis/userApi';
import { useDispatch } from 'react-redux';
import { setIsVerifyEmail } from '../../store/signUpReducer';

const EmailForm = ({ email, setEmail }) => {
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isEmailVerifyButtonClick, setIsEmailVerifyButtonClick] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(null);
    const [isVerify, setIsVerify] = useState(null);
    const [timer, setTimer] = useState(null);
    const dispatch = useDispatch();

    const onEmailChange = useCallback((email) => {
        setEmail(email);
        setIsDuplicateEmail(false);
        setIsEmailVerifyButtonClick(false);
        setIsVerify(null);
        dispatch(setIsVerifyEmail(false));

        if (!validator.isEmail(email)) {
            setIsInvalidEmail(true);
            return;
        }

        setIsInvalidEmail(false);
    }, []);

    useEffect(() => {
        if (timer) {
            const id = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            if (timer === 0) {
                clearInterval(id);
            }

            return () => clearInterval(id);
        }
    }, [timer]);

    useEffect(() => {
        if (email.length === 0) {
            setVerifyCode('');
            setIsEmailVerifyButtonClick(false);
        }
    }, [email]);

    const toTime = useCallback((timer) => {
        const minute = Math.floor(timer / 60);
        const second = timer - minute * 60;

        return `${minute}:${second < 10 ? '0' + second : second}`;
    }, []);

    const sendVerifyEmailButtonClick = useCallback(async (isInvalidEmail, email) => {
        if (isInvalidEmail || email.length === 0) {
            setShowAlert(true);
            return;
        }

        try {
            const { result } = await sendVerifyEmail(email);

            setTimer(result.maxAge / 1000);
            setIsEmailVerifyButtonClick(true);
        } catch (err) {
            setIsDuplicateEmail(true);
        }
    }, []);

    const isVerifyEmailButtonClick = useCallback(async (email, verifyCode) => {
        const { result } = await isVerifyEmail(email, verifyCode);

        setIsVerify(result.isVerify);
        dispatch(setIsVerifyEmail(result.isVerify));
    });

    return (
        <>
            <FormGroup controlId="formEmail">
                <Form.Label>이메일</Form.Label>
                <InputGroup className="border rounded">
                    <Form.Control
                        required
                        type="email"
                        placeholder="이메일 입력"
                        isInvalid={isInvalidEmail || isDuplicateEmail}
                        value={email}
                        isValid={isVerify && email.length != 0}
                        className="border-0"
                        onChange={(e) => onEmailChange(e.target.value)}
                    />
                    <Button
                        variant="outline-primary"
                        className="rounded m-3"
                        size="sm"
                        onClick={() => sendVerifyEmailButtonClick(isInvalidEmail, email)}
                    >
                        인증 메일 발송
                    </Button>
                </InputGroup>
                <Form.Control.Feedback
                    type="invalid"
                    style={{ display: isInvalidEmail && email.length !== 0 ? 'block' : 'none' }}
                >
                    이메일 형식이 아닙니다.
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" style={{ display: isDuplicateEmail ? 'block' : 'none' }}>
                    해당 이메일은 이미 사용 중 입니다.
                </Form.Control.Feedback>
                <Form.Control.Feedback style={{ display: isVerify && email.length != 0 ? 'block' : 'none' }}>
                    사용 가능한 이메일 입니다.
                </Form.Control.Feedback>
            </FormGroup>
            <CustomAlert
                setShow={setShowAlert}
                show={showAlert}
                variant="danger"
                heading="이메일 문제"
                content="먼저 이메일을 올바르게 기입하여 주세요"
            />
            {isEmailVerifyButtonClick ? (
                <FormGroup controlId="formEmailCheck">
                    <Form.Label>이메일 인증 코드</Form.Label>
                    <InputGroup className="border rounded">
                        <Form.Control
                            required
                            type="text"
                            placeholder="인증 코드 입력"
                            value={verifyCode}
                            isInvalid={isVerify !== null && !isVerify}
                            isValid={isVerify && email.length != 0}
                            className="border-0"
                            onChange={(e) => {
                                setIsVerify(null);
                                setVerifyCode(e.target.value);
                                dispatch(setIsVerifyEmail(false));
                            }}
                        />
                        <div className="my-auto">{toTime(timer)}</div>
                        <Button
                            variant="outline-primary"
                            className="rounded m-3"
                            size="sm"
                            onClick={() => isVerifyEmailButtonClick(email, verifyCode)}
                        >
                            이메일 인증
                        </Button>
                    </InputGroup>
                    <Form.Control.Feedback
                        type="invalid"
                        style={{ display: isVerify !== null && !isVerify ? 'block' : 'none' }}
                    >
                        인증 코드가 옳지 않거나 인증 시간이 만료되었습니다.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback style={{ display: isVerify && email.length != 0 ? 'block' : 'none' }}>
                        이메일 인증이 완료 되었습니다
                    </Form.Control.Feedback>
                </FormGroup>
            ) : null}
        </>
    );
};

export default EmailForm;
