import { useCallback } from 'react';
import { Badge, Button, Card, CardBody, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlayGroundItem = ({ id, title, nickname, status, createdAt, description }) => {
    const navigate = useNavigate();

    const statusToKorean = useCallback((status) => {
        switch (status) {
            case 'UPLOADED':
                return '심사중';
            case 'ACCEPTED':
                return '승인됨';
            case 'REJECTED':
                return '거절됨';
        }
    }, []);

    const statusToColor = useCallback((status) => {
        switch (status) {
            case 'UPLOADED':
                return 'primary';
            case 'ACCEPTED':
                return 'success';
            case 'REJECTED':
                return 'warning';
        }
    }, []);

    return (
        <Col xs={12} sm={6} xl={4} style={{ marginBottom: '24px' }}>
            <Card>
                <Card.Header>
                    <Badge bg={statusToColor(status)} className="ms-0">
                        {statusToKorean(status)}
                    </Badge>
                </Card.Header>
                <CardBody>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="py-1">{nickname}</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                    <Button
                        disabled={status !== 'ACCEPTED'}
                        onClick={() => {
                            navigate(`/playgrounds/${id}`);
                        }}
                    >
                        Play{' '}
                    </Button>
                </CardBody>
            </Card>
        </Col>
    );
};

export default PlayGroundItem;
