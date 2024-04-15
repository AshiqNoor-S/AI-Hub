import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import landImg from '../assets/landing.png';
import img1 from "../assets/img1.jpeg"
import img2 from "../assets/img2.jpeg"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import Faq from './Faq';
import "../index.css";

function Navbar() {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)]

  return (
    <nav class="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="AI-Hub Logo"/>
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">AI-Hub</span>
        </a>

        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/instructions" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Instructions</a>
            </li>
            <li>
              <a href="/services" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="/contact" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Team</a>
            </li>
            <li>
              {isAuthenticated ? (
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  {user && (
                    <div class="flex items-center mr-3">
                    <img src={user.picture} alt={user.name} class="w-9 h-9 rounded-full mr-4"/>
                    <span className='text-white'>{user.name}</span>
                    </div>
                  )}
                  <button onClick={() => logout({ returnTo: window.location.origin })} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                </div>
              ) : (
                <button onClick={() => loginWithRedirect()} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="bg-gray-800 mb-9 rounded-[20px] mx-8 p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] md:px-7 xl:px-10">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
            <img src={icon} alt="" />
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color text-white dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};

function Home() {

  return (
    <div>
      <Navbar />
      <div className="pt-24 pb-24 bg-gray-900 text-white flex flex-col md:flex-row w-full justify-center items-center">
        <div className='md:w-1/2 px-6 py-8'>
          <h1 className="bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400 inline-block text-transparent bg-clip-text text-5xl font-bold p-8">Welcome to AI-Hub</h1>
          <p className="text-xl p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">AI Hub is an advanced platform that leverages artificial intelligence to provide a range of powerful services. With our state-of-the-art web and mobile applications, you can transcribe audio to text and take advantage of additional features like translation, summarization, text-to-image generation, and an interactive chatbot with audio support</p>

          <p className="text-2xl p-8">
            <a href="/services" className="text-blue-700 hover:underline">Learn more</a>
          </p>

          <Link to="/services">
            <button className="relative z-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ml-8 glowing-button">
              Get Started
            </button>
        </Link>

    
        </div>
        <div className="flex justify-center items-center ">
          <img src={landImg} alt="Illustration" className="w-2/4 h-2/4 rounded"/>
        </div> 
     
      </div>




      <section className="bg-gray-900 pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-white">
                Our Services
              </span>
              <h2 className="bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400 inline-block text-transparent bg-clip-text mb-3 text-3xl font-bold leading-[1.2] sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-white">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <ServiceCard
            title="Audio Transcription and Translation"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
            icon={img1}
          />
          <ServiceCard
            title="Summarization"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
            icon={img2}
          />
          <ServiceCard
            title="Text-to-Image Generation"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
            icon={img3}
          />
          <ServiceCard
            title="Interactive Audio Chatbot"
            details="We dejoy working with discerning clients, people for whom qualuty, service, integrity & aesthetics."
            icon={img4}
          />
        </div>
      </div>
    </section>

    <Faq />

    </div>
  );
}

export default Home;
