import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    country: "",
    state: "",
  });

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: formData.country,
        })
        .then((response) => {
          setStates(response.data.data.states || []);
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, address, phone, country, state } = formData;

    if (!name) {
      console.error("Name is required");
      return false;
    }
    if (!address) {
      console.error("Address is required");
      return false;
    }
    if (!phone) {
      console.error("Phone number is required");
      return false;
    }
    if (!country) {
      console.error("Country is required");
      return false;
    }
    if (!state) {
      console.error("State is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
    }
    console.log("Form Submitted Successfully");
    setFormData({
      name: "",
      address: "",
      phone: "",
      country: "",
      state: "",
    });
  };

  return (
    <div className="p-8 mx-auto lg:w-5/6 ring-2 bg-white-800 shadow-lg lg:rounded-lg font-[sans-serif] lg:mt-12 lg:mb-12">
      <h1 className="text-2xl text-black/90 text-center py-5">Contact Us</h1>
      
       
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
              maxLength={30}
              minLength={3}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
              maxLength={80}
              minLength={20}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border px-4 py-2 dark:text-black border-gray-300 dark:border-gray-600"
              pattern="^\+?[0-9]{10}$" // Validates phone number format
              title="Phone number should be 10 Digits"
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
        
          {submittedData && (
            <div className="mt-8 p-4 bg-gray-400 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Submitted Data</h2>
              <p>
                <strong>Name:</strong> {submittedData.name}
              </p>
              <p>
                <strong>Address:</strong> {submittedData.address}
              </p>
              <p>
                <strong>Phone:</strong> {submittedData.phone}
              </p>
              <p>
                <strong>Country:</strong> {submittedData.country}
              </p>
              <p>
                <strong>State:</strong> {submittedData.state}
              </p>
            </div>
          )}
        </div>
  
  );
};

export default ContactForm;
