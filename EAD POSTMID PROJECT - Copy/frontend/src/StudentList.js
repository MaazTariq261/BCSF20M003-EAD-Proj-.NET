

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentList.css';

const token = localStorage.getItem('token'); // Retrieve token from localStorage


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  const fetchStudents = async (page) => {
    try {
      const response = await fetch(`http://localhost:5000/Student/GetAll?page=${page}`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data.students);
        setTotalPages(data.totalPages);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);
  
  const handlePagination = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'first' && currentPage !== 1) {
      setCurrentPage(1);
    } else if (direction === 'last' && currentPage !== totalPages) {
      setCurrentPage(totalPages);
    }
  };



  // useEffect(() => {
  //   fetchStudents();
  // }, []);

 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/Student/Delete/${id}`, {
        method: 'DELETE',
        
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

      });

      if (response.ok) {
        // If successful deletion, remove the deleted student from the state
        setStudents(students.filter((student) => student._id !== id));
        console.log('Student deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete student:', errorData.error);
        // Show error message or perform additional error handling
      }
    } catch (error) {
      console.error('Failed to delete student:', error);
      // Show error message or perform additional error handling
    }
  };

  const formatDOB = (dob) => {
    if (dob) {
      const date = new Date(dob);
      return date.toISOString().split('T')[0]; // Extract only the date part
    }
    return '';
  };

  return (
    <div className="container mt-5">
      <h2>Student List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Degree</th>
            <th>DOB</th>
            <th>City</th>
            <th>Interest</th>
            <th>Actions</th>
            {/* Add more table headings as needed */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.FullName}</td>
              <td>{student.RollNo}</td>
              <td>{student.Department}</td>
              <td>{student.DegreeTitle}</td>
              <td>{formatDOB(student.DOB)}</td>
              <td>{student.City}</td>
              <td>{student.Interest && student.Interest.Name}</td>
              <td>
                <Link to={`/student/${student._id}`}>View</Link>{' '}
                <button onClick={() => handleDelete(student._id)}>Delete</button>
              </td>
              {/* Add more table data columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePagination('first')} disabled={currentPage === 1}>
          First Page
        </button>
        <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
          &lt; Prev
        </button>
        <button onClick={() => handlePagination('next')} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
        <button onClick={() => handlePagination('last')} disabled={currentPage === totalPages}>
          Last Page
        </button>
      </div>
    </div>
  );
};

export default StudentList;

