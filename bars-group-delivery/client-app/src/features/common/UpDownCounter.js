import React from "react";
import { Button, Stack } from "react-bootstrap";

const UpDownCounter = ({count, onDecClick, onIncClick, ...other}) => {
    
    return (
        <Stack direction='horizontal' gap={2} {...other}>
            <DecButton onClick={onDecClick}/>
            <span className='mx-2'>{count}</span>
            <IncButton onClick={onIncClick}/>
        </Stack>
    );
}

const IncButton = React.memo(({onClick})=>(
    <Button onClick={onClick} style={{ 'width': 32, 'height':32 }} className='p-0'>+</Button>
));
const DecButton = React.memo(({onClick})=>(
    <Button onClick={onClick} style={{ 'width': 32, 'height':32 }} className='p-0'>-</Button>
));

export default UpDownCounter;