import { ResponsesShowcase, OptionsImg, OptionsText, EnterField } from './UI';
import Box from '@mui/material/Box';
import { useState } from 'react';

function App() {

    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [picutureURL, setPictureURL] = useState('');

    const [optionsForText, setOptionsForText] = useState({
        length: 'short',
        style: 'narrative',
        tone: 'informative'
    });

    const [optionsForImg, setOptionsForImg] = useState({
        colors: 'light',
        lighting: 'soft',
        elements: 'detailed'
    })

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px'
        }}>
            <Box sx={{ marginBottom: '20px', fontSize: 50 }}>AI Post Creation Tool</Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                }}
            >
                <OptionsImg options={optionsForImg} setOptions={setOptionsForImg}/>
                <ResponsesShowcase prompt={prompt} response={response} picutureURL={picutureURL}/>
                <OptionsText options={optionsForText} setOptions={setOptionsForText}/>
                
            </Box>

            
            <EnterField
                optionsText={optionsForText}
                optionsImg={optionsForImg}
                setPrompt={setPrompt}
                setResponse={setResponse}
                setPictureURL={setPictureURL}
            />
        </Box>
    );
}

export default App;
