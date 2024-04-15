import express from 'express';
const router = express.Router();

import {summarize} from "../controller/summarizer.js";

router.route("/").post(summarize); 


export default router;