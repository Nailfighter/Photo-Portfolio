import React, { useEffect, useRef, useState } from "react";
import { canvasImages } from "../../data/assets";

export default function LandingCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRef = useRef(null);
  
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
    const loadedImages = canvasImages.map((imgData, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgData.url;
      
      const item = {
 
<truncated 6373 bytes>