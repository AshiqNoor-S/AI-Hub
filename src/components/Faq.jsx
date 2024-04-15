import React, { useState } from "react";

const AccordionItem = ({ header, text }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    // event.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-8 w-full rounded-lg bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary">
          <svg
            className={`fill-primary stroke-primary duration-200 ease-in-out ${
              active ? "rotate-180" : ""
            }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full">
          <h4 className="mt-1 text-lg font-semibold text-black">
            {header}
          </h4>
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${
          active ? "block" : "hidden"
        }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};



const faq = () => {
  return (
    <section className="relative bg-gray-900 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-white">
                FAQ
              </span>
              <h2 className="bg-gradient-to-r from-blue-50 via-blue-200 to-blue-400 inline-block text-transparent bg-clip-text mb-4 text-3xl font-bold sm:text-[40px]/[48px]">
                Any Questions? Look Here
              </h2>
              <p className="text-base text-white">
                Find Solutions below
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="What is AI-Hub?"
              text="AI-Hub is an advanced platform that utilizes artificial intelligence to offer a range of powerful services through web and mobile applications."
            />
            <AccordionItem
              header="What services does AI-Hub provide?"
              text="AI-Hub provides services such as audio-to-text transcription, translation, summarization, text-to-image generation, and an interactive chatbot with audio support."
            />
            <AccordionItem
              header="How accurate is the transcription service?"
              text="The accuracy of the transcription service depends on various factors such as audio quality and accents. However, AI-Hub strives to provide highly accurate transcriptions."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Can I use AI-Hub for professional purposes?"
              text="Yes, AI-Hub can be used for professional purposes such as transcribing meetings, interviews, lectures, and more."
            />
            <AccordionItem
              header="Is my data safe and secure with AI-Hub?"
              text="Yes, AI-Hub takes data privacy and security seriously. Your data is encrypted and protected to ensure its safety."
            />
            <AccordionItem
              header="Can I try AI-Hub for free?"
              text="Yes, AI-Hub offers a free trial period for you to explore its services and experience their benefits."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default faq;

