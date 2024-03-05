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

export const EnterField = ({ options, setPrompt, setResponse }) => {

    const inputRef = useRef();

    const createPrompt = (input, options) => {

        let result = 'Generate me Instagram post suggestion that is, ';

        result += input;

        switch(options['length']){
            case 'medium':
                result += ', where you will ensure that your prompt output is in range of 50-150 words of length'; 
                break;
            case 'long':
                result += ', where you will ensure that your prompt output is above of 150 words of length';
                break;
            default:
                result += ', where you will ensure that your prompt output is under 50 words in length';
        }

        switch(options['style']){
            case 'listicle':
                result += ', organized as a list of points, tips, or ideas, which is easy to scan and read';
                break;
            case 'qa':
                result += ', framed as questions and answers, great for educational content or addressing common queries';
                break;
            case 'review':
                result += ', offering opinions or evaluations about products, services, or experiences';
                break;
            case 'howto':
                result += ', providing step-by-step instructions or guidance on achieving a particular task';
                break;
            default:
                result += ', telling a story or sharing an experience, with a beginning, middle and end'
        }

        switch(options['tone']){
            case 'casual':
                result += ', where tone is casual which is a relaxed and conversational tone, great for engaging with followers in a friendly manner.'
                break;
            case 'professional':
                result += ', where tone is professional, formal and polished, ideal for business accounts or professional branding.'
                break;
            case 'humorous':
                result += ', where tone is humorous, light-hearted and funny, perfect for entertainment or lifestyle brands.'
                break;
            case 'inspirational':
                result += ', where tone is inspirational, motivational and uplifting, aimed at encouraging followers.'
                break;
            default:
                result += ', where tone is informative which is straightforward and educational, suitable for sharing facts or knowledge.'
        }

        return result;
    }

    const onEnter = async (input) => {
        setPrompt(input);

        const prompt = createPrompt(input, options);

        // Github does not allow 
        const trick = 'sk-OLzMRKSrmaqFMZfBMS4';
        const trick2 = 'uT3BlbkFJPQxu4hM6CrYb75mPstiC';

        const OpenAi = new OpenAI({
            // Hosted on AWS S3, cannot hide secret keys
            apiKey: trick + trick2,
            dangerouslyAllowBrowser: true
        });

        const response = await OpenAi.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
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