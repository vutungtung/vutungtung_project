import { useEffect, useRef, useState } from "react";

export default function RotatingWheel() {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Listen to scroll on the entire window
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="md:flex items-center hidden justify-center">
      <div
        ref={wheelRef}
        style={{ transform: `rotate(${scrollY * 0.5}deg)` }}
        className="relative w-52 h-52 rounded-full border-[8px] border-foreground transition-transform duration-100 ease-linear"
      >
        {/* Center V */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 border-3  border-foreground text-white font-bold w-12 h-12 rounded-full flex items-center justify-center">
          V
        </div>

        {/* Top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2">
          <div className="h-14 relative w-2 rounded-full bg-foreground mx-auto"></div>
          <div className="w-4 h-4 absolute top-2  -left-1 bg-secondary-900  rounded-full mt-1 mx-auto"></div>
        </div>

        {/* Right */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="w-14 relative h-2 rounded-full bg-foreground "></div>
          <div className="w-4 h-4 absolute  bg-secondary-900 left-5 -top-2 rounded-full mt-1 ml-2"></div>
        </div>

        {/* Bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <div className="h-14 relative w-2 rounded-full bg-foreground  mx-auto"></div>
          <div className="w-4 h-4 absolute top-6 -left-1 bg-secondary-900 rounded-full mt-1 mx-auto"></div>
        </div>

        {/* Left */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          <div className="w-14 relative h-2 rounded-full bg-foreground "></div>
          <div className="w-4 h-4 absolute -top-2 right-7 bg-secondary-900  rounded-full mt-1 ml-[-1.25rem]"></div>
        </div>
      </div>
    </div>
  );
}
