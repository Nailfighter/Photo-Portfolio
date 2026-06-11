import React, { useRef, useState } from "react";
import { slideshowImages } from "../data/assets";

export default function Slideshow() {
  const wrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - wrapperRef.current.offsetLeft);
    setScrollLeft(wrapperRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="l-slideshow px-base pt-7 pb-6 js-dark-section">
      <figure className="l-slideshow__slideshow js-slideshow" style={{ "--slide-count": 3 }}>
        <div 
          ref={wrapperRef}
          className="l-slideshow__wrapper js-slideshow-wrapper"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            overflowX: "scroll",
            display: "flex",
            scrollbarWidth: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="l-slideshow__slides">
            {slideshowImages.map((url, index) => (
              <div className="l-slideshow__slide" key={index}>
                <figure className="c-image">
                  <div className="c-image__wrapper">
                    <img 
                      src={url} 
                      alt={`Analog slide ${index + 1}`} 
                      draggable="false"
                      loading="lazy"
                    />
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </figure>
    </div>
  );
}
