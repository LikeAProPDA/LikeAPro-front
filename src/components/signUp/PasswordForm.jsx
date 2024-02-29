import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setIsVerifyPassword } from '../../store/signUpReducer';

const PasswordForm = ({ password, setPassword, checkPassword, setCheckPassword }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Form.Group className="mt-2" controlId="formPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                    required
                    type="password"
                    placeholder="비밀번호 입력 (8자 이상)"
                    isInvalid={password.length > 0 && password.length < 8}
                    isValid={password.length >= 8 && password.length !== 0}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        dispatch(setIsVerifyPassword(false));
                    }}
                />
                <Form.Control.Feedback type="invalid">비밀번호가 올바르지 않습니다</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-2" controlId="formCheckPassword">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                    required
                    type="password"
                    isInvalid={checkPassword.length > 0 && password !== checkPassword}
                    isValid={checkPassword.length > 0 && password === checkPassword}
                    placeholder="비밀번호 확인"
                    value={checkPassword}
                    onChange={(e) => {
                        setCheckPassword(e.target.value);
                        if (e.target.value.length > 0 && password === e.target.value) {
                            dispatch(setIsVerifyPassword(true));
                        } else {
                            dispatch(setIsVerifyPassword(false));
                        }
                    }}
                />
                <Form.Control.Feedback type="invalid">비밀번호가 맞지 않습니다</Form.Control.Feedback>
            </Form.Group>
        </>
    );
};

export default PasswordForm;
