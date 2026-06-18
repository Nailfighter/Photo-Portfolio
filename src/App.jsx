import { useState } from "react";
import Home from "./pages/Home/Home";
import Album from "./pages/Album/Album";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentCategory, setCurrentCategory] = useState("street");

  const handleNavigate = (page, category = "street") => {
    setCurrentPage(page);
    setCurrentCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main id="content">
        {currentPage === "home" ? (
          <Home onNavigate={handleNavigate} />
        ) : (
          <Album key={currentCategory} category={currentCategory} onNavigate={handleNavigate} />
        )}
      </main>
    </>
  );
}
