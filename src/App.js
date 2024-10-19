import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import CompanyRegistration from './components/CompanyRegistration';
import CompanyLogin from './components/CompanyLogin';
import SignUpVerification from './components/SignUpVerification';
import Home from './components/Home';
import JobPosting from './components/JobPosting';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<CompanyRegistration />} />
          <Route path="/login" element={<CompanyLogin />} />
          <Route path="/verify" element={<SignUpVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post-job" element={<JobPosting />} />
          <Route path="/" element={<CompanyLogin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;