import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";
import NavBar from "./NavBar";

function ImageGen() {
  const [inputText, setInputText] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const inference = new HfInference("ENTER YOUR TOKEN);

  const textToImage = async (text) => {
    setLoading(true);
    try {
      const imagegenmodel = "stabilityai/stable-diffusion-2";
      const result = await inference.textToImage({
        inputs: text,
        model: imagegenmodel,
        parameters: {
          negative_prompt: "blurry",
        },
      });
      console.log(result);
      setGeneratedImage(result);
    } catch (error) {
      console.error("Error Generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const generateImage = () => {
    textToImage(inputText);
  };

  return (
    <div>
        <NavBar />
      <div className="bg-gray-800 min-h-screen mt-14 flex flex-col items-center justify-start">
      
      <h1 className="text-3xl font-bold mb-4 text-white mt-10">Image Generator</h1>

      {/* Description */}
      <p className="text-white text-center mb-4 text-lg font-semibold">
        This application allows you to generate an image based on a given text prompt. <br/>Enter your desired text below and click "Generate Image" to create the image.
      </p>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <label htmlFor="inputText" className="input-label">
          Enter the prompt : <br/>
        </label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={handleTextChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generateImage}
          className=" bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
        >
          {loading ? 'Loading...' : 'Generate Image'}
        </button>
      </div>

        {loading && <div className="loader">Generating...</div>}

        {generatedImage && (
          <div className=" bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Generated Image:</h2>
            <img
              src={URL.createObjectURL(generatedImage)}
              alt="Generated"
              className="generated-image"
            />
          </div>
        )}
      </div>
    </div>
    
  );
}

export default ImageGen;
