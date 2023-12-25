import Interest from '../Models/Interest.js'; // Import the Interest model

const addInterest = async (req, res) => {
  try {
    const { Name } = req.body;

    // Check if the Name field is empty in the request body
    if (!Name) {
      return res.status(400).json({ error: 'Name field is empty, please provide the interest name' });
    }

    // Check if the interest already exists in the database
    const existingInterest = await Interest.findOne({ Name });
    if (existingInterest) {
      return res.status(400).json({ error: 'Interest with this name already exists' });
    }

    // Create a new interest instance
    const newInterest = new Interest({
      Name,
    });

    // Save the new interest to the database
    await newInterest.save();

    return res.status(201).json({ message: 'Interest added successfully', interest: newInterest });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};

const getAllInterests = async (req, res) => {
  try {
    // Retrieve all interests from the database
    const interests = await Interest.find({}, 'Name'); // Retrieve only the 'Name' field

    // Extract only the names from the interests
    const interestNames = interests.map((interest) => interest.Name);

    // Return the list of interest names
    return res.status(200).json({ interests: interestNames });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
};

export { addInterest,getAllInterests };
