import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import qaApi from '../../lib/apis/qaApi';
import commentApi from '../../lib/apis/commentApi'; // Import commentApi
// Toast UI Editor
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const QADetailPage = () => {
  const { id } = useParams();
  const [qa, setQA] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] = useState(""); // 에디터의 내용을 state로 관리합니다.
  const [title, setTitle] = useState(""); // 제목을 state로 관리합니다.
  const [showEditor, setShowEditor] = useState(false); // 에디터를 보여줄지 여부를 관리하는 상태

  useEffect(() => {
    const fetchQA = async () => {
      try {
        setLoading(true);
        // Fetch QA data based on id
        const data = await qaApi.getaQA(id);
        setQA(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching QA:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        // Fetch comments for QA based on id
        const data = await commentApi.getCommentsForQA(id);
        setComments(data.result);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchQA();
    fetchComments();
  }, [id]);

  const handlePostQA = async () => {
    try {
      // postQA 함수를 사용하여 새로운 QA를 등록합니다.
      await qaApi.postQA(title, editorContent, "User", false);
      // 등록 후에 화면을 새로고침하여 새로운 QA가 표시되도록 합니다.
      window.location.reload();
    } catch (error) {
      console.error("Error posting QA:", error);
    }
  };

  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <Card bg="info" text="white" style={{ margin: '20px 0', padding: '20px', borderRadius: '15px' }}>
              <h2>{qa.qa.title}</h2>
              <p>{qa.qa.content}</p>
            </Card>
          </div>

          <Button onClick={() => setShowEditor(true)}>글 작성하기</Button>

          {showEditor && (
            <>
              <h3>Add your knowledge!</h3>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
              <Editor
                height="450px"
                placeholder="Please Enter Text."
                initialValue="내용을 입력해주세요."
                theme="dark"
                previewStyle='vertical'
                onChange={(value) => setEditorContent(value)} // 에디터의 내용이 변경될 때마다 state를 업데이트합니다.
              />
              <Button onClick={handlePostQA}>등록</Button>
            </>
          )}

          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <Card key={index} bg="info" text="white" style={{ margin: '10px 0', padding: '10px', borderRadius: '15px' }}>
              <p>{comment.content}</p>
              <p>작성자: {comment.user.nickname}</p>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
};

export default QADetailPage;
