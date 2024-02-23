import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const CustomAlert = ({ setShow, heading, show, content, maxWidth, duration, variant }) => {
    useEffect(() => {
        if (show) {
            const intervalId = setTimeout(
                () => {
                    setShow(false);
                },
                duration ? duration * 1000 : 3000
            );

            return () => clearInterval(intervalId);
        }
    }, [show]);

    return (
        <Alert
            variant={variant ? variant : 'warning'}
            show={show}
            onClose={() => {
                setShow(false);
            }}
            dismissible
            transition
            style={{ position: 'fixed', right: '20px', bottom: '20px', maxWidth: maxWidth ? maxWidth : '600px' }}
        >
            <Alert.Heading>{heading}</Alert.Heading>
            {content}
        </Alert>
    );
};

export default CustomAlert;
