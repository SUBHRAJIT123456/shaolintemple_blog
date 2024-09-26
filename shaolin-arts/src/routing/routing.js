import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from '../layout/header/header';
import Footer from '../layout/footer/footer';
import Home from '../component/home/home';
import Profile from '../component/profile/profile';
import Login from '../component/login/login';
import Registration from '../component/register/Registration';
import BlogPage from '../component/blog/blog';
import ContactUs from '../component/contact/ContactUs';
import FiveAnimalKungFu from '../component/styles/FiveAnimalKungFu';
import WingChun from '../component/styles/WingChun';
import IronKungFu from '../component/styles/IronKungFu';
import Modal from 'react-bootstrap/Modal';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

const ModalRoute = ({ Component }) => {
  const navigate = useNavigate(); // useNavigate must be inside a <Router>
  
  const handleCloseModal = () => {
    navigate(-1); // Navigate back to the previous route
  };

  return (
    <Modal show={true} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <Component />
      </Modal.Body>
    </Modal>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Modal Routes */}
        <Route
          path="/styles/five-animal"
          element={<ModalRoute Component={FiveAnimalKungFu} />}
        />
        <Route
          path="/styles/wing-chun"
          element={<ModalRoute Component={WingChun} />}
        />
        <Route
          path="/styles/iron-kungfu"
          element={<ModalRoute Component={IronKungFu} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

const Routing = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default Routing;
