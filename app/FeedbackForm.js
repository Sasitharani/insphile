"use client"

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('Environment Variables:', process.env);
  }, []);

  // Function to handle file selection
  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file from the input

    if (selectedFile) { // Check if a file was selected
      setFileName(selectedFile.name); // Update the state with the selected file's name
      setFile(selectedFile); // Update the state with the selected file
      setMessageText('File attached successfully- ' + selectedFile.name);
    } else {
      setFileName(''); // Reset the file name state if no file is selected
      setFile(null); // Reset the file state if no file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!file) {
      Swal.fire({
        title: 'No file attached',
        text: 'Would you like to send without attachment or attach a resume?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Send without attachment',
        cancelButtonText: 'Attach a resume'
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed to send without attachment
          sendForm();
        } else {
          // Just close the alert
          setLoading(false);
        }
      });
    } else {
      sendForm();
    }
  };

  const sendForm = async () => {
    try {
      console.log('sending form data to:', `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          filePath,
          fileName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      setSubmitted(true);
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setFile(null);
      setFileName('');
      setFilePath('');
      setMessageText('');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to send message');
      Swal.fire({
        title: 'Error!',
        text: 'Failed to send message. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className={`feedback-form bg-gray-200 p-8 rounded-lg shadow-md max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto ${loading ? 'opacity-50' : ''}`}>
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="loader"></div>
          <p className="text-white mt-4">Please wait, your message is being sent...</p>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Enquiry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-32"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            disabled={fileLoading}
          />
          {fileLoading && <div className="loader mt-2"></div>}
          {fileName && <p className="text-green-500 mt-2">{messageText}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Sending your details...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default FeedbackForm;
