import { albumCategories, categoryPhotos } from "../../data/assets";

export default function Album({ category, onNavigate }) {
  const categoryData = albumCategories.find((c) => c.id === category) || albumCategories[0];
  const photos = categoryPhotos[categoryData.id] || [];

  // Define cover photo
  const coverPhoto = photos[1] || photos[0];

  return (
    <div className="l-album-page">
      {/* LEFT COLUMN: Pinned Album Meta & Filters (30% on desktop) */}
      <aside className="l-album-page__left" style={{ "--theme-color": categoryData.color }}>
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
            <h1 className="c-album-cover__title">{categoryData.title}</h1>
          </div>

          {/* Album Cover Art */}
          {coverPhoto && (
            <figure className="c-album-cover__art">
              <div className="c-album-cover__art-wrapper">
                <img 
                  src={coverPhoto.imageUrl} 
                  alt={`${categoryData.title} Cover`} 
                  draggable="false"
                />
              </div>
              <figcaption className="c-album-cover__caption">
                FEATURING: {coverPhoto.title} ({coverPhoto.location})
              </figcaption>
            </figure>
          )}

          {/* Description Block */}
          <div className="c-album-cover__desc spacing-text">
            <p>{categoryData.description}</p>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN: Masonry Photo Grid */}
      <main className="l-album-page__right">
        {photos.length > 0 ? (
          <div className="c-album-grid">
            {photos.map((photo, index) => {
              // Determine size class based on orientation and index to mix it up
              const sizeClass = photo.orientation === "vertical" 
                ? "grid-size--tall" 
                : (index % 3 === 0 ? "grid-size--wide" : "grid-size--square");

              return (
                <div 
                  key={photo.id} 
                  className={`c-album-thumb ${sizeClass}`}
                  style={{ "--shadow-color": photo.shadowColor || categoryData.color }}
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
            <p>No photography is available for this category.</p>
          </div>
        )}
      </main>
    </div>
  );
}