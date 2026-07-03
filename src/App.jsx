import { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Album from "./pages/Album/Album";

export default function App() {
  // Parse URL pathname directly to initialize state
  const [route, setRoute] = useState(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/album\/([^/]+)$/);
    if (match) {
      return { page: "album", category: match[1] };
    }
    return { page: "home", category: "street" };
  });

  // Listen to browser Back/Forward button clicks (popstate events)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/album\/([^/]+)$/);
      if (match) {
        setRoute({ page: "album", category: match[1] });
      } else {
        setRoute({ page: "home", category: "street" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleNavigate = (page, category = "street") => {
    const url = page === "home" ? "/" : `/album/${category}`;
    
    // Update browser URL history
    window.history.pushState(null, "", url);
    
    setRoute({ page, category });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <main id="content">
        {route.page === "home" ? (
          <Home onNavigate={handleNavigate} />
        ) : (
          <Album key={route.category} category={route.category} onNavigate={handleNavigate} />
        )}
      </main>
    </>
  );
}
