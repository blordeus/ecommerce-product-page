// src/components/ProductGallery.js
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import image1 from "../assets/images/image-product-1.jpg";
import image2 from "../assets/images/image-product-2.jpg";
import image3 from "../assets/images/image-product-3.jpg";
import image4 from "../assets/images/image-product-4.jpg";
import "./ProductGallery.css";

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
      setIsLightboxOpen((prev) => !prev);
    }
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  const closeLightbox = (e) => {
  if (e.target === e.currentTarget) setIsLightboxOpen(false);
};

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isLightboxOpen]);

  return (
    <div className="gallery">
      <div className="main-image-container">
        <button
          type="button"
          className="main-image-button"
          onClick={toggleLightbox}
          aria-label="Open product image gallery"
        >
          <img
            src={images[selectedImageIndex]}
            alt="Fall Limited Edition Sneakers"
            className="main-image"
            onError={(e) =>
              console.error("Image failed to load:", e.target.src)
            }
          />
        </button>
        <button
          type="button"
          className="nav-button prev"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <FaChevronLeft />
        </button>
        <button
          type="button"
          className="nav-button next"
          onClick={nextImage}
          aria-label="Next image"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="thumbnails">
        {images.map((image, index) => {
          const isActive = selectedImageIndex === index;

          return (
            <button
              key={image}
              type="button"
              className={`thumbnail-button ${isActive ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`View image ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="thumbnail"
                onError={(e) =>
                  console.error("Thumbnail failed to load:", e.target.src)
                }
              />
            </button>
          );
        })}
      </div>
      {isLightboxOpen && (
        <div
          className="lightbox"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="close-button"
            onClick={() => setIsLightboxOpen(false)}
          >
            ×
          </button>
          <div className="lightbox-image-container">
            <img
              src={images[selectedImageIndex]}
              alt="Fall Limited Edition Sneakers"
              className="lightbox-image"
            />
            <button
              type="button"
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
