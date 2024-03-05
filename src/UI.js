import OpenAI from 'openai';
import { Box, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useRef } from 'react';

const boxSize = 400;
const margin = 10;
const inputSize = 2*boxSize + 6*margin

export const ResponsesShowcase = ({ prompt, response }) => {

    const boxstyle = {
        height: `${boxSize}px`,
        width: `${boxSize}px`,
        padding: '10px',
        margin: '10px',
        border: '2px solid black',
        borderRadius: '10px'
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'row',
            justifyContent: 'center'
        }}>
            <Box sx={boxstyle}>
                TODO
            </Box>
            <Box sx={boxstyle}>
                TODO<br/>
                <strong>Your prompt:</strong> {prompt}<br/><br/><br/>
                <strong>My response:</strong> {response}
            </Box>
        </Box>
    )
}

export const Options = ({ options, setOptions }) => {

    const onOptionChange = (option, setting) => {
        const tmp = options;
        tmp[option] = setting;
        setOptions(tmp);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: `${inputSize}px`
        }}>
            <FormControl>
                <FormLabel>Length</FormLabel>
                <RadioGroup
                    onChange={e => onOptionChange('length', e.target.value)}
                    defaultValue='short'
                    row
                >
                    <FormControlLabel value='short' control={<Radio />} label='Short' />
                    <FormControlLabel value='medium' control={<Radio />} label='Medium' />
                    <FormControlLabel value='long' control={<Radio />} label='Long' />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Style</FormLabel>
                <RadioGroup
                    onChange={e => onOptionChange('style', e.target.value)}
                    defaultValue='narrative'
                    row
                >
                    <FormControlLabel value='narrative' control={<Radio />} label='Narrative' />
                    <FormControlLabel value='listicle' control={<Radio />} label='Listicle' />
                    <FormControlLabel value='qa' control={<Radio />} label='Q&A' />
                    <FormControlLabel value='review' control={<Radio />} label='Review' />
                    <FormControlLabel value='howto' control={<Radio />} label='How-to' />
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Tone</FormLabel>
                <RadioGroup
                    onChange={e => onOptionChange('tone', e.target.value)}
                    defaultValue='informative'
                    row
                >
                    <FormControlLabel value='informative' control={<Radio />} label='Informative' />
                    <FormControlLabel value='casual' control={<Radio />} label='Casual' />
                    <FormControlLabel value='professional' control={<Radio />} label='Professional' />
                    <FormControlLabel value='humorous' control={<Radio />} label='Humorous' />
                    <FormControlLabel value='inspirational' control={<Radio />} label='Inspirational' />
                </RadioGroup>
            </FormControl>
        </Box>
    )
}

export const EnterField = ({ setPrompt, setResponse }) => {

    const inputRef = useRef();

    const onEnter = async (input) => {
        setPrompt(input);

        const OpenAi = new OpenAI({
            // Hosted on AWS S3, cannot hide secret keys
            apiKey: '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',
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
                    ev.preventDefault();
                    onEnter(inputRef.current.value);
                }
            }}
            sx={{
                border: '2px solid black',
                borderRadius: '10px',
                margin: '10px',
                width: inputSize
            }}
            autoComplete='off'
            multiline
            maxRows={4}
            placeholder='Enter your prompt'
        />
    )
}