import React, { useState } from "react";
import NavBar from './NavBar';

const Summarizer = () => {
  const [textToSummarize, setTextToSummarize] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarizeClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize text");
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container min-h-screen mx-auto mt-16 bg-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center text-white p-8">Summarizer</h1>
        <p className="text-lg text-white  mb-4 text-center mx-14 font-semibold">
        Text summarizer tool offers a convenient way to condense lengthy passages of text into concise summaries. Simply paste your text into the input area, and our tool will analyze it to provide you with a summary below. 
        </p>
        <p className="text-lg text-white mb-4 text-center">
          Enter a text to summarize (Min length is 200 chars. Max length is 100,000 chars.).
        </p>
        <div className="mb-4 flex flex-col justify-center text-center">
          <textarea
            id="text_to_summarize"
            name="text_to_summarize"
            placeholder="Paste in some text to summarize."
            maxLength="100000"
            value={textToSummarize}
            onChange={(e) => setTextToSummarize(e.target.value)}
            className="w-1/2 p-4 border border-gray-300 rounded overflow-auto resize mx-auto"
          ></textarea>
          <button
            id="submit-button"
            className={`bg-blue-700 w-1/4 mx-auto mt-5 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSummarizeClick}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Summarize'}
          </button>
        </div>
        <div className="mb-4 text-center">
          <textarea
            id="summary"
            name="summarized_text"
            placeholder="Summarized text will appear here"
            value={summary}
            readOnly
            className="w-1/2 p-4 border border-gray-300 rounded mx-auto overflow-auto resize"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
