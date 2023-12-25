import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddStudentForm.css'; // Import the CSS file

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const token = localStorage.getItem('token'); // Retrieve token from localStorage



const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    RollNo: '',
    EmailAddress: '',
    Gender: '',
    DOB: '',
    City: '',
    Interest: '',
    Department: '',
    DegreeTitle: '',
    Subject: '',
    StartDate: '',
    EndDate: ''
  });



  const [allInterests, setAllInterests] = useState([]);
  const [showInterestOptions, setShowInterestOptions] = useState(false);

  // Function to fetch all interests from the API
  const fetchAllInterests = async () => {
    try {
      const response = await fetch('http://localhost:5000/Interest/Get'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setAllInterests(data.interests);
        setShowInterestOptions(true);
      } else {
        console.error('Failed to fetch interests');
      }
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  // Function to handle interest selection
  const handleInterestSelection = (interest) => {
    setFormData({ ...formData, Interest: interest });
    setShowInterestOptions(false);
  };

  // Function to handle new interest input
  const handleNewInterest = (event) => {
    const newInterest = event.target.value;
    setFormData({ ...formData, Interest: newInterest });
  };

  useEffect(() => {
    // Fetch all interests when the component mounts
    fetchAllInterests();
  }, []); // Empty dependency array ensures it runs only once on mount

  

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/Student/Add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Student added successfully');
        setErrorMessage('');
        setFormData({
          // Clear form fields upon successful addition
          FullName: '',
          RollNo: '',
          EmailAddress: '',
          Gender: '',
          DOB: '',
          City: '',
          Interest: '',
          Department: '',
          DegreeTitle: '',
          Subject: '',
          StartDate: '',
          EndDate: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to add student');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="FullName" value={formData.FullName} onChange={handleChange} className="form-control" placeholder="Full Name" required />
        </div>
        <div className="mb-3">
          <input type="text" name="RollNo" value={formData.RollNo} onChange={handleChange} className="form-control" placeholder="Roll No" required />
        </div>
        <div className="mb-3">
          <input type="email" name="EmailAddress" value={formData.EmailAddress} onChange={handleChange} className="form-control" placeholder="Email Address" required />
        </div>
        <div className="mb-3">
          <select name="Gender" value={formData.Gender} onChange={handleChange} className="form-select" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="DOB" className="form-label">DOB</label>
          <div className="input-group">
            <input 
              type="date" 
              name="DOB" 
              value={formData.DOB} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Date of Birth" 
              required 
            />
            <button className="btn btn-outline-secondary" type="button">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="City" className="form-label">City</label>
          <select
            name="City"
            value={formData.City}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select City</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            
          </select>
        </div>
        <div className="mb-3">
        <input
          type="text"
          name="Interest"
          value={formData.Interest}
          onChange={handleNewInterest}
          className="form-control"
          placeholder="Interest"
          required
        />
        <button type="button" className="btn btn-secondary mt-2" onClick={fetchAllInterests}>
          Show Interests
        </button>
        {showInterestOptions && (
          <div className="mt-2">
            {allInterests.map((interest) => (
              <button
                key={interest}
                className="btn btn-outline-primary me-2 mb-2"
                onClick={() => handleInterestSelection(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        )}
      </div>
        <div className="mb-3">
          <select name="Department" value={formData.Department} onChange={handleChange} className="form-select" required>
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
        <div className="mb-3">
          <select name="DegreeTitle" value={formData.DegreeTitle} onChange={handleChange} className="form-select" required>
            <option value="">Select Degree Title</option>
            <option value="BS">BS</option>
            <option value="MS">MS</option>
            <option value="M-Phil">M-Phil</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className="mb-3">
          <input type="text" name="Subject" value={formData.Subject} onChange={handleChange} className="form-control" placeholder="Subject" required />
        </div>
        <div className="mb-3">
          <label htmlFor="StartDate" className="form-label">Start Date</label>
          <div className="input-group">
            <input 
              type="date" 
              name="StartDate" 
              value={formData.StartDate} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="Start Date" 
              required 
            />
            <button className="btn btn-outline-secondary" type="button">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="EndDate" className="form-label">End Date</label>
          <div className="input-group">
            <input 
              type="date" 
              name="EndDate" 
              value={formData.EndDate} 
              onChange={handleChange} 
              className="form-control" 
              placeholder="End Date" 
              required 
            />
            <button className="btn btn-outline-secondary" type="button">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Add Student</button>
        </div>
      </form>
      {/* Display success message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Display error message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    
  
    </div>
    
    
  );
};



export default AddStudentForm;
