import { useState, useEffect } from "react";
import { albumCategories } from "../../data/assets";
import { fetchAlbumPhotos } from "../../services/immich";
import ImageModal from "./ImageModal";

export default function Album({ category, onNavigate }) {
  const categoryData = albumCategories.find((c) => c.id === category) || albumCategories[0];

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedCategory, setLoadedCategory] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Reset states during render when category prop changes
  if (category !== loadedCategory) {
    setLoadedCategory(category);
    setLoading(true);
    setError(null);
    setPhotos([]);
  }

  useEffect(() => {
    let active = true;

    fetchAlbumPhotos(category)
      .then((data) => {
        if (active) {
          for (let i = data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
          }
          setPhotos(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.error(err);
          setError(err.message || "Failed to load photos.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [category]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleNextPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
      const nextIndex = (currentIndex + 1) % photos.length;
      setSelectedPhoto(photos[nextIndex]);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhoto) {
      const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      setSelectedPhoto(photos[prevIndex]);
    }
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const bgImageUrl = categoryData.bgUrl || categoryData.imageUrl;

  return (
    <div className="l-album-page" style={{ "--theme-color": categoryData.color }}>
      {/* HERO HEADER */}
      <header className="l-album-hero">
        <div className="l-album-hero__bg">
          <img
            src={bgImageUrl}
            alt={`${categoryData.title} Cover`}
            draggable="false"
          />
        </div>
        <div className="l-album-hero__overlay" />
        <div className="l-album-hero__content">
          <button
            className="c-album-back-btn"
            onClick={() => onNavigate("home")}
          >
            ← Back
          </button>
          <h1 className="l-album-hero__title">{categoryData.title}</h1>
          <p className="l-album-hero__desc">{categoryData.description}</p>
        </div>
      </header>

      {/* FULL-WIDTH PHOTO GRID */}
      <main className="l-album-page__grid-section">
        {loading ? (
          <div className="c-album-grid-empty text--center spacing-text pt-8 pb-8">
            <h2 className="c-hl--1">Loading Gallery...</h2>
            <p>Fetching assets from Immich server.</p>
          </div>
        ) : error ? (
          <div className="c-album-grid-empty text--center spacing-text pt-8 pb-8">
            <h2 className="c-hl--1">Sorry, can't find the images ;&#40;</h2>
          </div>
        ) : photos.length > 0 ? (
          <div className="c-album-grid">
            {photos.map((photo, index) => {
              const sizeClass = photo.orientation === "vertical"
                ? "grid-size--tall"
                : (index % 3 === 0 ? "grid-size--wide" : "grid-size--square");

              return (
                <div
                  key={photo.id}
                  className={`c-album-thumb ${sizeClass}`}
                  style={{ "--shadow-color": photo.shadowColor || categoryData.color }}
                  onClick={() => handlePhotoClick(photo)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="c-album-thumb__card">
                    <div className="c-album-thumb__image-wrapper">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        loading="lazy"
                        draggable="false"
                      />
                      <div className="c-album-thumb__overlay">
                        <span className="c-album-thumb__hover-year">{photo.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="c-album-grid-empty text--center spacing-text pt-8 pb-8">
            <h2 className="c-hl--1">No Photos Found</h2>
            <p>No photography is available for this category or the album UUID in <code>.env</code> is empty.</p>
          </div>
        )}
      </main>

      <ImageModal
        photo={selectedPhoto}
        photos={photos}
        onClose={handleCloseModal}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
}