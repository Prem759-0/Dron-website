"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface OverlayConfig {
  id: string;
  startProgress: number; // 0 to 1
  endProgress: number;   // 0 to 1
  content: React.ReactNode;
  className?: string;
}

interface ScrollSequenceProps {
  startFrame: number;
  endFrame: number;
  scrollHeight?: string;
  overlays?: OverlayConfig[];
  priorityLoad?: boolean;
}

const PAD_LENGTH = 4;
const getFrameUrl = (index: number) =>
  `/Drone-frames/frame-${index.toString().padStart(PAD_LENGTH, "0")}.jpg`;

export default function ScrollSequence({
  startFrame,
  endFrame,
  scrollHeight = "400vh",
  overlays = [],
  priorityLoad = false,
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const frameCount = endFrame - startFrame + 1;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(startFrame);
  const renderRequestedRef = useRef(false);

  // Respect reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const toLoad = prefersReducedMotion ? 1 : frameCount;
    const images: HTMLImageElement[] = [];

    const loadStart = prefersReducedMotion ? startFrame : startFrame;
    const loadEnd = prefersReducedMotion ? startFrame : endFrame;

    for (let i = loadStart; i <= loadEnd; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / toLoad) * 100));
        if (loadedCount === toLoad) {
          setLoaded(true);
          renderFrame(startFrame); // draw first frame immediately
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      imagesRef.current.forEach((img) => {
        img.onload = null;
        img.src = "";
      });
      imagesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startFrame, endFrame, frameCount, prefersReducedMotion]);

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgIndex = frameIndex - startFrame;
    const img = imagesRef.current[imgIndex];
    
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;

    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    // Darken slightly for cinematic contrast before drawing
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    renderRequestedRef.current = false;
  };

  const requestRender = (frameIndex: number) => {
    if (renderRequestedRef.current || currentFrameRef.current === frameIndex) return;
    currentFrameRef.current = frameIndex;
    renderRequestedRef.current = true;
    requestAnimationFrame(() => renderFrame(frameIndex));
  };

  useGSAP(() => {
    if (!loaded || prefersReducedMotion) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1, // reduced from 0.5 to 0.1 for more precise, snappier scrubbing
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);
        const nextFrame = Math.round(startFrame + p * (frameCount - 1));
        requestRender(nextFrame);
      },
    });

    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded, prefersReducedMotion]);

  return (
    <div ref={containerRef} style={{ height: prefersReducedMotion ? "100vh" : scrollHeight }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-astro-base">
        
        {priorityLoad && !loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-astro-base text-astro-text">
            <div className="mb-6 text-xs font-bold tracking-[0.2em] text-astro-muted uppercase">System Initiating</div>
            <div className="text-7xl font-extrabold text-gradient-accent mb-8">{loadingProgress}%</div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-astro-surface-light">
              <div 
                className="h-full bg-astro-orange transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.7)_100%)]" />

        {/* Overlays */}
        {overlays.map((overlay) => {
          const isActive = progress >= overlay.startProgress && progress <= overlay.endProgress;
          const fadeDuration = (overlay.endProgress - overlay.startProgress) * 0.15;
          let opacity = 0;
          let scale = 0.95;
          let translateY = 30;

          if (isActive) {
            if (progress < overlay.startProgress + fadeDuration) {
              const ratio = (progress - overlay.startProgress) / fadeDuration;
              opacity = ratio;
              scale = 0.95 + 0.05 * ratio;
              translateY = 30 * (1 - ratio);
            } else if (progress > overlay.endProgress - fadeDuration) {
              const ratio = (overlay.endProgress - progress) / fadeDuration;
              opacity = ratio;
              scale = 1 + 0.05 * (1 - ratio);
              translateY = -30 * (1 - ratio);
            } else {
              opacity = 1;
              scale = 1;
              translateY = 0;
            }
          }

          return (
            <div
              key={overlay.id}
              className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center ${overlay.className || ""}`}
              style={{
                opacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transition: "opacity 0.2s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {overlay.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
