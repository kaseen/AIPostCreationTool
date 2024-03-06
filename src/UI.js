import OpenAI from 'openai';
import { Box, FormControl, InputLabel, TextField, Select, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';

const boxSize = 400;
const margin = 10;
const inputSize = 2*boxSize + 3*margin

const optionSelectSize = 140;
const optionSelectStyle = {
    m: 1,
    minWidth: optionSelectSize,
    maxWidth: optionSelectSize
};

const createPromptText = (input, options) => {

    let result = 'Generate an Instagram post suggestion featuring ';

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

const createPromptImg = (input, options) => {
    let result = 'Generate an Instagram post suggestion featuring ';

    result += input;

    result += ', with ';
    switch(options['colors']){
        case 'dark':
            result += 'dark'; 
            break;
        case 'vibrant':
            result += 'vibrant';
            break;
        case 'dreamy':
            result += 'dreamy';
            break;
        case 'contrasting':
            result += 'contrasting';
            break;
        case 'warm':
            result += 'warm';
            break;
        default:
            result += 'light';
    }
    result += ' colors';

    result += ', with ';
    switch(options['lighting']){
        case 'natural':
            result += 'natural'; 
            break;
        case 'warm':
            result += 'warm';
            break;
        case 'low':
            result += 'low';
            break;
        default:
            result += 'soft';
    }
    result += ' lighting, ';

    result += 'and ';
    switch(options['elements']){
        case 'abstract':
            result += 'abstract'; 
            break;
        case 'unusual':
            result += 'unusual';
            break;
        default:
            result += 'detailed';
    }
    result +=  ' elements.';

    return result;
}

export const ResponsesShowcase = ({ prompt, response, picutureURL }) => {

    const boxstyle = {
        height: `${boxSize}px`,
        width: `${boxSize}px`,
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
                <img src={picutureURL} alt='ai'/>
            </Box>
            <Box sx={boxstyle}>
                <Box sx={{height: '20px'}}></Box>
                <TextField
                    sx={{
                        '& fieldset': { border: 'none' },
                        width: '100%'
                    }}
                    label='Your prompt:'
                    InputLabelProps={{ shrink: true }}
                    value={prompt}
                    multiline
                    minRows={3}
                    maxRows={3}
                />
                <TextField
                    sx={{
                        '& fieldset': { border: 'none' },
                        width: '100%'
                    }}
                    label='Response:'
                    InputLabelProps={{ shrink: true }}
                    value={response}
                    multiline
                    minRows={11}
                    maxRows={11}
                />
            </Box>
        </Box>
    )
}

export const OptionsText = ({ options, setOptions }) => {

    const onOptionChange = (option, setting) => {
        const tmp = options;
        tmp[option] = setting;
        setOptions(tmp);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: `${optionSelectSize+10}px`,
            height: '250px',
            justifyContent: 'flex-end'
        }}>
            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Length</InputLabel>
                <Select
                    defaultValue={'short'}
                    label='Length'
                    onChange={(e) => onOptionChange('length', e.target.value)}
                >
                    <MenuItem value={'short'}>Short</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'long'}>Long</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Style</InputLabel>
                <Select
                    defaultValue={'narrative'}
                    label='Style'
                    onChange={(e) => onOptionChange('style', e.target.value)}
                >
                    <MenuItem value={'narrative'}>Narrative</MenuItem>
                    <MenuItem value={'listicle'}>Listicle</MenuItem>
                    <MenuItem value={'qa'}>Q&A</MenuItem>
                    <MenuItem value={'review'}>Review</MenuItem>
                    <MenuItem value={'howto'}>How-to</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Tone</InputLabel>
                <Select
                    defaultValue={'informative'}
                    label='Tone'
                    onChange={(e) => onOptionChange('tone', e.target.value)}
                >
                    <MenuItem value={'informative'}>Informative</MenuItem>
                    <MenuItem value={'casual'}>Casual</MenuItem>
                    <MenuItem value={'professional'}>Professional</MenuItem>
                    <MenuItem value={'humorous'}>Humorous</MenuItem>
                    <MenuItem value={'inspirational'}>Inspirational</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export const OptionsImg = ({ options, setOptions }) => {

    const onOptionChange = (option, setting) => {
        const tmp = options;
        tmp[option] = setting;
        setOptions(tmp);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: `${optionSelectSize+10}px`,
            height: '250px',
            justifyContent: 'flex-end'
        }}>
            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Colors</InputLabel>
                <Select
                    defaultValue={'light'}
                    label='Colors'
                    onChange={(e) => onOptionChange('colors', e.target.value)}
                >
                    <MenuItem value={'light'}>Light</MenuItem>
                    <MenuItem value={'dark'}>Dark</MenuItem>
                    <MenuItem value={'vibrant'}>Vibrant</MenuItem>
                    <MenuItem value={'dreamy'}>Dreamy</MenuItem>
                    <MenuItem value={'contrasting'}>Contrasting</MenuItem>
                    <MenuItem value={'warm'}>Warm</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Lighting</InputLabel>
                <Select
                    defaultValue={'soft'}
                    label='Lighting'
                    onChange={(e) => onOptionChange('lighting', e.target.value)}
                >
                    <MenuItem value={'soft'}>Soft</MenuItem>
                    <MenuItem value={'natural'}>Natural</MenuItem>
                    <MenuItem value={'warm'}>Warm</MenuItem>
                    <MenuItem value={'low'}>Low</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={optionSelectStyle} size='small'>
                <InputLabel>Elements</InputLabel>
                <Select
                    defaultValue={'detailed'}
                    label='Elements'
                    onChange={(e) => onOptionChange('elements', e.target.value)}
                >
                    <MenuItem value={'detailed'}>Detailed</MenuItem>
                    <MenuItem value={'abstract'}>Abstract</MenuItem>
                    <MenuItem value={'unusual'}>Unusual</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export const EnterField = ({ optionsText, optionsImg, setPrompt, setResponse, setPictureURL }) => {

    const [errorText, setErrorText] = useState();
    const [errorPic, setErrorPic] = useState();
    const inputRef = useRef();

    const onEnter = async (input) => {
        setPrompt(input);

        const promptText = createPromptText(input, optionsText);
        const promptImg = createPromptImg(input, optionsImg);

        // Github does not allow sharing tokens explicitly
        const trick = 'sk-OLzMRKSrmaqFMZfBMS4';
        const trick2 = 'uT3BlbkFJPQxu4hM6CrYb75mPstiC';

        setResponse('*loading*');

        const OpenAi = new OpenAI({
            // Hosted on AWS S3, cannot hide secret keys
            apiKey: trick + trick2,
            dangerouslyAllowBrowser: true
        });

        try{
            const responseText = await OpenAi.chat.completions.create({
                messages: [{ role: 'user', content: promptText }],
                model: 'gpt-3.5-turbo'
            });

            setResponse(responseText.choices[0]?.message?.content);
        }catch(e){
            setErrorText(e.message);
        }

        try{
            const responsePic = await OpenAi.images.generate({
                model: 'dall-e-2',
                prompt: promptImg,
                size: '256x256',
                quality: 'standard',
                n: 1
            });

            setPictureURL(responsePic.data[0].url);
        }catch(e){
            setErrorPic(e.message);
        }
    }

    return (
        <Box sx={{
            width: `${inputSize+20}px`
        }}>
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
                placeholder='Enter your prompt (ex. A white siamese cat drinking from a starbucks cup)'
            />
            <br/>
            {errorText}
            <br/>
            {errorPic}
        </Box>
    )
}