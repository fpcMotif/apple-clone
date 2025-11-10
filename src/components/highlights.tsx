import gsap from "gsap";
import type { FunctionComponent } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";

import { rightImg, watchImg } from "../assets";
import VideoCarousel from "./video-carousel";

const Highlights: FunctionComponent = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to("#title", { opacity: 1, y: 0 });
      gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="common-padding h-full w-screen overflow-hidden bg-zinc"
      id="highlights"
      ref={containerRef}
    >
      <div className="screen-max-width">
        <div className="mb-12 flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-xl flex-col gap-3">
            <h1 className="section-heading" id="title">
              Get the highlights.
            </h1>
            <p className="font-normal text-gray text-lg">
              Discover the marquee moments, then drop into each cinematic cut
              filmed and rendered on iPhone 15 Pro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              className="link"
              href="https://www.apple.com/iphone-15-pro/"
              rel="noreferrer"
            >
              Watch the film
              <img
                alt="Watch highlight film"
                className="ml-2"
                height={20}
                src={watchImg}
                width={20}
              />
            </a>
            <a
              className="link"
              href="https://www.apple.com/apple-events/"
              rel="noreferrer"
            >
              Watch the event
              <img
                alt="Watch full event"
                className="ml-2"
                height={20}
                src={rightImg}
                width={20}
              />
            </a>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
