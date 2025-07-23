import React, { useState } from 'react';
import axios from 'axios';

const BusinessSetupForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const formData = new FormData();
    formData.append('business_name', businessName);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        'http://127.0.0.1:8000/api/business-profile/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess('Business profile saved successfully!');
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong while saving the profile.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Business Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Business Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default BusinessSetupForm;
