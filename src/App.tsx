import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FullForm from './components/FullForm';
import Table from './components/Table';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/users" Component={Table }/>
        <Route path="/user/add" Component={FullForm} />
        <Route path="/user/:userId/edit" Component={FullForm} />
        <Route
          path="/"
          element={<Navigate to="/user/add" replace />} // Redirect to "/user/add"
        />
      </Routes>
  </Router>
    
  );
}

export default App;
