import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ReactMic } from 'react-mic';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState } from 'react'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, Avatar } from "@chatscope/chat-ui-kit-react"
import { HfInference } from '@huggingface/inference';
import NavBar from './NavBar';

const systemMessage = {
  "role": "system", "content": "Explain answer for all the question as a dedicated assistant"
}

function Chatbot() {
  const [isRecording, setIsRecording] = useState(false);
  const HF_ACCESS_TOKEN = "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";
  const [transcription, setTranscription] = useState('');
  const inference = new HfInference(HF_ACCESS_TOKEN);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [typing, setIsTyping] = useState(false);
  const { speak } = useSpeechSynthesis();

  const [messages, setMessages] = useState([
    {
      message: 'Hello, World!',
      sender: 'other'
    }
  ])

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


  const transcribeAudioRec = async () => {
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
      console.log(result.text);
      handleSend(result.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });


    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);

        if (data.choices && data.choices.length > 0) {
          setMessages([
            ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT",
            },
          ]);
        } else {
          console.error("Unexpected response from the API:", data);
        }
        const response = data.choices[0].message.content;
        speak({ text: response });

        setIsTyping(false);
      });
  }

  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <div className='flex-1 mt-14'>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content="Chatbot is typing" /> : null}>
              {messages.map((message, i) => {
                return <Message
                  key={i}
                  model={message}
                >
                  <Avatar name="user" />
                </Message>
              })}
            </MessageList>
            <div as="MessageInput">
              <MessageInput attachButton={false} placeholder='Type message here' onSend={handleSend} />
              <div className="mb-4 flex justify-between items-center">
                <ReactMic
                  record={isRecording}
                  className="sound-wave"
                  onStop={onStop}
                  onData={onData}
                  strokeColor="#000000"
                  backgroundColor="transparent"
                />
                {isRecording ? (
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { stopRecording(); transcribeAudioRec(); }}>
                    Stop Recording
                  </button>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startRecording}>
                    Start Recording
                  </button>
                )}
              </div>
            </div>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;