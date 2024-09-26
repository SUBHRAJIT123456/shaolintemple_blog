import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageGallery.css';

const images = [
    require('../../component/assets/images/gal1.jpg'),
    require('../../component/assets/images/gal2.jpg'),
    require('../../component/assets/images/gal3.jpg'),
    require('../../component/assets/images/gal4.jpg'),
    require('../../component/assets/images/gal5.jpg'),
    require('../../component/assets/images/gal6.jpg')
];

export const ImageGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleShow = (src) => {
    setSelectedImage(src);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="gallery-container">
      {images.map((src, index) => (
        <div key={index} className="gallery-item" onClick={() => handleShow(src)}>
          <img src={src} alt={`Gallery Image ${index + 1}`} className="gallery-image" />
        </div>
      ))}

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body className="modal-body">
          <img src={selectedImage} alt="Full Size" className="modal-image" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
