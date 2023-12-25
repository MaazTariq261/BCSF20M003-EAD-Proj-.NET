


import AdminLogin from './AdminLogin';
import LandingPage from './LandingPage';
import UserLogin from './UserLogin';
import UserSignup from './UserSignup';

import GraphPage from './GraphPage';


import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link,useLocation,withRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddStudentForm from './AddStudentForm';
import StudentList from './StudentList';
import SingleStudentView from './SingleStudentView'; // Import the new component
import UpdateStudentForm from './UpdateStudentForm'; // Update the path as per your project structure




const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {location.pathname === '/add-student' && (
              <li className="nav-item">
                <Link className="nav-link" to="/studentlist">Student List</Link>
              </li>
            )}
            {location.pathname !== '/graph' && ( // Check if not already on Graph Page
              <li className="nav-item">
                <Link className="nav-link" to="/graph">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
  
const App = () => {
  return (
    <Router forceRefresh={true}>
      <div>
        <Navbar />
        <Switch>
        <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/graph">
            <GraphPage />
            </Route>
          <Route path="/admin-login">
            <AdminLogin />
            </Route>
            <Route path="/user-login">
            <UserLogin />
            </Route>
            <Route path="/user-signup">
            <UserSignup />
            </Route>


          <Route path="/studentlist">
            <StudentList />
          </Route>
          <Route exact path="/student/:id">
            <SingleStudentView />
          </Route>
          
          <Route path="/">
            <AddStudentForm />
          </Route>

          
        </Switch>
      </div>
    </Router>
  );
};

export default App;


