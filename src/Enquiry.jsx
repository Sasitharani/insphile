import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

function EnquiryForm() {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(form.current);
    const fileInput = form.current.querySelector('input[type="file"]');

    if (!fileInput.files.length) {
      setLoading(false);
      Swal.fire({
        title: 'No file attached',
        text: 'Would you like to attach your resume?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          fileInput.classList.add('bg-red-100');
          const fileLabel = form.current.querySelector('label[for="file"]');
          fileLabel.classList.add('text-red-500');
          fileLabel.insertAdjacentHTML('afterend', '<p class="text-red-500">Please attach your file</p>');
        } else {
          sendFormData(formData);
        }
      });
    } else {
      sendFormData(formData);
    }
  };

  const sendFormData = (formData) => {
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
    <div className="enquiry-form bg-gray-200 p-8 rounded-lg shadow-md max-w-full mx-auto">
      {loading && (
        <div className="loading-overlay flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="text-white text-lg">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-12 h-12 mb-4 animate-spin"></div>
            Uploading file...
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
            required
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
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Attachment (optional)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
      {errorMsg && <p className="mt-4 text-red-500">{errorMsg}</p>}
    </div>
  );
}

export default EnquiryForm;