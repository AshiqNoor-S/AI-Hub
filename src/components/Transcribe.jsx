import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { HfInference } from '@huggingface/inference';
import NavBar from './NavBar';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('');
  const HF_ACCESS_TOKEN = "ENTER YOUR TOKEN";  
  const inference = new HfInference(HF_ACCESS_TOKEN);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setRecordedBlob(recordedBlob);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const deleteAudio = () => {
    setRecordedBlob(null);
    setAudioFile(null);
  };

  const transcribeAudio = async () => {
    setLoading(true);
    try {
      if (!audioFile) {
        console.error('No audio file selected.');
        return;
      }
  
      const fileReader = new FileReader();
  
      fileReader.onload = async () => {
        const audioBuffer = fileReader.result;
  
        const model = 'facebook/wav2vec2-large-960h-lv60-self';
        const result = await inference.automaticSpeechRecognition({
          data: audioBuffer,
          model: model,
        });
  
        console.log(result);
        setTranscription(result.text);
      };
  
      fileReader.readAsArrayBuffer(audioFile);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }finally {
      setLoading(false);
    }
  };

  const transcribeAudioRec = async () => {
    setLoading(true);
    try {
      if (!recordedBlob) {
        console.error('No recorded audio available.');
        return;
      }
  
      const model = 'facebook/wav2vec2-large-960h-lv60-self';
      const result = await inference.automaticSpeechRecognition({
        data: recordedBlob.blob,
        model: model,
      });
  
      console.log(result);
      setTranscription(result.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }finally {
      setLoading(false);
    }
  };

  const translateText = async (lang) => {
    setLoading(true);
    try {
      const languageModels = {
        "en-es": "Helsinki-NLP/opus-mt-en-es",
        "en-de": "Helsinki-NLP/opus-mt-en-de",
        "en-fr": "Helsinki-NLP/opus-mt-en-fr",
      };
      const result = await inference.translation({
        model:languageModels[lang],
        inputs: transcription,
      });
      console.log(result.translation_text);
      setTranslation(result.translation_text);
    } catch (error) {
      console.error('Error translating text:', error);
    }finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
  <NavBar />
  <div className="container mx-auto p-4 min-h-screen mt-14 bg-gray-800">
    <h1 className="text-3xl font-bold mb-4 text-center text-white">Audio Recorder</h1>

    {/* Audio Transcriber Description */}
    <p className="text-center mb-4 text-white">
      This application allows you to record audio or upload an audio file and transcribe the contents into text.
    </p>

    <div className="mb-4 flex justify-center">
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Start Recording
      </button>
      <button
        onClick={stopRecording}
        disabled={!isRecording}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Stop Recording
      </button>
    </div>

    {/* ReactMic Component */}
    <div className='flex justify-center'>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        mimeType="audio/wav"
      />
    </div>
    

    {/* Recorded Audio Playback */}
    <div className='flex justify-center'>
      {recordedBlob && (
        <div className="mb-4 text-center">
          <p className="font-bold text-center">Recorded Audio:</p>
          <audio controls className="mt-2">
            <source src={recordedBlob.blobURL} type="audio/wav" />
          </audio>
          <button
            onClick={deleteAudio}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Delete
          </button>
          <div className="mt-4">
            <button
              onClick={transcribeAudioRec}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {loading ? 'Loading...' : 'Transcribe Audio'}
            </button>
          </div>
        </div>
      )}
    </div>
    

    {/* File Upload */}
    <div className="mb-4 text-center mt-10">
      <input
        type="file"
        accept=".mp3, .wav"
        onChange={handleFileChange}
        className="mb-2 text-white"
      />
    </div>

    {/* Uploaded Audio Playback */}
    <div className='text-center flex justify-center'>
      {audioFile && (
        <div className="mb-4">
          <p className="font-bold">Uploaded Audio:</p>
          <audio controls className="mt-2">
            <source src={URL.createObjectURL(audioFile)} type={audioFile.type} />
          </audio>
          <button
            onClick={deleteAudio}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
    

    <div className="mb-4 text-center">
      <button
        onClick={transcribeAudio}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Loading...' : 'Transcribe Audio'}
      </button>
    </div>

    {/* Transcription */}
    {transcription && (
      <div className="mb-4 text-center text-white">
        <p className="font-bold">Transcription:</p>
        <p>{transcription}</p>
        <button
          onClick={() => translateText("en-es")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {loading ? 'Loading...' : 'Translate to Spanish'}
        </button>
        <button
          onClick={() => translateText("en-de")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {loading ? 'Loading...' : 'Translate to German'}
        </button>
        <button
          onClick={() => translateText("en-fr")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Loading...' : 'Translate to French'}
        </button>
      </div>
    )}

    {/* Translation */}
    {translation && (
      <div className="mb-4 text-center text-white">
        <p className="font-bold">Translation:</p>
        <p>{translation}</p>
      </div>
    )}
  </div>
</div>
    
  );
};

export default AudioRecorder;
