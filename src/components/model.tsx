import { useGSAP } from "@gsap/react";
import { type OrbitControls, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";
import { type Model, models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";
import ModelView from "./model-view";

const ModelComponent: React.FC = () => {
  const [size, setSize] = useState<"small" | "large">("small");
  const [model, setModel] = useState<Model>(models[0]);

  // camera control for the model view
  const cameraControlSmall = useRef<OrbitControls>(null);
  const cameraControlLarge = useRef<OrbitControls>(null);

  // model
  const small = useRef<Group>(new Group());
  const large = useRef<Group>(new Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState<number>(0);
  const [largeRotation, setLargeRotation] = useState<number>(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline({
        timeline: tl,
        rotationRef: small,
        rotationState: smallRotation,
        firstTarget: "#view1",
        secondTarget: "#view2",
        animationProps: {
          transform: "translateX(-100%)",
          duration: 2,
        },
      });
    } else {
      animateWithGsapTimeline({
        timeline: tl,
        rotationRef: large,
        rotationState: largeRotation,
        firstTarget: "#view2",
        secondTarget: "#view1",
        animationProps: {
          transform: "translateX(0)",
          duration: 2,
        },
      });
    }
  }, [size, largeRotation, smallRotation, tl]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 className="section-heading" id="heading">
          Take a closer look.
        </h1>

        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <ModelView
              controlRef={cameraControlSmall}
              groupRef={small}
              gsapType="view1"
              index={1}
              item={model}
              setRotationState={setSmallRotation}
              size={size}
            />

            <ModelView
              controlRef={cameraControlLarge}
              groupRef={large}
              gsapType="view2"
              index={2}
              item={model}
              setRotationState={setLargeRotation}
              size={size}
            />

            <Canvas
              className="h-full w-full"
              eventSource={rootElement}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="mb-5 text-center font-light text-sm">{model.title}</p>

            <div className="flex-center">
              <div className="color-container">
                {models.map((item) => (
                  <button
                    aria-label={`Select ${item.title} color`}
                    className="mx-2 h-6 w-6 cursor-pointer rounded-full"
                    key={item.id}
                    onClick={() => setModel(item)}
                    style={{ backgroundColor: item.color[0] }}
                    type="button"
                  />
                ))}
              </div>

              <div className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <button
                    aria-label={`Select ${label} size`}
                    className="size-btn"
                    key={label}
                    onClick={() => setSize(value)}
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelComponent;
