import React from "react";
import LandingCanvas from "../../components/LandingCanvas";
import AlbumSelector from "./AlbumSelector";

export default function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <LandingCanvas />
      <AlbumSelector onNavigate={onNavigate} />
    </div>
  );
}