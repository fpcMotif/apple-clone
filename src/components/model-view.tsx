import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Suspense } from "react";
import type { Group } from "three";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import type { Model } from "../constants";
import IPhone from "./i-phone";
import Lights from "./lights";
import Loader from "./loader";

type ModelViewProps = {
  index: number;
  groupRef: React.RefObject<Group>;
  gsapType: string;
  controlRef: React.RefObject<OrbitControlsImpl>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  size: "small" | "large";
  item: Model;
};

const ModelView: React.FC<ModelViewProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  size,
  item,
}) => {
  return (
    <View
      className={`absolute h-full w-full ${index === 2 ? "right-[-100%]" : ""}`}
      id={gsapType}
      index={index}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        makeDefault
        onEnd={() =>
          setRotationState(controlRef.current?.getAzimuthalAngle() ?? 0)
        }
        ref={controlRef}
        rotateSpeed={0.4}
        target={new Vector3(0, 0, 0)}
      />

      <group
        name={index === 1 ? "small" : "large"}
        position={[0, 0, 0]}
        ref={groupRef}
      >
        <Suspense fallback={<Loader />}>
          <IPhone item={item} scale={index === 1 ? 15 : 17} size={size} />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
