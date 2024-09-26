import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes } from 'react-icons/fa';
import detailsImage from '../../component/assets/images/details.jpeg';
import '../home/home.css';
import { ImageGallery } from './ImageGallery';
import { ShaolinMasters } from './ShaolinMasters';

const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    require('../../component/assets/images/shaolin1.jpg'),
    require('../../component/assets/images/shaolin2.jpg'),
    require('../../component/assets/images/shaolin3.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  const handleShowDetails = () => setShowDetails(true);
  const handleCloseDetails = () => setShowDetails(false);

  return (
    <div className="home-page">
  <h1 className="main-heading">SHAOLIN TEMPLE</h1>

  <div className="sections-container">
    <div className="left-section">
      <h2>Shaolin Kung Fu</h2>
      <p>
        Shaolin Kung Fu, one of the oldest, most famous, and most
        effective martial arts in the world. It originated in the Shaolin
        Temple and was developed over 1,500 years.
      </p>
      <Button style={{ backgroundColor: 'orange', borderColor: 'orange' }} onClick={handleShowDetails}>
        Details
      </Button>
    </div>

    <div className="right-section">
      <img src={images[currentImageIndex]} alt="Shaolin" className="slideshow-image" />
    </div>
  </div>
  
  <Modal show={showDetails} onHide={handleCloseDetails} centered>
    <Modal.Header>
      <Modal.Title><u>Shaolin Temple</u></Modal.Title>
      <Button variant="light" onClick={handleCloseDetails}>
        <FaTimes />
      </Button>
    </Modal.Header>
    <Modal.Body>
      <img src={detailsImage} alt="Shaolin Temple" className="modal-image" />
      <p>
            The Shaolin Temple is a Chan Buddhist temple in Dengfeng, Henan
            Province, China. Founded in the 5th century, it has become
            famous for its association with Chinese martial arts, particularly
            Shaolin Kung Fu. The temple has been an influential cultural
            institution throughout Chinese history and is recognized worldwide
            for its unique contributions to martial arts and Zen Buddhism.
          </p>
          <p>
            Over the centuries, Shaolin Kung Fu has evolved into various
            styles and techniques, including both internal and external
            martial arts. The training at the Shaolin Temple emphasizes physical
            conditioning, martial techniques, and spiritual development.
          </p>
          <p>
            Today, the Shaolin Temple attracts visitors and martial artists
            from all over the world who come to learn about its history and
            practice martial arts. It continues to play a significant role
            in preserving and promoting traditional Chinese martial arts and
            culture.
          </p>
    </Modal.Body>
  </Modal><br/>
  <h2><u>EXHIBITIONS</u></h2>
  <ImageGallery />
  <ShaolinMasters/>
</div>
  );
};
export default Home