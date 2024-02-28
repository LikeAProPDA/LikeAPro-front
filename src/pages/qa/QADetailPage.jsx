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
  const [cid, setCid] = useState("");
  const [qa, setQA] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorMode, setEditorMode] = useState('none');
  const [editCommentContent, setEditCommentContent] = useState("");
  const [sortedComments, setSortedComments] = useState([]);
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
  useEffect(() => {
    if (editorMode === 'edit') {
      editorRef.current.getInstance().setHTML(editCommentContent);
    }
  }, [editCommentContent, editorMode]);
  const handleEditorChange = (value) => {
    // Handle editor change if needed
  };
  const shouldShowEditButtons = (authorId) => {
    return currentUser && currentUser.id === authorId;
  };
  const handleEditQA = async (qaId) => {
    setEditorMode("edit");
  };
  const handleDeleteQA = async (qaId) => {
    try {
      await qaApi.deleteQA(qaId);
      // Handle successful deletion
    } catch (error) {
      console.error("Error deleting QA:", error);
    }
  };
  const handleEditComment = async (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    if (commentToEdit && commentToEdit.content) {
      setEditCommentContent(commentToEdit.content);
      setCid(commentId);
      setEditorMode('edit');
    } else {
      console.error("Comment not found or does not have content");
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await commentApi.deleteCommentForQA(commentId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const handleSave = async () => {
    const markdownContent = editorRef.current.getInstance().getMarkdown();
    try {
      if (editorMode === "edit") {
        await commentApi.updateCommentForQA(id, cid, markdownContent);
        const data = await commentApi.getCommentsForQA(id);
        setComments(data.result);
      } else {
        await commentApi.uploadCommentForQA(id, markdownContent);
        const data = await commentApi.getCommentsForQA(id);
        setComments(data.result);
      }
      setEditorMode('none');
      setShowEditor(false);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };
  const handleCancel = () => {
    setEditorMode('none');
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
  const isSelected = (commentId) => commentId === selectedCommentId;
  useEffect(() => {
    setSortedComments([...comments].sort((a, b) => {
      if (a.id === selectedCommentId) return -1;
      if (b.id === selectedCommentId) return 1;
      return 0;
    }));
  }, [comments, selectedCommentId]);
  useEffect(() => {
    const storedCommentId = localStorage.getItem("selectedCommentId");
    if (storedCommentId) {
      setSelectedCommentId(storedCommentId);
    }
  }, []);
  const allCommentsAccepted = comments.some(comment => comment.isAccepted);
  return (
    <Container>
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {editorMode === 'none' && (
              <Button onClick={() => setEditorMode('write')} style={{ marginRight: '10px', borderColor: 'blue', color: 'blue', backgroundColor: 'transparent' }}>글 작성하기</Button>
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
            :팻말:Question
          </h3>
          <Card
            style={{
              margin: "20px 0",
              height: "200px",
              padding: "20px",
              borderRadius: "15px",
              backgroundColor: "#E3EDFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* 글 작성한거 보이는 칸 여기다 */}
            <h2>{qa.qa.title}</h2>
            <ReactMarkdown
              components={{
                a: (props) => (
                  <a target="_blank" style={{ color: "red" }} {...props} />
                ),
              }}
            >
              {qa.qa.content}
            </ReactMarkdown>
            <p>작성자: {qa.qa.author.nickname}</p>
            <div>
              {shouldShowEditButtons(qa.qa.author._id) && (
                <Button
                  onClick={() => handleEditQA(qa.qa.id)}
                  style={{
                    marginRight: "10px",
                    borderColor: "black",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  수정
                </Button>
              )}
              {shouldShowEditButtons(qa.qa.author._id) && (
                <Button
                  onClick={() => handleDeleteQA(qa.qa.id)}
                  style={{
                    borderColor: "black",
                    color: "black",
                    backgroundColor: "white",
                  }}
                >
                  삭제
                </Button>
              )}
            </div>
          </Card>
          {(editorMode === "write" || editorMode === "edit") && (
            <>
              <h3>{editorMode === 'edit' ? 'Edit Comment' : 'Add your knowledge!'}</h3>
              <Editor
                ref={editorRef}
                height="400px"
                placeholder="Please Enter Text."
                initialValue={editCommentContent}
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
            :책갈피:Answers
          </h3>
          {sortedComments.map((comment, index) => (
            <Card
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px 10px',
                borderRadius: '15px',
                backgroundColor: isSelected(comment.id) ? '#DFF0D8' : (comment.isAccepted ? '#DFF0D8' : '#fff'),
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <ReactMarkdown
                  components={{
                    a: (props) => (
                      <a target="_blank" style={{ color: "red" }} {...props} />
                    ),
                  }}
                >
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
                <Button
                  onClick={() => handleSelectComment(comment.id)}
                  style={{
                    alignSelf: "flex-end",
                    borderColor: "green",
                    color: "white",
                    backgroundColor: "green",
                    width: "100px",
                  }}
                >
                  채택하기
                </Button>
              )}
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};
export default QADetailPage;