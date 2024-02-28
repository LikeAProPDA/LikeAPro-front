import { Editor } from '@monaco-editor/react';
import { useCallback, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { basicPlaygroundHtml, toDoc } from '../../lib/codeplay/codeplay';
import { postPlayground } from '../../lib/apis/playgroundApi';
import CustomAlert from '../../components/common/alert/CustomAlert';
import { useNavigate } from 'react-router-dom';

const PlayGroundEditorPage = () => {
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [successShow, setSuccessShow] = useState(false);
    const userState = useSelector((state) => state.user.user);
    const isLogin = useSelector((state) => state.user.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        setCode(basicPlaygroundHtml);
    }, []);

    const onSubmit = useCallback(async (code, title, description) => {
        if (code.length <= 0 || title.length <= 0 || description.length <= 0) {
            setMsg('코드 / 제목 / 설명을 입력하여 주세요');
            setShow(true);
            return;
        }

        try {
            await postPlayground(code, title, description);
            setSuccessShow(true);
            navigate('/playgrounds');
        } catch (err) {
            setMsg('제목을 바꿔보세요.');
            setShow(true);
        }
    }, []);

    return (
        <Container className="m-0 p-0 w-100" fluid>
            <Row className="align-items-center justify-content-between">
                <Col>
                    <h3 className="ms-3 my-3">Playground Editor</h3>
                </Col>
                <Col style={{ display: 'flex', justifyContent: 'flex-end', gap: '30px' }}>
                    <Form.Group className="my-3">
                        <Form.Control
                            required
                            placeholder="제목 입력"
                            disabled={!isLogin}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="my-3" style={{ flexGrow: 3 }}>
                        <Form.Control
                            required
                            placeholder="간단한 설명 입력"
                            disabled={!isLogin}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        className="my-3 me-3"
                        disabled={!isLogin}
                        onClick={() => onSubmit(code, title, description)}
                    >
                        제출하기
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Editor
                        height="100vh"
                        language="html"
                        defaultValue={basicPlaygroundHtml}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    />
                </Col>
                <Col md={6}>
                    <iframe
                        srcDoc={toDoc(code, userState?.email, userState?.nickname, isLogin)}
                        sandbox="allow-scripts allow-modals allow-top-navigation allow-same-origin allow-forms"
                        width="100%"
                        height="100%"
                    />
                </Col>
            </Row>
            <CustomAlert
                setShow={setShow}
                show={show}
                variant="danger"
                heading="플레이그라운드 문제"
                content={`업로드 실패: ${msg}`}
            />
            <CustomAlert
                setShow={setSuccessShow}
                show={successShow}
                variant="success"
                heading="플레이그라운드 업로드 성공"
                content="플레이그라운드 업로드에 성공하였습니다."
            />
        </Container>
    );
};

export default PlayGroundEditorPage;
