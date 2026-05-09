import React from 'react';

const AICEHeroTitle = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-black">
      
      {/* THE "PHANTOM" PROTOCOL:
         1. mix-blend-screen: Turns black pixels transparent.
         2. brightness-75: Darkens the "gray" background so it becomes pure black (and disappears).
         3. contrast-150: Boosts your Cyan/Orange colors so they don't fade out.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="z-10 w-full max-w-6xl object-contain mix-blend-screen filter brightness-75 contrast-150"
      >
        {/* notice the forward slashes '/' for web paths */}
        <source src="/assets/aice_title.mp4" type="video/mp4" />
        
        Your browser does not support the video tag.
      </video>

      {/* OPTIONAL: An underlying grid to prove transparency works */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* SEO Protection */}
      <h1 className="sr-only">Adaptive Entropic Impedance Control System</h1>
    </div>
  );
};

export default AICEHeroTitle;