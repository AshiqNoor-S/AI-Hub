import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import { HfInference } from '@huggingface/inference';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import summarize from './routes/summarizer.js';

const app = express();
const port = 3001;

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(express.json());
// app.use(bodyParser.raw({ type: 'audio/wav' })); // Parse audio data as raw

app.use(cors());
app.use(express.static('public'));


app.use('/summarizer', summarize);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

