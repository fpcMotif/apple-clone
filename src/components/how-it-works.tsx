import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type React from "react";
import { useRef } from "react";

import { chipImg, frameImg, frameVideo } from "../assets";
import { animateWithGsap } from "../utils/animations";

const HowItWorks: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div className="my-20 w-full flex-center" id="chip">
          <img alt="Chip" height={180} src={chipImg} width={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip.
            <br />A monster win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It&apos;s here. The biggest redesign in the history of Apple GPUs
          </p>
        </div>

        <div className="mt-10 mb-14 md:mt-20">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                alt="Frame"
                className="relative z-10 bg-transparent"
                height={400}
                src={frameImg}
                width={800}
              />
            </div>
            <div className="hiw-video">
              <video
                autoPlay
                className="pointer-events-none"
                muted
                playsInline
                preload="none"
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <p className="mt-3 text-center font-semibold text-gray">
            Honkai: Star Rail
          </p>
        </div>

        <div className="hiw-text-container">
          <div className="flex max-w-2xl flex-1 flex-col justify-center gap-6">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far.
              </span>{" "}
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>{" "}
              with incredibly detailed environments and characters.
            </p>
          </div>

          <div className="g_fadeIn flex flex-1 flex-col justify-center gap-2 md:max-w-sm">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
