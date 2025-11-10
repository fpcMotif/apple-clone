import type { FunctionComponent } from "preact";
import type { Group } from "three";

import type { Model } from "../constants";
import ThreePhoneView from "../three/three-phone-view";

type ModelViewProps = {
  index: number;
  groupRef: { current: Group | null };
  gsapType: string;
  controlRef: { current: unknown };
  setRotationState: (rotation: number) => void;
  size: "small" | "large";
  item: Model;
};

const ModelView: FunctionComponent<ModelViewProps> = ({
  index,
  groupRef: _groupRef,
  gsapType,
  controlRef: _controlRef,
  setRotationState,
  size,
  item,
}) => (
  <div
    className={`absolute h-full w-full ${index === 2 ? "right-[-100%]" : ""}`}
    id={gsapType}
  >
    <ThreePhoneView
      index={index}
      item={item}
      setRotationState={setRotationState}
      size={size}
    />
  </div>
);

export default ModelView;
