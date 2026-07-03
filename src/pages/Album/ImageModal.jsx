import { useEffect } from "react";
import "../../styles/ImageModal.css";

export default function ImageModal({ photo, photos, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  return (
    <div className="c-image-modal-backdrop" onClick={onClose}>
      <div className="c-image-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="c-image-modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        {/* Main image */}
        <div className="c-image-modal__image-container">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="c-image-modal__image"
          />
        </div>

        {/* Photo info */}
        <div className="c-image-modal__info">
          <p>{photo.location ? `${photo.location} • ` : ""}{photo.year}</p>
          <span className="c-image-modal__counter">{currentIndex + 1} / {photos.length}</span>
        </div>

        {/* Navigation buttons */}
        <button
          className="c-image-modal__nav c-image-modal__nav--prev"
          onClick={onPrev}
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          className="c-image-modal__nav c-image-modal__nav--next"
          onClick={onNext}
          aria-label="Next image"
        >
          →
        </button>
      </div>
    </div>
  );
}
