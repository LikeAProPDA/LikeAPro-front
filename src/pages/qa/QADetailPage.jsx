import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import qaApi from '../../lib/apis/qaApi';
import { updateCommentForQA, updateCommentAcceptance } from "../../lib/apis/commentApi";
import commentApi from '../../lib/apis/commentApi';
import { Editor } from '../../components/editor';
import ReactMarkdown from "react-markdown";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const QADetailPage = () => {
  const { id } = useParams();
  const [qa, setQA] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
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

  useEffect(() => {
    // 새로고침해도 채택된 정보가 그대로 남도록 설정
    const selectedCommentIdFromStorage = localStorage.getItem("selectedCommentId");
    if (selectedCommentIdFromStorage) {
      setSelectedCommentId(selectedCommentIdFromStorage);
    }
  }, []);

  const handleEditorChange = (value) => {
    // Editor의 내용이 변경될 때 실행되는 함수
    // 필요에 따라 구현해야 함
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

  const handleSelectComment = async (commentId) => {

    setSelectedCommentId(commentId);
    try {
      await commentApi.updateCommentAcceptance(id, commentId, true); // 채택됨을 나타내는 값으로 true 전달
      const updatedComments = comments.map(comment => ({
        ...comment,
        isAccepted: comment.id === commentId, // 선택된 댓글인 경우 true, 그 외에는 false
      }));
      setComments(updatedComments);
      // 채택된 댓글의 정보를 로컬 스토리지에 저장
      localStorage.setItem("selectedCommentId", commentId);
    } catch (error) {
      console.error("Error updating comment acceptance:", error);
    }
  };

  // 채택된 댓글이 있을 때만 모든 채택하기 버튼을 숨깁니다.
  const showSelectButton = !selectedCommentId;

  // 채택된 댓글만 연두색으로 표시합니다.
  const isSelected = (commentId) => commentId === selectedCommentId;

  // 채택된 댓글이 가장 위에 위치하도록 정렬합니다.
  const sortedComments = comments.sort((a, b) => {
    if (a.id === selectedCommentId) return -1;
    if (b.id === selectedCommentId) return 1;
    return 0;
  });

  // 모든 댓글이 채택되었는지 확인합니다.
  const allCommentsAccepted = comments.some(comment => comment.isAccepted);

  return (
    <Container>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {!showEditor && (
              <Button onClick={() => setShowEditor(true)} style={{ marginRight: '10px', borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>글 작성하기</Button>
            )}
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

              <Button onClick={handleSave} style={{ marginRight: '10px', borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>Save</Button>
            </>
          )}

          <h3>Comments</h3>
          {sortedComments.map((comment, index) => (
            <Card
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px 10px',
                borderRadius: '15px',
                backgroundColor: isSelected(comment.id) ? '#DFF0D8' : '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column' // 컨텐츠를 수직으로 정렬
              }}
            >
              <div style={{ marginBottom: '10px' }}>
                <ReactMarkdown components={{
                  a: (props) => <a target="_blank" style={{ color: "red" }} {...props} />,
                }}>
                  {comment.content}
                </ReactMarkdown>
                <p>작성자: {comment.user.nickname}</p>
              </div>
              {!allCommentsAccepted && (
                <Button onClick={() => handleSelectComment(comment.id)} style={{ alignSelf: 'flex-end', borderColor: 'green', color: 'white', backgroundColor: 'green', width: '100px' }}>채택하기</Button>
              )}
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default QADetailPage;
