import OpenAI from 'openai';
import { Box, TextField } from '@mui/material';
import { useRef } from 'react';

export const TEST = ({ prompt, response }) => {
    return (
        <Box sx={{
            height: '200px',
            width: '800px',
            border: '1px solid black'
        }}>
            Your prompt: {prompt}<br/><br/><br/>
            My response: {response}
        </Box>
    )
} 

export const EnterField = ({ setPrompt, setResponse }) => {

    const inputRef = useRef();

    const onEnter = async (input) => {
        setPrompt(input);

        const OpenAi = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const response = await OpenAi.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: 'gpt-3.5-turbo'
        });

        setResponse(response.choices[0]?.message?.content);
    }

    return (
        <TextField
            inputRef={inputRef}
            inputProps={{ min: 0, style: { textAlign: 'center' }}}
            onKeyDown={(ev) => {
                if(ev.key === 'Enter'){
                    onEnter(inputRef.current.value);
                }
            }}
            sx={{
                border: '2px solid black',
                borderRadius: '10px',
            }}
            helperText='Please enter prompt (Alt+Enter for newline)'
        />
    )
}