import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type React from "react";
import { useRef } from "react";

import { explore1Img, explore2Img, exploreVideo } from "../assets";
import { animateWithGsap } from "../utils/animations";

const Features: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to("#explore-video", {
      scrollTrigger: {
        trigger: "#explore-video",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });

    animateWithGsap("#features-title", {
      y: 0,
      opacity: 1,
    });

    animateWithGsap(
      ".g_grow",
      {
        scale: 1,
        opacity: 1,
        ease: "power1",
      },
      {
        scrub: 5.5,
      }
    );

    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
    });
  }, []);

  return (
    <section className="common-padding relative h-full overflow-hidden bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 className="section-heading" id="features-title">
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="font-semibold text-5xl lg:text-7xl">iPhone.</h2>
            <h2 className="font-semibold text-5xl lg:text-7xl">
              Forged in titanium.
            </h2>
          </div>

          <div className="flex-center flex-col sm:px-10">
            <div className="relative flex h-[50vh] w-full items-center">
              <video
                autoPlay
                className="size-full object-cover object-center"
                id="explore-video"
                muted
                playsInline
                preload="none"
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="relative flex w-full flex-col">
              <div className="feature-video-container">
                <div className="h-[50vh] flex-1 overflow-hidden">
                  <img
                    alt="Titanium"
                    className="feature-video g_grow"
                    height={600}
                    src={explore1Img}
                    width={800}
                  />
                </div>

                <div className="h-[50vh] flex-1 overflow-hidden">
                  <img
                    alt="Titanium 2"
                    className="feature-video g_grow"
                    height={600}
                    src={explore2Img}
                    width={800}
                  />
                </div>
              </div>

              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>{" "}
                    using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>{" "}
                    You&apos;ll notice the difference the moment you pick one
                    up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
