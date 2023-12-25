import User from '../Models/Users.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
  const { Email, Password, Role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = await User.create({ Email, Password, Role });

    // Generate JWT token with user role
    const token = jwt.sign({ id: newUser._id, role: newUser.Role }, 'your_secret_key_here');

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};



const login = async (req, res) => {
    const { Email, Password } = req.body;
  

    const updateFields = req.body; // Fields to update from the request body

    console.log(req.body);

    try {
      // Check if the user exists
      const user = await User.findOne({ Email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password matches
      if (Password !== user.Password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token with user role
      const token = jwt.sign({ id: user._id, role: user.Role }, 'your_secret_key_here');
  
      res.status(200).json({ user, token });
    
    } catch (error) {
      res.status(500).json({ message: 'Failed to login', error: error.message });
    }
  };
  
  export {register,login};