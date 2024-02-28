import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import qaApi from "../../lib/apis/qaApi";
import { Editor } from "../../components/editor";
import { useSelector } from "react-redux";

const QAWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate(); // useNavigate로 변경
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(user);
  }, []);

  useEffect(() => {
    editorRef.current.getInstance().setHTML(content);
  }, [content]);

  const saveQA = async () => {
    const markDownContent = editorRef.current.getInstance().getMarkdown();
    await qaApi.postQA(title, markDownContent, user.id, false);
    navigate("/qas");
  };

  const handleEditorChange = async () => {
    const editorContent = editorRef.current.getInstance().getHTML();
    setContent(editorContent);
  };

  return (
    <Container>
      <br />
      <h5 className="lh-base fw-bold">✨ 지식투자 하기</h5>

      {/* 제목 입력 폼 */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          // isInvalid={!isValidTitle} // 추가
        />
        <Form.Control.Feedback type="invalid">
          제목을 입력해주세요.
        </Form.Control.Feedback>
      </Form.Group>

      <Editor
        ref={editorRef}
        height="500px"
        placeholder="Please Enter Text."
        initialValue={content}
        theme="dark"
        previewStyle="vertical"
        onChange={handleEditorChange}
      />

      <Button
        onClick={saveQA}
        style={{
          marginRight: "10px",
          borderColor: "blue",
          color: "blue",
          backgroundColor: "transparent",
        }}
      >
        Save
      </Button>
    </Container>
  );
};

export default QAWritePage;
