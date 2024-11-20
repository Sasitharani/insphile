import { useRef, useState } from 'react';

function FeedbackForm() {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(form.current);

    fetch('https://test.insphile.in/upload.php', { // Replace with your actual domain and path to upload.php
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        setSubmitted(true);
        setLoading(false);
        console.log(data);
        if (data.includes('File uploaded and email sent successfully.')) {
          setSubmitted(true);
        } else {
          setErrorMsg(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg('Failed to upload file. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="feedback-form bg-gray-200 p-8 rounded-lg shadow-md max-w-full mx-auto">
      {loading && (
        <div className="loading-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 mb-4 animate-spin"></div>
            Uploading file...
          </div>
        </div>
      )}
      <form ref={form} onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
      </form>
      {submitted && <p className="mt-4 text-green-500">File uploaded successfully!</p>}
      {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}
    </div>
  );
}

export default FeedbackForm;