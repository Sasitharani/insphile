import { useRef, useState } from 'react';

function FeedbackForm() {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => {
        setSubmitted(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
      {submitted && (
        <div className="text-green-500 text-xl font-bold text-center mb-4">
          File uploaded successfully.
        </div>
      )}
      {!submitted && (
        <div className="text-gray-700 text-center mb-4">
          Please select a file to upload.
        </div>
      )}
      <form ref={form} onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;