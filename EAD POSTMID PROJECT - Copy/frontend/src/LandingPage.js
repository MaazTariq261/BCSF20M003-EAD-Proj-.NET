import React from 'react';
import { Link } from 'react-router-dom';










// const LandingPage = () => {
//   return (
//     <div className="container">
//       <h1>Welcome to the Application</h1>
//       <div className="buttons-container">
//         <h3>Login</h3>
//         <Link to="/admin-login">
//           <button>Admin Login</button>
//         </Link>
//         <Link to="/user-login">
//           <button>User Login</button>
//         </Link>
//       </div>
//       <div className="buttons-container">
//         <h3>Sign Up</h3>
//         <Link to="/user-signup">
//           <button>User Sign Up</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


const LandingPage = () => {
    return (
      <div style={styles.container02}>
        <h1 style={styles.heading}>Welcome to the Application</h1>
        <div style={styles.buttonsContainer}>
          <h3 style={styles.subHeading}>Login</h3>
          <Link to="/admin-login">
            <button style={styles.button}>Admin Login</button>
          </Link>
          <Link to="/user-login">
            <button style={styles.button}>User Login</button>
          </Link>
          
        </div>
        <div style={styles.buttonsContainer}>
          <h3 style={styles.subHeading}>Sign Up</h3>
          <Link to="/user-signup">
            <button style={styles.button}>User Sign Up</button>
          </Link>
        </div>
      </div>
    );
  };
  
  const styles = {
    container02: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      paddingTop: '50px',
      color: '#333',
    },
    heading: {
      marginBottom: '30px',
      fontSize: '36px',
      fontWeight: 'bold',
    },
    subHeading: {
      marginBottom: '15px',
      color: '#555',
      fontSize: '24px',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
    },
    button: {
      marginBottom: '10px',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };
  
  export default LandingPage;
