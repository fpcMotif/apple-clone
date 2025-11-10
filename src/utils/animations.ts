import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import type { RefObject } from "react";
import type * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (
  target: string | Element,
  animationProps: gsap.TweenVars,
  scrollProps?: Partial<ScrollTrigger.Vars>
): void => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

type AnimationTimelineOptions = {
  timeline: gsap.core.Timeline;
  rotationRef: RefObject<THREE.Group>;
  rotationState: number;
  firstTarget: string;
  secondTarget: string;
  animationProps: gsap.TweenVars;
};

export const animateWithGsapTimeline = ({
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps,
}: AnimationTimelineOptions): void => {
  if (!rotationRef.current) {
    return;
  }

  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(firstTarget, {
    ...animationProps,
    ease: "power1.inOut",
  });

  timeline.to(secondTarget, {
    ...animationProps,
    ease: "power1.inOut",
  });
};
