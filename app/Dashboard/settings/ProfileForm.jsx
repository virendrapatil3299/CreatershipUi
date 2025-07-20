// -------- Profile Tab Form --------

'use client'

import { useEffect, useState } from 'react';

export default function ProfileForm() {
    const [formData, setFormData] = useState({
      name: '',
      brand: '',
      designation: '',
      dob: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      website: '',
      instagram: '',
      linkedin: '',
    });
  
    const [profileImage, setProfileImage] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(URL.createObjectURL(file));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Save to Firebase, PostgreSQL, Supabase, etc.
      console.log('Saving data:', formData);
    };
  
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile image */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-28 h-28 rounded-full bg-gray-100 border">
              <img
                src={profileImage || '/icon.png'}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <label className="absolute -bottom-2 -right-2 bg-orange-500 p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-white text-xs">✎</span>
              </label>
            </div>
          </div>
  
          {/* Form Fields */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6 text-sm text-gray-800">
            <Input label="Your Name" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
            <Input label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <Input type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} />
            <Select label="Country" name="country" value={formData.country} onChange={handleChange} options={['Select country...', 'India', 'USA']} />
            <Select label="State/Province" name="state" value={formData.state} onChange={handleChange} options={['Select country first']} />
            <Select label="City" name="city" value={formData.city} onChange={handleChange} options={['Select state first']} />
            <Input label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            <Input label="Website" name="website" value={formData.website} onChange={handleChange} hint="Enter domain name only (e.g. your-website.com)"  />
            <Input label="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} hint="Enter username only (e.g. username)" />
            <Input label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} hint="Enter company name only (e.g. company-name)" />
          </div>
        </div>
  
        {/* Save Button */}
        <div className="flex justify-end mt-8 mb-5">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
      </div>
    );
  }
  
  // --------- Reusable Input Component ---------
  function Input({ label, name, value, onChange, type = 'text', placeholder, hint }) {
    return (
      <div>
        <label className="block mb-1 text-sm text-gray-700 font-medium">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
        />
        {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      </div>
    );
  }
  
  // --------- Reusable Select Component ---------
  function Select({ label, name, value, onChange, options = [] }) {
    return (
      <div>
        <label className="block mb-1 text-sm text-gray-700 font-medium">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-full px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  