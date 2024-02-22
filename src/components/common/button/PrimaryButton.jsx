import { Button } from 'react-bootstrap';

const PrimaryButton = ({ text, minWidth, onClick, style }) => {
    return (
        <Button
            onClick={onClick}
            style={{
                ...style,
                backgroundImage: 'linear-gradient(-20deg, #4489ff 0%, #015fff 100%)',
                border: 0,
                minWidth: minWidth,
            }}
            className="rounded-pill primaryButton"
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
