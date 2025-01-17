import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    country: '',
    state: ''
  });


  useEffect(() => {
    axios
      .get('https://countriesnow.space/api/v0.1/countries')
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);


  useEffect(() => {
    if (formData.country) {
      axios
        .post('https://countriesnow.space/api/v0.1/countries/states', {
          country: formData.country,
        })
        .then((response) => {
          setStates(response.data.data.states || []);
        })
        .catch((error) => console.error('Error fetching states:', error));
    }
  }, [formData.country]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form has been Submitted Successfully")
  };

  return (
    <div className="p-8 mx-auto  lg:w-4/5   gap-16 bg-white dark:bg-gray-800 shadow-lg lg:rounded-lg text-[#333]  font-[sans-serif] lg:mt-20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
          required
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
          required
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
          required
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
          required
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      
        <button
          type="submit"
          className="w-full bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
