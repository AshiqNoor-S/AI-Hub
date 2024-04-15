import React, { useState } from 'react';
import Nav from "./NavBar";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import Popup from "./Popup";

function Instructions() {
  const { isAuthenticated } = useAuth0();
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="pt-20 pb-20 bg-gray-900 text-white w-full">
      <Nav />
      <p className="text-center">How to Use AI Hub</p>
      <h1 className="w-full text-center text-3xl font-bold mb-10">Instructions</h1>
      <div className="md:flex md:-mx-4">
        <div className="md:w-1/2 px-4 m-5 ">
          <div className="bg-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] dark:bg-gray-800 rounded-lg p-8 h-full">
            <h2 className="text-2xl font-bold">Transcription and Translation</h2>
            <p className="mt-4">
              To transcribe and translate audio:
              <br /><br />
              1. Go to the Transcription and Translation service in the app.
              <br /><br />
              2. Choose to record audio or upload an audio file that you want to transcribe.
              <br /><br />
              3. The app will process the audio and generate a text transcription.
              <br /><br />
              4. If needed, select the desired target language for translation.
              <br /><br />
              5. The app will translate the transcribed text into the selected language.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 px-4 m-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 h-full">
            <h2 className="text-2xl font-bold">Image Generation</h2>
            <p className="mt-4">
              To generate an image:
              <br /><br />
              1. Go to the Image Generation service in the app.
              <br /><br />
              2. Provide a detailed prompt or description of the image you want to generate.
              <br /><br />
              3. The app will process the prompt and generate an image based on your description.
            </p>
          </div>
        </div>
      </div>
      <div className="md:flex md:-mx-4 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        <div className="md:w-1/2 px-4 m-5">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 h-full">
            <h2 className="text-2xl font-bold">Summarizer</h2>
            <p className="mt-4">
              To summarize a paragraph:
              <br /><br />
              1. Go to the Summarizer service in the app.
              <br /><br />
              2. Provide the paragraph that you want to summarize.
              <br /><br />
              3. The app will process the paragraph and generate a concise summary.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 px-4 m-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 h-full">
            <h2 className="text-2xl font-bold">Audio-Enabled Chatbot</h2>
            <p className="mt-4">
              To use the Audio-Enabled Chatbot:
              <br /><br />
              1. Access the Audio-Enabled Chatbot service in the app.
              <br /><br />
              2. Interact with the chatbot using voice commands or audio messages.
              <br /><br />
              3. The chatbot will respond to your queries and engage in conversation using audio responses.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center mt-8">
        <Link to="/services">
          {!isAuthenticated ? (
            <>
              {showPopup && <Popup onClose={handlePopupClose} />}
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPopup(true);
                }}
              >
                Get Started
              </button>
            </>
          ) : (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
            >
              Get Started
            </button>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Instructions;