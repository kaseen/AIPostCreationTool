import { ResponsesShowcase, Options, EnterField } from './UI';
import Box from '@mui/material/Box';
import { useState } from 'react';

function App() {

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [options, setOptions] = useState({
        length: 'short',
        style: 'narrative',
        tone: 'informative'
    })

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ResponsesShowcase prompt={prompt} response={response}/>
            <Options options={options} setOptions={setOptions}/>
            <EnterField options={options} setPrompt={setPrompt} setResponse={setResponse}/>
        </Box>
    );
}

export default App;
