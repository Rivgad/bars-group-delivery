import { Button, Stack } from "react-bootstrap";

const UpDownCounter = ({count, onDecClick, onIncClick, ...other}) => {
    
    return (
        <Stack direction='horizontal' gap={2} {...other}>
            <Button onClick={onDecClick} style={{ 'width': 32, 'height':32 }} className='p-0'>-</Button>
            <span className='mx-2'>{count}</span>
            <Button onClick={onIncClick} style={{ 'width': 32, 'height':32 }} className='p-0'>+</Button>
        </Stack>
    );
}

export default UpDownCounter;