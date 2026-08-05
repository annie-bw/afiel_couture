import React, { useEffect, useRef } from 'react';

export default function TextCurtain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const words = ["AFIEL", "COUTURE", "ELEGANCE", "HERITAGE", "TAILORED", "TIMELESS", "ARTISTRY", "STITCH", "CRAFTED", "REFINED"];
    
    class Point {
      x: number;
      y: number;
      oldX: number;
      oldY: number;
      pinned: boolean;
      char: string;
      constructor(x: number, y: number, char: string, pinned: boolean) {
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.char = char;
        this.pinned = pinned;
      }
    }

    class Link {
      p1: Point;
      p2: Point;
      distance: number;
      constructor(p1: Point, p2: Point, distance: number) {
        this.p1 = p1;
        this.p2 = p2;
        this.distance = distance;
      }
    }

    let points: Point[] = [];
    let links: Link[] = [];

    const spacingX = Math.min(80, Math.max(40, width / 20));
    const spacingY = 35;
    
    function init() {
      points = [];
      links = [];
      const cols = Math.floor(width / spacingX) + 2;
      const rows = Math.floor(height / spacingY) + 2;
      
      const startX = (width - (cols - 1) * spacingX) / 2;

      for (let i = 0; i < cols; i++) {
        const word = words[i % words.length];
        for (let j = 0; j < rows; j++) {
          const char = word[j % word.length];
          const x = startX + i * spacingX;
          const y = j * spacingY - spacingY;
          points.push(new Point(x, y, char, j === 0));
        }
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 1; j++) {
          links.push(new Link(points[i * rows + j], points[i * rows + j + 1], spacingY));
        }
      }
    }

    init();

    const mouse = { x: -1000, y: -1000, isDown: false, radius: 120 };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handlePointerDown = () => mouse.isDown = true;
    const handlePointerUp = () => mouse.isDown = false;
    const handlePointerLeave = () => { mouse.x = -1000; mouse.y = -1000; mouse.isDown = false; };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    const gravity = 0.4;
    const friction = 0.92;

    let animationFrameId: number;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      // Update points
      for (const p of points) {
        if (p.pinned) continue;
        
        let vx = (p.x - p.oldX) * friction;
        let vy = (p.y - p.oldY) * friction;
        
        p.oldX = p.x;
        p.oldY = p.y;
        
        p.x += vx;
        p.y += vy;
        p.y += gravity;
        
        // Mouse interaction
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const activeRadius = mouse.isDown ? mouse.radius * 1.5 : mouse.radius;
        if (dist < activeRadius) {
          const force = (activeRadius - dist) / activeRadius;
          // Apply a gentle sweeping force rather than an explosion
          p.x += (dx / dist) * force * (mouse.isDown ? 8 : 4);
          p.y += (dy / dist) * force * (mouse.isDown ? 8 : 4);
        }
      }

      // Relax links
      for (let iter = 0; iter < 5; iter++) {
        for (const link of links) {
          const dx = link.p2.x - link.p1.x;
          const dy = link.p2.y - link.p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // prevent division by zero
          if (dist === 0) continue;
          const difference = link.distance - dist;
          const percent = difference / dist / 2;
          const offsetX = dx * percent;
          const offsetY = dy * percent;
          
          if (!link.p1.pinned) {
            link.p1.x -= offsetX;
            link.p1.y -= offsetY;
          }
          if (!link.p2.pinned) {
            link.p2.x += offsetX;
            link.p2.y += offsetY;
          }
        }
      }

      // Draw
      ctx.font = '300 18px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Champagne color for the text
      ctx.fillStyle = `rgba(213, 195, 165, 0.7)`;
      
      for (const p of points) {
        ctx.fillText(p.char, p.x, p.y);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-auto touch-none" 
      style={{ opacity: 0.9 }}
    />
  );
}
