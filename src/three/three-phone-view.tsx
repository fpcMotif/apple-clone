import type { FunctionComponent } from "preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import {
  AmbientLight,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Model } from "../constants";

type GLTFResult = {
  scene: import("three").Group;
  scenes: import("three").Group[];
  cameras: import("three").Camera[];
  animations: import("three").AnimationClip[];
  asset: {
    generator?: string;
    version?: string;
  };
};

type ThreePhoneViewProps = {
  index: number;
  size: "small" | "large";
  item: Model;
  setRotationState: (rotation: number) => void;
};

const ThreePhoneView: FunctionComponent<ThreePhoneViewProps> = ({
  index,
  size: _size,
  item,
  setRotationState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  // Material names to exclude from texture binding
  const excludedMaterials = new Set([
    "dxCVrUCvYhjVxqy",
    "hUlRcbieVuIiOXG",
    "PaletteMaterial001",
    "PaletteMaterial002",
  ]);

  // Process mesh materials and apply transformations
  const processMesh = useCallback(
    (
      child: Mesh,
      texture: import("three").Texture,
      modelItem: Model,
      modelIndex: number
    ) => {
      if (!child.material) {
        return;
      }

      const material = child.material as MeshStandardMaterial;

      // Apply texture to materials not in exclusion list
      if (!excludedMaterials.has(material.name)) {
        material.map = texture;
        material.needsUpdate = true;
      }

      // Apply colors to specific materials
      if (material.name === "hUlRcbieVuIiOXG") {
        material.color = new Color(modelItem.color[0]);
      } else if (material.name === "PaletteMaterial001") {
        material.color = new Color(modelItem.color[1]);
      } else if (material.name === "PaletteMaterial002") {
        material.color = new Color(modelItem.color[2]);
      }

      // Apply scale
      const scale = modelIndex === 1 ? 15 : 17;
      child.scale.set(scale, scale, scale);

      // Enable shadows
      child.castShadow = true;
      child.receiveShadow = true;
    },
    [excludedMaterials]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // Initialize scene
    const scene = new Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);
    cameraRef.current = camera;

    // Initialize renderer with performance optimizations
    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false, // Performance optimization
      powerPreference: "high-performance",
    });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // Initialize lights
    const ambientLight = new AmbientLight(0xff_ff_ff, 0.3);
    scene.add(ambientLight);

    // Add spot lights to match original lighting setup
    const spotLight1 = new SpotLight(
      0xf8_f9_fa,
      Math.PI * 0.2,
      100,
      0.15,
      1,
      0
    );
    spotLight1.position.set(-2, 10, 5);
    spotLight1.castShadow = true;
    scene.add(spotLight1);

    const spotLight2 = new SpotLight(
      0xf8_f9_fa,
      Math.PI * 0.2,
      100,
      0.15,
      1,
      0
    );
    spotLight2.position.set(0, -25, 10);
    spotLight2.castShadow = true;
    scene.add(spotLight2);

    const spotLight3 = new SpotLight(
      0xf8_f9_fa,
      Math.PI * 3,
      100,
      0.15,
      1,
      0.1
    );
    spotLight3.position.set(0, 15, 5);
    spotLight3.castShadow = true;
    scene.add(spotLight3);

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.4;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Handle rotation state updates
    const handleControlsEnd = () => {
      if (controlsRef.current) {
        setRotationState(controlsRef.current.getAzimuthalAngle());
      }
    };
    controls.addEventListener("end", handleControlsEnd);

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.load(
      "/models/scene.glb",
      (gltf: GLTFResult) => {
        const modelGroup = new Group();
        modelGroup.name = index === 1 ? "small" : "large";

        // Load texture
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(item.img);

        // Apply texture to materials and scale meshes
        gltf.scene.traverse((child: import("three").Object3D) => {
          if (child instanceof Mesh) {
            processMesh(child, texture, item, index);
          }
        });

        modelGroup.add(gltf.scene);
        scene.add(modelGroup);
        modelGroupRef.current = modelGroup;
        setIsLoading(false);
      },
      undefined,
      (_error: unknown) => {
        // Error loading GLTF model - silently handle for production
        setIsLoading(false);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (!(canvasRef.current && cameraRef.current && rendererRef.current)) {
        return;
      }

      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop with visibility optimization
    const animate = () => {
      if (isVisibleRef.current) {
        animationIdRef.current = requestAnimationFrame(animate);

        if (controlsRef.current) {
          controlsRef.current.update();
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };

    // Set up IntersectionObserver for visibility-based rendering
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !animationIdRef.current) {
            animate(); // Resume animation
          } else if (!entry.isIntersecting && animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null; // Pause animation
          }
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    // Start animation loop
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.removeEventListener("end", handleControlsEnd);
      observer.disconnect();

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Dispose of geometries and materials
      if (modelGroupRef.current) {
        modelGroupRef.current.traverse((child) => {
          if (child instanceof Mesh) {
            child.geometry.dispose();
            if (child.material instanceof MeshStandardMaterial) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [index, item, setRotationState, processMesh]);

  return (
    <div className="absolute h-full w-full">
      {isLoading && (
        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
          <div className="h-[10vw] w-[10vw] rounded-full">Loading...</div>
        </div>
      )}
      <canvas
        className="h-full w-full"
        ref={canvasRef}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
};

export default ThreePhoneView;
