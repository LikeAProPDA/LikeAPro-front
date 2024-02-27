import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import qaApi from '../../lib/apis/qaApi';
import rankingApi from "../../lib/apis/rankingApi";
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

  const currentUser = useSelector((state) => state.user.user);

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

  const handleEditorChange = (value) => {
    // Editor의 내용이 변경될 때 실행되는 함수
    // 필요에 따라 구현해야 함
  };

  const shouldShowEditButtons = (authorId) => {
    return currentUser && currentUser.id === authorId;
  };

  const handleEditQA = async (qaId) => {
    // 수정 버튼을 눌렀을 때 에디터를 보이도록 함
    setShowEditor(true);
  };

  const handleDeleteQA = async (qaId) => {
    try {
      await qaApi.deleteQA(qaId);
      // 성공적으로 삭제되었을 때의 로직 추가
    } catch (error) {
      console.error("Error deleting QA:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    setShowEditor(true);
    // 수정 로직 추가
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteCommentForQA(commentId);
      // 성공적으로 삭제되었을 때의 로직 추가
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSave = async () => {
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    console.log(markdownContent);
    try {
      await commentApi.uploadCommentForQA(id, markdownContent);
      const data = await commentApi.getCommentsForQA(id);
      setComments(data.result);
      setShowEditor(false);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  const handleCancel = () => {
    setShowEditor(false);
  };

  const handleSelectComment = async (commentId) => {
    setSelectedCommentId(commentId);
    try {
      await commentApi.updateCommentAcceptance(id, commentId, true);
      const updatedComments = comments.map(comment => ({
        ...comment,
        isAccepted: comment.id === commentId,
      }));
      setComments(updatedComments);
      localStorage.setItem("selectedCommentId", commentId);
      const selectedComment = updatedComments.find(comment => comment.id === commentId);
      if (selectedComment) {
        await rankingApi.postScore(5);
        console.log(selectedComment.user.id);
      }
    } catch (error) {
      console.error("Error updating comment acceptance:", error);
    }
  };

  const showSelectButton = !selectedCommentId;

  const isSelected = (commentId) => commentId === selectedCommentId;

  const sortedComments = comments.sort((a, b) => {
    if (a.id === selectedCommentId) return -1;
    if (b.id === selectedCommentId) return 1;
    return 0;
  });

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
          <h3
            style={{
              fontWeight: "bolder",
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {" "}
            🪧Question
          </h3>
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
            <div>
              {shouldShowEditButtons(qa.qa.authorId) && (
                <Button onClick={() => handleEditQA(qa.qa.id)} style={{ marginRight: '10px', borderColor: 'black', color: 'black', backgroundColor: 'white' }}>수정</Button>
              )}
              {shouldShowEditButtons(qa.qa.authorId) && (
                <Button onClick={() => handleDeleteQA(qa.qa.id)} style={{ borderColor: 'black', color: 'black', backgroundColor: 'white' }}>삭제</Button>
              )}
            </div>
          </Card>

          {showEditor && (
            <>
              <h3>🪄Add your knowledge!</h3>
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
              <Button onClick={handleCancel} style={{ marginRight: '10px', borderColor: 'red', color: 'red', backgroundColor: 'transparent' }}>Cancel</Button>
            </>
          )}

          <h3
            style={{
              fontWeight: "bolder",
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {" "}
            🔖Answers
          </h3>
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
                flexDirection: 'column'
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
              <div>
                {shouldShowEditButtons(comment.user.id) && (
                  <Button onClick={() => handleEditComment(comment.id)} style={{ marginRight: '10px', borderColor: 'black', color: 'black', backgroundColor: 'white' }}>수정</Button>
                )}
                {shouldShowEditButtons(comment.user.id) && (
                  <Button onClick={() => handleDeleteComment(comment.id)} style={{ borderColor: 'black', color: 'black', backgroundColor: 'white' }}>삭제</Button>
                )}
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
