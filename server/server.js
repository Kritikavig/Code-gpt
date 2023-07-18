import express, { response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
});

app.post('/', async (req, res) => {
    try {

        const prompt = req.body.prompt;                         //some error
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0, // Higher values means the model will take more risks.
            max_tokens: 7, // The maximum number of tokens to generate in the completion
            top_p: 1, 
            frequency_penalty: 0.5, 
            presence_penalty: 0, 
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        });

    } catch (error) {
        console.error(error);
        console.log(response);
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000/'));