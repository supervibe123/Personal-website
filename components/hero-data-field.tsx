"use client";

import { useEffect, useRef, useState } from "react";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  uniform float uDpr;

  varying float vLift;
  varying float vEdgeFade;

  void main() {
    vec3 p = position;

    float idle =
        sin(p.x * 0.74 + uTime * 0.12) * 0.035
      + sin(p.z * 0.51 - uTime * 0.09) * 0.025;

    vec2 toPointer = uPointer.xz - p.xz;
    float falloff = exp(-dot(toPointer, toPointer) * 0.58);
    float lift = falloff * 0.24 * uPointerStrength;

    p.xz += toPointer * falloff * 0.018 * uPointerStrength;
    p.y += idle + lift;

    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(
      uDpr * (1.15 + lift * 5.0) * (6.0 / -viewPosition.z),
      0.8,
      3.5
    );

    float farFade = smoothstep(-9.0, -6.5, p.z);
    float nearFade = 1.0 - smoothstep(1.1, 2.0, p.z);
    vEdgeFade = farFade * nearFade;
    vLift = lift;
  }
`;

const lineFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vLift;
  varying float vEdgeFade;

  void main() {
    float emphasis = min(vLift * 0.22, 0.08);
    gl_FragColor = vec4(uColor, (uOpacity + emphasis) * vEdgeFade);
  }
`;

const pointFragmentShader = /* glsl */ `
  uniform vec3 uColor;

  varying float vLift;
  varying float vEdgeFade;

  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float circle = 1.0 - smoothstep(0.18, 0.5, distanceToCenter);
    float alpha = circle * (0.26 + min(vLift * 1.5, 0.28));
    gl_FragColor = vec4(uColor, alpha * vEdgeFade);
  }
`;

function buildGridPositions(columns: number, rows: number) {
  const xMin = -7.5;
  const xMax = 7.5;
  const zNear = 2;
  const zFar = -9;

  const points = new Float32Array(columns * rows * 3);
  const lineValues: number[] = [];

  const positionAt = (column: number, row: number) => {
    const x = xMin + (xMax - xMin) * (column / (columns - 1));
    const z = zNear + (zFar - zNear) * (row / (rows - 1));
    return [x, 0, z] as const;
  };

  let pointIndex = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const [x, y, z] = positionAt(column, row);
      points[pointIndex] = x;
      points[pointIndex + 1] = y;
      points[pointIndex + 2] = z;
      pointIndex += 3;

      if (column < columns - 1) {
        lineValues.push(x, y, z, ...positionAt(column + 1, row));
      }
      if (row < rows - 1) {
        lineValues.push(x, y, z, ...positionAt(column, row + 1));
      }
    }
  }

  return { points, lines: new Float32Array(lineValues) };
}

export function HeroDataField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const section = host?.closest<HTMLElement>(".hero-section");
    if (!host || !section || reduceMotion) return;
    const hostElement = host;
    const sectionElement = section;

    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (window.matchMedia("(max-width: 47.99rem)").matches || (deviceMemory && deviceMemory < 4)) {
      return;
    }

    let cancelled = false;
    let disposeScene = () => {};

    async function initialize() {
      const THREE = await import("three");
      if (cancelled || !hostRef.current) return;

      const canvas = hostElement.querySelector<HTMLCanvasElement>("canvas");
      if (!canvas) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          canvas,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 30);
      camera.position.set(0, 2.8, 5.8);
      camera.lookAt(0, -0.15, -2.8);

      const { points: pointPositions, lines: linePositions } = buildGridPositions(56, 30);
      const pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

      const sharedUniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector3(2.4, 0, -2.8) },
        uPointerStrength: { value: 0 },
        uDpr: { value: 1 },
      };

      const lineMaterial = new THREE.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        fragmentShader: lineFragmentShader,
        transparent: true,
        uniforms: {
          ...sharedUniforms,
          uColor: { value: new THREE.Color("#263d56") },
          uOpacity: { value: 0.13 },
        },
        vertexShader,
      });

      const pointMaterial = new THREE.ShaderMaterial({
        depthTest: false,
        depthWrite: false,
        fragmentShader: pointFragmentShader,
        transparent: true,
        uniforms: {
          ...sharedUniforms,
          uColor: { value: new THREE.Color("#718091") },
        },
        vertexShader,
      });

      const group = new THREE.Group();
      group.position.x = 1.35;
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      const points = new THREE.Points(pointGeometry, pointMaterial);
      lines.renderOrder = 0;
      points.renderOrder = 1;
      group.add(lines, points);
      scene.add(group);

      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const pointerTarget = new THREE.Vector3(2.4, 0, -2.8);
      const pointerCurrent = pointerTarget.clone();
      const pointerWorld = new THREE.Vector3();
      const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
      const raycaster = new THREE.Raycaster();
      const normalizedPointer = new THREE.Vector2();
      const finePointer = window.matchMedia("(pointer: fine)").matches;

      let targetStrength = 0;
      let currentStrength = 0;
      let inViewport = true;
      let contextLost = false;
      let running = false;
      let lastFrame = 0;

      const renderFrame = (time = 0) => {
        const elapsedSinceFrame = time - lastFrame;
        if (lastFrame !== 0 && elapsedSinceFrame < 1000 / 30) return;

        const delta = Math.min((elapsedSinceFrame || 16.7) / 1000, 0.08);
        lastFrame = time;
        const damping = 1 - Math.exp(-delta * 6);

        pointerCurrent.lerp(pointerTarget, damping);
        currentStrength += (targetStrength - currentStrength) * damping;
        sharedUniforms.uTime.value = time * 0.001;
        sharedUniforms.uPointer.value.copy(pointerCurrent);
        sharedUniforms.uPointerStrength.value = currentStrength;
        renderer.render(scene, camera);
      };

      const shouldRun = () =>
        inViewport && document.visibilityState === "visible" && !contextLost;

      const syncLoop = () => {
        const nextRunning = shouldRun();
        if (nextRunning === running) return;
        running = nextRunning;
        lastFrame = 0;
        renderer.setAnimationLoop(running ? renderFrame : null);
      };

      const resize = () => {
        const width = Math.max(1, hostElement.clientWidth);
        const height = Math.max(1, hostElement.clientHeight);
        const pixelBudgetRatio = Math.sqrt(2_000_000 / (width * height));
        const dpr = Math.max(0.75, Math.min(window.devicePixelRatio || 1, 1.5, pixelBudgetRatio));

        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        sharedUniforms.uDpr.value = dpr;
        renderFrame(performance.now());
      };

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = sectionElement.getBoundingClientRect();
        normalizedPointer.set(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
        );
        raycaster.setFromCamera(normalizedPointer, camera);
        if (raycaster.ray.intersectPlane(interactionPlane, pointerWorld)) {
          pointerTarget.copy(pointerWorld).sub(group.position);
          targetStrength = 1;
        }
      };

      const handlePointerLeave = () => {
        targetStrength = 0;
      };

      const handleVisibility = () => syncLoop();
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        contextLost = true;
        hostElement.classList.remove("is-ready");
        syncLoop();
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(hostElement);
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          inViewport = entry.isIntersecting;
          syncLoop();
        },
        { rootMargin: "80px 0px" },
      );
      intersectionObserver.observe(sectionElement);

      document.addEventListener("visibilitychange", handleVisibility);
      canvas.addEventListener("webglcontextlost", handleContextLost);
      if (finePointer) {
        sectionElement.addEventListener("pointermove", handlePointerMove, { passive: true });
        sectionElement.addEventListener("pointerleave", handlePointerLeave);
      }

      resize();
      renderer.render(scene, camera);
      hostElement.classList.add("is-ready");
      syncLoop();

      disposeScene = () => {
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", handleVisibility);
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        if (finePointer) {
          sectionElement.removeEventListener("pointermove", handlePointerMove);
          sectionElement.removeEventListener("pointerleave", handlePointerLeave);
        }
        hostElement.classList.remove("is-ready");
        pointGeometry.dispose();
        lineGeometry.dispose();
        pointMaterial.dispose();
        lineMaterial.dispose();
        renderer.renderLists.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    }

    void initialize();
    return () => {
      cancelled = true;
      disposeScene();
    };
  }, [reduceMotion]);

  return (
    <div className="hero-data-field" ref={hostRef} aria-hidden="true">
      <canvas tabIndex={-1} />
    </div>
  );
}
