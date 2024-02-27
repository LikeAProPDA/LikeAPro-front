import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { CodeSlash } from 'react-bootstrap-icons';
import codeBackground from '../../assets/images/code-back.jpg';
import { useNavigate } from 'react-router-dom';
import PlayGroundList from '../../components/playground/PlayGroundList';

const PlayGroundPage = () => {
    const navigate = useNavigate();
    return (
        <Stack>
            <Container
                className="bg-white"
                fluid
                style={{
                    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${codeBackground})`,
                    backgroundSize: 'cover',
                    minHeight: '94vh',
                }}
            >
                <Row className="p-5">
                    <Col style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'center' }}>
                        <Badge>Beta</Badge>
                        <div className="text-white">플레이그라운드 출시!</div>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-5" style={{ display: 'flex', justifyContent: 'center' }}>
                        <CodeSlash color="white" size={240} />
                    </Col>
                </Row>
                <Row>
                    <Col className="pt-5">
                        <h3 className="text-center text-white fw-bold">코드를 통해 당신의 상상력을 발휘하세요</h3>
                        <h3 className="text-center text-white fw-bold">그리고 남들에게 당신의 상상력을 보여주세요</h3>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="pt-2" md={6}>
                        <h5 className="text-center fw-bold" style={{ color: '#aba9a9' }}>
                            플레이그라운드는 HTML과 Javascript를 작성할 수 있는 에디터를 제공합니다. 여러분들은 Like A
                            Pro에서 제공하는 API와 직접 제작한 API와 연결하여 여러분들이 원하는 창작물을 구성할 수
                            있습니다. 플레이그라운드를 통해서 커뮤니티원과 색다르게 소통해보세요
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col className="p-5" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="lg" onClick={() => navigate('/playgrounds/editor')}>
                            코드 작성하기
                        </Button>
                    </Col>
                </Row>
            </Container>
            <PlayGroundList />
        </Stack>
    );
};

export default PlayGroundPage;
