import LandingCanvas from "./LandingCanvas";
import AboutMe from "./AboutMe";
import AlbumSelector from "./AlbumSelector";

export default function Home({ onNavigate }) {
  return (
    <div className="home-page">
      <LandingCanvas />
      <AboutMe />
      <AlbumSelector onNavigate={onNavigate} />
    </div>
  );
}