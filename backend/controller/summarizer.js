import asyncHandler from "express-async-handler";
import axios from 'axios';
import http from 'http';
import https from 'https';

export const summarize = async(req, res) => {
    const { text } = req.body;
    let data = JSON.stringify({
        "inputs": text,
        "parameters": {
            "max_length": 100,
            "min_length": 30
        }
    });

    let config = {
        method: 'post',
        url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        data: data,
        httpAgent: new http.Agent({ maxBodyLength: Infinity }),
        httpsAgent: new https.Agent({ maxBodyLength: Infinity })
    };

    try {
        const response = await axios.request(config);
        if (response.data && response.data[0] && response.data[0].summary_text) {
            res.status(200).json({ summary: response.data[0].summary_text });
        } else {
            res.status(500).json({ error: 'Invalid response from the summarization API.' });
        }
    } catch (error) {
        console.error('Error during summarization:', error);
        res.status(500).json({ error: 'An error occurred during summarization.' });
    }
}


