import gsap from "gsap";
import type { FunctionComponent } from "preact";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "preact/hooks";

import { heroVideo, smallHeroVideo } from "../assets";

const Hero: FunctionComponent = () => {
  const [videoSrc, setVideoSrc] = useState<string>(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const containerRef = useRef<HTMLElement | null>(null);

  const handleVideoSrcSet = useCallback((): void => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    return () => window.removeEventListener("resize", handleVideoSrcSet);
  }, [handleVideoSrcSet]);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("#hero", {
        opacity: 1,
        delay: 2,
      });

      gsap.to("#cta", {
        opacity: 1,
        y: -50,
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="nav-height relative flex w-full flex-col items-center justify-center bg-black"
      ref={containerRef}
    >
      <div className="flex w-full flex-col items-center gap-10">
        <p className="hero-title" id="hero">
          iPhone 15 Pro
        </p>

        <div className="w-11/12 max-w-5xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-b from-white/15 to-white/5 shadow-[0_35px_140px_rgba(0,0,0,0.55)] backdrop-blur">
            <video
              autoPlay
              className="pointer-events-none aspect-video w-full object-cover"
              key={videoSrc}
              muted
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div
        className="mt-12 flex translate-y-20 flex-col items-center gap-4 text-center opacity-0"
        id="cta"
      >
        <a className="btn" href="#highlights">
          Buy
        </a>
        <p className="max-w-xl text-center font-normal text-gray-200/80 text-lg leading-relaxed">
          From $199/month or $999 before trade‑in. Explore the full highlight
          reel below.
        </p>
      </div>
    </section>
  );
};

export default Hero;
