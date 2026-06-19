"use client";

import { useEffect, useRef, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface RealisticFogBackgroundProps {
  className?: string;
  /** Element to track pointer movement across (use capture so children don't block) */
  trackRef?: RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
}

export default function RealisticFogBackground({
  className,
  trackRef,
  reducedMotion = false,
}: RealisticFogBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const trackTarget = trackRef?.current ?? container;
    if (!container || !canvas || !trackTarget) return;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_hover;
      uniform float u_night;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;

        vec2 mPos = u_mouse / u_resolution.xy;
        mPos.x *= aspect;
        float dist = distance(uv, mPos);

        vec2 q = vec2(0.0);
        q.x = fbm(uv + 0.07 * u_time);
        q.y = fbm(uv + vec2(1.0, 1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
        r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

        float f = fbm(uv + r);
        float fog = clamp(f * 1.05 + 0.08, 0.0, 1.0);

        float xNorm = gl_FragCoord.x / u_resolution.x;
        float sideFade = smoothstep(0.05, 0.5, xNorm);

        vec3 mistColor = mix(vec3(0.98, 0.95, 0.90), vec3(0.12, 0.16, 0.14), u_night);
        vec3 accentColor = mix(vec3(0.96, 0.86, 0.76), vec3(0.18, 0.24, 0.20), u_night);
        vec3 highlightColor = mix(vec3(1.0, 0.98, 0.94), vec3(0.22, 0.28, 0.24), u_night);

        vec3 color = mix(mistColor, accentColor, fog);
        color = mix(color, highlightColor, dot(q, r) * 0.45);

        float mouseGlow = smoothstep(0.28, 0.0, dist) * u_hover;
        float softHalo = smoothstep(0.42, 0.0, dist) * u_hover * 0.65;
        color += (mouseGlow + softHalo) * mix(vec3(1.0, 0.88, 0.72), vec3(0.95, 0.55, 0.28), u_night);

        float baseFog = fog * mix(0.20, 0.14, u_night) * mix(0.3, 1.0, sideFade);
        float alpha = clamp(baseFog + mouseGlow * mix(0.28, 0.18, u_night) + softHalo * 0.15, 0.0, mix(0.65, 0.5, u_night));
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Failed to create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(log ?? "Shader compile failed");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const hoverLoc = gl.getUniformLocation(program, "u_hover");
    const nightLoc = gl.getUniformLocation(program, "u_night");

    const readNightMode = () =>
      document.documentElement.getAttribute("data-theme") === "night";

    let targetMouse = { x: 0, y: 0 };
    let smoothMouse = { x: 0, y: 0 };
    let hoverAmount = 0;
    let isHovering = false;

    const updateMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      targetMouse.x = (clientX - rect.left) * scaleX;
      targetMouse.y = (rect.bottom - clientY) * scaleY;
    };

    const isInsideTrack = (clientX: number, clientY: number) => {
      const rect = trackTarget.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInsideTrack(e.clientX, e.clientY)) {
        isHovering = false;
        return;
      }
      isHovering = true;
      updateMouse(e.clientX, e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovering = true;
      updateMouse(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    trackTarget.addEventListener("mousemove", handleMouseMove, true);
    trackTarget.addEventListener("mouseenter", handleMouseEnter);
    trackTarget.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let animationFrameId = 0;
    const render = (time: number) => {
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.12;
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.12;

      const targetHover = isHovering ? 1 : 0;
      hoverAmount += (targetHover - hoverAmount) * 0.15;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, time * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(hoverLoc, hoverAmount);
      gl.uniform1f(nightLoc, readNightMode() ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      trackTarget.removeEventListener("mousemove", handleMouseMove, true);
      trackTarget.removeEventListener("mouseenter", handleMouseEnter);
      trackTarget.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, [reducedMotion, trackRef]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
