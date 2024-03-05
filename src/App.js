import { TEST, EnterField } from './UI';
import Box from '@mui/material/Box';
import { useState } from 'react';

function App() {

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
 
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TEST prompt={prompt} response={response}/>
            <EnterField setPrompt={setPrompt} setResponse={setResponse}/>
        </Box>
    );
}

export default App;
