import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Nav from './NavBar';
import Popup from './Popup';

function Services() {
  const [showPopup, setShowPopup] = useState(false);
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const renderSummarizerButton = (serviceName) => {
    if (!isAuthenticated) {
      return (
        <>
          {showPopup && <Popup onClose={handlePopupClose} />}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
            onClick={(e) => {
              e.preventDefault();
              setShowPopup(true);
            }}
          >
            {getButtonLabel(serviceName)}
          </button>
        </>
      );
    } else {
      return (
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center"
        >
          {getButtonLabel(serviceName)}
        </button>
      );
    }
  };

  const getButtonLabel = (serviceName) => {
    switch (serviceName) {
      case 'summarizer':
        return 'Summarizer';
      case 'transcribe':
        return 'Transcribe';
      case 'image-gen':
        return 'Image Generator';
      case 'chatbot':
        return 'Chatbot';
      default:
        return '';
    }
  };

  return (
    <div className="pt-20 pb-20 bg-gray-900 text-white w-full min-h-screen">
  <Nav />
  <p className="text-center">Services that we provide</p>
  <h1 className="w-full text-center text-3xl font-bold">Our Services</h1>
  <div className="flex flex-row">

    <div className="md:w-1/2 px-6 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold">Summarizer</h2>
        <p className="mt-4">
          This powerful tool condenses lengthy text into a concise and informative summary. 
          Simply provide the text you want to summarize, and our AI will extract the key points and generate a shorter version that retains the essential meaning. Perfect for quickly understanding long articles, research papers, or emails.
        </p>
        <br/>
        <Link to="/summarizer">{renderSummarizerButton('summarizer')}</Link>
      </div>
    </div>

    <div className="md:w-1/2 px-6 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold">Audio Transcription and Translator</h2>
        <p className="mt-4">
          Never miss a detail again! This service transcribes your audio recordings into text,  
          making them searchable, editable, and easier to share. Additionally, it can translate the transcribed text into different languages, 
          breaking down communication barriers. Upload your audio files and let us handle the rest.
        </p>
        <br/>
        <Link to="/transcribe">{renderSummarizerButton('transcribe')}</Link>
      </div>
    </div>

    <div className="md:w-1/2 px-6 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold">Text-to-Image Generator</h2>
        <p className="mt-4">
          Fuel your creativity with this innovative tool! Give us a text description of your desired image, 
          and our AI will transform it into a visually stunning picture. This is perfect for illustrating ideas, designing concepts, or simply generating creative visuals. 
          Just type in your description and watch your imagination come to life!
        </p>
        <br/>
        <Link to="/image-gen">{renderSummarizerButton('image-gen')}</Link>
      </div>
    </div>

    <div className="md:w-1/2 px-6 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold">Interactive Audio Chatbot</h2>
        <p className="mt-4">
          Engage with information in a natural and engaging way! This service creates an interactive chatbot that you can 
          talk to through audio commands. Ask it questions, get information, or simply have a conversation. 
          The chatbot uses AI to understand your requests and provide relevant responses. Experience the future of communication!
        </p>
        <br/>
        <Link to="/chatbot">{renderSummarizerButton('chatbot')}</Link>
      </div>
    </div>
  </div>
</div>
  );
}

export default Services;