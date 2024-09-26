import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShaolinMasters.css';

const initialMasters = [
  { id: 1, name: 'Master Li', style: 'Internal', image: require('../../component/assets/images/shifu kanishka sharma.jpg') },
  { id: 2, name: 'Master Chen', style: 'External', image: require('../../component/assets/images/shiHeng.jpg') },
  { id: 3, name: 'Master Zhang', style: 'Mixed', image: require('../../component/assets/images/shiyanzi.jpg') },
  { id: 4, name: 'Master Wu', style: 'Weapons', image: require('../../component/assets/images/shiyenming.jpg') },
];

export const ShaolinMasters = () => {
  const [masters, setMasters] = useState(initialMasters);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentMasterId, setCurrentMasterId] = useState(null); 
  const [newMaster, setNewMaster] = useState({ id: '', name: '', style: '', image: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user);
  }, []);

  const handleShowForm = () => {
    setNewMaster({ id: '', name: '', style: '', image: '' });
    setIsEditing(false); 
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaster((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMaster((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMasters((prev) =>
        prev.map((master) =>
          master.id === currentMasterId ? { ...master, ...newMaster } : master
        )
      );
    } else {
      const newMasterWithId = { ...newMaster, id: Date.now() };
      setMasters((prev) => [...prev, newMasterWithId]);
    }
    handleCloseForm();
  };

  const handleEdit = (master) => {
    setNewMaster({ name: master.name, style: master.style, image: master.image });
    setCurrentMasterId(master.id);
    setIsEditing(true); 
    setShowForm(true); 
  };

  const handleDelete = (id) => {
    setMasters((prev) => prev.filter((master) => master.id !== id));
  };

  return (
    <div className="masters-section">
      <h2><u>Shaolin Masters</u></h2>
      <div className="masters-gallery">
        {masters.map((master) => (
          <div key={master.id} className="master-item">
            <img src={master.image} alt={master.name} className="master-image" />
            <div className="master-info">
              <h3>{master.name}</h3>
              <p>{master.style}</p>
              {isLoggedIn && (
                <>
                  <Button variant="danger" onClick={() => handleDelete(master.id)}>
                    Delete
                  </Button>
                  <Button variant="secondary" onClick={() => handleEdit(master)} className="ml-2">
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {isLoggedIn && (
        <Button onClick={handleShowForm}>Add Master</Button>
      )}

      <Modal show={showForm} onHide={handleCloseForm} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Master' : 'Add New Master'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMasterName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter master's name"
                name="name"
                value={newMaster.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMasterStyle">
              <Form.Label>Style of Teaching</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter style of teaching"
                name="style"
                value={newMaster.style}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMasterImage">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {!isEditing && newMaster.image && (
                <div className="image-preview">
                  <img src={newMaster.image} alt="Preview" />
                </div>
              )}
            </Form.Group><br/>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Master' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
