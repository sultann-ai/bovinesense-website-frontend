import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


// Vertex shader code
const vertexShader = `
  uniform float u_time;

  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+10.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep);
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  uniform float u_frequency;

  void main() {
      float noise = 3.0 * pnoise(position + u_time, vec3(10.0));
      float displacement = (u_frequency / 30.) * (noise / 10.);
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader code
const fragmentShader = `
  uniform float u_red;
  uniform float u_green;
  uniform float u_blue;
  void main() {
      gl_FragColor = vec4(vec3(u_red, u_green, u_blue), 1.);
  }
`;

const PerlinNoiseVisualizer = ({
    width,
    height,
    red = 0.3,
    green = 0.7,
    blue = 1.0,
    animationSpeed = 0.8,
    noiseIntensity = 8.0,
    bloomThreshold = 0.4,
    bloomStrength = 0.0,
    bloomRadius = 0.7,
    showGUI = true
}) => {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const meshRef = useRef(null);
    const animationRef = useRef(null);
    const clockRef = useRef(null);
    const bloomComposerRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const guiRef = useRef(null);
    const resizeObserverRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Get container dimensions
        const getContainerSize = () => {
            const rect = containerRef.current.getBoundingClientRect();
            return {
                width: width || rect.width || window.innerWidth,
                height: height || rect.height || window.innerHeight
            };
        };

        let currentSize = getContainerSize();

        // Initialize fake audio parameters with props
        const fakeAudioParams = {
            frequency1: 0.5,
            frequency2: 1.2,
            frequency3: 2.0,
            amplitude1: 1.0,
            amplitude2: 0.5,
            amplitude3: 0.3,
            baseIntensity: noiseIntensity,
            enabled: true
        };

        // Animation control object
        const animationControls = {
            speed: animationSpeed
        };

        // Parameters for GUI - use actual prop values
        const params = {
            red: red,
            green: green,
            blue: blue,
            threshold: bloomThreshold,
            strength: bloomStrength,
            radius: bloomRadius,
            animationSpeed: animationControls.speed,
            // Fake audio parameters
            audioEnabled: fakeAudioParams.enabled,
            baseIntensity: fakeAudioParams.baseIntensity,
            freq1: fakeAudioParams.frequency1,
            freq2: fakeAudioParams.frequency2,
            freq3: fakeAudioParams.frequency3,
            amp1: fakeAudioParams.amplitude1,
            amp2: fakeAudioParams.amplitude2,
            amp3: fakeAudioParams.amplitude3
        };

        // Initialize Three.js
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, currentSize.width / currentSize.height, 0.1, 1000);
        cameraRef.current = camera;
        camera.position.set(0, -2, 14);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
            powerPreference: "high-performance",
            depth: true
        });
        rendererRef.current = renderer;
        renderer.setSize(currentSize.width, currentSize.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap for performance
        renderer.setClearColor(0x000000, 0); // Transparent background
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Clear previous renderer if it exists
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);

        // Create clock
        const clock = new THREE.Clock();
        clockRef.current = clock;

        // Create uniforms for shaders
        const uniforms = {
            u_time: { type: 'f', value: 0.0 },
            u_frequency: { type: 'f', value: 0.0 },
            u_red: { type: 'f', value: params.red },
            u_green: { type: 'f', value: params.green },
            u_blue: { type: 'f', value: params.blue }
        };

        // Create material with shaders
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            wireframe: true,
            transparent: true,
        });

        // Create geometry and mesh
        const geometry = new THREE.IcosahedronGeometry(4, 30);
        const mesh = new THREE.Mesh(geometry, material);
        meshRef.current = mesh;
        scene.add(mesh);

        // Setup post-processing with proper sizing
        const pixelRatio = Math.min(window.devicePixelRatio, 2); // Cap pixel ratio for performance
        const renderWidth = currentSize.width * pixelRatio;
        const renderHeight = currentSize.height * pixelRatio;

        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(renderWidth, renderHeight));
        bloomPass.threshold = params.threshold;
        bloomPass.strength = params.strength;
        bloomPass.radius = params.radius;

        const bloomComposer = new EffectComposer(renderer);
        bloomComposer.setPixelRatio(pixelRatio);
        bloomComposer.setSize(currentSize.width, currentSize.height);
        bloomComposerRef.current = bloomComposer;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);

        const outputPass = new OutputPass();
        bloomComposer.addPass(outputPass);

        // Setup GUI if enabled
        if (showGUI) {
            const gui = new GUI();
            guiRef.current = gui;

            const colorsFolder = gui.addFolder('Colors');
            colorsFolder.add(params, 'red', 0, 1).onChange(function (value) {
                uniforms.u_red.value = Number(value);
            });
            colorsFolder.add(params, 'green', 0, 1).onChange(function (value) {
                uniforms.u_green.value = Number(value);
            });
            colorsFolder.add(params, 'blue', 0, 1).onChange(function (value) {
                uniforms.u_blue.value = Number(value);
            });
            colorsFolder.open();

            const bloomFolder = gui.addFolder('Bloom');
            bloomFolder.add(params, 'threshold', 0, 1).onChange(function (value) {
                bloomPass.threshold = Number(value);
            });
            bloomFolder.add(params, 'strength', 0, 3).onChange(function (value) {
                bloomPass.strength = Number(value);
            });
            bloomFolder.add(params, 'radius', 0, 1).onChange(function (value) {
                bloomPass.radius = Number(value);
            });
            bloomFolder.open();

            const animationFolder = gui.addFolder('Animation');
            animationFolder.add(params, 'animationSpeed', 0.1, 3.0).onChange(function (value) {
                animationControls.speed = Number(value);
            });
            animationFolder.open();

            const audioFolder = gui.addFolder('Audio Simulation');
            audioFolder.add(params, 'audioEnabled').onChange(function (value) {
                fakeAudioParams.enabled = value;
            });
            audioFolder.add(params, 'baseIntensity', 0, 50).onChange(function (value) {
                fakeAudioParams.baseIntensity = Number(value);
            });

            const freq1Controller = audioFolder.add(params, 'freq1', 0.1, 5.0).onChange(function (value) {
                fakeAudioParams.frequency1 = Number(value);
            });
            freq1Controller.name('Wave 1 Freq');

            const freq2Controller = audioFolder.add(params, 'freq2', 0.1, 5.0).onChange(function (value) {
                fakeAudioParams.frequency2 = Number(value);
            });
            freq2Controller.name('Wave 2 Freq');

            const freq3Controller = audioFolder.add(params, 'freq3', 0.1, 5.0).onChange(function (value) {
                fakeAudioParams.frequency3 = Number(value);
            });
            freq3Controller.name('Wave 3 Freq');

            const amp1Controller = audioFolder.add(params, 'amp1', 0, 2.0).onChange(function (value) {
                fakeAudioParams.amplitude1 = Number(value);
            });
            amp1Controller.name('Wave 1 Amp');

            const amp2Controller = audioFolder.add(params, 'amp2', 0, 2.0).onChange(function (value) {
                fakeAudioParams.amplitude2 = Number(value);
            });
            amp2Controller.name('Wave 2 Amp');

            const amp3Controller = audioFolder.add(params, 'amp3', 0, 2.0).onChange(function (value) {
                fakeAudioParams.amplitude3 = Number(value);
            });
            amp3Controller.name('Wave 3 Amp');

            audioFolder.open();
        }

        // Mouse and touch event listeners
        const updateInputPosition = (clientX, clientY) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = ((clientX - rect.left) / currentSize.width) * 2 - 1;
            const y = -((clientY - rect.top) / currentSize.height) * 2 + 1;

            mouseRef.current = {
                x: x * 2,
                y: y * 2
            };
        };

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current || !bloomComposerRef.current) return;
            
            const newSize = getContainerSize();
            currentSize = newSize;
            
            // Update camera aspect ratio
            cameraRef.current.aspect = newSize.width / newSize.height;
            cameraRef.current.updateProjectionMatrix();
            
            // Update renderer size
            rendererRef.current.setSize(newSize.width, newSize.height);
            
            // Update bloom composer size
            bloomComposerRef.current.setSize(newSize.width, newSize.height);
        };

        // Setup ResizeObserver for responsive behavior
        if (window.ResizeObserver) {
            resizeObserverRef.current = new ResizeObserver(handleResize);
            resizeObserverRef.current.observe(containerRef.current);
        }

        // Also listen to window resize as fallback
        window.addEventListener('resize', handleResize);

        const onMouseMove = (e) => {
            updateInputPosition(e.clientX, e.clientY);
        };

        const onTouchMove = (e) => {
            e.preventDefault(); // Prevent scrolling
            if (e.touches.length > 0) {
                updateInputPosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        const onTouchStart = (e) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                updateInputPosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('mousemove', onMouseMove);
            containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false });
            containerRef.current.addEventListener('touchstart', onTouchStart, { passive: false });
        }

        // Animation function
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);

            if (
                !cameraRef.current ||
                !sceneRef.current ||
                !meshRef.current ||
                !clockRef.current ||
                !bloomComposerRef.current
            ) {
                return;
            }

            const { x, y } = mouseRef.current;
            cameraRef.current.position.x += (x - cameraRef.current.position.x) * 0.05;
            cameraRef.current.position.y += (-y - cameraRef.current.position.y) * 0.5;
            cameraRef.current.lookAt(sceneRef.current.position);

            const mesh = meshRef.current;
            const uniforms = mesh.material.uniforms;

            uniforms.u_time.value = clockRef.current.getElapsedTime() * animationControls.speed;

            // Create fake animation using sine waves and time with GUI controls
            const time = clockRef.current.getElapsedTime();

            let fakeFrequency;

            if (fakeAudioParams.enabled) {
                const wave1 = (Math.sin(time * fakeAudioParams.frequency1) + 1) * 0.5;
                const wave2 = (Math.sin(time * fakeAudioParams.frequency2) + 1) * 0.5;
                const wave3 = (Math.sin(time * fakeAudioParams.frequency3) + 1) * 0.5;

                fakeFrequency = (wave1 * fakeAudioParams.amplitude1 +
                    wave2 * fakeAudioParams.amplitude2 +
                    wave3 * fakeAudioParams.amplitude3) * fakeAudioParams.baseIntensity;
            } else {
                // Minimal animation when disabled
                fakeFrequency = Math.sin(time * 0.1) * 2;
            }

            uniforms.u_frequency.value = fakeFrequency;

            bloomComposerRef.current.render();
        };

        // Start animation
        animate();

        // Cleanup function
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousemove', onMouseMove);
                containerRef.current.removeEventListener('touchmove', onTouchMove);
                containerRef.current.removeEventListener('touchstart', onTouchStart);
            }

            // Clean up resize observer
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
            
            // Remove window resize listener
            window.removeEventListener('resize', handleResize);

            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }

            if (guiRef.current) {
                guiRef.current.destroy();
            }

            // Clean up Three.js resources
            if (geometry) geometry.dispose();
            if (material) {
                if (material.uniforms) {
                    // Clean up uniform textures if any
                    Object.values(material.uniforms).forEach(uniform => {
                        if (uniform.value && uniform.value.dispose) {
                            uniform.value.dispose();
                        }
                    });
                }
                material.dispose();
            }
            if (bloomComposerRef.current) {
                bloomComposerRef.current.dispose();
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
                rendererRef.current.forceContextLoss();
                rendererRef.current.domElement = null;
            }

            // Remove all children from the container
            if (containerRef.current) {
                while (containerRef.current.firstChild) {
                    containerRef.current.removeChild(containerRef.current.firstChild);
                }
            }
        };
    }, [red, green, blue, animationSpeed, noiseIntensity, bloomThreshold, bloomStrength, bloomRadius, showGUI]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none', // Allow interactions to pass through to content below
                touchAction: 'none',
                background: 'transparent', // Ensure transparent background
                overflow: 'hidden'
            }}
        />
    );
};

export default PerlinNoiseVisualizer;