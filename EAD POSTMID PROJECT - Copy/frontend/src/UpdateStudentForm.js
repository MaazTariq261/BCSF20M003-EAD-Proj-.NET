import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateStudentForm = () => {
  const { id } = useParams();
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
    EndDate: '',
    // ... Add other fields here
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Student/GetSingle/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data.student);
        } else {
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/Student/Update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Student updated successfully');
        // Show success message or perform additional actions upon successful update
      } else {
        const errorData = await response.json();
        console.error('Failed to update student:', errorData.error);
        // Show error message or perform additional error handling
      }
    } catch (error) {
      console.error('Failed to update student:', error);
      // Show error message or perform additional error handling
    }
  };

  const renderFormFields = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="FullName" className="form-label">Full Name</label>
          <input
            type="text"
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="RollNo" className="form-label">Roll No</label>
          <input
            type="text"
            name="RollNo"
            value={formData.RollNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {/* Add other fields similarly */}
        {/* ... */}
        <div className="mb-3">
          <label htmlFor="EmailAddress" className="form-label">Email Address</label>
          <input
            type="email"
            name="EmailAddress"
            value={formData.EmailAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Gender" className="form-label">Gender</label>
          <input
            type="text"
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        {/* ... Add more fields similarly */}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Update Student</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
