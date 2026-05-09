import React, { useEffect, useRef } from 'react';

const SyntheticCortex: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 150;
    // Position the "Brain Center" relative to your main logo
    const brainX = canvas.width * 0.5;
    const brainY = canvas.height * 0.35; 

    class Particle {
      x: number; 
      y: number; 
      vx: number; 
      vy: number;
      size: number; 
      alpha: number; 
      color: string;
      life: number; 
      maxLife: number;
      isFromBrain: boolean;

      constructor(isFromBrain: boolean) {
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
        this.alpha = 1;
        this.size = Math.random() * 2 + 0.5;
        this.isFromBrain = isFromBrain;

        // Use the safely captured dimensions
        const cWidth = canvasRef.current?.width || window.innerWidth;
        const cHeight = canvasRef.current?.height || window.innerHeight;

        if (this.isFromBrain) {
          // Particles "Streaming" off the brain
          this.x = brainX + (Math.random() - 0.5) * 50;
          this.y = brainY + (Math.random() - 0.5) * 50;
          this.vx = Math.random() * 2 + 1; // Always move right
          this.vy = (Math.random() - 0.5) * 1;
          this.color = '#00F3FF';
        } else {
          // Background entropy particles
          this.x = Math.random() * cWidth;
          this.y = Math.random() * cHeight;
          this.vx = Math.random() * 2 - 1;
          this.vy = Math.random() * 2 - 1;
          this.color = this.x < cWidth * 0.5 ? '#FF4500' : '#00F3FF';
        }
      }

      update() {
        const cWidth = canvasRef.current?.width || window.innerWidth;
        
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // A.I.C.E. Veto Logic: Transform color and velocity as they cross center
        if (this.x > cWidth * 0.5) {
          this.color = '#00F3FF';
          this.vx += (2 - this.vx) * 0.05; // Smooth horizontal stream
          this.vy *= 0.95; // Dampen vertical chaos
        } else {
          this.vx += (Math.random() - 0.5) * 0.2; // Increase chaos on left
        }

        if (this.x > cWidth || this.life > this.maxLife) {
          return false; // Mark for deletion
        }
        return true;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.isFromBrain ? 10 : 0;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = 1 - (this.life / this.maxLife);
        ctx.fill();
      }
    }

    let pulse = 0;
    let animationFrameId: number;

    const animate = () => {
      if (!canvasRef.current) return;
      const cWidth = canvasRef.current.width;
      const cHeight = canvasRef.current.height;

      ctx.clearRect(0, 0, cWidth, cHeight);
      pulse += 0.02;

      // 1. Draw the "Breathing" Brain Glow
      const glowSize = 100 + Math.sin(pulse) * 20;
      const gradient = ctx.createRadialGradient(brainX, brainY, 0, brainX, brainY, glowSize);
      gradient.addColorStop(0, 'rgba(0, 243, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cWidth, cHeight);

      // 2. Manage Particles
      if (particles.length < particleCount) {
        particles.push(new Particle(Math.random() > 0.7));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
          particles.splice(i, 1);
        } else {
          particles[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // THIS IS THE MISSING BRACKET FIX (Closing the useEffect properly)
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-[85vh] z-10 pointer-events-none mix-blend-screen opacity-60 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" 
    />
  );
};

export default SyntheticCortex;