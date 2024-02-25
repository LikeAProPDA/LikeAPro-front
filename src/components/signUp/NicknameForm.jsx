import { useCallback, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import validator from 'validator';
import { isDuplicateNickname } from '../../lib/apis/userApi';
import CustomAlert from '../common/alert/CustomAlert';
import { useDispatch } from 'react-redux';
import { setIsVerifyNickname } from '../../store/signUpReducer';

const NicknameForm = ({ nickname, setNickname, allValidated, setAllValidated }) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();

    const onNicknameChange = useCallback((nickname) => {
        setNickname(nickname);
        setIsDuplicate(null);
        dispatch(setIsVerifyNickname(false));

        if (nickname.length > 0 && !validator.isLength(nickname, { min: 2, max: 12 })) {
            setIsInvalid(true);
            return;
        }

        setIsInvalid(false);
    }, []);

    const onDuplicateNicknameCheck = useCallback(async (isInvalid, nickname) => {
        if (isInvalid || nickname.length == 0) {
            setShowAlert(true);
        }

        const { result } = await isDuplicateNickname(nickname);
        setIsDuplicate(result.isDuplicate);
        dispatch(setIsVerifyNickname(!result.isDuplicate));
    }, []);

    return (
        <>
            <Form.Group controlId="formNickname">
                <Form.Label>닉네임</Form.Label>
                <InputGroup className="border rounded">
                    <Form.Control
                        required
                        type="text"
                        isInvalid={isInvalid || isDuplicate}
                        isValid={!isInvalid && isDuplicate !== null && !isDuplicate && nickname.length > 0}
                        placeholder="닉네임: (길이:2~12)"
                        value={nickname}
                        className="border-0"
                        onChange={(e) => onNicknameChange(e.target.value)}
                    />
                    <Button
                        variant="outline-primary"
                        className="rounded m-3"
                        size="sm"
                        onClick={() => onDuplicateNicknameCheck(isInvalid, nickname)}
                    >
                        중복 확인
                    </Button>
                </InputGroup>
                <Form.Control.Feedback type="invalid" style={{ display: !isInvalid ? 'none' : 'block' }}>
                    닉네임이 올바르지 않습니다
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" style={{ display: !isDuplicate ? 'none' : 'block' }}>
                    해당 닉네임은 이미 사용 중 입니다
                </Form.Control.Feedback>
                <Form.Control.Feedback
                    style={{
                        display:
                            isDuplicate !== null && !isDuplicate && !isInvalid && nickname.length > 0
                                ? 'block'
                                : 'none',
                    }}
                >
                    사용해도 괜찮은 닉네임입니다
                </Form.Control.Feedback>
            </Form.Group>
            <CustomAlert
                setShow={setShowAlert}
                show={showAlert}
                variant="danger"
                heading="닉네임 문제"
                content="먼저 닉네임을 올바르게 기입하여 주세요"
            />
        </>
    );
};

export default NicknameForm;
