import { Environment, Lightformer } from "@react-three/drei";
import type React from "react";

const Lights: React.FC = () => {
  return (
    // group different lights and lightformers. We can use group to organize lights, cameras, meshes, and other objects in the scene.
    <group name="lights">
      {/**
       * @description Environment is used to create a background environment for the scene
       * https://github.com/pmndrs/drei?tab=readme-ov-file#environment
       */}
      <Environment resolution={256}>
        <group>
          {/**
           * @description Lightformer used to create custom lights with various shapes and properties in a 3D scene.
           * https://github.com/pmndrs/drei?tab=readme-ov-file#lightformer
           */}
          <Lightformer
            color={"#495057"}
            form="rect"
            intensity={10}
            position={[-1, 0, -10]}
            scale={10}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[-10, 2, 1]}
            rotation-y={Math.PI / 2}
            scale={10}
          />
          <Lightformer
            form="rect"
            intensity={10}
            position={[10, 0, 1]}
            rotation-y={Math.PI / 2}
            scale={10}
          />
        </group>
      </Environment>

      {/**
       * @description spotLight is used to create a light source positioned at a specific point
       * in the scene that emits light in a specific direction.
       * https://threejs.org/docs/#api/en/lights/SpotLight
       */}
      <spotLight
        angle={0.15}
        color={"#f8f9fa"}
        decay={0} // the penumbra is the soft edge of a shadow cast by a point light
        intensity={Math.PI * 0.2} // the amount the light dims as it moves away from the source
        penumbra={1} // the light intensity
        position={[-2, 10, 5]}
      />
      <spotLight
        angle={0.15}
        color={"#f8f9fa"}
        decay={0}
        intensity={Math.PI * 0.2}
        penumbra={1}
        position={[0, -25, 10]}
      />
      <spotLight
        angle={0.15}
        decay={0.1}
        intensity={Math.PI * 3}
        penumbra={1}
        position={[0, 15, 5]}
      />
    </group>
  );
};

export default Lights;
