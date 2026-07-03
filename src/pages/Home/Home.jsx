import LandingCanvas from "./LandingCanvas";
import SurfacePromo from "./SurfacePromo";
import AlbumSelector from "./AlbumSelector";

export default function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <LandingCanvas />
      <SurfacePromo />
      <AlbumSelector onNavigate={onNavigate} />
    </div>
  );
}