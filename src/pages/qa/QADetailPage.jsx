import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import qaApi from '../../lib/apis/qaApi';
import commentApi from '../../lib/apis/commentApi';
import { Editor } from '../../components/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';


const QADetailPage = () => {
  const { id } = useParams();
  const [qa, setQA] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        setLoading(true);
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
      await commentApi.uploadCommentForQA(id, editorContent);
      window.location.reload();
    } catch (error) {
      console.error("Error posting QA:", error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorContent(value);
  };

  const handleSave = async () => {
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    console.log(markdownContent);
    try {
      await commentApi.uploadCommentForQA(id, markdownContent);
      const data = await commentApi.getCommentsForQA(id);
      setComments(data.result);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  return (
    <Container>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setShowEditor(true)} style={{ borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>글 작성하기</Button>
          </div>

          <Card
            style={{
              margin: '20px 0',
              height: "200px",
              padding: '20px',
              borderRadius: '15px',
              backgroundColor: '#E3EDFF',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2>{qa.qa.title}</h2>
            <p>{qa.qa.content}</p>
          </Card>

          {showEditor && (
            <>
              <h3>Add your knowledge!</h3>
              <Editor
                ref={editorRef}
                height="400px"
                placeholder="Please Enter Text."
                initialValue="내용을 입력해주세요."
                theme="dark"
                previewStyle='vertical'
                onChange={handleEditorChange}
              />
              <Button onClick={handlePostQA} style={{ float: 'right', borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>등록</Button>
              <Button onClick={handleSave} style={{ float: 'right', borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>Save</Button>
            </>
          )}

          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <Card
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* markdown 형식의 내용을 HTML로 렌더링 */}
              <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              <p>작성자: {comment.user.nickname}</p>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default QADetailPage;
