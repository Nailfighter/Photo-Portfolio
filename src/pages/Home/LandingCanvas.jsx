import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { canvasImages } from "../../data/assets";

const words = ["ISO", "APERTURE", "SHUTTER"];

export default function LandingCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRef = useRef(null);

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Animation states
  const animationStateRef = useRef({
    width: 0,
    height: 0,
    maxDim: 0,
    mouseX: 0,
    mouseY: 0,
    relX: 0,
    relY: 0,
    mouseActive: false,
    animationAmount: 0,
    textX: 0,
    textY: 0,
    images: [],
    loaded: false,
    hoveredIndex: -1,
  });

  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = animationStateRef.current;

    // Initialize dimensions
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      
      state.width = rect.width;
      state.height = rect.height;
      state.maxDim = Math.max(state.width, state.height);
      
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Initialize image positions
      state.images.forEach((img) => {
        img.currentX = state.width * img.x;
        img.currentY = state.height * img.y;
        img.currentWidth = img.scale * state.maxDim;
        img.currentHeight = img.currentWidth / img.aspectRatio;
      });

      if (!state.mouseActive) {
        state.mouseX = state.width / 2;
        state.mouseY = state.height / 2;
      }
    };

    // Load images
    let loadedCount = 0;
    const loadedImages = canvasImages.map((imgData) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgData.url;
      
      const item = {
        ...imgData,
        imageElement: img,
        aspectRatio: 1, // Default, will update when loaded
        currentX: 0,
        currentY: 0,
        currentWidth: 0,
        currentHeight: 0,
        distance: 0,
      };

      img.onload = () => {
        item.aspectRatio = img.width / img.height;
        loadedCount++;
        if (loadedCount === canvasImages.length) {
          state.loaded = true;
          resizeCanvas();
        }
      };

      return item;
    });

    state.images = loadedImages;

    // Mouse and touch event handlers
    const updateMouseCoords = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      state.mouseX = clientX - rect.left;
      state.mouseY = clientY - rect.top;
      state.relX = state.mouseX / state.width - 0.5;
      state.relY = state.mouseY / state.height - 0.5;
      state.mouseActive = true;
    };

    const handleMouseMove = (e) => {
      updateMouseCoords(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches[0]) {
        updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      state.mouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Main animation loop
    let animationFrameId;
    const le = (a, b, t) => (1 - t) * a + t * b;

    const animate = () => {
      if (!state.loaded) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const targetL = state.mouseActive ? 1 : 0;
      state.animationAmount = le(state.animationAmount, targetL, 0.04);
      
      const v = state.maxDim * -0.05;
      let targetTextX = 0;
      let targetTextY = 0;
      if (state.mouseActive) {
        targetTextX = state.relX * v * state.animationAmount;
        targetTextY = state.relY * v * state.animationAmount;
      }
      state.textX = le(state.textX, targetTextX, 0.075);
      state.textY = le(state.textY, targetTextY, 0.075);
      
      setTextOffset({ x: state.textX, y: state.textY });

      // Clear canvas
      ctx.clearRect(0, 0, state.width, state.height);

      const hoverScaleFactor = 1.75;
      const hoverThreshold = state.maxDim * 0.15;
      const maxDisplacement = state.maxDim * 0.75;
      const viewDiag = Math.sqrt(state.width * state.width + state.height * state.height) * 1.1;

      // Update positions, scales, and distances
      state.images.forEach((img) => {
        const oX = state.width * img.x;
        const oY = state.height * img.y;

        // Proximity calculation based on current positions
        const dx = img.currentX - state.mouseX;
        const dy = img.currentY - state.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        img.distance = distance;

        let proximityScale = 0;
        if (distance < hoverThreshold && state.mouseActive) {
          proximityScale = 1 - distance / hoverThreshold;
        }
        // Cap proximity scaling
        proximityScale = Math.min(0.12, proximityScale) * state.animationAmount;

        const targetScale = img.scale + (hoverScaleFactor - img.scale) * proximityScale;
        img.currentWidth = le(img.currentWidth, targetScale * state.maxDim, 0.075);
        img.currentHeight = img.currentWidth / img.aspectRatio;

        // Displacement
        const displacementFactor = 1 - distance / viewDiag;
        let dispX = 0;
        let dispY = 0;
        if (state.mouseActive) {
          dispX = -maxDisplacement * state.relX * displacementFactor * state.animationAmount;
          dispY = -maxDisplacement * state.relY * displacementFactor * state.animationAmount;
        }

        img.currentX = le(img.currentX, oX + dispX, 0.075);
        img.currentY = le(img.currentY, oY + dispY, 0.075);
      });

      // Sort images: furthest drawn first, closest drawn last (on top)
      const sortedImages = [...state.images].sort((a, b) => b.distance - a.distance);

      // Draw sorted images
      sortedImages.forEach((img) => {
        if (img.imageElement.complete) {
          ctx.save();
          // Draw shadow
          ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
          ctx.shadowBlur = 24;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 12;

          ctx.drawImage(
            img.imageElement,
            img.currentX - img.currentWidth / 2,
            img.currentY - img.currentHeight / 2,
            img.currentWidth,
            img.currentHeight
          );
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="l-canvas mt-base-canvas js-canvas"
      style={{
        "--text-x": `${textOffset.x}px`,
        "--text-y": `${textOffset.y}px`,
      }}
    >
      <h1 
        ref={headingRef}
        className="l-canvas__hyperreal js-canvas-hl"
        aria-label="ISO Aperture Shutter"
        style={{
          transform: `translate(var(--text-x), var(--text-y))`,
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ height: "16vw", overflow: "hidden", position: "relative", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={words[wordIndex]}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                position: "absolute",
                width: "100%",
                textAlign: "center",
                lineHeight: "16vw",
              }}
            >
              {words[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </h1>
      <canvas ref={canvasRef} />
    </div>
  );
}
