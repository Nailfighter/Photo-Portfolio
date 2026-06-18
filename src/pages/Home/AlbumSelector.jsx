import { useState } from "react";
import { albumCategories } from "../../data/assets";

export default function AlbumSelector({ onNavigate }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="c-album-selector-section px-base pt-8 pb-8">
      <div className="c-album-selector-header text--center">
        <h2 className="c-album-selector__title">Browse Portfolios</h2>
        <p className="c-album-selector__subtitle">
          Select a collection to explore galleries of premium photography.
        </p>
      </div>

      <div className="c-album-selector">
        {albumCategories.map((category) => {
          const isHovered = hoveredId === category.id;
          return (
            <div
              key={category.id}
              className={`c-album-panel ${isHovered ? "is-hovered" : ""}`}
              style={{ "--theme-color": category.color }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onNavigate("album", category.id)}
            >
              <div className="c-album-panel__image-wrapper">
                <img
                  className="c-album-panel__image"
                  src={category.imageUrl}
                  alt={category.title}
                  draggable="false"
                />
              </div>
              <div className="c-album-panel__overlay" />
              <div className="c-album-panel__header">{category.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}