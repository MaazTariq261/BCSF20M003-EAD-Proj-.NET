import Student from '../Models/Student.js'; // Import the Student model
import Interest from '../Models/Interest.js'; // Import the Interest model

const addStudent = async (req, res) => {
  try {
    const {
      FullName,
      RollNo,
      EmailAddress,
      Gender,
      DOB,
      City,
      Interest: InterestName, // Assuming Interest is provided as InterestName from Postman
      Department,
      DegreeTitle,
      Subject,
      StartDate,
      EndDate,
    } = req.body;

    // Check for missing fields in the request body
    const missingFields = [];
    if (!FullName) missingFields.push('FullName');
    if (!RollNo) missingFields.push('RollNo');
    if (!EmailAddress) missingFields.push('Email');
    if (!Gender) missingFields.push('Gender');
    if (!DOB) missingFields.push('DOB');
    if (!City) missingFields.push('City');
    if (!InterestName) missingFields.push('Interest');
    if (!Department) missingFields.push('Department');
    if (!DegreeTitle) missingFields.push('DegreeTitle');
    if (!Subject) missingFields.push('Subject');
    if (!StartDate) missingFields.push('StartDate');
    if (!EndDate) missingFields.push('EndDate');

    if (missingFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in the following fields', missingFields });
    }

    // Check if RollNo or Email already exist in the database
    const existingStudent = await Student.findOne({ $or: [{ RollNo }, { EmailAddress }] });
    if (existingStudent) {
      return res.status(400).json({ error: 'RollNo or Email already exists' });
    }

    // Validate Gender
    if (!['Male', 'Female'].includes(Gender)) {
      return res.status(400).json({ error: 'Gender should be Male or Female' });
    }

    // Create a new student instance
    const newStudent = new Student({
      FullName,
      RollNo,
      EmailAddress,
      Gender,
      DOB: new Date(DOB), // Assuming DOB is in a valid date format
      City,
      Department,
      DegreeTitle,
      Subject,
      StartDate,
      EndDate,
    });

    // Find or create Interest and associate its ID with the student
    let interestId;
    let interest = await Interest.findOne({ Name: InterestName });
    if (!interest) {
      interest = new Interest({ Name: InterestName });
      await interest.save();
    }
    interestId = interest._id;
    newStudent.Interest = interestId;

    // Save the new student to the database
    await newStudent.save();

    return res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};


// const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find()
//       .populate('Interest', 'Name -_id') // Populate the 'Interest' field from the 'Interest' collection and retrieve only the 'Name'
//       .select('FullName RollNo Department DegreeTitle DOB City Interest'); // Select the fields you want to retrieve

//     return res.status(200).json({ students });
//   } catch (error) {
//     return res.status(500).json({ error: 'Something went wrong', details: error.message });
//   }
// };

const getAllStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get requested page number from query parameters or default to 1
  const pageSize = 10; // Set the page size to 10

  try {
    const totalStudents = await Student.countDocuments(); // Get the total count of students
    const totalPages = Math.ceil(totalStudents / pageSize); // Calculate the total pages

    const students = await Student.find()
      .populate('Interest', 'Name -_id')
      .select('FullName RollNo Department DegreeTitle DOB City Interest')
      .skip((page - 1) * pageSize) // Skip records based on page number
      .limit(pageSize); // Limit records per page

    return res.status(200).json({ students, totalPages }); // Sending totalPages in the response
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};




const getStudentById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the student ID from the request parameters

    // Find the student by ID
    const student = await Student.findById(id)
      .populate('Interest', 'Name -_id'); // Populate the 'Interest' field and retrieve only the 'Name' while excluding '_id'

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({ student });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params; // Extract the student ID from the request parameters

    // Find the student by ID and remove it
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};


// const updateStudent = async (req, res) => {
//   try {
//     const { id } = req.params; // Extract the student ID from the request parameters
//     const updateFields = req.body; // Fields to update from the request body

//     console.log(req.body);
//     // Check if the Interest field is present in the updateFields
//     if ('Interest' in updateFields) {
//       let interestId;

//       // Find or create Interest and associate its ID with the student
//       let interest = await Interest.findOne({ Name: updateFields.Interest });

//       if (!interest) {
//         // If the interest does not exist, create a new interest
//         interest = new Interest({ Name: updateFields.Interest });
//         await interest.save();
//       }

//       interestId = interest._id;
//       updateFields.Interest = interestId;
//     }

//     // Find the student by ID
//     let studentToUpdate = await Student.findById(id);

//     if (!studentToUpdate) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Update individual fields in the student document
//     for (const key in updateFields) {
//       if (key !== '_id') {
//         studentToUpdate[key] = updateFields[key];
//       }
//     }

//     // Save the updated student
//     const updatedStudent = await studentToUpdate.save();

//     return res.status(200).json({ student: updatedStudent });
//   } catch (error) {
//     return res.status(500).json({ error: 'Something went wrong', details: error.message });
//   }
// };


const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // Extract the student ID from the request parameters
    const updateFields = req.body; // Fields to update from the request body

    console.log(req.body);

    // Check if the Interest field is present in the updateFields and is an object
    if (updateFields.Interest && typeof updateFields.Interest === 'object' && updateFields.Interest.hasOwnProperty('Name')) {
      let interestId;

      // Find or create Interest and associate its ID with the student
      let interest = await Interest.findOne({ Name: updateFields.Interest.Name });

      if (!interest) {
        // If the interest does not exist, create a new interest
        interest = new Interest({ Name: updateFields.Interest.Name });
        await interest.save();
      }

      interestId = interest._id;
      updateFields.Interest = interestId;
    }

    // Find the student by ID
    let studentToUpdate = await Student.findById(id);

    if (!studentToUpdate) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update individual fields in the student document
    for (const key in updateFields) {
      if (key !== '_id') {
        studentToUpdate[key] = updateFields[key];
      }
    }

    // Save the updated student
    const updatedStudent = await studentToUpdate.save();

    return res.status(200).json({ student: updatedStudent });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};


export { addStudent ,getAllStudents,getStudentById,deleteStudent,updateStudent};
