import { useState, useRef } from 'react';
//import emailjs from 'emailjs-com';

const FeedbackForm = () => {
  // References and State Variables
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace these constants with your actual EmailJS credentials
  const SERVICE_ID = 'service_xjneed7';      // e.g., 'service_xxx'
  const TEMPLATE_ID = 'template_bhqmdql';    // e.g., 'template_xxx'
  const USER_ID = 'RghE7VjKWDHluwdyd';            // e.g., 'user_xxx'

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setErrorMsg('');
    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, USER_ID)
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        setSubmitted(true);
        setLoading(false);
        form.current.reset();
      }, (error) => {
        console.error('Failed to send email. Error:', error.text);
        setErrorMsg('Failed to send email. Please try again later.');
        setLoading(false);
      });
  };

  return (
    <div className="feedback-form bg-gray-200 p-8 rounded-lg shadow-md max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto focus-within:bg-gray-300 active:bg-gray-400 transition-colors duration-300">
      {loading && (
        <div className="loading-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 mb-4 animate-spin"></div>
            Please wait, we are registering your feedback...
          </div>
        </div>
      )}
      {submitted && (
        <div className="text-green-500 text-xl font-bold text-center mb-4 animate-bounce">
          We have successfully received your enquiry. We will contact you soon.
        </div>
      )}
      {!submitted && (
        <div className="text-gray-700 text-center mb-4">
          Please fill the Form, we are happy to contact you back.
        </div>
      )}
      <form ref={form} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachment">
            Attachment
          </label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept="*/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {errorMsg && <p className="text-red-500 text-center mt-4">{errorMsg}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Enquiry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;