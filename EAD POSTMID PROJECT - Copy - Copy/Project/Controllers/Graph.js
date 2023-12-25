// Assuming you have already imported your models (Interest and Student) and set up the Express router
import Interest from '../Models/Interest.js'; // Import the Interest model
import Student from '../Models/Student.js'; // Import the Student model

// Endpoint to get the top 5 interests by student count
const TopInterests = async (req, res) => {
  try {
    const topInterests = await Student.aggregate([
      {
        $group: {
          _id: '$Interest',
          count: { $sum: 1 } // Count the number of students for each interest
        }
      },
      {
        $lookup: {
          from: Interest.collection.name, // Using the collection name from the Interest model
          localField: '_id',
          foreignField: '_id',
          as: 'interestData'
        }
      },
      {
        $unwind: '$interestData'
      },
      {
        $project: {
          _id: 0,
          interestName: '$interestData.Name',
          count: 1
        }
      },
      {
        $sort: { count: -1 } // Sort by student count in descending order
      },
      {
        $limit: 5 // Get only the top 5 interests
      }
    ]);

    res.status(200).json({ topInterests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const BottomInterests = async (req, res) => {
    try {
      const bottomInterests = await Student.aggregate([
        {
          $group: {
            _id: '$Interest',
            count: { $sum: 1 } // Count the number of students for each interest
          }
        },
        {
          $lookup: {
            from: Interest.collection.name,
            localField: '_id',
            foreignField: '_id',
            as: 'interestData'
          }
        },
        {
          $unwind: '$interestData'
        },
        {
          $project: {
            _id: 0,
            interestName: '$interestData.Name',
            count: 1
          }
        },
        {
          $sort: { count: 1 } // Sort by student count in ascending order (least popular)
        },
        {
          $limit: 5 // Get only the bottom 5 interests
        }
      ]);
  
      res.status(200).json({ bottomInterests });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const getTotalInterests = async (req, res) => {
    try {
      const interestCount = await Interest.countDocuments(); // Query to get the count of documents in the Interest collection/table
      res.status(200).json({ interestCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getStudentsByCity = async (req, res) => {
    try {
      const studentsByCity = await Student.aggregate([
        {
          $group: {
            _id: '$City',
            count: { $sum: 1 } // Count the number of students for each city
          }
        }
      ]);
  
      res.status(200).json({ studentsByCity });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getStudentsCreatedDaily = async (req, res) => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
  
      const studentsCreatedDaily = await Student.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo, $lte: today }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      res.status(200).json({ studentsCreatedDaily });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  const getStudentAgeDistribution = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
  
      // Assuming you have a Student model with 'dateOfBirth' field representing DOB
      const ageData = await Student.aggregate([
        {
          $project: {
            age: {
              $subtract: [
                { $year: currentDate }, // Get the current year
                { $year: '$DOB' } // Get the year from the date of birth field
              ]
            }
          }
        },
        {
          $group: {
            _id: '$age', // Group by age
            count: { $sum: 1 } // Count the number of students for each age
          }
        },
        {
          $sort: { _id: 1 } // Sort the results by age
        }
      ]);
  
      // Return the age distribution data as a response
      res.status(200).json({ ageData });
    } catch (error) {
      console.error('Error fetching student age distribution:', error);
      res.status(500).json({ error: 'Failed to fetch student age distribution' });
    }
  };

  const getStudentsByDepartment = async (req, res) => {
    try {
      const studentsByDepartment = await Student.aggregate([
        {
          $group: {
            _id: '$Department',
            count: { $sum: 1 } // Count the number of students for each city
          }
        }
      ]);
  
      res.status(200).json({ studentsByDepartment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  const getStudentsByDegree = async (req, res) => {
    try {
      const studentsByDegree = await Student.aggregate([
        {
          $group: {
            _id: '$DegreeTitle',
            count: { $sum: 1 } // Count the number of students for each city
          }
        }
      ]);
  
      res.status(200).json({ studentsByDegree });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getStudentsByGender = async (req, res) => {
    try {
      const studentsByGender = await Student.aggregate([
        {
          $group: {
            _id: '$Gender',
            count: { $sum: 1 } // Count the number of students for each city
          }
        }
      ]);
  
      res.status(200).json({ studentsByGender });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getStudentStatus = async (req, res) => {
    try {
      const currentDate = new Date(); // Get the current date
      const students = await Student.find({}, 'StartDate EndDate');
  
      const studyingStudents = students.filter(student => {
        const startDate = new Date(student.StartDate);
        const endDate = new Date(student.EndDate);
        return startDate <= currentDate && endDate >= currentDate;
      });
  
      const recentlyEnrolledStudents = students.filter(student => {
        const startDate = new Date(student.StartDate);
        const endDate = new Date(student.EndDate);
        const daysDiff = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
        return daysDiff <= 30; // Assuming recently enrolled if within 30 days
      });
  
      const aboutToGraduateStudents = students.filter(student => {
        const endDate = new Date(student.EndDate);
        const daysDiff = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
        return daysDiff <= 5 && daysDiff >= 0; // Assuming within 5 days of completion
      });
  
      const graduatedStudents = students.filter(student => {
        const endDate = new Date(student.EndDate);
        return endDate < currentDate;
      });
  
      res.status(200).json({
        studyingStudents: studyingStudents.length,
        recentlyEnrolledStudents: recentlyEnrolledStudents.length,
        aboutToGraduateStudents: aboutToGraduateStudents.length,
        graduatedStudents: graduatedStudents.length
      });
    } catch (error) {
      console.error('Error fetching student status:', error);
      res.status(500).json({ error: 'Failed to fetch student status' });
    }
  };

export {TopInterests, BottomInterests,getTotalInterests,
   getStudentsByCity,getStudentsCreatedDaily, 
   getStudentAgeDistribution,getStudentsByDepartment,
   getStudentsByDegree,getStudentsByGender,getStudentStatus};
