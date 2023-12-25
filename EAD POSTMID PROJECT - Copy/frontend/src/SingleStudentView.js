
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SingleStudentView.css';

const token = localStorage.getItem('token');

const SingleStudentView = () => {
  const { id } = useParams();
  const history = useHistory();

  const [studentData, setStudentData] = useState({});
  const [editableData, setEditableData] = useState({}); // For editing data

  // useEffect(() => {
  //   // Fetch data for a single student when the component mounts
  //   const fetchStudentData = async () => {
      
  //      // const response = await fetch(`http://localhost:5000/Student/GetSingle/${id}`);
  //      try {
  //       const response = await fetch(`http://localhost:5000/Student/GetSingle/${id}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,

  //         },
  //         body: JSON.stringify(editableData),
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setStudentData(data.student);
  //         setEditableData(data.student); // Set editable data initially
  //       } else {
  //         console.error('Failed to fetch student data');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching student data:', error);
  //     }
  //   };

  //   fetchStudentData();
  // }, [id]);


  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Student/GetSingle/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setStudentData(data.student);
          setEditableData(data.student); // Set editable data initially
        } else {
          console.error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    fetchStudentData();
  }, [id, token]); // Include 'token' as a dependency to use it within useEffect
  


  const handleEdit = () => {
    // Enable editing by copying student data to editableData state
    setEditableData({ ...studentData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'Interest') {
      // Always set the value as an object with a 'Name' property
      setEditableData({ ...editableData, [name]: { Name: value } });
    } else {
      // For other fields, update normally
      setEditableData({ ...editableData, [name]: value });
    }
  };
  

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Student/Update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editableData),
      });

      if (response.ok) {
        console.log('Student updated successfully');
        // Redirect to the student list or perform additional actions upon successful update
        history.push('/studentlist');
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

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="FullName"
            value={editableData.FullName || ''}
            readOnly={!editableData.FullName} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rollno" className="form-label">Roll No</label>
          <input
            type="text"
            className="form-control"
            id="rollno"
            name="RollNo"
            value={editableData.RollNo || ''}
            readOnly={!editableData.RollNo} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">Email Address</label>
          <input
            type="text"
            className="form-control"
            id="emailAddress"
            name="EmailAddress"
            value={editableData.EmailAddress || ''}
            readOnly={!editableData.EmailAddress} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            name="Gender"
            value={editableData.Gender || ''}
            readOnly={!editableData.Gender} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">DOB</label>
          <input
            type="text"
            className="form-control"
            id="dob"
            name="DOB"
            value={editableData.DOB || ''}
            readOnly={!editableData.DOB} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="City"
            value={editableData.City || ''}
            readOnly={!editableData.City} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="interest" className="form-label">Interest</label>
          <input
            type="text"
            className="form-control"
            id="interest"
            name="Interest"
            value={editableData.Interest ? editableData.Interest.Name : ''}
            readOnly={!editableData.Interest} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dept" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="dept"
            name="Department"
            value={editableData.Department || ''}
            readOnly={!editableData.Department} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="degreeTitle" className="form-label">Degree Title</label>
          <input
            type="text"
            className="form-control"
            id="degreeTitle"
            name="DegreeTitle"
            value={editableData.DegreeTitle || ''}
            readOnly={!editableData.DegreeTitle} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="Subject"
            value={editableData.Subject || ''}
            readOnly={!editableData.Subject} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startdate" className="form-label">Start Date</label>
          <input
            type="text"
            className="form-control"
            id="startdate"
            name="StartDate"
            value={editableData.StartDate || ''}
            readOnly={!editableData.StartDate} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="text"
            className="form-control"
            id="endDate"
            name="EndDate"
            value={editableData.EndDate || ''}
            readOnly={!editableData.EndDate} // Disable editing if FullName is empty
            onChange={handleChange}
          />
        </div>
        {/* Include other fields similarly */}
        {/* ... */}

        {editableData.FullName ? ( // Only show edit and update buttons if FullName exists
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={handleEdit}>
              Edit
            </button>
            <button type="button" className="btn btn-success mx-2" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SingleStudentView;