import { useCallback, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { isDuplicateBackjoonId } from "../../lib/apis/userApi";
import CustomAlert from "../common/alert/CustomAlert";
import { useDispatch } from "react-redux";
import { setIsVerifyBackjoonId } from "../../store/signUpReducer";

const BackjoonIdForm = ({ backjoonId, setBackjoonId }) => {
  const [isDuplicate, setIsDuplicate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const btnClick = useCallback(async (backjoonId) => {
    if (backjoonId.length >= 2) {
      const { result } = await isDuplicateBackjoonId(backjoonId);

      setIsDuplicate(result.isDuplicate);
      dispatch(setIsVerifyBackjoonId(!result.isDuplicate));
      return;
    }

    setShowAlert(true);
  }, []);

  return (
    <>
      <Form.Group controlId="formBackjoon">
        <Form.Label>백준 아이디</Form.Label>
        <InputGroup className="border rounded">
          <Form.Control
            required
            type="text"
            placeholder="백준에서 사용하는 아이디(닉네임): 이메일 X"
            value={backjoonId}
            isInvalid={
              isDuplicate || (backjoonId.length < 2 && backjoonId.length > 0)
            }
            isValid={
              isDuplicate !== null && !isDuplicate && backjoonId.length !== 0
            }
            className="border-0"
            onChange={(e) => {
              setBackjoonId(e.target.value);
              setIsDuplicate(null);
              dispatch(setIsVerifyBackjoonId(false));
            }}
          />

          <Button
            variant="outline-primary"
            className="rounded m-3"
            size="sm"
            onClick={() => btnClick(backjoonId)}
          >
            중복 확인
          </Button>
        </InputGroup>
        <Form.Control.Feedback
          type="invalid"
          style={{
            display:
              backjoonId.length > 0 && backjoonId.length < 2 ? "block" : "none",
          }}
        >
          두 글자 이상 적어주세요
        </Form.Control.Feedback>
        <Form.Control.Feedback
          type="invalid"
          style={{ display: isDuplicate ? "block" : "none" }}
        >
          중복된 백준 아이디 입니다.
        </Form.Control.Feedback>
        <Form.Control.Feedback
          style={{
            display:
              isDuplicate !== null && !isDuplicate && backjoonId.length !== 0
                ? "block"
                : "none",
          }}
        >
          사용해도 괜찮은 백준 아이디 입니다
        </Form.Control.Feedback>
      </Form.Group>
      <CustomAlert
        setShow={setShowAlert}
        show={showAlert}
        variant="danger"
        heading="백준 아이디 문제"
        content="먼저 백준 아이디를 올바르게 기입하여 주세요"
      />
    </>
  );
};

export default BackjoonIdForm;
