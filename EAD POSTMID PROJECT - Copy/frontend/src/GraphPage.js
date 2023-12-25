import React, { useState, useEffect,useRef } from 'react';

import Chart from 'chart.js/auto';

import './GraphPage.css';

const TopInterestsComponent = () => {
  const [topInterests, setTopInterests] = useState([]);
  const [bottomInterests, setBottomInterests] = useState([]);
  const [totalInterestsCount, setTotalInterestsCount] = useState(0);
  const [studentsByCity, setStudentsByCity] = useState([]);
  const [dailyStudentsData, setDailyStudentsData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [studentsByDepartment, setStudentsByDepartment] = useState([]);
  const [studentsByDegree, setStudentsByDegree] = useState([]);
  const [studentsByGender, setStudentsByGender] = useState([]);
  const [studentStatus, setStudentStatus] = useState({
    studying: 0,
    recentlyEnrolled: 0,
    aboutToGraduate: 0,
    graduated: 0
  });
  

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const chartContainerDaily = useRef(null);
  const chartInstanceDaily = useRef(null);
  const chartAgeContainer = useRef(null);
  const chartAgeInstance = useRef(null);
  const chartDeptContainer = useRef(null);
  const chartDeptInstance = useRef(null);
  const chartDegreeContainer = useRef(null);
  const chartDegreeInstance = useRef(null);
  const chartGenderContainer = useRef(null);
  const chartGenderInstance = useRef(null);


  useEffect(() => {
    const fetchTopInterests = async () => {
      try {
        const topResponse = await fetch('http://localhost:5000/Graph/GetTop');
        if (!topResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const topData = await topResponse.json();
        setTopInterests(topData.topInterests);
      } catch (error) {
        console.error('Error fetching top interests:', error);
      }
    };

    const fetchBottomInterests = async () => {
      try {
        const bottomResponse = await fetch('http://localhost:5000/Graph/GetBottom');
        if (!bottomResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const bottomData = await bottomResponse.json();
        setBottomInterests(bottomData.bottomInterests);
      } catch (error) {
        console.error('Error fetching bottom interests:', error);
      }
    };

    const fetchTotalInterestsCount = async () => {
      try {
        const totalResponse = await fetch('http://localhost:5000/Graph/GetTotalInterets');
        if (!totalResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const totalData = await totalResponse.json();
        setTotalInterestsCount(totalData.interestCount);
      } catch (error) {
        console.error('Error fetching total interests count:', error);
      }
    };
    const fetchStudentsByCity = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentsByCity');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentsByCity(data.studentsByCity);
      } catch (error) {
        console.error('Error fetching students by city:', error);
      }
    };

    const fetchDailyStudentsData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentsCreatedDaily');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDailyStudentsData(data.studentsCreatedDaily);
      } catch (error) {
        console.error('Error fetching daily created students:', error);
      }
    };

    const fetchStudentAgeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentAgeDistribution'); // Endpoint to retrieve age distribution data
        if (response.ok) {
          const data = await response.json();
          setAgeData(data.ageData);
        } else {
          console.error('Failed to fetch student age data');
        }
      } catch (error) {
        console.error('Error fetching student age data:', error);
      }
    };

    const fetchStudentsByDepartment = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentsByDepartment');
        if (response.ok) {
          const data = await response.json();
          setStudentsByDepartment(data.studentsByDepartment); // Corrected naming
        } else {
          throw new Error('Failed to fetch students by department');
        }
      } catch (error) {
        console.error('Error fetching students by department:', error);
      }
    };

    const fetchStudentsByDegree = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentsByDegree');
        if (response.ok) {
          const data = await response.json();
          setStudentsByDegree(data.studentsByDegree); // Corrected naming
        } else {
          throw new Error('Failed to fetch students by degree');
        }
      } catch (error) {
        console.error('Error fetching students by degree:', error);
      }
    };

    const fetchStudentsByGender = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentsByGender');
        if (response.ok) {
          const data = await response.json();
          setStudentsByGender(data.studentsByGender); // Corrected naming
        } else {
          throw new Error('Failed to fetch students by gender');
        }
      } catch (error) {
        console.error('Error fetching students by gender:', error);
      }
    };

    const fetchStudentStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/Graph/GetStudentStatus');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentStatus(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching student status:', error);
      }
    };

    fetchStudentStatus();
    fetchStudentsByGender();
    fetchStudentsByDegree();
    fetchStudentsByDepartment();
    fetchStudentAgeData();
    fetchDailyStudentsData();
    fetchStudentsByCity();
    fetchTopInterests();
    fetchBottomInterests();
    fetchTotalInterestsCount();
  }, []);


  const renderPieChart = () => {
    if (chartInstance.current !== null) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartContainer.current;
    if (ctx && studentsByCity.length > 0) {
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: studentsByCity.map(city => city._id),
          datasets: [{
            label: 'Students by City',
            data: studentsByCity.map(city => city.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              // Add more colors if you have more cities
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  };


  const renderDailyStudentsChart = () => {
    if (chartInstanceDaily.current !== null) {
      chartInstanceDaily.current.destroy();
    }

    const ctx = chartContainerDaily.current;
    if (ctx && dailyStudentsData.length > 0) {
      chartInstanceDaily.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dailyStudentsData.map(city => city._id),
          datasets: [
            {
              label: 'Daily Students Created',
              data: dailyStudentsData.map(city => city.count),
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Students Count',
              },
            },
          },
        },
      });
    }
  };

  const renderBarChart = () => {
    if (chartAgeInstance.current !== null) {
      chartAgeInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartAgeContainer.current;
    if (ctx && ageData.length > 0) {
      chartAgeInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ageData.map(entry => entry._id), // Assuming age distribution has _id field
          datasets: [{
            label: 'Student Age Distribution',
            data: ageData.map(entry => entry.count),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Age',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Number of Students',
              },
            },
          },
        },
      });
    }
  };

  const createPieChart = () => {

    

    if (chartDeptInstance.current !== null) {
      chartDeptInstance.current.destroy();
    }

    const ctx = chartDeptContainer.current;
    if (ctx && studentsByDepartment.length > 0) {
      chartDeptInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: studentsByDepartment.map(dept => dept._id),
          datasets: [{
            label: 'Students by Department',
            data: studentsByDepartment.map(dept => dept.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              // Add more colors if needed
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  };


  const createPieDegreeChart = () => {

    if (chartDegreeInstance.current !== null) {
      chartDegreeInstance.current.destroy();
    }

    const ctx = chartDegreeContainer.current;
    if (ctx && studentsByDegree.length > 0) {
      chartDegreeInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: studentsByDegree.map(deg => deg._id),
          datasets: [{
            label: 'Students by Degree',
            data: studentsByDegree.map(deg => deg.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              // Add more colors if needed
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  };


  const createPieGenderChart = () => {

    if (chartGenderInstance.current !== null) {
      chartGenderInstance.current.destroy();
    }

    const ctx = chartGenderContainer.current;
    if (ctx && studentsByGender.length > 0) {
      chartGenderInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: studentsByGender.map(gen => gen._id),
          datasets: [{
            label: 'Students by Gender',
            data: studentsByGender.map(gen => gen.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              // Add more colors if needed
            ],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
        }
      });
    }
  };


  useEffect(() => {
    renderPieChart();
    renderDailyStudentsChart();
    renderBarChart();
    createPieChart();
    createPieDegreeChart();
    createPieGenderChart();

    
  }, [studentsByCity, dailyStudentsData,ageData,studentsByDepartment,studentsByDegree,studentsByGender]);


  return (
    <div className="container01">
      <div className="left-section">
        <div className="top-interests-container">
          <h2 className="interests-heading">Top 5 Interests</h2>
          <div className="interests-list">
            {topInterests.map((interest, index) => (
              <div key={index} className="interest-box">
                <p>{interest.interestName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom-interests-container">
          <h2 className="interests-heading">Bottom 5 Interests</h2>
          <div className="interests-list">
            {bottomInterests.map((interest, index) => (
              <div key={index} className="interest-box">
                <p>{interest.interestName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="middle-section">
        <div className="distinct-interests-heading">
          <h2>Distinct Interests</h2>
        </div>
        <div className="total-interests-count">
          <div className="interests-count-box">
            <p>Total Interests: {totalInterestsCount}</p>
          </div>
        </div>
        
      </div>
      <div className="pie-chart-container">
        <h2>Students by City (Pie Chart)</h2>
        <canvas ref={chartContainer} id="studentsByCityChart"></canvas>
      </div>

      <div className="line-chart-container">
        <h2>Daily Students Created (Line Chart)</h2>
        <canvas ref={chartContainerDaily} id="dailyStudentsChart"></canvas>
      </div>

      <div className="Bar-chart-container">
        <h2>Age Distribution (Bar Chart)</h2>
        <canvas ref={chartAgeContainer} id="studentAgeChart"></canvas>
      </div>
      <div className="Dept-chart-container">
      <h4>Students by Department (Pie Chart)</h4>
      <canvas ref={chartDeptContainer} id="studentsByDepartmentChart"></canvas>
    </div>
    <div className="Degree-chart-container">
      <h4>Students by Degree (Pie Chart)</h4>
      <canvas ref={chartDegreeContainer} id="studentsByDegreeChart"></canvas>
    </div>

    <div className="Gender-chart-container">
      <h4>Students by Gender (Pie Chart)</h4>
      <canvas ref={chartGenderContainer} id="studentsByGenderChart"></canvas>
    </div>

    <div className="student-status-container">
  <h2>Student Status</h2>
  <table className="student-status-table">
    <thead>
      <tr>
        <th>Student Status</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Studying</td>
        <td>{studentStatus && studentStatus.studyingStudents}</td>
      </tr>
      <tr>
        <td>Recently Enrolled</td>
        <td>{studentStatus && studentStatus.recentlyEnrolledStudents}</td>
      </tr>
      <tr>
        <td>About to Graduate</td>
        <td>{studentStatus && studentStatus.aboutToGraduateStudents}</td>
      </tr>
      <tr>
        <td>Graduated</td>
        <td>{studentStatus && studentStatus.graduatedStudents}</td>
      </tr>
    </tbody>
  </table>
</div>


    </div>
    
  );
 };  

export default TopInterestsComponent;


