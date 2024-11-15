import { useState } from 'react';
import Swal from 'sweetalert2';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [messageText, setMessageText] = useState(''); // Updated state variable
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setMessageText('No file selected');
      return;
    }

    if (selectedFile.size > 16 * 1024 * 1024) {
      setMessageText('File size exceeds 16 MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        const data = await uploadResponse.json();
        setFileName(data.fileName);
        setFile(selectedFile);
        setMessageText('File attached successfully');
      } else {
        setMessageText('Error attaching file');
      }
    } catch (error) {
      setMessageText('Error attaching file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setMessageText('');
    setLoading(true);

    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message, fileName }),
      });

      if (emailResponse.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setFile(null);
        setFileName('');
        setMessageText('Email sent successfully');
      } else {
        setMessageText('Error sending email');
      }
    } catch (error) {
      setMessageText('Error sending email');
    } finally {
      setLoading(false);
    }
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
        <div className="text-green-500 text-3xl font-bold text-center mb-4 animate-bounce">
          We have successfully received your enquiry. We will contact you soon.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Attach a document
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {fileName && <p className="text-gray-700 mt-2">Uploaded file: {fileName}</p>}
        </div>
        {messageText && <p className={`text-center mt-4 ${messageText.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{messageText}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;