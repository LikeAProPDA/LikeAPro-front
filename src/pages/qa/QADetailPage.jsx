import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qaApi from '../../lib/apis/qaApi';
import rankingApi from '../../lib/apis/rankingApi';
import commentApi from '../../lib/apis/commentApi';
import { Editor } from '../../components/editor';
import ReactMarkdown from 'react-markdown';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const QADetailPage = () => {
    const { id } = useParams();
    const [cid, setCid] = useState('');
    const [qa, setQA] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editorMode, setEditorMode] = useState('none');
    const [editCommentContent, setEditCommentContent] = useState(' ');
    const [sortedComments, setSortedComments] = useState([]);
    const [showEditor, setShowEditor] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const editorRef = useRef(null);
    const currentUser = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQA = async () => {
            try {
                setLoading(true);
                const data = await qaApi.getaQA(id);
                setQA(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching QA:', error);
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const data = await commentApi.getCommentsForQA(id);
                // 채택된 댓글을 가장 먼저 정렬하여 저장
                const sortedData = data.result.sort((a, b) => b.isAccepted - a.isAccepted);
                setComments(sortedData);
            } catch (error) {
                console.error('Error fetching comments:', error);
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

    const shouldShowAcceptButton = () => {
        const hasAcceptedComment = comments.some((comment) => comment.isAccepted);
        return currentUser && currentUser.id === qa.qa.author._id && !hasAcceptedComment;
    };

    const handleEditQA = async (qaId) => {
        try {
            setEditCommentContent(qa.qa.content); // 게시물 내용을 수정 창에 표시
            setEditorMode('edit');
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const handleDeleteQA = async (qaId) => {
        try {
            await qaApi.deleteQA(qaId);
            // Handle successful deletion
            navigate('/qas/');
            setQA({});
        } catch (error) {
            console.error('Error deleting QA:', error);
        }
    };

    const handleEditComment = async (commentId) => {
        const commentToEdit = comments.find((comment) => comment.id === commentId);
        if (commentToEdit && commentToEdit.content) {
            setEditCommentContent(commentToEdit.content);
            setCid(commentId);
            setEditorMode('edit');
        } else {
            console.error('Comment not found or does not have content');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await commentApi.deleteCommentForQA(commentId);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleSave = async () => {
        const markdownContent = editorRef.current.getInstance().getMarkdown();
        try {
            if (editorMode === 'edit') {
                if (cid) {
                    // 댓글 수정일 경우
                    await commentApi.updateCommentForQA(id, cid, markdownContent);
                    const data = await commentApi.getCommentsForQA(id);
                    setComments(data.result);
                } else {
                    // 게시물 수정일 경우
                    await qaApi.editQA(qa.qa._id, { content: markdownContent });
                    setQA((prevState) => ({
                        ...prevState,
                        qa: {
                            ...prevState.qa,
                            content: markdownContent, // 수정된 내용으로 업데이트
                        },
                    }));
                }
            } else {
                await commentApi.uploadCommentForQA(id, markdownContent);
                const data = await commentApi.getCommentsForQA(id);
                setComments(data.result);
            }
            setEditorMode('none');
            setShowEditor(false);
        } catch (error) {
            console.error('Error saving comment:', error);
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
            const updatedComments = comments.map((comment) => ({
                ...comment,
                isAccepted: comment.id === commentId,
            }));
            setComments(updatedComments);
            const selectedComment = updatedComments.find((comment) => comment.id === commentId);
            if (selectedComment) {
                await rankingApi.postScore(5);
                console.log(selectedComment.user.id);
            }
        } catch (error) {
            console.error('Error updating comment acceptance:', error);
        }
    };

    const isSelected = (commentId) => commentId === selectedCommentId;

    useEffect(() => {
        setSortedComments(
            [...comments].sort((a, b) => {
                if (a.id === selectedCommentId) return -1;
                if (b.id === selectedCommentId) return 1;
                return 0;
            })
        );
    }, [comments, selectedCommentId]);

    const allCommentsAccepted = comments.some((comment) => comment.isAccepted);

    const getJustifyContent = () => {
        if (shouldShowAcceptButton()) {
            if (shouldShowEditButtons(qa.qa.author._id)) {
                return 'space-between';
            }
            return 'flex-end';
        }
        if (shouldShowEditButtons(qa.qa.author._id)) {
            return 'flex-start';
        }
        return 'flex-start';
    };

    return (
        <Container>
            <br />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {editorMode === 'none' && (
                            <Button
                                onClick={() => setEditorMode('write')}
                                style={{
                                    marginRight: '10px',
                                    borderColor: 'blue',
                                    color: 'blue',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                글 작성하기
                            </Button>
                        )}
                    </div>
                    <h3
                        style={{
                            fontWeight: 'bolder',
                            fontSize: '2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {' '}
                        🪧Question
                    </h3>
                    <Card
                        style={{
                            margin: '20px 20px',
                            padding: '30px 30px',
                            borderRadius: '15px',
                            backgroundColor: '#FFF',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {' '}
                            {/* 제목과 닉네임을 같은 행으로 배치하고 가운데 정렬합니다. */}
                            <h4>{qa.qa.title}</h4>
                            <div style={{ fontWeight: 'bold' }}>✏️ {qa.qa.author.nickname}</div>
                        </div>
                        <hr />
                        <div style={{ marginBottom: '10px' }}>
                            <ReactMarkdown
                                components={{
                                    a: (props) => <a target="_blank" style={{ color: 'red' }} {...props} />,
                                    p: (props) => <p {...props} style={{ whiteSpace: 'pre-line' }} />,
                                }}
                            >
                                {qa.qa.content}
                            </ReactMarkdown>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                {shouldShowEditButtons(qa.qa.author._id) && (
                                    <Button
                                        onClick={() => handleEditQA(qa.qa._id)}
                                        style={{
                                            fontSize: '0.8rem',
                                            marginRight: '10px',
                                            borderColor: 'black',
                                            color: 'black',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        수정
                                    </Button>
                                )}
                                {shouldShowEditButtons(qa.qa.author._id) && (
                                    <Button
                                        onClick={() => handleDeleteQA(qa.qa._id)}
                                        style={{
                                            fontSize: '0.8rem',
                                            borderColor: 'black',
                                            color: 'black',
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        삭제
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {(editorMode === 'write' || editorMode === 'edit') && (
                        <>
                            <h3>{editorMode === 'edit' ? 'Edit Comment' : 'Add your knowledge!'}</h3>

                            <Editor
                                ref={editorRef}
                                height="400px"
                                placeholder="Please Enter Text."
                                initialValue={editCommentContent}
                                theme="dark"
                                previewStyle="vertical"
                                onChange={handleEditorChange}
                            />

                            <Button
                                onClick={handleSave}
                                style={{
                                    marginRight: '10px',
                                    borderColor: 'blue',
                                    color: 'blue',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                style={{
                                    marginRight: '10px',
                                    borderColor: 'red',
                                    color: 'red',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                Cancel
                            </Button>
                        </>
                    )}

                    <br />
                    <h3
                        style={{
                            fontWeight: 'bolder',
                            fontSize: '2rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {' '}
                        🔖Answers
                    </h3>
                    {sortedComments.map((comment, index) => {
                        return (
                            <Card
                                key={index}
                                style={{
                                    margin: '20px 20px',
                                    padding: '30px',
                                    borderRadius: '15px',
                                    backgroundColor: isSelected(comment.id)
                                        ? '#DFF0D8'
                                        : comment.isAccepted
                                        ? '#DFF0D8'
                                        : '#fff',
                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <div>
                                        <ReactMarkdown
                                            components={{
                                                a: (props) => <a target="_blank" style={{ color: 'red' }} {...props} />,
                                                p: (props) => <p {...props} style={{ whiteSpace: 'pre-line' }} />,
                                            }}
                                        >
                                            {comment.content}
                                        </ReactMarkdown>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 'bold' }}>✏️ {comment.user.nickname}</p>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: getJustifyContent(),
                                            }}
                                        >
                                            <div>
                                                {shouldShowEditButtons(comment.user.id) && (
                                                    <span style={{ marginRight: '10px' }}>
                                                        <Button
                                                            onClick={() => handleEditComment(comment.id)}
                                                            style={{
                                                                fontSize: '0.8rem',
                                                                borderColor: 'black',
                                                                color: 'black',
                                                                backgroundColor: 'white',
                                                            }}
                                                        >
                                                            수정
                                                        </Button>
                                                    </span>
                                                )}
                                                {shouldShowEditButtons(comment.user.id) && (
                                                    <span style={{ marginRight: '10px' }}>
                                                        <Button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            style={{
                                                                fontSize: '0.8rem',
                                                                borderColor: 'black',
                                                                color: 'black',
                                                                backgroundColor: 'white',
                                                            }}
                                                        >
                                                            삭제
                                                        </Button>
                                                    </span>
                                                )}
                                            </div>
                                            {shouldShowAcceptButton() && (
                                                <span>
                                                    <span
                                                        onClick={() => handleSelectComment(comment.id)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            fontSize: '2rem',
                                                        }}
                                                    >
                                                        ✅
                                                    </span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </>
            )}
        </Container>
    );
};

export default QADetailPage;
