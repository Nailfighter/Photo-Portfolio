import React, { useState } from "react";
import { streetPhotos } from "../../data/assets";

export default function Album({ category, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter photos based on selection (NYC, LA, SF, All)
  const filteredPhotos = streetPhotos.filter(
    (photo) => activeFilter === "All" || photo.location === activeFilter
  );

  // Define cover photo (e.g., street-2)
  const coverPhoto = streetPhotos.find((p) => p.id === "street-2") || streetPhotos[0];

  return (
    <div className="l-album-page">
      {/* LEFT COLUMN: Pinned Album Meta & Filters (30% on desktop) */}
      <aside className="l-album-page__left">
        <div className="l-album-page__sticky-content">
          {/* Back button */}
          <button 
            className="c-album-back-btn"
            onClick={() => onNavigate("home")}
          >
            ← Back to Home
          </button>

          {/* Comic Outline Title Box */}
          <div className="c-album-cover__title-box">
            <h1 className="c-album-cover__title">Street Photography</h1>
          </div>

          {/* Album Cover Art */}
          <figure className="c-album-cover__art">
            <div className="c-album-cover__art-wrapper">
              <img 
                src={coverPhoto.imageUrl} 
                alt="Street Photography Cover" 
                draggable="false"
              />
            </div>
            <figcaption className="c-album-cover__caption">
              FEATURING: {coverPhoto.title} ({coverPhoto.location})
            </figcaption>
          </figure>

          {/* Description Block */}
          <div className="c-album-cover__desc spacing-text">
            <p>
              Candid street portraits, high-contrast urban shadows, and split-second moments frozen in time.
            </p>
            <p>
              A visual study documenting the distinctive architecture and pedestrian dynamics of major American cities.
            </p>
          </div>

          {/* Comic-styled Filter Panel */}
          <div className="c-album-filters">
            <div className="c-album-filters__options">
              {["All", "NYC", "LA", "SF"].map((city) => {
                const isActive = activeFilter === city;
                return (
                  <button
                    key={city}
                    className={`c-filter-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setActiveFilter(city)}
                  >
                    {city === "All" ? "ALL CITIES" : city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: Masonry Photo Grid */}
      <main className="l-album-page__right">
        {filteredPhotos.length > 0 ? (
          <div className="c-album-grid">
            {filteredPhotos.map((photo, index) => {
              // Determine size class based on orientation and index to mix it up
              let sizeClass = "";
              if (photo.orientation === "vertical") {
                sizeClass = "grid-size--tall";
              } else {
                // Alternating horizontal photos between wide and square
                sizeClass = index % 3 === 0 ? "grid-size--wide" : "grid-size--square";
              }

              return (
                <div 
                  key={photo.id} 
                  className={`c-album-thumb ${sizeClass}`}
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
                        <h3 className="c-album-thumb__hover-title">{photo.title}</h3>
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
            <p>No photography matches the active filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}