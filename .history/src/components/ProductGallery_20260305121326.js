// src/components/ProductGallery.js
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import image1 from '../assets/images/image-product-1.jpg';
import image2 from '../assets/images/image-product-2.jpg';
import image3 from '../assets/images/image-product-3.jpg';
import image4 from '../assets/images/image-product-4.jpg';
import './ProductGallery.css';
import previous from '../assets/images/icon-previous.svg';
import next from '../assets/images/icon-next.svg';

const images = [image1, image2, image3, image4];

const ProductGallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleThumbnailClick = (index) => {
    if (index >= 0 && index < images.length) {
      setSelectedImageIndex(index);
    }
  };

  const toggleLightbox = () => {
    if (window.innerWidth > 768) {
      setIsLightboxOpen(!isLightboxOpen);
    }
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const closeLightbox = (e) => {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setIsLightboxOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isLightboxOpen]);

  return (
    <div className="gallery">
      <div className="main-image-container">
        <img
          src={images[selectedImageIndex]}
          alt="Product"
          className="main-image"
          onClick={toggleLightbox}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleLightbox()}
          onError={(e) => console.error('Image failed to load:', e.target.src)}
        />
        <button
          className="nav-button prev"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>
        <button
          className="nav-button next"
          onClick={nextImage}
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleThumbnailClick(index)}
            onError={(e) => console.error('Thumbnail failed to load:', e.target.src)}
          />
        ))}
      </div>
      {isLightboxOpen && (
        <div className="lightbox" onClick={closeLightbox} onKeyDown={closeLightbox} tabIndex={0}>
          <button className="close-button" onClick={() => setIsLightboxOpen(false)}>
            ×
          </button>
          <div className="lightbox-image-container">
            <img
              src={images[selectedImageIndex]}
              alt="Product in lightbox"
              className="lightbox-image"
            />
            <button
              className="nav-button prev"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              className="nav-button next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;