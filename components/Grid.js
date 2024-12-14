import React from "react";

export function GridBackgroundDemo({children}) {
  return (
    (<div
      className="w-full h-full dark:bg-black dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div
        className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        {children}
      </div>
    </div>)
  );
}
