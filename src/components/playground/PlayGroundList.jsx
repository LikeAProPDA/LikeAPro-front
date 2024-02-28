import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getAllPlayground } from '../../lib/apis/playgroundApi';
import PlayGroundItem from './PlayGroundItem';

const PlayGroundList = () => {
    const [playgrounds, setPlaygrounds] = useState([]);

    const fetchData = async () => {
        const data = await getAllPlayground();
        setPlaygrounds(data.result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container style={{ minHeight: '100vh' }}>
            <Row className="py-5">
                <Col>
                    <h2>플레이그라운드 리스트</h2>
                </Col>
            </Row>
            <Row>
                {playgrounds.map((p) => (
                    <PlayGroundItem
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        nickname={p.user.nickname}
                        status={p.status}
                        createdAt={p.createdAt}
                        description={p.description}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default PlayGroundList;
